import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, MapPin, Calendar, Heart, Share2, Locate, ChevronDown, Check, Plus, AlertCircle, LayoutGrid, Map as MapIcon } from "lucide-react";
import { useMemo, useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useEventStore, EventCategory, EventModel } from "@/contexts/EventStore";
import ShareModal from "@/components/ShareModal";
import ReportModal from "@/components/ReportModal";
import { Button } from "@/components/ui/button";
import InteractiveEventMap from "@/components/InteractiveEventMap";
import { EventCardSkeleton, EventMapCardSkeleton } from "@/components/CardSkeletons";

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
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Single page load fetch state (3-5 seconds duration)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

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

      <div className="pt-8 pb-20 container mx-auto px-4 lg:px-8 max-w-7xl">
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

        {/* Search & View Mode / Sort bar */}
        <div className="flex flex-col md:flex-row items-center gap-3 mb-6 bg-card border border-border p-2.5 rounded-2xl shadow-sm">
          <div className="flex-1 relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by event title, city, venue, or organizer..."
              className="w-full h-11 rounded-xl bg-muted/60 pl-11 pr-4 text-xs md:text-sm text-foreground placeholder:text-muted-foreground outline-none border border-transparent focus:border-primary/30 transition-all"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
            {/* View Mode Switcher (Grid View & Map View) */}
            <div className="flex items-center bg-stone-100 dark:bg-stone-800 p-1 rounded-xl border border-stone-200 dark:border-stone-700">
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  viewMode === "grid"
                    ? "bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-sm"
                    : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white"
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" /> Grid View
              </button>
              <button
                onClick={() => setViewMode("map")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  viewMode === "map"
                    ? "bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-sm"
                    : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white"
                }`}
              >
                <MapIcon className="w-3.5 h-3.5 text-primary" /> Map View
              </button>
            </div>

            {/* Sort Dropdown */}
            <div ref={sortRef} className="relative">
              <button
                onClick={() => setSortOpen((o) => !o)}
                className="h-10 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:text-foreground inline-flex items-center gap-1.5 px-3.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/60 transition-colors"
              >
                Sort: {sortOptions.find((s) => s.id === sort)?.label}
                <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
              {sortOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-48 rounded-xl border border-border bg-card z-20 py-1 shadow-lg">
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

        {/* Categories Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
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

        {/* Event Listings Display: Grid Mode or Map Explorer Mode */}
        {isLoading ? (
          viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, idx) => (
                <EventCardSkeleton key={idx} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-5 space-y-4 max-h-[640px] overflow-y-auto pr-1">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <EventMapCardSkeleton key={idx} />
                ))}
              </div>
              <Skeleton className="lg:col-span-7 sticky top-20 h-[640px] rounded-3xl border border-stone-200" />
            </div>
          )
        ) : viewMode === "grid" ? (
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
            <div className="lg:col-span-5 space-y-4 max-h-[640px] overflow-y-auto pr-1">
              {sorted.map((e) => {
                const saved = isEventSaved(e.id);
                const isSelected = e.id === selectedEventId;
                return (
                  <article
                    key={e.id}
                    onClick={() => setSelectedEventId(e.id)}
                    className={`rounded-[24px] border p-3 transition-all cursor-pointer flex gap-4 ${
                      isSelected
                        ? "border-black bg-stone-100/90 shadow-md ring-1 ring-black"
                        : "border-stone-200/90 bg-card hover:border-stone-400"
                    }`}
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
                        <h3 className="text-sm font-semibold text-foreground mt-1 truncate group-hover:text-primary">
                          {e.title}
                        </h3>
                        <p className="text-xs text-stone-500 truncate mt-0.5">{e.venue}, {e.city}</p>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-stone-100">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-stone-400" /> {formatDate(e.startAt)}</span>
                        <Button
                          onClick={(ev) => {
                            ev.stopPropagation();
                            navigate(`/events/${e.id}`);
                          }}
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs font-semibold text-primary p-0 hover:bg-transparent hover:underline"
                        >
                          View Details &rarr;
                        </Button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="lg:col-span-7 sticky top-20 h-[640px]">
              <InteractiveEventMap
                events={sorted}
                selectedEventId={selectedEventId}
                onSelectEvent={(evt) => setSelectedEventId(evt.id)}
                className="w-full h-full"
              />
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
