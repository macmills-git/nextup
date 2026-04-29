import { useMemo, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ChevronLeft, ChevronRight, Heart, Share2, MapPin, Calendar, Clock,
  Users, X, Flame, Car, Bus, Bike, PersonStanding, ArrowLeft, Flag, Info
} from "lucide-react";
import Navbar from "@/components/Navbar";
import SaasFooter from "@/components/landing/saas/SaasFooter";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Local seed mirrors EventsNearMePage (kept in sync). In a real app this comes from a store.
const seed = [
  { id: 1, title: "Sunset Rooftop Jazz Night", date: "Fri, May 8 • 7:00 PM", endDate: "Fri, May 8 • 11:00 PM", venue: "Sky Lounge", address: "12 Quay St, Auckland CBD", city: "Auckland", category: "Music", price: "Free", organizer: "Auckland Jazz Co.", organizerFollowers: 1280, organizerEvents: 24, image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1200&h=800&fit=crop", hot: true },
  { id: 2, title: "Founders Mixer & Pitch", date: "Wed, May 13 • 6:30 PM", endDate: "Wed, May 13 • 10:00 PM", venue: "City Hub", address: "44 Customs St, Auckland", city: "Auckland", category: "Business", price: "$15", organizer: "Startup Grind", organizerFollowers: 4080, organizerEvents: 51, image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&h=800&fit=crop", hot: false },
  { id: 3, title: "Weekend Street Food Festival", date: "Sat, May 17 • 12:00 PM", endDate: "Sat, May 17 • 8:00 PM", venue: "Harbour Park", address: "Te Wero Island, Auckland", city: "Auckland", category: "Food & Drink", price: "Free", organizer: "City Eats", organizerFollowers: 980, organizerEvents: 12, image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&h=800&fit=crop", hot: true },
  { id: 4, title: "Urban Photography Walk", date: "Sun, May 18 • 9:00 AM", endDate: "Sun, May 18 • 12:00 PM", venue: "Britomart", address: "Britomart Square, Auckland", city: "Auckland", category: "Arts", price: "$10", organizer: "Lens Society", organizerFollowers: 612, organizerEvents: 9, image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1200&h=800&fit=crop", hot: false },
  { id: 5, title: "Indie Tech Conf 2026", date: "Thu, May 22 • 9:00 AM", endDate: "Fri, May 23 • 5:00 PM", venue: "Innovation Hub", address: "11 Wellesley St, Auckland", city: "Auckland", category: "Tech", price: "$49", organizer: "DevHouse", organizerFollowers: 5210, organizerEvents: 18, image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=800&fit=crop", hot: true },
  { id: 6, title: "Sunrise Beach Yoga", date: "Sat, May 24 • 6:30 AM", endDate: "Sat, May 24 • 8:00 AM", venue: "Mission Bay", address: "Mission Bay Beach, Auckland", city: "Auckland", category: "Wellness", price: "Free", organizer: "Flow Studio", organizerFollowers: 740, organizerEvents: 30, image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1200&h=800&fit=crop", hot: false },
  { id: 7, title: "Community Art Bazaar", date: "Sun, May 25 • 11:00 AM", endDate: "Sun, May 25 • 5:00 PM", venue: "Karangahape Rd", address: "Karangahape Rd, Auckland", city: "Auckland", category: "Community", price: "Free", organizer: "Local Makers", organizerFollowers: 410, organizerEvents: 7, image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&h=800&fit=crop", hot: false },
  { id: 8, title: "Live Acoustic Sessions", date: "Fri, May 30 • 8:00 PM", endDate: "Fri, May 30 • 11:30 PM", venue: "The Tuning Fork", address: "Spark Arena Plaza, Auckland", city: "Auckland", category: "Music", price: "$25", organizer: "Tone Live", organizerFollowers: 2210, organizerEvents: 22, image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1200&h=800&fit=crop", hot: true },
  { id: 9, title: "AI for Designers Meetup", date: "Tue, Jun 3 • 6:00 PM", endDate: "Tue, Jun 3 • 9:00 PM", venue: "Co-Studio", address: "Ponsonby Rd, Auckland", city: "Auckland", category: "Tech", price: "Free", organizer: "Design.AI", organizerFollowers: 1840, organizerEvents: 14, image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&h=800&fit=crop", hot: false },
  { id: 10, title: "Wine & Cheese Evening", date: "Thu, Jun 5 • 7:30 PM", endDate: "Thu, Jun 5 • 10:30 PM", venue: "Vino Hall", address: "Parnell Rd, Auckland", city: "Auckland", category: "Food & Drink", price: "$35", organizer: "Tasting Notes", organizerFollowers: 990, organizerEvents: 16, image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=1200&h=800&fit=crop", hot: false },
  { id: 11, title: "Founders Brunch", date: "Sun, Jun 8 • 10:00 AM", endDate: "Sun, Jun 8 • 1:00 PM", venue: "Wynyard Quarter", address: "Wynyard Quarter, Auckland", city: "Auckland", category: "Business", price: "$20", organizer: "Founders NZ", organizerFollowers: 1520, organizerEvents: 11, image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&h=800&fit=crop", hot: false },
  { id: 12, title: "Open Mic Comedy Night", date: "Wed, Jun 11 • 8:00 PM", endDate: "Wed, Jun 11 • 11:00 PM", venue: "Basement Bar", address: "Greys Ave, Auckland", city: "Auckland", category: "Arts", price: "Free", organizer: "Laugh Lab", organizerFollowers: 720, organizerEvents: 41, image: "https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=1200&h=800&fit=crop", hot: false },
];

const galleryFor = (img: string) => [
  img,
  img.replace(/photo-\w+/, "photo-1517457373958-b7bdd4587205"),
  img.replace(/photo-\w+/, "photo-1505236858219-8359eb29e329"),
  img.replace(/photo-\w+/, "photo-1540575467063-178a50c2df87"),
];

const lineupSeed = [
  { name: "Darlington Akogo", role: "Founder, CEO — minoHealth AI", bio: "Founder and CEO of minoHealth AI and karaAgro AI. Chair of UN ITU & WHO Focus Group on AI for Health.", img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop", headliner: true },
  { name: "Jason Hickey", role: "Principal Engineer", bio: "Builds developer tooling at scale. Frequent conference speaker on systems design.", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop", headliner: true },
  { name: "Andreas Horn", role: "AI Strategist", bio: "Helping enterprises adopt practical AI workflows across operations.", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop", headliner: true },
  { name: "Olivia A. T. Frimpong", role: "Professor, Researcher", bio: "Researcher and educator focused on responsible AI and learning systems.", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop", headliner: true },
  { name: "Kayode Akomolafe", role: "Product Lead", bio: "Builds delightful consumer products with a focus on emerging markets.", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop", headliner: false },
];

const PublicEventDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const event = useMemo(() => seed.find((e) => String(e.id) === id) ?? seed[0], [id]);
  const gallery = useMemo(() => galleryFor(event.image), [event.image]);
  const related = useMemo(() => seed.filter((e) => e.id !== event.id).slice(0, 3), [event.id]);

  const [slide, setSlide] = useState(0);
  const [liked, setLiked] = useState(false);
  const [following, setFollowing] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [activeSpeaker, setActiveSpeaker] = useState<typeof lineupSeed[number] | null>(null);

  const next = () => setSlide((s) => (s + 1) % gallery.length);
  const prev = () => setSlide((s) => (s - 1 + gallery.length) % gallery.length);

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: event.title, url });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard");
      }
    } catch {
      toast.error("Couldn't share this event");
    }
  };

  const mapsQuery = encodeURIComponent(`${event.venue}, ${event.address}`);
  const mapsEmbed = `https://www.google.com/maps?q=${mapsQuery}&output=embed`;
  const directionsUrl = (mode: string) => `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}&travelmode=${mode}`;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-20 container mx-auto px-4 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-5"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to events
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
          {/* MAIN */}
          <div className="space-y-10 min-w-0">
            {/* Hero carousel */}
            <div className="relative rounded-2xl overflow-hidden border border-border bg-card">
              <div className="relative aspect-[16/9] bg-muted">
                <img src={gallery[slide]} alt={event.title} className="w-full h-full object-cover" />
                <button onClick={prev} aria-label="Previous"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/95 backdrop-blur shadow-lg flex items-center justify-center hover:bg-card transition">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button onClick={next} aria-label="Next"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/95 backdrop-blur shadow-lg flex items-center justify-center hover:bg-card transition">
                  <ChevronRight className="w-4 h-4" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {gallery.map((_, i) => (
                    <button key={i} onClick={() => setSlide(i)}
                      className={`h-1.5 rounded-full transition-all ${i === slide ? "w-6 bg-foreground" : "w-1.5 bg-foreground/40"}`} />
                  ))}
                </div>
              </div>
            </div>

            {/* Title block */}
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                {event.hot ? (
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full bg-rose-50 text-rose-600 border border-rose-100">
                    <Flame className="w-3 h-3" /> Few tickets left
                  </span>
                ) : <span />}
                <div className="flex items-center gap-2">
                  <button onClick={handleShare} aria-label="Share"
                    className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition">
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => { setLiked(!liked); toast.success(liked ? "Removed from saved" : "Saved to your list"); }} aria-label="Save"
                    className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition">
                    <Heart className={`w-4 h-4 ${liked ? "fill-primary text-primary" : ""}`} />
                  </button>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight leading-[1.1] mb-4">{event.title}</h1>

              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-primary/15 text-primary flex items-center justify-center font-semibold text-sm">
                  {event.organizer.split(" ").map((s) => s[0]).slice(0, 2).join("")}
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">By</p>
                  <p className="text-sm font-semibold text-foreground">{event.organizer}</p>
                </div>
                <Button size="sm" variant={following ? "secondary" : "outline"} className="rounded-lg"
                  onClick={() => { setFollowing(!following); toast.success(following ? "Unfollowed" : `Following ${event.organizer}`); }}>
                  {following ? "Following" : "Follow"}
                </Button>
              </div>

              <div className="space-y-1.5 mt-4 text-sm text-muted-foreground">
                <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> {event.venue} · {event.address}</p>
                <p className="flex items-center gap-2"><Calendar className="w-4 h-4 text-primary" /> {event.date}</p>
                <p className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> Ends {event.endDate}</p>
              </div>
            </div>

            {/* Overview */}
            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">Overview</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Join us in person for {event.title} to experience what {event.organizer} has been preparing — a curated lineup, immersive moments,
                and meaningful connections in the heart of {event.city}.
              </p>
              <h3 className="text-lg font-semibold text-foreground mb-2">Welcome to {event.title}!</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Get ready to dive into an unforgettable {event.category.toLowerCase()} experience. Network with like-minded attendees,
                discover new ideas, and enjoy a thoughtfully designed program. Whether you're a first-timer or a regular,
                there's a space for you here. Don't miss out on this gathering where community and creativity meet.
              </p>
            </section>

            {/* Lineup */}
            <section>
              <h2 className="text-xl font-bold text-foreground mb-4">Lineup</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {lineupSeed.map((p) => (
                  <button key={p.name} onClick={() => setActiveSpeaker(p)}
                    className="relative flex items-center gap-3 p-3 rounded-xl border border-border bg-card hover:border-foreground/30 hover:shadow-elevated transition text-left">
                    {p.headliner && (
                      <span className="absolute -top-2 left-3 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-primary text-primary-foreground">
                        Headliner
                      </span>
                    )}
                    <img src={p.img} alt={p.name} className="w-12 h-12 rounded-full object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{p.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{p.role}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </section>

            {/* Good to know */}
            <section>
              <h2 className="text-xl font-bold text-foreground mb-4">Good to know</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-xl border border-border bg-card p-4">
                  <h3 className="text-sm font-semibold text-foreground mb-2">Highlights</h3>
                  <ul className="text-sm text-muted-foreground space-y-1.5">
                    <li className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-primary" /> Approx. 3–4 hours</li>
                    <li className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-primary" /> In person</li>
                    <li className="flex items-center gap-2"><Users className="w-3.5 h-3.5 text-primary" /> Open to all ages</li>
                  </ul>
                </div>
                <div className="rounded-xl border border-border bg-card p-4">
                  <h3 className="text-sm font-semibold text-foreground mb-2">Refund Policy</h3>
                  <p className="text-sm text-muted-foreground">Refunds available up to 7 days before the event. Service fees are non-refundable.</p>
                </div>
              </div>
            </section>

            {/* Location */}
            <section>
              <h2 className="text-xl font-bold text-foreground mb-4">Location</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl border border-border bg-card p-5">
                  <h3 className="text-sm font-semibold text-foreground">{event.venue}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{event.address}</p>
                  <p className="text-sm text-muted-foreground">{event.city}</p>
                  <div className="mt-5">
                    <p className="text-sm font-semibold text-foreground mb-2">How do you want to get there?</p>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { label: "Driving", icon: Car, mode: "driving" },
                        { label: "Public transport", icon: Bus, mode: "transit" },
                        { label: "Biking", icon: Bike, mode: "bicycling" },
                        { label: "Walking", icon: PersonStanding, mode: "walking" },
                      ].map((m) => (
                        <a key={m.label} href={directionsUrl(m.mode)} target="_blank" rel="noreferrer"
                          className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border text-sm text-foreground hover:bg-secondary transition">
                          <m.icon className="w-4 h-4 text-primary" /> {m.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="rounded-xl border border-border bg-card overflow-hidden relative min-h-[260px]">
                  {showMap ? (
                    <iframe title="map" src={mapsEmbed} className="w-full h-full min-h-[260px]" loading="lazy" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-secondary/40">
                      <Button variant="outline" className="rounded-lg" onClick={() => setShowMap(true)}>
                        <MapPin className="w-4 h-4 mr-2" /> Show map
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Organizer */}
            <section>
              <h2 className="text-xl font-bold text-foreground mb-4">Organized by</h2>
              <div className="rounded-xl border border-border bg-card p-5 flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-foreground text-background flex items-center justify-center font-semibold">
                  {event.organizer.split(" ").map((s) => s[0]).slice(0, 2).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground">{event.organizer}</p>
                  <div className="flex gap-4 mt-1 text-xs text-muted-foreground">
                    <span><strong className="text-foreground">{event.organizerFollowers}</strong> followers</span>
                    <span><strong className="text-foreground">{event.organizerEvents}</strong> events</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="rounded-lg" onClick={() => toast.success("Message sent to organizer")}>Contact</Button>
                  <Button size="sm" className="rounded-lg" onClick={() => { setFollowing(!following); toast.success(following ? "Unfollowed" : `Following ${event.organizer}`); }}>
                    {following ? "Following" : "Follow"}
                  </Button>
                </div>
              </div>
              <button onClick={() => toast.success("Report submitted. Thanks for letting us know.")} className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
                <Flag className="w-3 h-3" /> Report this event
              </button>
            </section>

            {/* You might also like */}
            <section>
              <h2 className="text-xl font-bold text-foreground mb-4">You might also like</h2>
              <div className="space-y-3">
                {related.map((r) => (
                  <Link key={r.id} to={`/events/${r.id}`}
                    className="flex items-center gap-4 p-3 rounded-xl border border-border bg-card hover:shadow-elevated transition group">
                    <img src={r.image} alt={r.title} className="w-28 h-20 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition truncate">{r.title}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{r.date}</p>
                      <p className="text-xs text-muted-foreground">{r.venue} · {r.city}</p>
                    </div>
                    <span className="text-sm font-semibold text-foreground">{r.price}</span>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          {/* TICKET SIDEBAR */}
          <aside className="lg:sticky lg:top-28 self-start">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-elevated">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">{event.price === "Free" ? "Free entry" : "From"}</p>
              <p className="text-2xl font-bold text-foreground mt-1">{event.price}</p>
              <p className="text-xs text-muted-foreground mt-1">{event.date}</p>
              <Button className="w-full rounded-lg mt-4 bg-primary text-primary-foreground hover:brightness-110"
                onClick={() => toast.success(event.price === "Free" ? "Reserved your spot 🎉" : "Opening checkout…")}>
                {event.price === "Free" ? "Reserve a spot" : "Get tickets"}
              </Button>
              <p className="text-[11px] text-muted-foreground mt-3 flex items-center gap-1.5">
                <Info className="w-3 h-3" /> You won't be charged yet.
              </p>
            </div>
          </aside>
        </div>
      </div>

      {/* Speaker modal */}
      {activeSpeaker && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in" onClick={() => setActiveSpeaker(null)}>
          <div className="bg-card rounded-2xl max-w-md w-full overflow-hidden border border-border" onClick={(e) => e.stopPropagation()}>
            <div className="relative aspect-[4/3]">
              <img src={activeSpeaker.img} alt={activeSpeaker.name} className="w-full h-full object-cover" />
              <button onClick={() => setActiveSpeaker(null)} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-card/95 flex items-center justify-center hover:bg-card">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6">
              {activeSpeaker.headliner && (
                <span className="inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-primary text-primary-foreground mb-3">
                  Headliner
                </span>
              )}
              <h3 className="text-xl font-bold text-foreground">{activeSpeaker.name}</h3>
              <p className="text-sm text-primary mt-1">{activeSpeaker.role}</p>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{activeSpeaker.bio}</p>
            </div>
          </div>
        </div>
      )}

      <SaasFooter />
    </div>
  );
};

export default PublicEventDetailPage;
