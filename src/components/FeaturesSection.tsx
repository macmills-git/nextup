import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import logoLightImg from "@/Gemini_Generated_Image_i9qwssi9qwssi9qw.jpg";
import gentleDiscoveryVideo from "@/Generated Video October 06, 2026 - 12_32AM.mp4";
import vendorDirectoryVideo from "@/Transforming_event_space_for_gala_20261006005641.mp4";

interface Feature {
  id: string;
  title: string;
  description: string;
  video: string;
}

const features: Feature[] = [
  {
    id: "feature-0",
    title: "Instant event publishing",
    description:
      "NextUp strips away the noise that makes event organizing feel overwhelming. Fill out simple details, set free or paid tickets, and get a shareable link in under 2 minutes.",
    video:
      "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260711_090308_1dd0cea7-f9ba-4db4-8147-c7d746061c9e.mp4",
  },
  {
    id: "feature-1",
    title: "Gentle event discovery",
    description:
      "Discovering local gatherings should feel effortless. NextUp eases you into upcoming music concerts, campus meetups, and social parties with a clear view of what deserves your weekend energy.",
    video: gentleDiscoveryVideo,
  },
  {
    id: "feature-2",
    title: "Curated vendor directory",
    description:
      "No endless phone calls or scattered search queries. NextUp connects organizers with verified DJs, caterers, MCs, sound rentals, and photographers in one organized directory.",
    video: vendorDirectoryVideo,
  },
];

export const FeaturesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [revealed, setRevealed] = useState<boolean[]>([false, false, false]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Reveal observer (threshold 0.15)
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            if (!isNaN(index)) {
              setRevealed((prev) => {
                const next = [...prev];
                next[index] = true;
                return next;
              });
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    // Active tab observer (threshold 0.6)
    const activeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            if (!isNaN(index)) {
              setActiveIndex(index);
            }
          }
        });
      },
      { threshold: 0.6 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) {
        revealObserver.observe(ref);
        activeObserver.observe(ref);
      }
    });

    return () => {
      revealObserver.disconnect();
      activeObserver.disconnect();
    };
  }, []);

  const scrollToCard = (index: number) => {
    const card = cardRefs.current[index];
    if (card) {
      card.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section id="features" className="relative px-5 md:px-10 lg:px-16 py-20 md:py-40 lg:py-48 bg-stone-950 text-white">
      {/* Fixed background image behind content */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <img
          src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260709_082449_46df5cc4-ad98-4541-9236-a2659c1478a4.png&w=1920&q=85"
          alt="Features Background"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-stone-950/80" />
      </div>

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[400px_1fr] xl:grid-cols-[460px_1fr] gap-12 lg:gap-24 xl:gap-48 items-start">
        {/* Left Column (sticky on desktop) */}
        <div className="lg:sticky lg:top-0 lg:h-screen lg:flex lg:flex-col lg:justify-between lg:py-32">
          <div>
            <h2 className="text-white text-2xl sm:text-3xl lg:text-[46px] leading-[1.2] font-normal mb-8 lg:mb-12">
              Software that flows with your event, from idea to execution
            </h2>

            {/* Feature Nav Buttons (hidden below lg) */}
            <div className="hidden lg:flex flex-col gap-3">
              {features.map((item, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToCard(idx)}
                    className={`text-left px-5 py-3.5 rounded-2xl transition-all duration-300 font-medium text-sm md:text-base ${
                      isActive
                        ? "bg-black/20 text-white backdrop-blur-sm border border-white/10"
                        : "bg-black/20 text-white/40 hover:text-white/70"
                    }`}
                  >
                    {item.title}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom CTA (hidden below lg) */}
          <div className="hidden lg:block pt-8">
            <p className="text-white/80 text-sm font-medium mb-4">
              No clutter. No complicated setups. Just your event, gently sorted.
            </p>
            <button
              onClick={() => navigate("/events")}
              className="bg-white text-black text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-white/90 transition-colors shadow-lg"
            >
              Explore Events
            </button>
          </div>
        </div>

        {/* Right Column (scrolling cards) */}
        <div className="flex flex-col gap-12 md:gap-20">
          {features.map((item, idx) => {
            const isRevealed = revealed[idx];
            return (
              <div
                key={item.id}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                data-index={idx}
                className={`bg-black/20 backdrop-blur-sm rounded-3xl p-6 md:p-10 border border-white/10 transition-all duration-700 ease-out transform ${
                  isRevealed ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
                }`}
              >
                <div className="mb-6 flex items-center gap-2">
                  <img
                    src={logoLightImg}
                    alt="NextUp Emblem"
                    className="w-10 h-10 rounded-full object-cover border border-white/20 shadow-sm"
                  />
                  <span className="text-xs font-semibold uppercase tracking-wider text-white/80">NextUp</span>
                </div>

                <h3 className="text-white text-xl md:text-2xl font-medium mb-4">{item.title}</h3>

                <div className="aspect-video rounded-2xl overflow-hidden bg-black/30 mb-6 shadow-inner relative">
                  <video
                    src={item.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    onEnded={(e) => e.currentTarget.play()}
                    className="w-full h-full object-cover"
                  />
                </div>

                <p className="text-white/60 font-medium text-sm md:text-base leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
