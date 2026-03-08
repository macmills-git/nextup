import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CTASection = () => {
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ctaRef.current) return;
    gsap.fromTo(ctaRef.current.querySelectorAll('.cta-el'), { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: ctaRef.current, start: 'top 80%' },
    });
  }, []);

  return (
    <section className="relative py-28 overflow-hidden bg-transparent">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(hsl(var(--foreground) / 0.15) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground) / 0.15) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />
      <div ref={ctaRef} className="relative z-10 text-center max-w-3xl mx-auto px-4">
        <h2 className="cta-el text-4xl md:text-5xl font-bold mb-5 text-foreground">
          Ready to transform your events?
        </h2>
        <p className="cta-el text-sm md:text-base mb-8 max-w-xl mx-auto text-muted-foreground">
          Join thousands of event planners who trust Event Nest to deliver unforgettable experiences.
        </p>
        <div className="cta-el">
          <Button size="lg" asChild className="rounded-full px-8 py-3 text-sm font-medium border-none text-white transition-transform duration-200 hover:scale-105 gradient-primary" style={{
            boxShadow: '0 4px 20px hsl(225, 90%, 60%, 0.35)',
          }}>
            <Link to="/signup">Get Started Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
