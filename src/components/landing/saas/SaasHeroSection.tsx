import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const SaasHeroSection = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    const tl = gsap.timeline();
    const els = contentRef.current.querySelectorAll('.hero-anim');
    tl.fromTo(els, { y: 30, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out', delay: 0.2,
    });
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-background">
      <div ref={contentRef} className="relative z-10 container mx-auto px-4 lg:px-8 pt-32 pb-16 lg:pt-44 lg:pb-24 flex flex-col items-center justify-center min-h-screen">
        <div className="text-center max-w-4xl mx-auto">
          {/* Subtitle badge */}
          <p className="hero-anim text-sm md:text-base mb-8 text-muted-foreground">
            For fast moving <span className="text-primary font-semibold">event teams.</span>
          </p>

          <h1 className="hero-anim text-5xl md:text-7xl lg:text-[5rem] font-bold mb-6 leading-[1.08] tracking-tight text-foreground">
            Plan and manage
            <br />
            seamless <span className="text-primary">events</span>
          </h1>

          <p className="hero-anim text-base md:text-lg mb-10 max-w-xl mx-auto text-muted-foreground leading-relaxed">
            We empower planners and teams to create, coordinate, and manage unforgettable events visually
          </p>

          <div className="hero-anim flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button size="lg" asChild className="rounded-full px-8 h-12 text-sm font-semibold bg-foreground text-background hover:bg-foreground/90 transition-all duration-300">
              <Link to="/signup">
                Start building <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="rounded-full px-8 h-12 text-sm font-medium border border-border/40 bg-background hover:bg-muted/50 transition-all duration-300">
              <Link to="/pricing">View pricing</Link>
            </Button>
          </div>

          {/* Social proof bar */}
          <div className="hero-anim mt-16 flex items-center justify-center gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-foreground text-foreground" />
              ))}
            </div>
            <div className="w-px h-5 bg-border/40" />
            <span>Innovative Event Solution 2026 by <span className="font-bold text-foreground">Gartner</span></span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SaasHeroSection;
