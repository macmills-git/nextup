import Navbar from "@/components/Navbar";
import VariantFooter from "@/components/VariantFooter";
import { Search, Eye, Shuffle, ListFilter, CalendarDays } from "lucide-react";
import { useState } from "react";

const categories = ["All", "Weddings", "Corporate", "Conferences", "Social", "Birthday", "Workshops", "Paid Templates"];

const templates = [
  { name: "Classic Wedding Planner", category: "Weddings", budget: "Premium", image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop", uses: "12.4k", author: "EventPro", isPro: true },
  { name: "Tech Conference Blueprint", category: "Conferences", budget: "Luxury", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop", uses: "8.2k", author: "Sam", price: "$39" },
  { name: "Team Building Day Plan", category: "Corporate", budget: "Regular", image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=400&h=300&fit=crop", uses: "15.1k", author: "Meng To", isPro: true },
  { name: "Garden Party Template", category: "Social", budget: "Regular", image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop", uses: "9.3k", author: "EventPro", price: "$29" },
  { name: "Milestone Birthday Bash", category: "Birthday", budget: "Premium", image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop", uses: "11.7k", author: "Sam", isPro: true },
  { name: "Executive Summit Guide", category: "Corporate", budget: "Luxury", image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=400&h=300&fit=crop", uses: "6.5k", author: "Meng To", price: "$49" },
  { name: "Creative Workshop Kit", category: "Workshops", budget: "Regular", image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=400&h=300&fit=crop", uses: "7.8k", author: "EventPro", isPro: true },
  { name: "Destination Wedding Planner", category: "Weddings", budget: "Luxury", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop", uses: "5.9k", author: "Sam", price: "$39" },
  { name: "Product Launch Playbook", category: "Corporate", budget: "Premium", image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=300&fit=crop", uses: "10.2k", author: "Meng To", isPro: true },
  { name: "Networking Mixer Template", category: "Social", budget: "Regular", image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=300&fit=crop", uses: "13.0k", author: "EventPro", price: "$29" },
  { name: "Charity Gala Organizer", category: "Social", budget: "Premium", image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=400&h=300&fit=crop", uses: "4.1k", author: "Sam", isPro: true },
  { name: "Annual Board Meeting", category: "Corporate", budget: "Regular", image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=300&fit=crop", uses: "3.8k", author: "Meng To", price: "$19" },
  { name: "Kids Party Planner", category: "Birthday", budget: "Regular", image: "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=400&h=300&fit=crop", uses: "16.2k", author: "EventPro", isPro: true },
  { name: "Hackathon Blueprint", category: "Conferences", budget: "Regular", image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop", uses: "7.3k", author: "Sam", price: "$29" },
  { name: "Cocktail Reception Kit", category: "Social", budget: "Premium", image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=400&h=300&fit=crop", uses: "5.5k", author: "Meng To", isPro: true },
  { name: "Startup Demo Day", category: "Conferences", budget: "Regular", image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop", uses: "8.9k", author: "EventPro", price: "$35" },
  { name: "Outdoor Festival Planner", category: "Social", budget: "Luxury", image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&h=300&fit=crop", uses: "14.6k", author: "Sam", isPro: true },
  { name: "Award Ceremony Guide", category: "Corporate", budget: "Premium", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop", uses: "6.7k", author: "Meng To", price: "$45" },
  { name: "Bridal Shower Template", category: "Weddings", budget: "Regular", image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=300&fit=crop", uses: "9.1k", author: "EventPro", isPro: true },
  { name: "Corporate Retreat Kit", category: "Corporate", budget: "Premium", image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=400&h=300&fit=crop", uses: "5.3k", author: "Sam", price: "$42" },
  { name: "Baby Shower Planner", category: "Birthday", budget: "Regular", image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&h=300&fit=crop", uses: "11.4k", author: "Meng To", isPro: true },
  { name: "Trade Show Blueprint", category: "Conferences", budget: "Luxury", image: "https://images.unsplash.com/photo-1591115765373-5f9cf1da241c?w=400&h=300&fit=crop", uses: "4.8k", author: "EventPro", price: "$55" },
  { name: "Holiday Party Template", category: "Social", budget: "Regular", image: "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=400&h=300&fit=crop", uses: "17.2k", author: "Sam", isPro: true },
  { name: "Webinar Setup Guide", category: "Conferences", budget: "Regular", image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&h=300&fit=crop", uses: "12.8k", author: "Meng To", price: "$22" },
  { name: "Anniversary Celebration", category: "Social", budget: "Premium", image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&h=300&fit=crop", uses: "7.6k", author: "EventPro", isPro: true },
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
    <div className="min-h-screen bg-secondary dark:bg-background">
      <Navbar />
      <div className="pt-28 pb-20 container mx-auto px-4 lg:px-8">
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input type="text" placeholder={`Search ${templates.length} templates...`}
                className="w-full h-11 rounded-full bg-secondary dark:bg-accent pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none border-none focus:ring-2 focus:ring-primary/20 transition-shadow"
                value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            </div>
            <div className="flex gap-1 bg-secondary dark:bg-accent rounded-lg p-0.5">
              {[{ label: "Popular", icon: ListFilter }, { label: "Recent", icon: CalendarDays }].map(sort => (
                <button key={sort.label} onClick={() => setActiveSort(sort.label)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${activeSort === sort.label ? 'bg-card border border-border shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                  <sort.icon className="w-3.5 h-3.5" />{sort.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex flex-wrap items-center gap-2">
              {categories.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 text-sm font-medium rounded-full border transition-all duration-200 ${activeCategory === cat ? cat === "Paid Templates" ? 'border-primary/40 bg-primary/5 text-primary' : 'border-foreground/20 bg-foreground/5 text-foreground' : 'border-border text-muted-foreground hover:text-foreground hover:bg-secondary dark:hover:bg-accent'}`}>
                  {cat}
                </button>
              ))}
            </div>
            <div className="hidden md:flex items-center gap-3">
              <span className="text-sm text-muted-foreground cursor-pointer hover:text-foreground">Mine</span>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-sm text-muted-foreground hover:text-foreground">
                <ListFilter className="w-3.5 h-3.5" /> All Types
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {filtered.map((t, i) => (
              <div key={i} className="rounded-xl border border-border overflow-hidden bg-card hover:shadow-elevated transition-all duration-200 group cursor-pointer">
                <div className="relative h-44 bg-secondary overflow-hidden">
                  <img src={t.image} alt={t.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                </div>
                <div className="p-3">
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <h3 className="text-sm font-semibold text-foreground truncate flex-1">{t.name}</h3>
                    {t.isPro ? (
                      <span className="text-[11px] bg-secondary dark:bg-accent px-2 py-0.5 rounded-md text-muted-foreground flex-shrink-0 font-medium">PRO</span>
                    ) : (
                      <span className="text-sm font-semibold text-foreground flex-shrink-0">{t.price}</span>
                    )}
                  </div>
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-secondary dark:bg-accent overflow-hidden flex-shrink-0" />
                      <span className="truncate">{t.author}</span>
                    </div>
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
      </div>
      <Footer />
    </div>
  );
};

export default TemplatesPage;
