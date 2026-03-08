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
    gsap.fromTo(ctaRef.current.querySelectorAll('.cta-el'),
      { y: 30, opacity: 0, filter: 'blur(6px)' },
      { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.7, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: ctaRef.current, start: 'top 80%' },
      }
    );
  }, []);

  return (
    <section className="relative py-28 overflow-hidden bg-transparent">
      {/* Soft radial glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 50% 50%, hsl(var(--primary) / 0.06) 0%, transparent 70%)',
      }} />

      <div className="container mx-auto px-4 lg:px-8">
        <div
          ref={ctaRef}
          className="relative max-w-3xl mx-auto rounded-3xl border border-border/60 bg-card/80 backdrop-blur-xl px-8 py-16 md:px-14 md:py-20 text-center overflow-hidden"
          style={{
            boxShadow: '0 25px 80px -20px hsl(var(--foreground) / 0.1), 0 10px 30px -10px hsl(var(--primary) / 0.06)',
          }}
        >
          <div className="absolute inset-0 pointer-events-none rounded-3xl" style={{
            background: 'radial-gradient(ellipse at 50% 0%, hsl(var(--primary) / 0.04) 0%, transparent 60%)',
          }} />

          <div className="relative z-10">
            <h2 className="cta-el text-4xl md:text-5xl font-bold mb-5 text-foreground">
              Ready to transform your events?
            </h2>
            <p className="cta-el text-sm md:text-base mb-8 max-w-xl mx-auto text-muted-foreground">
              Join thousands of event planners who trust Event Nest to deliver unforgettable experiences.
            </p>
            <div className="cta-el">
              <Button size="lg" asChild className="group/btn rounded-full px-8 py-3 text-sm font-medium border-none text-white transition-all duration-300 hover:shadow-elevated gradient-primary">
                <Link to="/signup">
                  Get Started Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
