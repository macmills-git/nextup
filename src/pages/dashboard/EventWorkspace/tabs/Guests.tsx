import { useMemo, useState } from "react";
import { Plus, Upload, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEventStore, type EventModel, type GuestEntry } from "@/contexts/EventStore";
import { toast } from "sonner";

const SEGMENTS: GuestEntry["segment"][] = ["vip", "family", "sponsor", "media", "staff", "general"];

const Guests = ({ event }: { event: EventModel }) => {
  const { addGuest, updateGuest } = useEventStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [segment, setSegment] = useState<GuestEntry["segment"]>("general");
  const [filter, setFilter] = useState<"all" | GuestEntry["segment"]>("all");

  const guests = event.guestsList || [];
  const filtered = guests.filter(g => filter === "all" || g.segment === filter);
  const stats = useMemo(() => ({
    total: guests.length,
    accepted: guests.filter(g => g.rsvp === "accepted").length,
    declined: guests.filter(g => g.rsvp === "declined").length,
    pending: guests.filter(g => g.rsvp === "pending").length,
    checkedIn: guests.filter(g => g.checkedIn).length,
  }), [guests]);

  const add = () => {
    if (!name.trim()) return;
    addGuest(event.id, { name, email, segment });
    setName(""); setEmail("");
  };

  const importCsv = () => {
    const sample = ["Jane Doe,jane@example.com,vip", "Mark Lee,mark@example.com,family", "Anna Kim,anna@example.com,sponsor"];
    sample.forEach(row => {
      const [n, e, s] = row.split(",");
      addGuest(event.id, { name: n, email: e, segment: s as any });
    });
    toast.success(`Imported ${sample.length} sample guests`);
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {[["Total", stats.total], ["Accepted", stats.accepted], ["Declined", stats.declined], ["Pending", stats.pending], ["Checked-in", stats.checkedIn]].map(([l, v]) => (
          <div key={l as string} className="bg-card border border-border rounded-xl p-3">
            <p className="text-xs text-muted-foreground">{l}</p>
            <p className="text-xl font-bold text-foreground">{v}</p>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-xl p-4 flex flex-col sm:flex-row gap-2">
        <Input placeholder="Guest name" value={name} onChange={e => setName(e.target.value)} className="flex-1" />
        <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="sm:w-56" />
        <select value={segment} onChange={e => setSegment(e.target.value as any)} className="px-3 rounded-md border border-border bg-background text-foreground text-sm">
          {SEGMENTS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <Button onClick={add} className="bg-foreground text-background"><Plus className="h-4 w-4 mr-1" />Add</Button>
        <Button variant="outline" onClick={importCsv}><Upload className="h-4 w-4 mr-1" />Import sample</Button>
      </div>

      <div className="flex gap-1.5 flex-wrap">
        <button onClick={() => setFilter("all")} className={`px-3 py-1 rounded-lg text-xs ${filter === "all" ? "bg-foreground text-background" : "border border-border text-muted-foreground"}`}>All</button>
        {SEGMENTS.map(s => (
          <button key={s} onClick={() => setFilter(s)} className={`px-3 py-1 rounded-lg text-xs capitalize ${filter === s ? "bg-foreground text-background" : "border border-border text-muted-foreground"}`}>{s}</button>
        ))}
      </div>

      <div className="bg-card border border-border rounded-xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border text-xs text-muted-foreground">
            {["Name", "Email", "Segment", "RSVP", "Seat", "Check-in"].map(h => <th key={h} className="text-left py-3 px-3 font-medium">{h}</th>)}
          </tr></thead>
          <tbody>
            {filtered.map(g => (
              <tr key={g.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                <td className="px-3 py-2 text-foreground">{g.name}</td>
                <td className="px-3 py-2 text-muted-foreground text-xs">{g.email}</td>
                <td className="px-3 py-2"><span className="text-[10px] px-2 py-0.5 rounded-md bg-muted capitalize">{g.segment}</span></td>
                <td className="px-3 py-2">
                  <select value={g.rsvp} onChange={e => updateGuest(event.id, g.id, { rsvp: e.target.value as any })} className="text-xs px-2 py-1 rounded border border-border bg-background">
                    {["pending", "accepted", "declined"].map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </td>
                <td className="px-3 py-2">
                  <input defaultValue={g.seat || ""} onBlur={e => updateGuest(event.id, g.id, { seat: e.target.value })} placeholder="—" className="w-16 px-2 py-1 text-xs rounded border border-border bg-background" />
                </td>
                <td className="px-3 py-2">
                  <button onClick={() => updateGuest(event.id, g.id, { checkedIn: !g.checkedIn })}>
                    {g.checkedIn ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <XCircle className="h-4 w-4 text-muted-foreground" />}
                  </button>
                </td>
              </tr>
            ))}
            {!filtered.length && <tr><td colSpan={6} className="text-center py-8 text-xs text-muted-foreground">No guests yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Guests;
