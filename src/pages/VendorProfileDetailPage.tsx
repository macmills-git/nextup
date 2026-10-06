import { useMemo, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  BadgeCheck,
  Share2,
  Flag,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Globe,
  MessageCircle,
  Briefcase,
  CheckCircle,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useEventStore } from "@/contexts/EventStore";
import ShareModal from "@/components/ShareModal";
import ReportModal from "@/components/ReportModal";

export const VendorProfileDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getVendor, vendors } = useEventStore();

  const vendor = useMemo(() => {
    if (!id) return undefined;
    return getVendor(id);
  }, [id, getVendor, vendors]);

  const [shareOpen, setShareOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);

  if (!vendor) {
    return (
      <div className="min-h-screen bg-background flex flex-col justify-between">
        <Navbar />
        <div className="pt-8 pb-20 container mx-auto px-4 text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mx-auto mb-4">
            <Briefcase className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-normal text-foreground">Vendor Profile Not Found</h2>
          <p className="text-sm text-muted-foreground mt-2">
            The vendor profile you are looking for might have been updated or is no longer published.
          </p>
          <Button onClick={() => navigate("/vendors")} className="mt-6 rounded-xl font-semibold">
            Browse All Vendors
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const handleWhatsApp = () => {
    const num = vendor.contact.whatsapp || vendor.contact.phone;
    if (num) {
      const clean = num.replace(/[^0-9]/g, "");
      const msg = encodeURIComponent(`Hi ${vendor.name}, I found your profile on NextUp and would like to inquire about your event services.`);
      window.open(`https://wa.me/${clean}?text=${msg}`, "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-8 pb-20 container mx-auto px-4 lg:px-8 max-w-7xl">
        <button
          onClick={() => navigate("/vendors")}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Vendor Directory
        </button>

        {/* Vendor Header Banner */}
        <div className="relative rounded-3xl overflow-hidden border border-stone-200/80 bg-stone-900 text-white p-6 md:p-10 mb-8">
          {vendor.portfolio && vendor.portfolio[0] ? (
            <img
              src={vendor.portfolio[0]}
              alt={vendor.name}
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
          ) : null}

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <img
                src={vendor.logo}
                alt={vendor.name}
                className="w-20 h-20 md:w-24 md:h-24 rounded-2xl object-cover border-4 border-white bg-white flex-shrink-0"
              />
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl md:text-4xl font-normal">{vendor.name}</h1>
                  {vendor.verified && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold bg-emerald-500 text-white px-3 py-1 rounded-full">
                      <BadgeCheck className="w-4 h-4" /> Verified Vendor
                    </span>
                  )}
                </div>
                <p className="text-sm text-stone-200 mt-1 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-400" /> {vendor.location} · Service Area: <span className="font-semibold text-white">{vendor.serviceArea}</span>
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {vendor.categories.map((c) => (
                    <span key={c} className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/20 text-white backdrop-blur">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              {vendor.contact.whatsapp || vendor.contact.phone ? (
                <Button
                  onClick={handleWhatsApp}
                  size="lg"
                  className="rounded-xl font-bold gap-2 bg-emerald-500 hover:bg-emerald-600 text-white flex-1 md:flex-initial"
                >
                  <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
                </Button>
              ) : null}
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShareOpen(true)}
                className="rounded-xl font-semibold gap-2 bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur"
              >
                <Share2 className="w-4 h-4" /> Share Profile
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
          {/* MAIN CONTENT */}
          <div className="space-y-8 min-w-0">
            {/* About / Description */}
            <section className="bg-card border border-stone-200/80 rounded-2xl p-6">
              <h2 className="text-lg font-normal text-foreground mb-3">About {vendor.name}</h2>
              <p className="text-sm text-stone-700 leading-relaxed whitespace-pre-line">
                {vendor.description}
              </p>
            </section>

            {/* Services & Packages Offered */}
            <section className="bg-card border border-stone-200/80 rounded-2xl p-6">
              <h2 className="text-lg font-normal text-foreground mb-4">Services & Pricing Options</h2>
              {vendor.services && vendor.services.length > 0 ? (
                <div className="space-y-4">
                  {vendor.services.map((s, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 flex flex-col md:flex-row md:items-center justify-between gap-3">
                      <div>
                        <h3 className="text-sm font-normal text-foreground flex items-center gap-1.5">
                          <CheckCircle className="w-4 h-4 text-emerald-600" /> {s.title}
                        </h3>
                        {s.description && (
                          <p className="text-xs text-muted-foreground mt-1">{s.description}</p>
                        )}
                      </div>
                      {s.priceRange && (
                        <div className="text-left md:text-right flex-shrink-0">
                          <span className="text-xs font-semibold text-stone-500 uppercase">Estimated Quote</span>
                          <p className="text-sm font-black text-primary">{s.priceRange}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">Contact vendor directly for custom service package quotes.</p>
              )}
            </section>

            {/* Portfolio Showcase */}
            {vendor.portfolio && vendor.portfolio.length > 0 && (
              <section className="bg-card border border-stone-200/80 rounded-2xl p-6">
                <h2 className="text-lg font-normal text-foreground mb-4">Portfolio & Past Events</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {vendor.portfolio.map((imgUrl, i) => (
                    <div key={i} className="aspect-[4/3] rounded-xl overflow-hidden border border-stone-200 bg-stone-100">
                      <img src={imgUrl} alt={`Portfolio ${i + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* RIGHT SIDEBAR - CONTACT INFO */}
          <aside className="lg:sticky lg:top-28 self-start space-y-6">
            <div className="rounded-3xl border border-stone-200/90 bg-card p-6 space-y-5">
              <h3 className="text-base font-normal text-foreground border-b border-stone-100 pb-3">Contact Provider</h3>

              <div className="space-y-3">
                {vendor.contact.phone && (
                  <a
                    href={`tel:${vendor.contact.phone}`}
                    className="flex items-center gap-3 p-3 rounded-xl border border-stone-200 hover:bg-stone-50 transition text-xs font-semibold text-foreground"
                  >
                    <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-primary">
                      <Phone className="w-4 h-4" />
                    </div>
                    <span>{vendor.contact.phone}</span>
                  </a>
                )}

                {vendor.contact.email && (
                  <a
                    href={`mailto:${vendor.contact.email}`}
                    className="flex items-center gap-3 p-3 rounded-xl border border-stone-200 hover:bg-stone-50 transition text-xs font-semibold text-foreground"
                  >
                    <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-primary">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span className="truncate">{vendor.contact.email}</span>
                  </a>
                )}

                {vendor.contact.instagram && (
                  <div className="flex items-center gap-3 p-3 rounded-xl border border-stone-200 text-xs font-semibold text-foreground">
                    <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-primary">
                      <Instagram className="w-4 h-4" />
                    </div>
                    <span>{vendor.contact.instagram}</span>
                  </div>
                )}
              </div>

              {vendor.contact.whatsapp || vendor.contact.phone ? (
                <Button
                  onClick={handleWhatsApp}
                  size="lg"
                  className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold gap-2"
                >
                  <MessageCircle className="w-4 h-4" /> Send Direct Inquiry
                </Button>
              ) : null}

              <div className="pt-2 border-t border-stone-100">
                <button
                  onClick={() => setReportOpen(true)}
                  className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-red-600 transition-colors w-full justify-center"
                >
                  <Flag className="w-3.5 h-3.5" /> Report vendor listing
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Modals */}
      <ShareModal
        open={shareOpen}
        onOpenChange={setShareOpen}
        title={vendor.name}
        url={window.location.href}
        description={vendor.description}
      />

      <ReportModal
        open={reportOpen}
        onOpenChange={setReportOpen}
        targetType="vendor"
        targetId={vendor.id}
        targetTitle={vendor.name}
      />

      <Footer />
    </div>
  );
};

export default VendorProfileDetailPage;
