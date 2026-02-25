import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "Free",
    desc: "Perfect for getting started with basic event planning.",
    features: ["Up to 3 events", "Basic vendor search", "Email support", "1 team member"],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    desc: "For professionals managing multiple events with teams.",
    features: ["Unlimited events", "AI Assistant", "Vendor marketplace", "Up to 10 team members", "Budget tracking", "Priority support"],
    cta: "Start Free Trial",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "For organizations with advanced needs and large teams.",
    features: ["Everything in Pro", "Unlimited team members", "Custom integrations", "Dedicated account manager", "SLA guarantee", "Advanced analytics"],
    cta: "Contact Sales",
    highlight: false,
  },
];

const PricingPage = () => {
  return (
    <div className="min-h-screen" style={{ background: '#0B0B0F' }}>
      <Navbar />
      <div className="pt-32 pb-20 container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">Pricing</span>
          <h1 className="text-4xl md:text-6xl font-bold mt-3 mb-6" style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.4) 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
          }}>
            Simple, transparent pricing
          </h1>
          <p className="text-sm md:text-base" style={{ color: '#9CA3AF' }}>
            Choose the plan that fits your event planning needs. Upgrade or downgrade anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div key={plan.name} className="rounded-2xl p-7 flex flex-col transition-all duration-300 hover:-translate-y-1.5" style={{
              background: plan.highlight ? 'linear-gradient(135deg, #1a1a2e 0%, #16161D 100%)' : 'linear-gradient(135deg, #16161D 0%, #121218 100%)',
              border: plan.highlight ? '1px solid rgba(59,130,246,0.3)' : '1px solid rgba(255,255,255,0.06)',
              boxShadow: plan.highlight ? '0 8px 40px rgba(59,130,246,0.1)' : '0 8px 30px rgba(0,0,0,0.3)'
            }}>
              {plan.highlight && <span className="text-xs font-semibold text-blue-400 mb-2">Most Popular</span>}
              <h3 className="text-xl font-bold text-white">{plan.name}</h3>
              <div className="mt-3 mb-2">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                {plan.period && <span className="text-sm" style={{ color: '#9CA3AF' }}>{plan.period}</span>}
              </div>
              <p className="text-sm mb-6" style={{ color: '#9CA3AF' }}>{plan.desc}</p>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-white/80">
                    <Check className="h-4 w-4 text-blue-400 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button asChild className="w-full rounded-full text-sm font-medium" style={{
                background: plan.highlight ? 'rgba(59,130,246,0.2)' : 'rgba(255,255,255,0.08)',
                border: plan.highlight ? '1px solid rgba(59,130,246,0.3)' : '1px solid rgba(255,255,255,0.15)',
                color: 'white'
              }}>
                <Link to="/signup">{plan.cta} <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PricingPage;
