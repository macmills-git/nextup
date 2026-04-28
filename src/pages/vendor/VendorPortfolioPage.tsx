import { useState } from "react";
import { Plus, Trash2, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const seedItems = [
  { id: 1, title: "Garden Wedding · 2026", url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop" },
  { id: 2, title: "Corporate Gala · Hilton", url: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=600&h=400&fit=crop" },
  { id: 3, title: "Birthday Celebration", url: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&h=400&fit=crop" },
  { id: 4, title: "Product Launch", url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&h=400&fit=crop" },
];

const VendorPortfolioPage = () => {
  const [items, setItems] = useState(seedItems);
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState({ title: "", url: "" });

  const handleAdd = () => {
    if (!draft.title.trim() || !draft.url.trim()) return;
    setItems((prev) => [{ id: Date.now(), ...draft }, ...prev]);
    setDraft({ title: "", url: "" });
    setAdding(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Portfolio</h1>
          <p className="text-sm text-muted-foreground">Showcase your best work to win more bookings.</p>
        </div>
        <Button onClick={() => setAdding(true)} className="rounded-lg">
          <Plus className="h-4 w-4 mr-1.5" /> Add work
        </Button>
      </div>

      {adding && (
        <div className="bg-card border border-border rounded-xl p-4 space-y-3">
          <input value={draft.title} onChange={(e) => setDraft((p) => ({ ...p, title: e.target.value }))}
            placeholder="Project title" className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm outline-none" />
          <input value={draft.url} onChange={(e) => setDraft((p) => ({ ...p, url: e.target.value }))}
            placeholder="Image URL (https://...)" className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm outline-none" />
          <div className="flex gap-2">
            <Button onClick={handleAdd} size="sm" className="rounded-lg">Add</Button>
            <Button onClick={() => setAdding(false)} size="sm" variant="ghost" className="rounded-lg">Cancel</Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item.id} className="group rounded-xl overflow-hidden border border-border bg-card relative">
            <div className="aspect-[4/3] bg-muted overflow-hidden">
              <img src={item.url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
            </div>
            <div className="p-3 flex items-center justify-between">
              <p className="text-xs font-medium text-foreground truncate">{item.title}</p>
              <button onClick={() => setItems((prev) => prev.filter((i) => i.id !== item.id))}
                className="text-muted-foreground hover:text-destructive transition-colors">
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="col-span-full text-center py-12 border border-dashed border-border rounded-xl">
            <ImageIcon className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No portfolio items yet. Add your best work.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorPortfolioPage;
