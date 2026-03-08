import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const HeroSection = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    const tl = gsap.timeline();
    const els = contentRef.current.querySelectorAll('.hero-anim');
    tl.fromTo(els, { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out', delay: 0.2,
    });
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-background">
      {/* Decorative shapes */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-secondary border-2 border-border rounded-2xl rotate-12 shadow-brutal opacity-60" />
      <div className="absolute top-40 left-10 w-24 h-24 bg-accent border-2 border-border rounded-full shadow-brutal opacity-50" />
      <div className="absolute bottom-32 right-20 w-20 h-20 bg-primary/20 border-2 border-border rounded-lg -rotate-6 shadow-brutal opacity-40" />
      <div className="absolute bottom-40 left-20 w-16 h-16 bg-destructive/20 border-2 border-border rounded-2xl rotate-45 shadow-brutal opacity-30" />

      <div ref={contentRef} className="relative z-10 container mx-auto px-4 lg:px-8 pt-32 pb-16 lg:pt-40 lg:pb-20 flex flex-col items-center justify-center min-h-screen">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="hero-anim inline-flex items-center gap-2 text-xs font-bold bg-secondary border-2 border-border px-4 py-1.5 rounded-lg shadow-brutal mb-8">
            <Sparkles className="w-3.5 h-3.5" />
            Event Planning Reimagined
          </div>

          <h1 className="hero-anim text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-[0.95] tracking-tight">
            <span className="text-foreground">Your All-in-One</span>
            <br />
            <span className="inline-block bg-primary text-primary-foreground px-4 py-1 -rotate-1 border-2 border-border shadow-brutal-lg mt-2">
              Event Companion
            </span>
          </h1>

          <p className="hero-anim text-base md:text-lg mb-10 max-w-xl mx-auto text-muted-foreground font-medium">
            Simplify event planning, vendor management, and team coordination with cutting-edge tools designed for everyone.
          </p>

          <div className="hero-anim flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild className="rounded-xl px-8 py-4 text-sm font-black border-2 border-border text-primary-foreground bg-primary shadow-brutal-lg brutal-hover">
              <Link to="/signup">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="rounded-xl px-8 py-4 text-sm font-bold border-2 border-border bg-background shadow-brutal brutal-hover">
              <Link to="/features">See Features</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
