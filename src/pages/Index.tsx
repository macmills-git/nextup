import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/landing/HeroSection";
import DashboardShowcase from "@/components/landing/DashboardShowcase";
import FeaturesSection from "@/components/landing/FeaturesSection";
import CTASection from "@/components/landing/CTASection";
import PageTransition from "@/components/PageTransition";
import MouseFollower from "@/components/MouseFollower";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <MouseFollower />
      <Navbar />
      <PageTransition>
        <HeroSection />
        <DashboardShowcase />
        <FeaturesSection />
        <CTASection />
        <Footer />
      </PageTransition>
    </div>
  );
};

export default Index;
