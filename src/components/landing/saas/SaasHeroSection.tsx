import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronRight, ShoppingCart, Menu, TrendingDown, TrendingUp, X } from "lucide-react";

const PRIMARY = "#ef4d23";

const Logo = ({ className = "" }: { className?: string }) => {
  const r = 10, cx = 16, cy = 16;
  const petals = Array.from({ length: 8 }, (_, i) => {
    const a = (i * Math.PI * 2) / 8;
    return { cx: cx + Math.cos(a) * r, cy: cy + Math.sin(a) * r };
  });
  return (
    <svg viewBox="0 0 32 32" className={className} fill={PRIMARY}>
      {petals.map((p, i) => <circle key={i} cx={p.cx} cy={p.cy} r={3.5} />)}
      <circle cx={cx} cy={cy} r={3.5} />
    </svg>
  );
};

const Gauge = ({ value, color = PRIMARY, showLabels = false, min = 0, max = 100 }: { value: number; color?: string; showLabels?: boolean; min?: number | string; max?: number | string }) => {
  const total = 40;
  const active = Math.round((value / 100) * total);
  const cx = 100, cy = 100, rOuter = 80, rInner = 70;
  const ticks = Array.from({ length: total }, (_, i) => {
    const t = i / (total - 1);
    const angle = Math.PI + t * Math.PI;
    return {
      x1: cx + Math.cos(angle) * rInner,
      y1: cy + Math.sin(angle) * rInner,
      x2: cx + Math.cos(angle) * rOuter,
      y2: cy + Math.sin(angle) * rOuter,
      on: i < active,
    };
  });
  return (
    <div className="w-full" style={{ maxWidth: 260 }}>
      <svg viewBox="0 0 200 120" className="w-full h-auto">
        {ticks.map((t, i) => (
          <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke={t.on ? color : "#d4d4d8"} strokeWidth={2.5} strokeLinecap="round" />
        ))}
        <text x={100} y={105} textAnchor="middle" fontSize={22} fontWeight={600} fill="#0b0f1a">{value}%</text>
      </svg>
      {showLabels && (
        <div className="flex justify-between text-[11px] text-neutral-500 -mt-2 px-2">
          <span>{min}</span><span>{max}</span>
        </div>
      )}
    </div>
  );
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const items = [
    { label: "Home", dot: true },
    { label: "Features" },
    { label: "About" },
    { label: "Pages", chevron: true, accent: true },
  ];
  return (
    <div className="flex justify-center pt-4 sm:pt-6 px-3 sm:px-4">
      <div className="bg-white rounded-full shadow-sm border border-neutral-200 pl-2 pr-2 py-2 w-full max-w-[760px] relative flex items-center">
        <Logo className="w-7 h-7 sm:w-8 sm:h-8 shrink-0" />
        <div className="hidden md:flex items-center gap-6 ml-6 text-[14px]">
          {items.map((it) => (
            <a key={it.label} href="#" className={`flex items-center gap-1.5 ${it.accent ? "text-[#ef4d23]" : "text-neutral-800"}`}>
              {it.dot && <span className="w-[5px] h-[5px] rounded-full bg-black" />}
              {it.label}
              {it.chevron && <ChevronDown className="w-3.5 h-3.5" />}
            </a>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-3">
          <ShoppingCart className="hidden md:block w-4 h-4 text-neutral-700" />
          <Link to="/signup" className="inline-flex items-center gap-2 bg-[#ef4d23] text-white rounded-full text-[13px] font-medium pl-4 pr-1.5 py-1.5">
            <span className="hidden sm:inline">Get early access</span>
            <span className="sm:hidden">Early access</span>
            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center"><ChevronRight className="w-3.5 h-3.5" /></span>
          </Link>
          <button className="md:hidden p-1.5 rounded-full text-neutral-700" onClick={() => setOpen((o) => !o)} aria-label="menu">
            <Menu className="w-5 h-5" />
          </button>
        </div>
        {open && (
          <div className="absolute top-full left-2 right-2 mt-2 bg-white rounded-2xl shadow-lg border border-neutral-200 p-3 z-20 md:hidden">
            {items.map((it) => (
              <a key={it.label} href="#" className="block py-2 text-sm text-neutral-800">{it.label}</a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white rounded-2xl p-5">{children}</div>
);

const DashboardPreview = () => (
  <div className="px-3 sm:px-4">
    <div className="bg-[#f5f2ee] rounded-3xl p-4 sm:p-6 w-full max-w-[880px] mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        <Card>
          <div className="flex items-center justify-between text-[13px] mb-2">
            <span className="text-[#ef4d23] font-medium">Clicks</span>
            <span className="text-neutral-500">This Month</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[28px] font-semibold text-neutral-900 leading-none">6,896</span>
            <span className="bg-red-50 text-red-600 rounded-full px-2 py-0.5 inline-flex items-center gap-1 text-[11px]">
              <TrendingDown className="w-3 h-3" /> -3,382 (33%)
            </span>
          </div>
          <p className="text-[11px] text-neutral-500 mt-1">Compared to yesterday</p>
          <p className="text-center text-[11px] text-neutral-500 mt-4">Month Target achieved</p>
          <Gauge value={92} showLabels min="389K" max="425K" />
          <div className="bg-neutral-100 rounded-full p-1 flex mt-3 text-[12px]">
            <span className="flex-1 text-center bg-white shadow rounded-full py-1.5 font-medium text-neutral-900">Impressions</span>
            <span className="flex-1 text-center py-1.5 text-neutral-500">Clicks</span>
          </div>
        </Card>

        <div className="bg-white rounded-2xl p-5 flex flex-col gap-3">
          {[
            { l: "Show figures for", v: "This month" },
            { l: "Compare period by", v: "Month-to-date (MTD)" },
          ].map((g) => (
            <div key={g.l}>
              <label className="text-[12px] text-neutral-700 block mb-1">{g.l}</label>
              <button className="w-full border border-neutral-200 rounded-lg px-3 py-2 flex items-center justify-between text-[13px] text-neutral-800">
                {g.v} <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
          {[
            { l: "Ste targets (This month)", v: "10" },
            { l: "Ste targets (This year)", v: "100" },
          ].map((g) => (
            <div key={g.l}>
              <label className="text-[12px] text-neutral-700 block mb-1">{g.l}</label>
              <div className="flex items-center border border-neutral-200 rounded-lg px-3 py-2 text-[13px]">
                <span className="text-neutral-400 mr-1">#</span>
                <input defaultValue={g.v} className="flex-1 bg-transparent outline-none" />
              </div>
            </div>
          ))}
          <div className="flex items-center gap-3 mt-1">
            <button className="bg-[#ef4d23] text-white rounded-lg px-5 py-2 text-[13px] font-medium">Save</button>
            <button className="underline text-[13px] text-neutral-700">Cancel</button>
            <X className="ml-auto w-4 h-4 text-neutral-500" />
          </div>
        </div>

        <Card>
          <div className="flex items-center justify-between text-[13px] mb-2">
            <span className="text-[#ef4d23] font-medium">Video Starts</span>
            <span className="text-neutral-500">today</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[28px] font-semibold text-neutral-900 leading-none">0</span>
            <span className="bg-neutral-100 text-neutral-700 rounded-full px-2 py-0.5 inline-flex items-center gap-1 text-[11px]">
              <TrendingUp className="w-3 h-3" /> 0
            </span>
          </div>
          <p className="text-[11px] text-neutral-500 mt-1">Compared to yesterday</p>
          <div className="mt-4">
            <Gauge value={68} color="#9ca3af" />
          </div>
          <div className="bg-neutral-100 rounded-full p-1 flex mt-3 text-[12px]">
            <span className="flex-1 text-center bg-white shadow rounded-full py-1.5 font-medium text-neutral-900">Video Clicks</span>
            <span className="flex-1 text-center py-1.5 text-neutral-500">Video Starts</span>
          </div>
        </Card>
      </div>
    </div>
  </div>
);

const SaasHeroSection = () => {
  return (
    <div className="min-h-screen w-full bg-[#ededed] p-3 sm:p-4" style={{ fontFamily: "Inter, sans-serif" }}>
      <div className="relative w-full h-[calc(100vh-24px)] sm:h-[calc(100vh-32px)] overflow-hidden bg-[#d9d9d9] rounded-2xl sm:rounded-3xl">
        <video
          autoPlay loop muted playsInline preload="auto"
          disableRemotePlayback
          {...({ "webkit-playsinline": "true", "x5-playsinline": "true" } as any)}
          poster="https://images.unsplash.com/photo-1557683316-973673baf926?w=1600&q=60"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260424_064411_9e9d7f84-9277-41f4-ab10-59172d89e6be.mp4"
        />
        <div className="absolute inset-0 bg-white/10" />

        <div className="relative z-10">
          <Navbar />

          <div className="flex flex-col items-center px-4 pt-10 sm:pt-16 pb-8 sm:pb-12 text-center">
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-1.5 shadow-sm text-[13px]">
              <span className="w-2 h-2 rounded-full bg-[#ef4d23]" /> Nested Software
            </div>
            <h1
              className="mt-5 sm:mt-6 max-w-4xl text-[#0b0f1a]"
              style={{ fontSize: "clamp(36px, 8vw, 72px)", lineHeight: 1.05, fontWeight: 500, letterSpacing: "-0.02em" }}
            >
              Shaping{" "}
              <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400 }}>Events</span>
              <br />of tomorrow
            </h1>
            <p className="mt-4 sm:mt-6 text-neutral-700 px-2" style={{ fontSize: "clamp(13px, 3.5vw, 16px)" }}>
              The All-In-One Software Powering the Future of Event Planning
            </p>
            <Link
              to="/signup"
              className="mt-6 sm:mt-8 inline-flex items-center gap-3 bg-[#0b0f1a] text-white rounded-full pl-6 sm:pl-7 pr-2 py-2 sm:py-2.5 text-[14px]"
            >
              Get Started
              <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/15 flex items-center justify-center">
                <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
          </div>

          <DashboardPreview />
        </div>
      </div>
    </div>
  );
};

export default SaasHeroSection;
