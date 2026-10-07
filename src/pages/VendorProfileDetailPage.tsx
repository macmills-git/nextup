import { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Share2,
  Flag,
  MapPin,
  MessageCircle,
  Briefcase,
  ShieldCheck,
  FileText,
  Star,
  Clock,
  CreditCard,
  ChevronDown,
  ChevronUp,
  Play,
  Eye,
  HelpCircle,
  Check,
  Award,
  Compass,
  Zap,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useEventStore, VendorCertificate } from "@/contexts/EventStore";
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
  const [selectedCert, setSelectedCert] = useState<VendorCertificate | null>(null);
  const [selectedMediaUrl, setSelectedMediaUrl] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [billingCycle, setBillingCycle] = useState<"Per Event" | "Full Day">("Per Event");
  const effectivePortfolio = useMemo(() => {
    const fallbackPhotos = [
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80",
    ];
    const list = vendor?.portfolio && vendor.portfolio.length > 0 ? [...vendor.portfolio] : [];
    let i = 0;
    while (list.length < 4) {
      list.push(fallbackPhotos[i % fallbackPhotos.length]);
      i++;
    }
    return list;
  }, [vendor]);

  // 3 Pricing Cards matching the inspiration image design
  const pricingCards = useMemo(() => {
    if (!vendor) return [];

    const starterPkg = vendor.pricingPackages?.[0];
    const proPkg = vendor.pricingPackages?.[1];
    const expertPkg = vendor.pricingPackages?.[2];

    const starterService = vendor.services?.[0];
    const proService = vendor.services?.[1];
    const expertService = vendor.services?.[2];

    return [
      {
        id: "starter",
        price: starterPkg?.price || starterService?.priceRange || "GHS 1,500",
        description: starterPkg?.description || starterService?.description || "For solo users and basic event usage",
        features: starterPkg?.features || [
          starterService?.title || "Standard Audio / Equipment Setup",
          "Includes 2x PA Active Speakers & Wireless Mics",
          "1x On-site technical support staff",
          "Complete setup & tear-down included",
          "Standard customer support",
          "48-hour service guarantee",
        ],
        isDark: false,
      },
      {
        id: "pro",
        price: proPkg?.price || proService?.priceRange || "GHS 3,500",
        description: proPkg?.description || proService?.description || "For advanced features and full venue support",
        features: proPkg?.features || [
          "Complete Line Array & Intelligent Lighting Rig",
          "4x Tops + 2x Dual 18\" Subwoofers",
          "Full intelligent stage LED lighting rig",
          "2x Senior technical crew members",
          "Multi-track live audio recording",
          "Priority 24/7 technical support",
        ],
        isDark: false,
      },
      {
        id: "expert",
        price: expertPkg?.price || expertService?.priceRange || "GHS 6,500",
        description: expertPkg?.description || expertService?.description || "For teams and enthusiast looking to scale major events",
        features: expertPkg?.features || [
          "Full Stadium & Festival Production Rig",
          "Hydraulic stage trussing & beam lighting",
          "4K Multi-cam live stream & drone squad",
          "Dedicated 4-man technical operations crew",
          "Backup power generator included",
          "VIP white-glove service guarantee",
        ],
        isDark: true,
      },
    ];
  }, [vendor]);

  if (!vendor) {
    return (
      <div className="min-h-screen bg-background flex flex-col justify-between">
        <Navbar />
        <div className="pt-16 pb-20 container mx-auto px-4 text-center max-w-md">
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

  const handleWhatsApp = (packageName?: string) => {
    const num = vendor.contact.whatsapp || vendor.contact.phone;
    if (num) {
      const clean = num.replace(/[^0-9]/g, "");
      const packageText = packageName ? ` regarding the "${packageName}"` : "";
      const msg = encodeURIComponent(
        `Hi ${vendor.name}, I found your profile on NextUp and would like to inquire about your event services${packageText}.`
      );
      window.open(`https://wa.me/${clean}?text=${msg}`, "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Full-width Screen Header Banner (No rounded corners, +20% height) */}
      <div className="relative w-full rounded-none border-y border-stone-200/80 bg-stone-900 text-white py-8 md:py-14 lg:py-16 px-4 md:px-8 lg:px-12 mb-6 shadow-md min-h-[240px] md:min-h-[300px] flex items-center">
        {vendor.portfolio && vendor.portfolio[0] ? (
          <img
            src={vendor.portfolio[0]}
            alt={vendor.name}
            className="absolute inset-0 w-full h-full object-cover opacity-25 filter blur-xs"
          />
        ) : null}

        <div className="relative z-10 container mx-auto max-w-7xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <img
              src={vendor.logo}
              alt={vendor.name}
              className="w-24 h-24 md:w-28 md:h-28 rounded-2xl object-cover border-4 border-white bg-white flex-shrink-0 shadow-lg"
            />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">{vendor.name}</h1>
              </div>

              {/* Categories */}
              <div className="flex flex-wrap gap-2 mt-3">
                {vendor.categories.map((c) => (
                  <span
                    key={c}
                    className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/20 text-white backdrop-blur border border-white/10"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {vendor.contact.whatsapp || vendor.contact.phone ? (
              <Button
                onClick={() => handleWhatsApp()}
                size="lg"
                className="rounded-xl font-bold gap-2 bg-emerald-500 hover:bg-emerald-600 text-white flex-1 md:flex-initial shadow-md"
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

      <div className="pb-20 container mx-auto px-4 lg:px-8 max-w-7xl">
        {/* Navigation back */}
        <button
          onClick={() => navigate("/vendors")}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Vendor Directory
        </button>

        <div className="space-y-8 max-w-full">
            {/* 1. Benefits Grid Section */}
            <section className="bg-stone-50/70 dark:bg-stone-900/40 border border-stone-200/80 dark:border-stone-800 rounded-[32px] p-6 md:p-10 lg:p-12 shadow-xs">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                
                {/* Left Column: Title, Subtitle, Description & CTA */}
                <div className="lg:col-span-5 space-y-4">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400 block">
                    BENEFITS & OVERVIEW
                  </span>
                  <h2 className="text-2xl md:text-3xl font-semibold text-stone-900 dark:text-white tracking-tight leading-tight">
                    About {vendor.name}
                  </h2>
                  <p className="text-xs md:text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
                    {vendor.description}
                  </p>

                  <div className="pt-2">
                    {vendor.contact.whatsapp || vendor.contact.phone ? (
                      <Button
                        onClick={() => handleWhatsApp()}
                        size="lg"
                        className="rounded-xl font-medium text-xs px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200 shadow-xs gap-2"
                      >
                        <MessageCircle className="w-4 h-4" /> Contact Vendor
                      </Button>
                    ) : (
                      <Button
                        onClick={() => setShareOpen(true)}
                        size="lg"
                        className="rounded-xl font-medium text-xs px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200 shadow-xs gap-2"
                      >
                        <Share2 className="w-4 h-4" /> Share Profile
                      </Button>
                    )}
                  </div>
                </div>

                {/* Right Column: 2x2 Grid of Feature Cards */}
                <div className="lg:col-span-7">
                  <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 divide-y divide-stone-200 dark:divide-stone-800 overflow-hidden shadow-xs">
                    
                    {/* Top Row of 2x2 Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-stone-200 dark:divide-stone-800">
                      {/* Box 1: Track Record */}
                      <div className="p-6 md:p-7 space-y-2.5 flex flex-col justify-start">
                        <Award className="w-6 h-6 text-orange-500 stroke-[2]" />
                        <h3 className="text-base md:text-lg font-semibold text-stone-900 dark:text-white tracking-tight">
                          Track Record & Experience
                        </h3>
                        <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-normal">
                          {vendor.experienceYears ? `${vendor.experienceYears}+ years experience with ` : ""}
                          {vendor.completedEventsCount ? `${vendor.completedEventsCount}+ events completed ` : "proven event track record "}
                          {vendor.teamSize ? `and ${vendor.teamSize.toLowerCase()}` : ""}.
                        </p>
                      </div>

                      {/* Box 2: Headquarters & Location */}
                      <div className="p-6 md:p-7 space-y-2.5 flex flex-col justify-start">
                        <MapPin className="w-6 h-6 text-orange-500 stroke-[2]" />
                        <h3 className="text-base md:text-lg font-semibold text-stone-900 dark:text-white tracking-tight">
                          Primary Base & Location
                        </h3>
                        <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-normal">
                          {vendor.location}, {vendor.city}. Easily accessible for site visits and pre-event setup consultations.
                        </p>
                      </div>
                    </div>

                    {/* Bottom Row of 2x2 Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-stone-200 dark:divide-stone-800">
                      {/* Box 3: Service Coverage */}
                      <div className="p-6 md:p-7 space-y-2.5 flex flex-col justify-start">
                        <Compass className="w-6 h-6 text-orange-500 stroke-[2]" />
                        <h3 className="text-base md:text-lg font-semibold text-stone-900 dark:text-white tracking-tight">
                          Service Region Coverage
                        </h3>
                        <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-normal">
                          Active across <span className="font-semibold text-stone-900 dark:text-stone-200">{vendor.serviceArea}</span> with full mobile logistics equipment transport.
                        </p>
                      </div>

                      {/* Box 4: Hours & Payment Terms */}
                      <div className="p-6 md:p-7 space-y-2.5 flex flex-col justify-start">
                        <Clock className="w-6 h-6 text-orange-500 stroke-[2]" />
                        <h3 className="text-base md:text-lg font-semibold text-stone-900 dark:text-white tracking-tight">
                          Operating Hours & Terms
                        </h3>
                        <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-normal">
                          {vendor.businessHours || "Mon – Sat: 8:00 AM – 9:00 PM"}. {vendor.paymentTerms || "Mobile Money & Bank Transfer accepted"}.
                        </p>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </section>

            {/* 2. PRICING SECTION */}
            <section className="bg-card border border-stone-200/80 rounded-3xl p-6 md:p-8 shadow-xs space-y-6">
              {/* Header */}
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-primary px-3 py-1 rounded-full bg-primary/10 w-fit inline-block">
                  Rates & Packages
                </span>
                <h2 className="text-2xl font-normal text-foreground mt-2">
                  Pricing on Your Terms
                </h2>
                <p className="text-xs text-muted-foreground">
                  Whatever plan you pick, transparent rates with no hidden costs.
                </p>
              </div>

              {/* Billing Cycle Filter Pills */}
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center p-1 bg-stone-100 dark:bg-stone-800 rounded-full border border-stone-200 dark:border-stone-700">
                  <button
                    type="button"
                    onClick={() => setBillingCycle("Per Event")}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      billingCycle === "Per Event"
                        ? "bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-xs"
                        : "text-stone-500 dark:text-stone-400 hover:text-stone-900"
                    }`}
                  >
                    Per Event
                  </button>
                  <button
                    type="button"
                    onClick={() => setBillingCycle("Full Day")}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      billingCycle === "Full Day"
                        ? "bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-xs"
                        : "text-stone-500 dark:text-stone-400 hover:text-stone-900"
                    }`}
                  >
                    Full Day
                  </button>
                </div>
              </div>

              {/* 3-Card Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch pt-1">
                {pricingCards.map((card) => {
                  const isDark = card.isDark;

                  return (
                    <div
                      key={card.id}
                      className={`rounded-2xl p-6 flex flex-col justify-between transition-all duration-200 ${
                        isDark
                          ? "bg-stone-900 text-white shadow-lg border border-stone-800"
                          : "bg-stone-50 dark:bg-stone-900/60 border border-stone-200/90 dark:border-stone-800 text-stone-900 dark:text-white"
                      }`}
                    >
                      <div>
                        {/* Price */}
                        <div className="mb-1.5 flex items-baseline gap-1">
                          <span className={`text-2xl font-bold ${isDark ? "text-white" : "text-stone-900 dark:text-white"}`}>
                            {card.price}
                          </span>
                          <span className={`text-xs font-normal ${isDark ? "text-stone-400" : "text-stone-500"}`}>
                            / {billingCycle}
                          </span>
                        </div>

                        {/* Subtitle description */}
                        <p className={`text-xs font-normal leading-relaxed mb-4 ${isDark ? "text-stone-400" : "text-stone-600 dark:text-stone-400"}`}>
                          {card.description}
                        </p>

                        {/* Dashed Separator Line */}
                        <div className={`my-4 border-t border-dashed ${isDark ? "border-stone-800" : "border-stone-200/90"}`} />

                        {/* EVERYTHING INCLUDED: */}
                        <div className="space-y-2.5">
                          <p className="text-[10px] font-bold tracking-wider text-stone-400 uppercase mb-3">
                            EVERYTHING INCLUDED:
                          </p>

                          {card.features.map((feat, fIdx) => (
                            <div key={fIdx} className="flex items-start gap-2.5 text-xs font-normal">
                              <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                                isDark ? "bg-white/20 text-white" : "bg-stone-200/80 text-stone-700 dark:bg-stone-800 dark:text-stone-300"
                              }`}>
                                <Check className="w-2.5 h-2.5 stroke-[3]" />
                              </div>
                              <span className={isDark ? "text-stone-200" : "text-stone-600 dark:text-stone-300"}>
                                {feat}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* 3. PORTFOLIO PHOTO GALLERY & SHOWCASE */}
            <section className="bg-card border border-stone-200/80 rounded-3xl p-6 md:p-8 shadow-xs space-y-6">
              <h2 className="text-xl font-normal text-foreground flex items-center gap-2">
                <Eye className="w-5 h-5 text-primary" /> Portfolio Photo Gallery
              </h2>

              {/* Portfolio Photo Grid (Guaranteed 4+ photos) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {effectivePortfolio.map((imgUrl, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedMediaUrl(imgUrl)}
                    className="aspect-[4/3] rounded-2xl overflow-hidden border border-stone-200 bg-stone-100 cursor-pointer group relative shadow-xs hover:border-primary transition"
                  >
                    <img
                      src={imgUrl}
                      alt={`Portfolio image ${i + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                      <Eye className="w-5 h-5" />
                    </div>
                  </div>
                ))}
              </div>

                {/* Video Embeds if any */}
                {vendor.mediaFiles && vendor.mediaFiles.some((m) => m.type === "video") && (
                  <div className="pt-4 border-t border-stone-100">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3 flex items-center gap-1.5">
                      <Play className="w-3.5 h-3.5 text-primary" /> Featured Video Showcase
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {vendor.mediaFiles
                        .filter((m) => m.type === "video")
                        .map((vMedia, vIdx) => (
                          <div key={vIdx} className="rounded-2xl overflow-hidden border border-stone-200 bg-black">
                            <div className="aspect-video relative">
                              <iframe
                                src={vMedia.url}
                                title={vMedia.title || "Vendor Video Showcase"}
                                className="w-full h-full"
                                allowFullScreen
                              />
                            </div>
                            {vMedia.title && (
                              <div className="p-3 bg-stone-900 text-white">
                                <h4 className="text-xs font-bold">{vMedia.title}</h4>
                                {vMedia.caption && <p className="text-[11px] text-stone-400 mt-0.5">{vMedia.caption}</p>}
                              </div>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </section>

            {/* 4. BUSINESS CERTIFICATES & COMPLIANCE */}
            <section className="bg-card border border-stone-200/80 rounded-3xl p-6 md:p-8 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4" /> Official Business Documents
                  </span>
                  <h2 className="text-xl font-normal text-foreground mt-0.5">
                    Certificates & Compliance Verification
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {vendor.certificates && vendor.certificates.length > 0 ? (
                  vendor.certificates.map((cert, cIdx) => (
                    <div
                      key={cIdx}
                      className="p-4 rounded-2xl border border-stone-200 bg-stone-50/70 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-stone-900">{cert.title}</h4>
                          <p className="text-[11px] text-stone-500 font-medium mt-0.5">
                            {cert.issuingAuthority || "Registrar General Department"}
                            {cert.certNumber && ` · ID: ${cert.certNumber}`}
                          </p>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedCert(cert)}
                        className="rounded-xl text-xs font-semibold gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" /> View
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50/70 flex items-center justify-between gap-3 col-span-full">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-stone-900">Registered Business Listing</h4>
                        <p className="text-[11px] text-stone-500 font-medium mt-0.5">
                          Verified profile under NextUp Vendor Assurance Standard.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* VENDOR FAQS */}
            {vendor.faqs && vendor.faqs.length > 0 && (
              <section className="bg-card border border-stone-200/80 rounded-3xl p-6 md:p-8 shadow-xs">
                <h2 className="text-xl font-normal text-foreground mb-4 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary" /> Frequently Asked Questions
                </h2>

                <div className="space-y-3">
                  {vendor.faqs.map((faq, fIdx) => {
                    const isOpen = openFaqIndex === fIdx;
                    return (
                      <div key={fIdx} className="rounded-2xl border border-stone-200 overflow-hidden bg-stone-50/50">
                        <button
                          onClick={() => setOpenFaqIndex(isOpen ? null : fIdx)}
                          className="w-full flex items-center justify-between p-4 text-left font-semibold text-xs text-stone-900 hover:bg-stone-100 transition"
                        >
                          <span>{faq.question}</span>
                          {isOpen ? <ChevronUp className="w-4 h-4 text-stone-500" /> : <ChevronDown className="w-4 h-4 text-stone-500" />}
                        </button>
                        {isOpen && (
                          <div className="p-4 pt-0 text-xs text-stone-600 border-t border-stone-200/60 bg-white leading-relaxed">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* REPORT VENDOR FOOTER ACTION */}
            <div className="pt-4 text-center">
              <button
                onClick={() => setReportOpen(true)}
                className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-red-600 transition-colors"
              >
                <Flag className="w-3.5 h-3.5" /> Report vendor listing
              </button>
            </div>
          </div>
        </div>

      {/* DIALOG 1: CERTIFICATE VIEWER */}
      {selectedCert && (
        <Dialog open={!!selectedCert} onOpenChange={(open) => !open && setSelectedCert(null)}>
          <DialogContent className="sm:max-w-lg rounded-3xl p-6 bg-white overflow-hidden">
            <DialogHeader>
              <DialogTitle className="text-lg font-normal flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" /> {selectedCert.title}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 mt-2">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-stone-200 bg-stone-100">
                <img
                  src={selectedCert.fileUrl}
                  alt={selectedCert.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-stone-500 font-medium">Issuing Authority:</span>
                  <span className="font-bold text-stone-900">{selectedCert.issuingAuthority || "Govt Authority"}</span>
                </div>
                {selectedCert.certNumber && (
                  <div className="flex justify-between">
                    <span className="text-stone-500 font-medium">Certificate / Reg ID:</span>
                    <span className="font-bold text-stone-900">{selectedCert.certNumber}</span>
                  </div>
                )}
                {selectedCert.issueDate && (
                  <div className="flex justify-between">
                    <span className="text-stone-500 font-medium">Date Issued:</span>
                    <span className="font-bold text-stone-900">{selectedCert.issueDate}</span>
                  </div>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* DIALOG 2: MEDIA LIGHTBOX */}
      {selectedMediaUrl && (
        <Dialog open={!!selectedMediaUrl} onOpenChange={(open) => !open && setSelectedMediaUrl(null)}>
          <DialogContent className="sm:max-w-3xl rounded-3xl p-2 bg-black overflow-hidden border-none">
            <div className="aspect-auto max-h-[80vh] flex items-center justify-center">
              <img
                src={selectedMediaUrl}
                alt="Portfolio Media Preview"
                className="max-h-[80vh] w-auto object-contain rounded-2xl"
              />
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Share & Report Modals */}
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
