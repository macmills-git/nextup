import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/landing/HeroSection";
import DashboardShowcase from "@/components/landing/DashboardShowcase";
import MacBookShowcase from "@/components/landing/MacBookShowcase";
import BentoFeatures from "@/components/landing/BentoFeatures";
import WorldMapSection from "@/components/landing/WorldMapSection";
import RadialIntro from "@/components/landing/RadialIntro";
import TestimonialWall from "@/components/landing/TestimonialWall";
import CTASection from "@/components/landing/CTASection";
import PageTransition from "@/components/PageTransition";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Dark sphere grid background */}
      <div className="fixed inset-0 z-0 pointer-events-none" style={{
        backgroundImage: `
          linear-gradient(to right, hsl(var(--border) / 0.15) 1px, transparent 1px),
          linear-gradient(to bottom, hsl(var(--border) / 0.15) 1px, transparent 1px),
          radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.08) 0%, transparent 70%)
        `,
        backgroundSize: '32px 32px, 32px 32px, 100% 100%',
      }} />
      <div className="relative z-10">
        <Navbar />
        <PageTransition>
          <HeroSection />
          <DashboardShowcase />
          <MacBookShowcase />
          <BentoFeatures />
          <WorldMapSection />
          <RadialIntro />
          <TestimonialWall />
          <CTASection />
          <Footer />
        </PageTransition>
      </div>
    </div>
  );
};

export default Index;
