import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, Plus, Calendar, MapPin, Image as ImageIcon, Upload, Ticket as TicketIcon, DollarSign, Heart, Check, Smartphone, Monitor, Share2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Step = 1 | 2 | 3;
type TicketType = "paid" | "free" | "donation";

interface TicketTier {
  id: number;
  type: TicketType;
  name: string;
  price: string;
  quantity: string;
}

const PublishEventPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);
  const [showPreview, setShowPreview] = useState(false);
  const [previewMode, setPreviewMode] = useState<"mobile" | "desktop">("mobile");
  const [completed, setCompleted] = useState(false);

  const [event, setEvent] = useState({
    title: "Event Title",
    summary: "A short and sweet sentence about your event.",
    category: "Conference",
    date: "",
    startTime: "10:00",
    endTime: "12:00",
    location: "",
    city: "",
    coverImage: "",
    overview: "",
    highlights: [] as string[],
    faqs: [] as { q: string; a: string }[],
    organizer: "Your organisation",
  });

  const [tickets, setTickets] = useState<TicketTier[]>([]);
  const [showTicketModal, setShowTicketModal] = useState<TicketType | null>(null);
  const [draftTicket, setDraftTicket] = useState<TicketTier>({ id: 0, type: "paid", name: "", price: "", quantity: "" });

  const stepValid: Record<Step, boolean> = {
    1: !!event.title.trim() && !!event.date && !!event.location.trim(),
    2: tickets.length > 0,
    3: true,
  };

  const goNext = () => {
    if (step === 1 && stepValid[1]) setStep(2);
    else if (step === 2 && stepValid[2]) setStep(3);
  };

  const handlePublish = () => {
    try {
      const existing = JSON.parse(sessionStorage.getItem("nested_published_events") || "[]");
      existing.unshift({
        id: Date.now(),
        title: event.title,
        category: event.category,
        date: event.date,
        time: event.startTime,
        location: event.location,
        city: event.city,
        guests: 0,
        details: event.overview,
        coverImage: event.coverImage,
        tickets,
      });
      sessionStorage.setItem("nested_published_events", JSON.stringify(existing));
      setCompleted(true);
    } catch {}
  };

  const stepLabels = [
    { id: 1, label: "Build event page", desc: "Add all your event details" },
    { id: 2, label: "Add tickets", desc: "Set ticket types and pricing" },
    { id: 3, label: "Publish", desc: "Go live and share" },
  ];

  if (completed) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto animate-scale-in">
          <Check className="h-10 w-10" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Your event is live</h2>
          <p className="text-muted-foreground mt-2">{event.title} has been published. Vendors and attendees can now find it.</p>
        </div>
        <div className="flex justify-center gap-3">
          <Button variant="outline" onClick={() => navigate("/dashboard/events")} className="rounded-lg">Back to projects</Button>
          <Button onClick={() => { setCompleted(false); setStep(1); setTickets([]); }} className="rounded-lg">
            <Plus className="h-4 w-4 mr-1.5" /> Publish another
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
      {/* Left rail */}
      <div className="space-y-4">
        <button onClick={() => navigate("/dashboard/events")} className="flex items-center gap-1.5 text-sm text-primary hover:underline">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to projects
        </button>

        <div className="bg-card border border-border rounded-xl p-5">
          <div className="h-16 -mx-5 -mt-5 mb-4 rounded-t-xl bg-gradient-to-br from-primary/40 to-primary/10" />
          <h2 className="font-bold text-foreground text-lg leading-tight">{event.title}</h2>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-2">
            <Calendar className="h-3.5 w-3.5" />
            {event.date ? new Date(event.date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }) : "Date TBD"} · {event.startTime}
          </div>
          <span className="inline-flex mt-3 text-[11px] px-2.5 py-1 rounded-full border border-border text-muted-foreground">Draft</span>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium px-1 mb-2">Steps</p>
          <div className="space-y-1">
            {stepLabels.map((s) => {
              const active = step === s.id;
              const done = step > s.id;
              return (
                <button key={s.id} onClick={() => (s.id <= step || stepValid[s.id as Step]) && setStep(s.id as Step)}
                  className={cn(
                    "w-full text-left flex gap-3 p-3 rounded-xl border transition-all",
                    active ? "bg-primary/5 border-primary/30" : "border-transparent hover:bg-muted"
                  )}>
                  <div className={cn(
                    "w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center text-[10px] font-bold",
                    done ? "bg-primary border-primary text-primary-foreground" : active ? "border-primary" : "border-border"
                  )}>
                    {done ? <Check className="h-3 w-3" /> : active ? <span className="w-1.5 h-1.5 bg-primary rounded-full" /> : null}
                  </div>
                  <div className="min-w-0">
                    <p className={cn("text-sm font-semibold", active ? "text-foreground" : done ? "text-foreground" : "text-muted-foreground")}>
                      {s.label}
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{s.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right content */}
      <div className="min-w-0 space-y-6 relative">
        <div className="flex items-center justify-end">
          <Button variant="outline" size="sm" className="rounded-full" onClick={() => setShowPreview(true)}>
            <Eye className="h-3.5 w-3.5 mr-1.5" /> Preview
          </Button>
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <div className="space-y-5">
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="relative h-56 bg-gradient-to-br from-muted to-muted/40 flex items-center justify-center">
                {event.coverImage ? (
                  <img src={event.coverImage} alt="cover" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center">
                    <div className="w-14 h-14 rounded-full bg-card border border-border flex items-center justify-center mx-auto mb-2 shadow">
                      <Upload className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-sm font-medium text-primary">Upload photos and video</p>
                  </div>
                )}
                <input value={event.coverImage} onChange={(e) => setEvent((p) => ({ ...p, coverImage: e.target.value }))}
                  placeholder="Paste image URL..."
                  className="absolute bottom-3 left-3 right-3 h-9 px-3 rounded-lg bg-card/90 backdrop-blur border border-border text-xs outline-none" />
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-5 space-y-2">
              <input value={event.title} onChange={(e) => setEvent((p) => ({ ...p, title: e.target.value }))}
                className="w-full text-2xl font-bold text-foreground bg-transparent outline-none" placeholder="Event Title" />
              <input value={event.summary} onChange={(e) => setEvent((p) => ({ ...p, summary: e.target.value }))}
                className="w-full text-sm text-muted-foreground bg-transparent outline-none"
                placeholder="A short and sweet sentence about your event." />
            </div>

            <div className="bg-card border border-border rounded-2xl p-5 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2"><Calendar className="h-4 w-4 text-primary" /> Date and time</h3>
                <div className="space-y-2">
                  <input type="date" value={event.date} onChange={(e) => setEvent((p) => ({ ...p, date: e.target.value }))}
                    className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm outline-none" />
                  <div className="grid grid-cols-2 gap-2">
                    <input type="time" value={event.startTime} onChange={(e) => setEvent((p) => ({ ...p, startTime: e.target.value }))}
                      className="h-10 px-3 rounded-lg border border-border bg-background text-sm outline-none" />
                    <input type="time" value={event.endTime} onChange={(e) => setEvent((p) => ({ ...p, endTime: e.target.value }))}
                      className="h-10 px-3 rounded-lg border border-border bg-background text-sm outline-none" />
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> Location</h3>
                <input value={event.location} onChange={(e) => setEvent((p) => ({ ...p, location: e.target.value }))}
                  placeholder="Enter venue / address"
                  className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm outline-none mb-2" />
                <input value={event.city} onChange={(e) => setEvent((p) => ({ ...p, city: e.target.value }))}
                  placeholder="City"
                  className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm outline-none" />
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-semibold text-foreground mb-3">Overview</h3>
              <textarea value={event.overview} onChange={(e) => setEvent((p) => ({ ...p, overview: e.target.value }))}
                rows={5} placeholder="Use this section to provide more details about your event. Include things to know, venue information, accessibility options — anything to help people know what to expect."
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm outline-none resize-none" />
            </div>

            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-semibold text-foreground mb-3">Good to know</h3>
              <p className="text-xs text-muted-foreground mb-3">Add highlights to help attendees know what to expect</p>
              <div className="flex flex-wrap gap-2">
                {["Add Age info", "Add Door Time", "Add Parking info", "Add Dress code"].map((h) => (
                  <button key={h} onClick={() => setEvent((p) => ({ ...p, highlights: [...p.highlights, h.replace("Add ", "")] }))}
                    className="px-3 py-1.5 rounded-full border border-border text-xs text-muted-foreground hover:bg-muted flex items-center gap-1">
                    <Plus className="h-3 w-3" /> {h}
                  </button>
                ))}
              </div>
              {event.highlights.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {event.highlights.map((h, i) => (
                    <span key={i} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">{h}</span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <Button onClick={goNext} disabled={!stepValid[1]} className="rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50">
                Save and continue
              </Button>
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="space-y-5">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Create tickets</h1>
              <p className="text-sm text-muted-foreground mt-1">Choose a ticket type or build a section with multiple ticket types.</p>
            </div>

            {([
              { type: "paid", icon: TicketIcon, color: "bg-blue-500/10 text-blue-600", title: "Paid", desc: "Create a ticket that people have to pay for." },
              { type: "free", icon: DollarSign, color: "bg-purple-500/10 text-purple-600", title: "Free", desc: "Create a ticket that no one has to pay for." },
              { type: "donation", icon: Heart, color: "bg-red-500/10 text-red-600", title: "Donation", desc: "Let people pay any amount for their ticket." },
            ] as const).map((opt) => (
              <button key={opt.type}
                onClick={() => { setDraftTicket({ id: Date.now(), type: opt.type, name: "", price: opt.type === "paid" ? "" : "0", quantity: "100" }); setShowTicketModal(opt.type); }}
                className="w-full bg-card border border-border rounded-2xl p-5 hover:border-primary/40 hover:shadow-elevated transition-all text-left flex items-center gap-4 group">
                <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center", opt.color)}>
                  <opt.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{opt.title}</h3>
                  <p className="text-sm text-muted-foreground">{opt.desc}</p>
                </div>
                <Plus className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </button>
            ))}

            {tickets.length > 0 && (
              <div className="bg-card border border-border rounded-2xl p-5">
                <h3 className="font-semibold text-foreground mb-3">Your tickets</h3>
                <div className="space-y-2">
                  {tickets.map((t) => (
                    <div key={t.id} className="flex items-center justify-between border border-border rounded-lg p-3">
                      <div>
                        <p className="text-sm font-medium text-foreground">{t.name}</p>
                        <p className="text-xs text-muted-foreground capitalize">{t.type} · {t.quantity} available</p>
                      </div>
                      <p className="text-sm font-semibold text-foreground">{t.type === "free" ? "Free" : t.type === "donation" ? "Any amount" : `$${t.price}`}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)} className="rounded-lg">Back</Button>
              <Button onClick={goNext} disabled={!stepValid[2]} className="rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50">
                Continue to publish
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Ready to publish?</h1>
              <p className="text-sm text-muted-foreground mt-1">Review the summary then make your event public.</p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-semibold text-foreground mb-4">Summary</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                {[
                  ["Event title", event.title],
                  ["Category", event.category],
                  ["Date", event.date || "—"],
                  ["Time", `${event.startTime} – ${event.endTime}`],
                  ["Venue", event.location || "—"],
                  ["City", event.city || "—"],
                  ["Tickets", `${tickets.length} type${tickets.length === 1 ? "" : "s"}`],
                ].map(([k, v]) => (
                  <div key={k}>
                    <p className="text-xs text-muted-foreground">{k}</p>
                    <p className="text-foreground font-medium mt-0.5">{v}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-foreground rounded-2xl p-6 text-background">
              <div className="flex items-center gap-3 mb-3">
                <Sparkles className="h-5 w-5" />
                <h3 className="font-semibold">Boost reach with marketing</h3>
              </div>
              <p className="text-sm opacity-80 mb-4">Once published, send announcement emails from the Marketing tab to invite your audience.</p>
              <Button variant="secondary" size="sm" className="rounded-lg" onClick={() => navigate("/dashboard/marketing")}>
                <Share2 className="h-3.5 w-3.5 mr-1.5" /> Plan campaign
              </Button>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(2)} className="rounded-lg">Back</Button>
              <Button onClick={handlePublish} className="rounded-lg bg-primary text-primary-foreground hover:bg-primary/90">
                Publish event
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Ticket modal */}
      {showTicketModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setShowTicketModal(null)}>
          <div className="bg-card rounded-2xl border border-border w-full max-w-md p-6 animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-bold text-foreground text-lg capitalize mb-4">New {showTicketModal} ticket</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-muted-foreground">Ticket name</label>
                <input value={draftTicket.name} onChange={(e) => setDraftTicket((p) => ({ ...p, name: e.target.value }))}
                  placeholder="General Admission"
                  className="w-full mt-1 h-10 px-3 rounded-lg border border-border bg-background text-sm outline-none" />
              </div>
              {showTicketModal === "paid" && (
                <div>
                  <label className="text-xs text-muted-foreground">Price (USD)</label>
                  <input value={draftTicket.price} onChange={(e) => setDraftTicket((p) => ({ ...p, price: e.target.value.replace(/[^0-9.]/g, "") }))}
                    placeholder="50"
                    className="w-full mt-1 h-10 px-3 rounded-lg border border-border bg-background text-sm outline-none" />
                </div>
              )}
              <div>
                <label className="text-xs text-muted-foreground">Quantity available</label>
                <input value={draftTicket.quantity} onChange={(e) => setDraftTicket((p) => ({ ...p, quantity: e.target.value.replace(/[^0-9]/g, "") }))}
                  className="w-full mt-1 h-10 px-3 rounded-lg border border-border bg-background text-sm outline-none" />
              </div>
            </div>
            <div className="flex gap-2 justify-end mt-5">
              <Button variant="ghost" onClick={() => setShowTicketModal(null)} className="rounded-lg">Cancel</Button>
              <Button onClick={() => { if (draftTicket.name.trim()) { setTickets((p) => [...p, draftTicket]); setShowTicketModal(null); } }} className="rounded-lg">
                Add ticket
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Preview modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={() => setShowPreview(false)}>
          <div className="bg-card rounded-2xl border border-border w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-3 border-b border-border">
              <p className="font-semibold text-foreground">Preview</p>
              <div className="flex items-center gap-2">
                <button onClick={() => setPreviewMode("mobile")} className={cn("p-2 rounded-md", previewMode === "mobile" ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted")}>
                  <Smartphone className="h-4 w-4" />
                </button>
                <button onClick={() => setPreviewMode("desktop")} className={cn("p-2 rounded-md", previewMode === "desktop" ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted")}>
                  <Monitor className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-6 bg-muted/30 flex justify-center">
              <div className={cn("bg-background rounded-xl border border-border overflow-hidden shadow-elevated", previewMode === "mobile" ? "w-[360px]" : "w-full max-w-2xl")}>
                <div className="h-48 bg-gradient-to-br from-primary/30 to-primary/5">
                  {event.coverImage && <img src={event.coverImage} alt="" className="w-full h-full object-cover" />}
                </div>
                <div className="p-5">
                  <h2 className="text-xl font-bold text-foreground">{event.title}</h2>
                  <p className="text-sm text-muted-foreground mt-2">{event.summary}</p>
                  <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                    <p className="flex items-center gap-2"><Calendar className="h-3.5 w-3.5" />{event.date} · {event.startTime}–{event.endTime}</p>
                    <p className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" />{event.location || "Venue TBD"}</p>
                  </div>
                  {event.overview && <p className="text-sm text-foreground mt-4">{event.overview}</p>}
                  {tickets.length > 0 && (
                    <div className="mt-5 pt-4 border-t border-border">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Tickets</p>
                      {tickets.map((t) => (
                        <div key={t.id} className="flex justify-between text-sm py-1">
                          <span className="text-foreground">{t.name}</span>
                          <span className="font-semibold text-foreground">{t.type === "free" ? "Free" : t.type === "donation" ? "Any" : `$${t.price}`}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <Button className="w-full rounded-lg mt-4 bg-primary text-primary-foreground">Get tickets</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PublishEventPage;
