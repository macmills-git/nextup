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
    <div className="min-h-screen bg-background relative z-[1]">
      <Navbar />
      <PageTransition>
        <SaasHeroSection />
        <SaasLeadersCarousel />
        <SaasMacBookShowcase />
        <SaasBentoFeatures />
        <SaasWorldMapSection />
        <SaasTestimonialWall />
        <SaasCTASection />
        <SaasFooter />
      </PageTransition>
    </div>
  );
};

export default Index;
