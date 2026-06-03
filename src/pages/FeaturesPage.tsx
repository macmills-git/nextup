import Navbar from "@/components/Navbar";
import SaasFooter from "@/components/landing/saas/SaasFooter";
import { Calendar, DollarSign, Users, Sparkles, MessageSquare, Clock, Store, CheckCircle, Zap, Shield, ArrowRight, Bot, Heart, Layers, BarChart3, Ticket, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  { q: "What exactly does Nested do?", a: "Nested is an all-in-one event planning platform that helps you manage vendors, coordinate teams, track budgets, publish events, sell tickets, and create unforgettable experiences — all from a single dashboard." },
  { q: "How do I get started with creating my first event?", a: "Sign up for a free account, click 'Create Event', and our AI-powered assistant will guide you through setting up your event timeline, budget, and vendor requirements." },
  { q: "Can vendors join Nested too?", a: "Yes. Vendors can sign up with a vendor account, complete a guided onboarding to publish their business profile, services, pricing, and portfolio, then be discovered by event planners across the platform." },
  { q: "What tools and services can I integrate?", a: "We integrate with popular tools like Slack, Google Calendar, Stripe for payments, and over 50+ other services to streamline your workflow." },
  { q: "Is my data secure when using Nested?", a: "Absolutely. We use enterprise-grade encryption, role-based access, and regular security audits to ensure your data is always protected." },
  { q: "Do you support ticketing and reports?", a: "Ticketing is rolling out soon — you'll be able to sell paid, free and donation tickets directly from your event page. Detailed event reports are already live in your dashboard." },
];

const FeaturesPage = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    if (!pageRef.current) return;
    gsap.fromTo(pageRef.current.querySelectorAll('.reveal'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power2.out',
        scrollTrigger: { trigger: pageRef.current, start: 'top 90%' }
      }
    );
  }, []);

  return (
    <div className="min-h-screen bg-background" ref={pageRef}>
      <Navbar />

      <section className="pt-36 pb-20 container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">
          <div>
            <span className="reveal text-sm font-medium text-primary">Features</span>
            <h1 className="reveal text-4xl md:text-[3.5rem] font-bold text-foreground tracking-tight leading-[1.1] mt-3 mb-6">
              Helping Planners Focus on What Matters
            </h1>
            <p className="reveal text-muted-foreground leading-relaxed max-w-lg">
              We empower event planners and teams to create, coordinate, and manage events visually — with AI-powered tools that handle the heavy lifting.
            </p>
            <div className="reveal flex gap-10 mt-10">
              {[
                { value: "10K+", label: "Events planned" },
                { value: "500+", label: "Verified vendors" },
                { value: "98%", label: "Satisfaction" },
              ].map(s => (
                <div key={s.label}>
                  <p className="text-3xl font-bold text-foreground">{s.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal grid grid-cols-2 gap-4">
            {[
              { icon: CheckCircle, title: "Complete Ownership", desc: "Take full control of your events with comprehensive planning and customization options." },
              { icon: Zap, title: "Lightning Fast", desc: "Build and deploy event pages rapidly with our streamlined planning environment." },
              { icon: Shield, title: "Absolute Integrity", desc: "Ensure reliable and secure event operations with built-in safety measures." },
              { icon: Sparkles, title: "AI-Powered", desc: "Leverage cutting-edge AI for vendor matching, budget optimization, and smart scheduling." },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl border border-border p-5 bg-card hover:shadow-elevated transition-shadow">
                <f.icon className="w-5 h-5 text-primary mb-3" />
                <h3 className="font-semibold text-foreground text-sm mb-1.5">{f.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bento section */}
        <div className="mb-24">
          <div className="reveal text-center mb-12">
            <span className="text-sm font-medium text-primary">Core Platform</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">Everything you need, nothing you don't</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
            <div className="reveal rounded-2xl border border-border p-6 bg-card">
              <h3 className="text-lg font-semibold text-foreground mb-1">AI-Powered Planning</h3>
              <p className="text-sm text-muted-foreground mb-4">Generate event plans from a text prompt at the speed of light.</p>
              <div className="rounded-xl bg-secondary p-3 space-y-2">
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot className="w-2.5 h-2.5 text-primary" />
                  </div>
                  <div className="bg-card rounded-lg rounded-bl-sm px-2.5 py-1.5 text-[11px] text-foreground border border-border">
                    I found 3 venues in your budget. Here's a timeline with vendor recommendations.
                  </div>
                </div>
                <div className="flex items-start gap-2 flex-row-reverse">
                  <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[8px] text-muted-foreground">U</span>
                  </div>
                  <div className="bg-primary/10 rounded-lg rounded-br-sm px-2.5 py-1.5 text-[11px] text-foreground">
                    Perfect! Share the timeline and vendor picks.
                  </div>
                </div>
              </div>
            </div>

            <div className="reveal rounded-2xl border border-border p-6 bg-card">
              <h3 className="text-lg font-semibold text-foreground mb-1">Multi-Vendor Support</h3>
              <p className="text-sm text-muted-foreground mb-4">Whether it's caterers, photographers or DJs — manage them all.</p>
              <div className="rounded-xl bg-secondary p-3">
                {[
                  { name: "Elite Catering", date: "23rd March", active: true },
                  { name: "Lens Studio Pro", date: "21st March", active: true },
                  { name: "Sound Systems", date: "3rd May", active: false },
                  { name: "Floral Dreams", date: "1st April", active: true },
                ].map((v, i) => (
                  <div key={i} className="flex items-center justify-between py-1.5 border-b border-border/50 last:border-0">
                    <div>
                      <span className="text-[11px] text-foreground font-medium">{v.name}</span>
                      <span className="text-[9px] text-muted-foreground ml-2">{v.date}</span>
                    </div>
                    <div className={`w-6 h-3 rounded-full ${v.active ? 'bg-primary' : 'bg-muted'}`} />
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal rounded-2xl border border-border p-6 bg-card">
              <h3 className="text-lg font-semibold text-foreground mb-1">Smart Communication</h3>
              <p className="text-sm text-muted-foreground mb-4">Centralized messaging with vendors, team, and guests.</p>
              <div className="rounded-xl bg-secondary p-3 space-y-1.5">
                {["Hello! Give me all vendor contacts for this event", "Sure! Here are 12 vendor contacts with ratings.", "Can you draft the vendor brief?", "Done! Brief generated and sent."].map((msg, i) => (
                  <div key={i} className={`rounded-lg px-2.5 py-1.5 text-[10px] ${i % 2 === 0 ? 'ml-auto max-w-[80%] bg-primary text-white' : 'mr-auto max-w-[80%] bg-card border border-border text-foreground'}`}>
                    {msg}
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal rounded-2xl border border-border p-6 bg-card">
              <h3 className="text-lg font-semibold text-foreground mb-1">Deploy in seconds</h3>
              <p className="text-sm text-muted-foreground mb-4">Create and publish event pages instantly.</p>
              <div className="flex flex-wrap gap-1.5">
                {["📅 Events", "👥 Teams", "📊 Reports", "💬 Messages", "🎯 Goals", "🏪 Vendors", "📋 Tasks", "💰 Budget", "🎨 Templates", "🎟️ Ticketing"].map((tag) => (
                  <span key={tag} className="text-[10px] px-2.5 py-1 rounded-full border border-border bg-secondary text-foreground">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Feature grid */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="reveal text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-3">And so much more</h2>
            <p className="text-muted-foreground">Built for professionals who demand the best tools.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Calendar, title: "Event Creation", desc: "Create events with dates, locations, and budgets in seconds." },
              { icon: Store, title: "Vendor Marketplace", desc: "Discover and compare verified vendors with reviews." },
              { icon: DollarSign, title: "Budget Tracking", desc: "Real-time expense tracking with smart alerts." },
              { icon: Clock, title: "Timeline Planning", desc: "Automated timelines with milestones and deadlines." },
              { icon: BarChart3, title: "Event Reports", desc: "Detailed analytics with revenue, satisfaction, and budget insights." },
              { icon: Ticket, title: "Ticketing", desc: "Sell tickets, manage registrations, and track attendance. Coming soon!" },
              { icon: Users, title: "Team Collaboration", desc: "Share access with your whole team seamlessly." },
              { icon: Heart, title: "And everything else", desc: "Everything else you could possibly need." },
            ].map((f, i) => (
              <div key={i} className="reveal rounded-xl p-5 bg-card border border-border hover:shadow-elevated transition-shadow">
                <f.icon className="w-5 h-5 text-primary mb-3" />
                <h4 className="text-sm font-semibold text-foreground mb-1">{f.title}</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{f.desc}</p>
                {f.title === "Ticketing" && (
                  <span className="inline-flex items-center gap-1 mt-2 text-[9px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                    <Sparkles className="w-2.5 h-2.5" /> Coming Soon
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="reveal text-center mb-24">
          <Button size="lg" asChild className="rounded-full px-8 py-3 text-sm font-medium bg-foreground text-background hover:bg-foreground/90">
            <Link to="/signup">Get Started Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto pb-12">
          <div className="text-center mb-12">
            <p className="reveal text-sm text-primary font-medium mb-3">FAQs</p>
            <h2 className="reveal text-3xl md:text-5xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="reveal text-base text-muted-foreground max-w-lg mx-auto mb-8">
              Find answers to the most common questions about Nested. Still need help?
            </p>
            <div className="reveal flex items-center justify-center gap-3">
              <Button asChild className="rounded-full px-6 h-10 text-sm font-semibold bg-foreground text-background hover:bg-foreground/90">
                <Link to="/docs">Read Docs</Link>
              </Button>
              <Button variant="outline" asChild className="rounded-full px-6 h-10 text-sm font-medium border border-border/40 bg-background hover:bg-muted/50">
                <Link to="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>

          <div className="reveal border-t border-border/15">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-border/15">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between py-5 text-left group"
                >
                  <span className="text-sm md:text-base font-medium text-foreground group-hover:text-primary transition-colors">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-muted-foreground flex-shrink-0 ml-4 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-40 pb-5' : 'max-h-0'}`}>
                  <p className="text-sm text-muted-foreground leading-relaxed pr-8">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <SaasFooter />
    </div>
  );
};

export default FeaturesPage;
