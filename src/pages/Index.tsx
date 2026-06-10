import Navbar from "@/components/Navbar";
import SaasHeroSection from "@/components/landing/saas/SaasHeroSection";
import SaasFoundationHero from "@/components/landing/saas/SaasFoundationHero";
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

      {/* NEW hero — Convix-style video + dashboard */}
      <SaasHeroSection />

      {/* Leaders — muted contrast band */}
      <div className="bg-secondary border-y border-border/40">
        <SaasLeadersCarousel />
      </div>

      {/* MacBook showcase — full dark inversion */}
      <SaasMacBookShowcase />

      {/* Foundation hero (moved below Mission Control) */}
      <div className="bg-background">
        <SaasFoundationHero />
      </div>

      {/* Bento sections own their distinct backgrounds internally */}
      <SaasBentoFeatures />

      {/* Trusted worldwide — dark arch (owns background) */}
      <SaasWorldMapSection />

      {/* Testimonials — clean surface */}
      <div className="bg-background border-t border-border/40">
        <SaasTestimonialWall />
      </div>

      {/* CTA — dark arch (owns background) */}
      <SaasCTASection />

      <SaasFooter />
    </div>
  );
};

export default Index;
