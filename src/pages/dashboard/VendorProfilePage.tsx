import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, MapPin, Phone, Mail, Heart, Calendar, MessageSquare, CheckCircle, Clock, Users, Globe, Award, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const vendorImages = [
  "https://images.unsplash.com/photo-1556760544-74068565f05c?w=800&h=400&fit=crop",
  "https://images.unsplash.com/photo-1555244162-803834f70033?w=800&h=400&fit=crop",
  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop",
  "https://images.unsplash.com/photo-1478146059778-26028b07395a?w=800&h=400&fit=crop",
  "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&h=400&fit=crop",
  "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=400&fit=crop",
];

const galleryImages = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=300&h=200&fit=crop",
  "https://images.unsplash.com/photo-1511578314322-379afb476865?w=300&h=200&fit=crop",
  "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=300&h=200&fit=crop",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=300&h=200&fit=crop",
];

const vendorsData: Record<string, any> = {
  "1": { name: "Akolo Studio", category: "Photography", rating: 4.9, reviews: 124, location: "Downtown", phone: "+1 555-0101", email: "hello@akolo.com", price: "$$$$", bio: "Award-winning photography studio specializing in corporate events, weddings, and product launches. With 10+ years of experience, we capture every moment beautifully.", established: "2015", eventsCompleted: 450, responseTime: "< 2 hours", languages: ["English", "French"], specialties: ["Event Photography", "Portraits", "Drone Shots", "Photo Booths"], portfolio: ["Corporate Gala 2025", "Smith Wedding", "Product Launch — TechCo", "Annual Charity Fundraiser", "Fashion Week Coverage"], imageIdx: 0, packages: [
    { name: "Basic Coverage", price: "$800", duration: "4 hours", features: ["1 photographer", "100 edited photos", "Online gallery"] },
    { name: "Premium Package", price: "$2,200", duration: "8 hours", features: ["2 photographers", "300 edited photos", "Online gallery", "Photo booth", "Same-day preview"] },
    { name: "Full Day Luxury", price: "$4,500", duration: "12 hours", features: ["3 photographers", "500+ edited photos", "Online gallery", "Photo booth", "Drone shots", "Album included"] },
  ], reviews_list: [
    { name: "Jane D.", rating: 5, text: "Absolutely incredible work! The photos from our corporate gala were stunning.", date: "Feb 2026" },
    { name: "Michael C.", rating: 5, text: "Professional, creative, and delivered ahead of schedule. Highly recommend!", date: "Jan 2026" },
    { name: "Sarah W.", rating: 4, text: "Beautiful photos, great attention to detail. Would book again.", date: "Dec 2025" },
  ]},
  "2": { name: "Bake It Right", category: "Catering", rating: 4.7, reviews: 89, location: "Midtown", phone: "+1 555-0102", email: "info@bakeitright.com", price: "$$$", bio: "Full-service catering company offering customized menus for every occasion. From elegant plated dinners to casual buffets, we bring culinary excellence to your events.", established: "2018", eventsCompleted: 280, responseTime: "< 4 hours", languages: ["English", "Spanish"], specialties: ["Plated Dinners", "Buffet Service", "Cocktail Receptions", "Dietary Accommodations"], portfolio: ["Holiday Party Catering", "Charity Gala Menu", "Team Lunch Program", "Wedding Reception Dinner", "Product Launch Cocktails"], imageIdx: 1, packages: [
    { name: "Cocktail Reception", price: "$25/person", duration: "3 hours", features: ["5 canapé options", "2 drinks per guest", "Waitstaff included"] },
    { name: "Buffet Service", price: "$45/person", duration: "5 hours", features: ["3 mains", "4 sides", "Dessert station", "Waitstaff", "Setup & cleanup"] },
    { name: "Plated Dinner", price: "$85/person", duration: "6 hours", features: ["3-course meal", "Wine pairing", "Premium waitstaff", "Custom menu", "Chef on-site"] },
  ], reviews_list: [
    { name: "Emily B.", rating: 5, text: "The food was absolutely divine! Our guests couldn't stop raving about the menu.", date: "Mar 2026" },
    { name: "David K.", rating: 4, text: "Great variety and quality. The team was professional and accommodating.", date: "Feb 2026" },
  ]},
  "3": { name: "Prime Audio", category: "Audio/Visual", rating: 4.8, reviews: 56, location: "West End", phone: "+1 555-0103", email: "book@primeaudio.com", price: "$$$", bio: "Professional AV solutions for events of all sizes. State-of-the-art equipment and experienced technicians ensure flawless audio-visual experiences.", established: "2016", eventsCompleted: 320, responseTime: "< 1 hour", languages: ["English"], specialties: ["Sound Systems", "LED Walls", "Live Streaming", "Stage Lighting"], portfolio: ["Tech Conference AV Setup", "Music Festival Sound", "Corporate Presentation", "Award Ceremony Production"], imageIdx: 2, packages: [
    { name: "Basic Sound", price: "$600", duration: "4 hours", features: ["PA system", "2 wireless mics", "1 technician"] },
    { name: "Full AV Package", price: "$2,000", duration: "8 hours", features: ["PA system", "4 mics", "Projector & screen", "Stage lighting", "2 technicians"] },
    { name: "Premium Production", price: "$5,000", duration: "Full day", features: ["Concert-grade PA", "LED wall", "Stage lighting", "Live streaming", "3 technicians", "Recording"] },
  ], reviews_list: [
    { name: "Alex R.", rating: 5, text: "The sound quality was phenomenal. Everything ran perfectly!", date: "Feb 2026" },
  ]},
};

// Fill defaults for missing IDs
for (let i = 4; i <= 15; i++) {
  if (!vendorsData[String(i)]) {
    vendorsData[String(i)] = { ...vendorsData["1"], name: `Vendor ${i}`, imageIdx: (i - 1) % 6 };
  }
}

const VendorProfilePage = () => {
  const { vendorId } = useParams();
  const navigate = useNavigate();
  const vendor = vendorsData[vendorId || "1"] || vendorsData["1"];
  const [favorited, setFavorited] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "packages" | "portfolio" | "reviews">("overview");

  return (
    <div className="max-w-4xl space-y-6">
      <button onClick={() => navigate('/dashboard/vendors')} className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm">
        <ArrowLeft className="h-4 w-4" /> Back to Vendors
      </button>

      <div className="relative h-56 rounded-2xl overflow-hidden">
        <img src={vendorImages[vendor.imageIdx]} alt={vendor.name} className="w-full h-full object-cover" />
        <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 dark:bg-black/40 backdrop-blur flex items-center justify-center hover:bg-white dark:hover:bg-black/60" onClick={() => setFavorited(!favorited)}>
          <Heart className={`h-5 w-5 ${favorited ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
        </button>
      </div>

      {/* Info */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{vendor.name}</h1>
            <div className="flex items-center gap-3 mt-2 flex-wrap">
              <Badge variant="outline">{vendor.category}</Badge>
              <Badge variant="outline">{vendor.price}</Badge>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-warning text-warning" />
                <span className="text-sm font-medium">{vendor.rating}</span>
                <span className="text-sm text-muted-foreground">({vendor.reviews} reviews)</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2" onClick={() => navigate('/dashboard/messages')}>
              <MessageSquare className="h-4 w-4" /> Message
            </Button>
            <Button className="gap-2 bg-primary text-white hover:bg-primary/90">
              <Calendar className="h-4 w-4" /> Book Now
            </Button>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mt-4 leading-relaxed">{vendor.bio}</p>

        {/* Quick stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
          {[
            { icon: Clock, label: "Response Time", value: vendor.responseTime },
            { icon: Calendar, label: "Established", value: vendor.established },
            { icon: CheckCircle, label: "Events Done", value: String(vendor.eventsCompleted) },
            { icon: Globe, label: "Languages", value: vendor.languages?.join(", ") || "English" },
          ].map((s, i) => (
            <div key={i} className="bg-secondary dark:bg-accent rounded-xl p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <s.icon className="w-3 h-3 text-primary" />
                <span className="text-[10px] text-muted-foreground">{s.label}</span>
              </div>
              <p className="text-xs font-semibold text-foreground">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5 pt-4 border-t border-border">
          <div className="flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="h-4 w-4" />{vendor.location}</div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground"><Phone className="h-4 w-4" />{vendor.phone}</div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground"><Mail className="h-4 w-4" />{vendor.email}</div>
        </div>
      </div>

      {/* Specialties */}
      {vendor.specialties && (
        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="font-semibold text-foreground mb-3">Specialties</h2>
          <div className="flex flex-wrap gap-2">
            {vendor.specialties.map((s: string, i: number) => (
              <span key={i} className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary font-medium">{s}</span>
            ))}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 bg-muted rounded-lg p-0.5">
        {(["packages", "portfolio", "reviews"] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 rounded-md text-sm font-medium capitalize transition-all ${activeTab === tab ? 'bg-card border border-border shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
            {tab}
          </button>
        ))}
      </div>

      {/* Packages */}
      {activeTab === "packages" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {vendor.packages?.map((pkg: any, i: number) => (
            <div key={i} className={`rounded-xl border p-5 flex flex-col transition-all ${
              i === 1 ? 'border-primary bg-primary/5 dark:bg-primary/10 shadow-md' : 'border-border hover:border-primary/30'
            }`}>
              {i === 1 && <span className="text-[10px] font-semibold text-primary uppercase tracking-wider mb-2">Most Popular</span>}
              <h3 className="font-semibold text-foreground">{pkg.name}</h3>
              <p className="text-2xl font-bold text-foreground mt-1">{pkg.price}</p>
              <p className="text-xs text-muted-foreground mb-4">{pkg.duration}</p>
              <div className="space-y-2 flex-1">
                {pkg.features.map((f: string, fi: number) => (
                  <div key={fi} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-3.5 w-3.5 text-success flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
              <button className={`w-full mt-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                i === 1 ? 'bg-primary text-white hover:bg-primary/90' : 'border border-border text-foreground hover:bg-secondary'
              }`}>Select Package</button>
            </div>
          ))}
        </div>
      )}

      {/* Portfolio */}
      {activeTab === "portfolio" && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {galleryImages.map((img, i) => (
              <div key={i} className="h-40 rounded-xl overflow-hidden">
                <img src={img} alt={`Portfolio ${i}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              </div>
            ))}
          </div>
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="font-semibold text-foreground mb-4">Past Projects</h2>
            <div className="space-y-3">
              {vendor.portfolio.map((item: string, i: number) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 dark:bg-accent/50">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Reviews */}
      {activeTab === "reviews" && (
        <div className="space-y-4">
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="text-center">
                <p className="text-4xl font-bold text-foreground">{vendor.rating}</p>
                <div className="flex gap-0.5 mt-1">
                  {[1,2,3,4,5].map(s => <Star key={s} className={`w-3.5 h-3.5 ${s <= Math.round(vendor.rating) ? 'fill-warning text-warning' : 'text-muted'}`} />)}
                </div>
                <p className="text-xs text-muted-foreground mt-1">{vendor.reviews} reviews</p>
              </div>
              <div className="flex-1 space-y-1.5">
                {[5,4,3,2,1].map(star => {
                  const count = star === 5 ? 70 : star === 4 ? 20 : star === 3 ? 7 : star === 2 ? 2 : 1;
                  return (
                    <div key={star} className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground w-6">{star}★</span>
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-warning rounded-full" style={{ width: `${count}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground w-8">{count}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {vendor.reviews_list?.map((r: any, i: number) => (
            <div key={i} className="bg-card rounded-xl border border-border p-5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-semibold text-primary">{r.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{r.name}</p>
                    <p className="text-[10px] text-muted-foreground">{r.date}</p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(s => <Star key={s} className={`w-3 h-3 ${s <= r.rating ? 'fill-warning text-warning' : 'text-muted'}`} />)}
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{r.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VendorProfilePage;
