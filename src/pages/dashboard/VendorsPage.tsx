import { useState } from "react";
import { Search, Plus, Star, MapPin, Heart, X, Eye, MessageSquare, Trash2, MoreHorizontal, ListFilter, CalendarDays, Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

type Vendor = {
  id: number; name: string; category: string; rating: number; reviews: number;
  location: string; phone: string; email: string; status: string; price: string;
  image: string; favorited: boolean;
};

const vendorImages = [
  "https://images.unsplash.com/photo-1556760544-74068565f05c?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1555244162-803834f70033?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1478146059778-26028b07395a?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop",
];

const initialVendors: Vendor[] = [
  { id: 1, name: "Akolo Studio", category: "Photography", rating: 4.9, reviews: 124, location: "Downtown", phone: "+1 555-0101", email: "hello@akolo.com", status: "verified", price: "$$$$", image: vendorImages[0], favorited: false },
  { id: 2, name: "Bake It Right", category: "Catering", rating: 4.7, reviews: 89, location: "Midtown", phone: "+1 555-0102", email: "info@bakeitright.com", status: "verified", price: "$$$", image: vendorImages[1], favorited: true },
  { id: 3, name: "Prime Audio", category: "Audio/Visual", rating: 4.8, reviews: 56, location: "West End", phone: "+1 555-0103", email: "book@primeaudio.com", status: "verified", price: "$$$", image: vendorImages[2], favorited: false },
  { id: 4, name: "Event Bloom", category: "Decoration", rating: 4.6, reviews: 102, location: "East Side", phone: "+1 555-0104", email: "design@eventbloom.com", status: "verified", price: "$$", image: vendorImages[3], favorited: false },
  { id: 5, name: "DJ Maxwell", category: "Entertainment", rating: 4.5, reviews: 73, location: "Central", phone: "+1 555-0105", email: "max@djmaxwell.com", status: "pending", price: "$$", image: vendorImages[4], favorited: false },
  { id: 6, name: "Luxe Rentals", category: "Equipment", rating: 4.4, reviews: 41, location: "Northside", phone: "+1 555-0106", email: "rent@luxerentals.com", status: "verified", price: "$$$", image: vendorImages[5], favorited: false },
];

const categories = ["All", "Photography", "Catering", "Audio/Visual", "Decoration", "Entertainment", "Equipment"];

const VendorsPage = () => {
  const [vendors, setVendors] = useState(initialVendors);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [showFavorites, setShowFavorites] = useState(false);
  const [menuOpen, setMenuOpen] = useState<number | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [activeSort, setActiveSort] = useState("Popular");
  const [newVendor, setNewVendor] = useState({ name: "", category: "Photography", location: "", phone: "", email: "" });
  const navigate = useNavigate();

  const toggleFavorite = (id: number) => {
    setVendors(prev => prev.map(v => v.id === id ? { ...v, favorited: !v.favorited } : v));
  };

  const deleteVendor = (id: number) => {
    setVendors(prev => prev.filter(v => v.id !== id));
    setMenuOpen(null);
  };

  const addVendor = () => {
    if (!newVendor.name.trim()) return;
    setVendors(prev => [...prev, {
      id: Date.now(), ...newVendor, rating: 0, reviews: 0, status: "pending", price: "$$",
      image: vendorImages[Math.floor(Math.random() * vendorImages.length)], favorited: false,
    }]);
    setNewVendor({ name: "", category: "Photography", location: "", phone: "", email: "" });
    setShowAdd(false);
  };

  const filtered = vendors.filter(v => {
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === "All" || v.category === activeCategory;
    const matchFav = !showFavorites || v.favorited;
    return matchSearch && matchCat && matchFav;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Vendor Marketplace</h1>
          <p className="text-sm text-muted-foreground">Browse and manage your vendor network</p>
        </div>
        <div className="flex gap-2">
          <Button variant={showFavorites ? "default" : "outline"} size="sm" className="gap-2 rounded-full" onClick={() => setShowFavorites(!showFavorites)}>
            <Heart className={`h-3.5 w-3.5 ${showFavorites ? 'fill-current' : ''}`} /> Favorites
          </Button>
          <Button size="sm" className="gap-2 rounded-full border-none text-white" style={{
            background: 'linear-gradient(135deg, hsl(225, 90%, 60%), hsl(225, 80%, 65%))',
          }} onClick={() => setShowAdd(true)}>
            <Plus className="h-3.5 w-3.5" /> Add Vendor
          </Button>
        </div>
      </div>

      {/* Add Vendor Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowAdd(false)}>
          <div className="bg-card rounded-2xl border border-border p-6 w-full max-w-lg shadow-elevated" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-foreground">Add Vendor</h2>
              <button onClick={() => setShowAdd(false)} className="text-muted-foreground hover:text-foreground"><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-4">
              <div><label className="text-sm font-medium text-foreground">Name *</label><Input className="mt-1" value={newVendor.name} onChange={e => setNewVendor({ ...newVendor, name: e.target.value })} /></div>
              <div>
                <label className="text-sm font-medium text-foreground">Category</label>
                <div className="flex gap-2 mt-1 flex-wrap">
                  {categories.filter(c => c !== "All").map(cat => (
                    <button key={cat} className={`px-3 py-1 rounded-full text-xs border transition-colors ${newVendor.category === cat ? 'border-primary bg-primary/5 text-primary' : 'border-border text-muted-foreground hover:text-foreground'}`} onClick={() => setNewVendor({ ...newVendor, category: cat })}>{cat}</button>
                  ))}
                </div>
              </div>
              <div><label className="text-sm font-medium text-foreground">Location</label><Input className="mt-1" value={newVendor.location} onChange={e => setNewVendor({ ...newVendor, location: e.target.value })} /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-sm font-medium text-foreground">Phone</label><Input className="mt-1" value={newVendor.phone} onChange={e => setNewVendor({ ...newVendor, phone: e.target.value })} /></div>
                <div><label className="text-sm font-medium text-foreground">Email</label><Input className="mt-1" value={newVendor.email} onChange={e => setNewVendor({ ...newVendor, email: e.target.value })} /></div>
              </div>
              <Button className="w-full rounded-full border-none text-white" style={{ background: 'linear-gradient(135deg, hsl(225, 90%, 60%), hsl(225, 80%, 65%))' }} onClick={addVendor}>Add Vendor</Button>
            </div>
          </div>
        </div>
      )}

      {/* Search + Sort (matching template UI) */}
      <div className="bg-card border border-border rounded-2xl p-5">
        <div className="flex items-center gap-4 mb-5">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              placeholder={`Search ${vendors.length} vendors...`}
              className="w-full h-11 rounded-full bg-secondary dark:bg-accent pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none border-none focus:ring-2 focus:ring-primary/20"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-1 bg-secondary dark:bg-accent rounded-lg p-0.5">
            {[{ label: "Popular", icon: ListFilter }, { label: "Recent", icon: CalendarDays }].map(sort => (
              <button
                key={sort.label}
                onClick={() => setActiveSort(sort.label)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeSort === sort.label
                    ? 'bg-card border border-border shadow-sm text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <sort.icon className="w-3.5 h-3.5" />
                {sort.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-5">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 text-sm font-medium rounded-full border transition-all duration-200 ${
                activeCategory === cat
                  ? 'border-foreground/20 bg-foreground/5 text-foreground'
                  : 'border-border text-muted-foreground hover:text-foreground hover:bg-secondary dark:hover:bg-accent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Vendor grid - 5 columns like templates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {filtered.map(vendor => (
            <div key={vendor.id} className="rounded-xl border border-border overflow-hidden bg-card hover:shadow-elevated transition-all duration-200 group relative">
              <div className="relative h-44 overflow-hidden">
                <img src={vendor.image} alt={vendor.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <button
                  className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/80 dark:bg-black/40 backdrop-blur flex items-center justify-center hover:bg-white dark:hover:bg-black/60 transition-colors"
                  onClick={() => toggleFavorite(vendor.id)}
                >
                  <Heart className={`h-3.5 w-3.5 ${vendor.favorited ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
                </button>
              </div>
              <div className="p-3">
                <div className="flex justify-between items-start gap-1 mb-1">
                  <h3 className="text-sm font-semibold text-foreground truncate flex-1">{vendor.name}</h3>
                  <div className="relative flex-shrink-0">
                    <button className="text-muted-foreground hover:text-foreground" onClick={e => { e.stopPropagation(); setMenuOpen(menuOpen === vendor.id ? null : vendor.id); }}>
                      <MoreHorizontal className="h-3.5 w-3.5" />
                    </button>
                    {menuOpen === vendor.id && (
                      <div className="absolute right-0 top-5 bg-card border border-border rounded-lg shadow-elevated z-20 py-1 min-w-[130px]">
                        <button className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-foreground hover:bg-secondary" onClick={() => { navigate(`/dashboard/vendors/${vendor.id}`); setMenuOpen(null); }}>
                          <Eye className="h-3 w-3" /> View Profile
                        </button>
                        <button className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-foreground hover:bg-secondary" onClick={() => { navigate('/dashboard/messages'); setMenuOpen(null); }}>
                          <MessageSquare className="h-3 w-3" /> Message
                        </button>
                        <button className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-foreground hover:bg-secondary" onClick={() => toggleFavorite(vendor.id)}>
                          <Heart className="h-3 w-3" /> {vendor.favorited ? 'Unfavorite' : 'Favorite'}
                        </button>
                        <button className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-destructive hover:bg-secondary" onClick={() => deleteVendor(vendor.id)}>
                          <Trash2 className="h-3 w-3" /> Remove
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 mb-2">
                  <Star className="h-3 w-3 fill-warning text-warning" />
                  <span className="text-xs font-medium text-foreground">{vendor.rating}</span>
                  <span className="text-xs text-muted-foreground">• {vendor.category}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate">{vendor.location}</span>
                  </div>
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0">{vendor.price}</Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VendorsPage;
