import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Wallet, ListChecks, Store, Users, AlertTriangle, Activity, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { EventModel } from "@/contexts/EventStore";

const Stat = ({ label, value, sub, Icon, tone = "default" }: any) => (
  <div className="bg-card border border-border rounded-xl p-4">
    <div className="flex items-center justify-between mb-2">
      <Icon className="h-4 w-4 text-muted-foreground" />
      {sub && <span className={`text-[10px] font-medium ${tone === "warn" ? "text-amber-500" : tone === "ok" ? "text-emerald-500" : "text-muted-foreground"}`}>{sub}</span>}
    </div>
    <p className="text-2xl font-bold text-foreground tracking-tight">{value}</p>
    <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
  </div>
);

const Bar = ({ pct, tone = "primary" }: { pct: number; tone?: "primary" | "ok" | "warn" }) => (
  <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
    <div className={`h-full rounded-full ${tone === "ok" ? "bg-emerald-500" : tone === "warn" ? "bg-amber-500" : "bg-primary"}`} style={{ width: `${Math.min(100, Math.max(0, pct))}%` }} />
  </div>
);

const Overview = ({ event }: { event: EventModel }) => {
  const navigate = useNavigate();
  const base = `/dashboard/events/${event.id}`;

  const stats = useMemo(() => {
    const tasks = event.tasks || [];
    const done = tasks.filter(t => t.status === "done").length;
    const budget = event.budget || [];
    const est = budget.reduce((s, b) => s + (b.estimated || 0), 0);
    const actual = budget.reduce((s, b) => s + (b.actual || 0), 0);
    const guests = event.guestsList || [];
    const accepted = guests.filter(g => g.rsvp === "accepted").length;
    const vendors = event.vendors || [];
    const booked = vendors.filter(v => ["booked", "executing", "reviewed"].includes(v.stage)).length;
    const openIssues = (event.issues || []).filter(i => !i.resolved).length;
    return { tasks, done, est, actual, guests, accepted, vendors, booked, openIssues };
  }, [event]);

  const days = event.date ? Math.ceil((new Date(event.date).getTime() - Date.now()) / 86400000) : null;
  const taskPct = stats.tasks.length ? (stats.done / stats.tasks.length) * 100 : 0;
  const budgetPct = stats.est ? (stats.actual / stats.est) * 100 : 0;
  const rsvpPct = stats.guests.length ? (stats.accepted / stats.guests.length) * 100 : 0;
  const vendorPct = stats.vendors.length ? (stats.booked / stats.vendors.length) * 100 : 0;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Countdown" value={days !== null ? (days > 0 ? `${days}d` : days === 0 ? "Today" : `+${-days}d`) : "—"} Icon={Calendar} />
        <Stat label="Budget used" value={`$${stats.actual.toLocaleString()}`} sub={`/ $${stats.est.toLocaleString()}`} Icon={Wallet} tone={budgetPct > 90 ? "warn" : "ok"} />
        <Stat label="Tasks complete" value={`${stats.done}/${stats.tasks.length}`} Icon={ListChecks} />
        <Stat label="Vendors booked" value={`${stats.booked}/${stats.vendors.length}`} Icon={Store} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-5 space-y-4">
          <h2 className="font-semibold text-foreground">Mission control</h2>
          {[
            { label: "Task completion", pct: taskPct, sub: `${stats.done}/${stats.tasks.length}` },
            { label: "Budget health", pct: budgetPct, sub: `$${stats.actual.toLocaleString()} of $${stats.est.toLocaleString()}`, tone: budgetPct > 90 ? "warn" : "ok" as const },
            { label: "Vendor pipeline", pct: vendorPct, sub: `${stats.booked} booked` },
            { label: "RSVP", pct: rsvpPct, sub: `${stats.accepted}/${stats.guests.length} accepted` },
          ].map((m) => (
            <div key={m.label} className="space-y-1.5">
              <div className="flex justify-between text-xs"><span className="text-foreground font-medium">{m.label}</span><span className="text-muted-foreground">{m.sub}</span></div>
              <Bar pct={m.pct} tone={(m as any).tone} />
            </div>
          ))}
          <div className="pt-3 border-t border-border flex flex-wrap gap-2">
            <Button size="sm" variant="outline" onClick={() => navigate(`${base}/tasks`)}>Open tasks</Button>
            <Button size="sm" variant="outline" onClick={() => navigate(`${base}/budget`)}>Open budget</Button>
            <Button size="sm" variant="outline" onClick={() => navigate(`${base}/vendors`)}>Manage vendors</Button>
            <Button size="sm" variant="outline" onClick={() => navigate(`${base}/event-day`)}>Event-day mode</Button>
          </div>
        </div>

        <div className="bg-foreground text-background rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3"><Sparkles className="h-4 w-4" /><h3 className="font-semibold text-sm">AI Copilot</h3></div>
          <ul className="text-xs opacity-80 space-y-2">
            {budgetPct > 90 && <li>⚠️ Budget at {Math.round(budgetPct)}% — consider trimming decoration or AV.</li>}
            {stats.openIssues > 0 && <li>🚨 {stats.openIssues} open issue{stats.openIssues > 1 ? "s" : ""} need attention.</li>}
            {vendorPct < 50 && <li>📌 Lock more vendors — only {stats.booked} confirmed so far.</li>}
            {days !== null && days <= 14 && days > 0 && <li>⏱ {days} days out — start guest reminders.</li>}
            {!stats.tasks.length && <li>🪄 Wizard auto-seeded categories. Add your first task.</li>}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-3"><h3 className="font-semibold text-sm text-foreground flex items-center gap-2"><Clock className="h-4 w-4" />Upcoming deadlines</h3></div>
          <div className="space-y-2">
            {stats.tasks.filter(t => t.status !== "done").slice(0, 5).map(t => (
              <div key={t.id} className="flex items-center justify-between text-sm py-2 border-b border-border last:border-0">
                <span className="text-foreground truncate">{t.title}</span>
                <span className="text-xs text-muted-foreground">{t.due || "No due date"}</span>
              </div>
            ))}
            {!stats.tasks.filter(t => t.status !== "done").length && <p className="text-xs text-muted-foreground">No upcoming tasks.</p>}
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm text-foreground flex items-center gap-2"><Activity className="h-4 w-4" />Recent activity</h3>
            {stats.openIssues > 0 && <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center gap-1"><AlertTriangle className="h-3 w-3" />{stats.openIssues}</span>}
          </div>
          <div className="space-y-2">
            {(event.activity || []).slice(0, 6).map(a => (
              <div key={a.id} className="flex items-start gap-2 text-xs py-1.5">
                <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-primary flex-shrink-0" />
                <span className="text-foreground flex-1">{a.text}</span>
                <span className="text-muted-foreground">{new Date(a.ts).toLocaleDateString()}</span>
              </div>
            ))}
            {!(event.activity || []).length && <p className="text-xs text-muted-foreground">No activity yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
