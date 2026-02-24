import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/landing/HeroSection";
import DashboardShowcase from "@/components/landing/DashboardShowcase";
import FeaturesSection from "@/components/landing/FeaturesSection";
import CTASection from "@/components/landing/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <DashboardShowcase />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
