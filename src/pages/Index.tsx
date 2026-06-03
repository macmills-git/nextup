import Navbar from "@/components/Navbar";
import SaasHeroSection from "@/components/landing/saas/SaasHeroSection";
import SaasLeadersCarousel from "@/components/landing/saas/SaasLeadersCarousel";
import SaasMacBookShowcase from "@/components/landing/saas/SaasMacBookShowcase";
import SaasBentoFeatures from "@/components/landing/saas/SaasBentoFeatures";
import SaasWorldMapSection from "@/components/landing/saas/SaasWorldMapSection";
import SaasTestimonialWall from "@/components/landing/saas/SaasTestimonialWall";
import SaasCTASection from "@/components/landing/saas/SaasCTASection";
import SaasFooter from "@/components/landing/saas/SaasFooter";
import PageTransition from "@/components/PageTransition";

const Index = () => {
  return (
    <div className="min-h-screen relative z-[1] bg-secondary/40">
      <Navbar />
      <PageTransition>
        {/* Hero — photo bg with light tint */}
        <div className="bg-background">
          <SaasHeroSection />
        </div>

        {/* Leaders — muted contrast band */}
        <div className="bg-secondary border-y border-border/40">
          <SaasLeadersCarousel />
        </div>

        {/* MacBook showcase — full dark inversion (handled inside component) */}
        <SaasMacBookShowcase />

        {/* Bento features — back to light surface */}
        <div className="bg-background border-y border-border/40">
          <SaasBentoFeatures />
        </div>

        {/* World map — slight tint */}
        <div className="bg-secondary/60">
          <SaasWorldMapSection />
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
      </PageTransition>
    </div>
  );
};

export default Index;
