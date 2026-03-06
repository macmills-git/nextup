import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/landing/HeroSection";
import DashboardShowcase from "@/components/landing/DashboardShowcase";
import MacBookShowcase from "@/components/landing/MacBookShowcase";
import FeaturesSection from "@/components/landing/FeaturesSection";
import BentoFeatures from "@/components/landing/BentoFeatures";
import WorldMapSection from "@/components/landing/WorldMapSection";
import RadialIntro from "@/components/landing/RadialIntro";
import TestimonialWall from "@/components/landing/TestimonialWall";
import LargeTextBanner from "@/components/landing/LargeTextBanner";
import CTASection from "@/components/landing/CTASection";
import PageTransition from "@/components/PageTransition";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageTransition>
        <HeroSection />
        <DashboardShowcase />
        <MacBookShowcase />
        <FeaturesSection />
        <BentoFeatures />
        <WorldMapSection />
        <RadialIntro />
        <TestimonialWall />
        <LargeTextBanner />
        <CTASection />
        <Footer />
      </PageTransition>
    </div>
  );
};

export default Index;
