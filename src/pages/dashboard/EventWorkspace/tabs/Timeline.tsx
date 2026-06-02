import { useState } from "react";
import { Plus, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEventStore, type EventModel, type TimelineItem } from "@/contexts/EventStore";

const LAYERS: { key: TimelineItem["layer"]; label: string; desc: string }[] = [
  { key: "planning", label: "Planning", desc: "Bookings, approvals, rehearsals" },
  { key: "runsheet", label: "Run Sheet", desc: "Event-day schedule" },
  { key: "vendor", label: "Vendor", desc: "Per-vendor arrival & setup" },
  { key: "team", label: "Team", desc: "Crew responsibilities" },
];

const Timeline = ({ event }: { event: EventModel }) => {
  const { addTimeline } = useEventStore();
  const [layer, setLayer] = useState<TimelineItem["layer"]>("planning");
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");

  const items = (event.timeline || []).filter(t => t.layer === layer);

  // Heuristic overlap detection
  const warnings: string[] = [];
  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      if (items[i].start === items[j].start && items[i].start) {
        warnings.push(`Overlap: "${items[i].title}" & "${items[j].title}" both at ${items[i].start}`);
      }
    }
  }

  const add = () => {
    if (!title.trim()) return;
    addTimeline(event.id, { layer, title, start: start || "TBD" });
    setTitle(""); setStart("");
  };

  return (
    <div className="space-y-5">
      <div className="flex gap-1.5 flex-wrap">
        {LAYERS.map(l => (
          <button key={l.key} onClick={() => setLayer(l.key)}
            className={`px-3 py-2 rounded-lg text-xs transition-all ${layer === l.key ? "bg-foreground text-background" : "border border-border text-muted-foreground hover:bg-muted"}`}>
            <span className="font-medium">{l.label}</span>
            <span className="ml-2 opacity-60">{l.desc}</span>
          </button>
        ))}
      </div>

      {!!warnings.length && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 space-y-1">
          {warnings.map((w, i) => (
            <p key={i} className="text-xs text-amber-700 dark:text-amber-300 flex items-center gap-2"><AlertTriangle className="h-3.5 w-3.5" />AI detected: {w}</p>
          ))}
        </div>
      )}

      <div className="bg-card border border-border rounded-xl p-4 flex flex-col sm:flex-row gap-2">
        <Input placeholder={`New ${layer} item (e.g. ${layer === "runsheet" ? "Doors open" : "Confirm catering"})`} value={title} onChange={e => setTitle(e.target.value)} className="flex-1" />
        <Input placeholder="Start (e.g. 18:00 or T-7d)" value={start} onChange={e => setStart(e.target.value)} className="sm:w-48" />
        <Button onClick={add} className="bg-foreground text-background"><Plus className="h-4 w-4 mr-1" />Add</Button>
      </div>

      <div className="bg-card border border-border rounded-xl divide-y divide-border">
        {items.map(item => (
          <div key={item.id} className="p-4 flex items-center gap-4">
            <div className="w-20 text-xs font-mono text-muted-foreground">{item.start}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{item.title}</p>
              {item.owner && <p className="text-xs text-muted-foreground">Owner: {item.owner}</p>}
            </div>
            {item.vendorId && <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary">vendor</span>}
          </div>
        ))}
        {!items.length && <div className="p-8 text-center text-xs text-muted-foreground">No items in this layer yet.</div>}
      </div>
    </div>
  );
};

export default Timeline;
