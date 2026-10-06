import React from "react";
import { useNavigate } from "react-router-dom";

export const CinematicPlatformSection = () => {
  const navigate = useNavigate();

  return (
    <section id="faq" className="relative w-full h-screen min-h-[680px] bg-[#050505] text-[#fafafa] overflow-hidden flex flex-col justify-center p-6 sm:p-12 md:p-20 border-t border-white/10 font-sans">
      {/* Background Video */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <video
          className="w-full h-full object-cover opacity-90"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          onEnded={(e) => e.currentTarget.play()}
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260808_112712_da9d53df-6d27-4b12-bdf6-aa9dc2622bdf.mp4"
            type="video/mp4"
          />
        </video>

        {/* Fade Overlays */}
        {/* Bottom Fade */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(5,5,5,0) 78.8%, rgba(5,5,5,.23) 79.6%, rgba(5,5,5,.45) 81.4%, rgba(5,5,5,.75) 83.3%, rgba(5,5,5,.84) 85.2%, rgba(5,5,5,.888) 88%, rgba(5,5,5,.905) 91%, rgba(5,5,5,.96) 95%, #050505 100%)",
          }}
        />
        {/* Side Letterbox */}
        <div
          className="absolute inset-0 pointer-events-none hidden md:block"
          style={{
            background:
              "linear-gradient(to right, #050505 0%, transparent 12%, transparent 88%, #050505 100%)",
          }}
        />
      </div>

      {/* Main Hero Content (No top Navbar, No top Logo, No bottom Logoipsum strip) */}
      <div className="relative z-10 max-w-4xl mx-0 my-auto py-8">
        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[72px] font-normal tracking-tight text-[#fafafa] leading-[1.1] mb-6">
          <div className="block">The Next Layer</div>
          <div className="block">
            of{" "}
            <em
              className="not-italic"
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontStyle: "italic",
              }}
            >
              Event Discovery
            </em>
          </div>
        </h2>

        <p className="text-[#a7a6a6] text-base sm:text-xl font-normal max-w-2xl leading-relaxed mb-8">
          <span className="block">A unified platform for hosts and attendees to publish,</span>
          <span className="block">discover, and manage local gatherings with confidence.</span>
        </p>

        <div className="flex flex-wrap items-center gap-6">
          <button
            onClick={() => navigate("/events")}
            className="bg-white text-[#050505] text-sm font-semibold px-7 py-3.5 rounded-full hover:bg-white/90 transition-all shadow-xl"
          >
            Explore Events
          </button>

          <button
            onClick={() => navigate("/vendors")}
            className="text-white text-sm font-semibold hover:opacity-80 transition-opacity"
          >
            Browse Vendors
          </button>
        </div>
      </div>
    </section>
  );
};

export default CinematicPlatformSection;
