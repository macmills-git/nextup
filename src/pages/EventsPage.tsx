import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, MapPin, Calendar, Heart, Share2, Locate, ChevronDown, Check, Plus, AlertCircle, LayoutGrid, Map as MapIcon } from "lucide-react";
import { useMemo, useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useEventStore, EventCategory, EventModel } from "@/contexts/EventStore";
import ShareModal from "@/components/ShareModal";
import ReportModal from "@/components/ReportModal";
import { Button } from "@/components/ui/button";

const categories: ("All" | EventCategory | "Free")[] = [
  "All",
  "Technology",
  "Music & Concerts",
  "Business",
  "Parties & Nightlife",
  "Sports",
  "Career",
  "Arts & Culture",
  "Community",
  "Education",
  "Health & Wellness",
  "Free",
];

const sortOptions = [
  { id: "soonest", label: "Soonest first" },
  { id: "latest", label: "Latest first" },
  { id: "az", label: "Title (A–Z)" },
  { id: "free", label: "Free events first" },
] as const;
type SortId = typeof sortOptions[number]["id"];

export const EventsPage = () => {
  const navigate = useNavigate();
  const { events, toggleSaveEvent, isEventSaved } = useEventStore();

  const [query, setQuery] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [activeCat, setActiveCat] = useState<"All" | EventCategory | "Free">("All");
  const [dateFilter, setDateFilter] = useState<"any" | "today" | "weekend" | "month">("any");
  const [priceFilter, setPriceFilter] = useState<"all" | "free" | "paid">("all");
  const [sort, setSort] = useState<SortId>("soonest");
  const [sortOpen, setSortOpen] = useState(false);
  const [locating, setLocating] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");

  // Modals
  const [shareTarget, setShareTarget] = useState<EventModel | null>(null);
  const [reportTarget, setReportTarget] = useState<EventModel | null>(null);

  const sortRef = useRef<HTMLDivElement>(null);

  const resetFilters = () => {
    setQuery("");
    setCityFilter("");
    setActiveCat("All");
    setDateFilter("any");
    setPriceFilter("all");
  };

  const isFiltered = query !== "" || cityFilter !== "" || activeCat !== "All" || dateFilter !== "any" || priceFilter !== "all";

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) setSortOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const useMyLocation = () => {
    if (!navigator.geolocation) {
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      () => {
        setLocating(false);
        setCityFilter("Accra");
      },
      () => {
        setLocating(false);
      },
      { timeout: 5000 }
    );
  };

  const publicEvents = useMemo(() => {
    return events.filter(e => e.status === "published" && !e.hidden);
  }, [events]);

  const filtered = useMemo(() => {
    return publicEvents.filter((e) => {
      const matchCat =
        activeCat === "All" ||
        (activeCat === "Free" ? e.isFree || e.price === "Free" : e.category === activeCat);

      const q = query.toLowerCase();
      const matchQuery =
        !q ||
        e.title.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.venue.toLowerCase().includes(q) ||
        e.organizer.name.toLowerCase().includes(q);

      const matchCity =
        !cityFilter ||
        e.city.toLowerCase().includes(cityFilter.toLowerCase()) ||
        e.address.toLowerCase().includes(cityFilter.toLowerCase());

      const matchPrice =
        priceFilter === "all" ||
        (priceFilter === "free" ? e.isFree || e.price === "Free" : !e.isFree && e.price !== "Free");

      let matchDate = true;
      if (dateFilter !== "any") {
        const evtTime = new Date(e.startAt).getTime();
        const now = Date.now();
        const diffDays = (evtTime - now) / (1000 * 3600 * 24);
        if (dateFilter === "today") {
          const evtDate = new Date(e.startAt).toDateString();
          const todayDate = new Date().toDateString();
          matchDate = evtDate === todayDate;
        } else if (dateFilter === "weekend") {
          const day = new Date(e.startAt).getDay();
          matchDate = diffDays >= -1 && diffDays <= 14 && (day === 5 || day === 6 || day === 0);
        } else if (dateFilter === "month") {
          matchDate = diffDays >= -1 && diffDays <= 30;
        }
      }

      return matchCat && matchQuery && matchCity && matchPrice && matchDate;
    });
  }, [publicEvents, activeCat, query, cityFilter, priceFilter, dateFilter]);

  const sorted = useMemo(() => {
    const list = [...filtered];
    if (sort === "soonest") {
      list.sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime());
    } else if (sort === "latest") {
      list.sort((a, b) => new Date(b.startAt).getTime() - new Date(a.startAt).getTime());
    } else if (sort === "az") {
      list.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === "free") {
      list.sort((a, b) => (a.isFree ? -1 : 1) - (b.isFree ? -1 : 1));
    }
    return list;
  }, [filtered, sort]);

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-32 pb-20 container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-primary px-3 py-1 rounded-full bg-primary/10">
              NextUp Discover
            </span>
            <h1 className="text-3xl md:text-5xl font-normal text-foreground tracking-tight leading-tight mt-3">
              Explore Events & Gatherings
            </h1>
            <p className="text-sm md:text-base text-muted-foreground mt-2">
              Discover concerts, tech meetups, career expos, and campus experiences around you.
            </p>
          </div>
          <Button
            onClick={() => navigate("/create/event")}
            size="lg"
            className="rounded-xl gap-2 font-medium"
          >
            <Plus className="w-4 h-4" /> Publish an Event
          </Button>
        </div>

        {/* Search & Location bar */}
        <div className="flex flex-col md:flex-row gap-3 mb-4 bg-card border border-border p-2.5 rounded-2xl">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by event title, keyword, organizer or venue..."
              className="w-full h-11 rounded-xl bg-muted/60 pl-11 pr-4 text-xs md:text-sm text-foreground placeholder:text-muted-foreground outline-none border border-transparent focus:border-primary/30 transition-all"
            />
          </div>
          <div className="relative md:w-80">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              placeholder="Filter by location (e.g. Accra, Legon)..."
              className="w-full h-11 rounded-xl bg-muted/60 pl-11 pr-12 text-xs md:text-sm text-foreground placeholder:text-muted-foreground outline-none border border-transparent focus:border-primary/30 transition-all"
            />
            <button
              onClick={useMyLocation}
              disabled={locating}
              title="Use current location"
              aria-label="Use current location"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg hover:bg-stone-200/60 flex items-center justify-center transition disabled:opacity-50"
            >
              <Locate className={`w-4 h-4 text-muted-foreground ${locating ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>

        {/* Additional Filters: Date, Price, & Reset */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-card border border-border/80 p-3 rounded-2xl">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
            <span className="text-stone-500 font-semibold mr-1">Date:</span>
            {(
              [
                { id: "any", label: "Any Time" },
                { id: "today", label: "Today" },
                { id: "weekend", label: "This Weekend" },
                { id: "month", label: "Next 30 Days" },
              ] as const
            ).map((d) => (
              <button
                key={d.id}
                onClick={() => setDateFilter(d.id)}
                className={`px-3 py-1 rounded-xl transition-all ${
                  dateFilter === d.id
                    ? "bg-foreground text-background shadow-xs font-bold"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                {d.label}
              </button>
            ))}

            <div className="w-[1px] h-4 bg-stone-200 mx-1 hidden sm:block" />

            <span className="text-stone-500 font-semibold mr-1">Price:</span>
            {(
              [
                { id: "all", label: "All Prices" },
                { id: "free", label: "Free Only" },
                { id: "paid", label: "Paid Only" },
              ] as const
            ).map((p) => (
              <button
                key={p.id}
                onClick={() => setPriceFilter(p.id)}
                className={`px-3 py-1 rounded-xl transition-all ${
                  priceFilter === p.id
                    ? "bg-foreground text-background shadow-xs font-bold"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {isFiltered && (
            <button
              onClick={resetFilters}
              className="text-xs font-semibold text-primary hover:underline px-2 py-1"
            >
              Reset All Filters &times;
            </button>
          )}
        </div>

        {/* Categories Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-full border transition-all duration-200 ${
                activeCat === cat
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-stone-200 bg-card text-stone-600 hover:text-foreground hover:bg-stone-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results Info, View Toggle & Sort */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-base font-normal text-foreground">
            {sorted.length} {sorted.length === 1 ? "Event" : "Events"} {cityFilter ? `near "${cityFilter}"` : "Available"}
          </h2>

          <div className="flex items-center gap-2">
            {/* View Mode Switcher */}
            <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200">
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-lg transition-all ${
                  viewMode === "grid"
                    ? "bg-white text-stone-900 shadow-sm"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" /> Grid View
              </button>
              <button
                onClick={() => setViewMode("map")}
                className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-lg transition-all ${
                  viewMode === "map"
                    ? "bg-white text-stone-900 shadow-sm"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                <MapIcon className="w-3.5 h-3.5 text-primary" /> Map View
              </button>
            </div>

            {/* Sort Dropdown */}
            <div ref={sortRef} className="relative">
              <button
                onClick={() => setSortOpen((o) => !o)}
                className="text-xs font-medium text-stone-600 hover:text-foreground inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-card"
              >
                Sort: {sortOptions.find((s) => s.id === sort)?.label}
                <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
              {sortOpen && (
                <div className="absolute right-0 top-full mt-1 w-48 rounded-xl border border-border bg-card z-20 py-1 shadow-lg">
                  {sortOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setSort(opt.id);
                        setSortOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-foreground hover:bg-muted"
                    >
                      {opt.label}
                      {sort === opt.id && <Check className="w-3.5 h-3.5 text-primary" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Event Listings Display: Grid Mode or Map Explorer Mode */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {sorted.map((e) => {
              const saved = isEventSaved(e.id);
              return (
                <article
                  key={e.id}
                  onClick={() => navigate(`/events/${e.id}`)}
                  className="rounded-[28px] border border-stone-200/90 bg-card p-3 hover:border-stone-400 transition-colors group cursor-pointer flex flex-col justify-between"
                >
                  <div className="relative aspect-[4/3] rounded-[22px] overflow-hidden bg-stone-100">
                    <img
                      src={e.coverImage}
                      alt={e.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <span className="absolute top-3 left-3 text-xs font-medium px-3 py-1.5 rounded-full bg-white text-stone-900 border border-stone-100/50">
                      {e.category}
                    </span>
                    <div className="absolute top-3 right-3 flex gap-1.5">
                      <button
                        onClick={(ev) => {
                          ev.stopPropagation();
                          setShareTarget(e);
                        }}
                        className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-stone-800 hover:bg-stone-50 transition-colors"
                        title="Share event"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(ev) => {
                          ev.stopPropagation();
                          toggleSaveEvent(e.id);
                        }}
                        className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-stone-800 hover:bg-stone-50 transition-colors"
                        title={saved ? "Unsave event" : "Save event"}
                      >
                        <Heart className={`w-4 h-4 ${saved ? "fill-red-500 text-red-500" : "text-stone-700"}`} />
                      </button>
                    </div>
                  </div>

                  <div className="px-2 pt-3.5 pb-1 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="text-lg font-normal text-foreground leading-snug line-clamp-1 group-hover:text-primary transition-colors">
                          {e.title}
                        </h3>
                        <span className="text-lg font-extrabold text-foreground flex-shrink-0">
                          {e.isFree ? "Free" : e.price || "Free"}
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 line-clamp-1 mt-1 font-normal">
                        {e.description || `${e.venue}, ${e.city}`}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-600 font-medium">
                      <div className="flex-1 flex items-center justify-center gap-1.5 truncate">
                        <Calendar className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
                        <span className="truncate">{formatDate(e.startAt)}</span>
                      </div>
                      <div className="w-[1px] h-4 bg-stone-200 flex-shrink-0" />
                      <div className="flex-1 flex items-center justify-center gap-1.5 truncate px-1">
                        <MapPin className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
                        <span className="truncate">{e.city}</span>
                      </div>
                      <div className="w-[1px] h-4 bg-stone-200 flex-shrink-0" />
                      <div className="flex-1 flex items-center justify-center gap-1.5 truncate">
                        {e.organizer.logo ? (
                          <img src={e.organizer.logo} alt={e.organizer.name} className="w-4 h-4 rounded-full object-cover flex-shrink-0" />
                        ) : (
                          <div className="w-4 h-4 rounded-full bg-stone-200 text-stone-700 text-[9px] font-bold flex items-center justify-center flex-shrink-0">
                            {e.organizer.name.charAt(0)}
                          </div>
                        )}
                        <span className="truncate">{e.organizer.name}</span>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* Split Map View Mode */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-5 space-y-4">
              {sorted.map((e) => {
                const saved = isEventSaved(e.id);
                return (
                  <article
                    key={e.id}
                    onClick={() => navigate(`/events/${e.id}`)}
                    className="rounded-[24px] border border-stone-200/90 bg-card p-3 hover:border-stone-400 transition-colors cursor-pointer flex gap-4"
                  >
                    <img
                      src={e.coverImage}
                      alt={e.title}
                      className="w-28 h-28 rounded-xl object-cover flex-shrink-0 bg-stone-100"
                    />
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                            {e.category}
                          </span>
                          <span className="text-xs font-extrabold text-foreground">{e.isFree ? "Free" : e.price || "Free"}</span>
                        </div>
                        <h3 className="text-sm font-normal text-foreground mt-1 truncate group-hover:text-primary">
                          {e.title}
                        </h3>
                        <p className="text-xs text-stone-500 truncate mt-0.5">{e.venue}, {e.city}</p>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-stone-100">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-stone-400" /> {formatDate(e.startAt)}</span>
                        <Button variant="ghost" size="sm" className="h-7 text-xs font-medium text-primary p-0">
                          View Interactive Map &rarr;
                        </Button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="lg:col-span-7 sticky top-28 h-[600px] rounded-3xl border border-stone-200 overflow-hidden bg-stone-100 relative shadow-sm">
              <iframe
                title="Interactive Event Map View"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(cityFilter ? `${cityFilter}, Ghana` : "Accra, Ghana")}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                className="w-full h-full border-0"
                loading="lazy"
              />
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-stone-200 shadow-md flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-xs font-semibold text-stone-900">Map View Center</p>
                  <p className="text-[11px] text-stone-500">{cityFilter || "Accra & Surrounding Venues"}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {sorted.length === 0 && (
          <div className="text-center py-20 rounded-2xl border border-dashed border-stone-300 bg-card p-8">
            <AlertCircle className="w-8 h-8 text-stone-400 mx-auto mb-3" />
            <h3 className="text-base font-normal text-foreground">No events found</h3>
            <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
              We couldn't find events matching your active search or selected filters. Try clearing your filters or publish a new event.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
              {isFiltered && (
                <Button variant="outline" onClick={resetFilters} className="rounded-xl text-xs font-semibold border-stone-300">
                  Reset All Filters
                </Button>
              )}
              <Button onClick={() => navigate("/create/event")} className="rounded-xl text-xs font-semibold">
                Publish Event Now
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {shareTarget && (
        <ShareModal
          open={!!shareTarget}
          onOpenChange={(open) => !open && setShareTarget(null)}
          title={shareTarget.title}
          url={`${window.location.origin}/events/${shareTarget.id}`}
          description={shareTarget.description}
        />
      )}

      {reportTarget && (
        <ReportModal
          open={!!reportTarget}
          onOpenChange={(open) => !open && setReportTarget(null)}
          targetType="event"
          targetId={reportTarget.id}
          targetTitle={reportTarget.title}
        />
      )}

      <Footer />
    </div>
  );
};

export default EventsPage;
