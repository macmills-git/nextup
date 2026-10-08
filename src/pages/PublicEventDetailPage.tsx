import { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  MapPin,
  Calendar,
  Clock,
  ArrowLeft,
  Flag,
  ExternalLink,
  Phone,
  CheckCircle2,
  Navigation,
  Copy,
  Car,
  Bus,
  Bike,
  Footprints,
  UserPlus,
  UserCheck,
  X,
  Linkedin,
  Twitter,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useEventStore, LineupMember } from "@/contexts/EventStore";
import ShareModal from "@/components/ShareModal";
import ReportModal from "@/components/ReportModal";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

export const PublicEventDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getEvent, events, toggleSaveEvent, isEventSaved } = useEventStore();

  const event = useMemo(() => {
    if (!id) return undefined;
    return getEvent(id);
  }, [id, getEvent, events]);

  const [shareOpen, setShareOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [showMap, setShowMap] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSpeaker, setSelectedSpeaker] = useState<LineupMember | null>(null);

  if (!event) {
    return (
      <div className="min-h-screen bg-background flex flex-col justify-between">
        <Navbar />
        <div className="pt-8 pb-20 container mx-auto px-4 text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mx-auto mb-4">
            <Calendar className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-normal text-foreground">Event Not Found</h2>
          <p className="text-sm text-muted-foreground mt-2">
            The event listing you are looking for might have been removed or is no longer published.
          </p>
          <Button onClick={() => navigate("/events")} className="mt-6 rounded-xl font-semibold">
            Browse All Events
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const saved = isEventSaved(event.id);

  const galleryList = useMemo(() => {
    const list: string[] = [];
    if (event.coverImage) list.push(event.coverImage);
    if (event.galleryImages && event.galleryImages.length > 0) {
      event.galleryImages.forEach((img) => {
        if (img && !list.includes(img)) {
          list.push(img);
        }
      });
    }
    return list.length > 0
      ? list
      : ["https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80"];
  }, [event.coverImage, event.galleryImages]);

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return isoString;
    }
  };

  const formatTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      });
    } catch {
      return "";
    }
  };

  const mapsQuery = encodeURIComponent(`${event.venue}, ${event.address}, ${event.city}`);
  const mapsEmbed = `https://www.google.com/maps?q=${mapsQuery}&output=embed`;

  const openDirectionsMode = (mode: "d" | "r" | "b" | "w") => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}&dirflg=${mode}`;
    window.open(url, "_blank");
  };

  const toggleFollow = () => {
    setIsFollowing((prev) => {
      const nextState = !prev;
      const orgName = event.organizer?.name || "Organizer";
      toast.success(
        nextState
          ? `You are now following ${orgName}!`
          : `Unfollowed ${orgName}`
      );
      return nextState;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-8 pb-20 container mx-auto px-4 lg:px-8 max-w-7xl">
        <button
          onClick={() => navigate("/events")}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Discover Events
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
          {/* MAIN CONTENT COLUMN */}
          <div className="space-y-8 min-w-0">
            {/* 1. HERO MEDIA CAROUSEL */}
            <div className="relative rounded-3xl overflow-hidden border border-stone-200/80 bg-stone-900 group">
              <div className="relative aspect-[16/9] md:aspect-[21/9]">
                <img
                  src={galleryList[activeImageIndex]}
                  alt={event.title}
                  className="w-full h-full object-cover transition-all duration-300"
                />

                {/* Left / Right Carousel Arrows */}
                {galleryList.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setActiveImageIndex((prev) =>
                          prev === 0 ? galleryList.length - 1 : prev - 1
                        )
                      }
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 text-stone-900 flex items-center justify-center shadow-lg hover:bg-white transition-transform duration-200"
                      title="Previous Image"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() =>
                        setActiveImageIndex((prev) =>
                          prev === galleryList.length - 1 ? 0 : prev + 1
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 text-stone-900 flex items-center justify-center shadow-lg hover:bg-white transition-transform duration-200"
                      title="Next Image"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>

                    {/* Dot Pagination */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full">
                      {galleryList.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImageIndex(idx)}
                          className={`h-2 rounded-full transition-all ${
                            activeImageIndex === idx
                              ? "w-6 bg-white"
                              : "w-2 bg-white/50 hover:bg-white/80"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}

                {/* Top Action Floating Buttons */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => setShareOpen(true)}
                    className="w-10 h-10 rounded-full bg-white/95 backdrop-blur flex items-center justify-center hover:bg-white text-stone-700 shadow-sm transition-colors"
                    title="Share event"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => toggleSaveEvent(event.id)}
                    className="w-10 h-10 rounded-full bg-white/95 backdrop-blur flex items-center justify-center hover:bg-white shadow-sm transition-colors"
                    title={saved ? "Unsave event" : "Save event"}
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        saved ? "fill-red-500 text-red-500" : "text-stone-700"
                      }`}
                    />
                  </button>
                </div>

                {/* Top Badges */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  {event.ticketBadge && (
                    <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-red-600 text-white shadow-sm border border-red-500">
                      {event.ticketBadge}
                    </span>
                  )}
                  <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/95 backdrop-blur text-stone-900 shadow-sm">
                    {event.category}
                  </span>
                </div>
              </div>
            </div>

            {/* 2. TITLE & ORGANIZER HEADER */}
            <div>
              {/* Top Organizer Link Row */}
              <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground">
                <div className="w-6 h-6 rounded-full bg-stone-900 text-white flex items-center justify-center text-[10px] font-bold">
                  {(event.organizer?.name || "E").charAt(0)}
                </div>
                <span>By <strong className="text-foreground font-medium">{event.organizer?.name || "Event Organizer"}</strong></span>
                <button
                  onClick={toggleFollow}
                  className={`ml-2 px-2.5 py-0.5 rounded-full text-[11px] font-medium border transition-colors ${
                    isFollowing
                      ? "border-stone-300 bg-stone-100 text-stone-800"
                      : "border-primary/40 bg-primary/10 text-primary hover:bg-primary/20"
                  }`}
                >
                  {isFollowing ? "Following" : "Follow"}
                </button>
              </div>

              <h1 className="text-3xl md:text-5xl font-normal text-foreground tracking-tight leading-tight mb-4">
                {event.title}
              </h1>

              {/* Key Quick Info Box */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-stone-50 border border-stone-200/80">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase">Date & Time</p>
                    <p className="text-sm font-normal text-foreground mt-0.5">{formatDate(event.startAt)}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatTime(event.startAt)} {event.endAt ? `– ${formatTime(event.endAt)}` : ""}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase">Location / Venue</p>
                    <p className="text-sm font-normal text-foreground mt-0.5">{event.venue}</p>
                    <p className="text-xs text-muted-foreground">{event.address}, {event.city}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. OVERVIEW, AGENDA & PAST EDITIONS */}
            <section className="bg-card border border-stone-200/80 rounded-2xl p-6 md:p-8 space-y-6">
              <h2 className="text-xl font-normal text-foreground">Overview</h2>

              <div className="text-sm text-stone-700 leading-relaxed whitespace-pre-line">
                {event.description}
              </div>

              {/* What to Expect Checklist */}
              {event.whatToExpect && event.whatToExpect.length > 0 && (
                <div className="pt-4 border-t border-stone-100 space-y-3">
                  <h3 className="text-sm font-normal text-foreground flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> What to Expect & Highlights
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {event.whatToExpect.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-stone-50 border border-stone-100 text-xs text-stone-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Who Should Attend */}
              {event.whoShouldAttend && event.whoShouldAttend.length > 0 && (
                <div className="pt-4 border-t border-stone-100 space-y-2.5">
                  <h3 className="text-sm font-normal text-foreground">Who Should Attend</h3>
                  <div className="flex flex-wrap gap-2">
                    {event.whoShouldAttend.map((target, idx) => (
                      <span key={idx} className="px-3 py-1.5 rounded-full bg-stone-100 text-stone-800 text-xs font-medium border border-stone-200">
                        {target}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Schedule / Agenda Timeline */}
              {event.agenda && event.agenda.length > 0 && (
                <div className="pt-6 border-t border-stone-100 space-y-4">
                  <h3 className="text-base font-normal text-foreground">Event Schedule & Agenda</h3>
                  <div className="space-y-3">
                    {event.agenda.map((slot, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-stone-50/80 border border-stone-200/80 flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
                        <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full self-start flex-shrink-0 whitespace-nowrap">
                          {slot.time}
                        </span>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-normal text-foreground">{slot.title}</h4>
                          {slot.speakerName && (
                            <p className="text-xs text-muted-foreground font-medium mt-0.5">Featuring: {slot.speakerName}</p>
                          )}
                          {slot.description && (
                            <p className="text-xs text-stone-600 mt-1 leading-relaxed">{slot.description}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Embedded Video Trailer Preview (if available) */}
              {event.videoEmbedUrl && (
                <div className="pt-6 border-t border-stone-100 space-y-3">
                  <h3 className="text-base font-normal text-foreground">Event Trailer & Video Overview</h3>
                  <div className="rounded-2xl overflow-hidden border border-stone-200 aspect-video bg-black shadow-sm">
                    <iframe
                      src={event.videoEmbedUrl}
                      title={`${event.title} Promo Video`}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
            </section>

            {/* PREVIOUS EDITIONS & PAST MEMORIES SHOWCASE */}
            {event.pastEditions && event.pastEditions.length > 0 && (
              <section className="bg-card border border-stone-200/80 rounded-2xl p-6 md:p-8 space-y-4">
                <div>
                  <h2 className="text-xl font-normal text-foreground">Previous Editions & Highlights</h2>
                  <p className="text-xs text-muted-foreground mt-1">Look back at past event editions, attendee highlights, and memories.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {event.pastEditions.map((ed, idx) => (
                    <div key={idx} className="rounded-2xl border border-stone-200 overflow-hidden bg-stone-50/50 flex flex-col justify-between">
                      <div className="relative aspect-[16/10]">
                        <img src={ed.image} alt={ed.title} className="w-full h-full object-cover" />
                        <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-stone-900 text-white shadow-sm">
                          {ed.year}
                        </span>
                        {ed.attendeesCount && (
                          <span className="absolute bottom-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full bg-white/95 text-stone-900 shadow-sm backdrop-blur">
                            👥 {ed.attendeesCount}
                          </span>
                        )}
                      </div>
                      <div className="p-4 space-y-1.5">
                        <h3 className="text-sm font-normal text-foreground">{ed.title}</h3>
                        <p className="text-xs text-stone-600 leading-relaxed">{ed.summary}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 4. LINEUP SECTION (SPEAKERS / HEADLINERS) */}
            {event.lineup && event.lineup.length > 0 && (
              <section className="bg-card border border-stone-200/80 rounded-2xl p-6">
                <h2 className="text-xl font-normal text-foreground mb-4">Lineup</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {event.lineup.map((member) => (
                    <div
                      key={member.id}
                      onClick={() => setSelectedSpeaker(member)}
                      className="relative border border-stone-200/90 rounded-2xl p-4 bg-white hover:border-stone-400 transition-all cursor-pointer group flex items-center justify-between gap-3 shadow-xs"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="relative flex-shrink-0">
                          <img
                            src={member.avatar}
                            alt={member.name}
                            className="w-14 h-14 rounded-full object-cover border border-stone-200"
                          />
                          {member.roleTag && (
                            <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-md whitespace-nowrap shadow-xs">
                              {member.roleTag}
                            </span>
                          )}
                        </div>

                        <div className="min-w-0">
                          <h3 className="text-base font-normal text-foreground truncate group-hover:text-primary transition-colors">
                            {member.name}
                          </h3>
                          {member.title && (
                            <p className="text-xs text-muted-foreground truncate mt-0.5">
                              {member.title}
                            </p>
                          )}
                        </div>
                      </div>

                      <ChevronRight className="w-5 h-5 text-stone-400 group-hover:text-stone-700 transition-colors flex-shrink-0" />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 5. LOCATION & TRANSPORT OPTIONS */}
            <section className="bg-card border border-stone-200/80 rounded-2xl p-6 space-y-6">
              <div>
                <h2 className="text-xl font-normal text-foreground">Location</h2>
                <p className="text-base font-normal text-stone-900 mt-2">{event.venue}</p>
                <p className="text-xs text-stone-500 mt-0.5">{event.address}</p>
                <p className="text-xs text-stone-500">{event.city}, Greater Region</p>
              </div>

              {/* Grid: Transport options & Embedded Map */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                {/* Transport mode buttons */}
                <div className="md:col-span-5 space-y-4">
                  <h3 className="text-sm font-normal text-foreground border-b border-stone-100 pb-2">
                    How do you want to get there?
                  </h3>

                  <div className="space-y-2">
                    <button
                      onClick={() => openDirectionsMode("d")}
                      className="w-full flex items-center gap-3 p-3 rounded-xl border border-stone-200/90 hover:bg-stone-50 hover:border-stone-300 transition-colors text-xs font-normal text-stone-800 group"
                    >
                      <Car className="w-4 h-4 text-blue-600" />
                      <span>Driving</span>
                      <ExternalLink className="w-3.5 h-3.5 text-stone-400 ml-auto group-hover:text-stone-700" />
                    </button>

                    <button
                      onClick={() => openDirectionsMode("r")}
                      className="w-full flex items-center gap-3 p-3 rounded-xl border border-stone-200/90 hover:bg-stone-50 hover:border-stone-300 transition-colors text-xs font-normal text-stone-800 group"
                    >
                      <Bus className="w-4 h-4 text-blue-600" />
                      <span>Public transport</span>
                      <ExternalLink className="w-3.5 h-3.5 text-stone-400 ml-auto group-hover:text-stone-700" />
                    </button>

                    <button
                      onClick={() => openDirectionsMode("b")}
                      className="w-full flex items-center gap-3 p-3 rounded-xl border border-stone-200/90 hover:bg-stone-50 hover:border-stone-300 transition-colors text-xs font-normal text-stone-800 group"
                    >
                      <Bike className="w-4 h-4 text-blue-600" />
                      <span>Biking</span>
                      <ExternalLink className="w-3.5 h-3.5 text-stone-400 ml-auto group-hover:text-stone-700" />
                    </button>

                    <button
                      onClick={() => openDirectionsMode("w")}
                      className="w-full flex items-center gap-3 p-3 rounded-xl border border-stone-200/90 hover:bg-stone-50 hover:border-stone-300 transition-colors text-xs font-normal text-stone-800 group"
                    >
                      <Footprints className="w-4 h-4 text-blue-600" />
                      <span>Walking</span>
                      <ExternalLink className="w-3.5 h-3.5 text-stone-400 ml-auto group-hover:text-stone-700" />
                    </button>
                  </div>
                </div>

                {/* Auto-loading Interactive Map Frame */}
                <div className="md:col-span-7 rounded-2xl border border-stone-200 overflow-hidden relative h-[280px] bg-stone-100 shadow-inner">
                  {showMap ? (
                    <iframe
                      title={`Interactive Location Map for ${event.title}`}
                      src={mapsEmbed}
                      className="w-full h-full border-0"
                      loading="lazy"
                      allowFullScreen
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-100 p-6 text-center">
                      <MapPin className="w-8 h-8 text-primary mb-2" />
                      <p className="text-xs font-semibold text-foreground mb-3">Google Maps View</p>
                      <Button variant="outline" className="rounded-xl text-xs font-semibold" onClick={() => setShowMap(true)}>
                        Interactive Map View
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* 6. GOOD TO KNOW */}
            <section className="bg-card border border-stone-200/80 rounded-2xl p-6">
              <h2 className="text-xl font-normal text-foreground mb-4">Good to know</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Highlights */}
                <div className="p-5 rounded-2xl border border-stone-200 bg-stone-50/60 space-y-3">
                  <h3 className="text-sm font-normal text-foreground">Highlights</h3>
                  <div className="space-y-2 text-xs text-stone-700 font-normal">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-stone-500" />
                      <span>{event.highlights?.duration || "1 day 8 hours"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-stone-500" />
                      <span>{event.highlights?.format || "In person"}</span>
                    </div>
                    {event.highlights?.mobileTicket !== false && (
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Digital Pass / Mobile Ticket Accepted</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Refund Policy */}
                <div className="p-5 rounded-2xl border border-stone-200 bg-stone-50/60 space-y-3">
                  <h3 className="text-sm font-normal text-foreground">Refund Policy</h3>
                  <p className="text-xs text-stone-700 leading-relaxed font-normal">
                    {event.refundPolicy || "Refunds up to 7 days before event"}
                  </p>
                </div>
              </div>
            </section>

            {/* 7. ORGANIZED BY CARD */}
            <section className="bg-card border border-stone-200/80 rounded-2xl p-6">
              <h2 className="text-xl font-normal text-foreground mb-4">Organized by</h2>

              <div className="p-5 rounded-2xl border border-stone-200 bg-stone-50/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  {event.organizer?.logo ? (
                    <img
                      src={event.organizer.logo}
                      alt={event.organizer.name || "Organizer"}
                      className="w-16 h-16 rounded-full object-cover border border-stone-200 shadow-xs"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-stone-900 text-white flex items-center justify-center font-bold text-xl shadow-xs">
                      {(event.organizer?.name || "E").charAt(0)}
                    </div>
                  )}

                  <div>
                    <h3 className="text-lg font-normal text-foreground">{event.organizer?.name || "Event Organizer"}</h3>

                    {/* Stats Row */}
                    <div className="flex items-center gap-4 mt-2 text-xs text-stone-600">
                      <div>
                        <span className="block text-[10px] uppercase tracking-wider text-muted-foreground">Followers</span>
                        <span className="font-bold text-foreground">{event.organizerStats?.followers || 408}</span>
                      </div>
                      <div className="w-[1px] h-6 bg-stone-200" />
                      <div>
                        <span className="block text-[10px] uppercase tracking-wider text-muted-foreground">Events</span>
                        <span className="font-bold text-foreground">{event.organizerStats?.eventsCount || 3}</span>
                      </div>
                      <div className="w-[1px] h-6 bg-stone-200" />
                      <div>
                        <span className="block text-[10px] uppercase tracking-wider text-muted-foreground">Hosting</span>
                        <span className="font-bold text-foreground">{event.organizerStats?.hostingCount || "--"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Organizer Action Buttons */}
                <div className="flex items-center gap-2.5 w-full md:w-auto">
                  <Button
                    variant="outline"
                    onClick={() => {
                      const contactInfo = event.contact || event.organizer?.contact;
                      if (contactInfo?.includes("@")) {
                        window.location.href = `mailto:${contactInfo}`;
                      } else {
                        window.location.href = `tel:${contactInfo}`;
                      }
                    }}
                    className="flex-1 md:flex-initial rounded-xl text-xs font-semibold border-stone-300 hover:bg-stone-100"
                  >
                    Contact
                  </Button>

                  <Button
                    onClick={toggleFollow}
                    className={`flex-1 md:flex-initial rounded-xl text-xs font-semibold ${
                      isFollowing
                        ? "bg-stone-800 text-white hover:bg-stone-900"
                        : "bg-primary text-primary-foreground hover:brightness-110"
                    }`}
                  >
                    {isFollowing ? (
                      <span className="flex items-center gap-1"><UserCheck className="w-3.5 h-3.5" /> Following</span>
                    ) : (
                      <span className="flex items-center gap-1"><UserPlus className="w-3.5 h-3.5" /> Follow</span>
                    )}
                  </Button>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
                <button
                  onClick={() => setReportOpen(true)}
                  className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-red-600 transition-colors"
                >
                  <Flag className="w-3.5 h-3.5" /> Report inappropriate listing
                </button>
              </div>
            </section>
          </div>

          {/* RIGHT SIDEBAR CTA (Sticky Ticket Box) */}
          <aside className="lg:sticky lg:top-28 self-start space-y-4">
            <div className="rounded-3xl border border-stone-200/90 bg-card p-6 space-y-5 shadow-xs">
              <div>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Admission</span>
                <p className="text-3xl font-black text-foreground mt-1">{event.isFree ? "Free" : event.price || "Free"}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatDate(event.startAt)} · {formatTime(event.startAt)}
                </p>
              </div>

              {(() => {
                const isPaid = !event.isFree && Boolean(event.price) && event.price.toLowerCase() !== "free";
                const targetUrl = isPaid
                  ? (event.externalLink || "https://usexharp.io/events/")
                  : event.externalLink;

                if (targetUrl) {
                  return (
                    <Button
                      asChild
                      size="lg"
                      className="w-full rounded-xl bg-primary text-primary-foreground font-bold hover:brightness-110 gap-2 shadow-sm"
                    >
                      <a href={targetUrl} target="_blank" rel="noopener noreferrer">
                        Get tickets <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  );
                }

                return (
                  <Button
                    size="lg"
                    onClick={() => toast.success("You are registered! Event details saved.")}
                    className="w-full rounded-xl bg-primary text-primary-foreground font-bold hover:brightness-110 shadow-sm"
                  >
                    Get tickets
                  </Button>
                );
              })()}

              <div className="border-t border-stone-100 pt-4 space-y-2">
                <Button
                  variant="outline"
                  onClick={() => setShareOpen(true)}
                  className="w-full rounded-xl text-xs font-semibold gap-2 border-stone-300 hover:bg-stone-50"
                >
                  <Share2 className="w-3.5 h-3.5" /> Share via WhatsApp / Copy Link
                </Button>

                <Button
                  variant="ghost"
                  onClick={() => toggleSaveEvent(event.id)}
                  className="w-full rounded-xl text-xs font-semibold gap-2"
                >
                  <Heart className={`w-3.5 h-3.5 ${saved ? "fill-red-500 text-red-500" : ""}`} />
                  {saved ? "Saved in Your Dashboard" : "Save Event for Later"}
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* MODAL 1: SPEAKER / LINEUP MEMBER DETAIL */}
      {selectedSpeaker && (
        <Dialog open={!!selectedSpeaker} onOpenChange={(open) => !open && setSelectedSpeaker(null)}>
          <DialogContent className="sm:max-w-lg rounded-3xl p-6 bg-white overflow-hidden">
            <DialogHeader className="sr-only">
              <DialogTitle>{selectedSpeaker.name}</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-100 border border-stone-200">
                <img
                  src={selectedSpeaker.avatar}
                  alt={selectedSpeaker.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                {selectedSpeaker.roleTag && (
                  <span className="inline-block bg-purple-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider mb-2">
                    {selectedSpeaker.roleTag}
                  </span>
                )}
                <h3 className="text-2xl font-normal text-foreground">{selectedSpeaker.name}</h3>
                {selectedSpeaker.title && (
                  <p className="text-xs text-primary font-medium mt-1">{selectedSpeaker.title}</p>
                )}
              </div>

              {selectedSpeaker.bio && (
                <p className="text-xs text-stone-700 leading-relaxed pt-2 border-t border-stone-100">
                  {selectedSpeaker.bio}
                </p>
              )}

              {/* Social Links */}
              <div className="flex items-center gap-3 pt-2">
                {selectedSpeaker.linkedin && (
                  <a
                    href={selectedSpeaker.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-600 hover:text-blue-600 bg-stone-100 px-3 py-1.5 rounded-xl transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-blue-600" /> LinkedIn Profile
                  </a>
                )}
                {selectedSpeaker.twitter && (
                  <a
                    href={selectedSpeaker.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-600 hover:text-sky-500 bg-stone-100 px-3 py-1.5 rounded-xl transition-colors"
                  >
                    <Twitter className="w-3.5 h-3.5 text-sky-500" /> Twitter / X
                  </a>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* MODAL 2: SHARE MODAL */}
      <ShareModal
        open={shareOpen}
        onOpenChange={setShareOpen}
        title={event.title}
        url={window.location.href}
        description={event.description}
      />

      {/* MODAL 3: REPORT MODAL */}
      <ReportModal
        open={reportOpen}
        onOpenChange={setReportOpen}
        targetType="event"
        targetId={event.id}
        targetTitle={event.title}
      />

      <Footer />
    </div>
  );
};

export default PublicEventDetailPage;
