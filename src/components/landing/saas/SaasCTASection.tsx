import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
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
    <section className="relative py-28 overflow-hidden bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div
          ref={ctaRef}
          className="relative max-w-3xl mx-auto rounded-3xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground px-8 py-16 md:px-14 md:py-20 text-center overflow-hidden"
        >
          {/* Subtle glow circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <h2 className="cta-el text-4xl md:text-5xl font-bold mb-5">
              Ready to transform your events?
            </h2>
            <p className="cta-el text-sm md:text-base mb-8 max-w-xl mx-auto opacity-80">
              Join thousands of event planners who trust Event Nest to deliver unforgettable experiences.
            </p>
            <div className="cta-el">
              <Button size="lg" asChild className="group/btn rounded-full px-8 py-3 text-sm font-semibold bg-background text-foreground hover:bg-background/90 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
                <Link to="/signup">
                  Get Started Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SaasCTASection;
