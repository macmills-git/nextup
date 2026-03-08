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
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: ctaRef.current, start: 'top 80%' },
      }
    );
  }, []);

  return (
    <section className="relative py-28 overflow-hidden bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div
          ref={ctaRef}
          className="relative max-w-3xl mx-auto rounded-2xl border-2 border-border bg-primary text-primary-foreground px-8 py-16 md:px-14 md:py-20 text-center shadow-brutal-xl"
        >
          {/* Decorative elements */}
          <div className="absolute top-4 right-4 w-12 h-12 bg-secondary border-2 border-border rounded-lg rotate-12 shadow-brutal" />
          <div className="absolute bottom-6 left-6 w-10 h-10 bg-accent border-2 border-border rounded-full shadow-brutal" />

          <div className="relative z-10">
            <h2 className="cta-el text-4xl md:text-5xl font-black mb-5">
              Ready to transform your events?
            </h2>
            <p className="cta-el text-sm md:text-base mb-8 max-w-xl mx-auto opacity-90 font-medium">
              Join thousands of event planners who trust Event Nest to deliver unforgettable experiences.
            </p>
            <div className="cta-el">
              <Button size="lg" asChild className="group/btn rounded-xl px-8 py-3 text-sm font-black border-2 border-border bg-background text-foreground shadow-brutal-lg brutal-hover">
                <Link to="/signup">
                  Get Started Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-150 group-hover/btn:translate-x-1" />
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
