import Navbar from "@/components/Navbar";
import SaasFooter from "@/components/landing/saas/SaasFooter";
import { Search, MapPin, Calendar, Heart, Share2, Locate, ChevronDown, Check } from "lucide-react";
import { useMemo, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const categories = ["All", "Music", "Business", "Food & Drink", "Community", "Arts", "Tech", "Wellness", "Free"];

const events = [
  { id: 1, title: "Sunset Rooftop Jazz Night", date: "Fri, May 8 • 7:00 PM", venue: "Sky Lounge", city: "Auckland", category: "Music", price: "Free", organizer: "Auckland Jazz Co.", image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600&h=400&fit=crop" },
  { id: 2, title: "Founders Mixer & Pitch", date: "Wed, May 13 • 6:30 PM", venue: "City Hub", city: "Auckland", category: "Business", price: "$15", organizer: "Startup Grind", image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=400&fit=crop" },
  { id: 3, title: "Weekend Street Food Festival", date: "Sat, May 17 • 12:00 PM", venue: "Harbour Park", city: "Auckland", category: "Food & Drink", price: "Free", organizer: "City Eats", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=400&fit=crop" },
  { id: 4, title: "Urban Photography Walk", date: "Sun, May 18 • 9:00 AM", venue: "Britomart", city: "Auckland", category: "Arts", price: "$10", organizer: "Lens Society", image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=600&h=400&fit=crop" },
  { id: 5, title: "Indie Tech Conf 2026", date: "Thu, May 22 • 9:00 AM", venue: "Innovation Hub", city: "Auckland", category: "Tech", price: "$49", organizer: "DevHouse", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop" },
  { id: 6, title: "Sunrise Beach Yoga", date: "Sat, May 24 • 6:30 AM", venue: "Mission Bay", city: "Auckland", category: "Wellness", price: "Free", organizer: "Flow Studio", image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&h=400&fit=crop" },
  { id: 7, title: "Community Art Bazaar", date: "Sun, May 25 • 11:00 AM", venue: "Karangahape Rd", city: "Auckland", category: "Community", price: "Free", organizer: "Local Makers", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=400&fit=crop" },
  { id: 8, title: "Live Acoustic Sessions", date: "Fri, May 30 • 8:00 PM", venue: "The Tuning Fork", city: "Auckland", category: "Music", price: "$25", organizer: "Tone Live", image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&h=400&fit=crop" },
  { id: 9, title: "AI for Designers Meetup", date: "Tue, Jun 3 • 6:00 PM", venue: "Co-Studio", city: "Auckland", category: "Tech", price: "Free", organizer: "Design.AI", image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop" },
  { id: 10, title: "Wine & Cheese Evening", date: "Thu, Jun 5 • 7:30 PM", venue: "Vino Hall", city: "Auckland", category: "Food & Drink", price: "$35", organizer: "Tasting Notes", image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&h=400&fit=crop" },
  { id: 11, title: "Founders Brunch", date: "Sun, Jun 8 • 10:00 AM", venue: "Wynyard Quarter", city: "Auckland", category: "Business", price: "$20", organizer: "Founders NZ", image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&h=400&fit=crop" },
  { id: 12, title: "Open Mic Comedy Night", date: "Wed, Jun 11 • 8:00 PM", venue: "Basement Bar", city: "Auckland", category: "Arts", price: "Free", organizer: "Laugh Lab", image: "https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=600&h=400&fit=crop" },
];

const sortOptions = [
  { id: "soonest", label: "Soonest first" },
  { id: "latest", label: "Latest first" },
  { id: "az", label: "Name (A–Z)" },
  { id: "free", label: "Free events first" },
] as const;
type SortId = typeof sortOptions[number]["id"];

// crude date parser for our display strings ("Fri, May 8 • 7:00 PM")
const parseEventDate = (s: string) => {
  const cleaned = s.replace("•", "").replace(/^\w+,\s*/, "") + " 2026";
  const d = new Date(cleaned);
  return isNaN(d.getTime()) ? new Date() : d;
};

const EventsNearMePage = () => {
  const navigate = useNavigate();
  const [city, setCity] = useState("Auckland");
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState("All");
  const [liked, setLiked] = useState<Record<number, boolean>>({});
  const [sort, setSort] = useState<SortId>("soonest");
  const [sortOpen, setSortOpen] = useState(false);
  const [locating, setLocating] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) setSortOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const useMyLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation isn't available in this browser");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      () => { setLocating(false); toast.success("Showing events near your current location"); /* keep city as text hint */ },
      () => { setLocating(false); toast.error("Couldn't get your location. Please enter your city."); },
      { timeout: 7000 }
    );
  };

  const filtered = useMemo(
    () =>
      events.filter(
        (e) =>
          (activeCat === "All" || (activeCat === "Free" ? e.price === "Free" : e.category === activeCat)) &&
          (query === "" ||
            e.title.toLowerCase().includes(query.toLowerCase()) ||
            e.organizer.toLowerCase().includes(query.toLowerCase()) ||
            e.venue.toLowerCase().includes(query.toLowerCase())) &&
          e.city.toLowerCase().includes(city.toLowerCase())
      ),
    [city, query, activeCat]
  );

  const sorted = useMemo(() => {
    const list = [...filtered];
    if (sort === "soonest") list.sort((a, b) => parseEventDate(a.date).getTime() - parseEventDate(b.date).getTime());
    if (sort === "latest") list.sort((a, b) => parseEventDate(b.date).getTime() - parseEventDate(a.date).getTime());
    if (sort === "az") list.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "free") list.sort((a, b) => (a.price === "Free" ? -1 : 1) - (b.price === "Free" ? -1 : 1));
    return list;
  }, [filtered, sort]);

  const shareEvent = async (e: typeof events[number]) => {
    const url = `${window.location.origin}/events/${e.id}`;
    try {
      if (navigator.share) await navigator.share({ title: e.title, url });
      else { await navigator.clipboard.writeText(url); toast.success("Link copied"); }
    } catch { /* user cancelled */ }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-36 pb-20 container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mb-10">
          <span className="text-sm font-medium text-primary">Discover</span>
          <h1 className="text-4xl md:text-[3.5rem] font-bold text-foreground tracking-tight leading-[1.1] mt-3 mb-4">
            Events near you
          </h1>
          <p className="text-muted-foreground">Find what's on around your city — from intimate workshops to large festivals. Save the ones you love and never miss a beat.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-3 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search events, organisers, venues..."
              className="w-full h-11 rounded-full bg-card pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none border border-border focus:ring-2 focus:ring-primary/20 transition-shadow"
            />
          </div>
          <div className="relative md:w-72">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Your city"
              className="w-full h-11 rounded-full bg-card pl-11 pr-12 text-sm text-foreground placeholder:text-muted-foreground outline-none border border-border focus:ring-2 focus:ring-primary/20 transition-shadow"
            />
            <button
              onClick={useMyLocation}
              disabled={locating}
              aria-label="Use my location"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full hover:bg-secondary flex items-center justify-center transition disabled:opacity-50"
            >
              <Locate className={`w-4 h-4 text-muted-foreground ${locating ? "animate-pulse" : ""}`} />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`px-4 py-1.5 text-sm font-medium rounded-full border transition-all duration-200 ${
                activeCat === cat
                  ? "border-foreground/30 bg-foreground/5 text-foreground"
                  : "border-border text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-foreground">
            {sorted.length} events in <span className="text-primary">{city || "your area"}</span>
          </h2>
          <div ref={sortRef} className="relative">
            <button
              onClick={() => setSortOpen((o) => !o)}
              className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1 px-2 py-1 rounded-md hover:bg-secondary"
            >
              Sort: {sortOptions.find((s) => s.id === sort)?.label}
              <ChevronDown className="w-3 h-3" />
            </button>
            {sortOpen && (
              <div className="absolute right-0 top-full mt-1 w-48 rounded-lg border border-border bg-card shadow-elevated z-10 py-1 animate-fade-in">
                {sortOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => { setSort(opt.id); setSortOpen(false); }}
                    className="w-full flex items-center justify-between px-3 py-2 text-xs text-foreground hover:bg-secondary"
                  >
                    {opt.label}
                    {sort === opt.id && <Check className="w-3 h-3 text-primary" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {sorted.map((e, i) => (
            <article
              key={e.id}
              onClick={() => navigate(`/events/${e.id}`)}
              className="rounded-2xl border border-border overflow-hidden bg-card hover:shadow-elevated transition-all duration-300 group cursor-pointer animate-fade-in"
              style={{ animationDelay: `${Math.min(i, 8) * 40}ms` }}
            >
              <div className="relative h-44 overflow-hidden bg-secondary">
                <img src={e.image} alt={e.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute top-3 right-3 flex gap-1.5">
                  <button
                    onClick={(ev) => { ev.stopPropagation(); shareEvent(e); }}
                    className="w-8 h-8 rounded-full bg-card/90 backdrop-blur flex items-center justify-center hover:bg-card transition-colors"
                    aria-label="Share event"
                  >
                    <Share2 className="w-3.5 h-3.5 text-foreground" />
                  </button>
                  <button
                    onClick={(ev) => { ev.stopPropagation(); setLiked((prev) => ({ ...prev, [e.id]: !prev[e.id] })); }}
                    className="w-8 h-8 rounded-full bg-card/90 backdrop-blur flex items-center justify-center hover:bg-card transition-colors"
                    aria-label="Save event"
                  >
                    <Heart className={`w-4 h-4 ${liked[e.id] ? "fill-primary text-primary" : "text-foreground"}`} />
                  </button>
                </div>
                {e.price === "Free" && (
                  <span className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full bg-emerald-500/90 text-white">
                    Free
                  </span>
                )}
              </div>
              <div className="p-4">
                <p className="text-xs font-medium text-primary mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" /> {e.date}
                </p>
                <h3 className="text-sm font-semibold text-foreground mb-1.5 line-clamp-2 leading-snug">{e.title}</h3>
                <p className="text-xs text-muted-foreground flex items-center gap-1.5 mb-2.5">
                  <MapPin className="w-3 h-3" /> {e.venue}
                </p>
                <div className="flex items-center justify-between pt-2.5 border-t border-border">
                  <span className="text-[11px] text-muted-foreground truncate">By {e.organizer}</span>
                  <span className="text-xs font-semibold text-foreground">{e.price}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {sorted.length === 0 && (
          <div className="text-center py-20 rounded-2xl border border-border bg-card">
            <p className="text-sm text-muted-foreground">No events match your filters yet. Try a different city or category.</p>
          </div>
        )}
      </div>
      <SaasFooter />
    </div>
  );
};

export default EventsNearMePage;
