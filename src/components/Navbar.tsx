import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { User, LogOut, Activity, ChevronDown } from "lucide-react";
import Logo from "@/components/Logo";

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, signOut } = useAuth();
  const profileRef = useRef<HTMLDivElement>(null);

  // Close profile dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    setProfileOpen(false);
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(href);
    }
  };

  const navItems = [
    { label: "Events", to: "/events" },
    { label: "Vendors", to: "/vendors" },
    user?.role === "admin"
      ? { label: "Admin Console", to: "/admin" }
      : { label: "Activity", to: "/dashboard" },
  ];

  return (
    <header className="absolute top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-6xl px-4">
      {/* Expanded Floating Pill Navbar */}
      <div className="bg-white/95 backdrop-blur-md rounded-full px-6 py-3 flex items-center justify-between border border-black/10 relative z-50">
        {/* Brand Logo */}
        <Link 
          to="/" 
          className="hover:opacity-80 transition-opacity flex items-center"
        >
          <Logo variant="dark" size="md" />
        </Link>

        {/* Right Section: Desktop Navigation Items + Profile / User Actions */}
        <div className="hidden md:flex items-center gap-3">
          <nav className="flex items-center gap-1 bg-stone-100/80 rounded-full p-1 border border-stone-200/60">
            {navItems.map((item) => {
              const isActive = location.pathname === item.to || (item.to !== "/" && !item.to.startsWith("#") && location.pathname.startsWith(item.to));
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.to)}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 ${
                    isActive
                      ? "bg-black text-white"
                      : "text-stone-700 hover:text-black hover:bg-white/90"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {isAuthenticated ? (
            <div className="relative" ref={profileRef}>
              <button
                type="button"
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 p-1 pr-2.5 rounded-full bg-stone-100 hover:bg-stone-200/80 transition-colors border border-stone-200 focus:outline-none"
                aria-label="User account menu"
              >
                <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs">
                  {user?.name ? user.name.charAt(0).toUpperCase() : <User size={16} />}
                </div>
                <ChevronDown size={14} className={`text-stone-600 transition-transform duration-200 ${profileOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Profile Dropdown Menu */}
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl p-2 border border-stone-200 animate-in fade-in-down z-50 shadow-lg">
                  <div className="px-3 py-2 border-b border-stone-100">
                    <p className="text-xs font-bold text-stone-900 truncate">{user?.name || "Account"}</p>
                    <p className="text-[11px] text-stone-500 truncate">{user?.email}</p>
                  </div>

                  <div className="pt-1">
                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        signOut();
                      }}
                      className="w-full px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-xl flex items-center gap-2.5 transition-colors"
                    >
                      <LogOut size={15} className="text-red-500" />
                      Log out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleNavClick("/signin")}
                className="px-4 py-2 text-xs font-semibold text-stone-800 hover:text-black hover:bg-stone-100 rounded-full transition-colors"
              >
                Log in
              </button>
              <button
                onClick={() => handleNavClick("/signup")}
                className="px-4 py-2 text-xs font-semibold bg-black text-white hover:bg-black/90 rounded-full transition-colors shadow-sm"
              >
                Get Started
              </button>
            </div>
          )}
        </div>

        {/* Mobile Animated Hamburger Icon */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden relative w-6 h-5 flex flex-col justify-between items-center focus:outline-none cursor-pointer p-0 bg-transparent border-0"
          aria-label="Toggle Navigation Menu"
        >
          <span
            className={`w-5 h-[2px] bg-black rounded-full transition-transform duration-300 origin-center ${
              mobileOpen ? "translate-y-[9px] rotate-45" : "translate-y-0"
            }`}
            style={{ transitionTimingFunction: "cubic-bezier(0.77,0,0.175,1)" }}
          />
          <span
            className={`w-5 h-[2px] bg-black rounded-full transition-transform duration-300 origin-center ${
              mobileOpen ? "-translate-y-[9px] -rotate-45" : "translate-y-0"
            }`}
            style={{ transitionTimingFunction: "cubic-bezier(0.77,0,0.175,1)" }}
          />
        </button>
      </div>

      {/* Mobile Dropdown Menu Container */}
      <div
        className={`md:hidden absolute top-full left-4 right-4 mt-3 bg-white rounded-2xl p-5 shadow-2xl transition-all duration-300 ease-out origin-top border border-black/5 ${
          mobileOpen
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col space-y-2.5">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.to)}
              className="text-left px-3 py-2 text-sm font-semibold text-stone-800 hover:text-black hover:bg-stone-50 rounded-xl transition-colors"
            >
              {item.label}
            </button>
          ))}

          <hr className="border-stone-100 my-1" />

          {isAuthenticated ? (
            <div className="pt-1 flex flex-col gap-2">
              <div className="px-3 py-1.5">
                <p className="text-xs font-bold text-stone-900">{user?.name || "Account"}</p>
                <p className="text-[11px] text-stone-500">{user?.email}</p>
              </div>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  signOut();
                }}
                className="w-full py-2 text-xs text-red-600 font-semibold hover:bg-red-50 rounded-xl flex items-center justify-center gap-2"
              >
                <LogOut size={14} /> Log out
              </button>
            </div>
          ) : (
            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={() => handleNavClick("/signin")}
                className="flex-1 py-2.5 rounded-xl border border-stone-200 text-black text-xs font-semibold hover:bg-stone-50 transition-colors"
              >
                Log in
              </button>
              <button
                onClick={() => handleNavClick("/signup")}
                className="flex-1 py-2.5 rounded-xl bg-black text-white text-xs font-semibold hover:bg-black/90 transition-colors"
              >
                Get Started
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
