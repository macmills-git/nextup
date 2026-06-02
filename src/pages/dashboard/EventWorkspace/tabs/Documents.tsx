import { useState } from "react";
import { Plus, FileText, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEventStore, type EventModel, type DocItem } from "@/contexts/EventStore";
import { toast } from "sonner";

const TYPES: DocItem["type"][] = ["contract", "permit", "invoice", "moodboard", "floorplan", "runsheet", "quote", "other"];

const Documents = ({ event }: { event: EventModel }) => {
  const { addDoc } = useEventStore();
  const [name, setName] = useState("");
  const [type, setType] = useState<DocItem["type"]>("contract");

  const docs = event.documents || [];

  const add = () => {
    if (!name.trim()) return;
    const extracted = type === "contract" || type === "invoice"
      ? { amount: Math.round(Math.random() * 10000), date: new Date().toLocaleDateString(), terms: "Net 30, 50% deposit" }
      : undefined;
    addDoc(event.id, { name, type, size: `${(Math.random() * 5).toFixed(1)}MB`, extracted });
    toast.success(extracted ? "Document uploaded — AI extracted key fields" : "Document uploaded");
    setName("");
  };

  return (
    <div className="space-y-5">
      <div className="bg-card border border-border rounded-xl p-4 flex flex-col sm:flex-row gap-2">
        <Input placeholder="Document name (e.g. venue_contract.pdf)" value={name} onChange={e => setName(e.target.value)} className="flex-1" />
        <select value={type} onChange={e => setType(e.target.value as any)} className="px-3 rounded-md border border-border bg-background text-foreground text-sm">
          {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <Button onClick={add} className="bg-foreground text-background"><Plus className="h-4 w-4 mr-1" />Add</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {docs.map(d => (
          <div key={d.id} className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center"><FileText className="h-5 w-5 text-foreground" /></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{d.name}</p>
                <p className="text-xs text-muted-foreground">{d.type} · {d.size}</p>
              </div>
            </div>
            {d.extracted && (
              <div className="mt-3 p-3 rounded-lg bg-primary/5 border border-primary/20 space-y-1 text-xs">
                <p className="flex items-center gap-1.5 font-medium text-primary"><Sparkles className="h-3 w-3" />AI extracted</p>
                {d.extracted.amount !== undefined && <p className="text-foreground">Amount: <b>${d.extracted.amount.toLocaleString()}</b></p>}
                {d.extracted.date && <p className="text-foreground">Date: {d.extracted.date}</p>}
                {d.extracted.terms && <p className="text-muted-foreground">{d.extracted.terms}</p>}
              </div>
            )}
          </div>
        ))}
        {!docs.length && <div className="md:col-span-2 text-center py-12 text-xs text-muted-foreground bg-card border border-border rounded-xl">No documents yet.</div>}
      </div>
    </div>
  );
};

export default Documents;
