import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const SaasHeroSection = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    const tl = gsap.timeline();
    const els = contentRef.current.querySelectorAll('.hero-anim');
    tl.fromTo(els, { y: 30, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out', delay: 0.2,
    });
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-background">
      {/* Subtle radial gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.08)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,hsl(var(--accent)/0.06)_0%,transparent_40%)]" />
      
      {/* Dot grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }} />

      <div ref={contentRef} className="relative z-10 container mx-auto px-4 lg:px-8 pt-32 pb-16 lg:pt-40 lg:pb-20 flex flex-col items-center justify-center min-h-screen">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="hero-anim inline-flex items-center gap-2 text-xs font-medium bg-primary/10 text-primary px-4 py-1.5 rounded-full mb-8 border border-primary/20">
            <Sparkles className="w-3 h-3" />
            Event Planning Reimagined
          </div>

          <h1 className="hero-anim text-5xl md:text-7xl lg:text-[5.5rem] font-bold mb-6 leading-[1.05] tracking-tight">
            <span className="text-foreground">Your All-in-One</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
              Event Companion
            </span>
          </h1>

          <p className="hero-anim text-base md:text-lg mb-10 max-w-xl mx-auto text-muted-foreground leading-relaxed">
            Simplify event planning, vendor management, and team coordination with cutting-edge tools designed for everyone.
          </p>

          <div className="hero-anim flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button size="lg" asChild className="rounded-full px-8 py-4 text-sm font-semibold bg-primary text-primary-foreground hover:brightness-110 shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5">
              <Link to="/signup">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="rounded-full px-8 py-4 text-sm font-medium border border-border/50 bg-background/50 backdrop-blur-sm hover:bg-muted/50 transition-all duration-300">
              <Link to="/features">See Features</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default SaasHeroSection;
