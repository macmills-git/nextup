import Navbar from "@/components/Navbar";
import SaasFooter from "@/components/landing/saas/SaasFooter";
import { Search, Eye, Shuffle, ListFilter, CalendarDays, X, Calendar, MapPin, Users, DollarSign, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const categories = ["All", "Weddings", "Corporate", "Conferences", "Social", "Birthday", "Workshops", "Paid Templates"];

const templates = [
  { name: "Classic Wedding Planner", category: "Weddings", image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop", uses: "12.4k", author: "EventPro", isPro: true, date: "2026-02-10", guests: 200, budget: "$35,000", location: "Rose Garden Estate", tasks: ["Book venue", "Hire photographer", "Finalize menu"], vendors: ["Akolo Studio", "Bake It Right", "Floral Dreams"] },
  { name: "Tech Conference Blueprint", category: "Conferences", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop", uses: "8.2k", author: "Sam", price: "$39", date: "2026-01-15", guests: 500, budget: "$120,000", location: "Convention Center", tasks: ["Set agenda", "Book speakers", "AV setup"], vendors: ["Prime Audio", "Stage Masters"] },
  { name: "Team Building Day Plan", category: "Corporate", image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=400&h=300&fit=crop", uses: "15.1k", author: "Meng To", isPro: true, date: "2026-03-01", guests: 80, budget: "$15,000", location: "Mountain Lodge", tasks: ["Plan activities", "Arrange transport", "Order lunch"], vendors: ["Gourmet Bites"] },
  { name: "Garden Party Template", category: "Social", image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop", uses: "9.3k", author: "EventPro", price: "$29", date: "2026-02-20", guests: 60, budget: "$8,000", location: "Botanical Gardens", tasks: ["Decor setup", "Music playlist", "Catering"], vendors: ["Event Bloom", "DJ Maxwell"] },
  { name: "Milestone Birthday Bash", category: "Birthday", image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop", uses: "11.7k", author: "Sam", isPro: true, date: "2026-01-28", guests: 100, budget: "$12,000", location: "Grand Ballroom", tasks: ["Theme selection", "Cake order", "Entertainment"], vendors: ["Bake It Right", "DJ Maxwell"] },
  { name: "Executive Summit Guide", category: "Corporate", image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=400&h=300&fit=crop", uses: "6.5k", author: "Meng To", price: "$49", date: "2026-03-05", guests: 150, budget: "$45,000", location: "Hilton Conference Hall", tasks: ["Keynote speakers", "Panel setup", "Networking lunch"], vendors: ["Gourmet Bites", "Prime Audio"] },
  { name: "Creative Workshop Kit", category: "Workshops", image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=400&h=300&fit=crop", uses: "7.8k", author: "EventPro", isPro: true, date: "2026-02-15", guests: 30, budget: "$5,000", location: "Art Studio Loft", tasks: ["Materials list", "Instructor brief", "Setup stations"], vendors: ["Luxe Rentals"] },
  { name: "Destination Wedding", category: "Weddings", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop", uses: "5.9k", author: "Sam", price: "$39", date: "2026-01-10", guests: 120, budget: "$55,000", location: "Beach Resort", tasks: ["Travel logistics", "Venue decor", "Reception plan"], vendors: ["Akolo Studio", "Event Bloom", "Floral Dreams"] },
  { name: "Product Launch Playbook", category: "Corporate", image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=300&fit=crop", uses: "10.2k", author: "Meng To", isPro: true, date: "2026-03-12", guests: 300, budget: "$28,000", location: "Tech Hub Arena", tasks: ["Demo setup", "Press kits", "Live stream"], vendors: ["Prime Audio", "Stage Masters"] },
  { name: "Networking Mixer", category: "Social", image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=300&fit=crop", uses: "13.0k", author: "EventPro", price: "$29", date: "2026-02-28", guests: 75, budget: "$6,000", location: "Rooftop Lounge", tasks: ["Name tags", "Drinks menu", "Ice breakers"], vendors: ["Bake It Right"] },
  { name: "Charity Gala Evening", category: "Social", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop", uses: "4.7k", author: "Sam", isPro: true, date: "2026-01-05", guests: 250, budget: "$52,000", location: "City Art Museum", tasks: ["Auction setup", "Entertainment", "Sponsor banners"], vendors: ["Akolo Studio", "Gourmet Bites", "Luxe Rentals"] },
  { name: "Startup Demo Day", category: "Conferences", image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=300&fit=crop", uses: "6.1k", author: "Meng To", price: "$35", date: "2026-03-08", guests: 200, budget: "$18,000", location: "Innovation Hub", tasks: ["Pitch scheduling", "AV check", "Judges panel"], vendors: ["Prime Audio"] },
  { name: "Rustic Barn Wedding", category: "Weddings", image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400&h=300&fit=crop", uses: "8.9k", author: "EventPro", isPro: true, date: "2026-02-05", guests: 150, budget: "$40,000", location: "Countryside Barn", tasks: ["Rustic decor", "Farm-to-table menu", "Band booking"], vendors: ["Event Bloom", "Bake It Right", "Floral Dreams"] },
  { name: "Annual Company Retreat", category: "Corporate", image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop", uses: "7.3k", author: "Sam", price: "$45", date: "2026-01-22", guests: 60, budget: "$20,000", location: "Lake View Resort", tasks: ["Activity planning", "Room bookings", "Team dinner"], vendors: ["Gourmet Bites", "Luxe Rentals"] },
  { name: "Kids Birthday Party", category: "Birthday", image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&h=300&fit=crop", uses: "14.2k", author: "EventPro", isPro: true, date: "2026-03-02", guests: 25, budget: "$3,000", location: "Fun Zone Park", tasks: ["Theme decor", "Party games", "Cake & treats"], vendors: ["Bake It Right"] },
  { name: "Hackathon Organizer", category: "Conferences", image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop", uses: "5.4k", author: "Meng To", price: "$29", date: "2026-02-18", guests: 150, budget: "$10,000", location: "Co-working Space", tasks: ["Track setup", "Judges", "Prize procurement"], vendors: ["Luxe Rentals", "Prime Audio"] },
  { name: "Cocktail Reception", category: "Social", image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=400&h=300&fit=crop", uses: "9.8k", author: "Sam", isPro: true, date: "2026-01-30", guests: 80, budget: "$9,000", location: "Sky Bar", tasks: ["Cocktail menu", "Lounge setup", "Music"], vendors: ["DJ Maxwell", "Bake It Right"] },
  { name: "Photography Workshop", category: "Workshops", image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&h=300&fit=crop", uses: "3.6k", author: "EventPro", price: "$19", date: "2026-03-15", guests: 15, budget: "$2,000", location: "Studio 55", tasks: ["Equipment list", "Model booking", "Lighting setup"], vendors: ["Akolo Studio"] },
  { name: "Beach Wedding Suite", category: "Weddings", image: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=400&h=300&fit=crop", uses: "10.5k", author: "Meng To", isPro: true, date: "2026-02-14", guests: 100, budget: "$48,000", location: "Oceanside Resort", tasks: ["Beach decor", "Sunset ceremony", "Reception plan"], vendors: ["Akolo Studio", "Event Bloom", "Gourmet Bites"] },
  { name: "Leadership Workshop", category: "Workshops", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop", uses: "4.2k", author: "Sam", price: "$39", date: "2026-01-18", guests: 40, budget: "$7,000", location: "Executive Center", tasks: ["Speaker brief", "Materials prep", "Follow-up survey"], vendors: ["Luxe Rentals"] },
  { name: "Award Ceremony Planner", category: "Corporate", image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=400&h=300&fit=crop", uses: "6.8k", author: "EventPro", isPro: true, date: "2026-03-10", guests: 350, budget: "$60,000", location: "Grand Theatre", tasks: ["Trophy ordering", "Stage design", "Guest list"], vendors: ["Stage Masters", "Prime Audio", "Gourmet Bites"] },
  { name: "Music Festival Guide", category: "Social", image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=300&fit=crop", uses: "11.3k", author: "Meng To", price: "$55", date: "2026-02-25", guests: 1000, budget: "$150,000", location: "Central Park", tasks: ["Stage setup", "Artist lineup", "Security plan"], vendors: ["Prime Audio", "Stage Masters", "DJ Maxwell"] },
  { name: "Sweet 16 Celebration", category: "Birthday", image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&h=300&fit=crop", uses: "7.6k", author: "Sam", isPro: true, date: "2026-01-25", guests: 50, budget: "$8,000", location: "Banquet Hall", tasks: ["Theme design", "DJ booking", "Photo booth"], vendors: ["DJ Maxwell", "Akolo Studio"] },
  { name: "Yoga & Wellness Retreat", category: "Workshops", image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400&h=300&fit=crop", uses: "5.1k", author: "EventPro", price: "$25", date: "2026-03-18", guests: 20, budget: "$4,000", location: "Wellness Center", tasks: ["Instructor lineup", "Mat setup", "Healthy menu"], vendors: ["Gourmet Bites"] },
];

const parseUses = (uses: string) => {
  const num = parseFloat(uses.replace('k', ''));
  return num * 1000;
};

const TemplatesPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSort, setActiveSort] = useState("Popular");
  const [searchQuery, setSearchQuery] = useState("");
  const [previewTemplate, setPreviewTemplate] = useState<typeof templates[0] | null>(null);
  const navigate = useNavigate();

  const filtered = templates.filter(t =>
    (activeCategory === "All" || activeCategory === "Paid Templates" ? (activeCategory === "Paid Templates" ? !!t.price : true) : t.category === activeCategory) &&
    (searchQuery === "" || t.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const sorted = [...filtered].sort((a, b) => {
    if (activeSort === "Popular") return parseUses(b.uses) - parseUses(a.uses);
    if (activeSort === "Recent") return new Date(b.date).getTime() - new Date(a.date).getTime();
    return 0;
  });

  const handleUseTemplate = (t: typeof templates[0]) => {
    setPreviewTemplate(null);
    navigate('/dashboard/events/new', { state: { template: t } });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-36 pb-20 container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="text-sm font-medium text-primary">Templates</span>
          <h1 className="text-4xl md:text-[3.5rem] font-bold text-foreground tracking-tight leading-[1.1] mt-3 mb-4">Start with a template</h1>
          <p className="text-muted-foreground">Browse our curated collection of event templates. Remix, customize, and deploy in minutes.</p>
        </div>

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

        <div className="flex flex-wrap items-center gap-2 mb-8">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 text-sm font-medium rounded-full border transition-all duration-200 ${activeCategory === cat ? 'border-foreground/30 bg-foreground/5 text-foreground' : 'border-border text-muted-foreground hover:text-foreground hover:bg-secondary'}`}>
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {sorted.map((t, i) => (
            <div key={i} className="rounded-xl border border-border overflow-hidden bg-card hover:shadow-elevated transition-all duration-200 group cursor-pointer relative"
              onClick={() => setPreviewTemplate(t)}>
              <div className="relative h-32 bg-secondary overflow-hidden">
                <img src={t.image} alt={t.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                {/* Hover preview overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-xs font-medium px-3 py-1.5 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm">
                    <Eye className="w-3 h-3 inline mr-1" /> Preview
                  </span>
                </div>
              </div>
              <div className="p-3">
                <div className="flex justify-between items-start gap-1.5 mb-1.5">
                  <h3 className="text-xs font-semibold text-foreground truncate flex-1">{t.name}</h3>
                  {t.isPro ? (
                    <span className="text-[9px] bg-secondary px-1.5 py-0.5 rounded text-muted-foreground flex-shrink-0 font-medium">PRO</span>
                  ) : (
                    <span className="text-xs font-semibold text-foreground flex-shrink-0">{t.price}</span>
                  )}
                </div>
                <div className="flex justify-between items-center text-[11px] text-muted-foreground">
                  <span>{t.author}</span>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-0.5"><Eye className="w-2.5 h-2.5" /> {t.uses}</span>
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

      {/* Template Preview Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={() => setPreviewTemplate(null)}>
          <div className="bg-card rounded-2xl border border-border w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-elevated animate-scale-in" onClick={e => e.stopPropagation()}>
            <div className="relative h-52 overflow-hidden rounded-t-2xl">
              <img src={previewTemplate.image} alt={previewTemplate.name} className="w-full h-full object-cover" />
              <button onClick={() => setPreviewTemplate(null)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 backdrop-blur flex items-center justify-center text-white hover:bg-black/60">
                <X className="h-4 w-4" />
              </button>
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <h2 className="text-xl font-bold text-white">{previewTemplate.name}</h2>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-white/80 text-xs">{previewTemplate.category}</span>
                  <span className="text-white/80 text-xs">by {previewTemplate.author}</span>
                  <span className="text-white/80 text-xs flex items-center gap-1"><Eye className="w-3 h-3" /> {previewTemplate.uses}</span>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-5">
              {/* Quick stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { icon: Calendar, label: "Date", value: previewTemplate.date },
                  { icon: Users, label: "Guests", value: String(previewTemplate.guests) },
                  { icon: DollarSign, label: "Budget", value: previewTemplate.budget },
                  { icon: MapPin, label: "Location", value: previewTemplate.location },
                ].map((s, i) => (
                  <div key={i} className="bg-secondary dark:bg-accent rounded-xl p-3">
                    <div className="flex items-center gap-1.5 mb-1">
                      <s.icon className="w-3 h-3 text-primary" />
                      <span className="text-[10px] text-muted-foreground">{s.label}</span>
                    </div>
                    <p className="text-sm font-semibold text-foreground truncate">{s.value}</p>
                  </div>
                ))}
              </div>

              {/* Tasks */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2">Included Tasks</h3>
                <div className="space-y-1.5">
                  {previewTemplate.tasks.map((task, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-3.5 h-3.5 text-primary" />
                      {task}
                    </div>
                  ))}
                </div>
              </div>

              {/* Vendors */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2">Suggested Vendors</h3>
                <div className="flex flex-wrap gap-2">
                  {previewTemplate.vendors.map((v, i) => (
                    <span key={i} className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary font-medium">{v}</span>
                  ))}
                </div>
              </div>

              <button onClick={() => handleUseTemplate(previewTemplate)}
                className="w-full py-3 rounded-xl text-sm font-semibold text-white bg-primary hover:bg-primary/90 transition-colors">
                Use Template
              </button>
            </div>
          </div>
        </div>
      )}

      <SaasFooter />
    </div>
  );
};

export default TemplatesPage;
