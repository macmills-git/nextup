import { useMemo } from "react";
import { Sparkles, TrendingUp, TrendingDown } from "lucide-react";
import type { EventModel } from "@/contexts/EventStore";

const Reports = ({ event }: { event: EventModel }) => {
  const insights = useMemo(() => {
    const b = event.budget || [];
    const est = b.reduce((s, x) => s + x.estimated, 0);
    const actual = b.reduce((s, x) => s + x.actual, 0);
    const variance = actual - est;
    const tasks = event.tasks || [];
    const done = tasks.filter(t => t.status === "done").length;
    const completion = tasks.length ? (done / tasks.length) * 100 : 0;
    const vendors = event.vendors || [];
    const reviewed = vendors.filter(v => v.stage === "reviewed");
    const avgRating = reviewed.length ? reviewed.reduce((s, v) => s + (v.rating || 0), 0) / reviewed.length : 0;
    const guests = event.guestsList || [];
    const attended = guests.filter(g => g.checkedIn).length;
    const attendance = guests.length ? (attended / guests.length) * 100 : 0;
    return { est, actual, variance, completion, avgRating, attendance, vendors, tasks, guests };
  }, [event]);

  const aiInsights = [
    insights.variance > 0
      ? `Overspend of $${insights.variance.toLocaleString()} — driven by ${(event.budget || []).sort((a, b) => (b.actual - b.estimated) - (a.actual - a.estimated))[0]?.label || "top line item"}.`
      : `Stayed under budget by $${Math.abs(insights.variance).toLocaleString()}.`,
    `${insights.completion.toFixed(0)}% of planned tasks completed.`,
    insights.attendance > 0 ? `${insights.attendance.toFixed(0)}% guest attendance — ${insights.attendance > 80 ? "excellent" : "room to improve"}.` : `No guest check-in data captured.`,
    insights.vendors.length ? `${insights.vendors.length} vendors engaged across the lifecycle.` : `No vendors tracked.`,
  ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-xs text-muted-foreground">Final spend</p>
          <p className="text-2xl font-bold text-foreground">${insights.actual.toLocaleString()}</p>
          <p className={`text-xs flex items-center gap-1 mt-1 ${insights.variance > 0 ? "text-rose-500" : "text-emerald-500"}`}>
            {insights.variance > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            ${Math.abs(insights.variance).toLocaleString()} vs est
          </p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-xs text-muted-foreground">Task completion</p>
          <p className="text-2xl font-bold text-foreground">{insights.completion.toFixed(0)}%</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-xs text-muted-foreground">Attendance</p>
          <p className="text-2xl font-bold text-foreground">{insights.attendance.toFixed(0)}%</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-xs text-muted-foreground">Avg vendor rating</p>
          <p className="text-2xl font-bold text-foreground">{insights.avgRating.toFixed(1)} / 5</p>
        </div>
      </div>

      <div className="bg-foreground text-background rounded-xl p-5">
        <div className="flex items-center gap-2 mb-3"><Sparkles className="h-4 w-4" /><h3 className="font-semibold text-sm">AI insights</h3></div>
        <ul className="text-xs opacity-80 space-y-2">
          {aiInsights.map((i, n) => <li key={n}>• {i}</li>)}
        </ul>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-semibold text-foreground mb-3 text-sm">Budget by category</h3>
          <div className="space-y-2">
            {(event.budget || []).map(b => {
              const pct = b.estimated ? (b.actual / b.estimated) * 100 : 0;
              return (
                <div key={b.id}>
                  <div className="flex justify-between text-xs mb-1"><span className="text-foreground">{b.label}</span><span className="text-muted-foreground">${b.actual.toLocaleString()} / ${b.estimated.toLocaleString()}</span></div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden"><div className={`h-full ${pct > 100 ? "bg-rose-500" : "bg-primary"}`} style={{ width: `${Math.min(100, pct)}%` }} /></div>
                </div>
              );
            })}
            {!(event.budget || []).length && <p className="text-xs text-muted-foreground">No budget data.</p>}
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-semibold text-foreground mb-3 text-sm">Vendor performance</h3>
          <div className="space-y-2">
            {insights.vendors.map(v => (
              <div key={v.id} className="flex items-center justify-between py-2 border-b border-border last:border-0 text-xs">
                <span className="text-foreground">{v.name}</span>
                <span className="text-muted-foreground capitalize">{v.stage}{v.rating ? ` · ${v.rating}★` : ""}</span>
              </div>
            ))}
            {!insights.vendors.length && <p className="text-xs text-muted-foreground">No vendors yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
