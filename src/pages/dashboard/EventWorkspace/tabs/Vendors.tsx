import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEventStore, type EventModel, type VendorEntry } from "@/contexts/EventStore";

const STAGES: { key: VendorEntry["stage"]; label: string }[] = [
  { key: "discover", label: "Discover" },
  { key: "shortlist", label: "Shortlist" },
  { key: "negotiate", label: "Negotiate" },
  { key: "booked", label: "Booked" },
  { key: "executing", label: "Executing" },
  { key: "reviewed", label: "Reviewed" },
];

const Vendors = ({ event }: { event: EventModel }) => {
  const { addVendor, moveVendor } = useEventStore();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [quote, setQuote] = useState("");

  const vendors = event.vendors || [];

  const add = () => {
    if (!name.trim()) return;
    addVendor(event.id, { name, category: category || "Misc", quote: Number(quote) || undefined });
    setName(""); setCategory(""); setQuote("");
  };

  return (
    <div className="space-y-5">
      <div className="bg-card border border-border rounded-xl p-4 flex flex-col sm:flex-row gap-2">
        <Input placeholder="Vendor name" value={name} onChange={e => setName(e.target.value)} className="flex-1" />
        <Input placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} className="sm:w-40" />
        <Input type="number" placeholder="Quote $" value={quote} onChange={e => setQuote(e.target.value)} className="sm:w-32" />
        <Button onClick={add} className="bg-foreground text-background"><Plus className="h-4 w-4 mr-1" />Add</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {STAGES.map(stage => {
          const items = vendors.filter(v => v.stage === stage.key);
          return (
            <div key={stage.key} className="bg-card border border-border rounded-xl p-3 min-h-[200px]">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-semibold text-foreground">{stage.label}</h3>
                <span className="text-[10px] text-muted-foreground">{items.length}</span>
              </div>
              <div className="space-y-2">
                {items.map(v => (
                  <div key={v.id} className="p-2.5 rounded-lg border border-border bg-background hover:shadow-elevated transition-all">
                    <p className="text-xs font-medium text-foreground truncate">{v.name}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{v.category}{v.quote ? ` · $${v.quote.toLocaleString()}` : ""}</p>
                    <select value={v.stage} onChange={e => moveVendor(event.id, v.id, e.target.value as VendorEntry["stage"])}
                      className="mt-2 w-full text-[10px] px-2 py-1 rounded border border-border bg-card text-foreground">
                      {STAGES.map(s => <option key={s.key} value={s.key}>Move to {s.label}</option>)}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <p className="text-xs text-muted-foreground">💡 Moving a vendor to <b>Booked</b> auto-creates a budget line, a task, and a vendor timeline entry.</p>
    </div>
  );
};

export default Vendors;
