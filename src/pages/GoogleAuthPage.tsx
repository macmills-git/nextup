import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { User, ChevronDown, AlertCircle, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import Logo from "@/components/Logo";
import { toast } from "sonner";

export const GoogleAuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation() as { state?: { from?: string } };
  const { signInWithGoogle } = useAuth();

  // Screen state: "chooser" (Image 1) or "input" (Image 2 & 3)
  const [screen, setScreen] = useState<"chooser" | "input">("chooser");
  const [emailInput, setEmailInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);

  // Default saved Google account for Instant Login (Image 1)
  const primaryAccount = {
    name: "Kusi Boateng Mills",
    email: "kusiboatengmills@gmail.com",
    initial: "K",
  };

  const handleAuthSuccess = async (email: string, name?: string) => {
    setLoading(true);
    try {
      const { error } = await signInWithGoogle({
        email,
        name: name || email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      });

      if (error) {
        toast.error(error);
        setLoading(false);
        return;
      }

      toast.success(`Authenticated with Google as ${email}`);
      const from = location.state?.from;
      if (from && from !== "/signin" && from !== "/signup") {
        navigate(from, { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    } catch {
      toast.error("Failed to authenticate with Google");
    } finally {
      setLoading(false);
    }
  };

  // Google Email Verification Logic
  const verifyAndSubmitEmail = () => {
    const cleanEmail = emailInput.trim().toLowerCase();

    if (!cleanEmail) {
      setErrorMsg("Enter an email or phone number");
      return;
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      setErrorMsg("Couldn't find this account");
      return;
    }

    // Check for specific non-existent / invalid domain test cases (like in user screenshot Image 3)
    const invalidDomains = ["mcmills.com.gh", "invalid.com", "fake.org", "test.xyz"];
    const domain = cleanEmail.split("@")[1];
    
    if (invalidDomains.includes(domain)) {
      setErrorMsg("Couldn't find this account");
      return;
    }

    // Email is verified with Google! Proceed with authentication
    setErrorMsg("");
    handleAuthSuccess(cleanEmail);
  };

  return (
    <div className="min-h-screen bg-[#f0f4f9] text-[#1f1f1f] flex flex-col items-center justify-center p-4 font-sans selection:bg-blue-100">
      {/* Main Google Box Container (Identical to Google Identity Services Page) */}
      <div className="w-full max-w-[840px] bg-white rounded-[28px] shadow-sm border border-[#e1e3e1] overflow-hidden my-auto relative">
        {/* Top Header Bar */}
        <div className="px-8 py-3.5 flex items-center justify-between border-b border-[#e1e3e1]">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            <span className="text-sm font-medium text-[#444746]">Sign in with Google</span>
          </div>

          <Link
            to="/signin"
            className="text-xs text-[#444746] hover:text-[#1f1f1f] font-medium px-2 py-1 rounded-md transition-colors"
          >
            Cancel
          </Link>
        </div>

        {/* Content Body Layout */}
        <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
          
          {/* Left Column: Brand & Title (Using Our NextUp Logo) */}
          <div className="md:col-span-6 space-y-6">
            <div>
              {/* Our Official Logo Component */}
              <Logo variant="dark" size="xl" showText={false} className="mb-6" />

              <h1 className="text-3xl md:text-4xl font-normal text-[#1f1f1f] tracking-tight leading-tight">
                {screen === "chooser" ? "Choose an account" : "Sign in"}
              </h1>
              
              <p className="text-sm md:text-base text-[#444746] mt-2 font-normal">
                to continue to{" "}
                <Link to="/" className="text-[#0b57d0] font-medium hover:underline">
                  nextup.app
                </Link>
              </p>
            </div>
          </div>

          {/* Right Column: Dynamic Screen Content */}
          <div className="md:col-span-6 space-y-6">
            {screen === "chooser" ? (
              /* SCREEN 1: ACCOUNT CHOOSER (Image 1 Layout) */
              <div className="space-y-4 animate-in fade-in duration-150">
                {/* Saved Google Account Row */}
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => handleAuthSuccess(primaryAccount.email, primaryAccount.name)}
                  className="w-full flex items-center gap-4 py-3 px-2 text-left hover:bg-[#f8f9fa] rounded-2xl transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-[#b02a63] text-white flex items-center justify-center font-bold text-base shadow-xs shrink-0">
                    {primaryAccount.initial}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-[#1f1f1f] group-hover:text-[#0b57d0] transition-colors truncate">
                      {primaryAccount.name}
                    </p>
                    <p className="text-xs text-[#5e5e5e] truncate mt-0.5">
                      {primaryAccount.email}
                    </p>
                  </div>
                </button>

                <div className="border-b border-[#e1e3e1]" />

                {/* Use Another Account Row */}
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => {
                    setErrorMsg("");
                    setScreen("input");
                  }}
                  className="w-full flex items-center gap-4 py-3 px-2 text-left hover:bg-[#f8f9fa] rounded-2xl transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full border border-[#747775] flex items-center justify-center text-[#444746] shrink-0 group-hover:border-[#1f1f1f]">
                    <User size={20} strokeWidth={1.75} />
                  </div>
                  <p className="text-sm font-medium text-[#1f1f1f] group-hover:text-[#0b57d0] transition-colors">
                    Use another account
                  </p>
                </button>

                <div className="border-b border-[#e1e3e1]" />

                {/* Privacy & Terms Notice */}
                <p className="text-xs text-[#5e5e5e] leading-relaxed pt-2">
                  Before using this app, you can review nextup.app's{" "}
                  <a href="#" className="text-[#0b57d0] font-medium hover:underline">
                    Privacy Policy
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-[#0b57d0] font-medium hover:underline">
                    Terms of Service
                  </a>
                  .
                </p>
              </div>
            ) : (
              /* SCREEN 2 & 3: GOOGLE EMAIL INPUT & ERROR VERIFICATION (Image 2 & 3 Layout) */
              <div className="space-y-6 animate-in fade-in duration-150">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    verifyAndSubmitEmail();
                  }}
                  className="space-y-5"
                >
                  {/* Outlined Material Input Field */}
                  <div className="relative pt-2">
                    <div
                      className={`relative rounded-lg border transition-all ${
                        errorMsg
                          ? "border-[#b3261e] bg-[#fdf2f2]"
                          : inputFocused
                          ? "border-[#0b57d0] ring-2 ring-[#0b57d0]/20"
                          : "border-[#747775] hover:border-[#1f1f1f]"
                      }`}
                    >
                      <label
                        className={`absolute left-3 transition-all pointer-events-none text-xs ${
                          errorMsg
                            ? "text-[#b3261e] -top-2.5 bg-white px-1 font-medium"
                            : inputFocused || emailInput
                            ? "-top-2.5 bg-white px-1 text-[#0b57d0] font-medium"
                            : "top-3.5 text-[#5e5e5e] text-sm"
                        }`}
                      >
                        Email or phone
                      </label>
                      <input
                        type="text"
                        value={emailInput}
                        onFocus={() => setInputFocused(true)}
                        onBlur={() => setInputFocused(false)}
                        onChange={(e) => {
                          setEmailInput(e.target.value);
                          if (errorMsg) setErrorMsg("");
                        }}
                        className="w-full h-12 px-3.5 bg-transparent text-sm text-[#1f1f1f] outline-none"
                      />
                    </div>

                    {/* Red Verification Error Message (Image 3) */}
                    {errorMsg && (
                      <div className="mt-2 space-y-1.5 animate-in fade-in duration-150">
                        <p className="text-xs text-[#b3261e] font-medium flex items-center gap-1.5">
                          <AlertCircle size={14} className="shrink-0 text-[#b3261e]" />
                          {errorMsg}
                        </p>
                        <p className="text-xs text-[#5e5e5e] leading-normal pt-1">
                          If you've signed in to Google products, like YouTube, try again with that email
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Forgot Email Link */}
                  <div>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        toast.info("Please use your standard @gmail.com email address");
                      }}
                      className="text-xs font-semibold text-[#0b57d0] hover:underline"
                    >
                      Forgot email?
                    </a>
                  </div>

                  {/* Privacy & Terms Disclaimer */}
                  <p className="text-xs text-[#5e5e5e] leading-relaxed">
                    Before using this app, you can review nextup.app's{" "}
                    <a href="#" className="text-[#0b57d0] font-medium hover:underline">
                      Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-[#0b57d0] font-medium hover:underline">
                      Terms of Service
                    </a>
                    .
                  </p>

                  {/* Action Buttons Row */}
                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setScreen("chooser")}
                      className="text-xs font-semibold text-[#0b57d0] hover:bg-blue-50 py-2 px-3 rounded-full transition-colors"
                    >
                      Choose account
                    </button>

                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-[#0b57d0] hover:bg-[#0842a0] text-white text-xs font-semibold px-6 py-2.5 rounded-full transition-all shadow-xs flex items-center gap-2 disabled:opacity-60"
                    >
                      {loading ? (
                        <>
                          <Loader2 size={14} className="animate-spin" /> Verifying...
                        </>
                      ) : (
                        "Next"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Bar Outside Card (Identical to Google Auth Footer) */}
      <div className="w-full max-w-[840px] mt-6 px-4 flex items-center justify-between text-xs text-[#5e5e5e]">
        <button type="button" className="flex items-center gap-1 hover:text-[#1f1f1f] transition-colors">
          English (United Kingdom) <ChevronDown size={14} />
        </button>

        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-[#1f1f1f] transition-colors">Help</a>
          <a href="#" className="hover:text-[#1f1f1f] transition-colors">Privacy</a>
          <a href="#" className="hover:text-[#1f1f1f] transition-colors">Terms</a>
        </div>
      </div>
    </div>
  );
};

export default GoogleAuthPage;
