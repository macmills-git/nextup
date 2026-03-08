import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Cobe } from "@/components/eldoraui/cobe-globe";
import { useTheme } from "@/contexts/ThemeContext";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const HeroSection = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const contentRef = useRef<HTMLDivElement>(null);
  const [hoverBtn, setHoverBtn] = useState(false);

  useEffect(() => {
    if (!contentRef.current) return;
    const tl = gsap.timeline();
    const els = contentRef.current.querySelectorAll('.hero-anim');
    tl.fromTo(els, { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out', delay: 0.2,
    });
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-background">
      {/* Lamp glow effect */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-[600px] md:w-[900px] h-[400px]" style={{
          background: isDark
            ? 'conic-gradient(from 180deg at 50% 50%, hsl(225, 90%, 25%) 0deg, transparent 60deg, transparent 300deg, hsl(225, 90%, 25%) 360deg)'
            : 'conic-gradient(from 180deg at 50% 50%, hsl(225, 90%, 85%) 0deg, transparent 60deg, transparent 300deg, hsl(225, 90%, 85%) 360deg)',
          filter: 'blur(60px)',
          opacity: isDark ? 0.5 : 0.4,
        }} />
      </div>

      {/* Bg gradient */}
      <div className="absolute inset-0 z-0" style={{
        background: isDark
          ? 'radial-gradient(ellipse at center top, hsl(225, 30%, 8%) 0%, hsl(240, 10%, 4%) 60%)'
          : 'radial-gradient(ellipse at center top, hsl(225, 90%, 97%) 0%, hsl(0, 0%, 98%) 60%)',
      }} />

      {/* Globe */}
      <div className="absolute inset-0 z-[1] flex items-center justify-center pointer-events-none">
        <div className={`w-[500px] h-[500px] md:w-[600px] md:h-[600px] lg:w-[700px] lg:h-[700px] relative ${isDark ? 'opacity-20' : 'opacity-10'}`}>
          <Cobe variant="auto-rotation" baseColor={isDark ? "#1e3a5f" : "#93b5e1"} markerColor="#3b82f6" glowColor={isDark ? "#1e3a5f" : "#93b5e1"} dark={isDark ? 1.2 : 0.1} diffuse={2} mapBrightness={isDark ? 6 : 3} mapBaseBrightness={isDark ? 0.1 : 0.5} opacity={1} style={{ maxWidth: "100%", width: "100%", aspectRatio: "1" }} />
        </div>
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-[2]" style={{
        backgroundImage: `linear-gradient(hsl(var(--foreground) / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground) / 0.3) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />

      <div ref={contentRef} className="relative z-10 container mx-auto px-4 lg:px-8 pt-32 pb-16 lg:pt-40 lg:pb-20 flex flex-col items-center justify-center min-h-screen">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="hero-anim text-4xl md:text-6xl lg:text-7xl font-bold mb-5 leading-tight" style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 700 }}>
            <span className="text-primary">Your All-in-One</span>
            <br />
            <span className="text-foreground">Event Companion</span>
          </h1>
          <p className="hero-anim text-sm md:text-base mb-8 max-w-xl mx-auto text-muted-foreground">
            Simplify event planning, vendor management, and team coordination with cutting-edge tools designed for everyone.
          </p>
          <div className="hero-anim flex flex-col sm:flex-row items-center justify-center gap-3">
            {/* Hover border gradient button */}
            <div
              className="relative rounded-full p-[2px] overflow-hidden group"
              onMouseEnter={() => setHoverBtn(true)}
              onMouseLeave={() => setHoverBtn(false)}
              style={{
                background: hoverBtn
                  ? 'linear-gradient(135deg, hsl(var(--primary)), hsl(280, 70%, 60%), hsl(var(--primary)))'
                  : 'hsl(var(--border))',
                transition: 'background 0.3s ease',
              }}
            >
              <div style={{
                position: 'absolute',
                inset: '-50%',
                background: 'conic-gradient(from 0deg, hsl(var(--primary)), hsl(280, 70%, 60%), hsl(var(--primary)))',
                animation: hoverBtn ? 'spin 2s linear infinite' : 'none',
                opacity: hoverBtn ? 1 : 0,
                transition: 'opacity 0.3s',
              }} />
              <Button size="lg" asChild className="relative rounded-full px-8 py-3 text-sm font-medium border-none text-white transition-all duration-300 gradient-primary z-10">
                <Link to="/signup">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
