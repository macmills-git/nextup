import { useEffect, useRef, useState } from "react";
import { Layers, Globe, Monitor } from "@/lib/fa-icons";
import { ArrowLeft, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Hero typography preset (matches "Shaping Events of tomorrow")
const headingStyle: React.CSSProperties = {
  fontSize: "clamp(36px, 7vw, 76px)",
  lineHeight: 1.05,
  fontWeight: 500,
  letterSpacing: "-0.02em",
};
const italicAccent: React.CSSProperties = {
  fontFamily: "'Instrument Serif', serif",
  fontStyle: "italic",
  fontWeight: 400,
};

// =================== Block 1: TOONHUB-inspired event carousel ===================
const EVENT_SCENES = [
  {
    title: "Conferences",
    label: "Run summits with intelligent timelines, vendor sync and live attendance flows.",
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=80",
    bg: "#F4845F", panel: "#F79B7F",
  },
  {
    title: "Weddings",
    label: "Co-create unforgettable days with vendors, guests and budgets aligned end-to-end.",
    img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=80",
    bg: "#E882B4", panel: "#ED9DC4",
  },
  {
    title: "Live Shows",
    label: "Move fast on production, ticketing and crew scheduling without losing the magic.",
    img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=900&q=80",
    bg: "#6BBF7A", panel: "#85CC92",
  },
  {
    title: "Brand Pop-ups",
    label: "Launch experiential activations in days with templated workflows and marketing tools.",
    img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=900&q=80",
    bg: "#6EB5FF", panel: "#8DC4FF",
  },
];

const EventCarousel = () => {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const navigate = (dir: "next" | "prev") => {
    if (animating) return;
    setAnimating(true);
    setActive((p) => (dir === "next" ? (p + 1) % 4 : (p + 3) % 4));
    setTimeout(() => setAnimating(false), 650);
  };
  const roleFor = (i: number) => {
    if (i === active) return "center";
    if (i === (active + 3) % 4) return "left";
    if (i === (active + 1) % 4) return "right";
    return "back";
  };

  const scene = EVENT_SCENES[active];

  return (
    <div
      className="relative w-full overflow-hidden rounded-[32px]"
      style={{
        backgroundColor: scene.bg,
        transition: "background-color 650ms cubic-bezier(0.4,0,0.2,1)",
        fontFamily: "Inter, sans-serif",
        height: "min(720px, 86vh)",
      }}
    >
      {/* grain */}
      <div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          opacity: 0.35,
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.18'/></svg>\")",
          backgroundSize: "200px 200px",
        }}
      />

      {/* Giant ghost text */}
      <div
        aria-hidden
        className="absolute inset-x-0 flex items-center justify-center pointer-events-none select-none z-[2]"
        style={{ top: "14%" }}
      >
        <span
          className="text-white whitespace-nowrap uppercase"
          style={{
            fontFamily: "'Space Grotesk', 'Inter Tight', sans-serif",
            fontSize: "clamp(80px, 22vw, 300px)",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          NESTED
        </span>
      </div>

      {/* Top-left label */}
      <div className="absolute top-6 left-6 sm:left-8 z-[60]">
        <span
          className="text-xs font-semibold uppercase text-white/90"
          style={{ letterSpacing: "0.18em" }}
        >
          Built for Event Intelligence
        </span>
      </div>

      {/* Carousel */}
      <div className="absolute inset-0 z-[3]">
        {EVENT_SCENES.map((s, i) => {
          const role = roleFor(i);
          const styleByRole: Record<string, React.CSSProperties> = {
            center: { left: "50%", bottom: 0, height: "78%", transform: "translateX(-50%) scale(1.1)", filter: "blur(0)", opacity: 1, zIndex: 20 },
            left:   { left: "26%", bottom: "10%", height: "26%", transform: "translateX(-50%) scale(1)", filter: "blur(2px)", opacity: 0.85, zIndex: 10 },
            right:  { left: "74%", bottom: "10%", height: "26%", transform: "translateX(-50%) scale(1)", filter: "blur(2px)", opacity: 0.85, zIndex: 10 },
            back:   { left: "50%", bottom: "12%", height: "20%", transform: "translateX(-50%) scale(1)", filter: "blur(4px)", opacity: 1, zIndex: 5 },
          };
          return (
            <div
              key={i}
              className="absolute overflow-hidden rounded-2xl shadow-2xl"
              style={{
                aspectRatio: "0.7 / 1",
                ...styleByRole[role],
                willChange: "transform, filter, opacity",
                transition:
                  "transform 650ms cubic-bezier(0.4,0,0.2,1), filter 650ms cubic-bezier(0.4,0,0.2,1), opacity 650ms cubic-bezier(0.4,0,0.2,1), left 650ms cubic-bezier(0.4,0,0.2,1), bottom 650ms cubic-bezier(0.4,0,0.2,1), height 650ms cubic-bezier(0.4,0,0.2,1)",
                background: s.panel,
              }}
            >
              <img
                src={s.img}
                alt={s.title}
                draggable={false}
                className="w-full h-full object-cover"
                style={{ objectPosition: "center" }}
              />
              <div className="absolute inset-x-0 bottom-0 p-3 text-white text-[11px] font-semibold uppercase tracking-wider bg-gradient-to-t from-black/50 to-transparent">
                {s.title}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom-left: copy + nav */}
      <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 z-[60]" style={{ maxWidth: 340 }}>
        <p className="text-white font-bold uppercase tracking-widest mb-2 text-base sm:text-[20px]">
          {scene.title}
        </p>
        <p className="hidden sm:block text-white/85 text-sm leading-relaxed mb-5">
          {scene.label}
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => navigate("prev")}
            aria-label="Previous"
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-white text-white flex items-center justify-center hover:bg-white/15 hover:scale-105 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigate("next")}
            aria-label="Next"
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-white text-white flex items-center justify-center hover:bg-white/15 hover:scale-105 transition-all"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Bottom-right: DISCOVER IT */}
      <a
        href="#"
        className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 z-[60] inline-flex items-center gap-2 text-white uppercase"
        style={{
          fontFamily: "'Space Grotesk', 'Inter Tight', sans-serif",
          fontSize: "clamp(20px, 3.5vw, 48px)",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          lineHeight: 1,
        }}
      >
        Discover it <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8" />
      </a>
    </div>
  );
};

const SaasBentoFeatures = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current.querySelectorAll('.feat-anim'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.06, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%' }
      }
    );
  }, []);

  return (
    <section ref={ref} className="relative">

      {/* ============ BLOCK 1: Built for Event Intelligence — TOONHUB-inspired carousel ============ */}
      <div className="relative overflow-hidden py-20 border-y border-border/40 bg-white">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="feat-anim text-xs uppercase tracking-[0.3em] text-stone-500 mb-5">/ Platform</p>
            <h2 className="feat-anim text-[#0a1b33]" style={headingStyle}>
              Built for{" "}
              <span style={italicAccent}>Event</span><br />Intelligence
            </h2>
            <p className="feat-anim mt-5 text-stone-500 text-base max-w-xl mx-auto">
              One intelligent canvas for every kind of event — design, automate and run end-to-end.
            </p>
          </div>

          <div className="feat-anim max-w-[1200px] mx-auto">
            <EventCarousel />
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-[1200px] mx-auto">
            {[
              { icon: Layers, t: "End-to-end event workflows" },
              { icon: Globe, t: "Auto-sync vendors, budgets & tasks" },
              { icon: Monitor, t: "Real-time intelligence across every event" },
            ].map((it, i) => (
              <div key={i} className="feat-anim rounded-2xl bg-stone-50 border border-stone-200 p-5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white border border-stone-200 flex items-center justify-center">
                  <it.icon className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm text-stone-700">{it.t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ============ BLOCK 2: Making Planners 10x faster ============ */}
      <div className="relative overflow-hidden py-28 bg-stone-50 border-b border-border/40">
        <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-5xl">
          <div className="feat-anim text-center mb-16">
            <p className="text-xs text-stone-400 tracking-widest mb-6">/ Speed</p>
            <h2 className="text-stone-900" style={headingStyle}>
              Making{" "}
              <span style={italicAccent}>planners</span><br />10x faster
            </h2>
            <p className="mt-6 text-stone-500 text-base max-w-xl mx-auto">
              We help event teams move at unprecedented speed — launching, iterating and scaling with confidence.
            </p>
          </div>

          <div className="space-y-4">
            {[
              { copy: "Cut event setup time from weeks to hours with AI-generated timelines and reusable playbooks.", value: "10x+", label: "Faster planning" },
              { copy: "Adjust budgets, swap vendors and shift timelines in real time across your entire team.", value: "80%", label: "Less rework" },
              { copy: "From 30-person dinners to 10,000-person summits — one operating system, infinite scale.", value: "3K+", label: "Events powered" },
            ].map((row, i) => (
              <div key={i} className="feat-anim bg-white rounded-2xl shadow-sm border border-stone-100 px-8 md:px-10 py-7 flex items-center justify-between gap-6">
                <p className="text-sm md:text-base text-stone-500 max-w-md leading-relaxed">{row.copy}</p>
                <div className="text-right flex-shrink-0">
                  <p className="text-4xl md:text-5xl font-bold text-stone-900 leading-none tracking-tight">{row.value}</p>
                  <p className="text-xs text-stone-400 mt-1">{row.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ============ BLOCK 3: Native Tools Integration ============ */}
      <div className="relative overflow-hidden py-28 bg-white border-b border-border/40" style={{ fontFamily: "Inter, sans-serif" }}>
        <div className="max-w-[1100px] mx-auto px-5 text-center">
          <p className="feat-anim text-xs uppercase tracking-[0.3em] text-stone-500 mb-5">/ Integrations</p>
          <h2 className="feat-anim text-[#0a1b33]" style={headingStyle}>
            Native{" "}
            <span style={italicAccent}>tools</span><br />integration
          </h2>
          <p className="feat-anim mt-6 text-stone-500 text-base max-w-xl mx-auto mb-[50px]">
            Everything you need to go from idea to integration.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="feat-anim relative rounded-[20px] h-[340px] flex flex-col justify-end overflow-hidden text-left shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)]"
                 style={{ background: "radial-gradient(circle at 50% 0%, #FFB347 0%, #F9ED96 30%, #F4F8F9 60%, #F4F8F9 100%)" }}>
              <div className="absolute top-[30px] left-6 right-6 bg-white rounded-xl p-4 shadow-[0_8px_20px_rgba(0,0,0,0.04)] text-[0.8rem] text-[#475569]" style={{ lineHeight: 1.6 }}>
                A bright, high-resolution{" "}
                <span className="font-semibold text-primary">cheerful workflow</span>{" "}
                that connects <span className="font-semibold text-primary">every vendor</span>{" "}
                <span className="font-semibold text-primary">centred around</span> your event timeline
              </div>
              <button className="absolute top-[180px] left-10 bg-white border border-black rounded-[20px] px-[14px] py-[5px] text-[0.75rem] font-semibold text-[#1e293b] shadow-[0_4px_15px_rgba(0,0,0,0.08)] inline-flex items-center gap-1.5">
                Add more details <span style={{ color: "#a855f7", fontSize: "1rem" }}>✦</span>
              </button>
              <h3 className="relative z-[2] text-[1.05rem] font-semibold text-[#1e293b] p-6">Smart Workflow Suggestions</h3>
            </div>

            <div className="feat-anim relative rounded-[20px] h-[340px] flex flex-col justify-end overflow-hidden text-left shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)]"
                 style={{ background: "radial-gradient(circle at 50% 0%, #E5A1F5 0%, #F8ACA0 30%, #F4F8F9 60%, #F4F8F9 100%)" }}>
              <div className="absolute top-0 left-0 right-0 bottom-[70px] flex items-center justify-center px-6">
                <img src="https://pub-f170a2592d2c4a1485466404c36807be.r2.dev/viktor/network.svg" alt="API network"
                     className="w-full object-contain mt-5" style={{ height: 180 }} />
              </div>
              <h3 className="relative z-[2] text-[1.05rem] font-semibold text-[#1e293b] p-6">API Access</h3>
            </div>

            <div className="feat-anim relative rounded-[20px] h-[340px] flex flex-col justify-end overflow-hidden text-left shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)]"
                 style={{ background: "radial-gradient(circle at 50% 0%, #F9ED96 0%, #E5A1F5 30%, #F4F8F9 60%, #F4F8F9 100%)" }}>
              <div className="absolute inset-0"
                   style={{
                     backgroundImage:
                       "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
                     backgroundSize: "16px 16px",
                     WebkitMaskImage: "radial-gradient(circle at center top, black 0%, transparent 80%)",
                     maskImage: "radial-gradient(circle at center top, black 0%, transparent 80%)",
                   }} />
              <img src="https://pub-f170a2592d2c4a1485466404c36807be.r2.dev/viktor/library%20icon.svg" alt="Library"
                   className="absolute" style={{ top: 50, left: "50%", transform: "translateX(-50%)", width: 170, filter: "drop-shadow(0 15px 25px rgba(0,0,0,0.08))" }} />
              <h3 className="relative z-[2] text-[1.05rem] font-semibold text-[#1e293b] p-6">Event Library</h3>
            </div>
          </div>
        </div>
      </div>

      {/* ============ BLOCK 4: Vendor Model Selector ============ */}
      <div className="relative overflow-hidden py-32 bg-[#0a0a0f]">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

        <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="feat-anim text-white" style={headingStyle}>
              Vendor{" "}
              <span style={italicAccent}>model</span><br />selector
            </h2>
            <p className="feat-anim mt-6 text-base text-white/60 max-w-xl mx-auto">
              Score, compare and match the right vendor to every event — instantly, with live reliability data.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { name: "Akolo Studio", cat: "Photography", score: 94, recommended: true },
              { name: "Bake It Right", cat: "Catering", score: 87 },
              { name: "Prime Audio", cat: "Audio / Visual", score: 91 },
            ].map((v, i) => (
              <div key={i} className="feat-anim group relative rounded-3xl bg-white/[0.04] backdrop-blur-sm border border-white/10 p-6 hover:border-primary/40 transition">
                {v.recommended && (
                  <span className="absolute -top-2.5 right-5 text-[10px] font-semibold tracking-wider uppercase rounded-full px-3 py-1 bg-primary text-primary-foreground shadow-lg">
                    Score Match
                  </span>
                )}
                <div className="w-12 h-12 rounded-2xl bg-primary mb-5" />
                <h3 className="text-white text-lg font-semibold mb-1">{v.name}</h3>
                <p className="text-white/50 text-xs mb-6">{v.cat}</p>
                <div className="flex items-end justify-between mb-3">
                  <span className="text-white/60 text-xs">Reliability</span>
                  <span className="text-white text-3xl font-bold leading-none">{v.score}</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${v.score}%` }} />
                </div>
                <div className="mt-5 flex items-center justify-between text-[11px] text-white/40">
                  <span>● Available · Nov 14</span>
                  <span className="text-white/70 group-hover:text-white transition">View →</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { t: "Trusted reliability scoring", d: "Verified vendor history rolled into a single score." },
              { t: "Live availability", d: "Real-time calendar sync prevents double-booking." },
              { t: "Auto match-making", d: "Nested suggests the right partner for each event profile." },
            ].map((it, i) => (
              <div key={i} className="feat-anim rounded-2xl bg-white/[0.03] border border-white/5 p-5">
                <h4 className="text-white text-sm font-semibold mb-1.5">{it.t}</h4>
                <p className="text-white/50 text-[13px]">{it.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};

export default SaasBentoFeatures;
