import { useMemo, useState } from "react";
import { Search, LayoutTemplate, Star } from "lucide-react";

const templateItems = [
  { id: 1, name: "Wedding Launch Kit", category: "Wedding", rating: 4.8 },
  { id: 2, name: "Corporate Summit Planner", category: "Corporate", rating: 4.7 },
  { id: 3, name: "Product Showcase Flow", category: "Launch", rating: 4.6 },
  { id: 4, name: "Festival Ops Board", category: "Social", rating: 4.5 },
  { id: 5, name: "Workshop Sprint Template", category: "Workshop", rating: 4.4 },
];

const DashboardTemplatesPage = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", "Wedding", "Corporate", "Launch", "Social", "Workshop"];
  const visible = useMemo(
    () =>
      templateItems.filter(
        (item) =>
          (category === "All" || item.category === category) &&
          item.name.toLowerCase().includes(query.toLowerCase())
      ),
    [query, category]
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Templates</h1>
        <p className="text-sm text-muted-foreground">Choose a template and kickstart your event setup.</p>
      </div>

      <div className="bg-card border border-border rounded-xl p-4 flex flex-col sm:flex-row gap-3 sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search templates..."
            className="w-full h-10 rounded-lg border border-border bg-background pl-9 pr-3 text-sm outline-none"
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs border transition-all ${
                category === cat ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {visible.map((item) => (
          <div key={item.id} className="bg-card border border-border rounded-xl p-4">
            <p className="font-medium text-foreground flex items-center gap-2">
              <LayoutTemplate className="h-4 w-4 text-primary" /> {item.name}
            </p>
            <p className="text-xs text-muted-foreground mt-1">{item.category}</p>
            <p className="text-xs text-muted-foreground mt-2 inline-flex items-center gap-1">
              <Star className="h-3.5 w-3.5 text-amber-500" /> {item.rating.toFixed(1)} rating
            </p>
            <button className="mt-3 text-xs px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
              Use template
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardTemplatesPage;
