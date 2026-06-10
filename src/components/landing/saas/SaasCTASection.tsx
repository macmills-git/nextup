import { Link } from "react-router-dom";
import { ArrowRight, Instagram, Twitter, Globe } from "lucide-react";
import { useEffect, useRef } from "react";

const SaasCTASection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number | null>(null);
  const fadingOutRef = useRef(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.style.opacity = "0";

    const cancelRAF = () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); rafRef.current = null; };
    const fade = (to: number, dur = 500) => {
      cancelRAF();
      const start = performance.now();
      const from = parseFloat(v.style.opacity || "0");
      const step = (t: number) => {
        const p = Math.min(1, (t - start) / dur);
        v.style.opacity = String(from + (to - from) * p);
        if (p < 1) rafRef.current = requestAnimationFrame(step);
      };
      rafRef.current = requestAnimationFrame(step);
    };

    const onLoaded = () => fade(1);
    const onTime = () => {
      if (!v.duration) return;
      if (!fadingOutRef.current && v.duration - v.currentTime <= 0.55) {
        fadingOutRef.current = true;
        fade(0);
      }
    };
    const onEnded = () => {
      v.style.opacity = "0";
      setTimeout(() => {
        v.currentTime = 0;
        v.play();
        fadingOutRef.current = false;
        fade(1);
      }, 100);
    };

    v.addEventListener("loadeddata", onLoaded);
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("ended", onEnded);
    return () => {
      v.removeEventListener("loadeddata", onLoaded);
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("ended", onEnded);
      cancelRAF();
    };
  }, []);

  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover translate-y-[17%]"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_115001_bcdaa3b4-03de-47e7-ad63-ae3e392c32d4.mp4"
        style={{ opacity: 0 }}
      />
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Nav strip */}
        <div className="relative z-20 pl-6 pr-6 py-6">
          <div className="rounded-full px-6 py-3 flex items-center justify-between max-w-5xl mx-auto liquid-glass">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <Globe className="text-white" size={22} />
                <span className="text-white font-semibold text-lg">Nested</span>
              </div>
              <div className="hidden md:flex items-center gap-6">
                <Link to="/features" className="text-white/80 hover:text-white text-sm font-medium transition-colors">Features</Link>
                <Link to="/pricing" className="text-white/80 hover:text-white text-sm font-medium transition-colors">Pricing</Link>
                <Link to="/docs" className="text-white/80 hover:text-white text-sm font-medium transition-colors">About</Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/signup" className="text-white text-sm">Sign Up</Link>
              <Link to="/signin" className="liquid-glass rounded-full px-6 py-2 text-white text-sm">Login</Link>
            </div>
          </div>
        </div>

        {/* Hero content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 text-center -translate-y-[10%]">
          <h2
            className="text-5xl md:text-6xl lg:text-7xl text-white mb-8 tracking-tight"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Built for the curious
          </h2>
          <div className="max-w-xl w-full space-y-4">
            <div className="liquid-glass rounded-full pl-6 pr-2 py-2 flex items-center gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-transparent outline-none text-white placeholder:text-white/40 text-base"
              />
              <Link to="/signup" className="bg-white rounded-full p-3 text-black inline-flex items-center justify-center">
                <ArrowRight size={20} />
              </Link>
            </div>
            <p className="text-white text-sm leading-relaxed px-4">
              Stay updated with the latest news and insights. Subscribe to our newsletter today and never miss out on exciting product updates.
            </p>
          </div>
          <Link to="/about" className="mt-8 liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors">
            Read the Manifesto
          </Link>
        </div>

        {/* Social icons footer */}
        <div className="relative z-10 flex justify-center gap-4 pb-12">
          <a aria-label="Instagram" href="#" className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all"><Instagram size={20} /></a>
          <a aria-label="Twitter" href="#" className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all"><Twitter size={20} /></a>
          <a aria-label="Website" href="#" className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all"><Globe size={20} /></a>
        </div>
      </div>
    </section>
  );
};

export default SaasCTASection;
