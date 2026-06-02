import { useMemo, useState } from "react";
import { Radio, AlertTriangle, Plus, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEventStore, type EventModel } from "@/contexts/EventStore";

const EventDay = ({ event }: { event: EventModel }) => {
  const { addIssue, resolveIssue, updateGuest, moveVendor } = useEventStore();
  const [issueText, setIssueText] = useState("");

  const runsheet = (event.timeline || []).filter(t => t.layer === "runsheet");
  const guests = event.guestsList || [];
  const checkedIn = guests.filter(g => g.checkedIn).length;
  const vendors = event.vendors || [];
  const onSite = vendors.filter(v => v.stage === "executing").length;
  const issues = (event.issues || []).filter(i => !i.resolved);

  const aiHint = useMemo(() => {
    if (issues.some(i => /cater/i.test(i.text))) return "Catering delay detected → shift speeches by 15min and notify coordinator.";
    if (issues.length >= 3) return "Multiple issues open — escalate to logistics lead.";
    if (checkedIn / Math.max(1, guests.length) > 0.8) return "80%+ guests in. Consider starting program.";
    return null;
  }, [issues, checkedIn, guests.length]);

  return (
    <div className="space-y-5">
      <div className="bg-gradient-to-br from-foreground to-foreground/90 text-background rounded-2xl p-5 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-background/15 flex items-center justify-center"><Radio className="h-6 w-6 animate-pulse" /></div>
        <div className="flex-1">
          <p className="text-xs opacity-70 uppercase tracking-wider">Event-day mode</p>
          <h2 className="text-lg font-bold">{event.title}</h2>
        </div>
        <div className="text-right">
          <p className="text-xs opacity-70">LIVE</p>
          <p className="text-2xl font-bold">{checkedIn}<span className="text-sm opacity-70">/{guests.length}</span></p>
        </div>
      </div>

      {aiHint && (
        <div className="bg-primary/10 border border-primary/30 rounded-xl p-3 text-xs text-primary flex items-center gap-2">
          <Sparkles className="h-4 w-4" />{aiHint}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-4">
          <h3 className="font-semibold text-foreground mb-3 text-sm">Live run sheet</h3>
          <div className="space-y-2">
            {runsheet.map(r => (
              <div key={r.id} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                <span className="text-xs font-mono w-16 text-muted-foreground">{r.start}</span>
                <span className="text-sm text-foreground flex-1">{r.title}</span>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground hover:text-emerald-500 cursor-pointer" />
              </div>
            ))}
            {!runsheet.length && <p className="text-xs text-muted-foreground py-6 text-center">Build run sheet in Timeline → Run Sheet.</p>}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-card border border-border rounded-xl p-4">
            <h3 className="font-semibold text-foreground mb-3 text-sm">Vendor check-in</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {vendors.filter(v => ["booked", "executing"].includes(v.stage)).map(v => (
                <div key={v.id} className="flex items-center justify-between text-xs py-1.5">
                  <span className="text-foreground truncate">{v.name}</span>
                  <button onClick={() => moveVendor(event.id, v.id, v.stage === "executing" ? "booked" : "executing")}
                    className={`px-2 py-0.5 rounded ${v.stage === "executing" ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" : "bg-muted text-muted-foreground"}`}>
                    {v.stage === "executing" ? "On site" : "Check in"}
                  </button>
                </div>
              ))}
              {!vendors.length && <p className="text-xs text-muted-foreground">No vendors.</p>}
            </div>
            <p className="text-[10px] text-muted-foreground mt-2">{onSite} on site</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-4">
            <h3 className="font-semibold text-foreground mb-3 text-sm flex items-center gap-1.5"><AlertTriangle className="h-4 w-4 text-amber-500" />Issues</h3>
            <div className="flex gap-2 mb-3">
              <Input placeholder="Report issue..." value={issueText} onChange={e => setIssueText(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && issueText.trim()) { addIssue(event.id, { text: issueText }); setIssueText(""); }}} className="text-xs h-8" />
              <Button size="sm" onClick={() => { if (issueText.trim()) { addIssue(event.id, { text: issueText }); setIssueText(""); }}} className="bg-foreground text-background h-8 px-2"><Plus className="h-3.5 w-3.5" /></Button>
            </div>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {issues.map(i => (
                <div key={i.id} className="flex items-start gap-2 text-xs">
                  <span className="text-foreground flex-1">{i.text}</span>
                  <button onClick={() => resolveIssue(event.id, i.id)} className="text-emerald-500 text-[10px]">Resolve</button>
                </div>
              ))}
              {!issues.length && <p className="text-xs text-muted-foreground">No active issues.</p>}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-4">
        <h3 className="font-semibold text-foreground mb-3 text-sm">Quick guest check-in</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-h-64 overflow-y-auto">
          {guests.map(g => (
            <button key={g.id} onClick={() => updateGuest(event.id, g.id, { checkedIn: !g.checkedIn })}
              className={`p-2 rounded-lg text-xs text-left transition-all ${g.checkedIn ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30" : "border border-border hover:bg-muted"}`}>
              {g.name}
            </button>
          ))}
          {!guests.length && <p className="text-xs text-muted-foreground col-span-full text-center py-4">No guests imported.</p>}
        </div>
      </div>
    </div>
  );
};

export default EventDay;
