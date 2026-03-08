import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, ChevronLeft, ChevronRight } from "lucide-react";
import AnimatedLogo from "@/components/AnimatedLogo";
import { useTheme } from "@/contexts/ThemeContext";

const carouselCards = [
  { badge: "Planners", title: "Plan smarter events", desc: "AI-powered timelines, vendor matching, and budget tracking at your fingertips.", color: "hsl(142, 71%, 45%)" },
  { badge: "Vendors", title: "Grow your business", desc: "Get discovered by thousands of event planners looking for your services.", color: "hsl(225, 90%, 60%)" },
  { badge: "Teams", title: "Collaborate seamlessly", desc: "Real-time coordination with structured specs and production-ready workflows.", color: "hsl(38, 92%, 50%)" },
  { badge: "Organizers", title: "Scale with confidence", desc: "From intimate gatherings to large conferences, manage it all from one dashboard.", color: "hsl(280, 70%, 60%)" },
];

const AuthCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const timer = setInterval(() => setActiveIndex(i => (i + 1) % carouselCards.length), 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-6" style={{
      background: isDark
        ? 'radial-gradient(ellipse at center, hsl(160, 30%, 8%) 0%, hsl(160, 20%, 3%) 100%)'
        : 'radial-gradient(ellipse at center, hsl(160, 40%, 92%) 0%, hsl(160, 30%, 85%) 100%)',
    }}>
      <div className="relative flex items-center justify-center w-full h-[280px]">
        {carouselCards.map((card, i) => {
          const offset = ((i - activeIndex + carouselCards.length) % carouselCards.length);
          const centered = offset === 0 ? 0 : offset === 1 ? 1 : offset === carouselCards.length - 1 ? -1 : offset > carouselCards.length / 2 ? offset - carouselCards.length : offset;
          const isActive = offset === 0;
          const absPos = Math.abs(centered);

          return (
            <div key={i} className="absolute transition-all duration-700 ease-in-out" style={{
              transform: `translateX(${centered * 145}px) scale(${isActive ? 1 : 0.85})`,
              opacity: absPos > 1 ? 0 : isActive ? 1 : 0.5,
              zIndex: isActive ? 10 : 5 - absPos,
            }}>
              <div className="w-[215px] h-[250px] rounded-2xl p-5 border transition-all duration-300"
                style={{
                  borderColor: isActive ? card.color : 'hsl(var(--border))',
                  background: isDark ? 'hsl(160, 15%, 6%)' : 'hsl(0, 0%, 100%)',
                  boxShadow: isActive ? `0 0 30px ${card.color}30` : 'none',
                }}
                onClick={() => setActiveIndex(i)}>
                <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold mb-3" style={{
                  background: `${card.color}20`,
                  color: card.color,
                }}>{card.badge}</span>
                <h3 className="font-bold text-foreground text-sm mb-2">{card.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{card.desc}</p>
                <div className="mt-4 w-full h-16 rounded-lg bg-secondary/50 dark:bg-accent/50 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-xl border border-border flex items-center justify-center">
                    <span className="text-xl">{["📅", "🏪", "👥", "📊"][i]}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-3 mt-6">
        <button onClick={() => setActiveIndex(i => (i - 1 + carouselCards.length) % carouselCards.length)} className="w-8 h-8 rounded-full bg-secondary/50 dark:bg-accent/50 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="flex gap-1.5">
          {carouselCards.map((_, i) => (
            <button key={i} onClick={() => setActiveIndex(i)} className={`h-1.5 rounded-full transition-all duration-500 ${i === activeIndex ? 'bg-primary w-6' : 'bg-muted-foreground/30 w-1.5'}`} />
          ))}
        </div>
        <button onClick={() => setActiveIndex(i => (i + 1) % carouselCards.length)} className="w-8 h-8 rounded-full bg-secondary/50 dark:bg-accent/50 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <p className="text-xs text-muted-foreground mt-4">Learn more →</p>
    </div>
  );
};

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative z-[1]">
      <div className="w-full max-w-[774px] bg-card rounded-3xl shadow-elevated border border-border overflow-hidden flex h-[486px]">
        {/* Left - Form */}
        <div className="flex-1 p-10 flex flex-col justify-center max-w-md mx-auto w-full">
          <div className="flex items-center gap-2 mb-10">
            <AnimatedLogo size={24} />
            <span className="text-sm font-semibold text-foreground">Event Nest</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back</h1>
          <p className="text-sm text-muted-foreground mb-8">Sign in to continue planning.</p>
          <div className="space-y-5">
            <div>
              <label className="text-sm font-medium text-foreground">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@example.com"
                className="w-full mt-1.5 pb-2.5 bg-transparent border-b border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Password</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••"
                  className="w-full mt-1.5 pb-2.5 bg-transparent border-b border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors pr-8" />
                <button type="button" className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <button className="w-full h-11 rounded-full text-sm font-medium text-white transition-opacity hover:opacity-90 gradient-primary" onClick={() => window.location.href = "/dashboard"}>Sign in</button>
            <button className="w-full h-11 rounded-full border border-border text-sm font-medium text-foreground flex items-center justify-center gap-2 hover:bg-secondary transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Sign in with Google
            </button>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-8">Don't have an account? <Link to="/signup" className="text-primary hover:underline font-medium">Create an account</Link></p>
        </div>

        {/* Right - Carousel */}
        <div className="hidden md:flex flex-1 relative overflow-hidden">
          <div className="absolute top-6 right-6 z-20">
            <Link to="/signup" className="px-4 py-2 rounded-full text-xs font-medium bg-card border border-border text-foreground hover:bg-secondary transition-colors">Sign up</Link>
          </div>
          <AuthCarousel />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
