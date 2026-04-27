import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SaasCTASection = () => {
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ctaRef.current) return;
    gsap.fromTo(ctaRef.current.querySelectorAll('.cta-el'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: ctaRef.current, start: 'top 80%' },
      }
    );
  }, []);

  return (
    <section className="relative overflow-hidden bg-background">
      {/* CTA Section - "Connect your Current Stack" */}
      <div ref={ctaRef} className="py-24 relative">
        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
          {/* Floating icons */}
          <div className="relative max-w-3xl mx-auto mb-8">
            {/* Large radial gradient bg */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-muted/30 blur-3xl pointer-events-none" />

            {/* Floating tool icons */}
            <div className="cta-el relative flex items-center justify-center gap-8 mb-12 py-8">
              {["📘", "🔗", "📊", "💬", "📅"].map((emoji, i) => (
                <div key={i} className={`w-10 h-10 rounded-xl bg-card border border-border/30 shadow-sm flex items-center justify-center ${i % 2 === 0 ? '-mt-4' : 'mt-4'}`}>
                  <span className="text-sm">{emoji}</span>
                </div>
              ))}
            </div>
          </div>

          <h2 className="cta-el text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Connect your Current Stack
            <br />
            and Start Automating
          </h2>

          <Button asChild className="cta-el rounded-full px-8 h-12 text-sm font-semibold bg-foreground text-background hover:bg-foreground/90 transition-all duration-300" style={{
            boxShadow: '0 8px 30px hsl(var(--foreground) / 0.2)',
          }}>
            <Link to="/signup">Start Building for Free</Link>
          </Button>
        </div>
      </div>

    </section>
  );
};

export default SaasCTASection;

