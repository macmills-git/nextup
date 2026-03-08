import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/landing/HeroSection";
import LeadersCarousel from "@/components/landing/LeadersCarousel";
import MacBookShowcase from "@/components/landing/MacBookShowcase";
import BentoFeatures from "@/components/landing/BentoFeatures";
import WorldMapSection from "@/components/landing/WorldMapSection";
import TestimonialWall from "@/components/landing/TestimonialWall";
import CTASection from "@/components/landing/CTASection";
import PageTransition from "@/components/PageTransition";
import { useDesignVariant } from "@/contexts/DesignVariantContext";

// SaaS variants
import SaasHeroSection from "@/components/landing/saas/SaasHeroSection";
import SaasLeadersCarousel from "@/components/landing/saas/SaasLeadersCarousel";
import SaasMacBookShowcase from "@/components/landing/saas/SaasMacBookShowcase";
import SaasBentoFeatures from "@/components/landing/saas/SaasBentoFeatures";
import SaasWorldMapSection from "@/components/landing/saas/SaasWorldMapSection";
import SaasTestimonialWall from "@/components/landing/saas/SaasTestimonialWall";
import SaasCTASection from "@/components/landing/saas/SaasCTASection";
import SaasFooter from "@/components/landing/saas/SaasFooter";

const Index = () => {
  const { variant } = useDesignVariant();
  const isSaas = variant === "saas";

  return (
    <div className="min-h-screen bg-background relative z-[1]">
      <Navbar />
      <PageTransition>
        {isSaas ? <SaasHeroSection /> : <HeroSection />}
        {isSaas ? <SaasLeadersCarousel /> : <LeadersCarousel />}
        {isSaas ? <SaasMacBookShowcase /> : <MacBookShowcase />}
        {isSaas ? <SaasBentoFeatures /> : <BentoFeatures />}
        {isSaas ? <SaasWorldMapSection /> : <WorldMapSection />}
        {isSaas ? <SaasTestimonialWall /> : <TestimonialWall />}
        {isSaas ? <SaasCTASection /> : <CTASection />}
        {isSaas ? <SaasFooter /> : <Footer />}
      </PageTransition>
    </div>
  );
};

export default Index;
