import React from "react";
import { Mail, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logoDarkImg from "@/Gemini_Generated_Image_60wrp760wrp760wr.jpg";

export const AboutSection = () => {
  const navigate = useNavigate();

  return (
    <section id="drift-ai" className="relative z-10 bg-[#F6E4CF] rounded-t-[25px] py-20 md:py-32 px-6">
      {/* Top Area (centered, max-w-3xl) */}
      <div className="max-w-3xl mx-auto flex flex-col items-center text-center mb-16 md:mb-24">
        <p className="text-[#321C04] text-base md:text-lg leading-relaxed max-w-lg font-normal mb-8">
          We craft platforms that move with your rhythm, not over it. Designed for effortless event discovery, instant publishing, and vendor connections.
        </p>

        {/* Two Pill Buttons */}
        <div className="flex flex-wrap justify-center items-center gap-4">
          <button
            type="button"
            onClick={() => navigate("/events")}
            className="bg-[#321C04] hover:bg-[#1F1003] text-[#FFF9F2] rounded-full px-5 py-3 flex items-center gap-3 transition-colors text-xs font-medium uppercase tracking-wide group"
          >
            <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[#321C04] flex-shrink-0">
              <Mail size={16} />
            </span>
            <span>Discover Events</span>
          </button>

          <button
            type="button"
            onClick={() => navigate("/create/event")}
            className="bg-[#D9C4AA] hover:bg-[#CEBA9E] text-[#321C04] rounded-full px-5 py-3 flex items-center gap-3 transition-colors text-xs font-medium uppercase tracking-wide group"
          >
            <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[#321C04] flex-shrink-0">
              <Plus size={16} />
            </span>
            <span>Publish Event</span>
          </button>
        </div>
      </div>

      {/* Decorative Divider */}
      <div className="max-w-6xl mx-auto flex items-center gap-[2px] my-16 md:my-24">
        <div className="w-2 h-2 rounded-full bg-[#D9C4AA] flex-shrink-0" />
        <div className="flex-1 h-[2px] bg-[#D9C4AA]" />
        <div className="w-2 h-2 rounded-full bg-[#D9C4AA] flex-shrink-0" />
      </div>

      {/* Bottom Area (max-w-6xl, flex-col md:flex-row) */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start justify-between gap-8 md:gap-16">
        <div className="flex items-center md:items-start gap-4 flex-shrink-0">
          <img
            src={logoDarkImg}
            alt="NextUp Emblem"
            className="w-10 h-10 rounded-full object-cover shadow-sm border border-[#321C04]/20"
          />
          <div className="text-xs uppercase tracking-widest font-semibold text-[#321C04] leading-tight">
            Events /<br />
            Amplified
          </div>
        </div>

        <div className="flex-1">
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] leading-[1.3] font-normal text-[#321C04]">
            We make thoughtful tools for event hosts and attendees. But, most importantly, we help you remember what effortless gathering looks like when software moves with you, not against you. We carry the logistics weight, so you can attend to what truly counts.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
