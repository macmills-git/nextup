import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Play } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const SaasCTASection = () => {
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ctaRef.current) return;
    gsap.fromTo(ctaRef.current.querySelectorAll('.cta-el'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: ctaRef.current, start: 'top 80%' },
      }
    );
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] text-white">
      {/* Starfield */}
      <div className="absolute inset-0 opacity-30 pointer-events-none"
           style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 0.5px, transparent 1px)', backgroundSize: '50px 50px' }} />
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
           style={{ backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.6) 0 1px, transparent 1px 90px)' }} />

      {/* Coral horizon arch from the bottom */}
      <div aria-hidden className="pointer-events-none absolute -bottom-[60%] left-1/2 -translate-x-1/2 w-[170%] aspect-square rounded-full"
           style={{ background: 'radial-gradient(circle at center, hsl(12 95% 55%) 0%, hsl(15 90% 45%) 22%, hsl(20 70% 22%) 40%, transparent 48%)' }} />

      <div ref={ctaRef} className="relative py-32">
        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
          {/* Pill announcement */}
          <Link to="/pricing" className="cta-el inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 pl-4 pr-1.5 py-1.5 mb-10 backdrop-blur-sm hover:bg-white/10 transition">
            <span className="text-xs text-white/80">New: A.R.C.H. workflow automation is live</span>
            <span className="w-6 h-6 rounded-full bg-primary flex items-center justify-center"><ArrowRight className="w-3 h-3" /></span>
          </Link>

          <h2 className="cta-el text-4xl md:text-6xl lg:text-7xl font-bold leading-[1] tracking-tight mb-6">
            <span className="text-white">Connect your Current Stack</span><br/>
            <span className="text-white/40">and Start Automating</span>
          </h2>

          <p className="cta-el text-base md:text-lg text-white/60 max-w-xl mx-auto mb-10">
            Slot Nested into your tools. Run automations, sync vendors, close events — effortlessly.
          </p>

          <div className="cta-el flex flex-wrap items-center justify-center gap-4 mb-16">
            <button className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white bg-white/5 hover:bg-white/10 transition backdrop-blur-sm">
              <span className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center"><Play className="w-3 h-3 fill-current" /></span>
              Watch Demo
            </button>
            <Link to="/signup" className="inline-flex items-center rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white shadow-[0_8px_30px_hsl(12_95%_55%/0.4)] hover:scale-105 transition">
              Get started for free
            </Link>
          </div>

          {/* Floating tool chips along the horizon */}
          <div className="cta-el relative max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-3 opacity-80">
            {[
              { e: "📅", n: "Google Calendar" },
              { e: "💬", n: "Slack" },
              { e: "💳", n: "Stripe" },
              { e: "📊", n: "Notion" },
              { e: "📧", n: "Gmail" },
              { e: "🎟️", n: "Eventbrite" },
            ].map((t, i) => (
              <div key={i} className="flex items-center gap-2 rounded-full bg-white/5 border border-white/10 pl-2 pr-4 py-1.5 backdrop-blur-sm">
                <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs">{t.e}</span>
                <span className="text-xs text-white/80 font-medium">{t.n}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SaasCTASection;
