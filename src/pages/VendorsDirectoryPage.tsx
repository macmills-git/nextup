import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, MapPin, Store, Share2, BadgeCheck, Phone, Mail, Plus, AlertCircle } from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useEventStore, VendorCategory, VendorProfileModel } from "@/contexts/EventStore";
import { useAuth } from "@/contexts/AuthContext";
import ShareModal from "@/components/ShareModal";
import ReportModal from "@/components/ReportModal";
import { Button } from "@/components/ui/button";
import { VendorCardSkeleton } from "@/components/CardSkeletons";

const vendorCategories: ("All" | VendorCategory)[] = [
  "All",
  "MC / Host",
  "DJ",
  "Decoration",
  "Sound",
  "Lighting",
  "Catering / Food",
  "Photography",
  "Videography",
  "Event Planning",
  "Security",
  "Ushers",
  "Venue",
  "Equipment Rental",
  "Printing / Branding",
  "Transport",
  "Other",
];

export const VendorsDirectoryPage = () => {
  const navigate = useNavigate();
  const { vendors } = useEventStore();
  const { user } = useAuth();

  const myVendorProfile = useMemo(() => {
    return vendors.find((v) => v.ownerId === user?.id || v.ownerId === "current-user");
  }, [vendors, user]);

  const [query, setQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [activeCat, setActiveCat] = useState<"All" | VendorCategory>("All");
  const [isLoading, setIsLoading] = useState(true);

  const [shareTarget, setShareTarget] = useState<VendorProfileModel | null>(null);

  useEffect(() => {
    // Single page load fetch state (3-5 seconds duration)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  const publicVendors = useMemo(() => {
    return vendors.filter(v => v.status === "published" && !v.hidden);
  }, [vendors]);

  const filtered = useMemo(() => {
    return publicVendors.filter((v) => {
      const matchCat =
        activeCat === "All" || v.categories.includes(activeCat as VendorCategory);

      const q = query.toLowerCase();
      const matchQuery =
        !q ||
        v.name.toLowerCase().includes(q) ||
        v.description.toLowerCase().includes(q) ||
        v.services.some(s => s.title.toLowerCase().includes(q));

      const loc = locationFilter.toLowerCase();
      const matchLoc =
        !loc ||
        v.city.toLowerCase().includes(loc) ||
        v.location.toLowerCase().includes(loc) ||
        v.serviceArea.toLowerCase().includes(loc);

      return matchCat && matchQuery && matchLoc;
    });
  }, [publicVendors, activeCat, query, locationFilter]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-8 pb-20 container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-primary px-3 py-1 rounded-full bg-primary/10">
              NextUp Services Directory
            </span>
            <h1 className="text-3xl md:text-5xl font-normal text-foreground tracking-tight leading-tight mt-3">
              Find Event Vendors & Talent
            </h1>
            <p className="text-sm md:text-base text-muted-foreground mt-2">
              Browse top DJs, MCs, sound engineers, caterers, photographers, and event planners for your next event.
            </p>
          </div>
          <Button
            onClick={() => navigate("/create/vendor")}
            size="lg"
            className="rounded-xl gap-2 font-medium"
          >
            <Plus className="w-4 h-4" /> {myVendorProfile ? "Edit Vendor Profile" : "List Your Business / Profile"}
          </Button>
        </div>

        {/* Search & Location Bar */}
        <div className="flex flex-col md:flex-row gap-3 mb-6 bg-card border border-border p-2.5 rounded-2xl">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search vendor name, service, or keyword..."
              className="w-full h-11 rounded-xl bg-muted/60 pl-11 pr-4 text-xs md:text-sm text-foreground placeholder:text-muted-foreground outline-none border border-transparent focus:border-primary/30 transition-all"
            />
          </div>
          <div className="relative md:w-80">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              placeholder="Service area or city..."
              className="w-full h-11 rounded-xl bg-muted/60 pl-11 pr-4 text-xs md:text-sm text-foreground placeholder:text-muted-foreground outline-none border border-transparent focus:border-primary/30 transition-all"
            />
          </div>
        </div>

        {/* Categories Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {vendorCategories.map((cat) => (
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


        {/* Vendor Cards Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, idx) => (
              <VendorCardSkeleton key={idx} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((v) => (
            <article
              key={v.id}
              onClick={() => navigate(`/vendors/${v.id}`)}
              className="rounded-[28px] border border-stone-200/90 bg-card p-3 hover:border-stone-400 transition-colors group cursor-pointer flex flex-col justify-between"
            >
              {/* Top Inset Media Frame */}
              <div className="relative aspect-[4/3] rounded-[22px] overflow-hidden bg-stone-100">
                <img
                  src={(v.portfolio && v.portfolio[0]) || v.logo}
                  alt={v.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 text-xs font-medium px-3 py-1.5 rounded-full bg-white text-stone-900 border border-stone-100/50">
                  {v.categories[0] || "Vendor"}
                </span>
                <div className="absolute top-3 right-3 flex gap-1.5">
                  <button
                    onClick={(ev) => {
                      ev.stopPropagation();
                      setShareTarget(v);
                    }}
                    className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-stone-800 hover:bg-stone-50 transition-colors"
                    title="Share vendor profile"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Floating Logo Badge on Image */}
                <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-white/95 backdrop-blur px-3 py-1.5 rounded-full border border-stone-100/60 max-w-[85%]">
                  <img src={v.logo} alt={v.name} className="w-5 h-5 rounded-full object-cover flex-shrink-0" />
                  <span className="text-xs font-bold text-stone-900 truncate">{v.name}</span>
                  {v.verified && <BadgeCheck className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" title="Verified" />}
                </div>
              </div>

              {/* Content Section */}
              <div className="px-2 pt-3.5 pb-1 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-lg font-normal text-foreground leading-snug line-clamp-1 group-hover:text-primary transition-colors">
                      {v.name}
                    </h3>
                    <span className="text-sm font-extrabold text-foreground flex-shrink-0">
                      {v.services?.[0]?.priceRange || "Quote"}
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 line-clamp-1 mt-1 font-normal">
                    {v.description}
                  </p>
                </div>

                {/* Metadata Footer Row with Vertical Dividers */}
                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-600 font-medium">
                  <div className="flex-1 flex items-center justify-center gap-1.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
                    <span className="truncate">{v.city}</span>
                  </div>

                  <div className="w-[1px] h-4 bg-stone-200 flex-shrink-0" />

                  <div className="flex-1 flex items-center justify-center gap-1.5 truncate px-1">
                    <span className="truncate text-stone-500">{v.serviceArea || "Local"}</span>
                  </div>

                  <div className="w-[1px] h-4 bg-stone-200 flex-shrink-0" />

                  <div
                    className="flex-1 flex items-center justify-center gap-1.5 truncate text-emerald-600 font-semibold hover:underline"
                    onClick={(ev) => {
                      if (v.contact.whatsapp || v.contact.phone) {
                        ev.stopPropagation();
                        const num = v.contact.whatsapp || v.contact.phone;
                        window.open(`https://wa.me/${num?.replace(/[^0-9]/g, "")}`, "_blank");
                      }
                    }}
                  >
                    <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="truncate">Contact</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
        )}

        {!isLoading && filtered.length === 0 && (
          <div className="text-center py-20 rounded-2xl border border-dashed border-stone-300 bg-card p-8">
            <AlertCircle className="w-8 h-8 text-stone-400 mx-auto mb-3" />
            <h3 className="text-base font-normal text-foreground">No vendors found</h3>
            <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
              We couldn't find vendors matching your search filters. Be the first vendor to list your services!
            </p>
            <Button onClick={() => navigate("/create/vendor")} className="mt-4 rounded-xl text-xs font-semibold">
              Create Vendor Profile
            </Button>
          </div>
        )}
      </div>

      {/* Share Modal */}
      {shareTarget && (
        <ShareModal
          open={!!shareTarget}
          onOpenChange={(open) => !open && setShareTarget(null)}
          title={shareTarget.name}
          url={`${window.location.origin}/vendors/${shareTarget.id}`}
          description={shareTarget.description}
        />
      )}

      <Footer />
    </div>
  );
};

export default VendorsDirectoryPage;
