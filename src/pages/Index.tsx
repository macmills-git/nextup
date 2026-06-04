import Navbar from "@/components/Navbar";
import SaasHeroSection from "@/components/landing/saas/SaasHeroSection";
import SaasLeadersCarousel from "@/components/landing/saas/SaasLeadersCarousel";
import SaasMacBookShowcase from "@/components/landing/saas/SaasMacBookShowcase";
import SaasBentoFeatures from "@/components/landing/saas/SaasBentoFeatures";
import SaasWorldMapSection from "@/components/landing/saas/SaasWorldMapSection";
import SaasTestimonialWall from "@/components/landing/saas/SaasTestimonialWall";
import SaasCTASection from "@/components/landing/saas/SaasCTASection";
import SaasFooter from "@/components/landing/saas/SaasFooter";

const Index = () => {
  return (
    <div className="min-h-screen relative z-[1] bg-secondary/40">
      <Navbar />

      {/* Hero — clean light surface */}
      <div className="bg-background">
        <SaasHeroSection />
      </div>

      {/* Leaders — muted contrast band */}
      <div className="bg-secondary border-y border-border/40">
        <SaasLeadersCarousel />
      </div>

      {/* MacBook showcase — full dark inversion */}
      <SaasMacBookShowcase />

      {/* Bento sections own their distinct backgrounds internally */}
      <SaasBentoFeatures />

      {/* Trusted worldwide — Coral aurora band with concentric topography */}
      <div className="relative overflow-hidden border-y border-border/40"
           style={{ background: 'linear-gradient(180deg, hsl(12 80% 96%) 0%, hsl(20 70% 92%) 50%, hsl(35 60% 95%) 100%)' }}>
        <div className="pointer-events-none absolute inset-0 opacity-[0.10]"
             style={{
               backgroundImage: 'repeating-radial-gradient(circle at 50% 120%, hsl(var(--primary)) 0 1px, transparent 1px 60px)',
             }} />
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-[50%] bg-primary/25 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        <div className="relative">
          <SaasWorldMapSection />
        </div>
      </div>


      {/* Testimonials — clean surface */}
      <div className="bg-background border-t border-border/40">
        <SaasTestimonialWall />
      </div>

      {/* CTA — accent gradient band */}
      <div className="bg-gradient-to-b from-secondary/60 to-background">
        <SaasCTASection />
      </div>

      <SaasFooter />
    </div>
  );
};

export default Index;
