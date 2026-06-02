import { useMemo, useState } from "react";
import { Plus, CheckCircle2, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEventStore, type EventModel } from "@/contexts/EventStore";

const Tasks = ({ event }: { event: EventModel }) => {
  const { addTask, toggleTask } = useEventStore();
  const [title, setTitle] = useState("");
  const [phase, setPhase] = useState("Planning");
  const [filter, setFilter] = useState<"all" | "todo" | "done">("all");

  const tasks = event.tasks || [];
  const grouped = useMemo(() => {
    const list = tasks.filter(t => filter === "all" || (filter === "done" ? t.status === "done" : t.status !== "done"));
    return list.reduce<Record<string, typeof list>>((acc, t) => {
      const k = t.phase || "Other";
      (acc[k] ||= []).push(t); return acc;
    }, {});
  }, [tasks, filter]);

  const add = () => {
    if (!title.trim()) return;
    addTask(event.id, { title, phase });
    setTitle("");
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row gap-2">
        <Input placeholder="New task title" value={title} onChange={e => setTitle(e.target.value)} className="flex-1" onKeyDown={e => e.key === "Enter" && add()} />
        <Input placeholder="Phase" value={phase} onChange={e => setPhase(e.target.value)} className="sm:w-40" />
        <Button onClick={add} className="bg-foreground text-background"><Plus className="h-4 w-4 mr-1" />Add task</Button>
        <div className="flex gap-1 bg-muted rounded-lg p-0.5">
          {(["all", "todo", "done"] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize ${filter === f ? "bg-card border border-border text-foreground" : "text-muted-foreground"}`}>{f}</button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {Object.entries(grouped).map(([phaseName, list]) => (
          <div key={phaseName} className="bg-card border border-border rounded-xl">
            <div className="px-4 py-3 border-b border-border flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">{phaseName}</h3>
              <span className="text-xs text-muted-foreground">{list.filter(t => t.status === "done").length}/{list.length}</span>
            </div>
            <div className="divide-y divide-border">
              {list.map(t => (
                <div key={t.id} className="px-4 py-3 flex items-center gap-3 hover:bg-muted/30">
                  <button onClick={() => toggleTask(event.id, t.id)} className="flex-shrink-0">
                    {t.status === "done"
                      ? <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      : <Circle className="h-4 w-4 text-muted-foreground" />}
                  </button>
                  <span className={`text-sm flex-1 ${t.status === "done" ? "text-muted-foreground line-through" : "text-foreground"}`}>{t.title}</span>
                  {t.priority && <span className={`text-[10px] px-2 py-0.5 rounded-full ${t.priority === "high" ? "bg-rose-500/15 text-rose-600 dark:text-rose-400" : t.priority === "med" ? "bg-amber-500/15 text-amber-600 dark:text-amber-400" : "bg-muted text-muted-foreground"}`}>{t.priority}</span>}
                  {t.vendorId && <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary">vendor</span>}
                  {t.due && <span className="text-xs text-muted-foreground">{t.due}</span>}
                </div>
              ))}
            </div>
          </div>
        ))}
        {!Object.keys(grouped).length && <div className="text-center py-12 text-xs text-muted-foreground">No tasks yet — add your first.</div>}
      </div>
    </div>
  );
};

export default Tasks;
