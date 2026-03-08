import Navbar from "@/components/Navbar";
import SaasFooter from "@/components/landing/saas/SaasFooter";
import { Search, Eye, Shuffle, ListFilter, CalendarDays } from "lucide-react";
import { useState } from "react";

const categories = ["All", "Weddings", "Corporate", "Conferences", "Social", "Birthday", "Workshops", "Paid Templates"];

const templates = [
  { name: "Classic Wedding Planner", category: "Weddings", image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop", uses: "12.4k", author: "EventPro", isPro: true },
  { name: "Tech Conference Blueprint", category: "Conferences", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop", uses: "8.2k", author: "Sam", price: "$39" },
  { name: "Team Building Day Plan", category: "Corporate", image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=400&h=300&fit=crop", uses: "15.1k", author: "Meng To", isPro: true },
  { name: "Garden Party Template", category: "Social", image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop", uses: "9.3k", author: "EventPro", price: "$29" },
  { name: "Milestone Birthday Bash", category: "Birthday", image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop", uses: "11.7k", author: "Sam", isPro: true },
  { name: "Executive Summit Guide", category: "Corporate", image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=400&h=300&fit=crop", uses: "6.5k", author: "Meng To", price: "$49" },
  { name: "Creative Workshop Kit", category: "Workshops", image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=400&h=300&fit=crop", uses: "7.8k", author: "EventPro", isPro: true },
  { name: "Destination Wedding", category: "Weddings", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop", uses: "5.9k", author: "Sam", price: "$39" },
  { name: "Product Launch Playbook", category: "Corporate", image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=300&fit=crop", uses: "10.2k", author: "Meng To", isPro: true },
  { name: "Networking Mixer", category: "Social", image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=300&fit=crop", uses: "13.0k", author: "EventPro", price: "$29" },
];

const TemplatesPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSort, setActiveSort] = useState("Popular");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = templates.filter(t =>
    (activeCategory === "All" || activeCategory === "Paid Templates" ? (activeCategory === "Paid Templates" ? !!t.price : true) : t.category === activeCategory) &&
    (searchQuery === "" || t.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-36 pb-20 container mx-auto px-4 lg:px-8">
        {/* Hero */}
        <div className="max-w-3xl mb-12">
          <span className="text-sm font-medium text-primary">Templates</span>
          <h1 className="text-4xl md:text-[3.5rem] font-bold text-foreground tracking-tight leading-[1.1] mt-3 mb-4">
            Start with a template
          </h1>
          <p className="text-muted-foreground">
            Browse our curated collection of event templates. Remix, customize, and deploy in minutes.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
          <div className="flex-1 relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input type="text" placeholder={`Search ${templates.length} templates...`}
              className="w-full h-11 rounded-full bg-card pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none border border-border focus:ring-2 focus:ring-primary/20 transition-shadow"
              value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          </div>
          <div className="flex gap-1 bg-secondary rounded-lg p-0.5">
            {[{ label: "Popular", icon: ListFilter }, { label: "Recent", icon: CalendarDays }].map(sort => (
              <button key={sort.label} onClick={() => setActiveSort(sort.label)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${activeSort === sort.label ? 'bg-card border border-border shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                <sort.icon className="w-3.5 h-3.5" />{sort.label}
              </button>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 text-sm font-medium rounded-full border transition-all duration-200 ${activeCategory === cat ? 'border-foreground/30 bg-foreground/5 text-foreground' : 'border-border text-muted-foreground hover:text-foreground hover:bg-secondary'}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((t, i) => (
            <div key={i} className="rounded-2xl border border-border overflow-hidden bg-card hover:shadow-elevated transition-all duration-200 group cursor-pointer">
              <div className="relative h-48 bg-secondary overflow-hidden">
                <img src={t.image} alt={t.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start gap-2 mb-2">
                  <h3 className="text-sm font-semibold text-foreground truncate flex-1">{t.name}</h3>
                  {t.isPro ? (
                    <span className="text-[10px] bg-secondary px-2 py-0.5 rounded-md text-muted-foreground flex-shrink-0 font-medium">PRO</span>
                  ) : (
                    <span className="text-sm font-semibold text-foreground flex-shrink-0">{t.price}</span>
                  )}
                </div>
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span>{t.author}</span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 hover:text-foreground cursor-pointer"><Shuffle className="w-3 h-3" /> Remix</span>
                    <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {t.uses}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No templates found.</p>
          </div>
        )}
      </div>
      <SaasFooter />
    </div>
  );
};

export default TemplatesPage;
