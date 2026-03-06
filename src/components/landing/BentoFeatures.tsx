import { useEffect, useRef } from "react";
import { Bot, MessageSquare, Layers, Zap, Shield, Globe, DollarSign, Clock, Users, CheckCircle, BarChart3, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BentoFeatures = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current.querySelectorAll('.bento-card'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%' }
      }
    );
  }, []);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-3">
            Packed with powerful features
          </h2>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            From event creation to vendor management, Event Nest has tools for literally everything.
          </p>
        </div>

        <div ref={ref} className="max-w-6xl mx-auto space-y-5">
          {/* Row 1: 2 large cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* AI Assistant card */}
            <div className="bento-card rounded-2xl p-6 bg-card border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-1">AI Event Planning</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Generate event plans, budgets and vendor recommendations with a single prompt.
              </p>
              {/* Mini chat UI */}
              <div className="rounded-xl bg-secondary p-3 space-y-2">
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot className="w-2.5 h-2.5 text-primary" />
                  </div>
                  <div className="bg-card rounded-lg rounded-bl-sm px-2.5 py-1.5 text-[11px] text-foreground">
                    I found 3 venues in your budget range. Here's a 4-week timeline with vendor picks.
                  </div>
                </div>
                <div className="flex items-start gap-2 flex-row-reverse">
                  <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[8px] text-muted-foreground">U</span>
                  </div>
                  <div className="bg-primary/10 rounded-lg rounded-br-sm px-2.5 py-1.5 text-[11px] text-foreground">
                    Perfect, share the timeline!
                  </div>
                </div>
              </div>
            </div>

            {/* Audit Trail card */}
            <div className="bento-card rounded-2xl p-6 bg-card border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-1">Activity & Audit Trail</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Tracks every action with full input-output visibility and timestamps.
              </p>
              <div className="rounded-xl bg-secondary p-3 space-y-1.5">
                <p className="text-[10px] font-semibold text-foreground mb-2">📋 Recent Activity</p>
                {[
                  { label: "Venue Booking", status: "COMPLETED", color: "bg-success" },
                  { label: "Vendor Review", status: "FAILED", color: "bg-destructive" },
                  { label: "Budget Approval", status: "PROCESSING", color: "bg-warning" },
                  { label: "Guest Invites", status: "PROCESSING", color: "bg-warning" },
                  { label: "Catering Finalized", status: "COMPLETED", color: "bg-success" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-1">
                    <span className="text-[10px] text-foreground">{item.label}</span>
                    <span className={`text-[8px] px-1.5 py-0.5 rounded-full text-white ${item.color}`}>{item.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row 2: 2 medium cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bento-card rounded-2xl p-6 bg-card border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-1">Multi-Vendor Support</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Whether it's caterers, photographers or DJs, we support every vendor type.
              </p>
              <div className="rounded-xl bg-secondary p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-semibold text-foreground">Add Vendor</span>
                  <span className="text-[9px] text-primary font-medium">+ Add</span>
                </div>
                {[
                  { name: "Elite Catering", date: "23rd March", active: false },
                  { name: "Lens Studio", date: "21st March", active: true },
                  { name: "Sound Systems Pro", date: "3rd May", active: false },
                ].map((v, i) => (
                  <div key={i} className="flex items-center justify-between py-1.5 border-t border-border/50">
                    <div>
                      <span className="text-[10px] text-foreground">{v.name}</span>
                      <span className="text-[8px] text-muted-foreground ml-2">{v.date}</span>
                    </div>
                    <div className={`w-6 h-3 rounded-full ${v.active ? 'bg-primary' : 'bg-muted'}`} />
                  </div>
                ))}
              </div>
            </div>

            <div className="bento-card rounded-2xl p-6 bg-card border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-1">Deploy in seconds</h3>
              <p className="text-sm text-muted-foreground mb-4">
                With our blazing fast platform, you can create and publish event pages instantly.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {["📅 Events", "👥 Teams", "💬 Messages", "📊 Analytics", "🎯 Goals", "🏪 Vendors", "📋 Tasks", "💰 Budget", "🎨 Templates"].map((tag) => (
                  <span key={tag} className="text-[10px] px-2.5 py-1 rounded-full border border-border bg-secondary text-foreground">{tag}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Row 3: 4 small feature cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { icon: Zap, title: "Real-time Updates", desc: "Instant notifications for all event changes." },
              { icon: Shield, title: "Secure & Private", desc: "Enterprise-grade encrypted data storage." },
              { icon: DollarSign, title: "Budget Tracking", desc: "No cap, no lock, no credit card required." },
              { icon: Clock, title: "24/7 Support", desc: "We are available 100% of the time." },
              { icon: Globe, title: "Multi-event", desc: "Manage multiple events simultaneously." },
              { icon: BarChart3, title: "Analytics", desc: "Detailed charts and exportable reports." },
              { icon: Users, title: "Team Roles", desc: "Role-based access for your entire team." },
              { icon: CheckCircle, title: "And more", desc: "Everything else you need for events." },
            ].map((f, i) => (
              <div key={i} className="bento-card rounded-xl p-4 bg-card border border-border">
                <f.icon className="w-5 h-5 text-foreground mb-2" />
                <h4 className="text-sm font-semibold text-foreground mb-0.5">{f.title}</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BentoFeatures;
