import { useState } from "react";
import { Search, Filter, Plus, Star, MapPin, Phone, Mail, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const vendors = [
  { id: 1, name: "Akolo Studio", category: "Photography", rating: 4.9, reviews: 124, location: "Downtown", phone: "+1 555-0101", email: "hello@akolo.com", status: "verified", price: "$$$$" },
  { id: 2, name: "Bake It Right", category: "Catering", rating: 4.7, reviews: 89, location: "Midtown", phone: "+1 555-0102", email: "info@bakeitright.com", status: "verified", price: "$$$" },
  { id: 3, name: "Prime Audio", category: "Audio/Visual", rating: 4.8, reviews: 56, location: "West End", phone: "+1 555-0103", email: "book@primeaudio.com", status: "verified", price: "$$$" },
  { id: 4, name: "Event Bloom", category: "Decoration", rating: 4.6, reviews: 102, location: "East Side", phone: "+1 555-0104", email: "design@eventbloom.com", status: "verified", price: "$$" },
  { id: 5, name: "DJ Maxwell", category: "Entertainment", rating: 4.5, reviews: 73, location: "Central", phone: "+1 555-0105", email: "max@djmaxwell.com", status: "pending", price: "$$" },
  { id: 6, name: "Luxe Rentals", category: "Equipment", rating: 4.4, reviews: 41, location: "Northside", phone: "+1 555-0106", email: "rent@luxerentals.com", status: "verified", price: "$$$" },
];

const categories = ["All", "Photography", "Catering", "Audio/Visual", "Decoration", "Entertainment", "Equipment"];

const VendorsPage = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = vendors.filter(v => {
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === "All" || v.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Vendor Marketplace</h1>
          <p className="text-sm text-muted-foreground">Browse and manage your vendor network</p>
        </div>
        <Button className="gradient-primary text-primary-foreground gap-2">
          <Plus className="h-4 w-4" /> Add Vendor
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search vendors..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Button variant="outline" className="gap-2"><Filter className="h-4 w-4" /> Filter</Button>
      </div>

      <div className="flex gap-2 flex-wrap">
        {categories.map(cat => (
          <Button
            key={cat}
            variant={activeCategory === cat ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(vendor => (
          <div key={vendor.id} className="bg-card rounded-xl border border-border p-5 shadow-card hover:shadow-elevated transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                  <span className="text-lg font-bold text-primary">{vendor.name[0]}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{vendor.name}</h3>
                  <p className="text-sm text-muted-foreground">{vendor.category}</p>
                </div>
              </div>
              <button className="text-muted-foreground hover:text-foreground"><MoreHorizontal className="h-4 w-4" /></button>
            </div>

            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-warning text-warning" />
                <span className="text-sm font-medium text-foreground">{vendor.rating}</span>
              </div>
              <span className="text-sm text-muted-foreground">({vendor.reviews} reviews)</span>
              <Badge variant="outline" className="ml-auto">{vendor.price}</Badge>
            </div>

            <div className="space-y-2 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" />{vendor.location}</div>
              <div className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" />{vendor.phone}</div>
              <div className="flex items-center gap-2"><Mail className="h-3.5 w-3.5" />{vendor.email}</div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">View Profile</Button>
              <Button size="sm" className="flex-1">Contact</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorsPage;
