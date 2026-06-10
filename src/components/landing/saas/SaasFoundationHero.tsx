import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const logos = [
  { name: "Procure", src: "https://svgl.app/library/procure.svg", from: "#3b82f6", to: "#1d4ed8" },
  { name: "Shopify", src: "https://svgl.app/library/shopify.svg", from: "#fde68a", to: "#f59e0b" },
  { name: "Blender", src: "https://svgl.app/library/blender.svg", from: "#60a5fa", to: "#2563eb" },
  { name: "Figma", src: "https://svgl.app/library/figma.svg", from: "#c4b5fd", to: "#7c3aed" },
  { name: "Spotify", src: "https://svgl.app/library/spotify.svg", from: "#fda4af", to: "#e11d48" },
  { name: "Lottielab", src: "https://svgl.app/library/lottielab.svg", from: "#fde68a", to: "#65a30d" },
  { name: "Google Cloud", src: "https://svgl.app/library/google-cloud.svg", from: "#bae6fd", to: "#0284c7" },
  { name: "Bing", src: "https://svgl.app/library/bing.svg", from: "#a5f3fc", to: "#0d9488" },
];

const SaasFoundationHero = () => {
  return (
    <section className="relative w-full bg-[#f9fafb] py-20 px-4 md:px-8">
      <style>{`
        @keyframes nested-marquee2 { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .nested-marquee-track2 { animation: nested-marquee2 35s linear infinite; }
        .nested-marquee-track2:hover { animation-play-state: paused; }
      `}</style>

      <div className="relative w-full max-w-[1400px] mx-auto rounded-[48px] bg-white border border-slate-200/50 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] overflow-hidden h-[640px] flex flex-col">
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
          <video
            autoPlay loop muted playsInline
            className="w-full h-full object-cover scale-105"
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260505_101331_74f9b798-3f00-4e86-8a01-377aa16ffeaa.mp4"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-20 flex-1 px-8 md:px-16 pt-12 md:pt-16 flex flex-col items-start"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-3 py-1 border border-slate-200/60 text-[11px] font-semibold text-slate-600 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ef4d23]" /> The Operating System for Events
          </span>
          <h2
            className="text-[42px] md:text-[56px] font-medium tracking-tight text-[#0a1b33] leading-[1.05]"
            style={{ fontFamily: "'Outfit', 'Space Grotesk', sans-serif" }}
          >
            Foundation of the<br />new event epoch
          </h2>
          <p className="mt-5 max-w-xl text-[14px] md:text-[15px] text-[#64748b]">
            Designing workflows, powering vendor ecosystems and laying the foundation of intelligent event operations for planners, agencies and brands alike.
          </p>
          <Link
            to="/signup"
            className="mt-8 inline-flex items-center gap-2 bg-[#0a152d] text-white text-[13px] font-semibold rounded-full px-6 py-3 hover:bg-[#0a152d]/90 transition"
          >
            Contact Us <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>

      <div
        className="relative mt-10 max-w-[1400px] mx-auto overflow-hidden"
        style={{
          maskImage: "linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)",
        }}
      >
        <div className="nested-marquee-track2 flex gap-4 w-max">
          {[...logos, ...logos].map((logo, i) => (
            <div key={i} className="group relative h-24 w-40 shrink-0 flex items-center justify-center rounded-full bg-white border border-slate-200/60 shadow-sm hover:border-slate-300 transition-all overflow-hidden">
              <div className="absolute inset-0 scale-150 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500"
                style={{ background: `linear-gradient(135deg, ${logo.from}, ${logo.to})` }} />
              <img src={logo.src} alt={logo.name} className="relative z-10 h-8 w-auto max-w-[80px] object-contain transition-all duration-500 group-hover:brightness-0 group-hover:invert" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SaasFoundationHero;
