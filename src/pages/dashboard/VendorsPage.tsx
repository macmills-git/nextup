import { useState } from "react";
import { Search, Filter, Plus, Star, MapPin, Phone, Mail, MoreHorizontal, Heart, X, Eye, MessageSquare, Trash2, Edit } from "lucide-react";
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Vendor Marketplace</h1>
          <p className="text-sm text-muted-foreground">Browse and manage your vendor network</p>
        </div>
        <div className="flex gap-2">
          <Button variant={showFavorites ? "default" : "outline"} className="gap-2" onClick={() => setShowFavorites(!showFavorites)}>
            <Heart className={`h-4 w-4 ${showFavorites ? 'fill-current' : ''}`} /> Favorites
          </Button>
          <Button className="gradient-primary text-primary-foreground gap-2" onClick={() => setShowAdd(true)}>
            <Plus className="h-4 w-4" /> Add Vendor
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
                    <Button key={cat} variant={newVendor.category === cat ? "default" : "outline"} size="sm" onClick={() => setNewVendor({ ...newVendor, category: cat })}>{cat}</Button>
                  ))}
                </div>
              </div>
              <div><label className="text-sm font-medium text-foreground">Location</label><Input className="mt-1" value={newVendor.location} onChange={e => setNewVendor({ ...newVendor, location: e.target.value })} /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-sm font-medium text-foreground">Phone</label><Input className="mt-1" value={newVendor.phone} onChange={e => setNewVendor({ ...newVendor, phone: e.target.value })} /></div>
                <div><label className="text-sm font-medium text-foreground">Email</label><Input className="mt-1" value={newVendor.email} onChange={e => setNewVendor({ ...newVendor, email: e.target.value })} /></div>
              </div>
              <Button className="w-full gradient-primary text-primary-foreground" onClick={addVendor}>Add Vendor</Button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search vendors..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {categories.map(cat => (
          <Button key={cat} variant={activeCategory === cat ? "default" : "outline"} size="sm" onClick={() => setActiveCategory(cat)}>{cat}</Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(vendor => (
          <div key={vendor.id} className="bg-card rounded-xl border border-border overflow-hidden shadow-card hover:shadow-elevated transition-shadow relative">
            {/* Vendor image */}
            <div className="relative h-40 overflow-hidden">
              <img src={vendor.image} alt={vendor.name} className="w-full h-full object-cover" />
              <button
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur flex items-center justify-center hover:bg-white transition-colors"
                onClick={() => toggleFavorite(vendor.id)}
              >
                <Heart className={`h-4 w-4 ${vendor.favorited ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
              </button>
            </div>

            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-foreground">{vendor.name}</h3>
                  <p className="text-sm text-muted-foreground">{vendor.category}</p>
                </div>
                <div className="relative">
                  <button className="text-muted-foreground hover:text-foreground" onClick={() => setMenuOpen(menuOpen === vendor.id ? null : vendor.id)}>
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                  {menuOpen === vendor.id && (
                    <div className="absolute right-0 top-6 bg-card border border-border rounded-lg shadow-elevated z-20 py-1 min-w-[140px]">
                      <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-secondary" onClick={() => { navigate(`/dashboard/vendors/${vendor.id}`); setMenuOpen(null); }}>
                        <Eye className="h-3.5 w-3.5" /> View Profile
                      </button>
                      <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-secondary" onClick={() => { navigate('/dashboard/messages'); setMenuOpen(null); }}>
                        <MessageSquare className="h-3.5 w-3.5" /> Send Message
                      </button>
                      <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-secondary" onClick={() => toggleFavorite(vendor.id)}>
                        <Heart className="h-3.5 w-3.5" /> {vendor.favorited ? 'Unfavorite' : 'Favorite'}
                      </button>
                      <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-secondary" onClick={() => deleteVendor(vendor.id)}>
                        <Trash2 className="h-3.5 w-3.5" /> Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-warning text-warning" />
                  <span className="text-sm font-medium text-foreground">{vendor.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">({vendor.reviews} reviews)</span>
                <Badge variant="outline" className="ml-auto">{vendor.price}</Badge>
              </div>

              <div className="space-y-1.5 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" />{vendor.location}</div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => navigate(`/dashboard/vendors/${vendor.id}`)}>View Profile</Button>
                <Button size="sm" className="flex-1" onClick={() => navigate('/dashboard/messages')}>Contact</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorsPage;
