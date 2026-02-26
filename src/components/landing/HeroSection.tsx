import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Cobe } from "@/components/eldoraui/cobe-globe";
import PhotonBeam from "@/components/eldoraui/photon-beam";

const FrameLines = () => (
  <>
    {/* Left frame line */}
    <div className="absolute left-[5%] top-[10%] bottom-[15%] w-px hidden lg:block" style={{ zIndex: 2 }}>
      {/* Main vertical line */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.04) 100%)',
        boxShadow: '0 0 8px rgba(255,255,255,0.05)',
      }} />
      {/* Diagonal segment */}
      <div className="absolute top-[30%] w-6 h-px" style={{
        background: 'rgba(255,255,255,0.1)',
        transform: 'rotate(35deg)',
        transformOrigin: 'left center',
      }} />
      {/* Energy orb */}
      <div className="absolute left-[-3px] w-[7px] h-[7px] rounded-full" style={{
        background: 'radial-gradient(circle, white 0%, #00d4ff 40%, transparent 70%)',
        boxShadow: '0 0 10px rgba(0,255,255,0.8), 0 0 25px rgba(0,255,255,0.4)',
        animation: 'energyOrbMove 3.5s linear infinite',
      }}>
        {/* Trail */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[3px] h-8 -translate-y-full" style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(0,255,255,0.3) 100%)',
          filter: 'blur(2px)',
        }} />
      </div>
      {/* Ambient glow */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, rgba(0,255,255,0.05) 0%, transparent 50%, rgba(59,130,246,0.05) 100%)',
        backgroundSize: '100% 200%',
        animation: 'ambientLineGlow 7s ease infinite alternate',
      }} />
    </div>

    {/* Right frame line (mirrored) */}
    <div className="absolute right-[5%] top-[10%] bottom-[15%] w-px hidden lg:block" style={{ zIndex: 2 }}>
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.04) 100%)',
        boxShadow: '0 0 8px rgba(255,255,255,0.05)',
      }} />
      <div className="absolute top-[30%] right-0 w-6 h-px" style={{
        background: 'rgba(255,255,255,0.1)',
        transform: 'rotate(-35deg)',
        transformOrigin: 'right center',
      }} />
      <div className="absolute right-[-3px] w-[7px] h-[7px] rounded-full" style={{
        background: 'radial-gradient(circle, white 0%, #00d4ff 40%, transparent 70%)',
        boxShadow: '0 0 10px rgba(0,255,255,0.8), 0 0 25px rgba(0,255,255,0.4)',
        animation: 'energyOrbMove 3.5s linear infinite 1.75s',
      }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[3px] h-8 -translate-y-full" style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(0,255,255,0.3) 100%)',
          filter: 'blur(2px)',
        }} />
      </div>
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, rgba(59,130,246,0.05) 0%, transparent 50%, rgba(0,255,255,0.05) 100%)',
        backgroundSize: '100% 200%',
        animation: 'ambientLineGlow 7s ease infinite alternate-reverse',
      }} />
    </div>
  </>
);

const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#080808]">
      <div className="absolute inset-0 z-0 opacity-60">
        <PhotonBeam
          colorBg="#080808" colorLine="#1a3a5c" colorSignal="#3b82f6"
          useColor2 colorSignal2="#60a5fa" useColor3 colorSignal3="#2563eb"
          bloomStrength={2.5} bloomRadius={0.6} lineCount={60} signalCount={80}
        />
      </div>

      {/* Globe with gradient glow */}
      <div className="absolute inset-0 z-[1] flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] md:w-[650px] md:h-[650px] lg:w-[750px] lg:h-[750px] opacity-30 relative">
          <div className="absolute inset-0 rounded-full" style={{ animation: 'globeGlow 4s ease-in-out infinite' }} />
          <Cobe
            variant="auto-rotation" baseColor="#1e3a5f" markerColor="#3b82f6"
            glowColor="#1e3a5f" dark={1.2} diffuse={2} mapBrightness={6}
            mapBaseBrightness={0.1} opacity={1}
            style={{ maxWidth: "100%", width: "100%", aspectRatio: "1" }}
          />
        </div>
      </div>

      {/* Frame lines */}
      <FrameLines />

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-[2]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div className="relative z-10 container mx-auto px-4 lg:px-8 pt-44 pb-20 lg:pt-60 lg:pb-32">
        <div className="text-center max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.4) 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
          }}>
            Plan all your events in one place
          </h1>
          <p className="text-sm md:text-base mb-10 max-w-xl mx-auto" style={{ color: '#9CA3AF' }}>
            Use our AI-powered platform to manage small to medium event types. Budget, plan, vendor, and let AI do the heavy lifting for you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild className="rounded-full px-8 py-3 text-sm font-medium" style={{
              background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
              color: 'white', boxShadow: '0 0 30px rgba(255,255,255,0.05)'
            }}>
              <Link to="/signup">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button size="lg" asChild className="rounded-full px-8 py-3 text-sm font-medium" style={{
              background: 'linear-gradient(135deg, #4F7CF7, #5B8DFB)',
              border: 'none', color: 'white',
              boxShadow: '0 4px 20px rgba(79,124,247,0.35)',
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
