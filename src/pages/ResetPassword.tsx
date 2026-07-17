import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import AnimatedLogo from "@/components/AnimatedLogo";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes("type=recovery")) setReady(true);
    else {
      supabase.auth.getSession().then(({ data }) => setReady(!!data.session));
    }
  }, []);

  const handleSubmit = async () => {
    if (password.length < 8) return toast.error("Password must be at least 8 characters");
    if (password !== confirm) return toast.error("Passwords do not match");
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Password updated");
    navigate("/dashboard", { replace: true });
  };

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-sm text-muted-foreground">
        Verifying recovery link…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-[420px]">
        <div className="flex items-center gap-2 mb-10">
          <AnimatedLogo size={24} />
          <span className="text-sm font-semibold text-foreground tracking-tight">Nested</span>
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Set a new password</h1>
        <p className="text-sm text-muted-foreground mb-6">Choose a strong password you haven't used before.</p>

        <div className="space-y-5">
          {[
            { label: "New password", value: password, set: setPassword },
            { label: "Confirm password", value: confirm, set: setConfirm },
          ].map((f) => (
            <div key={f.label}>
              <label className="text-xs font-medium text-muted-foreground">{f.label}</label>
              <div className="relative">
                <input type={show ? "text" : "password"} value={f.value} onChange={(e) => f.set(e.target.value)}
                  className="w-full mt-1.5 h-10 px-3 bg-card border border-border rounded-lg text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20 pr-10" />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 mt-0.5 text-muted-foreground" onClick={() => setShow(!show)}>
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          ))}
          <button disabled={loading} onClick={handleSubmit}
            className="w-full h-10 rounded-lg text-sm font-medium bg-foreground text-background hover:bg-foreground/90 flex items-center justify-center gap-2 disabled:opacity-70">
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Updating…</> : "Update password"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
