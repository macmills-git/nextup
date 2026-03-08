import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "20K+", label: "Event professionals" },
  { value: "150+", label: "Countries supported" },
  { value: "99.9%", label: "Uptime guaranteed" },
  { value: "4.9/5", label: "Average rating" },
];

const SaasWorldMapSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current.querySelectorAll('.wm-el'),
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' }
      }
    );
  }, []);

  return (
    <section ref={ref} className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <p className="wm-el text-sm text-primary font-medium mb-4">Global Reach</p>
        <h2 className="wm-el text-3xl md:text-5xl font-bold mb-4 text-foreground">
          Trusted worldwide
        </h2>
        <p className="wm-el text-base text-muted-foreground max-w-lg mx-auto mb-14">
          Our platform is used by event professionals in over 150 countries.
        </p>

        <div className="wm-el grid grid-cols-2 md:grid-cols-4 gap-px max-w-4xl mx-auto border border-border/15 rounded-2xl overflow-hidden bg-border/10">
          {stats.map((stat, i) => (
            <div key={i} className="bg-card p-8 text-center">
              <p className="text-3xl md:text-4xl font-bold text-foreground mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="wm-el mt-10">
          <a href="#" className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors group">
            See all case studies <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default SaasWorldMapSection;
