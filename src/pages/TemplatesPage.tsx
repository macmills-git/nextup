import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Users, Star, Search, Eye, Shuffle } from "lucide-react";
import { useState } from "react";

const categories = ["All", "Weddings", "Corporate", "Conferences", "Social", "Birthday", "Workshops"];
const sortOptions = ["Popular", "Recent"];

const templates = [
  { name: "Classic Wedding", category: "Weddings", budget: "Premium", guests: "100-200", duration: "1 day", image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop", rating: 4.9, uses: "12.4k", author: "EventPro", isPro: true },
  { name: "Tech Conference", category: "Conferences", budget: "Luxury", guests: "500-1000", duration: "3 days", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop", rating: 4.8, uses: "8.2k", author: "Sam", price: "$39" },
  { name: "Team Building Day", category: "Corporate", budget: "Regular", guests: "20-50", duration: "1 day", image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=400&h=300&fit=crop", rating: 4.7, uses: "15.1k", author: "Meng To", isPro: true },
  { name: "Garden Party", category: "Social", budget: "Regular", guests: "30-80", duration: "4 hours", image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop", rating: 4.6, uses: "9.3k", author: "EventPro", price: "$29" },
  { name: "Milestone Birthday", category: "Birthday", budget: "Premium", guests: "50-100", duration: "6 hours", image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop", rating: 4.8, uses: "11.7k", author: "Sam", isPro: true },
  { name: "Executive Summit", category: "Corporate", budget: "Luxury", guests: "50-100", duration: "2 days", image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=400&h=300&fit=crop", rating: 4.9, uses: "6.5k", author: "Meng To", price: "$49" },
  { name: "Creative Workshop", category: "Workshops", budget: "Regular", guests: "10-30", duration: "3 hours", image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=400&h=300&fit=crop", rating: 4.5, uses: "7.8k", author: "EventPro", isPro: true },
  { name: "Destination Wedding", category: "Weddings", budget: "Luxury", guests: "50-150", duration: "3 days", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop", rating: 4.9, uses: "5.9k", author: "Sam", price: "$39" },
  { name: "Product Launch", category: "Corporate", budget: "Premium", guests: "100-300", duration: "1 day", image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=300&fit=crop", rating: 4.7, uses: "10.2k", author: "Meng To", isPro: true },
  { name: "Networking Mixer", category: "Social", budget: "Regular", guests: "50-150", duration: "3 hours", image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=300&fit=crop", rating: 4.6, uses: "13.0k", author: "EventPro", price: "$29" },
];

const TemplatesPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSort, setActiveSort] = useState("Popular");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = templates.filter(t =>
    (activeCategory === "All" || t.category === activeCategory) &&
    (searchQuery === "" || t.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-20 container mx-auto px-4 lg:px-8">
        <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
          {/* Search + Sort */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder={`Search ${templates.length} templates...`}
                className="w-full h-10 rounded-full bg-secondary border-none pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-1">
              {sortOptions.map(sort => (
                <button
                  key={sort}
                  onClick={() => setActiveSort(sort)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeSort === sort ? 'bg-card border border-border shadow-card text-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {sort}
                </button>
              ))}
            </div>
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 text-sm font-medium rounded-full border transition-all duration-200 ${
                  activeCategory === cat
                    ? 'border-primary/30 bg-primary/5 text-primary'
                    : 'border-border text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Templates grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {filtered.map((t, i) => (
              <div key={i} className="rounded-xl border border-border overflow-hidden bg-card hover:shadow-elevated transition-shadow group">
                <div className="relative h-40 bg-secondary">
                  <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-3">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-sm font-semibold text-foreground truncate flex-1">{t.name}</h3>
                    {t.isPro ? (
                      <span className="text-xs bg-secondary px-2 py-0.5 rounded-md text-muted-foreground ml-2 flex-shrink-0">PRO</span>
                    ) : (
                      <span className="text-xs font-medium text-foreground ml-2 flex-shrink-0">{t.price}</span>
                    )}
                  </div>
                  <div className="flex justify-between items-center mt-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-secondary" />
                      <span>{t.author}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1"><Shuffle className="w-3 h-3" /> Remix</span>
                      <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {t.uses}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No templates found. Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TemplatesPage;
