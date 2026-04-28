import { useState } from "react";
import { Briefcase, Save, Globe, Phone, Mail, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const VendorBusinessPage = () => {
  const { user } = useAuth();
  const stored = (() => {
    try { return JSON.parse(sessionStorage.getItem("nested_vendor_profile") || "{}"); } catch { return {}; }
  })();

  const [form, setForm] = useState({
    businessName: stored.businessName || user?.name || "",
    tagline: stored.tagline || "",
    category: stored.category || "Photography",
    bio: stored.bio || "",
    email: stored.email || user?.email || "",
    phone: stored.phone || "",
    website: stored.website || "",
    location: stored.location || "",
    services: stored.services || "",
    priceFrom: stored.priceFrom || "",
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    sessionStorage.setItem("nested_vendor_profile", JSON.stringify(form));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-xl font-semibold text-foreground">My business</h1>
        <p className="text-sm text-muted-foreground">Edit your storefront details — these appear to planners browsing the marketplace.</p>
      </div>

      <div className="bg-card border border-border rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Briefcase className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold text-foreground">Business details</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-muted-foreground">Business name</label>
            <input value={form.businessName} onChange={(e) => setForm((p) => ({ ...p, businessName: e.target.value }))}
              className="w-full mt-1 h-10 px-3 rounded-lg border border-border bg-background text-sm outline-none" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Category</label>
            <select value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
              className="w-full mt-1 h-10 px-3 rounded-lg border border-border bg-background text-sm outline-none">
              {["Photography", "Catering", "Decoration", "Audio/Visual", "Venue", "Entertainment", "Florist", "Transport"].map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="text-xs text-muted-foreground">Tagline</label>
            <input value={form.tagline} onChange={(e) => setForm((p) => ({ ...p, tagline: e.target.value }))}
              placeholder="One sentence about your work"
              className="w-full mt-1 h-10 px-3 rounded-lg border border-border bg-background text-sm outline-none" />
          </div>
          <div className="md:col-span-2">
            <label className="text-xs text-muted-foreground">About</label>
            <textarea value={form.bio} onChange={(e) => setForm((p) => ({ ...p, bio: e.target.value }))} rows={4}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-border bg-background text-sm outline-none resize-none" />
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Mail className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold text-foreground">Contact</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-muted-foreground">Email</label>
            <input value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
              className="w-full mt-1 h-10 px-3 rounded-lg border border-border bg-background text-sm outline-none" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Phone</label>
            <input value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
              className="w-full mt-1 h-10 px-3 rounded-lg border border-border bg-background text-sm outline-none" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Website</label>
            <input value={form.website} onChange={(e) => setForm((p) => ({ ...p, website: e.target.value }))}
              className="w-full mt-1 h-10 px-3 rounded-lg border border-border bg-background text-sm outline-none" placeholder="https://" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Service location</label>
            <input value={form.location} onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))}
              className="w-full mt-1 h-10 px-3 rounded-lg border border-border bg-background text-sm outline-none" placeholder="City, region" />
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Tag className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold text-foreground">Services & pricing</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="text-xs text-muted-foreground">Services offered</label>
            <textarea value={form.services} onChange={(e) => setForm((p) => ({ ...p, services: e.target.value }))} rows={3}
              placeholder="e.g. Full-day photo coverage, edited gallery, prints"
              className="w-full mt-1 px-3 py-2 rounded-lg border border-border bg-background text-sm outline-none resize-none" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Starting price (USD)</label>
            <input value={form.priceFrom} onChange={(e) => setForm((p) => ({ ...p, priceFrom: e.target.value.replace(/[^0-9]/g, "") }))}
              className="w-full mt-1 h-10 px-3 rounded-lg border border-border bg-background text-sm outline-none" placeholder="500" />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button onClick={handleSave} className="rounded-lg">
          <Save className="h-4 w-4 mr-1.5" /> Save changes
        </Button>
        {saved && <span className="text-xs text-emerald-600">Saved successfully</span>}
      </div>
    </div>
  );
};

export default VendorBusinessPage;
