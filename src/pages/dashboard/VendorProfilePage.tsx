import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, MapPin, Phone, Mail, Heart, Calendar, MessageSquare, CheckCircle } from "lucide-react";
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

const vendorsData: Record<string, any> = {
  "1": { name: "Akolo Studio", category: "Photography", rating: 4.9, reviews: 124, location: "Downtown", phone: "+1 555-0101", email: "hello@akolo.com", price: "$$$$", bio: "Award-winning photography studio specializing in corporate events, weddings, and product launches. With 10+ years of experience, we capture every moment beautifully.", portfolio: ["Corporate Gala 2025", "Smith Wedding", "Product Launch — TechCo"], imageIdx: 0, packages: [
    { name: "Basic Coverage", price: "$800", duration: "4 hours", features: ["1 photographer", "100 edited photos", "Online gallery"] },
    { name: "Premium Package", price: "$2,200", duration: "8 hours", features: ["2 photographers", "300 edited photos", "Online gallery", "Photo booth", "Same-day preview"] },
    { name: "Full Day Luxury", price: "$4,500", duration: "12 hours", features: ["3 photographers", "500+ edited photos", "Online gallery", "Photo booth", "Drone shots", "Album included"] },
  ]},
  "2": { name: "Bake It Right", category: "Catering", rating: 4.7, reviews: 89, location: "Midtown", phone: "+1 555-0102", email: "info@bakeitright.com", price: "$$$", bio: "Full-service catering company offering customized menus for every occasion. From elegant plated dinners to casual buffets.", portfolio: ["Holiday Party Catering", "Charity Gala Menu", "Team Lunch Program"], imageIdx: 1, packages: [
    { name: "Cocktail Reception", price: "$25/person", duration: "3 hours", features: ["5 canapé options", "2 drinks per guest", "Waitstaff included"] },
    { name: "Buffet Service", price: "$45/person", duration: "5 hours", features: ["3 mains", "4 sides", "Dessert station", "Waitstaff", "Setup & cleanup"] },
    { name: "Plated Dinner", price: "$85/person", duration: "6 hours", features: ["3-course meal", "Wine pairing", "Premium waitstaff", "Custom menu", "Chef on-site"] },
  ]},
  "3": { name: "Prime Audio", category: "Audio/Visual", rating: 4.8, reviews: 56, location: "West End", phone: "+1 555-0103", email: "book@primeaudio.com", price: "$$$", bio: "Professional AV solutions for events of all sizes. State-of-the-art equipment and experienced technicians.", portfolio: ["Tech Conference AV Setup", "Music Festival Sound", "Corporate Presentation"], imageIdx: 2, packages: [
    { name: "Basic Sound", price: "$600", duration: "4 hours", features: ["PA system", "2 wireless mics", "1 technician"] },
    { name: "Full AV Package", price: "$2,000", duration: "8 hours", features: ["PA system", "4 mics", "Projector & screen", "Stage lighting", "2 technicians"] },
    { name: "Premium Production", price: "$5,000", duration: "Full day", features: ["Concert-grade PA", "LED wall", "Stage lighting", "Live streaming", "3 technicians", "Recording"] },
  ]},
  "4": { name: "Event Bloom", category: "Decoration", rating: 4.6, reviews: 102, location: "East Side", phone: "+1 555-0104", email: "design@eventbloom.com", price: "$$", bio: "Creative event decoration and design studio. Transforming venues into extraordinary experiences.", portfolio: ["Garden Wedding Décor", "Gala Centerpieces", "Festival Stage Design"], imageIdx: 3, packages: [
    { name: "Essential Décor", price: "$500", duration: "Setup day", features: ["Table centerpieces", "Basic draping", "Setup & takedown"] },
    { name: "Premium Design", price: "$1,500", duration: "Setup day", features: ["Custom theme", "Centerpieces", "Backdrop", "Lighting accent", "Floral arrangements"] },
    { name: "Full Venue Transform", price: "$4,000", duration: "2 days", features: ["Complete venue styling", "Custom installations", "Premium florals", "Lighting design", "Lounge areas", "Photo backdrop"] },
  ]},
  "5": { name: "DJ Maxwell", category: "Entertainment", rating: 4.5, reviews: 73, location: "Central", phone: "+1 555-0105", email: "max@djmaxwell.com", price: "$$", bio: "Professional DJ and MC with a talent for reading the room. Perfect for weddings, corporate events, and parties.", portfolio: ["NYE Party 2025", "Corporate Team Event", "Wedding After-Party"], imageIdx: 4, packages: [
    { name: "DJ Set", price: "$400", duration: "3 hours", features: ["DJ performance", "Basic lighting", "Sound system"] },
    { name: "DJ + MC", price: "$900", duration: "5 hours", features: ["DJ performance", "MC services", "LED lighting", "Fog machine"] },
    { name: "Full Entertainment", price: "$2,000", duration: "8 hours", features: ["DJ performance", "MC services", "Premium lighting", "Fog & effects", "Photo booth", "Custom playlist"] },
  ]},
  "6": { name: "Luxe Rentals", category: "Equipment", rating: 4.4, reviews: 41, location: "Northside", phone: "+1 555-0106", email: "rent@luxerentals.com", price: "$$$", bio: "Premium event equipment rentals including furniture, lighting, linens, and more. Delivery and setup included.", portfolio: ["Outdoor Tent Setup", "Lounge Furniture Rental", "Lighting Installation"], imageIdx: 5, packages: [
    { name: "Basic Rental", price: "$300", duration: "1 day", features: ["Tables & chairs", "Basic linens", "Delivery & pickup"] },
    { name: "Event Package", price: "$1,200", duration: "2 days", features: ["Tables & chairs", "Premium linens", "Tableware", "Setup & takedown", "Backup items"] },
    { name: "Luxury Collection", price: "$3,500", duration: "3 days", features: ["Designer furniture", "Premium everything", "Lighting rigs", "Tenting", "Full setup crew", "On-site support"] },
  ]},
};

const VendorProfilePage = () => {
  const { vendorId } = useParams();
  const navigate = useNavigate();
  const vendor = vendorsData[vendorId || "1"] || vendorsData["1"];
  const [favorited, setFavorited] = useState(false);

  return (
    <div className="max-w-4xl space-y-6">
      <button onClick={() => navigate('/dashboard/vendors')} className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm">
        <ArrowLeft className="h-4 w-4" /> Back to Vendors
      </button>

      {/* Hero image */}
      <div className="relative h-56 rounded-2xl overflow-hidden">
        <img src={vendorImages[vendor.imageIdx]} alt={vendor.name} className="w-full h-full object-cover" />
        <button
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 dark:bg-black/40 backdrop-blur flex items-center justify-center hover:bg-white dark:hover:bg-black/60"
          onClick={() => setFavorited(!favorited)}
        >
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
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white" style={{
              background: 'linear-gradient(135deg, hsl(225, 90%, 60%), hsl(225, 80%, 65%))',
            }}>
              <Calendar className="h-4 w-4" /> Book Now
            </button>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mt-4 leading-relaxed">{vendor.bio}</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-4 border-t border-border">
          <div className="flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="h-4 w-4" />{vendor.location}</div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground"><Phone className="h-4 w-4" />{vendor.phone}</div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground"><Mail className="h-4 w-4" />{vendor.email}</div>
        </div>
      </div>

      {/* Packages */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h2 className="font-semibold text-foreground mb-5">Service Packages</h2>
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
                i === 1
                  ? 'text-white'
                  : 'border border-border text-foreground hover:bg-secondary'
              }`} style={i === 1 ? { background: 'linear-gradient(135deg, hsl(225, 90%, 60%), hsl(225, 80%, 65%))' } : {}}>
                Select Package
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Portfolio */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h2 className="font-semibold text-foreground mb-4">Portfolio</h2>
        <div className="space-y-3">
          {vendor.portfolio.map((item: string, i: number) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 dark:bg-accent/50">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm text-foreground">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VendorProfilePage;
