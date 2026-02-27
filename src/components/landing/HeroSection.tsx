import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Cobe } from "@/components/eldoraui/cobe-globe";
import PhotonBeam from "@/components/eldoraui/photon-beam";
import { useTheme } from "@/contexts/ThemeContext";

const FrameLines = () => (
  <>
    {/* Left frame line */}
    <div className="absolute left-[5%] top-[10%] bottom-[15%] w-px hidden lg:block" style={{ zIndex: 2 }}>
      <div className="absolute inset-0 bg-gradient-to-b from-primary/15 to-primary/5" style={{ boxShadow: '0 0 8px hsl(225 90% 60% / 0.05)' }} />
      <div className="absolute top-[30%] w-6 h-px bg-primary/10" style={{ transform: 'rotate(35deg)', transformOrigin: 'left center' }} />
      <div className="absolute left-[-3px] w-[7px] h-[7px] rounded-full" style={{
        background: 'radial-gradient(circle, white 0%, hsl(190, 100%, 50%) 40%, transparent 70%)',
        boxShadow: '0 0 10px hsl(180, 100%, 50%, 0.8), 0 0 25px hsl(180, 100%, 50%, 0.4)',
        animation: 'energyOrbMove 3.5s linear infinite',
      }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[3px] h-8 -translate-y-full" style={{
          background: 'linear-gradient(180deg, transparent 0%, hsl(180, 100%, 50%, 0.3) 100%)', filter: 'blur(2px)',
        }} />
      </div>
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, hsl(180, 100%, 50%, 0.05) 0%, transparent 50%, hsl(225, 90%, 60%, 0.05) 100%)',
        backgroundSize: '100% 200%', animation: 'ambientLineGlow 7s ease infinite alternate',
      }} />
    </div>
    {/* Right frame line (mirrored) */}
    <div className="absolute right-[5%] top-[10%] bottom-[15%] w-px hidden lg:block" style={{ zIndex: 2 }}>
      <div className="absolute inset-0 bg-gradient-to-b from-primary/15 to-primary/5" style={{ boxShadow: '0 0 8px hsl(225 90% 60% / 0.05)' }} />
      <div className="absolute top-[30%] right-0 w-6 h-px bg-primary/10" style={{ transform: 'rotate(-35deg)', transformOrigin: 'right center' }} />
      <div className="absolute right-[-3px] w-[7px] h-[7px] rounded-full" style={{
        background: 'radial-gradient(circle, white 0%, hsl(190, 100%, 50%) 40%, transparent 70%)',
        boxShadow: '0 0 10px hsl(180, 100%, 50%, 0.8), 0 0 25px hsl(180, 100%, 50%, 0.4)',
        animation: 'energyOrbMove 3.5s linear infinite 1.75s',
      }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[3px] h-8 -translate-y-full" style={{
          background: 'linear-gradient(180deg, transparent 0%, hsl(180, 100%, 50%, 0.3) 100%)', filter: 'blur(2px)',
        }} />
      </div>
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, hsl(225, 90%, 60%, 0.05) 0%, transparent 50%, hsl(180, 100%, 50%, 0.05) 100%)',
        backgroundSize: '100% 200%', animation: 'ambientLineGlow 7s ease infinite alternate-reverse',
      }} />
    </div>
  </>
);

const HeroSection = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section className="relative min-h-screen overflow-hidden bg-background">
      {isDark && (
        <div className="absolute inset-0 z-0 opacity-60">
          <PhotonBeam
            colorBg="#080808" colorLine="#1a3a5c" colorSignal="#3b82f6"
            useColor2 colorSignal2="#60a5fa" useColor3 colorSignal3="#2563eb"
            bloomStrength={2.5} bloomRadius={0.6} lineCount={60} signalCount={80}
          />
        </div>
      )}

      {!isDark && (
        <div className="absolute inset-0 z-0" style={{
          background: 'radial-gradient(ellipse at center top, hsl(225, 90%, 97%) 0%, hsl(0, 0%, 98%) 60%, hsl(220, 14%, 96%) 100%)',
        }} />
      )}

      {/* Globe */}
      <div className="absolute inset-0 z-[1] flex items-center justify-center pointer-events-none">
        <div className={`w-[500px] h-[500px] md:w-[650px] md:h-[650px] lg:w-[750px] lg:h-[750px] relative ${isDark ? 'opacity-30' : 'opacity-15'}`}>
          <div className="absolute inset-0 rounded-full" style={{ animation: 'globeGlow 4s ease-in-out infinite' }} />
          <Cobe
            variant="auto-rotation" baseColor={isDark ? "#1e3a5f" : "#93b5e1"} markerColor="#3b82f6"
            glowColor={isDark ? "#1e3a5f" : "#93b5e1"} dark={isDark ? 1.2 : 0.1} diffuse={2} mapBrightness={isDark ? 6 : 3}
            mapBaseBrightness={isDark ? 0.1 : 0.5} opacity={1}
            style={{ maxWidth: "100%", width: "100%", aspectRatio: "1" }}
          />
        </div>
      </div>

      <FrameLines />

      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-[2]" style={{
        backgroundImage: `linear-gradient(hsl(var(--foreground) / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground) / 0.3) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />

      <div className="relative z-10 container mx-auto px-4 lg:px-8 pt-44 pb-20 lg:pt-60 lg:pb-32">
        <div className="text-center max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-transparent">
            Plan all your events in one place
          </h1>
          <p className="text-sm md:text-base mb-10 max-w-xl mx-auto text-muted-foreground">
            Use our AI-powered platform to manage small to medium event types. Budget, plan, vendor, and let AI do the heavy lifting for you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild className="rounded-full px-8 py-3 text-sm font-medium border border-border bg-card/80 dark:bg-white/8 text-foreground dark:text-white hover:bg-secondary dark:hover:bg-white/12 backdrop-blur-sm">
              <Link to="/signup">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button size="lg" asChild className="rounded-full px-8 py-3 text-sm font-medium border-none text-white" style={{
              background: 'linear-gradient(135deg, hsl(225, 90%, 60%), hsl(225, 80%, 65%))',
              boxShadow: '0 4px 20px hsl(225, 90%, 60%, 0.35)',
            }}>
              <Link to="/features">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
