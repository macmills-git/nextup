import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Store, Camera, MapPin, DollarSign, Image as ImageIcon, CheckCircle, ArrowRight, ArrowLeft, Sparkles, Plus, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

type Step = 0 | 1 | 2 | 3 | 4;

const categories = [
  "Photography", "Catering", "Audio/Visual", "Decoration", "Floral", "Entertainment",
  "Venue", "Transportation", "Bakery", "Stationery", "Hair & Makeup", "Planning",
];

const VendorOnboardingPage = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(0);
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [businessName, setBusinessName] = useState(user?.name || "");
  const [tagline, setTagline] = useState("");
  const [bio, setBio] = useState("");
  const [category, setCategory] = useState<string>("");
  const [serviceArea, setServiceArea] = useState("");
  const [website, setWebsite] = useState("");
  const [phone, setPhone] = useState("");
  const [services, setServices] = useState<string[]>([]);
  const [newService, setNewService] = useState("");
  const [pricingTier, setPricingTier] = useState<"$" | "$$" | "$$$">("$$");
  const [startingPrice, setStartingPrice] = useState("");
  const [portfolio, setPortfolio] = useState<string[]>([]);
  const [portfolioDraft, setPortfolioDraft] = useState("");
  const [contactEmail, setContactEmail] = useState(user?.email || "");
  const [instagram, setInstagram] = useState("");
  const [responseTime, setResponseTime] = useState("Within 24 hours");
  const [isEditing, setIsEditing] = useState(false);

  const steps = [
    { label: "Business", icon: Store },
    { label: "Category", icon: Sparkles },
    { label: "Services", icon: CheckCircle },
    { label: "Pricing", icon: DollarSign },
    { label: "Portfolio", icon: Camera },
  ];

  const canContinue = () => {
    switch (step) {
      case 0: return businessName.trim().length > 1 && tagline.trim().length > 1;
      case 1: return !!category && serviceArea.trim().length > 1;
      case 2: return services.length > 0;
      case 3: return !!startingPrice;
      case 4: return true;
    }
  };

  const handleAddService = () => {
    const v = newService.trim();
    if (!v) return;
    if (services.includes(v)) return;
    setServices([...services, v]);
    setNewService("");
  };

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("nested_vendor_profile");
      if (!raw) return;
      const parsed = JSON.parse(raw);
      setBusinessName(parsed.businessName || user?.name || "");
      setTagline(parsed.tagline || "");
      setBio(parsed.bio || "");
      setCategory(parsed.category || "");
      setServiceArea(parsed.serviceArea || "");
      setWebsite(parsed.website || "");
      setPhone(parsed.phone || "");
      setServices(Array.isArray(parsed.services) ? parsed.services : []);
      setPricingTier(parsed.pricingTier || "$$");
      setStartingPrice(parsed.startingPrice || "");
      setPortfolio(Array.isArray(parsed.portfolio) ? parsed.portfolio : []);
      setContactEmail(parsed.contactEmail || user?.email || "");
      setInstagram(parsed.instagram || "");
      setResponseTime(parsed.responseTime || "Within 24 hours");
      setIsEditing(true);
    } catch {
      // ignore corrupted local profile
    }
  }, [user?.email, user?.name]);

  const handleAddPortfolioFromUrl = () => {
    const url = portfolioDraft.trim();
    if (!url) return;
    if (portfolio.includes(url)) return;
    setPortfolio([...portfolio, url]);
    setPortfolioDraft("");
  };

  const handleSubmit = () => {
    setSubmitting(true);
    // Persist onboarding completion
    setTimeout(() => {
      updateUser({ vendorOnboarded: true, name: businessName });
      try {
        sessionStorage.setItem("nested_vendor_profile", JSON.stringify({
          businessName, tagline, bio, category, serviceArea, website, phone,
          services, pricingTier, startingPrice, portfolio, contactEmail, instagram, responseTime,
        }));
      } catch {}
      toast({
        title: isEditing ? "Vendor profile updated" : "Vendor profile published 🎉",
        description: isEditing
          ? "Your business details were saved successfully."
          : "Planners can now discover your business.",
      });
      setSubmitting(false);
      navigate("/dashboard");
    }, 800);
  };

  const next = () => setStep((s) => Math.min(4, s + 1) as Step);
  const back = () => setStep((s) => Math.max(0, s - 1) as Step);

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-medium text-primary mb-1.5">Vendor onboarding</p>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
          {isEditing ? "Edit your vendor storefront" : "Let's set up your business"}
        </h1>
        <p className="text-sm text-muted-foreground mt-2">Complete your profile so planners can discover, contact and book you.</p>
      </div>

      {/* Stepper */}
      <div className="bg-card border border-border rounded-2xl p-3 mb-6">
        <div className="flex items-center gap-1 overflow-x-auto">
          {steps.map((s, i) => {
            const active = i === step;
            const done = i < step;
            return (
              <div key={i} className="flex items-center gap-1 flex-shrink-0">
                <button
                  onClick={() => done && setStep(i as Step)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    active ? "bg-foreground text-background" :
                    done ? "text-foreground hover:bg-muted" : "text-muted-foreground"
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                    active ? "bg-background/20 text-background" :
                    done ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}>
                    {done ? <CheckCircle className="w-3 h-3" /> : i + 1}
                  </span>
                  {s.label}
                </button>
                {i < steps.length - 1 && <div className="w-4 h-px bg-border" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step content */}
      <div className="bg-card border border-border rounded-2xl p-6 md:p-8 min-h-[360px]">
        {step === 0 && (
          <div className="space-y-5 animate-fade-in">
            <h2 className="text-lg font-semibold text-foreground">Tell us about your business</h2>
            <Field label="Business name">
              <input value={businessName} onChange={e => setBusinessName(e.target.value)} placeholder="Akolo Studio" maxLength={80}
                className="form-input" />
            </Field>
            <Field label="Tagline" hint="One short sentence describing what you do">
              <input value={tagline} onChange={e => setTagline(e.target.value)} placeholder="Wedding photography that feels like film" maxLength={120}
                className="form-input" />
            </Field>
            <Field label="About" hint="Optional — share your story (max 500 chars)">
              <textarea value={bio} onChange={e => setBio(e.target.value)} rows={4} maxLength={500}
                placeholder="We're a small team of photographers based in Accra..."
                className="form-input resize-none" />
            </Field>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-5 animate-fade-in">
            <h2 className="text-lg font-semibold text-foreground">Pick your category & service area</h2>
            <Field label="Category">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {categories.map(c => (
                  <button key={c} type="button" onClick={() => setCategory(c)}
                    className={`px-3 py-2.5 rounded-lg text-xs font-medium border transition-all ${
                      category === c
                        ? "border-foreground bg-foreground text-background"
                        : "border-border bg-card text-foreground hover:border-foreground/40"
                    }`}>
                    {c}
                  </button>
                ))}
              </div>
            </Field>
            <Field label="Service area" hint="City, region, or 'Worldwide'">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input value={serviceArea} onChange={e => setServiceArea(e.target.value)} placeholder="Accra, Greater Accra Region" maxLength={100}
                  className="form-input pl-10" />
              </div>
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Website (optional)">
                <input value={website} onChange={e => setWebsite(e.target.value)} placeholder="https://yourbiz.com" maxLength={200} className="form-input" />
              </Field>
              <Field label="Phone (optional)">
                <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+233 ..." maxLength={30} className="form-input" />
              </Field>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5 animate-fade-in">
            <h2 className="text-lg font-semibold text-foreground">List the services you offer</h2>
            <p className="text-sm text-muted-foreground">Add anything from "Full-day wedding coverage" to "Same-day edits". Planners filter by these.</p>
            <div className="flex gap-2">
              <input
                value={newService}
                onChange={e => setNewService(e.target.value)}
                onKeyDown={e => e.key === "Enter" && (e.preventDefault(), handleAddService())}
                placeholder="e.g. Full-day wedding coverage"
                maxLength={80}
                className="form-input flex-1"
              />
              <Button type="button" onClick={handleAddService} className="rounded-lg">
                <Plus className="w-4 h-4 mr-1" /> Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {services.length === 0 && (
                <p className="text-xs text-muted-foreground italic">No services yet — add at least one to continue.</p>
              )}
              {services.map((s, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary text-foreground text-xs font-medium">
                  {s}
                  <button onClick={() => setServices(services.filter((_, j) => j !== i))} className="text-muted-foreground hover:text-destructive">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5 animate-fade-in">
            <h2 className="text-lg font-semibold text-foreground">Set your pricing</h2>
            <Field label="Pricing tier" hint="How do you position vs. competitors?">
              <div className="grid grid-cols-3 gap-2">
                {(["$", "$$", "$$$"] as const).map(t => (
                  <button key={t} type="button" onClick={() => setPricingTier(t)}
                    className={`px-3 py-3 rounded-lg text-sm font-semibold border transition-all ${
                      pricingTier === t
                        ? "border-foreground bg-foreground text-background"
                        : "border-border bg-card text-foreground hover:border-foreground/40"
                    }`}>
                    {t} <span className="block text-[10px] font-normal opacity-70 mt-0.5">
                      {t === "$" ? "Affordable" : t === "$$" ? "Mid-range" : "Premium"}
                    </span>
                  </button>
                ))}
              </div>
            </Field>
            <Field label="Starting price" hint="What's the lowest package you'd offer?">
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input value={startingPrice} onChange={e => setStartingPrice(e.target.value.replace(/[^0-9.]/g, ""))} placeholder="500" maxLength={12}
                  className="form-input pl-10" />
              </div>
            </Field>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-5 animate-fade-in">
            <h2 className="text-lg font-semibold text-foreground">Portfolio, contact and visibility</h2>
            <p className="text-sm text-muted-foreground">Show off your best work and set how organisers can reach you.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Contact email">
                <input value={contactEmail} onChange={e => setContactEmail(e.target.value)} placeholder="bookings@akolo.studio" className="form-input" />
              </Field>
              <Field label="Response time">
                <select value={responseTime} onChange={e => setResponseTime(e.target.value)} className="form-input">
                  <option>Within 1 hour</option>
                  <option>Within 24 hours</option>
                  <option>Within 48 hours</option>
                </select>
              </Field>
            </div>
            <Field label="Instagram / social profile (optional)">
              <input value={instagram} onChange={e => setInstagram(e.target.value)} placeholder="@yourbrand or https://instagram.com/yourbrand" className="form-input" />
            </Field>
            <div className="flex gap-2">
              <input
                value={portfolioDraft}
                onChange={e => setPortfolioDraft(e.target.value)}
                onKeyDown={e => e.key === "Enter" && (e.preventDefault(), handleAddPortfolioFromUrl())}
                placeholder="Paste portfolio image URL"
                className="form-input flex-1"
              />
              <Button type="button" onClick={handleAddPortfolioFromUrl} className="rounded-lg">
                <Plus className="w-4 h-4 mr-1" /> Add
              </Button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {portfolio.map((src, i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-border bg-secondary group">
                  <img src={src} alt="" className="w-full h-full object-cover" />
                  <button onClick={() => setPortfolio(portfolio.filter((_, j) => j !== i))}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 backdrop-blur text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              <button onClick={() => setPortfolioDraft("https://images.unsplash.com/photo-1511578314322-379afb476865?w=900&h=900&fit=crop")}
                className="aspect-square rounded-xl border-2 border-dashed border-border hover:border-foreground/40 hover:bg-muted transition-colors flex flex-col items-center justify-center gap-2 text-muted-foreground">
                <ImageIcon className="w-5 h-5" />
                <span className="text-xs font-medium">Try sample URL</span>
              </button>
            </div>
            <p className="text-xs text-muted-foreground italic">Tip: 6–10 high-quality images convert best.</p>
          </div>
        )}
      </div>

      {/* Nav buttons */}
      <div className="flex items-center justify-between mt-6">
        <Button variant="ghost" onClick={back} disabled={step === 0} className="rounded-lg">
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back
        </Button>
        <span className="text-xs text-muted-foreground">Step {step + 1} of {steps.length}</span>
        {step < 4 ? (
          <Button onClick={next} disabled={!canContinue()} className="rounded-lg">
            Continue <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        ) : (
          <Button onClick={handleSubmit} disabled={submitting} className="rounded-lg bg-primary text-primary-foreground hover:brightness-110">
            {submitting ? <><Loader2 className="w-4 h-4 mr-1.5 animate-spin" /> Saving...</> : isEditing ? "Save profile changes" : "Publish profile"}
          </Button>
        )}
      </div>

      <style>{`
        .form-input {
          width: 100%;
          height: 40px;
          padding: 0 12px;
          background: hsl(var(--card));
          border: 1px solid hsl(var(--border));
          border-radius: 8px;
          font-size: 14px;
          color: hsl(var(--foreground));
          outline: none;
          transition: box-shadow 0.2s, border-color 0.2s;
        }
        .form-input:focus { box-shadow: 0 0 0 3px hsl(var(--primary) / 0.15); border-color: hsl(var(--primary) / 0.5); }
        textarea.form-input { height: auto; padding-top: 10px; padding-bottom: 10px; }
      `}</style>
    </div>
  );
};

const Field = ({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) => (
  <div>
    <label className="text-xs font-medium text-foreground">{label}</label>
    {hint && <p className="text-[11px] text-muted-foreground mt-0.5 mb-1.5">{hint}</p>}
    <div className="mt-1.5">{children}</div>
  </div>
);

export default VendorOnboardingPage;
