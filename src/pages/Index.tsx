import React, { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import AboutSection from "@/components/AboutSection";
import FeaturesSection from "@/components/FeaturesSection";
import CinematicPlatformSection from "@/components/CinematicPlatformSection";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import heroBgVideo1 from "@/gemini_generated_video_9df1ef94.mp4";
import heroBgVideo2 from "@/gemini_generated_video_ae200837.mp4";

export const Index = () => {
  const navigate = useNavigate();
  const [activeVideoIndex, setActiveVideoIndex] = useState<0 | 1>(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const completedPlaysRef = useRef(0);

  const PLAYBACK_SPEED = 1.0; // Normal video playback speed

  // Stop video & audio when scrolled out of view
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            if (videoRef1.current) videoRef1.current.pause();
            if (videoRef2.current) videoRef2.current.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const targetVideo = activeVideoIndex === 0 ? videoRef1.current : videoRef2.current;
    const inactiveVideo = activeVideoIndex === 0 ? videoRef2.current : videoRef1.current;

    if (inactiveVideo) {
      inactiveVideo.pause();
    }

    if (targetVideo) {
      targetVideo.playbackRate = PLAYBACK_SPEED;
      targetVideo.muted = isMuted;
      if (isPlaying) {
        targetVideo.play().catch(() => {});
      } else {
        targetVideo.pause();
      }
    }
  }, [activeVideoIndex, isMuted, isPlaying]);

  const togglePlay = () => {
    const target = activeVideoIndex === 0 ? videoRef1.current : videoRef2.current;
    if (!target) return;

    if (isPlaying) {
      target.pause();
      setIsPlaying(false);
    } else {
      // If two full loops completed (4 plays total), reset to 0 and start from Video 1
      if (completedPlaysRef.current >= 4) {
        completedPlaysRef.current = 0;
        if (activeVideoIndex !== 0) {
          setActiveVideoIndex(0);
          return;
        }
      }
      target.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (videoRef1.current) videoRef1.current.muted = nextMuted;
    if (videoRef2.current) videoRef2.current.muted = nextMuted;
  };

  const handleEnded1 = () => {
    completedPlaysRef.current += 1;
    if (completedPlaysRef.current >= 4) {
      setIsPlaying(false);
      return;
    }
    setActiveVideoIndex(1);
  };

  const handleEnded2 = () => {
    completedPlaysRef.current += 1;
    if (completedPlaysRef.current >= 4) {
      setIsPlaying(false);
      return;
    }
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
        <div
          ref={containerRef}
          className="w-full max-w-6xl mx-auto relative rounded-[28px] sm:rounded-[36px] md:rounded-[44px] overflow-hidden border border-stone-200/90 shadow-2xl bg-stone-900 aspect-[16/9] md:aspect-[21/9] max-h-[580px] group cursor-pointer"
          onClick={togglePlay}
        >
          {/* Background Videos (Sequential Loop x2) */}
          <video
            ref={videoRef1}
            src={heroBgVideo1}
            autoPlay
            muted={isMuted}
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
            muted={isMuted}
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

          {/* Floating Showcase Badge (Top Left) */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-white text-xs font-medium pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>NextUp Experience Preview</span>
          </div>

          {/* Center Media Player Play / Pause Button */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto">
            <button
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-black/40 hover:bg-black/65 backdrop-blur-md border border-white/30 text-white flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-2xl active:scale-95 cursor-pointer group/centerBtn"
              title={isPlaying ? "Pause video" : "Play video"}
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              {isPlaying ? (
                <Pause size={28} className="fill-white text-white md:w-8 md:h-8" />
              ) : (
                <Play size={28} className="fill-white text-white translate-x-0.5 md:w-8 md:h-8" />
              )}
            </button>
          </div>

          {/* Floating Sound On / Off Control (Top Right) */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 pointer-events-auto flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleSound();
              }}
              className={`backdrop-blur-md px-3.5 py-1.5 rounded-full border text-xs font-medium flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer ${
                isMuted
                  ? "bg-black/50 hover:bg-black/70 border-white/20 text-white"
                  : "bg-primary hover:bg-primary/90 border-primary/50 text-white font-semibold"
              }`}
              title={isMuted ? "Unmute sound" : "Mute sound"}
              aria-label={isMuted ? "Unmute sound" : "Mute sound"}
            >
              {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              <span>{isMuted ? "Sound Off" : "Sound On"}</span>
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
