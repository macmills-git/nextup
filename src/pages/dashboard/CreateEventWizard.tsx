import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Sparkles, Users, Globe, Lock, Monitor, MapPin, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEventStore, type EventMetadata } from "@/contexts/EventStore";
import { toast } from "sonner";

const SERVICES = [
  { key: "catering", label: "Catering" },
  { key: "stage", label: "Stage setup" },
  { key: "security", label: "Security" },
  { key: "accommodation", label: "Accommodation" },
  { key: "transport", label: "Transportation" },
  { key: "photography", label: "Photography" },
  { key: "mc", label: "MC / Host" },
  { key: "livestream", label: "Livestream" },
  { key: "decor", label: "Decoration" },
];

const EVENT_TYPES = ["Wedding", "Corporate", "Conference", "Concert", "Workshop", "Party", "Festival", "Other"];

const Step = ({ n, label, active, done }: { n: number; label: string; active: boolean; done: boolean }) => (
  <div className="flex items-center gap-3">
    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
      done ? "bg-primary text-primary-foreground" : active ? "bg-foreground text-background" : "bg-muted text-muted-foreground"
    }`}>{done ? <Check className="h-4 w-4" /> : n}</div>
    <span className={`text-sm ${active ? "text-foreground font-medium" : "text-muted-foreground"}`}>{label}</span>
  </div>
);

const CreateEventWizard = () => {
  const navigate = useNavigate();
  const { saveDraft } = useEventStore();
  const [step, setStep] = useState(1);

  // Step 1
  const [title, setTitle] = useState("");
  const [eventType, setEventType] = useState("Corporate");
  const [visibility, setVisibility] = useState<"public" | "private">("private");
  const [modality, setModality] = useState<"physical" | "virtual" | "hybrid">("physical");
  const [theme, setTheme] = useState("");
  const [guests, setGuests] = useState<number | "">("");
  const [goal, setGoal] = useState("");
  const [budgetMin, setBudgetMin] = useState("");
  const [budgetMax, setBudgetMax] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");

  // Step 2
  const [structure, setStructure] = useState<Record<string, boolean>>({ catering: true, photography: true, decor: true });

  // Step 3
  const [planningMode, setPlanningMode] = useState<"diy" | "team" | "hire" | "ai">("diy");

  const canNext1 = title.trim().length > 1;

  const finish = () => {
    const meta: EventMetadata = {
      eventType, visibility, modality, theme, goal, budgetMin, budgetMax,
      structureSelections: structure, planningMode,
    };
    const saved = saveDraft({
      title, date, location, guests: typeof guests === "number" ? guests : 0, metadata: meta,
    });
    toast.success("Event created — entering workspace");
    navigate(`/dashboard/events/${saved.id}/overview`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Create new event</h1>
          <p className="text-sm text-muted-foreground">Guided setup — we'll seed your workspace based on your answers.</p>
        </div>
        <Button variant="ghost" onClick={() => navigate(-1)}><ArrowLeft className="h-4 w-4 mr-1" />Cancel</Button>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6">
        <div className="flex items-center justify-between mb-8">
          <Step n={1} label="Basics" active={step === 1} done={step > 1} />
          <div className="flex-1 h-px bg-border mx-4" />
          <Step n={2} label="Structure" active={step === 2} done={step > 2} />
          <div className="flex-1 h-px bg-border mx-4" />
          <Step n={3} label="Planning mode" active={step === 3} done={false} />
        </div>

        {step === 1 && (
          <div className="space-y-5">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Event name *</label>
              <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Annual Gala 2026" className="mt-1.5" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground">Event type</label>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {EVENT_TYPES.map(t => (
                    <button key={t} onClick={() => setEventType(t)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${eventType === t ? "bg-foreground text-background" : "border border-border text-muted-foreground hover:bg-muted"}`}>{t}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Visibility</label>
                <div className="flex gap-2 mt-1.5">
                  {([["private", Lock], ["public", Globe]] as const).map(([v, Icon]) => (
                    <button key={v} onClick={() => setVisibility(v)}
                      className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${visibility === v ? "bg-foreground text-background" : "border border-border text-muted-foreground hover:bg-muted"}`}>
                      <Icon className="h-3.5 w-3.5" />{v}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Modality</label>
                <div className="flex gap-2 mt-1.5">
                  {(["physical", "virtual", "hybrid"] as const).map(m => (
                    <button key={m} onClick={() => setModality(m)}
                      className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium capitalize transition-all ${modality === m ? "bg-foreground text-background" : "border border-border text-muted-foreground hover:bg-muted"}`}>{m}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Estimated guests</label>
                <Input type="number" value={guests} onChange={e => setGuests(e.target.value ? Number(e.target.value) : "")} placeholder="e.g. 150" className="mt-1.5" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Preferred date</label>
                <Input type="date" value={date} onChange={e => setDate(e.target.value)} className="mt-1.5" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Location</label>
                <Input value={location} onChange={e => setLocation(e.target.value)} placeholder="City or venue" className="mt-1.5" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Theme</label>
                <Input value={theme} onChange={e => setTheme(e.target.value)} placeholder="e.g. Tropical, Black-tie" className="mt-1.5" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Budget range (USD)</label>
                <div className="flex gap-2 mt-1.5">
                  <Input type="number" value={budgetMin} onChange={e => setBudgetMin(e.target.value)} placeholder="Min" />
                  <Input type="number" value={budgetMax} onChange={e => setBudgetMax(e.target.value)} placeholder="Max" />
                </div>
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Event goal</label>
              <Textarea value={goal} onChange={e => setGoal(e.target.value)} placeholder="What does success look like?" className="mt-1.5" rows={2} />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/40 border border-border">
              <Sparkles className="h-4 w-4 text-primary mt-0.5" />
              <div className="text-sm">
                <p className="text-foreground font-medium">We'll auto-seed your workspace</p>
                <p className="text-muted-foreground text-xs mt-1">Selected services dynamically build vendor categories, budget lines, tasks and timeline milestones.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {SERVICES.map(s => {
                const on = !!structure[s.key];
                return (
                  <button key={s.key} onClick={() => setStructure(p => ({ ...p, [s.key]: !on }))}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${on ? "border-primary bg-primary/5" : "border-border hover:border-foreground/30"}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-foreground">{s.label}</span>
                      <div className={`w-4 h-4 rounded-full border-2 ${on ? "border-primary bg-primary" : "border-muted-foreground/40"} flex items-center justify-center`}>
                        {on && <Check className="h-2.5 w-2.5 text-primary-foreground" />}
                      </div>
                    </div>
                    <p className="text-[11px] text-muted-foreground">Add to plan</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">How would you like to run this event?</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { key: "diy", title: "DIY Planning", desc: "Run it yourself with full control.", Icon: Wand2 },
                { key: "team", title: "Team Planning", desc: "Collaborate with internal teammates.", Icon: Users },
                { key: "hire", title: "Hire Professional", desc: "Match with a vetted planner.", Icon: MapPin },
                { key: "ai", title: "AI Assisted", desc: "Let the copilot draft your plan.", Icon: Sparkles },
              ].map(({ key, title, desc, Icon }) => {
                const on = planningMode === key;
                return (
                  <button key={key} onClick={() => setPlanningMode(key as any)}
                    className={`p-5 rounded-xl border-2 text-left transition-all ${on ? "border-primary bg-primary/5" : "border-border hover:border-foreground/30"}`}>
                    <Icon className={`h-5 w-5 mb-3 ${on ? "text-primary" : "text-muted-foreground"}`} />
                    <p className="text-sm font-semibold text-foreground">{title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{desc}</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mt-8 pt-5 border-t border-border">
          <Button variant="ghost" onClick={() => step === 1 ? navigate(-1) : setStep(s => s - 1)}>
            <ArrowLeft className="h-4 w-4 mr-1" />Back
          </Button>
          {step < 3 ? (
            <Button onClick={() => setStep(s => s + 1)} disabled={step === 1 && !canNext1} className="bg-foreground text-background hover:bg-foreground/90">
              Continue<ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          ) : (
            <Button onClick={finish} className="bg-primary text-primary-foreground hover:bg-primary/90">
              Create event<ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateEventWizard;
