import { useEffect, useRef } from "react";
import { Bot, Zap, Shield, Globe, DollarSign, Clock, Users, CheckCircle, BarChart3 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BentoFeatures = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current.querySelectorAll('.bento-card'),
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%' }
      }
    );
    gsap.fromTo(ref.current.querySelectorAll('.bento-heading'),
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 90%' }
      }
    );
  }, []);

  return (
    <section className="py-28 bg-background relative">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <span className="bento-heading inline-flex items-center text-xs font-bold text-foreground bg-accent border-2 border-border px-4 py-1 rounded-lg shadow-brutal mb-4">
            Features
          </span>
          <h2 className="bento-heading text-3xl md:text-5xl font-black text-foreground mb-3">
            Packed with powerful features
          </h2>
          <p className="bento-heading text-sm text-muted-foreground max-w-lg mx-auto font-medium">
            From event creation to vendor management, Event Nest has tools for literally everything.
          </p>
        </div>

        <div ref={ref} className="max-w-6xl mx-auto space-y-5">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bento-card group rounded-2xl p-6 bg-card border-2 border-border shadow-brutal transition-all duration-150 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal-lg">
              <h3 className="text-lg font-bold text-foreground mb-1">AI Event Planning</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Generate event plans, budgets and vendor recommendations with a single prompt.
              </p>
              <div className="rounded-xl bg-muted p-3 space-y-2 border-2 border-border">
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-lg bg-primary/20 border border-border flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot className="w-2.5 h-2.5 text-primary" />
                  </div>
                  <div className="bg-card rounded-lg px-2.5 py-1.5 text-[11px] text-foreground border-2 border-border shadow-brutal">
                    I found 3 venues in your budget range. Here's a 4-week timeline with vendor picks.
                  </div>
                </div>
                <div className="flex items-start gap-2 flex-row-reverse">
                  <div className="w-5 h-5 rounded-lg bg-secondary border border-border flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[8px] font-bold text-foreground">U</span>
                  </div>
                  <div className="bg-secondary rounded-lg px-2.5 py-1.5 text-[11px] text-foreground border-2 border-border">
                    Perfect, share the timeline!
                  </div>
                </div>
              </div>
            </div>

            <div className="bento-card group rounded-2xl p-6 bg-card border-2 border-border shadow-brutal transition-all duration-150 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal-lg">
              <h3 className="text-lg font-bold text-foreground mb-1">Activity & Audit Trail</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Tracks every action with full input-output visibility and timestamps.
              </p>
              <div className="rounded-xl bg-muted p-3 space-y-1.5 border-2 border-border">
                <p className="text-[10px] font-bold text-foreground mb-2">📋 Recent Activity</p>
                {[
                  { label: "Venue Booking", status: "COMPLETED", color: "bg-success" },
                  { label: "Vendor Review", status: "FAILED", color: "bg-destructive" },
                  { label: "Budget Approval", status: "PROCESSING", color: "bg-warning" },
                  { label: "Guest Invites", status: "PROCESSING", color: "bg-warning" },
                  { label: "Catering Finalized", status: "COMPLETED", color: "bg-success" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-1 hover:bg-card rounded px-1.5 -mx-1.5 transition-colors">
                    <span className="text-[10px] font-medium text-foreground">{item.label}</span>
                    <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-md text-white border border-border ${item.color}`}>{item.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bento-card group rounded-2xl p-6 bg-card border-2 border-border shadow-brutal transition-all duration-150 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal-lg">
              <h3 className="text-lg font-bold text-foreground mb-1">Multi-Vendor Support</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Whether it's caterers, photographers or DJs, we support every vendor type.
              </p>
              <div className="rounded-xl bg-muted p-3 border-2 border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-foreground">Add Vendor</span>
                  <span className="text-[9px] text-primary font-bold cursor-pointer hover:underline">+ Add</span>
                </div>
                {[
                  { name: "Elite Catering", date: "23rd March", active: false },
                  { name: "Lens Studio", date: "21st March", active: true },
                  { name: "Sound Systems Pro", date: "3rd May", active: false },
                ].map((v, i) => (
                  <div key={i} className="flex items-center justify-between py-1.5 border-t-2 border-border">
                    <div>
                      <span className="text-[10px] font-medium text-foreground">{v.name}</span>
                      <span className="text-[8px] text-muted-foreground ml-2">{v.date}</span>
                    </div>
                    <div className={`w-6 h-3 rounded-md border border-border transition-colors ${v.active ? 'bg-primary' : 'bg-muted'}`} />
                  </div>
                ))}
              </div>
            </div>

            <div className="bento-card group rounded-2xl p-6 bg-card border-2 border-border shadow-brutal transition-all duration-150 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal-lg">
              <h3 className="text-lg font-bold text-foreground mb-1">Deploy in seconds</h3>
              <p className="text-sm text-muted-foreground mb-4">
                With our blazing fast platform, you can create and publish event pages instantly.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {["📅 Events", "👥 Teams", "💬 Messages", "📊 Analytics", "🎯 Goals", "🏪 Vendors", "📋 Tasks", "💰 Budget", "🎨 Templates"].map((tag) => (
                  <span key={tag} className="text-[10px] font-bold px-2.5 py-1 rounded-lg border-2 border-border bg-muted text-foreground transition-all duration-150 hover:bg-secondary hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-brutal cursor-default">{tag}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { icon: Zap, title: "Real-time Updates", desc: "Instant notifications for all event changes.", bg: "bg-secondary" },
              { icon: Shield, title: "Secure & Private", desc: "Enterprise-grade encrypted data storage.", bg: "bg-accent/20" },
              { icon: DollarSign, title: "Budget Tracking", desc: "No cap, no lock, no credit card required.", bg: "bg-primary/10" },
              { icon: Clock, title: "24/7 Support", desc: "We are available 100% of the time.", bg: "bg-secondary" },
              { icon: Globe, title: "Multi-event", desc: "Manage multiple events simultaneously.", bg: "bg-accent/20" },
              { icon: BarChart3, title: "Analytics", desc: "Detailed charts and exportable reports.", bg: "bg-primary/10" },
              { icon: Users, title: "Team Roles", desc: "Role-based access for your entire team.", bg: "bg-secondary" },
              { icon: CheckCircle, title: "And more", desc: "Everything else you need for events.", bg: "bg-accent/20" },
            ].map((f, i) => (
              <div key={i} className="bento-card group rounded-xl p-4 bg-card border-2 border-border shadow-brutal transition-all duration-150 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal-lg">
                <div className={`w-8 h-8 rounded-lg ${f.bg} border-2 border-border flex items-center justify-center mb-3`}>
                  <f.icon className="w-4 h-4 text-foreground" />
                </div>
                <h4 className="text-sm font-bold text-foreground mb-0.5">{f.title}</h4>
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
