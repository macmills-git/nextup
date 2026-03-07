import { useState } from "react";
import { Search, Plus, Star, MapPin, Heart, X, Eye, MessageSquare, Trash2, MoreHorizontal, ListFilter, CalendarDays, Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

type Vendor = {
  id: number; name: string; category: string; rating: number; reviews: number;
  location: string; phone: string; email: string; status: string; price: string;
  image: string; favorited: boolean; author: string; uses: string; isPro?: boolean; priceTag?: string;
};

const vendorImages = [
  "https://images.unsplash.com/photo-1556760544-74068565f05c?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1555244162-803834f70033?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1478146059778-26028b07395a?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=400&h=300&fit=crop",
];

const initialVendors: Vendor[] = [
  { id: 1, name: "Akolo Studio", category: "Photography", rating: 4.9, reviews: 124, location: "Downtown", phone: "+1 555-0101", email: "hello@akolo.com", status: "verified", price: "$$$$", image: vendorImages[0], favorited: false, author: "EventPro", uses: "12.4k", isPro: true },
  { id: 2, name: "Bake It Right", category: "Catering", rating: 4.7, reviews: 89, location: "Midtown", phone: "+1 555-0102", email: "info@bakeitright.com", status: "verified", price: "$$$", image: vendorImages[1], favorited: true, author: "Sam", uses: "8.2k", priceTag: "$39" },
  { id: 3, name: "Prime Audio", category: "Audio/Visual", rating: 4.8, reviews: 56, location: "West End", phone: "+1 555-0103", email: "book@primeaudio.com", status: "verified", price: "$$$", image: vendorImages[2], favorited: false, author: "Meng To", uses: "15.1k", isPro: true },
  { id: 4, name: "Event Bloom", category: "Decoration", rating: 4.6, reviews: 102, location: "East Side", phone: "+1 555-0104", email: "design@eventbloom.com", status: "verified", price: "$$", image: vendorImages[3], favorited: false, author: "EventPro", uses: "9.3k", priceTag: "$29" },
  { id: 5, name: "DJ Maxwell", category: "Entertainment", rating: 4.5, reviews: 73, location: "Central", phone: "+1 555-0105", email: "max@djmaxwell.com", status: "pending", price: "$$", image: vendorImages[4], favorited: false, author: "Sam", uses: "11.7k", isPro: true },
  { id: 6, name: "Luxe Rentals", category: "Equipment", rating: 4.4, reviews: 41, location: "Northside", phone: "+1 555-0106", email: "rent@luxerentals.com", status: "verified", price: "$$$", image: vendorImages[5], favorited: false, author: "Meng To", uses: "6.5k", priceTag: "$49" },
  { id: 7, name: "Floral Dreams", category: "Decoration", rating: 4.8, reviews: 95, location: "Uptown", phone: "+1 555-0107", email: "info@floraldreams.com", status: "verified", price: "$$$", image: vendorImages[6], favorited: false, author: "EventPro", uses: "7.8k", isPro: true },
  { id: 8, name: "Stage Masters", category: "Audio/Visual", rating: 4.7, reviews: 68, location: "South Bay", phone: "+1 555-0108", email: "book@stagemasters.com", status: "verified", price: "$$$$", image: vendorImages[7], favorited: false, author: "Sam", uses: "5.9k", priceTag: "$39" },
  { id: 9, name: "Gourmet Bites", category: "Catering", rating: 4.9, reviews: 112, location: "Harbor", phone: "+1 555-0109", email: "chef@gourmetbites.com", status: "verified", price: "$$$$", image: vendorImages[8], favorited: false, author: "Meng To", uses: "10.2k", isPro: true },
  { id: 10, name: "Party Lights Co", category: "Equipment", rating: 4.3, reviews: 37, location: "West Side", phone: "+1 555-0110", email: "info@partylights.com", status: "verified", price: "$$", image: vendorImages[9], favorited: false, author: "EventPro", uses: "13.0k", priceTag: "$29" },
  { id: 11, name: "Melody Makers", category: "Entertainment", rating: 4.6, reviews: 88, location: "Easttown", phone: "+1 555-0111", email: "book@melodymakers.com", status: "verified", price: "$$$", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=300&fit=crop", favorited: false, author: "Sam", uses: "4.5k", isPro: true },
  { id: 12, name: "Snap Perfect", category: "Photography", rating: 4.8, reviews: 145, location: "Arts District", phone: "+1 555-0112", email: "info@snapperfect.com", status: "verified", price: "$$$$", image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&h=300&fit=crop", favorited: false, author: "Meng To", uses: "18.3k", priceTag: "$59" },
  { id: 13, name: "Sweet Delights", category: "Catering", rating: 4.5, reviews: 62, location: "Suburb", phone: "+1 555-0113", email: "order@sweetdelights.com", status: "verified", price: "$$", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop", favorited: false, author: "EventPro", uses: "3.2k", isPro: true },
  { id: 14, name: "Velvet Stage", category: "Equipment", rating: 4.7, reviews: 54, location: "Downtown", phone: "+1 555-0114", email: "rent@velvetstage.com", status: "verified", price: "$$$", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop", favorited: false, author: "Sam", uses: "6.1k", priceTag: "$45" },
  { id: 15, name: "Garden Grace", category: "Decoration", rating: 4.9, reviews: 130, location: "Valley", phone: "+1 555-0115", email: "hello@gardengrace.com", status: "verified", price: "$$$$", image: "https://images.unsplash.com/photo-1478146059778-26028b07395a?w=400&h=300&fit=crop", favorited: false, author: "Meng To", uses: "14.7k", isPro: true },
  { id: 16, name: "Beat Drop DJs", category: "Entertainment", rating: 4.4, reviews: 47, location: "Midtown", phone: "+1 555-0116", email: "book@beatdrop.com", status: "pending", price: "$$", image: "https://images.unsplash.com/photo-1571266028243-d220c6a8b255?w=400&h=300&fit=crop", favorited: false, author: "EventPro", uses: "2.8k", priceTag: "$25" },
  { id: 17, name: "Crystal Clear AV", category: "Audio/Visual", rating: 4.8, reviews: 91, location: "Tech Park", phone: "+1 555-0117", email: "info@crystalclearav.com", status: "verified", price: "$$$$", image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop", favorited: false, author: "Sam", uses: "9.8k", isPro: true },
  { id: 18, name: "Petal Perfection", category: "Decoration", rating: 4.6, reviews: 78, location: "Garden District", phone: "+1 555-0118", email: "flowers@petalperfection.com", status: "verified", price: "$$$", image: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=400&h=300&fit=crop", favorited: false, author: "Meng To", uses: "5.4k", priceTag: "$35" },
  { id: 19, name: "Feast & Co", category: "Catering", rating: 4.7, reviews: 103, location: "Food Quarter", phone: "+1 555-0119", email: "events@feastco.com", status: "verified", price: "$$$", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop", favorited: false, author: "EventPro", uses: "11.2k", isPro: true },
  { id: 20, name: "Capture Moments", category: "Photography", rating: 4.9, reviews: 167, location: "Uptown", phone: "+1 555-0120", email: "book@capturemoments.com", status: "verified", price: "$$$$", image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=400&h=300&fit=crop", favorited: false, author: "Sam", uses: "20.1k", priceTag: "$69" },
];

const categories = ["All", "Photography", "Catering", "Audio/Visual", "Decoration", "Entertainment", "Equipment", "Featured Vendors"];

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

  const toggleFavorite = (id: number) => setVendors(prev => prev.map(v => v.id === id ? { ...v, favorited: !v.favorited } : v));
  const deleteVendor = (id: number) => { setVendors(prev => prev.filter(v => v.id !== id)); setMenuOpen(null); };

  const addVendor = () => {
    if (!newVendor.name.trim()) return;
    setVendors(prev => [...prev, {
      id: Date.now(), ...newVendor, rating: 0, reviews: 0, status: "pending", price: "$$",
      image: vendorImages[Math.floor(Math.random() * vendorImages.length)], favorited: false,
      author: "You", uses: "0", isPro: false,
    }]);
    setNewVendor({ name: "", category: "Photography", location: "", phone: "", email: "" });
    setShowAdd(false);
  };

  const filtered = vendors.filter(v => {
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === "All" || activeCategory === "Featured Vendors" ? (activeCategory === "Featured Vendors" ? v.status === "verified" : true) : v.category === activeCategory;
    const matchFav = !showFavorites || v.favorited;
    return matchSearch && matchCat && matchFav;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Vendor Marketplace</h1>
          <p className="text-sm text-muted-foreground">Browse and manage your vendor network</p>
        </div>
        <div className="flex gap-2">
          <Button variant={showFavorites ? "default" : "outline"} size="sm" className="gap-2 rounded-full" onClick={() => setShowFavorites(!showFavorites)}>
            <Heart className={`h-3.5 w-3.5 ${showFavorites ? 'fill-current' : ''}`} /> Favorites
          </Button>
          <Button size="sm" className="gap-2 rounded-full gradient-primary text-white border-none" onClick={() => setShowAdd(true)}>
            <Plus className="h-3.5 w-3.5" /> Add Vendor
          </Button>
        </div>
      </div>

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
                  {categories.filter(c => c !== "All" && c !== "Featured Vendors").map(cat => (
                    <button key={cat} className={`px-3 py-1 rounded-full text-xs border transition-colors ${newVendor.category === cat ? 'border-primary bg-primary/5 text-primary' : 'border-border text-muted-foreground hover:text-foreground'}`} onClick={() => setNewVendor({ ...newVendor, category: cat })}>{cat}</button>
                  ))}
                </div>
              </div>
              <div><label className="text-sm font-medium text-foreground">Location</label><Input className="mt-1" value={newVendor.location} onChange={e => setNewVendor({ ...newVendor, location: e.target.value })} /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-sm font-medium text-foreground">Phone</label><Input className="mt-1" value={newVendor.phone} onChange={e => setNewVendor({ ...newVendor, phone: e.target.value })} /></div>
                <div><label className="text-sm font-medium text-foreground">Email</label><Input className="mt-1" value={newVendor.email} onChange={e => setNewVendor({ ...newVendor, email: e.target.value })} /></div>
              </div>
              <Button className="w-full rounded-full gradient-primary text-white border-none" onClick={addVendor}>Add Vendor</Button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-card border border-border rounded-2xl p-5">
        <div className="flex items-center gap-4 mb-5">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input placeholder={`Search ${vendors.length} vendors...`}
              className="w-full h-11 rounded-full bg-secondary dark:bg-accent pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none border-none focus:ring-2 focus:ring-primary/20 transition-shadow"
              value={search} onChange={e => setSearch(e.target.value)} />
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

        <div className="flex items-center justify-between mb-5">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 text-sm font-medium rounded-full border transition-all duration-200 ${activeCategory === cat ? cat === "Featured Vendors" ? 'border-primary/40 bg-primary/5 text-primary' : 'border-foreground/20 bg-foreground/5 text-foreground' : 'border-border text-muted-foreground hover:text-foreground hover:bg-secondary dark:hover:bg-accent'}`}>
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
          {filtered.map(vendor => (
            <div key={vendor.id} className="rounded-xl border border-border overflow-hidden bg-card hover:shadow-elevated transition-all duration-200 group cursor-pointer" onClick={() => navigate(`/dashboard/vendors/${vendor.id}`)}>
              <div className="relative h-44 bg-secondary overflow-hidden">
                <img src={vendor.image} alt={vendor.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
              </div>
              <div className="p-3">
                <div className="flex justify-between items-start gap-2 mb-2">
                  <h3 className="text-sm font-semibold text-foreground truncate flex-1">{vendor.name}</h3>
                  {vendor.isPro ? (
                    <span className="text-[11px] bg-secondary dark:bg-accent px-2 py-0.5 rounded-md text-muted-foreground flex-shrink-0 font-medium">PRO</span>
                  ) : (
                    <span className="text-sm font-semibold text-foreground flex-shrink-0">{vendor.priceTag}</span>
                  )}
                </div>
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full bg-secondary dark:bg-accent overflow-hidden flex-shrink-0" />
                    <span className="truncate">{vendor.author}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 hover:text-foreground cursor-pointer"><Shuffle className="w-3 h-3" /> Remix</span>
                    <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {vendor.uses}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No vendors found. Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorsPage;
