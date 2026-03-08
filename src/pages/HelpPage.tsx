import Navbar from "@/components/Navbar";
import SaasFooter from "@/components/landing/saas/SaasFooter";
import { Search, MessageCircle, BookOpen, Mail, Plus, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const faqs = [
  { q: "How do I create my first event?", a: "Go to Dashboard → Events → Create Event. Fill in the details like name, date, location, guest count, and budget." },
  { q: "Can I invite team members?", a: "Yes! Navigate to the Team page in your dashboard. Click 'Invite Member' and enter their email with role assignments." },
  { q: "How does the AI Assistant work?", a: "Our AI Assistant analyzes your event data, budget constraints, and vendor history to provide intelligent recommendations." },
  { q: "How do I manage my budget?", a: "Each event has a dedicated budget section. Set budgets per category, track expenses in real-time, and receive alerts." },
  { q: "Can I message vendors directly?", a: "Yes! Visit the Vendor Marketplace, find a vendor, and click 'Contact'. Messages are centralized in your Messages tab." },
  { q: "Is there a mobile app?", a: "Nested is fully responsive and works great on mobile browsers. A dedicated mobile app is planned for future release." },
];

const HelpPage = () => {
  const [search, setSearch] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const filtered = faqs.filter(f => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero — Nodus about-us style */}
      <section className="pt-36 pb-20 container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">
          <div>
            <span className="text-sm font-medium text-primary">Help & Support</span>
            <h1 className="text-4xl md:text-[3.5rem] font-bold text-foreground tracking-tight leading-[1.1] mt-3 mb-6">
              How can we help you today?
            </h1>
            <p className="text-muted-foreground leading-relaxed max-w-lg mb-8">
              Find answers to common questions, browse our documentation, or reach out to our support team directly.
            </p>
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                placeholder="Search for help..."
                className="w-full h-12 rounded-full pl-10 pr-4 text-sm bg-card border border-border text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {[
              { icon: BookOpen, title: "Documentation", desc: "Browse our comprehensive docs and guides", link: "/docs" },
              { icon: MessageCircle, title: "Live Chat", desc: "Chat with our support team in real-time", link: "#" },
              { icon: Mail, title: "Email Support", desc: "support@nested.com — we reply within 24h", link: "mailto:support@nested.com" },
            ].map((item, i) => (
              <Link key={i} to={item.link} className="rounded-2xl p-5 flex items-center gap-4 bg-card border border-border hover:shadow-elevated transition-all group">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-primary/10">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-foreground font-semibold text-sm">{item.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </Link>
            ))}
          </div>
        </div>

        {/* FAQs — clean accordion */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-8">Frequently Asked Questions</h2>
          <div>
            {filtered.map((faq, i) => (
              <div key={i} className="border-b border-border">
                <button
                  className="w-full flex items-center justify-between py-5 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="text-sm font-medium text-foreground">{faq.q}</span>
                  <Plus className={`w-4 h-4 text-muted-foreground transition-transform flex-shrink-0 ${openFaq === i ? 'rotate-45' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="pb-5 text-sm text-muted-foreground leading-relaxed">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      <SaasFooter />
    </div>
  );
};

export default HelpPage;
