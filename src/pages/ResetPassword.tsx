import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { updateUser } = useAuth();

  const handleSubmit = async () => {
    if (password.length < 8) return toast.error("Password must be at least 8 characters");
    if (password !== confirm) return toast.error("Passwords do not match");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Password updated successfully");
      navigate("/dashboard", { replace: true });
    }, 400);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-[420px]">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-sm">
            N
          </div>
          <span className="text-base font-black tracking-tight text-foreground">NEXTUP</span>
        </div>
        <h1 className="text-2xl font-normal text-foreground mb-1">Set a new password</h1>
        <p className="text-sm text-muted-foreground mb-6">Choose a strong password you haven't used before.</p>

        <div className="space-y-5">
          {[
            { label: "New password", value: password, set: setPassword },
            { label: "Confirm password", value: confirm, set: setConfirm },
          ].map((f) => (
            <div key={f.label}>
              <label className="text-xs font-medium text-muted-foreground">{f.label}</label>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  value={f.value}
                  onChange={(e) => f.set(e.target.value)}
                  className="w-full mt-1.5 h-10 px-3 bg-card border border-border rounded-lg text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20 pr-10"
                />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 mt-0.5 text-muted-foreground" onClick={() => setShow(!show)}>
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          ))}
          <button
            disabled={loading}
            onClick={handleSubmit}
            className="w-full h-10 rounded-lg text-sm font-medium bg-foreground text-background hover:bg-foreground/90 flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Updating…</> : "Update password"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
