import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Cobe } from "@/components/eldoraui/cobe-globe";
import { FontWeightText } from "@/components/eldoraui/font-weight-text";
import PhotonBeam from "@/components/eldoraui/photon-beam";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#080808]">
      {/* PhotonBeam background */}
      <div className="absolute inset-0 z-0 opacity-60">
        <PhotonBeam
          colorBg="#080808"
          colorLine="#1a3a5c"
          colorSignal="#3b82f6"
          useColor2
          colorSignal2="#60a5fa"
          useColor3
          colorSignal3="#2563eb"
          bloomStrength={2.5}
          bloomRadius={0.6}
          lineCount={60}
          signalCount={80}
        />
      </div>

      {/* Globe background - centered behind content */}
      <div className="absolute inset-0 z-[1] flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] md:w-[650px] md:h-[650px] lg:w-[750px] lg:h-[750px] opacity-30">
          <Cobe
            variant="auto-rotation"
            baseColor="#1e3a5f"
            markerColor="#3b82f6"
            glowColor="#1e3a5f"
            dark={1.2}
            diffuse={2}
            mapBrightness={6}
            mapBaseBrightness={0.1}
            opacity={1}
            style={{ maxWidth: "100%", width: "100%", aspectRatio: "1" }}
          />
        </div>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 pt-44 pb-20 lg:pt-60 lg:pb-32">
        <div className="text-center max-w-4xl mx-auto animate-fade-in">
          {/* FontWeightText animated heading */}
          <div className="mb-6">
            <FontWeightText
              text="Plan all your events in one place, find vendors, manage teams and budgets."
              fontSize={32}
              className="text-white leading-tight"
              minWeight={100}
              maxWeight={700}
              animationDuration={2}
              delayMultiplier={0.08}
            />
          </div>

          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Use our AI-powered platform to manage small to medium event types. Budget, plan, vendor,
            and let AI do the heavy lifting for you.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
              <Link to="/signup">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="border-border text-foreground hover:bg-accent">
              <Link to="/">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
