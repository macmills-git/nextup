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

      {/* ============ BLOCK 3: Native Tools Integration — Payer-style bold (big hero + floating cards) ============ */}
      <div className="relative overflow-hidden py-28 border-b border-border/40"
           style={{ background: 'linear-gradient(135deg, hsl(45 90% 92%) 0%, hsl(220 80% 90%) 100%)' }}>
        <div className="pointer-events-none absolute inset-0 opacity-30"
             style={{ background: 'radial-gradient(circle at 20% 80%, hsl(35 95% 75%) 0%, transparent 40%), radial-gradient(circle at 80% 20%, hsl(220 90% 75%) 0%, transparent 40%)' }} />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="feat-anim text-5xl md:text-7xl font-bold text-stone-900 leading-[0.95] tracking-tight mb-6">
                Native Tools<br/>Integration
              </h2>
              <p className="feat-anim text-base text-stone-600 mb-8 max-w-md">
                Connect your favorite tools — calendars, payments, communications — and let Nested sync everything in real time.
              </p>
              <div className="flex flex-wrap gap-3">
                <a className="px-6 py-3 rounded-full bg-primary text-white text-sm font-semibold shadow-lg hover:scale-105 transition" href="#">Connect now</a>
                <a className="px-6 py-3 rounded-full bg-white text-stone-900 text-sm font-semibold shadow-sm hover:scale-105 transition" href="#">View integrations</a>
              </div>
            </div>

            {/* Right: Floating mockup cards */}
            <div className="feat-anim relative h-[460px]">
              {/* Central phone-like card */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-56 rounded-[2rem] bg-white shadow-2xl border border-stone-200 p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20" />
                  <span className="text-[10px] text-stone-500">November</span>
                </div>
                <p className="text-[10px] text-stone-400">Active Events</p>
                <p className="text-2xl font-bold text-stone-900">52</p>
                <div className="mt-3 space-y-2">
                  <div className="flex justify-between text-[10px]"><span className="text-stone-500">Vendors synced</span><span className="font-semibold">24</span></div>
                  <div className="flex justify-between text-[10px]"><span className="text-stone-500">Tasks done</span><span className="font-semibold">187</span></div>
                </div>
                <button className="w-full mt-4 py-2 rounded-full bg-primary text-white text-[11px] font-semibold">Sync all</button>
              </div>

              {/* Floating chip cards */}
              <div className="absolute top-4 right-0 bg-white rounded-full shadow-lg pl-2 pr-4 py-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-xs">✓</span>
                <span className="text-xs font-semibold text-stone-900">Secure Sync</span>
              </div>
              <div className="absolute top-1/3 left-0 bg-white rounded-2xl shadow-lg px-3 py-2 flex items-center gap-2">
                <div className="flex -space-x-1">
                  <div className="w-5 h-5 rounded-full bg-amber-300 border-2 border-white" />
                  <div className="w-5 h-5 rounded-full bg-rose-300 border-2 border-white" />
                  <div className="w-5 h-5 rounded-full bg-violet-300 border-2 border-white" />
                </div>
                <span className="text-xs font-semibold text-stone-900">12K+</span>
              </div>
              <div className="absolute bottom-12 left-4 bg-white rounded-full shadow-lg pl-2 pr-4 py-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">✓</span>
                <span className="text-xs font-semibold text-stone-900">Connected</span>
              </div>
              <div className="absolute bottom-4 right-4 bg-white rounded-full shadow-lg pl-2 pr-4 py-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-[10px]">📱</span>
                <span className="text-xs font-semibold text-stone-900">One App for All</span>
              </div>
            </div>
          </div>

          {/* Bottom feature strip */}
          <div className="max-w-6xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: Shield, title: "One-Click Auth", desc: "SSO and role-based access in seconds." },
              { icon: RefreshCw, title: "Realtime Sync", desc: "Every change replicates across every tool." },
              { icon: Code2, title: "Custom Integrations", desc: "Open API and webhooks for any stack." },
            ].map((item, i) => (
              <div key={i} className="feat-anim bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white">
                <item.icon className="w-5 h-5 text-primary mb-3" />
                <h4 className="text-sm font-semibold text-stone-900 mb-1.5">{item.title}</h4>
                <p className="text-[13px] text-stone-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ============ BLOCK 4: Vendor Model Selector — Build trust style (coral score card + bullet list) ============ */}
      <div className="relative overflow-hidden py-28 bg-white">
        <div className="pointer-events-none absolute -top-20 -left-20 w-[600px] h-[600px] rounded-full"
             style={{ background: 'radial-gradient(circle, hsl(12 95% 65% / 0.3) 0%, transparent 60%)', filter: 'blur(40px)' }} />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Score chart card */}
            <div className="feat-anim relative rounded-3xl bg-white border border-stone-100 shadow-xl p-8 overflow-hidden">
              <div className="absolute inset-0 pointer-events-none"
                   style={{ background: 'radial-gradient(circle at 100% 100%, hsl(12 95% 65% / 0.25) 0%, transparent 50%)' }} />
              <div className="relative">
                <p className="text-xs text-stone-400 mb-6">Vendor reliability score</p>
                <svg viewBox="0 0 400 180" className="w-full h-44">
                  <defs>
                    <linearGradient id="line" x1="0" x2="1" y1="0" y2="0">
                      <stop offset="0%" stopColor="hsl(12 80% 70%)" />
                      <stop offset="100%" stopColor="hsl(12 95% 55%)" />
                    </linearGradient>
                    <linearGradient id="fill" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="hsl(12 95% 65% / 0.3)" />
                      <stop offset="100%" stopColor="hsl(12 95% 65% / 0)" />
                    </linearGradient>
                  </defs>
                  <path d="M0,160 C60,158 90,150 130,135 C170,120 200,80 240,55 C280,30 330,20 400,12 L400,180 L0,180 Z" fill="url(#fill)" />
                  <path d="M0,160 C60,158 90,150 130,135 C170,120 200,80 240,55 C280,30 330,20 400,12" stroke="url(#line)" strokeWidth="3" fill="none" />
                  {[{x:40,y:160,l:'0-20',s:'Low'},{x:130,y:135,l:'21-40',s:'Limited'},{x:230,y:60,l:'41-60',s:'Moderate'},{x:320,y:25,l:'61-80',s:'High'}].map((p,i)=>(
                    <g key={i}>
                      <line x1={p.x} y1={p.y} x2={p.x} y2={180} stroke="hsl(12 30% 90%)" strokeDasharray="2 3" />
                      <text x={p.x} y={p.y-12} textAnchor="middle" fontSize="9" fill="hsl(0 0% 35%)" fontWeight="600">{p.l}</text>
                      <text x={p.x} y={p.y-2} textAnchor="middle" fontSize="8" fill="hsl(0 0% 55%)">{p.s}</text>
                    </g>
                  ))}
                </svg>
                <div className="flex items-end justify-end gap-2 mt-2">
                  <span className="text-xs text-stone-500">Score</span>
                  <span className="text-5xl font-bold text-primary leading-none">87</span>
                </div>
              </div>
            </div>

            {/* Right: Copy */}
            <div>
              <h2 className="feat-anim text-4xl md:text-6xl font-bold text-stone-900 leading-[1.05] tracking-tight mb-5">
                Vendor Model<br/>Selector
              </h2>
              <p className="feat-anim text-base text-stone-500 mb-8 max-w-md">
                Compare verified vendors by reliability, availability and price — and let Nested score-match the right partner to every event.
              </p>
              <div className="space-y-5">
                {[
                  { i: "★", t: "Trusted vendor reliability scoring" },
                  { i: "●", t: "Availability synced in real time" },
                  { i: "✦", t: "Score-matched to your event profile" },
                ].map((b, i) => (
                  <div key={i} className="feat-anim flex items-center gap-3">
                    <div className="w-7 h-7 rounded-md bg-primary/10 text-primary flex items-center justify-center text-sm">{b.i}</div>
                    <span className="text-sm text-stone-700">{b.t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default SaasBentoFeatures;
