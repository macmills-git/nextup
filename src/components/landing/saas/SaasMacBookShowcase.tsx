import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LayoutGrid, Workflow, Store, Layers, Brain, Ticket, Megaphone, MessageSquare, Bell, Settings, Calendar, TrendingUp, Clock, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const SaasMacBookShowcase = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current.querySelectorAll('.fg-text'),
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' }
      }
    );
    gsap.fromTo(ref.current.querySelector('.macbook-wrap'),
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' }
      }
    );
  }, []);

  const stats = [
    { icon: Calendar, value: "52", delta: "+12%", deltaTone: "text-emerald-500", label: "Active Events" },
    { icon: TrendingUp, value: "96.7%", delta: "4%", deltaTone: "text-emerald-500", label: "Task success rate" },
    { icon: Clock, value: "12.4s", delta: "27%", deltaTone: "text-rose-500", label: "Average execution time" },
    { icon: Sparkles, value: "GPT-4o", delta: "", deltaTone: "", label: "Most used model" },
  ];

  const workflows = [
    { name: "Akolo Studio", cat: "Photography", catTone: "bg-rose-50 text-rose-600", status: "Running", dot: "bg-emerald-500", latency: "8.2s", last: "14 min ago" },
    { name: "Bake It Right", cat: "Catering", catTone: "bg-stone-100 text-stone-700", status: "Paused", dot: "bg-amber-500", latency: "11.4s", last: "32 min ago", muted: true },
    { name: "Prime Audio", cat: "Audio/Visual", catTone: "bg-sky-50 text-sky-600", status: "Running", dot: "bg-emerald-500", latency: "6.7s", last: "1h ago" },
    { name: "Event Bloom", cat: "Decoration", catTone: "bg-violet-50 text-violet-600", status: "Running", dot: "bg-emerald-500", latency: "4.2s", last: "2h ago" },
  ];

  const agents = [
    { label: "Venue & Space", pct: "32.1%", color: "bg-rose-400" },
    { label: "Catering & Food", pct: "19.6%", color: "bg-orange-400" },
    { label: "Decoration", pct: "18.6%", color: "bg-amber-300" },
    { label: "Photography", pct: "15.3%", color: "bg-rose-300" },
    { label: "Entertainment", pct: "14.3%", color: "bg-stone-300" },
  ];

  const bars = [40, 30, 50, 70, 60, 80, 40, 90, 60, 50, 70, 30];

  return (
    <section ref={ref} className="relative py-32 overflow-hidden bg-stone-50 text-stone-900">
      <div className="absolute inset-0 opacity-[0.5]" style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />
      <div className="absolute inset-0 bg-gradient-to-b from-white via-stone-50 to-white" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <p className="fg-text text-xs uppercase tracking-[0.3em] text-stone-500 mb-6">Mission Control</p>
          <h2
            className="fg-text text-stone-900"
            style={{ fontSize: "clamp(36px, 8vw, 84px)", lineHeight: 1.05, fontWeight: 500, letterSpacing: "-0.02em" }}
          >
            One{" "}
            <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400 }}>dashboard</span>.<br/>
            Every <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400 }}>event</span> detail.
          </h2>
          <p className="fg-text mt-6 text-base md:text-lg text-stone-600 max-w-xl mx-auto">
            Track events, vendors, budgets, and teams in real time — built for fast-moving event organizations.
          </p>
        </div>

        {/* MacBook frame — static, tilts on hover */}
        <div className="mx-auto" style={{ maxWidth: '68%' }}>
        <div
          className="macbook-wrap max-w-5xl mx-auto relative group transition-transform duration-700 ease-out hover:[transform:perspective(1500px)_rotateX(-6deg)_rotateY(6deg)_rotateZ(-1deg)]"
          style={{ perspective: 1500, transformStyle: "preserve-3d" }}
        >
          <div className="relative rounded-t-[18px] bg-neutral-800 p-[10px] pb-[14px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-3 bg-neutral-900 rounded-b-lg z-10" />
            <div className="macbook-screen-inner relative aspect-[16/10] rounded-[10px] overflow-hidden bg-white border border-neutral-700">
              <div className="h-full flex bg-stone-50 text-stone-900">
                {/* Sidebar */}
                <div className="w-10 border-r border-stone-200 bg-white flex flex-col items-center py-3 gap-3">
                  <div className="w-6 h-6 rounded bg-stone-900 flex items-center justify-center">
                    <LayoutGrid className="w-3 h-3 text-white" />
                  </div>
                  {[Workflow, Store, Layers, Brain, Ticket, Megaphone, MessageSquare, Bell, Settings].map((Icon, i) => (
                    <Icon key={i} className="w-3 h-3 text-stone-400" />
                  ))}
                </div>

                {/* Main */}
                <div className="flex-1 p-3 overflow-hidden space-y-3">
                  {/* Stat cards */}
                  <div className="grid grid-cols-4 gap-2">
                    {stats.map((s, i) => (
                      <div key={i} className="rounded-lg border border-stone-200 bg-white p-2.5">
                        <s.icon className="w-3 h-3 text-stone-400 mb-1" />
                        <div className="flex items-baseline gap-1">
                          <p className="text-[13px] font-bold leading-none text-stone-900">{s.value}</p>
                          {s.delta && <span className={`text-[8px] font-semibold ${s.deltaTone}`}>{s.delta}</span>}
                        </div>
                        <p className="text-[8px] text-stone-500 mt-1">{s.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Workflow monitor */}
                  <div className="rounded-lg border border-stone-200 bg-white p-3">
                    <p className="text-[10px] font-semibold text-stone-900 mb-2">Workflow monitor</p>
                    <div className="grid grid-cols-[1.4fr_1fr_1fr_0.7fr_0.9fr] gap-1 text-[8px] text-stone-400 pb-1.5 border-b border-stone-100">
                      <span>Vendor name</span><span>Category</span><span>Status</span><span>Latency</span><span>Last run</span>
                    </div>
                    {workflows.map((w, i) => (
                      <div key={i} className={`grid grid-cols-[1.4fr_1fr_1fr_0.7fr_0.9fr] gap-1 text-[9px] py-1.5 items-center ${w.muted ? 'bg-stone-50 -mx-3 px-3' : ''}`}>
                        <span className="font-semibold text-stone-900">{w.name}</span>
                        <span><span className={`px-1.5 py-0.5 rounded-full text-[8px] ${w.catTone}`}>{w.cat}</span></span>
                        <span className="flex items-center gap-1 text-stone-700"><span className={`w-1 h-1 rounded-full ${w.dot}`} />{w.status}</span>
                        <span className="text-stone-500">{w.latency}</span>
                        <span className="text-stone-400">{w.last}</span>
                      </div>
                    ))}
                  </div>

                  {/* Bottom row */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-lg border border-stone-200 bg-white p-2.5">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-[9px] font-semibold text-stone-900">Agents by status</p>
                        <div className="flex gap-px text-[7px] rounded-full bg-stone-100 p-0.5">
                          <span className="px-1.5 py-0.5 rounded-full bg-white shadow-sm">By Category</span>
                          <span className="px-1.5 py-0.5 text-stone-400">By Employee</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="relative w-12 h-12 rounded-full" style={{
                          background: 'conic-gradient(#fb7185 0 32%, #fb923c 32% 52%, #fcd34d 52% 70%, #fda4af 70% 86%, #d6d3d1 86% 100%)'
                        }}>
                          <div className="absolute inset-1.5 rounded-full bg-white flex flex-col items-center justify-center">
                            <span className="text-[9px] font-bold text-stone-900 leading-none">87</span>
                            <span className="text-[6px] text-stone-400">Total</span>
                          </div>
                        </div>
                        <div className="flex-1 space-y-0.5">
                          {agents.map((a, i) => (
                            <div key={i} className="flex items-center text-[7px]">
                              <span className={`w-1 h-1 rounded-full ${a.color} mr-1`} />
                              <span className="text-stone-700 flex-1 truncate">{a.label}</span>
                              <span className="text-stone-500">{a.pct}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border border-stone-200 bg-white p-2.5">
                      <p className="text-[9px] font-semibold text-stone-900 mb-2">Tasks breakdown</p>
                      <div className="flex items-end gap-0.5 h-12">
                        {bars.map((h, i) => (
                          <div key={i} className="flex-1 rounded-t bg-rose-300" style={{ height: `${h}%` }} />
                        ))}
                      </div>
                      <div className="flex justify-between text-[6px] text-stone-400 mt-1">
                        {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map(m => <span key={m}>{m}</span>)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-3 bg-gradient-to-b from-neutral-700 via-neutral-600 to-neutral-800 rounded-b-[20px] mx-auto"
               style={{ width: '108%', marginLeft: '-4%' }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1.5 rounded-b-md bg-neutral-900" />
          </div>
          <div className="absolute -bottom-12 left-1/4 right-1/4 h-12 bg-gradient-to-b from-background/10 to-transparent blur-2xl rounded-full" />
        </div>
        </div>
      </div>
    </section>
  );
};

export default SaasMacBookShowcase;
