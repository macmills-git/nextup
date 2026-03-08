import Navbar from "@/components/Navbar";
import VariantFooter from "@/components/VariantFooter";
import { Button } from "@/components/ui/button";
import { Search, MessageCircle, BookOpen, Mail, HelpCircle, Plus } from "lucide-react";
import { useState } from "react";

const faqs = [
  { q: "How do I create my first event?", a: "Go to Dashboard → Events → Create Event. Fill in the details like name, date, location, guest count, and budget. You can also add a category to organize your events." },
  { q: "Can I invite team members?", a: "Yes! Navigate to the Team page in your dashboard. Click 'Invite Member' and enter their email. You can assign roles and permissions to control access levels." },
  { q: "How does the AI Assistant work?", a: "Our AI Assistant analyzes your event data, budget constraints, and vendor history to provide intelligent recommendations. Ask it anything about event planning!" },
  { q: "How do I manage my budget?", a: "Each event has a dedicated budget section. You can set budgets per category, track expenses in real-time, and receive alerts before you go over budget." },
  { q: "Can I message vendors directly?", a: "Yes! Visit the Vendor Marketplace, find a vendor, and click 'Contact'. Messages are centralized in your Messages tab for easy tracking." },
  { q: "Is there a mobile app?", a: "EventNest is fully responsive and works great on mobile browsers. A dedicated mobile app is planned for future release." },
];

const HelpPage = () => {
  const [search, setSearch] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filtered = faqs.filter(f => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-background relative z-[1]">
      <Navbar />
      <div className="pt-32 pb-20 container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Help & Support</span>
          <h1 className="text-4xl md:text-6xl font-bold mt-3 mb-6 text-foreground tracking-tight">
            How can we help you?
          </h1>
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Search for help..."
              className="w-full h-12 rounded-full pl-10 pr-4 text-sm bg-card border border-border text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto mb-16">
          {[
            { icon: BookOpen, title: "Documentation", desc: "Browse our comprehensive docs", link: "/docs" },
            { icon: MessageCircle, title: "Live Chat", desc: "Chat with our support team", link: "#" },
            { icon: Mail, title: "Email Support", desc: "support@eventnest.com", link: "mailto:support@eventnest.com" },
          ].map((item, i) => (
            <a key={i} href={item.link} className="rounded-2xl p-6 flex items-start gap-4 transition-all duration-300 hover:-translate-y-1 bg-card border border-border shadow-card hover:shadow-elevated">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-primary/10">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-foreground font-semibold text-sm">{item.title}</h3>
                <p className="text-xs mt-1 text-muted-foreground">{item.desc}</p>
              </div>
            </a>
          ))}
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-primary" /> Frequently Asked Questions
          </h2>
          <div className="space-y-1">
            {filtered.map((faq, i) => (
              <div key={i}>
                <button
                  className="w-full flex items-center justify-between py-4 border-b border-border text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="text-sm font-medium text-foreground">{faq.q}</span>
                  <span className="w-6 h-6 rounded-full border border-border flex items-center justify-center text-muted-foreground flex-shrink-0">
                    <Plus className={`w-3 h-3 transition-transform ${openFaq === i ? 'rotate-45' : ''}`} />
                  </span>
                </button>
                {openFaq === i && (
                  <div className="py-3 text-sm text-muted-foreground">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HelpPage;
