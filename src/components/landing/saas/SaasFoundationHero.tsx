import { motion } from "motion/react";
import { ChevronRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const logos = [
  { name: "Procure", src: "https://svgl.app/library/procure.svg" },
  { name: "Shopify", src: "https://svgl.app/library/shopify.svg" },
  { name: "Blender", src: "https://svgl.app/library/blender.svg" },
  { name: "Figma", src: "https://svgl.app/library/figma.svg" },
  { name: "Spotify", src: "https://svgl.app/library/spotify.svg" },
  { name: "Lottielab", src: "https://svgl.app/library/lottielab.svg" },
  { name: "Google Cloud", src: "https://svgl.app/library/google-cloud.svg" },
  { name: "Bing", src: "https://svgl.app/library/bing.svg" },
];

const SaasFoundationHero = () => {
  return (
    <section
      className="relative w-full bg-[#f9fafb] py-24 px-4 md:px-8 overflow-hidden"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <style>{`
        @keyframes nested-marquee2 { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .nested-marquee-track2 { animation: nested-marquee2 35s linear infinite; }
        .nested-marquee-track2:hover { animation-play-state: paused; }
      `}</style>

      {/* Giant ghost NESTED behind */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-12 flex justify-center select-none z-0">
        <span
          className="block whitespace-nowrap leading-none text-stone-200/60"
          style={{
            fontSize: "clamp(120px, 22vw, 320px)",
            fontFamily: "'Space Grotesk', 'Inter Tight', sans-serif",
            fontWeight: 900,
            letterSpacing: "-0.08em",
          }}
        >
          NESTED
        </span>
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 border border-stone-200 text-[12px] font-semibold text-stone-700 mb-6 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#ef4d23]" />
          The Operating System for Events
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-[#0a1b33] mx-auto max-w-4xl"
          style={{
            fontSize: "clamp(36px, 7vw, 76px)",
            lineHeight: 1.05,
            fontWeight: 500,
            letterSpacing: "-0.02em",
          }}
        >
          Foundation of the{" "}
          <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400 }}>
            new event
          </span>{" "}
          epoch
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 mx-auto max-w-xl text-[15px] text-[#64748b]"
        >
          Designing workflows, powering vendor ecosystems, and laying the foundation
          of intelligent event operations for planners, agencies and brands alike.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-8 flex items-center justify-center gap-3"
        >
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 bg-[#0a152d] text-white text-[13px] font-semibold rounded-full px-6 py-3 hover:bg-[#0a152d]/90 transition"
          >
            Start free <ChevronRight className="w-4 h-4" />
          </Link>
          <Link
            to="/features"
            className="inline-flex items-center gap-2 bg-white text-[#0a152d] border border-stone-200 text-[13px] font-semibold rounded-full px-6 py-3 hover:bg-stone-50 transition"
          >
            Explore platform
          </Link>
        </motion.div>
      </div>

      {/* Trusted-by marquee */}
      <div
        className="relative z-10 mt-16 max-w-[1200px] mx-auto overflow-hidden"
        style={{
          maskImage: "linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)",
        }}
      >
        <div className="nested-marquee-track2 flex gap-4 w-max">
          {[...logos, ...logos].map((logo, i) => (
            <div
              key={i}
              className="h-20 w-36 shrink-0 flex items-center justify-center rounded-2xl bg-white border border-stone-200/60 shadow-sm"
            >
              <img
                src={logo.src}
                alt={logo.name}
                className="h-7 w-auto max-w-[80px] object-contain opacity-70"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SaasFoundationHero;
