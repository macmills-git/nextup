import { useMemo, useState } from "react";
import { Plus, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEventStore, type EventModel } from "@/contexts/EventStore";

const Budget = ({ event }: { event: EventModel }) => {
  const { addBudgetLine, updateBudgetLine } = useEventStore();
  const [label, setLabel] = useState("");
  const [category, setCategory] = useState("");
  const [estimated, setEstimated] = useState("");

  const lines = event.budget || [];

  const totals = useMemo(() => lines.reduce((acc, l) => ({
    est: acc.est + (l.estimated || 0),
    appr: acc.appr + (l.approved || 0),
    actual: acc.actual + (l.actual || 0),
    pending: acc.pending + (l.pending || 0),
  }), { est: 0, appr: 0, actual: 0, pending: 0 }), [lines]);

  const add = () => {
    if (!label.trim()) return;
    addBudgetLine(event.id, { label, category: category || "Misc", estimated: Number(estimated) || 0 });
    setLabel(""); setCategory(""); setEstimated("");
  };

  const overrun = totals.actual > totals.est && totals.est > 0;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Estimated", v: totals.est },
          { label: "Approved", v: totals.appr },
          { label: "Actual spend", v: totals.actual, tone: overrun ? "warn" : "ok" },
          { label: "Pending", v: totals.pending },
        ].map(s => (
          <div key={s.label} className="bg-card border border-border rounded-xl p-4">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className={`text-xl font-bold ${s.tone === "warn" ? "text-amber-500" : "text-foreground"}`}>${s.v.toLocaleString()}</p>
          </div>
        ))}
      </div>

      {overrun && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 text-xs text-amber-700 dark:text-amber-300 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4" />AI: Spend exceeds estimate by ${(totals.actual - totals.est).toLocaleString()}.
        </div>
      )}

      <div className="bg-card border border-border rounded-xl p-4 flex flex-col sm:flex-row gap-2">
        <Input placeholder="Line item label" value={label} onChange={e => setLabel(e.target.value)} className="flex-1" />
        <Input placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} className="sm:w-40" />
        <Input type="number" placeholder="Estimated $" value={estimated} onChange={e => setEstimated(e.target.value)} className="sm:w-36" />
        <Button onClick={add} className="bg-foreground text-background"><Plus className="h-4 w-4 mr-1" />Add</Button>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border text-xs text-muted-foreground">
            {["Category", "Item", "Estimated", "Approved", "Actual", "Pending"].map(h => <th key={h} className="text-left py-3 px-3 font-medium">{h}</th>)}
          </tr></thead>
          <tbody>
            {lines.map(b => (
              <tr key={b.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                <td className="px-3 py-2 text-xs"><span className="px-2 py-0.5 rounded-md bg-muted text-foreground">{b.category}</span></td>
                <td className="px-3 py-2 text-foreground">{b.label} {b.vendorId && <span className="text-[10px] text-primary ml-1">·vendor</span>}</td>
                {(["estimated", "approved", "actual", "pending"] as const).map(k => (
                  <td key={k} className="px-3 py-1.5">
                    <input type="number" defaultValue={b[k] || 0} onBlur={e => updateBudgetLine(event.id, b.id, { [k]: Number(e.target.value) || 0 })}
                      className="w-24 px-2 py-1 rounded-md border border-border bg-background text-foreground text-xs" />
                  </td>
                ))}
              </tr>
            ))}
            {!lines.length && <tr><td colSpan={6} className="text-center py-8 text-xs text-muted-foreground">No budget lines yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Budget;
