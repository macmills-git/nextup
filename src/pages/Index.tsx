import Navbar from "@/components/Navbar";
import SaasHeroSection from "@/components/landing/saas/SaasHeroSection";
import SaasFoundationHero from "@/components/landing/saas/SaasFoundationHero";
import SaasMacBookShowcase from "@/components/landing/saas/SaasMacBookShowcase";
import SaasBentoFeatures from "@/components/landing/saas/SaasBentoFeatures";
import SaasTestimonialWall from "@/components/landing/saas/SaasTestimonialWall";
import SaasCTASection from "@/components/landing/saas/SaasCTASection";
import SaasFooter from "@/components/landing/saas/SaasFooter";

const Index = () => {
  return (
    <div className="min-h-screen relative z-[1] bg-secondary/40">
      <Navbar />

      {/* NEW hero — Convix-style video + dashboard */}
      <SaasHeroSection />

      {/* MacBook showcase */}
      <SaasMacBookShowcase />

      {/* Foundation hero (moved below Mission Control) */}
      <div className="bg-background">
        <SaasFoundationHero />
      </div>

      {/* Bento sections own their distinct backgrounds internally */}
      <SaasBentoFeatures />

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
