import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEventStore, type EventModel, type ActivityItem } from "@/contexts/EventStore";

const KIND_COLOR: Record<ActivityItem["kind"], string> = {
  task: "bg-blue-500", vendor: "bg-primary", budget: "bg-amber-500",
  guest: "bg-emerald-500", doc: "bg-violet-500", team: "bg-pink-500",
  comms: "bg-cyan-500", system: "bg-muted-foreground",
};

const Communications = ({ event }: { event: EventModel }) => {
  const { logActivity } = useEventStore();
  const [channel, setChannel] = useState<"team" | "vendor" | "guest">("team");
  const [msg, setMsg] = useState("");

  const send = () => {
    if (!msg.trim()) return;
    logActivity(event.id, "comms", `${channel}: ${msg}`);
    setMsg("");
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-3">
        {(["team", "vendor", "guest"] as const).map(c => (
          <button key={c} onClick={() => setChannel(c)}
            className={`p-4 rounded-xl border text-left capitalize transition-all ${channel === c ? "border-primary bg-primary/5" : "border-border hover:border-foreground/30"}`}>
            <p className="text-sm font-semibold text-foreground">{c} channel</p>
            <p className="text-xs text-muted-foreground mt-1">
              {c === "team" && "Internal operations"}
              {c === "vendor" && "External vendor comms"}
              {c === "guest" && "Invitations & reminders"}
            </p>
          </button>
        ))}
      </div>

      <div className="bg-card border border-border rounded-xl p-4">
        <h3 className="font-semibold text-foreground mb-3 text-sm">Unified activity feed</h3>
        <div className="space-y-2 max-h-[400px] overflow-y-auto">
          {(event.activity || []).map(a => (
            <div key={a.id} className="flex items-start gap-3 py-2 border-b border-border last:border-0">
              <span className={`w-2 h-2 mt-1.5 rounded-full ${KIND_COLOR[a.kind]} flex-shrink-0`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">{a.text}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{a.kind} · {new Date(a.ts).toLocaleString()}</p>
              </div>
            </div>
          ))}
          {!(event.activity || []).length && <p className="text-xs text-muted-foreground py-8 text-center">No activity yet.</p>}
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-3 flex gap-2">
        <Input placeholder={`Message ${channel}...`} value={msg} onChange={e => setMsg(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} className="flex-1" />
        <Button onClick={send} className="bg-foreground text-background"><Send className="h-4 w-4" /></Button>
      </div>
    </div>
  );
};

export default Communications;
