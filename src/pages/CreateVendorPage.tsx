import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  useEventStore,
  VendorCategory,
  VendorCertificate,
  VendorPricingPackage,
  VendorDetailedService,
  VendorMediaFile,
  VendorFAQ,
} from "@/contexts/EventStore";
import { useAuth } from "@/contexts/AuthContext";
import {
  ArrowLeft,
  CheckCircle2,
  Plus,
  Trash2,
  Store,
  Upload,
  ShieldCheck,
  Package,
  Layers,
  Video,
  HelpCircle,
  FileText,
  Phone,
  Mail,
  Globe,
  Instagram,
  Linkedin,
  MessageCircle,
} from "lucide-react";
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

  // 1. Basic Info
  const [name, setName] = useState("");
  const [logo, setLogo] = useState(
    "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&auto=format&fit=crop&q=80"
  );
  const [description, setDescription] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<VendorCategory[]>(["Sound"]);
  const [location, setLocation] = useState("East Legon");
  const [city, setCity] = useState("Accra");
  const [serviceArea, setServiceArea] = useState("Greater Accra Region");
  
  // Track Record & Experience
  const [experienceYears, setExperienceYears] = useState<number>(5);
  const [teamSize, setTeamSize] = useState("10 Technicians & Staff");
  const [completedEventsCount, setCompletedEventsCount] = useState<number>(120);

  // 2. Contact Info & Social Profiles
  const [phone, setPhone] = useState("+233 24 123 4567");
  const [whatsapp, setWhatsapp] = useState("+233 24 123 4567");
  const [email, setEmail] = useState(user?.email || "vendor@example.com");
  const [instagram, setInstagram] = useState("@soundwave_gh");
  const [website, setWebsite] = useState("https://soundwave.gh");
  const [linkedin, setLinkedin] = useState("https://linkedin.com/company/soundwave-audio");

  // 3. Verification & Business Certs
  const [businessRegistrationNumber, setBusinessRegistrationNumber] = useState("CS-984210026");
  const [taxIdNumber, setTaxIdNumber] = useState("C001294819X");

  // 4. Operating Info
  const [businessHours, setBusinessHours] = useState("Mon – Sat: 8:00 AM – 9:00 PM");
  const [paymentTerms, setPaymentTerms] = useState("50% deposit upon booking confirmation. Balance due 24h prior to event.");

  // 5. Detailed Services
  const [services, setServices] = useState<VendorDetailedService[]>([
    {
      title: "Standard Package",
      priceRange: "GHS 1,500",
      description: "Complete service package for small events.",
      setupIncluded: true,
      turnaroundTime: "2 Hours Setup",
      equipmentIncluded: ["Main PA Speakers", "Wireless Mics"],
    },
  ]);

  // 6. Pricing Packages
  const [pricingPackages, setPricingPackages] = useState<VendorPricingPackage[]>([
    {
      name: "Bronze Package",
      price: "GHS 1,500",
      billingCycle: "Per Day",
      popular: false,
      description: "Ideal for small seminars and intimate indoor gatherings.",
      features: ["Standard Equipment Rig", "1x Technician", "Setup & Tear-down"],
      deliverables: "High quality live audio setup & execution",
    },
  ]);

  // 7. Certificates
  const [certificates, setCertificates] = useState<VendorCertificate[]>([
    {
      title: "RGD Business Registration Certificate",
      certNumber: "CS-984210026",
      issuingAuthority: "Registrar General's Dept Ghana",
      issueDate: "2020-05-10",
      fileUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=80",
      status: "verified",
    },
  ]);

  // 8. Media Files & Portfolio Gallery
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [portfolio, setPortfolio] = useState<string[]>([
    "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80",
  ]);

  const [videoUrl, setVideoUrl] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [videoCaption, setVideoCaption] = useState("");
  const [mediaFiles, setMediaFiles] = useState<VendorMediaFile[]>([
    {
      type: "video",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      title: "Event Showcase Video",
      caption: "Live Event Sound & Lighting Production",
    },
  ]);

  // FAQs
  const [faqs, setFaqs] = useState<VendorFAQ[]>([
    {
      question: "Do you travel outside Accra for events?",
      answer: "Yes, we cover nationwide events across Ghana with travel logistics arranged.",
    },
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
      
      setBusinessRegistrationNumber(existingVendor.businessRegistrationNumber || "");
      setTaxIdNumber(existingVendor.taxIdNumber || "");
      setExperienceYears(existingVendor.experienceYears || 5);
      setTeamSize(existingVendor.teamSize || "10 Technicians & Staff");
      setCompletedEventsCount(existingVendor.completedEventsCount || 120);

      setPhone(existingVendor.contact?.phone || "");
      setWhatsapp(existingVendor.contact?.whatsapp || "");
      setEmail(existingVendor.contact?.email || user?.email || "");
      setInstagram(existingVendor.contact?.instagram || "");
      setWebsite(existingVendor.contact?.website || "");
      setLinkedin(existingVendor.contact?.linkedin || "");

      setBusinessHours(existingVendor.businessHours || "Mon – Sat: 8:00 AM – 9:00 PM");
      setPaymentTerms(existingVendor.paymentTerms || "50% deposit upon booking confirmation. Balance due 24h prior to event.");

      setServices(existingVendor.services || []);
      setPricingPackages(existingVendor.pricingPackages || []);
      setCertificates(existingVendor.certificates || []);
      setPortfolio(existingVendor.portfolio || []);
      setMediaFiles(existingVendor.mediaFiles || []);
      setFaqs(existingVendor.faqs || []);
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

  // Service Management
  const handleAddService = () => {
    setServices((prev) => [
      ...prev,
      { title: "New Service Package", priceRange: "GHS 1,000", description: "", setupIncluded: true },
    ]);
  };

  const handleRemoveService = (index: number) => {
    setServices((prev) => prev.filter((_, i) => i !== index));
  };

  // Pricing Packages Management
  const handleAddPricingPackage = () => {
    setPricingPackages((prev) => [
      ...prev,
      {
        name: "New Tier Package",
        price: "GHS 2,500",
        billingCycle: "Per Day",
        popular: false,
        description: "Package details and specifications...",
        features: ["Feature 1", "Feature 2"],
        deliverables: "Professional delivery and setup",
      },
    ]);
  };

  const handleRemovePricingPackage = (index: number) => {
    setPricingPackages((prev) => prev.filter((_, i) => i !== index));
  };

  // Certificate Management
  const handleAddCertificate = () => {
    setCertificates((prev) => [
      ...prev,
      {
        title: "Business License / GRA Certificate",
        certNumber: "REG-001294",
        issuingAuthority: "Registrar General / GRA",
        issueDate: "2024-01-01",
        fileUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=80",
        status: "verified",
      },
    ]);
  };

  const handleRemoveCertificate = (index: number) => {
    setCertificates((prev) => prev.filter((_, i) => i !== index));
  };

  // Media & Video Management
  const handleAddPortfolioImage = () => {
    if (portfolioUrl.trim()) {
      setPortfolio((prev) => [...prev, portfolioUrl.trim()]);
      setPortfolioUrl("");
    }
  };

  const handleAddVideo = () => {
    if (videoUrl.trim()) {
      setMediaFiles((prev) => [
        ...prev,
        {
          type: "video",
          url: videoUrl.trim(),
          title: videoTitle || "Showcase Video",
          caption: videoCaption || "",
        },
      ]);
      setVideoUrl("");
      setVideoTitle("");
      setVideoCaption("");
    }
  };

  const handleRemoveVideo = (index: number) => {
    setMediaFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // FAQ Management
  const handleAddFaq = () => {
    setFaqs((prev) => [
      ...prev,
      { question: "What is your cancellation policy?", answer: "Full refund 7 days before event." },
    ]);
  };

  const handleRemoveFaq = (index: number) => {
    setFaqs((prev) => prev.filter((_, i) => i !== index));
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
    if (portfolio.length < 4) {
      toast.error("Portfolio gallery must contain at least 4 images. Please add more photos.");
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
      pricingPackages,
      certificates,
      mediaFiles,
      faqs,
      businessRegistrationNumber,
      taxIdNumber,
      experienceYears,
      teamSize,
      completedEventsCount,
      businessHours,
      paymentTerms,
      location,
      city,
      serviceArea,
      contact: {
        phone,
        whatsapp,
        email,
        instagram,
        website,
        linkedin,
      },
      portfolio,
      verified: true,
      status: "published",
    });

    toast.success(isExisting ? "Vendor profile updated successfully!" : "Vendor profile published to directory!");
    navigate(`/vendors/${vendor.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-8 pb-20 container mx-auto px-4 lg:px-8 max-w-4xl">
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
            {isExisting ? "Update Vendor Profile" : "Create Professional Vendor Profile"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Fill in all business details, contact information, rates, certificates, and portfolio media for 100% storefront display consistency.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card border border-stone-200/80 rounded-3xl p-6 md:p-8 space-y-8 shadow-sm">
          {/* SECTION 1: BUSINESS PROFILE */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-foreground border-b border-stone-100 pb-2 flex items-center gap-2">
              <Store className="w-4 h-4 text-primary" /> 1. Business Profile & Track Record
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
              <Label className="text-xs font-normal text-foreground">Service Description & Overview *</Label>
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
                  <Upload className="w-3.5 h-3.5 text-stone-500" /> Upload Logo
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, (dataUrl) => setLogo(dataUrl))}
                  />
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-normal text-foreground">Years of Experience</Label>
                <Input
                  type="number"
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(Number(e.target.value))}
                  className="rounded-xl text-xs bg-stone-50"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-normal text-foreground">Team Size / Staff</Label>
                <Input
                  value={teamSize}
                  onChange={(e) => setTeamSize(e.target.value)}
                  placeholder="e.g. 10 Technicians & Crew"
                  className="rounded-xl text-xs bg-stone-50"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-normal text-foreground">Completed Events Count</Label>
                <Input
                  type="number"
                  value={completedEventsCount}
                  onChange={(e) => setCompletedEventsCount(Number(e.target.value))}
                  className="rounded-xl text-xs bg-stone-50"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: CONTACT & SOCIAL PROFILES */}
          <div className="space-y-4 pt-4 border-t border-stone-100">
            <h2 className="text-base font-bold text-foreground border-b border-stone-100 pb-2 flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary" /> 2. Contact Methods & Social Profiles
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-normal text-foreground flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-stone-500" /> Phone Number
                </Label>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+233 24 123 4567"
                  className="rounded-xl text-xs bg-stone-50"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-normal text-foreground flex items-center gap-1.5">
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" /> WhatsApp Number
                </Label>
                <Input
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="+233 24 123 4567"
                  className="rounded-xl text-xs bg-stone-50"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-normal text-foreground flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-stone-500" /> Email Address
                </Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contact@business.com"
                  className="rounded-xl text-xs bg-stone-50"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-normal text-foreground flex items-center gap-1.5">
                  <Instagram className="w-3.5 h-3.5 text-pink-600" /> Instagram Handle / URL
                </Label>
                <Input
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  placeholder="@yourhandle or instagram.com/..."
                  className="rounded-xl text-xs bg-stone-50"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-normal text-foreground flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-blue-600" /> Website URL
                </Label>
                <Input
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://yourbusiness.com"
                  className="rounded-xl text-xs bg-stone-50"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-normal text-foreground flex items-center gap-1.5">
                  <Linkedin className="w-3.5 h-3.5 text-sky-600" /> LinkedIn Profile
                </Label>
                <Input
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  placeholder="https://linkedin.com/company/..."
                  className="rounded-xl text-xs bg-stone-50"
                />
              </div>
            </div>
          </div>

          {/* SECTION 3: CATEGORIES & LOCATION */}
          <div className="space-y-3 pt-4 border-t border-stone-100">
            <h2 className="text-base font-bold text-foreground border-b border-stone-100 pb-2">
              3. Service Categories & Coverage Area *
            </h2>
            <div className="flex flex-wrap gap-2">
              {vendorCategoriesList.map((cat) => {
                const selected = selectedCategories.includes(cat);
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => toggleCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                      selected
                        ? "bg-primary text-primary-foreground border-primary shadow-xs"
                        : "bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100"
                    }`}
                  >
                    {selected && <CheckCircle2 className="w-3.5 h-3.5 inline mr-1" />}
                    {cat}
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="space-y-1.5">
                <Label className="text-xs font-normal text-foreground">Neighborhood / Base Area</Label>
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
                <Label className="text-xs font-normal text-foreground">Service Region / Coverage</Label>
                <Input
                  value={serviceArea}
                  onChange={(e) => setServiceArea(e.target.value)}
                  placeholder="e.g. Greater Accra & Kumasi"
                  className="rounded-xl text-xs bg-stone-50"
                />
              </div>
            </div>
          </div>

          {/* SECTION 4: BUSINESS CERTIFICATES & COMPLIANCE */}
          <div className="space-y-4 pt-4 border-t border-stone-100">
            <h2 className="text-base font-bold text-foreground border-b border-stone-100 pb-2 flex items-center gap-2 text-emerald-700">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 4. Business Registration & Compliance Certificates
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-normal text-foreground">RGD Company Registration No.</Label>
                <Input
                  value={businessRegistrationNumber}
                  onChange={(e) => setBusinessRegistrationNumber(e.target.value)}
                  placeholder="e.g. CS-984210026"
                  className="rounded-xl text-xs bg-stone-50"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-normal text-foreground">GRA Tax Identification Number (TIN)</Label>
                <Input
                  value={taxIdNumber}
                  onChange={(e) => setTaxIdNumber(e.target.value)}
                  placeholder="e.g. C001294819X"
                  className="rounded-xl text-xs bg-stone-50"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-xs font-semibold text-stone-700">Uploaded Verification Documents & Certificates</Label>
              {certificates.map((cert, index) => (
                <div key={index} className="p-4 rounded-2xl border border-stone-200 bg-stone-50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-emerald-600" /> Certificate #{index + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveCertificate(index)}
                      className="text-stone-400 hover:text-red-600 text-xs font-semibold"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    <Input
                      value={cert.title}
                      onChange={(e) => {
                        const updated = [...certificates];
                        updated[index].title = e.target.value;
                        setCertificates(updated);
                      }}
                      placeholder="Certificate Title (e.g. Incorporation Cert)"
                      className="rounded-xl text-xs bg-white"
                    />
                    <Input
                      value={cert.certNumber || ""}
                      onChange={(e) => {
                        const updated = [...certificates];
                        updated[index].certNumber = e.target.value;
                        setCertificates(updated);
                      }}
                      placeholder="Reg / ID Number"
                      className="rounded-xl text-xs bg-white"
                    />
                    <Input
                      value={cert.issuingAuthority || ""}
                      onChange={(e) => {
                        const updated = [...certificates];
                        updated[index].issuingAuthority = e.target.value;
                        setCertificates(updated);
                      }}
                      placeholder="Issuing Authority (e.g. Registrar General)"
                      className="rounded-xl text-xs bg-white"
                    />
                    <Input
                      type="date"
                      value={cert.issueDate || ""}
                      onChange={(e) => {
                        const updated = [...certificates];
                        updated[index].issueDate = e.target.value;
                        setCertificates(updated);
                      }}
                      placeholder="Date Issued"
                      className="rounded-xl text-xs bg-white"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Input
                      value={cert.fileUrl}
                      onChange={(e) => {
                        const updated = [...certificates];
                        updated[index].fileUrl = e.target.value;
                        setCertificates(updated);
                      }}
                      placeholder="Document Image / PDF URL (https://...)"
                      className="rounded-xl text-xs bg-white flex-1"
                    />
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-[11px] font-semibold text-stone-700 cursor-pointer flex-shrink-0">
                      <Upload className="w-3.5 h-3.5 text-stone-500" /> Upload File
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        className="hidden"
                        onChange={(e) =>
                          handleFileUpload(e, (dataUrl) => {
                            const updated = [...certificates];
                            updated[index].fileUrl = dataUrl;
                            setCertificates(updated);
                          })
                        }
                      />
                    </label>
                  </div>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={handleAddCertificate}
                className="w-full rounded-2xl text-xs font-semibold gap-1.5 border-dashed border-stone-300"
              >
                <Plus className="w-3.5 h-3.5" /> Add Certificate Document
              </Button>
            </div>
          </div>

          {/* SECTION 5: PRICING PACKAGES EDITOR */}
          <div className="space-y-4 pt-4 border-t border-stone-100">
            <h2 className="text-base font-bold text-foreground border-b border-stone-100 pb-2 flex items-center gap-2">
              <Package className="w-4 h-4 text-primary" /> 5. Pricing Packages & Tiers
            </h2>

            {pricingPackages.map((pkg, index) => (
              <div key={index} className="p-4 md:p-5 rounded-2xl border border-stone-200 bg-stone-50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-900">Package Tier #{index + 1}</span>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-1.5 text-xs text-stone-700 cursor-pointer">
                      <span>Most Popular</span>
                      <Switch
                        checked={pkg.popular || false}
                        onCheckedChange={(checked) => {
                          const updated = [...pricingPackages];
                          updated[index].popular = checked;
                          setPricingPackages(updated);
                        }}
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => handleRemovePricingPackage(index)}
                      className="text-stone-400 hover:text-red-600 text-xs font-semibold"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Input
                    value={pkg.name}
                    onChange={(e) => {
                      const updated = [...pricingPackages];
                      updated[index].name = e.target.value;
                      setPricingPackages(updated);
                    }}
                    placeholder="Package Name (e.g. Silver Concert Tier)"
                    className="rounded-xl text-xs bg-white"
                  />
                  <Input
                    value={pkg.price}
                    onChange={(e) => {
                      const updated = [...pricingPackages];
                      updated[index].price = e.target.value;
                      setPricingPackages(updated);
                    }}
                    placeholder="Price (e.g. GHS 3,500)"
                    className="rounded-xl text-xs bg-white"
                  />
                  <Input
                    value={pkg.billingCycle || ""}
                    onChange={(e) => {
                      const updated = [...pricingPackages];
                      updated[index].billingCycle = e.target.value;
                      setPricingPackages(updated);
                    }}
                    placeholder="Billing Cycle (e.g. Per Event or Per Day)"
                    className="rounded-xl text-xs bg-white"
                  />
                </div>

                <Textarea
                  value={pkg.description}
                  onChange={(e) => {
                    const updated = [...pricingPackages];
                    updated[index].description = e.target.value;
                    setPricingPackages(updated);
                  }}
                  placeholder="Short package description..."
                  rows={2}
                  className="rounded-xl text-xs bg-white resize-none"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Input
                    value={pkg.deliverables || ""}
                    onChange={(e) => {
                      const updated = [...pricingPackages];
                      updated[index].deliverables = e.target.value;
                      setPricingPackages(updated);
                    }}
                    placeholder="Deliverables summary (e.g. Full sound system & recording)"
                    className="rounded-xl text-xs bg-white"
                  />
                  <Input
                    value={pkg.features.join(", ")}
                    onChange={(e) => {
                      const updated = [...pricingPackages];
                      updated[index].features = e.target.value.split(",").map((f) => f.trim());
                      setPricingPackages(updated);
                    }}
                    placeholder="Included Features (comma separated: Line Array, 2x Mics, Setup)"
                    className="rounded-xl text-xs bg-white"
                  />
                </div>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={handleAddPricingPackage}
              className="w-full rounded-2xl text-xs font-semibold gap-1.5 border-dashed border-stone-300"
            >
              <Plus className="w-3.5 h-3.5" /> Add Pricing Package Tier
            </Button>
          </div>

          {/* SECTION 6: DETAILED SERVICES EDITOR */}
          <div className="space-y-4 pt-4 border-t border-stone-100">
            <h2 className="text-base font-bold text-foreground border-b border-stone-100 pb-2 flex items-center gap-2">
              <Layers className="w-4 h-4 text-primary" /> 6. Service Breakdown & Equipment Specs
            </h2>

            {services.map((service, index) => (
              <div key={index} className="p-4 rounded-2xl border border-stone-200 bg-stone-50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-900">Service #{index + 1}</span>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-1.5 text-xs text-stone-700 cursor-pointer">
                      <span>Setup Included</span>
                      <Switch
                        checked={service.setupIncluded ?? true}
                        onCheckedChange={(checked) => {
                          const updated = [...services];
                          updated[index].setupIncluded = checked;
                          setServices(updated);
                        }}
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => handleRemoveService(index)}
                      className="text-stone-400 hover:text-red-600 text-xs font-semibold"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Input
                    value={service.title}
                    onChange={(e) => {
                      const updated = [...services];
                      updated[index].title = e.target.value;
                      setServices(updated);
                    }}
                    placeholder="Service Title"
                    className="rounded-xl text-xs bg-white"
                  />
                  <Input
                    value={service.priceRange || ""}
                    onChange={(e) => {
                      const updated = [...services];
                      updated[index].priceRange = e.target.value;
                      setServices(updated);
                    }}
                    placeholder="Estimated Quote (e.g. GHS 1,500)"
                    className="rounded-xl text-xs bg-white"
                  />
                </div>

                <Input
                  value={service.description || ""}
                  onChange={(e) => {
                    const updated = [...services];
                    updated[index].description = e.target.value;
                    setServices(updated);
                  }}
                  placeholder="Detailed explanation of what is included in this service..."
                  className="rounded-xl text-xs bg-white"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Input
                    value={service.turnaroundTime || ""}
                    onChange={(e) => {
                      const updated = [...services];
                      updated[index].turnaroundTime = e.target.value;
                      setServices(updated);
                    }}
                    placeholder="Turnaround / Setup Time (e.g. 2 Hours Setup)"
                    className="rounded-xl text-xs bg-white"
                  />
                  <Input
                    value={(service.equipmentIncluded || []).join(", ")}
                    onChange={(e) => {
                      const updated = [...services];
                      updated[index].equipmentIncluded = e.target.value.split(",").map((eq) => eq.trim());
                      setServices(updated);
                    }}
                    placeholder="Equipment Provided (comma separated)"
                    className="rounded-xl text-xs bg-white"
                  />
                </div>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={handleAddService}
              className="w-full rounded-2xl text-xs font-semibold gap-1.5 border-dashed border-stone-300"
            >
              <Plus className="w-3.5 h-3.5" /> Add Service Item
            </Button>
          </div>

          {/* SECTION 7: MEDIA SHOWCASE & PORTFOLIO */}
          <div className="space-y-4 pt-4 border-t border-stone-100">
            <h2 className="text-base font-bold text-foreground border-b border-stone-100 pb-2 flex items-center gap-2">
              <Video className="w-4 h-4 text-primary" /> 7. Media Files & Video Showcase
            </h2>

            {/* Video Showcase Add */}
            <div className="space-y-3 p-4 rounded-2xl bg-stone-50 border border-stone-200">
              <Label className="text-xs font-semibold text-stone-800">Add Video Showcase (YouTube Embed or MP4 Link)</Label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <Input
                  value={videoTitle}
                  onChange={(e) => setVideoTitle(e.target.value)}
                  placeholder="Video Title (e.g. Concert Soundcheck)"
                  className="rounded-xl text-xs bg-white"
                />
                <Input
                  value={videoCaption}
                  onChange={(e) => setVideoCaption(e.target.value)}
                  placeholder="Caption / Description"
                  className="rounded-xl text-xs bg-white"
                />
                <Input
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://www.youtube.com/embed/..."
                  className="rounded-xl text-xs bg-white"
                />
              </div>
              <Button type="button" onClick={handleAddVideo} size="sm" className="rounded-xl text-xs mt-1">
                Add Video Embed
              </Button>

              {/* Added Videos List */}
              {mediaFiles.length > 0 && (
                <div className="pt-2 space-y-2">
                  <span className="text-[11px] font-bold text-stone-600 block">Added Video Showcases:</span>
                  {mediaFiles.map((m, mIdx) => (
                    <div key={mIdx} className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-stone-200 text-xs">
                      <div>
                        <span className="font-bold text-stone-900">{m.title || "Showcase Video"}</span>
                        {m.caption && <span className="text-stone-500 text-[11px] ml-2">({m.caption})</span>}
                        <p className="text-[10px] text-stone-400 truncate max-w-xs">{m.url}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveVideo(mIdx)}
                        className="text-stone-400 hover:text-red-600 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Photo Portfolio Add */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-semibold text-stone-800">
                  Portfolio Image Gallery <span className="text-stone-400 font-normal">(Min. 4 photos)</span>
                </Label>
                <span className={`text-[11px] font-bold ${portfolio.length < 4 ? "text-amber-600" : "text-emerald-600"}`}>
                  {portfolio.length} / 4+ images
                </span>
              </div>
              <div className="flex gap-2">
                <Input
                  value={portfolioUrl}
                  onChange={(e) => setPortfolioUrl(e.target.value)}
                  placeholder="Image URL (https://...)"
                  className="rounded-xl text-xs bg-stone-50 flex-1"
                />
                <Button type="button" onClick={handleAddPortfolioImage} size="sm" className="rounded-xl text-xs">
                  Add Image URL
                </Button>
                <label className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-stone-300 bg-stone-50 hover:bg-stone-100 text-[11px] font-semibold text-stone-700 cursor-pointer">
                  <Upload className="w-3.5 h-3.5 text-stone-500" /> Upload
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      handleFileUpload(e, (dataUrl) => setPortfolio((prev) => [...prev, dataUrl]))
                    }
                  />
                </label>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 pt-2">
                {portfolio.map((img, idx) => (
                  <div key={idx} className="relative aspect-[4/3] rounded-xl overflow-hidden border border-stone-200 group">
                    <img src={img} alt={`Portfolio ${idx}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setPortfolio((prev) => prev.filter((_, i) => i !== idx))}
                      className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 8: OPERATING INFO & FAQS */}
          <div className="space-y-4 pt-4 border-t border-stone-100">
            <h2 className="text-base font-bold text-foreground border-b border-stone-100 pb-2 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-primary" /> 8. Operating Hours, Payment Terms & FAQs
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-normal text-foreground">Operating Hours</Label>
                <Input
                  value={businessHours}
                  onChange={(e) => setBusinessHours(e.target.value)}
                  placeholder="e.g. Mon – Sat: 8:00 AM – 9:00 PM"
                  className="rounded-xl text-xs bg-stone-50"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-normal text-foreground">Payment & Booking Terms</Label>
                <Input
                  value={paymentTerms}
                  onChange={(e) => setPaymentTerms(e.target.value)}
                  placeholder="e.g. 50% deposit upon booking confirmation..."
                  className="rounded-xl text-xs bg-stone-50"
                />
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <Label className="text-xs font-semibold text-stone-800">Frequently Asked Questions (FAQs)</Label>
              {faqs.map((faq, index) => (
                <div key={index} className="p-3 rounded-2xl border border-stone-200 bg-stone-50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-900">FAQ #{index + 1}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFaq(index)}
                      className="text-stone-400 hover:text-red-600 text-xs font-semibold"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <Input
                    value={faq.question}
                    onChange={(e) => {
                      const updated = [...faqs];
                      updated[index].question = e.target.value;
                      setFaqs(updated);
                    }}
                    placeholder="Question..."
                    className="rounded-xl text-xs bg-white"
                  />
                  <Input
                    value={faq.answer}
                    onChange={(e) => {
                      const updated = [...faqs];
                      updated[index].answer = e.target.value;
                      setFaqs(updated);
                    }}
                    placeholder="Answer..."
                    className="rounded-xl text-xs bg-white"
                  />
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={handleAddFaq}
                className="w-full rounded-2xl text-xs font-semibold gap-1.5 border-dashed border-stone-300"
              >
                <Plus className="w-3.5 h-3.5" /> Add FAQ Item
              </Button>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-6 border-t border-stone-100 flex items-center justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => navigate(-1)} className="rounded-xl text-xs">
              Cancel
            </Button>
            <Button type="submit" size="lg" className="rounded-xl text-xs md:text-sm font-bold px-8 shadow-md">
              {isExisting ? "Save Vendor Storefront" : "Publish Vendor Listing"}
            </Button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default CreateVendorPage;
