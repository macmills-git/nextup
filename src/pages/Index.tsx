import React from "react";
import Navbar from "@/components/Navbar";
import AboutSection from "@/components/AboutSection";
import FeaturesSection from "@/components/FeaturesSection";
import CinematicPlatformSection from "@/components/CinematicPlatformSection";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import heroBgVideo from "@/gemini_generated_video_9df1ef94.mp4";

export const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white relative font-sans overflow-x-clip">
      {/* Floating Pill Navbar */}
      <Navbar />

      {/* SECTION 1: HERO (full viewport height) */}
      <section className="relative h-screen overflow-hidden mb-[-25px] flex flex-col justify-end pb-12 md:pb-16 z-0">
        {/* Background Video */}
        <video
          src={heroBgVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onEnded={(e) => e.currentTarget.play()}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Semi-transparent Overlay */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Hero Content (Bottom Aligned) */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center flex flex-col items-center">
          {/* Main Heading */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[96px] font-normal text-white leading-[1.1] tracking-tight mb-4">
            <div>Plan your events</div>
            <div>
              without{" "}
              <em
                className="not-italic"
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontStyle: "italic",
                }}
              >
                the hassle
              </em>
            </div>
          </h1>

          {/* Subtitle */}
          <p className="text-white/80 text-sm md:text-base font-medium max-w-[460px] mx-auto text-center mb-8">
            NextUp is your central spot to discover local events, publish gatherings, and connect with trusted vendors
          </p>

          {/* CTA Bar */}
          <div className="bg-black/25 backdrop-blur-md rounded-xl flex flex-row items-center pl-6 pr-1 py-1 gap-4 max-w-xl mx-auto border border-white/10">
            {/* Desktop text */}
            <span className="text-white text-sm font-medium hidden sm:inline">
              No clutter. No complicated setups. Just your event, gently sorted.
            </span>
            {/* Mobile text */}
            <span className="text-white text-sm font-medium sm:hidden">
              No clutter. Just your event, gently sorted.
            </span>

            <button
              onClick={() => navigate("/events")}
              className="bg-white text-black text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-white/90 transition-colors whitespace-nowrap flex-shrink-0"
            >
              Explore Events
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 2: ABOUT SECTION */}
      <AboutSection />

      {/* SECTION 3: FEATURES SECTION (scroll-driven cards) */}
      <FeaturesSection />

      {/* SECTION 4: DARK CINEMATIC INFRASTRUCTURE SECTION */}
      <CinematicPlatformSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
