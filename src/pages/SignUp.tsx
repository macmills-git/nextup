import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-secondary dark:bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-[960px] bg-card rounded-3xl shadow-elevated border border-border overflow-hidden flex min-h-[600px]">
        {/* Left - Form */}
        <div className="flex-1 p-10 flex flex-col justify-center max-w-md mx-auto w-full">
          <div className="flex items-center gap-2 mb-10">
            <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center">
              <span className="text-white font-bold text-xs">E</span>
            </div>
            <span className="text-sm font-semibold text-foreground">Event Nest</span>
          </div>

          <h1 className="text-3xl font-bold text-foreground mb-2">Create an account</h1>
          <p className="text-sm text-muted-foreground mb-8">Let's get started with your 30 day free trial.</p>

          <div className="space-y-5">
            <div>
              <label className="text-sm font-medium text-foreground">Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your full name"
                className="w-full mt-1.5 pb-2.5 bg-transparent border-b border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full mt-1.5 pb-2.5 bg-transparent border-b border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full mt-1.5 pb-2.5 bg-transparent border-b border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors pr-8"
                />
                <button type="button" className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              className="w-full h-11 rounded-full text-sm font-medium text-white transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, hsl(220, 15%, 15%), hsl(220, 15%, 20%))' }}
              onClick={() => window.location.href = "/dashboard"}
            >
              Create account
            </button>

            <button className="w-full h-11 rounded-full border border-border text-sm font-medium text-foreground flex items-center justify-center gap-2 hover:bg-secondary transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Sign up with Google
            </button>
          </div>

          <p className="text-xs text-muted-foreground text-center mt-8">
            Already have an account? <Link to="/signin" className="text-primary hover:underline font-medium">Sign in</Link>
          </p>
        </div>

        {/* Right - Visual */}
        <div className="hidden md:flex flex-1 relative overflow-hidden items-center justify-center" style={{
          background: 'linear-gradient(135deg, hsl(30, 40%, 85%), hsl(340, 30%, 80%), hsl(260, 40%, 75%))',
        }}>
          <div className="absolute top-6 right-6 z-10">
            <Link to="/signin" className="px-5 py-2 rounded-full text-xs font-medium text-white" style={{
              background: 'linear-gradient(135deg, hsl(220, 15%, 15%), hsl(220, 15%, 25%))',
            }}>
              Log in
            </Link>
          </div>

          {/* Phone mockup */}
          <div className="relative w-64 h-[420px] bg-card dark:bg-background rounded-[32px] shadow-elevated border border-border p-3">
            <div className="w-full h-full rounded-[24px] bg-card overflow-hidden flex flex-col">
              <div className="px-4 pt-6 pb-3">
                <p className="text-xs text-muted-foreground">Welcome,</p>
                <p className="text-sm font-bold text-foreground">New Planner</p>
              </div>
              <div className="px-4 py-3 bg-primary/5 mx-3 rounded-xl">
                <p className="text-xs text-muted-foreground">Get Started</p>
                <p className="text-lg font-bold text-foreground">30 days free</p>
                <p className="text-[10px] text-primary">No credit card required</p>
              </div>
              <div className="px-4 mt-3 space-y-2 flex-1">
                {["AI Planning", "Vendor Marketplace", "Team Collaboration"].map(e => (
                  <div key={e} className="flex items-center gap-2 p-2 rounded-lg bg-secondary/50">
                    <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center">
                      <span className="text-[8px] text-primary">✦</span>
                    </div>
                    <span className="text-[11px] text-foreground">{e}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute top-20 left-6 bg-card/90 backdrop-blur rounded-xl p-3 shadow-elevated border border-border" style={{ animation: 'floatY 4s ease-in-out infinite' }}>
            <p className="text-[10px] font-semibold text-foreground">AI Powered</p>
            <p className="text-xs text-muted-foreground">Smart planning</p>
          </div>
          <div className="absolute bottom-24 right-6 bg-card/90 backdrop-blur rounded-xl p-3 shadow-elevated border border-border" style={{ animation: 'floatY 4s ease-in-out infinite 1s' }}>
            <p className="text-[10px] font-semibold text-foreground">100+ Templates</p>
            <p className="text-xs text-muted-foreground">Ready to use</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
