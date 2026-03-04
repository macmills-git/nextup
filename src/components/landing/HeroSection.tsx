import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Cobe } from "@/components/eldoraui/cobe-globe";
import PhotonBeam from "@/components/eldoraui/photon-beam";
import { useTheme } from "@/contexts/ThemeContext";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedLogo from "@/components/AnimatedLogo";

gsap.registerPlugin(ScrollTrigger);

const FrameLines = () => (
  <>
    <div className="absolute left-[5%] top-[10%] bottom-[15%] w-px hidden lg:block" style={{ zIndex: 2 }}>
      <div className="absolute inset-0 bg-gradient-to-b from-primary/15 to-primary/5" />
      <div className="absolute left-[-3px] w-[7px] h-[7px] rounded-full" style={{
        background: 'radial-gradient(circle, white 0%, hsl(190, 100%, 50%) 40%, transparent 70%)',
        boxShadow: '0 0 10px hsl(180, 100%, 50%, 0.8)',
        animation: 'energyOrbMove 3.5s linear infinite',
      }} />
    </div>
    <div className="absolute right-[5%] top-[10%] bottom-[15%] w-px hidden lg:block" style={{ zIndex: 2 }}>
      <div className="absolute inset-0 bg-gradient-to-b from-primary/15 to-primary/5" />
      <div className="absolute right-[-3px] w-[7px] h-[7px] rounded-full" style={{
        background: 'radial-gradient(circle, white 0%, hsl(190, 100%, 50%) 40%, transparent 70%)',
        boxShadow: '0 0 10px hsl(180, 100%, 50%, 0.8)',
        animation: 'energyOrbMove 3.5s linear infinite 1.75s',
      }} />
    </div>
  </>
);

const FloatingParticles = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {[...Array(12)].map((_, i) => (
      <div key={i} className="absolute rounded-full bg-primary/10 dark:bg-primary/20" style={{
        width: `${2 + Math.random() * 3}px`,
        height: `${2 + Math.random() * 3}px`,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animation: `floatY ${5 + Math.random() * 6}s ease-in-out infinite ${Math.random() * 5}s`,
      }} />
    ))}
    <div className="absolute top-[15%] left-[8%] w-80 h-80 rounded-full opacity-[0.06] dark:opacity-[0.03]" style={{
      background: 'radial-gradient(circle, hsl(225, 90%, 60%), transparent)',
      filter: 'blur(60px)',
    }} />
    <div className="absolute bottom-[15%] right-[5%] w-96 h-96 rounded-full opacity-[0.05] dark:opacity-[0.02]" style={{
      background: 'radial-gradient(circle, hsl(280, 70%, 60%), transparent)',
      filter: 'blur(80px)',
    }} />
  </div>
);

const HeroSection = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    const tl = gsap.timeline();
    const els = contentRef.current.querySelectorAll('.hero-anim');
    tl.fromTo(els, { y: 60, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out', delay: 0.3,
    });

    gsap.to(contentRef.current, {
      yPercent: 20, opacity: 0.5,
      ease: 'none',
      scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true },
    });
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen overflow-hidden bg-background">
      {isDark && (
        <div className="absolute inset-0 z-0 opacity-60">
          <PhotonBeam colorBg="#080808" colorLine="#1a3a5c" colorSignal="#3b82f6" useColor2 colorSignal2="#60a5fa" useColor3 colorSignal3="#2563eb" bloomStrength={2.5} bloomRadius={0.6} lineCount={60} signalCount={80} />
        </div>
      )}

      {!isDark && (
        <div className="absolute inset-0 z-0" style={{
          background: 'radial-gradient(ellipse at center top, hsl(225, 90%, 97%) 0%, hsl(0, 0%, 98%) 60%, hsl(220, 14%, 96%) 100%)',
        }} />
      )}

      <FloatingParticles />

      {/* Globe */}
      <div className="absolute inset-0 z-[1] flex items-center justify-center pointer-events-none">
        <div className={`w-[500px] h-[500px] md:w-[650px] md:h-[650px] lg:w-[750px] lg:h-[750px] relative ${isDark ? 'opacity-30' : 'opacity-15'}`}>
          <Cobe variant="auto-rotation" baseColor={isDark ? "#1e3a5f" : "#93b5e1"} markerColor="#3b82f6" glowColor={isDark ? "#1e3a5f" : "#93b5e1"} dark={isDark ? 1.2 : 0.1} diffuse={2} mapBrightness={isDark ? 6 : 3} mapBaseBrightness={isDark ? 0.1 : 0.5} opacity={1} style={{ maxWidth: "100%", width: "100%", aspectRatio: "1" }} />
        </div>
      </div>

      <FrameLines />

      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-[2]" style={{
        backgroundImage: `linear-gradient(hsl(var(--foreground) / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground) / 0.3) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />

      <div ref={contentRef} className="relative z-10 container mx-auto px-4 lg:px-8 pt-44 pb-20 lg:pt-60 lg:pb-32">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="hero-anim text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-foreground" style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 700 }}>
            Plan all your events
            <br />
            in one place
          </h1>
          <p className="hero-anim text-sm md:text-base mb-10 max-w-xl mx-auto text-muted-foreground">
            Use our AI-powered platform to manage small to medium event types. Budget, plan, vendor, and let AI do the heavy lifting for you.
          </p>
          <div className="hero-anim flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild className="rounded-full px-8 py-3 text-sm font-medium border border-border bg-card/80 dark:bg-white/8 text-foreground dark:text-white hover:bg-secondary dark:hover:bg-white/12 backdrop-blur-sm transition-transform duration-200 hover:scale-105">
              <Link to="/signup">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button size="lg" asChild className="rounded-full px-8 py-3 text-sm font-medium border-none text-white transition-transform duration-200 hover:scale-105 gradient-primary" style={{
              boxShadow: '0 4px 20px hsl(225, 90%, 60%, 0.35)',
            }}>
              <Link to="/features">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-50">
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-muted-foreground/30 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-muted-foreground" style={{ animation: 'energyOrbMove 2s ease-in-out infinite' }} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
