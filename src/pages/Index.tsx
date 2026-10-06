import React, { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import AboutSection from "@/components/AboutSection";
import FeaturesSection from "@/components/FeaturesSection";
import CinematicPlatformSection from "@/components/CinematicPlatformSection";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import heroBgVideo1 from "@/gemini_generated_video_9df1ef94.mp4";
import heroBgVideo2 from "@/gemini_generated_video_ae200837.mp4";

export const Index = () => {
  const navigate = useNavigate();
  const [activeVideoIndex, setActiveVideoIndex] = useState<0 | 1>(0);
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);

  const PLAYBACK_SPEED = 0.65; // Slow down playback to 65% speed for a smoother background atmosphere

  useEffect(() => {
    if (activeVideoIndex === 0) {
      if (videoRef1.current) {
        videoRef1.current.currentTime = 0;
        videoRef1.current.playbackRate = PLAYBACK_SPEED;
        videoRef1.current.play().catch(() => {});
      }
      if (videoRef2.current) {
        videoRef2.current.pause();
      }
    } else {
      if (videoRef2.current) {
        videoRef2.current.currentTime = 0;
        videoRef2.current.playbackRate = PLAYBACK_SPEED;
        videoRef2.current.play().catch(() => {});
      }
      if (videoRef1.current) {
        videoRef1.current.pause();
      }
    }
  }, [activeVideoIndex]);

  const handleEnded1 = () => {
    setActiveVideoIndex(1);
  };

  const handleEnded2 = () => {
    setActiveVideoIndex(0);
  };

  return (
    <div className="min-h-screen bg-white text-stone-900 relative font-sans overflow-x-clip">
      {/* Floating Top Navbar */}
      <Navbar />

      {/* HERO SECTION */}
      <section className="pt-10 pb-16 md:pt-16 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Main Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[84px] font-normal text-stone-900 leading-[1.08] tracking-tight max-w-4xl mx-auto mb-6">
          Plan & discover events{" "}
          <span className="block sm:inline">
            without{" "}
            <em
              className="not-italic text-primary"
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontStyle: "italic",
              }}
            >
              the hassle
            </em>
            <span className="text-stone-900 font-bold">.</span>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-stone-600 text-base md:text-lg font-normal max-w-2xl mx-auto leading-relaxed mb-8">
          NextUp is your central spot to discover local events, publish gatherings, and connect with trusted event vendors and talent.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-14">
          <button
            onClick={() => navigate("/events")}
            className="bg-black text-white text-sm font-semibold px-7 py-3.5 rounded-full hover:bg-stone-800 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
          >
            Explore Events
          </button>
          <button
            onClick={() => navigate("/create/event")}
            className="bg-stone-100 text-stone-800 border border-stone-200 text-sm font-semibold px-7 py-3.5 rounded-full hover:bg-stone-200/80 transition-all"
          >
            Publish an Event
          </button>
        </div>

        {/* Showcase Demo Video Container (Ad / Showcase Frame) */}
        <div className="w-full max-w-6xl mx-auto relative rounded-[28px] sm:rounded-[36px] md:rounded-[44px] overflow-hidden border border-stone-200/90 shadow-2xl bg-stone-900 aspect-[16/9] md:aspect-[21/9] max-h-[580px] group">
          {/* Background Videos (Sequential Loop) */}
          <video
            ref={videoRef1}
            src={heroBgVideo1}
            autoPlay
            muted
            playsInline
            preload="auto"
            onPlay={(e) => { e.currentTarget.playbackRate = PLAYBACK_SPEED; }}
            onEnded={handleEnded1}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              activeVideoIndex === 0 ? "opacity-100 z-0" : "opacity-0 pointer-events-none"
            }`}
          />
          <video
            ref={videoRef2}
            src={heroBgVideo2}
            muted
            playsInline
            preload="auto"
            onPlay={(e) => { e.currentTarget.playbackRate = PLAYBACK_SPEED; }}
            onEnded={handleEnded2}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              activeVideoIndex === 1 ? "opacity-100 z-0" : "opacity-0 pointer-events-none"
            }`}
          />

          {/* Elegant Dark Subtle Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 z-[1] pointer-events-none" />

          {/* Floating Showcase Badge */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-white text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>NextUp Experience Preview</span>
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
