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

const logos = ["FeatherDev", "Boltshift", "GlobalBank", "Lightbox", "Northwind"];

const SaasWorldMapSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current.querySelectorAll('.wm-el'),
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' }
      }
    );
  }, []);

  return (
    <section ref={ref} className="relative py-28 overflow-hidden bg-[#0a0a0a] text-white">
      {/* Starfield */}
      <div className="absolute inset-0 opacity-40 pointer-events-none"
           style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 0.5px, transparent 1px)', backgroundSize: '40px 40px' }} />
      {/* Vertical pin-stripes */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none"
           style={{ backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.6) 0 1px, transparent 1px 80px)' }} />

      {/* Bottom coral horizon arch */}
      <div aria-hidden className="pointer-events-none absolute -bottom-[55%] left-1/2 -translate-x-1/2 w-[160%] aspect-square rounded-full"
           style={{ background: 'radial-gradient(circle at center, hsl(12 95% 55%) 0%, hsl(15 90% 45%) 25%, hsl(20 70% 25%) 42%, transparent 50%)' }} />
      <div aria-hidden className="pointer-events-none absolute -bottom-[58%] left-1/2 -translate-x-1/2 w-[160%] aspect-square rounded-full border border-primary/30" />

      <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
        <div className="wm-el inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-1.5 mb-8 backdrop-blur-sm">
          <span className="text-xs text-white/70">Global Reach</span>
          <span className="w-5 h-5 rounded-full bg-primary flex items-center justify-center"><ArrowRight className="w-3 h-3" /></span>
        </div>

        <h2 className="wm-el text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-[1]">
          <span className="text-white">Trusted </span>
          <span className="text-white/40">worldwide</span>
        </h2>
        <p className="wm-el text-base text-white/60 max-w-xl mx-auto mb-12">
          Event teams in over 150 countries run their operations on Nested — from boutique studios to enterprise organizations.
        </p>

        <div className="wm-el grid grid-cols-2 md:grid-cols-4 gap-px max-w-4xl mx-auto rounded-2xl overflow-hidden bg-white/10 mb-16 backdrop-blur-sm">
          {stats.map((stat, i) => (
            <div key={i} className="bg-[#0a0a0a]/80 p-8 text-center">
              <p className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-xs text-white/50">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Trusted logos row */}
        <p className="wm-el text-xs text-white/40 mb-5">Trusted by 200+ companies</p>
        <div className="wm-el flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {logos.map((l) => (
            <span key={l} className="text-base font-semibold text-white/30 tracking-tight">{l}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SaasWorldMapSection;
