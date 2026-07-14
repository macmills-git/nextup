import Navbar from "@/components/Navbar";
import SaasHeroSection from "@/components/landing/saas/SaasHeroSection";
import SaasFoundationHero from "@/components/landing/saas/SaasFoundationHero";
import SaasMacBookShowcase from "@/components/landing/saas/SaasMacBookShowcase";
import SaasBentoFeatures from "@/components/landing/saas/SaasBentoFeatures";
import SaasCTASection from "@/components/landing/saas/SaasCTASection";
import SaasFooter from "@/components/landing/saas/SaasFooter";

const Index = () => {
  return (
    <div className="min-h-screen relative z-[1] bg-secondary/40">
      <Navbar />

      <SaasHeroSection />

      <SaasMacBookShowcase />

      <div className="bg-background">
        <SaasFoundationHero />
      </div>

      <SaasBentoFeatures />

      <SaasCTASection />

      <SaasFooter />
    </div>
  );
};

export default Index;
