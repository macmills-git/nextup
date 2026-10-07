import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useEventStore, EventCategory, EventModel, LineupMember, AgendaItem, PastEdition } from "@/contexts/EventStore";
import { useAuth } from "@/contexts/AuthContext";
import {
  ArrowLeft,
  Calendar,
  Image as ImageIcon,
  MapPin,
  Eye,
  CheckCircle2,
  ArrowRight,
  Plus,
  Trash2,
  Users,
  Film,
  Award,
  Sparkles,
  Clock,
  ExternalLink,
  Upload,
} from "lucide-react";
import { toast } from "sonner";

const categories: EventCategory[] = [
  "Technology",
  "Education",
  "Business",
  "Music & Concerts",
  "Parties & Nightlife",
  "Sports",
  "Career",
  "Arts & Culture",
  "Community",
  "Religion",
  "Health & Wellness",
  "Other",
];

// Preset sample cover images for fast creation
const SAMPLE_COVER_IMAGES = [
  { label: "Tech Summit", url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80" },
  { label: "Concert Live", url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&auto=format&fit=crop&q=80" },
  { label: "Conference", url: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&auto=format&fit=crop&q=80" },
  { label: "Nightlife Party", url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&auto=format&fit=crop&q=80" },
  { label: "Campus & Youth", url: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1200&auto=format&fit=crop&q=80" },
  { label: "Sports & Fitness", url: "https://images.unsplash.com/photo-1517649763962-0c623266010b?w=1200&auto=format&fit=crop&q=80" },
];

export const CreateEventPage = () => {
  const navigate = useNavigate();
  const { id: routeId } = useParams<{ id?: string }>();
  const [searchParams] = useSearchParams();
  const editId = routeId || searchParams.get("edit");

  const { saveDraftEvent, publishEvent, getEvent } = useEventStore();
  const { user } = useAuth();

  const [activeStep, setActiveStep] = useState<number>(1);
  const [isEditingExisting, setIsEditingExisting] = useState(false);

  // STEP 1: Essentials & Location
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<EventCategory>("Technology");
  const [organizerName, setOrganizerName] = useState(user?.name || "Organizer");
  const [organizerLogo, setOrganizerLogo] = useState("");
  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");
  const [venue, setVenue] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Accra");

  // STEP 2: Admission, Photos & Media
  const [isFree, setIsFree] = useState(true);
  const [price, setPrice] = useState("");
  const [ticketBadge, setTicketBadge] = useState("");
  const [externalLink, setExternalLink] = useState("");
  const [contact, setContact] = useState("");
  const [coverImage, setCoverImage] = useState(
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80"
  );
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [galleryInput, setGalleryInput] = useState("");
  const [videoEmbedUrl, setVideoEmbedUrl] = useState("");

  // Cover Presets Toggle (Only cover presets kept as requested)
  const [showCoverPresets, setShowCoverPresets] = useState(false);

  // File Upload Handlers (Read local device files as Data URL)
  const handleSingleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    onSuccess: (dataUrl: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      if (evt.target?.result) {
        onSuccess(evt.target.result as string);
        toast.success(`Uploaded ${file.name}`);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleGalleryFilesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (evt) => {
        if (evt.target?.result) {
          setGalleryImages((prev) => [...prev, evt.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
    toast.success(`Uploaded ${files.length} photo(s) from device`);
  };

  // STEP 3: Overview, Agenda, Speakers & Past Editions
  const [description, setDescription] = useState("");
  const [whatToExpect, setWhatToExpect] = useState<string[]>([]);
  const [expectInput, setExpectInput] = useState("");
  const [whoShouldAttend, setWhoShouldAttend] = useState<string[]>([]);
  const [whoInput, setWhoInput] = useState("");

  const [agenda, setAgenda] = useState<AgendaItem[]>([]);
  const [agendaTime, setAgendaTime] = useState("");
  const [agendaTitle, setAgendaTitle] = useState("");
  const [agendaSpeaker, setAgendaSpeaker] = useState("");
  const [agendaDesc, setAgendaDesc] = useState("");

  const [lineup, setLineup] = useState<LineupMember[]>([]);
  const [speakerName, setSpeakerName] = useState("");
  const [speakerRole, setSpeakerRole] = useState<LineupMember["roleTag"]>("Headliner");
  const [speakerAvatar, setSpeakerAvatar] = useState("");
  const [speakerTitle, setSpeakerTitle] = useState("");
  const [speakerBio, setSpeakerBio] = useState("");
  const [speakerLinkedin, setSpeakerLinkedin] = useState("");
  const [speakerTwitter, setSpeakerTwitter] = useState("");

  const [pastEditions, setPastEditions] = useState<PastEdition[]>([]);
  const [editionYear, setEditionYear] = useState("");
  const [editionTitle, setEditionTitle] = useState("");
  const [editionAttendees, setEditionAttendees] = useState("");
  const [editionImage, setEditionImage] = useState("");
  const [editionSummary, setEditionSummary] = useState("");

  const [durationHighlight, setDurationHighlight] = useState("1 day 8 hours");
  const [formatHighlight, setFormatHighlight] = useState<"In person" | "Online" | "Hybrid">("In person");
  const [mobileTicket, setMobileTicket] = useState(true);
  const [refundPolicy, setRefundPolicy] = useState("Refunds up to 7 days before event");

  // Format ISO date string into datetime-local input format (YYYY-MM-DDTHH:mm)
  const formatForInput = (iso?: string) => {
    if (!iso) return "";
    try {
      const d = new Date(iso);
      if (isNaN(d.getTime())) return "";
      const pad = (n: number) => String(n).padStart(2, "0");
      return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
    } catch {
      return "";
    }
  };

  // Pre-fill form if editing an existing event
  useEffect(() => {
    if (editId) {
      const existing = getEvent(editId);
      if (existing) {
        const isOwner =
          existing.ownerId === user?.id ||
          existing.ownerId === "current-user" ||
          user?.role === "admin";

        if (!isOwner) {
          toast.error("You can only edit events that you have published.");
          navigate("/dashboard/events", { replace: true });
          return;
        }

        setIsEditingExisting(true);
        setTitle(existing.title || "");
        setDescription(existing.description || "");
        setCategory(existing.category || "Technology");
        setCoverImage(existing.coverImage || "");
        setGalleryImages(existing.galleryImages || []);
        setVideoEmbedUrl(existing.videoEmbedUrl || "");
        setStartAt(formatForInput(existing.startAt));
        setEndAt(formatForInput(existing.endAt));
        setVenue(existing.venue || "");
        setAddress(existing.address || "");
        setCity(existing.city || "Accra");
        setIsFree(existing.isFree ?? true);
        setPrice(existing.price || "");
        setTicketBadge(existing.ticketBadge || "");
        setExternalLink(existing.externalLink || "");
        setContact(existing.contact || "");
        setOrganizerName(existing.organizer?.name || user?.name || "Organizer");
        setOrganizerLogo(existing.organizer?.logo || "");
        setLineup(existing.lineup || []);
        setWhatToExpect(existing.whatToExpect || []);
        setWhoShouldAttend(existing.whoShouldAttend || []);
        setAgenda(existing.agenda || []);
        setPastEditions(existing.pastEditions || []);
        setDurationHighlight(existing.highlights?.duration || "1 day 8 hours");
        setFormatHighlight(existing.highlights?.format || "In person");
        setMobileTicket(existing.highlights?.mobileTicket ?? true);
        setRefundPolicy(existing.refundPolicy || "Refunds up to 7 days before event");
      }
    }
  }, [editId, getEvent, user, navigate]);

  // Adders
  const addGalleryImage = () => {
    if (!galleryInput.trim()) return;
    setGalleryImages((prev) => [...prev, galleryInput.trim()]);
    setGalleryInput("");
    toast.success("Gallery photo added");
  };

  const removeGalleryImage = (idx: number) => {
    setGalleryImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const addExpectation = () => {
    if (!expectInput.trim()) return;
    setWhatToExpect((prev) => [...prev, expectInput.trim()]);
    setExpectInput("");
  };

  const removeExpectation = (idx: number) => {
    setWhatToExpect((prev) => prev.filter((_, i) => i !== idx));
  };

  const addWhoTarget = () => {
    if (!whoInput.trim()) return;
    setWhoShouldAttend((prev) => [...prev, whoInput.trim()]);
    setWhoInput("");
  };

  const removeWhoTarget = (idx: number) => {
    setWhoShouldAttend((prev) => prev.filter((_, i) => i !== idx));
  };

  const addAgendaItem = () => {
    if (!agendaTitle.trim() || !agendaTime.trim()) {
      toast.error("Please enter a session title and time");
      return;
    }
    setAgenda((prev) => [
      ...prev,
      {
        time: agendaTime.trim(),
        title: agendaTitle.trim(),
        speakerName: agendaSpeaker.trim() || undefined,
        description: agendaDesc.trim() || undefined,
      },
    ]);
    setAgendaTime("");
    setAgendaTitle("");
    setAgendaSpeaker("");
    setAgendaDesc("");
    toast.success("Agenda session added");
  };

  const removeAgendaItem = (idx: number) => {
    setAgenda((prev) => prev.filter((_, i) => i !== idx));
  };

  const addLineupMember = () => {
    if (!speakerName.trim()) {
      toast.error("Please enter speaker name");
      return;
    }
    setLineup((prev) => [
      ...prev,
      {
        id: `spk-${Date.now()}`,
        name: speakerName.trim(),
        roleTag: speakerRole,
        avatar:
          speakerAvatar.trim() ||
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
        title: speakerTitle.trim() || undefined,
        bio: speakerBio.trim() || undefined,
        linkedin: speakerLinkedin.trim() || undefined,
        twitter: speakerTwitter.trim() || undefined,
      },
    ]);
    setSpeakerName("");
    setSpeakerAvatar("");
    setSpeakerTitle("");
    setSpeakerBio("");
    setSpeakerLinkedin("");
    setSpeakerTwitter("");
    toast.success("Lineup speaker added");
  };

  const removeLineupMember = (id: string) => {
    setLineup((prev) => prev.filter((m) => m.id !== id));
  };

  const addPastEdition = () => {
    if (!editionTitle.trim() || !editionYear.trim()) {
      toast.error("Please enter past edition title and year");
      return;
    }
    setPastEditions((prev) => [
      ...prev,
      {
        year: editionYear.trim(),
        title: editionTitle.trim(),
        attendeesCount: editionAttendees.trim() || undefined,
        image:
          editionImage.trim() ||
          "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80",
        summary: editionSummary.trim() || "Successful past edition with great turnout.",
      },
    ]);
    setEditionYear("");
    setEditionTitle("");
    setEditionAttendees("");
    setEditionImage("");
    setEditionSummary("");
    toast.success("Past edition added");
  };

  const removePastEdition = (idx: number) => {
    setPastEditions((prev) => prev.filter((_, i) => i !== idx));
  };

  // Validations
  const validateStep = (stepNum: number) => {
    if (stepNum === 1) {
      if (!title.trim()) {
        toast.error("Please enter an event title");
        return false;
      }
      if (!startAt) {
        toast.error("Please select a start date & time");
        return false;
      }
      if (!venue.trim()) {
        toast.error("Please enter a venue name");
        return false;
      }
      if (!description.trim()) {
        toast.error("Please enter an event description");
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 1));
  };

  const buildPayload = (status: EventModel["status"]) => {
    return {
      id: editId || undefined,
      ownerId: user?.id || "current-user",
      title,
      description,
      category,
      coverImage:
        coverImage ||
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80",
      galleryImages: galleryImages.length > 0 ? galleryImages : undefined,
      videoEmbedUrl: videoEmbedUrl || undefined,
      startAt: new Date(startAt).toISOString(),
      endAt: endAt ? new Date(endAt).toISOString() : undefined,
      venue,
      address: address || venue,
      city: city || "Accra",
      isFree,
      price: isFree ? "Free" : price || "GHS 20",
      ticketBadge: ticketBadge || undefined,
      externalLink: externalLink || (!isFree ? "https://usexharp.io/events/" : undefined),
      contact,
      organizer: {
        name: organizerName || user?.name || "Organizer",
        logo: organizerLogo || undefined,
        type: "Community" as const,
      },
      lineup: lineup.length > 0 ? lineup : undefined,
      whatToExpect: whatToExpect.length > 0 ? whatToExpect : undefined,
      whoShouldAttend: whoShouldAttend.length > 0 ? whoShouldAttend : undefined,
      agenda: agenda.length > 0 ? agenda : undefined,
      pastEditions: pastEditions.length > 0 ? pastEditions : undefined,
      highlights: {
        duration: durationHighlight,
        format: formatHighlight,
        mobileTicket,
      },
      refundPolicy,
      status,
    };
  };

  const handleSaveDraft = () => {
    if (!validateStep(1)) return;
    const draft = saveDraftEvent(buildPayload("draft"));
    toast.success(isEditingExisting ? "Event updated as draft!" : "Draft saved successfully!");
    navigate("/dashboard/events");
  };

  const handlePublish = () => {
    if (!validateStep(1)) return;
    const evt = saveDraftEvent(buildPayload("published"));
    publishEvent(evt.id);
    toast.success(isEditingExisting ? "Published event updated live!" : "Event published live!");
    navigate(`/events/${evt.id}`);
  };

  const stepsList = [
    { num: 1, label: "Essentials" },
    { num: 2, label: "Lineup and Media" },
    { num: 3, label: "Preview and Publish" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-8 pb-20 container mx-auto px-4 lg:px-8 max-w-5xl">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary px-3 py-1 rounded-full bg-primary/10">
              {isEditingExisting ? "Edit Published Listing" : "3-Step Creation Wizard"}
            </span>
            <h1 className="text-3xl font-normal text-foreground mt-2">
              {isEditingExisting
                ? `Edit Event: ${title || "Untitled"}`
                : activeStep === 3
                ? "Preview and Publish Event"
                : "Publish a New Event"}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleSaveDraft} className="rounded-xl text-xs font-semibold">
              Save Draft
            </Button>
            {activeStep === 3 ? (
              <Button onClick={handlePublish} className="rounded-xl text-xs font-bold gap-1 px-6 bg-primary text-primary-foreground">
                <CheckCircle2 className="w-4 h-4" /> {isEditingExisting ? "Save Live Updates" : "Publish Live"}
              </Button>
            ) : (
              <Button onClick={() => setActiveStep(3)} variant="secondary" className="rounded-xl text-xs font-semibold gap-1.5">
                <Eye className="w-4 h-4" /> Preview & Publish
              </Button>
            )}
          </div>
        </div>

        {/* 3-STEP PROGRESS BAR */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8 border-b border-stone-200 pb-4">
          {stepsList.map((s) => {
            const isActive = activeStep === s.num;
            const isCompleted = activeStep > s.num;
            return (
              <button
                key={s.num}
                onClick={() => {
                  if (s.num < activeStep || validateStep(activeStep)) {
                    setActiveStep(s.num);
                  }
                }}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl text-xs font-medium transition-all text-left ${
                  isActive
                    ? "bg-foreground text-background shadow-sm"
                    : isCompleted
                    ? "bg-stone-100 text-stone-900 hover:bg-stone-200"
                    : "bg-stone-50 text-stone-400 hover:text-stone-700"
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-full text-[11px] font-bold flex items-center justify-center flex-shrink-0 ${
                    isActive
                      ? "bg-background text-foreground"
                      : isCompleted
                      ? "bg-stone-300 text-stone-900"
                      : "bg-stone-200 text-stone-500"
                  }`}
                >
                  {s.num}
                </span>
                <span className="truncate">{s.label}</span>
              </button>
            );
          })}
        </div>

        {/* STEP 1: ESSENTIALS */}
        {activeStep === 1 && (
          <div className="bg-card border border-stone-200/80 rounded-3xl p-6 md:p-8 space-y-8">
            <h2 className="text-base font-normal text-foreground border-b border-stone-100 pb-2">
              Step 1: Essentials
            </h2>

            {/* Section A: Essentials */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">1. Event Essentials</h3>
              <div className="space-y-1.5">
                <Label className="text-xs font-normal text-foreground">Event Title *</Label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Pan African AI & Innovation Summit 2026 or Campus Sunset Live"
                  className="rounded-xl text-xs md:text-sm bg-stone-50"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5 md:col-span-1">
                  <Label className="text-xs font-normal text-foreground">Category *</Label>
                  <Select value={category} onValueChange={(v) => setCategory(v as EventCategory)}>
                    <SelectTrigger className="rounded-xl text-xs bg-stone-50">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((c) => (
                        <SelectItem key={c} value={c} className="text-xs">
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5 md:col-span-1">
                  <Label className="text-xs font-normal text-foreground">Organizer Display Name</Label>
                  <Input
                    value={organizerName}
                    onChange={(e) => setOrganizerName(e.target.value)}
                    placeholder="e.g. Pan African AI Summit"
                    className="rounded-xl text-xs bg-stone-50"
                  />
                </div>

                <div className="space-y-1.5 md:col-span-1">
                  <Label className="text-xs font-normal text-foreground">Organizer Logo / Photo</Label>
                  <div className="flex gap-2">
                    <Input
                      value={organizerLogo}
                      onChange={(e) => setOrganizerLogo(e.target.value)}
                      placeholder="https://..."
                      className="rounded-xl text-xs bg-stone-50 flex-1"
                    />
                    <label className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-stone-300 bg-stone-50 hover:bg-stone-100 text-[11px] font-semibold text-stone-700 cursor-pointer flex-shrink-0">
                      <Upload className="w-3.5 h-3.5 text-stone-500" /> Upload
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleSingleFileUpload(e, (dataUrl) => setOrganizerLogo(dataUrl))}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-normal text-foreground">Start Date & Time *</Label>
                  <Input
                    type="datetime-local"
                    value={startAt}
                    onChange={(e) => setStartAt(e.target.value)}
                    className="rounded-xl text-xs bg-stone-50"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-normal text-foreground">End Date & Time (Optional)</Label>
                  <Input
                    type="datetime-local"
                    value={endAt}
                    onChange={(e) => setEndAt(e.target.value)}
                    className="rounded-xl text-xs bg-stone-50"
                  />
                </div>
              </div>
            </div>

            {/* Section B: Location & Admission */}
            <div className="space-y-4 pt-4 border-t border-stone-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">2. Venue & Admission</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5 md:col-span-1">
                  <Label className="text-xs font-normal text-foreground">Venue Name *</Label>
                  <Input
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    placeholder="e.g. Kempinski Hotel Gold Coast City"
                    className="rounded-xl text-xs bg-stone-50"
                  />
                </div>

                <div className="space-y-1.5 md:col-span-1">
                  <Label className="text-xs font-normal text-foreground">Address / Street</Label>
                  <Input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. 66 Gamel Abdul Nasser Avenue"
                    className="rounded-xl text-xs bg-stone-50"
                  />
                </div>

                <div className="space-y-1.5 md:col-span-1">
                  <Label className="text-xs font-normal text-foreground">City</Label>
                  <Input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Accra"
                    className="rounded-xl text-xs bg-stone-50"
                  />
                </div>
              </div>

              {/* Admission Switch */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-stone-50 border border-stone-200">
                <div>
                  <p className="text-xs font-normal text-foreground">Free Admission</p>
                  <p className="text-[11px] text-muted-foreground">Is this event free for attendees?</p>
                </div>
                <Switch checked={isFree} onCheckedChange={setIsFree} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {!isFree && (
                  <div className="space-y-1.5">
                    <Label className="text-xs font-normal text-foreground">Ticket Price / Fee</Label>
                    <Input
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="e.g. GHS 50 or $25"
                      className="rounded-xl text-xs bg-stone-50"
                    />
                  </div>
                )}

                <div className="space-y-1.5">
                  <Label className="text-xs font-normal text-foreground">Ticket Badge Tag (Optional)</Label>
                  <Input
                    value={ticketBadge}
                    onChange={(e) => setTicketBadge(e.target.value)}
                    placeholder="e.g. 🔥 FEW TICKETS LEFT or SELLING FAST"
                    className="rounded-xl text-xs bg-stone-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-normal text-foreground">External Ticket / RSVP Link</Label>
                  <Input
                    value={externalLink}
                    onChange={(e) => setExternalLink(e.target.value)}
                    placeholder="https://tickets.example.com/..."
                    className="rounded-xl text-xs bg-stone-50"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-normal text-foreground">Organizer Contact Info</Label>
                  <Input
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="WhatsApp phone or email"
                    className="rounded-xl text-xs bg-stone-50"
                  />
                </div>
              </div>

              {/* Format, Duration & Refund Policy */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="space-y-1.5">
                  <Label className="text-xs font-normal text-foreground">Event Format</Label>
                  <Select value={formatHighlight} onValueChange={(v) => setFormatHighlight(v as any)}>
                    <SelectTrigger className="rounded-xl text-xs bg-stone-50">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="In person" className="text-xs">In person</SelectItem>
                      <SelectItem value="Online" className="text-xs">Online</SelectItem>
                      <SelectItem value="Hybrid" className="text-xs">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-normal text-foreground">Estimated Duration</Label>
                  <Input
                    value={durationHighlight}
                    onChange={(e) => setDurationHighlight(e.target.value)}
                    placeholder="e.g. 1 day 8 hours or 3 hours"
                    className="rounded-xl text-xs bg-stone-50"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-normal text-foreground">Refund Policy</Label>
                  <Input
                    value={refundPolicy}
                    onChange={(e) => setRefundPolicy(e.target.value)}
                    placeholder="e.g. Refunds up to 7 days before event"
                    className="rounded-xl text-xs bg-stone-50"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-stone-50 border border-stone-200">
                <div>
                  <p className="text-xs font-normal text-foreground">Digital / Mobile Ticket Accepted</p>
                  <p className="text-[11px] text-muted-foreground">Accept digital passes on mobile for fast entry</p>
                </div>
                <Switch checked={mobileTicket} onCheckedChange={setMobileTicket} />
              </div>
            </div>

            {/* Section C: Overview & Highlights */}
            <div className="space-y-4 pt-4 border-t border-stone-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">3. Overview & Highlights</h3>
              <div className="space-y-1.5">
                <Label className="text-xs font-normal text-foreground">Detailed Event Overview *</Label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Write a detailed description of the event, key themes, and networking opportunities..."
                  rows={4}
                  className="rounded-xl text-xs md:text-sm bg-stone-50 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* What to Expect */}
                <div className="space-y-2">
                  <Label className="text-xs font-normal text-foreground">What to Expect (Checklist Highlights)</Label>
                  <div className="flex gap-2">
                    <Input
                      value={expectInput}
                      onChange={(e) => setExpectInput(e.target.value)}
                      placeholder="e.g. Keynotes by top pioneers..."
                      className="rounded-xl text-xs bg-stone-50"
                    />
                    <Button onClick={addExpectation} type="button" variant="outline" className="rounded-xl text-xs font-semibold gap-1 flex-shrink-0">
                      <Plus className="w-3.5 h-3.5" /> Add
                    </Button>
                  </div>
                  {whatToExpect.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-stone-50 border text-xs">
                      <span>• {item}</span>
                      <button onClick={() => removeExpectation(idx)} className="text-stone-400 hover:text-red-600">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Who Should Attend */}
                <div className="space-y-2">
                  <Label className="text-xs font-normal text-foreground">Who Should Attend (Target Audience Tags)</Label>
                  <div className="flex gap-2">
                    <Input
                      value={whoInput}
                      onChange={(e) => setWhoInput(e.target.value)}
                      placeholder="e.g. Engineers, Founders..."
                      className="rounded-xl text-xs bg-stone-50"
                    />
                    <Button onClick={addWhoTarget} type="button" variant="outline" className="rounded-xl text-xs font-semibold gap-1 flex-shrink-0">
                      <Plus className="w-3.5 h-3.5" /> Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {whoShouldAttend.map((target, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-100 border text-[11px] font-medium">
                        {target}
                        <button onClick={() => removeWhoTarget(idx)} className="text-stone-400 hover:text-red-600">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Section D: Schedule & Agenda Timeline */}
            <div className="space-y-3 pt-4 border-t border-stone-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">4. Agenda & Schedule Timeline</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 rounded-2xl bg-stone-50 border border-stone-200">
                <Input
                  value={agendaTime}
                  onChange={(e) => setAgendaTime(e.target.value)}
                  placeholder="Time slot (e.g. 09:00 AM - 10:00 AM)"
                  className="rounded-xl text-xs bg-white"
                />
                <Input
                  value={agendaTitle}
                  onChange={(e) => setAgendaTitle(e.target.value)}
                  placeholder="Session Title"
                  className="rounded-xl text-xs bg-white"
                />
                <Input
                  value={agendaSpeaker}
                  onChange={(e) => setAgendaSpeaker(e.target.value)}
                  placeholder="Speaker Name (Optional)"
                  className="rounded-xl text-xs bg-white"
                />
                <div className="md:col-span-3 flex gap-2">
                  <Input
                    value={agendaDesc}
                    onChange={(e) => setAgendaDesc(e.target.value)}
                    placeholder="Short description of session..."
                    className="rounded-xl text-xs bg-white flex-1"
                  />
                  <Button onClick={addAgendaItem} type="button" className="rounded-xl text-xs font-semibold gap-1">
                    <Plus className="w-3.5 h-3.5" /> Add Session
                  </Button>
                </div>
              </div>

              {agenda.map((slot, idx) => (
                <div key={idx} className="flex items-start justify-between p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs">
                  <div>
                    <span className="font-bold text-primary">{slot.time}</span>
                    <h4 className="font-normal text-foreground mt-0.5">{slot.title}</h4>
                    {slot.speakerName && <p className="text-[11px] text-stone-500">Featuring: {slot.speakerName}</p>}
                  </div>
                  <button onClick={() => removeAgendaItem(idx)} className="text-stone-400 hover:text-red-600">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4 border-t border-stone-100">
              <Button onClick={handleNext} className="rounded-xl text-xs font-semibold gap-1.5">
                Next: Lineup & Media Showcase &rarr;
              </Button>
            </div>
          </div>
        )}

        {/* STEP 2: LINEUP AND MEDIA */}
        {activeStep === 2 && (
          <div className="bg-card border border-stone-200/80 rounded-3xl p-6 md:p-8 space-y-8">
            <h2 className="text-base font-normal text-foreground border-b border-stone-100 pb-2">
              Step 2: Lineup and Media
            </h2>

            {/* Lineup & Speakers Adder */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">1. Lineup & Speakers</h3>
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Input
                    value={speakerName}
                    onChange={(e) => setSpeakerName(e.target.value)}
                    placeholder="Speaker Name *"
                    className="rounded-xl text-xs bg-white"
                  />
                  <Select value={speakerRole} onValueChange={(v) => setSpeakerRole(v as any)}>
                    <SelectTrigger className="rounded-xl text-xs bg-white">
                      <SelectValue placeholder="Role Tag" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Headliner" className="text-xs">Headliner</SelectItem>
                      <SelectItem value="Speaker" className="text-xs">Speaker</SelectItem>
                      <SelectItem value="Keynote" className="text-xs">Keynote</SelectItem>
                      <SelectItem value="Panelist" className="text-xs">Panelist</SelectItem>
                      <SelectItem value="Performer" className="text-xs">Performer</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex gap-2">
                    <Input
                      value={speakerAvatar}
                      onChange={(e) => setSpeakerAvatar(e.target.value)}
                      placeholder="Avatar Photo URL (https://...)"
                      className="rounded-xl text-xs bg-white flex-1"
                    />
                    <label className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-100 text-[11px] font-semibold text-stone-700 cursor-pointer flex-shrink-0">
                      <Upload className="w-3.5 h-3.5 text-stone-500" /> Upload
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleSingleFileUpload(e, (dataUrl) => setSpeakerAvatar(dataUrl))}
                      />
                    </label>
                  </div>
                </div>
                <Input
                  value={speakerTitle}
                  onChange={(e) => setSpeakerTitle(e.target.value)}
                  placeholder="Title / Designation (e.g. Founder & CEO)"
                  className="rounded-xl text-xs bg-white"
                />
                <Textarea
                  value={speakerBio}
                  onChange={(e) => setSpeakerBio(e.target.value)}
                  placeholder="Speaker Bio..."
                  rows={2}
                  className="rounded-xl text-xs bg-white resize-none"
                />
                <div className="flex justify-end">
                  <Button onClick={addLineupMember} type="button" className="rounded-xl text-xs font-semibold gap-1">
                    <Plus className="w-3.5 h-3.5" /> Add Speaker
                  </Button>
                </div>
              </div>

              {lineup.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {lineup.map((m) => (
                    <div key={m.id} className="p-3 rounded-xl border border-stone-200 bg-white flex items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <img src={m.avatar} alt={m.name} className="w-10 h-10 rounded-full object-cover border" />
                        <div>
                          <span className="text-[9px] font-bold uppercase text-purple-600">{m.roleTag}</span>
                          <h4 className="text-xs font-normal text-foreground">{m.name}</h4>
                        </div>
                      </div>
                      <button onClick={() => removeLineupMember(m.id)} className="text-stone-400 hover:text-red-600">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Media: Cover Banner & Gallery Photos */}
            <div className="space-y-4 pt-4 border-t border-stone-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">2. Cover Banner & Gallery Photos</h3>

              {/* Main Cover Banner (Only sample cover photo kept here) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-normal text-foreground">Main Cover Banner Image *</Label>
                  <button
                    type="button"
                    onClick={() => setShowCoverPresets(!showCoverPresets)}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline"
                  >
                    <Sparkles className="w-3 h-3" /> {showCoverPresets ? "Hide Sample Covers" : "Use Sample Cover"}
                  </button>
                </div>

                <div className="flex gap-2">
                  <Input
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    placeholder="Paste banner image URL..."
                    className="rounded-xl text-xs bg-stone-50 flex-1"
                  />
                  <label className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 text-white hover:bg-stone-800 text-xs font-semibold cursor-pointer flex-shrink-0">
                    <Upload className="w-3.5 h-3.5" /> Upload File
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleSingleFileUpload(e, (dataUrl) => setCoverImage(dataUrl))}
                    />
                  </label>
                </div>

                {/* Cover Presets Grid (Hidden by default, shown on click) */}
                {showCoverPresets && (
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-2 animate-in fade-in">
                    {SAMPLE_COVER_IMAGES.map((img) => (
                      <button
                        key={img.label}
                        type="button"
                        onClick={() => {
                          setCoverImage(img.url);
                          toast.success(`Selected ${img.label} cover`);
                        }}
                        className={`relative aspect-video rounded-xl overflow-hidden border-2 text-left transition ${
                          coverImage === img.url ? "border-primary ring-2 ring-primary/20" : "border-stone-200 hover:border-stone-400"
                        }`}
                      >
                        <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 flex items-end p-1">
                          <span className="text-[9px] font-medium text-white truncate">{img.label}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Gallery Photos Adder */}
              <div className="space-y-2 pt-2 border-t border-stone-100">
                <Label className="text-xs font-normal text-foreground">Gallery Carousel Photos (Optional)</Label>

                <div className="flex flex-wrap md:flex-nowrap gap-2">
                  <Input
                    value={galleryInput}
                    onChange={(e) => setGalleryInput(e.target.value)}
                    placeholder="Paste gallery photo URL..."
                    className="rounded-xl text-xs bg-stone-50 flex-1"
                  />
                  <Button onClick={addGalleryImage} type="button" variant="outline" className="rounded-xl text-xs font-semibold gap-1 flex-shrink-0">
                    <Plus className="w-3.5 h-3.5" /> Add URL
                  </Button>
                  <label className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-100 border border-stone-300 text-stone-800 hover:bg-stone-200 text-xs font-semibold cursor-pointer flex-shrink-0">
                    <Upload className="w-3.5 h-3.5" /> Upload from Device
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleGalleryFilesUpload}
                    />
                  </label>
                </div>

                {galleryImages.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-dashed border-stone-200">
                    {galleryImages.map((img, idx) => (
                      <div key={idx} className="relative w-20 h-14 rounded-xl overflow-hidden border border-stone-200 group">
                        <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                        <button
                          onClick={() => removeGalleryImage(idx)}
                          className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Media: Video Embed & Past Editions */}
            <div className="space-y-4 pt-4 border-t border-stone-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">3. Promo Video & Previous Event Editions</h3>

              {/* Promo Video Embed */}
              <div className="space-y-1.5">
                <Label className="text-xs font-normal text-foreground">YouTube Promo Video Embed URL (Optional)</Label>
                <Input
                  value={videoEmbedUrl}
                  onChange={(e) => setVideoEmbedUrl(e.target.value)}
                  placeholder="e.g. https://www.youtube.com/embed/dQw4w9WgXcQ"
                  className="rounded-xl text-xs bg-stone-50"
                />
              </div>

              {/* Previous Editions Adder */}
              <div className="space-y-3 pt-2">
                <Label className="text-xs font-normal text-foreground">Previous Event Editions (Past Memories Showcase)</Label>
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <Input
                      value={editionYear}
                      onChange={(e) => setEditionYear(e.target.value)}
                      placeholder="Edition Year (e.g. 2025 Edition)"
                      className="rounded-xl text-xs bg-white"
                    />
                    <Input
                      value={editionTitle}
                      onChange={(e) => setEditionTitle(e.target.value)}
                      placeholder="Edition Title"
                      className="rounded-xl text-xs bg-white"
                    />
                    <Input
                      value={editionAttendees}
                      onChange={(e) => setEditionAttendees(e.target.value)}
                      placeholder="Attendees Count (e.g. 500+ Attendees)"
                      className="rounded-xl text-xs bg-white"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={editionImage}
                      onChange={(e) => setEditionImage(e.target.value)}
                      placeholder="Photo URL (https://...)"
                      className="rounded-xl text-xs bg-white flex-1"
                    />
                    <label className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-100 text-[11px] font-semibold text-stone-700 cursor-pointer flex-shrink-0">
                      <Upload className="w-3.5 h-3.5 text-stone-500" /> Upload
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleSingleFileUpload(e, (dataUrl) => setEditionImage(dataUrl))}
                      />
                    </label>
                  </div>
                  <Textarea
                    value={editionSummary}
                    onChange={(e) => setEditionSummary(e.target.value)}
                    placeholder="Recap summary of past edition..."
                    rows={2}
                    className="rounded-xl text-xs bg-white resize-none"
                  />
                  <div className="flex justify-end">
                    <Button onClick={addPastEdition} type="button" className="rounded-xl text-xs font-semibold gap-1">
                      <Plus className="w-3.5 h-3.5" /> Add Past Edition
                    </Button>
                  </div>
                </div>

                {pastEditions.map((ed, idx) => (
                  <div key={idx} className="p-3 rounded-xl border border-stone-200 bg-white flex items-center justify-between gap-3 text-xs">
                    <div>
                      <span className="font-bold text-stone-900">{ed.year}</span> — {ed.title}
                    </div>
                    <button onClick={() => removePastEdition(idx)} className="text-stone-400 hover:text-red-600">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-stone-100">
              <Button onClick={handleBack} variant="outline" className="rounded-xl text-xs font-semibold">
                &larr; Back to Step 1
              </Button>
              <Button onClick={handleNext} className="rounded-xl text-xs font-semibold gap-1.5">
                Next: Preview and Publish &rarr;
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3: PREVIEW AND PUBLISH */}
        {activeStep === 3 && (
          <div className="space-y-6">
            <div className="bg-card border border-stone-200/80 rounded-3xl p-6 md:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-stone-100 pb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    Live Preview Mode
                  </span>
                  <h2 className="text-2xl font-normal text-foreground mt-2">{title || "Untitled Event"}</h2>
                  <p className="text-xs text-muted-foreground mt-1">Organized by {organizerName}</p>
                </div>

                <Button variant="outline" onClick={() => setActiveStep(1)} className="rounded-xl text-xs font-semibold">
                  Edit Details
                </Button>
              </div>

              {/* Cover Banner */}
              <div className="relative aspect-[21/9] rounded-2xl overflow-hidden bg-stone-100">
                <img src={coverImage} alt={title} className="w-full h-full object-cover" />
                <span className="absolute bottom-3 left-3 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/90 text-stone-900">
                  {category}
                </span>
                {ticketBadge && (
                  <span className="absolute top-3 left-3 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-red-600 text-white shadow-sm">
                    {ticketBadge}
                  </span>
                )}
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-stone-50 border border-stone-200">
                <div className="flex items-center gap-2 text-xs font-normal">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>{startAt ? new Date(startAt).toLocaleString() : "Date TBD"}</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-normal">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{venue || "Venue TBD"}, {city}</span>
                </div>
              </div>

              {/* Description & Expectations Preview */}
              <div className="border-t border-stone-100 pt-4 space-y-4">
                <h3 className="text-base font-normal text-foreground">Overview</h3>
                <p className="text-xs text-stone-700 leading-relaxed whitespace-pre-line">{description || "No description provided yet."}</p>

                {whatToExpect.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <h4 className="text-xs font-bold text-foreground">What to Expect</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {whatToExpect.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 p-2 rounded-xl bg-stone-50 border text-xs text-stone-800">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {whoShouldAttend.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <h4 className="text-xs font-bold text-foreground">Who Should Attend</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {whoShouldAttend.map((target, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-full bg-stone-100 border text-[11px] font-medium text-stone-800">
                          {target}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Agenda Schedule Preview */}
              {agenda.length > 0 && (
                <div className="border-t border-stone-100 pt-4 space-y-3">
                  <h3 className="text-base font-normal text-foreground">Agenda Schedule ({agenda.length} Sessions)</h3>
                  <div className="space-y-2">
                    {agenda.map((slot, idx) => (
                      <div key={idx} className="p-3 rounded-xl border border-stone-200 bg-stone-50 flex items-start gap-3">
                        <span className="text-[11px] font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">{slot.time}</span>
                        <div>
                          <h4 className="text-xs font-normal text-foreground">{slot.title}</h4>
                          {slot.speakerName && <p className="text-[10px] text-stone-500">Speaker: {slot.speakerName}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Promo Video Preview */}
              {videoEmbedUrl && (
                <div className="border-t border-stone-100 pt-4 space-y-2">
                  <h3 className="text-base font-normal text-foreground">Promo Video Preview</h3>
                  <div className="rounded-2xl overflow-hidden border border-stone-200 aspect-video bg-black max-w-lg">
                    <iframe src={videoEmbedUrl} title="Promo Video" className="w-full h-full border-0" />
                  </div>
                </div>
              )}

              {/* Lineup Preview */}
              {lineup.length > 0 && (
                <div className="border-t border-stone-100 pt-4 space-y-3">
                  <h3 className="text-base font-normal text-foreground">Lineup ({lineup.length} Speakers)</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {lineup.map((m) => (
                      <div key={m.id} className="p-3 rounded-xl border border-stone-200 bg-stone-50 flex items-center gap-3">
                        <img src={m.avatar} alt={m.name} className="w-10 h-10 rounded-full object-cover border" />
                        <div>
                          <span className="text-[9px] font-bold text-purple-600 uppercase">{m.roleTag}</span>
                          <h4 className="text-xs font-normal text-foreground">{m.name}</h4>
                          {m.title && <p className="text-[10px] text-stone-500 truncate">{m.title}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Past Editions Preview */}
              {pastEditions.length > 0 && (
                <div className="border-t border-stone-100 pt-4 space-y-3">
                  <h3 className="text-base font-normal text-foreground">Past Event Editions ({pastEditions.length})</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {pastEditions.map((ed, idx) => (
                      <div key={idx} className="p-3 rounded-xl border border-stone-200 bg-stone-50 flex items-center gap-3">
                        <img src={ed.image} alt={ed.title} className="w-12 h-12 rounded-xl object-cover" />
                        <div>
                          <span className="text-[10px] font-bold text-stone-900">{ed.year}</span>
                          <h4 className="text-xs font-normal text-foreground">{ed.title}</h4>
                          <p className="text-[10px] text-stone-500 line-clamp-1">{ed.summary}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Highlights & Refund Policy */}
              <div className="border-t border-stone-100 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-stone-50 border">
                  <span className="font-bold text-stone-900 block mb-1">Highlights</span>
                  <p className="text-stone-600">Format: {formatHighlight} · Duration: {durationHighlight}</p>
                  <p className="text-stone-600 mt-0.5">{mobileTicket ? "✓ Mobile ticket accepted" : "Paper ticket required"}</p>
                </div>
                <div className="p-3 rounded-xl bg-stone-50 border">
                  <span className="font-bold text-stone-900 block mb-1">Refund Policy</span>
                  <p className="text-stone-600">{refundPolicy}</p>
                </div>
              </div>
            </div>

            {/* Bottom Action Footer */}
            <div className="flex justify-between items-center bg-card p-4 rounded-2xl border border-stone-200">
              <Button variant="outline" onClick={() => setActiveStep(2)} className="rounded-xl text-xs font-semibold">
                &larr; Back to Step 2
              </Button>

              <div className="flex gap-2">
                <Button variant="outline" onClick={handleSaveDraft} className="rounded-xl text-xs font-semibold">
                  Save as Draft
                </Button>
                <Button onClick={handlePublish} className="rounded-xl text-xs font-bold gap-1 px-6 bg-primary text-primary-foreground">
                  <CheckCircle2 className="w-4 h-4" /> {isEditingExisting ? "Confirm & Save Live Updates" : "Confirm & Publish Live"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CreateEventPage;
