import { useEffect, useRef } from "react";
import { Zap, Shield, Globe, BarChart3, Rocket, RefreshCw, Settings2, CheckCircle, Layers, Code2, Wifi, Monitor } from "@/lib/fa-icons";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

      {/* ============ BLOCK 1: Built for Event Intelligence — Boost Online Presence inspired (cream + coral aurora glow) ============ */}
      <div className="relative overflow-hidden py-28 border-y border-border/40 bg-white">
        {/* Coral aurora glow corners */}
        <div className="pointer-events-none absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full"
             style={{ background: 'radial-gradient(circle, hsl(12 95% 65% / 0.45) 0%, hsl(20 95% 70% / 0.25) 30%, transparent 65%)', filter: 'blur(40px)' }} />
        <div className="pointer-events-none absolute -bottom-40 -left-40 w-[700px] h-[700px] rounded-full"
             style={{ background: 'radial-gradient(circle, hsl(12 95% 65% / 0.35) 0%, hsl(35 95% 75% / 0.2) 30%, transparent 65%)', filter: 'blur(40px)' }} />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto rounded-[2rem] bg-white shadow-[0_20px_80px_-30px_rgba(255,90,40,0.25)] p-10 md:p-16 border border-stone-200/50">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="feat-anim text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-5">/ Platform</p>
                <h2 className="feat-anim text-4xl md:text-6xl font-bold text-stone-900 mb-6 leading-[1.05] tracking-tight">
                  Built for Event<br/>Intelligence
                </h2>
                <p className="feat-anim text-base text-stone-500 mb-8 max-w-md">
                  Design, automate and run every event workflow from a single intelligent canvas — built for fast-moving planning teams.
                </p>
                <div className="space-y-4">
                  {[
                    { icon: Layers, t: "Design end-to-end event workflows" },
                    { icon: Globe, t: "Auto-sync vendors, budgets and tasks" },
                    { icon: Monitor, t: "Real-time intelligence across every event" },
                  ].map((it, i) => (
                    <div key={i} className="feat-anim flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                           style={{ background: 'linear-gradient(135deg, hsl(12 95% 65% / 0.15), hsl(20 95% 70% / 0.08))' }}>
                        <it.icon className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <span className="text-sm text-stone-700">{it.t}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Search-style mock with coral glow */}
              <div className="feat-anim relative">
                <div className="absolute -inset-8 rounded-3xl pointer-events-none"
                     style={{ background: 'radial-gradient(circle at 70% 30%, hsl(12 95% 65% / 0.35) 0%, transparent 60%)', filter: 'blur(30px)' }} />
                <div className="relative rounded-2xl bg-white border border-stone-200 shadow-2xl p-5">
                  <div className="flex items-center gap-3 rounded-full border border-stone-200 px-4 py-2.5 mb-4 bg-white">
                    <span className="text-sm text-stone-900 flex-1">Your Event</span>
                    <span className="text-stone-300 text-sm">×</span>
                    <span className="text-primary text-sm">🎤</span>
                    <span className="text-primary text-sm">⌕</span>
                  </div>
                  <div className="flex gap-4 text-xs border-b border-stone-100 pb-2 mb-3 text-stone-500">
                    <span className="text-primary font-medium border-b-2 border-primary pb-2 -mb-2">Overview</span>
                    <span>Vendors</span><span>Tasks</span><span>Budget</span><span>Guests</span>
                  </div>
                  <p className="text-xs text-stone-400 mb-1">nested.app/events</p>
                  <p className="text-sm text-primary font-medium underline mb-1">Corporate Gala — Nov 14</p>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    Smart orchestration across vendors, tasks and budgets. Nested keeps every detail visible so nothing slips through.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============ BLOCK 2: Making Planners 10x faster — Visionary editorial (huge text + stat rows) ============ */}
      <div className="relative overflow-hidden py-28 bg-stone-50 border-b border-border/40">
        <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-5xl">
          {/* Big mixed-color statement */}
          <div className="feat-anim text-center mb-16">
            <p className="text-xs text-stone-400 tracking-widest mb-6">/ Speed</p>
            <h2 className="text-3xl md:text-5xl font-bold leading-[1.2] tracking-tight">
              <span className="text-stone-900">We help event teams move </span>
              <span className="text-stone-300">at unprecedented speed —</span>
              <span className="text-stone-900"> launching, iterating and scaling </span>
              <span className="text-stone-300">with confidence.</span>
            </h2>
          </div>

          {/* Stat rows in pill cards */}
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

      {/* ============ BLOCK 3: Native Tools Integration — Core features 3 gradient cards ============ */}
      <div className="relative overflow-hidden py-28 bg-white border-b border-border/40" style={{ fontFamily: "Inter, sans-serif" }}>
        <div className="max-w-[1100px] mx-auto px-5 text-center">
          <p
            className="feat-anim text-[0.75rem] font-semibold uppercase tracking-[1px] mb-4"
            style={{
              background: "linear-gradient(90deg, #F5C344, #F28482, #B567C2)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Native Tools Integration
          </p>
          <h2 className="feat-anim text-[2.25rem] md:text-[2.75rem] font-medium text-[#0f172a] mb-3" style={{ letterSpacing: "-0.02em" }}>
            Built for Speed & Quality
          </h2>
          <p className="feat-anim text-[1.125rem] text-[#64748b] mb-[50px]" style={{ lineHeight: 1.5 }}>
            Everything you need to go<br />from idea to integration
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 — Smart Prompt */}
            <div className="feat-anim relative rounded-[20px] h-[340px] flex flex-col justify-end overflow-hidden text-left shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)]"
                 style={{ background: "radial-gradient(circle at 50% 0%, #FFB347 0%, #F9ED96 30%, #F4F8F9 60%, #F4F8F9 100%)" }}>
              <div className="absolute top-[30px] left-6 right-6 bg-white rounded-xl p-4 shadow-[0_8px_20px_rgba(0,0,0,0.04)] text-[0.8rem] text-[#475569]" style={{ lineHeight: 1.6 }}>
                A bright, high-resolution{" "}
                <span className="font-semibold" style={{ background: "linear-gradient(90deg, #FFB347, #E5A1F5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>cheerful workflow</span>{" "}
                that connects{" "}
                <span className="font-semibold" style={{ background: "linear-gradient(90deg, #FFB347, #E5A1F5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>every vendor</span>{" "}
                <span className="font-semibold" style={{ background: "linear-gradient(90deg, #FFB347, #E5A1F5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>centred around</span>{" "}
                your event timeline
              </div>
              <button className="absolute top-[180px] left-10 bg-white border border-black rounded-[20px] px-[14px] py-[5px] text-[0.75rem] font-semibold text-[#1e293b] shadow-[0_4px_15px_rgba(0,0,0,0.08)] inline-flex items-center gap-1.5">
                Add more details <span style={{ color: "#a855f7", fontSize: "1rem" }}>✦</span>
              </button>
              <svg viewBox="0 0 24 24" className="absolute top-[205px] left-[110px] z-10" width={24} height={24}
                   style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.2))" }}>
                <path d="M4 2L20 11L11 13L9 22L4 2Z" fill="#0f172a" stroke="#fff" strokeWidth={1} />
              </svg>
              <h3 className="relative z-[2] text-[1.05rem] font-semibold text-[#1e293b] p-6">Smart Workflow Suggestions</h3>
            </div>

            {/* Card 2 — API Access */}
            <div className="feat-anim relative rounded-[20px] h-[340px] flex flex-col justify-end overflow-hidden text-left shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)]"
                 style={{ background: "radial-gradient(circle at 50% 0%, #E5A1F5 0%, #F8ACA0 30%, #F4F8F9 60%, #F4F8F9 100%)" }}>
              <div className="absolute top-0 left-0 right-0 bottom-[70px] flex items-center justify-center px-6">
                <img src="https://pub-f170a2592d2c4a1485466404c36807be.r2.dev/viktor/network.svg" alt="API network"
                     className="w-full object-contain mt-5" style={{ height: 180 }} />
              </div>
              <h3 className="relative z-[2] text-[1.05rem] font-semibold text-[#1e293b] p-6">API Access</h3>
            </div>

            {/* Card 3 — Project Library */}
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
              <div className="absolute" style={{ top: 220, left: "50%", transform: "translateX(-50%)" }}>
                <div className="bg-white border border-black rounded-[20px] px-[18px] py-1.5 text-[0.75rem] font-medium text-[#1e293b] shadow-[0_8px_20px_rgba(0,0,0,0.06)] inline-flex items-center gap-2 whitespace-nowrap">
                  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <circle cx={11} cy={11} r={8} />
                    <line x1={21} y1={21} x2={16.65} y2={16.65} />
                  </svg>
                  Search in library
                </div>
              </div>
              <h3 className="relative z-[2] text-[1.05rem] font-semibold text-[#1e293b] p-6">Event Library</h3>
            </div>
          </div>
        </div>
      </div>

      {/* ============ BLOCK 4: Vendor Model Selector — Dark inversion with neon vendor cards ============ */}
      <div className="relative overflow-hidden py-32 bg-[#0a0a0f]">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

        <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-6xl">
          <div className="text-center mb-16">
            <p className="feat-anim text-xs uppercase tracking-[0.3em] mb-5 text-primary font-semibold">
              / Vendor Intelligence
            </p>
            <h2 className="feat-anim text-4xl md:text-6xl font-bold text-white leading-[1.05] tracking-tight mb-5">
              Vendor Model<br />Selector
            </h2>
            <p className="feat-anim text-base text-white/60 max-w-xl mx-auto">
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
