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
    <div className="min-h-screen bg-background relative z-[1]">
      <Navbar />
      <PageTransition>
        <HeroSection />
        <MacBookShowcase />
        <BentoFeatures />
        <WorldMapSection />
        <TestimonialWall />
        <CTASection />
        <Footer />
      </PageTransition>
    </div>
  );
};

export default Index;
