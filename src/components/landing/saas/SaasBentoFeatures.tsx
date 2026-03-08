import { useEffect, useRef } from "react";
import { Zap, Shield, Globe, DollarSign, Clock, Users, CheckCircle, BarChart3 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  { icon: Zap, title: "Real-time Updates", desc: "Instant notifications for all event changes across your team." },
  { icon: Shield, title: "Secure & Private", desc: "Enterprise-grade encryption keeps your event data safe." },
  { icon: DollarSign, title: "Budget Tracking", desc: "Track every dollar with automated expense categorization." },
  { icon: Clock, title: "24/7 Support", desc: "Our team is available around the clock to help you succeed." },
  { icon: Globe, title: "Multi-event", desc: "Manage multiple events simultaneously from one dashboard." },
  { icon: BarChart3, title: "Analytics", desc: "Detailed charts and exportable reports for every event." },
  { icon: Users, title: "Team Roles", desc: "Role-based access control for your entire organization." },
  { icon: CheckCircle, title: "Integrations", desc: "Connect with your favorite tools and services seamlessly." },
];

const SaasBentoFeatures = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current.querySelectorAll('.feat-card'),
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%' }
      }
    );
    gsap.fromTo(ref.current.querySelectorAll('.feat-heading'),
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 90%' }
      }
    );
  }, []);

  return (
    <section className="py-24 bg-background relative">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <p className="feat-heading text-sm text-primary font-medium mb-4">Features</p>
          <h2 className="feat-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
            Everything you need to plan events
          </h2>
          <p className="feat-heading text-base text-muted-foreground max-w-lg mx-auto">
            From event creation to vendor management, everything in one place.
          </p>
        </div>

        <div ref={ref} className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border/10 border border-border/15 rounded-2xl overflow-hidden">
          {features.map((f, i) => (
            <div key={i} className="feat-card bg-card p-6 transition-colors duration-200 hover:bg-muted/30">
              <div className="w-9 h-9 rounded-lg bg-muted/50 flex items-center justify-center mb-4">
                <f.icon className="w-4 h-4 text-foreground" />
              </div>
              <h4 className="text-sm font-semibold text-foreground mb-1.5">{f.title}</h4>
              <p className="text-[13px] text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SaasBentoFeatures;
