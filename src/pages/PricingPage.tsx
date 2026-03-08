import Navbar from "@/components/Navbar";
import VariantFooter from "@/components/VariantFooter";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Check, CreditCard, ChevronRight, Plus, Quote } from "lucide-react";
import { useState } from "react";

const plans = [
  {
    name: "Starter", price: "Free",
    desc: "Perfect for getting started with basic event planning.",
    features: ["Up to 3 events", "Basic vendor search", "Email support", "1 team member"],
    cta: "Get Started", highlight: false,
  },
  {
    name: "Pro", price: "$29", period: "/month",
    desc: "For professionals managing multiple events with teams.",
    features: ["Unlimited events", "AI Assistant", "Vendor marketplace", "Up to 10 team members", "Budget tracking", "Priority support"],
    cta: "Start Free Trial", highlight: true,
  },
  {
    name: "Enterprise", price: "Custom",
    desc: "For organizations with advanced needs and large teams.",
    features: ["Everything in Pro", "Unlimited team members", "Custom integrations", "Dedicated account manager", "SLA guarantee", "Advanced analytics"],
    cta: "Contact Sales", highlight: false,
  },
];

const creditOptions = [
  { amount: 100, price: 20 },
  { amount: 200, price: 40 },
  { amount: 500, price: 80 },
];

const faqs = [
  { cat: "GENERAL", q: "What is EventNest?", a: "EventNest is an AI-powered event planning platform that helps you manage events, vendors, teams, and budgets all in one place." },
  { cat: "GENERAL", q: "Do I need a credit card to start?", a: "No. The Starter plan is completely free with no credit card required." },
  { cat: "PRICING", q: "Can I switch plans anytime?", a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately." },
  { cat: "PRICING", q: "Is there a refund policy?", a: "Yes, we offer a 14-day money-back guarantee on all paid plans." },
  { cat: "PRICING", q: "Do credits expire?", a: "No! AI credits never expire. Use them whenever you need." },
];

const PricingPage = () => {
  const [selectedCredit, setSelectedCredit] = useState(1);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background relative z-[1]">
      <Navbar />
      <div className="pt-32 pb-20 container mx-auto px-4 lg:px-8">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Pricing</span>
          <h1 className="text-4xl md:text-6xl font-bold mt-3 mb-6 text-foreground tracking-tight">
            Simple, transparent pricing
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Choose the plan that fits your event planning needs. Upgrade or downgrade anytime.
          </p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-24">
          {plans.map((plan) => (
            <div key={plan.name} className={`rounded-2xl p-7 flex flex-col transition-all duration-300 hover:-translate-y-1.5 bg-card border shadow-card ${
              plan.highlight ? 'border-primary/30 shadow-elevated' : 'border-border'
            }`}>
              {plan.highlight && <span className="text-xs font-semibold text-primary mb-2">Most Popular</span>}
              <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
              <div className="mt-3 mb-2">
                <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                {plan.period && <span className="text-sm text-muted-foreground">{plan.period}</span>}
              </div>
              <p className="text-sm mb-6 text-muted-foreground">{plan.desc}</p>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                    <Check className="h-4 w-4 text-success flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button asChild className={`w-full rounded-full text-sm font-medium ${
                plan.highlight
                  ? 'bg-foreground text-background hover:bg-foreground/90'
                  : 'bg-secondary text-foreground border border-border hover:bg-accent'
              }`} style={plan.highlight ? { boxShadow: '0 8px 20px hsl(var(--foreground) / 0.2)' } : {}}>
                <Link to="/signup">{plan.cta} <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          ))}
        </div>

        {/* Credits Modal */}
        <div className="max-w-4xl mx-auto mb-24 bg-card rounded-[32px] border border-border p-10 shadow-elevated">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-secondary text-muted-foreground">CREDITS</span>
              <h2 className="text-2xl font-bold text-foreground mt-4 mb-3">AI Credits That Never Expire</h2>
              <p className="text-sm text-muted-foreground mb-6">Purchase credits to use our AI features. Credits never expire and work across all your events.</p>
              <div className="space-y-3">
                {creditOptions.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedCredit(i)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                      selectedCredit === i
                        ? 'border-foreground border-2 bg-card'
                        : 'border-border bg-secondary hover:bg-accent'
                    }`}
                  >
                    <span className="font-semibold text-foreground">{opt.amount} Credits</span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      selectedCredit === i
                        ? 'bg-foreground text-background shadow-elevated'
                        : 'bg-secondary text-muted-foreground'
                    }`}>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-4xl font-bold text-foreground">${creditOptions[selectedCredit].price}</span>
                  <span className="text-sm text-muted-foreground ml-2">one-time</span>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary">Most Popular</span>
              </div>
              <Button className="w-full rounded-full py-3 text-sm font-semibold bg-foreground text-background hover:bg-foreground/90 mb-6" style={{
                boxShadow: '0 8px 20px hsl(var(--foreground) / 0.3)',
              }}>
                <CreditCard className="mr-2 h-4 w-4" /> Buy Now
              </Button>
              <div className="bg-secondary rounded-xl p-5 space-y-3">
                {["AI event plan generation", "Budget optimization", "Vendor recommendations", "Task auto-creation", "Analytics insights"].map(f => (
                  <div key={f} className="flex items-center gap-2 text-sm text-foreground">
                    <Check className="w-4 h-4 text-success flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-4 flex items-center gap-1">
                ℹ️ Pro features require an active Pro subscription.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ + Testimonials */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* FAQ */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
            <div className="space-y-1">
              {faqs.map((faq, i) => {
                const showCat = i === 0 || faqs[i - 1].cat !== faq.cat;
                return (
                  <div key={i}>
                    {showCat && <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mt-4 mb-2">{faq.cat}</p>}
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between py-4 border-b border-border text-left"
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
                );
              })}
            </div>
          </div>

          {/* Testimonials */}
          <div>
            <h2 className="text-2xl font-bold mb-1">
              <span className="text-foreground">Loved by builders, </span>
              <span className="text-muted-foreground">easy turnarounds</span>
            </h2>
            <p className="text-sm text-muted-foreground mb-6">See what our users are saying about their experience.</p>

            <div className="relative">
              {/* Stacked layers effect */}
              <div className="absolute -bottom-2 left-2 right-2 h-full rounded-2xl bg-secondary/50 border border-border" />
              <div className="absolute -bottom-4 left-4 right-4 h-full rounded-2xl bg-secondary/30 border border-border" />
              <div className="relative bg-card rounded-2xl border border-border p-6 shadow-card">
                <Quote className="w-8 h-8 text-muted-foreground/20 mb-4" />
                <p className="text-sm text-foreground leading-relaxed mb-4">
                  "EventNest has completely <span className="text-success font-semibold" style={{ textShadow: '0 0 10px hsl(142, 71%, 45%, 0.3)' }}>transformed how we plan events</span>. The AI assistant alone saved us 40 hours per event. The vendor marketplace is incredibly well-curated."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    <span className="text-sm font-bold text-foreground">SJ</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Sarah Johnson</p>
                    <p className="text-xs text-muted-foreground">Event Director, Acme Corp</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PricingPage;
