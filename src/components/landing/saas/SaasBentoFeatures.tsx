import { useEffect, useRef } from "react";
import { Bot, Zap, Shield, Globe, DollarSign, Clock, Users, CheckCircle, BarChart3 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SaasBentoFeatures = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current.querySelectorAll('.bento-card'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.06, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%' }
      }
    );
    gsap.fromTo(ref.current.querySelectorAll('.bento-heading'),
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 90%' }
      }
    );
  }, []);

  return (
    <section className="py-28 bg-background relative">
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.03)_0%,transparent_70%)]" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="bento-heading inline-flex items-center text-xs font-medium text-accent bg-accent/10 px-4 py-1 rounded-full border border-accent/20 mb-4">
            Features
          </span>
          <h2 className="bento-heading text-3xl md:text-5xl font-bold text-foreground mb-3">
            Packed with powerful features
          </h2>
          <p className="bento-heading text-sm text-muted-foreground max-w-lg mx-auto">
            From event creation to vendor management, Event Nest has tools for literally everything.
          </p>
        </div>

        <div ref={ref} className="max-w-6xl mx-auto space-y-4">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bento-card group rounded-2xl p-6 bg-card/50 backdrop-blur-sm border border-border/30 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5">
              <h3 className="text-lg font-semibold text-foreground mb-1">AI Event Planning</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Generate event plans, budgets and vendor recommendations with a single prompt.
              </p>
              <div className="rounded-xl bg-muted/30 p-3 space-y-2 border border-border/20">
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot className="w-2.5 h-2.5 text-primary" />
                  </div>
                  <div className="bg-card rounded-xl px-2.5 py-1.5 text-[11px] text-foreground border border-border/20 shadow-sm">
                    I found 3 venues in your budget range. Here's a 4-week timeline with vendor picks.
                  </div>
                </div>
                <div className="flex items-start gap-2 flex-row-reverse">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[8px] font-semibold text-primary">U</span>
                  </div>
                  <div className="bg-primary/10 rounded-xl px-2.5 py-1.5 text-[11px] text-foreground">
                    Perfect, share the timeline!
                  </div>
                </div>
              </div>
            </div>

            <div className="bento-card group rounded-2xl p-6 bg-card/50 backdrop-blur-sm border border-border/30 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5">
              <h3 className="text-lg font-semibold text-foreground mb-1">Activity & Audit Trail</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Tracks every action with full input-output visibility and timestamps.
              </p>
              <div className="rounded-xl bg-muted/30 p-3 space-y-1.5 border border-border/20">
                <p className="text-[10px] font-medium text-foreground mb-2">📋 Recent Activity</p>
                {[
                  { label: "Venue Booking", status: "COMPLETED", color: "bg-success/20 text-success" },
                  { label: "Vendor Review", status: "FAILED", color: "bg-destructive/20 text-destructive" },
                  { label: "Budget Approval", status: "PROCESSING", color: "bg-warning/20 text-warning" },
                  { label: "Guest Invites", status: "PROCESSING", color: "bg-warning/20 text-warning" },
                  { label: "Catering Finalized", status: "COMPLETED", color: "bg-success/20 text-success" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-1 hover:bg-muted/30 rounded-lg px-1.5 -mx-1.5 transition-colors">
                    <span className="text-[10px] text-foreground">{item.label}</span>
                    <span className={`text-[8px] font-medium px-2 py-0.5 rounded-full ${item.color}`}>{item.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bento-card group rounded-2xl p-6 bg-card/50 backdrop-blur-sm border border-border/30 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5">
              <h3 className="text-lg font-semibold text-foreground mb-1">Multi-Vendor Support</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Whether it's caterers, photographers or DJs, we support every vendor type.
              </p>
              <div className="rounded-xl bg-muted/30 p-3 border border-border/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-medium text-foreground">Add Vendor</span>
                  <span className="text-[9px] text-primary font-medium cursor-pointer hover:underline">+ Add</span>
                </div>
                {[
                  { name: "Elite Catering", date: "23rd March", active: false },
                  { name: "Lens Studio", date: "21st March", active: true },
                  { name: "Sound Systems Pro", date: "3rd May", active: false },
                ].map((v, i) => (
                  <div key={i} className="flex items-center justify-between py-1.5 border-t border-border/20">
                    <div>
                      <span className="text-[10px] text-foreground">{v.name}</span>
                      <span className="text-[8px] text-muted-foreground ml-2">{v.date}</span>
                    </div>
                    <div className={`w-7 h-3.5 rounded-full transition-colors ${v.active ? 'bg-primary' : 'bg-muted'}`}>
                      <div className={`w-2.5 h-2.5 rounded-full bg-background mt-0.5 transition-transform ${v.active ? 'translate-x-3.5' : 'translate-x-0.5'}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bento-card group rounded-2xl p-6 bg-card/50 backdrop-blur-sm border border-border/30 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5">
              <h3 className="text-lg font-semibold text-foreground mb-1">Deploy in seconds</h3>
              <p className="text-sm text-muted-foreground mb-4">
                With our blazing fast platform, you can create and publish event pages instantly.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {["📅 Events", "👥 Teams", "💬 Messages", "📊 Analytics", "🎯 Goals", "🏪 Vendors", "📋 Tasks", "💰 Budget", "🎨 Templates"].map((tag) => (
                  <span key={tag} className="text-[10px] font-medium px-2.5 py-1 rounded-full border border-border/30 bg-muted/30 text-foreground transition-all duration-200 hover:bg-primary/10 hover:border-primary/30 hover:text-primary cursor-default">{tag}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
              <div key={i} className="bento-card group rounded-xl p-4 bg-card/50 backdrop-blur-sm border border-border/30 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <f.icon className="w-4 h-4 text-primary" />
                </div>
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

export default SaasBentoFeatures;
