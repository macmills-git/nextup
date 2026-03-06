import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Users, Calendar, MessageSquare } from "lucide-react";
import { Cobe } from "@/components/eldoraui/cobe-globe";
import { useTheme } from "@/contexts/ThemeContext";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const HeroSection = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [goalValue, setGoalValue] = useState(350);

  useEffect(() => {
    if (!contentRef.current) return;
    const tl = gsap.timeline();
    const els = contentRef.current.querySelectorAll('.hero-anim');
    tl.fromTo(els, { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out', delay: 0.2,
    });
  }, []);

  useEffect(() => {
    if (!cardsRef.current) return;
    const cards = cardsRef.current.querySelectorAll('.mini-card');
    gsap.fromTo(cards, { y: 30, opacity: 0, scale: 0.95 }, {
      y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.06, ease: 'back.out(1.2)', delay: 0.6,
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

      <div ref={contentRef} className="relative z-10 container mx-auto px-4 lg:px-8 pt-32 pb-8 lg:pt-40 lg:pb-12">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="hero-anim text-4xl md:text-6xl lg:text-7xl font-bold mb-5 leading-tight" style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 700 }}>
            <span style={{
              backgroundImage: 'linear-gradient(135deg, hsl(var(--foreground)) 0%, hsl(var(--muted-foreground)) 50%, hsl(var(--foreground)) 100%)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'gradientTextFlow 4s ease infinite',
            }}>
              Your All-in-One
              <br />
              Event Companion
            </span>
          </h1>
          <p className="hero-anim text-sm md:text-base mb-8 max-w-xl mx-auto text-muted-foreground">
            Simplify event planning, vendor management, and team coordination with cutting-edge tools designed for everyone.
          </p>
          <div className="hero-anim flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
            <Button size="lg" asChild className="rounded-full px-8 py-3 text-sm font-medium border-none text-white transition-transform duration-200 hover:scale-105 gradient-primary" style={{
              boxShadow: '0 4px 20px hsl(225, 90%, 60%, 0.35)',
            }}>
              <Link to="/signup">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>

        {/* Mini dashboard cards */}
        <div ref={cardsRef} className="grid grid-cols-2 md:grid-cols-4 gap-2.5 max-w-4xl mx-auto">
          <div className="mini-card bg-card/80 backdrop-blur-sm border border-border rounded-xl p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-elevated">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-3 h-3 text-primary" />
              </div>
              <span className="text-[10px] text-muted-foreground">Revenue</span>
            </div>
            <p className="text-lg font-bold text-foreground">$15,231</p>
            <p className="text-[10px] text-success">+20.1%</p>
            <svg viewBox="0 0 100 30" className="w-full h-6 mt-1" fill="none">
              <polyline points="0,25 15,22 30,18 45,20 60,12 75,15 100,5" stroke="hsl(var(--primary))" strokeWidth="1.5" fill="none" />
            </svg>
          </div>

          <div className="mini-card bg-card/80 backdrop-blur-sm border border-border rounded-xl p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-elevated">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center">
                <Users className="w-3 h-3 text-primary" />
              </div>
              <span className="text-[10px] text-muted-foreground">Vendors</span>
            </div>
            <p className="text-lg font-bold text-foreground">+2,350</p>
            <p className="text-[10px] text-success">+180.1%</p>
            <div className="flex items-end gap-0.5 mt-1 h-6">
              {[60,75,85,70,90,65,80,55,95,72].map((h,i) => (
                <div key={i} className="flex-1 bg-foreground/60 rounded-[1px]" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>

          <div className="mini-card bg-card/80 backdrop-blur-sm border border-border rounded-xl p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-elevated">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center">
                <Calendar className="w-3 h-3 text-primary" />
              </div>
              <span className="text-[10px] text-muted-foreground">June 2023</span>
            </div>
            <div className="grid grid-cols-7 gap-[2px] text-center text-[7px] text-muted-foreground">
              {["S","M","T","W","T","F","S"].map((d,i) => <span key={i}>{d}</span>)}
              {[28,29,30,1,2,3,4,5,6,7,8,9,10,11,12,13,14].map((d,i) => (
                <span key={i} className={`w-3.5 h-3.5 flex items-center justify-center rounded-sm mx-auto ${d === 5 || d === 6 || d === 7 ? 'bg-primary/20 text-foreground' : d === 13 ? 'bg-primary text-primary-foreground' : 'text-muted-foreground/60'}`}>{d}</span>
              ))}
            </div>
          </div>

          <div className="mini-card bg-card/80 backdrop-blur-sm border border-border rounded-xl p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-elevated">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-3 h-3 text-primary" />
              </div>
              <span className="text-[10px] text-muted-foreground">Move Goal</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <button onClick={() => setGoalValue(Math.max(100, goalValue - 10))} className="w-5 h-5 rounded-full border border-border flex items-center justify-center text-muted-foreground text-[8px]">−</button>
              <div className="text-center">
                <p className="text-xl font-bold text-foreground">{goalValue}</p>
                <p className="text-[7px] text-muted-foreground uppercase tracking-wider">Cal/Day</p>
              </div>
              <button onClick={() => setGoalValue(goalValue + 10)} className="w-5 h-5 rounded-full border border-border flex items-center justify-center text-muted-foreground text-[8px]">+</button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 opacity-40">
        <span className="text-[9px] uppercase tracking-widest text-muted-foreground">Scroll</span>
        <div className="w-4 h-7 rounded-full border border-muted-foreground/30 flex items-start justify-center p-0.5">
          <div className="w-1 h-1.5 rounded-full bg-muted-foreground" style={{ animation: 'energyOrbMove 2s ease-in-out infinite' }} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
