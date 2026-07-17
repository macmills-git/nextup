import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2, Calendar, Store } from "lucide-react";
import AnimatedLogo from "@/components/AnimatedLogo";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { toast } from "sonner";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<UserRole>("organizer");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signUpWithPassword, signInWithGoogle } = useAuth();

  const handleSignUp = async () => {
    if (!email || !name) return setError("Please fill in all fields");
    if (password.length < 8) return setError("Password must be at least 8 characters");
    if (password !== confirmPassword) return setError("Passwords do not match");
    setError("");
    setLoading(true);
    const { error } = await signUpWithPassword(email, password, name, role);
    setLoading(false);
    if (error) {
      toast.error(error);
      return;
    }
    toast.success("Account created. Check your email if confirmation is required.");
    setTimeout(() => {
      navigate(role === "vendor" ? "/vendor/business/onboarding" : "/dashboard", { replace: true });
    }, 400);
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    const { error } = await signInWithGoogle(role);
    if (error) {
      toast.error(error);
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative z-[1]">
      <div className="w-full max-w-[420px]">
        <div className="flex items-center gap-2 mb-10">
          <AnimatedLogo size={24} />
          <span className="text-sm font-semibold text-foreground tracking-tight">Nested</span>
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Create an account</h1>
        <p className="text-sm text-muted-foreground mb-6">Start your 30-day free trial.</p>

        <div className="grid grid-cols-2 gap-2 p-1 bg-muted/40 rounded-xl mb-6 border border-border">
          {([
            { value: "organizer" as const, label: "Organizer", icon: Calendar, desc: "Plan & manage events" },
            { value: "vendor" as const, label: "Vendor", icon: Store, desc: "Offer your services" },
          ]).map((opt) => {
            const active = role === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setRole(opt.value)}
                className={`flex flex-col items-start gap-1 p-3 rounded-lg text-left transition-all ${
                  active ? "bg-card border border-border shadow-sm" : "border border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <div className="flex items-center gap-2">
                  <opt.icon className={`w-3.5 h-3.5 ${active ? "text-primary" : ""}`} />
                  <span className={`text-xs font-semibold ${active ? "text-foreground" : ""}`}>{opt.label}</span>
                </div>
                <span className="text-[10px] text-muted-foreground leading-tight">{opt.desc}</span>
              </button>
            );
          })}
        </div>

        <div className="space-y-5">
          <div>
            <label className="text-xs font-medium text-muted-foreground">{role === "vendor" ? "Business / Contact name" : "Full name"}</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)}
              placeholder={role === "vendor" ? "Akolo Studio" : "Your full name"}
              className="w-full mt-1.5 h-10 px-3 bg-card border border-border rounded-lg text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com"
              className="w-full mt-1.5 h-10 px-3 bg-card border border-border rounded-lg text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Password</label>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }} placeholder="••••••••"
                className="w-full mt-1.5 h-10 px-3 bg-card border border-border rounded-lg text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20 pr-10" />
              <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 mt-0.5 text-muted-foreground hover:text-foreground"
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Confirm Password</label>
            <div className="relative">
              <input type={showConfirmPassword ? "text" : "password"} value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); setError(""); }}
                onKeyDown={(e) => e.key === "Enter" && handleSignUp()} placeholder="••••••••"
                className={`w-full mt-1.5 h-10 px-3 bg-card border rounded-lg text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20 pr-10 ${error ? "border-destructive" : "border-border"}`} />
              <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 mt-0.5 text-muted-foreground hover:text-foreground"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {error && <p className="text-xs text-destructive mt-1.5">{error}</p>}
          </div>
          <button disabled={loading}
            className="w-full h-10 rounded-lg text-sm font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
            onClick={handleSignUp}>
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Creating…</> : `Create ${role} account`}
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
            <div className="relative flex justify-center text-[10px] uppercase"><span className="bg-background px-2 text-muted-foreground">or</span></div>
          </div>

          <button onClick={handleGoogle} disabled={googleLoading}
            className="w-full h-10 rounded-lg border border-border text-sm font-medium text-foreground flex items-center justify-center gap-2 hover:bg-muted transition-colors disabled:opacity-70">
            {googleLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
              <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            )}
            Continue with Google
          </button>
        </div>
        <p className="text-xs text-muted-foreground text-center mt-8">
          Already have an account? <Link to="/signin" className="text-foreground hover:underline font-medium">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
