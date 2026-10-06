import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useEventStore, VendorCategory } from "@/contexts/EventStore";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft, CheckCircle2, Plus, Trash2, Store, Upload } from "lucide-react";
import { toast } from "sonner";

const vendorCategoriesList: VendorCategory[] = [
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

export const CreateVendorPage = () => {
  const navigate = useNavigate();
  const { vendors, saveVendorProfile } = useEventStore();
  const { user } = useAuth();

  const existingVendor = useMemo(() => {
    return vendors.find((v) => v.ownerId === user?.id || v.ownerId === "current-user");
  }, [vendors, user]);

  const [isExisting, setIsExisting] = useState(false);

  const [name, setName] = useState("");
  const [logo, setLogo] = useState(
    "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&auto=format&fit=crop&q=80"
  );
  const [description, setDescription] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<VendorCategory[]>(["Sound"]);
  const [location, setLocation] = useState("East Legon");
  const [city, setCity] = useState("Accra");
  const [serviceArea, setServiceArea] = useState("Greater Accra Region");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState(user?.email || "");
  const [instagram, setInstagram] = useState("");

  const [services, setServices] = useState<{ title: string; priceRange: string; description: string }[]>([
    { title: "Standard Package", priceRange: "GHS 1,500", description: "Complete service package for small events." },
  ]);

  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [portfolio, setPortfolio] = useState<string[]>([
    "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80",
  ]);

  useEffect(() => {
    if (existingVendor) {
      setIsExisting(true);
      setName(existingVendor.name || "");
      setLogo(existingVendor.logo || "");
      setDescription(existingVendor.description || "");
      setSelectedCategories(existingVendor.categories || ["Sound"]);
      setLocation(existingVendor.location || "East Legon");
      setCity(existingVendor.city || "Accra");
      setServiceArea(existingVendor.serviceArea || "Greater Accra Region");
      setPhone(existingVendor.contact?.phone || "");
      setWhatsapp(existingVendor.contact?.whatsapp || "");
      setEmail(existingVendor.contact?.email || user?.email || "");
      setInstagram(existingVendor.contact?.instagram || "");
      setServices(existingVendor.services || []);
      setPortfolio(existingVendor.portfolio || []);
    }
  }, [existingVendor, user]);

  const handleFileUpload = (
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

  const toggleCategory = (cat: VendorCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleAddService = () => {
    setServices((prev) => [...prev, { title: "New Service Package", priceRange: "", description: "" }]);
  };

  const handleRemoveService = (index: number) => {
    setServices((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddPortfolioImage = () => {
    if (portfolioUrl.trim()) {
      setPortfolio((prev) => [...prev, portfolioUrl.trim()]);
      setPortfolioUrl("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please enter your business or display name");
      return;
    }
    if (!description.trim()) {
      toast.error("Please enter a description of your services");
      return;
    }
    if (selectedCategories.length === 0) {
      toast.error("Please select at least one service category");
      return;
    }

    const vendor = saveVendorProfile({
      id: existingVendor?.id,
      ownerId: user?.id || "current-user",
      name,
      logo: logo || "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&auto=format&fit=crop&q=80",
      description,
      categories: selectedCategories,
      services,
      location,
      city,
      serviceArea,
      contact: {
        phone,
        whatsapp,
        email,
        instagram,
      },
      portfolio,
      status: "published",
    });

    toast.success(isExisting ? "Vendor profile updated successfully!" : "Vendor profile published to directory!");
    navigate(`/vendors/${vendor.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-8 pb-20 container mx-auto px-4 lg:px-8 max-w-3xl">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-primary px-3 py-1 rounded-full bg-primary/10">
            {isExisting ? "Update Storefront Listing" : "Vendor Directory Listing"}
          </span>
          <h1 className="text-3xl font-normal text-foreground mt-2">
            {isExisting ? "Update Vendor Profile" : "Create Vendor / Service Profile"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {isExisting
              ? "Update your services, pricing packages, contact details, and portfolio photos."
              : "Get discovered by event organizers looking for DJs, MCs, sound equipment, catering, and decor."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card border border-stone-200/80 rounded-3xl p-6 md:p-8 space-y-6">
          {/* Business Info */}
          <div className="space-y-4">
            <h2 className="text-base font-normal text-foreground border-b border-stone-100 pb-2 flex items-center gap-2">
              <Store className="w-4 h-4 text-primary" /> 1. Business Profile
            </h2>

            <div className="space-y-1.5">
              <Label className="text-xs font-normal text-foreground">Business / Display Name *</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. SoundWave Audio Systems or Savory Delights Catering"
                className="rounded-xl text-xs md:text-sm bg-stone-50"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-normal text-foreground">Service Description & Bio *</Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your equipment, experience, specialization, and why organizers should choose you..."
                rows={4}
                className="rounded-xl text-xs md:text-sm bg-stone-50 resize-none"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-normal text-foreground">Logo / Profile Image URL</Label>
              <div className="flex gap-2">
                <Input
                  value={logo}
                  onChange={(e) => setLogo(e.target.value)}
                  placeholder="https://..."
                  className="rounded-xl text-xs bg-stone-50 flex-1"
                />
                <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-300 bg-stone-50 hover:bg-stone-100 text-[11px] font-semibold text-stone-700 cursor-pointer flex-shrink-0">
                  <Upload className="w-3.5 h-3.5 text-stone-500" /> Upload
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, (dataUrl) => setLogo(dataUrl))}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-3 pt-4 border-t border-stone-100">
            <h2 className="text-base font-normal text-foreground border-b border-stone-100 pb-2">
              2. Service Categories *
            </h2>
            <div className="flex flex-wrap gap-2">
              {vendorCategoriesList.map((cat) => {
                const selected = selectedCategories.includes(cat);
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => toggleCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
                      selected
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Location */}
          <div className="space-y-4 pt-4 border-t border-stone-100">
            <h2 className="text-base font-normal text-foreground border-b border-stone-100 pb-2">
              3. Location & Service Area
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-normal text-foreground">Town / Neighborhood</Label>
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. East Legon"
                  className="rounded-xl text-xs bg-stone-50"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-normal text-foreground">City</Label>
                <Input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Accra"
                  className="rounded-xl text-xs bg-stone-50"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-normal text-foreground">Service Coverage Area</Label>
                <Input
                  value={serviceArea}
                  onChange={(e) => setServiceArea(e.target.value)}
                  placeholder="e.g. Greater Accra Region"
                  className="rounded-xl text-xs bg-stone-50"
                />
              </div>
            </div>
          </div>

          {/* Services & Packages */}
          <div className="space-y-4 pt-4 border-t border-stone-100">
            <div className="flex items-center justify-between border-b border-stone-100 pb-2">
              <h2 className="text-base font-normal text-foreground">4. Services & Pricing Packages</h2>
              <Button type="button" variant="outline" size="sm" onClick={handleAddService} className="rounded-xl text-xs gap-1 font-semibold">
                <Plus className="w-3.5 h-3.5" /> Add Package
              </Button>
            </div>

            <div className="space-y-3">
              {services.map((srv, idx) => (
                <div key={idx} className="p-4 rounded-2xl border border-stone-200 bg-stone-50/60 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-stone-600">Package #{idx + 1}</span>
                    {services.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveService(idx)}
                        className="text-stone-400 hover:text-red-600"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Input
                      value={srv.title}
                      onChange={(e) => {
                        const copy = [...services];
                        copy[idx].title = e.target.value;
                        setServices(copy);
                      }}
                      placeholder="Package Title (e.g. Full Day Wedding DJ)"
                      className="rounded-xl text-xs bg-white"
                    />
                    <Input
                      value={srv.priceRange}
                      onChange={(e) => {
                        const copy = [...services];
                        copy[idx].priceRange = e.target.value;
                        setServices(copy);
                      }}
                      placeholder="Price Range (e.g. GHS 2,500)"
                      className="rounded-xl text-xs bg-white"
                    />
                  </div>

                  <Textarea
                    value={srv.description}
                    onChange={(e) => {
                      const copy = [...services];
                      copy[idx].description = e.target.value;
                      setServices(copy);
                    }}
                    placeholder="What's included in this package (equipment, hours, team size)..."
                    rows={2}
                    className="rounded-xl text-xs bg-white resize-none"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-4 pt-4 border-t border-stone-100">
            <h2 className="text-base font-normal text-foreground border-b border-stone-100 pb-2">
              5. Contact & Booking Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-foreground">Phone Number</Label>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+233 20 000 0000"
                  className="rounded-xl text-xs bg-stone-50"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-foreground">WhatsApp Number</Label>
                <Input
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="+233 20 000 0000"
                  className="rounded-xl text-xs bg-stone-50"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-foreground">Public Email</Label>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contact@business.com"
                  className="rounded-xl text-xs bg-stone-50"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-foreground">Instagram / Handle</Label>
                <Input
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  placeholder="@business_handle"
                  className="rounded-xl text-xs bg-stone-50"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4 border-t border-stone-100 flex justify-end">
            <Button type="submit" size="lg" className="rounded-xl text-xs font-bold gap-2 px-6 bg-primary text-primary-foreground">
              <CheckCircle2 className="w-4 h-4" /> {isExisting ? "Save Vendor Profile Updates" : "Publish Vendor Profile"}
            </Button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default CreateVendorPage;
