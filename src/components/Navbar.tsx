import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { User, LogOut, ChevronDown, LayoutDashboard, Heart, Settings, ShieldAlert } from "lucide-react";
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
    { label: "Publish Event", to: "/create/event" },
    user?.role === "admin"
      ? { label: "Admin Console", to: "/admin" }
      : { label: "Activity", to: "/dashboard" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-stone-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Brand Logo */}
        <Link 
          to="/" 
          className="hover:opacity-85 transition-opacity flex items-center"
        >
          <Logo variant="dark" size="md" />
        </Link>

        {/* Center Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to || (item.to !== "/" && !item.to.startsWith("#") && location.pathname.startsWith(item.to));
            return (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.to)}
                className={`px-4 py-1.5 text-xs md:text-sm font-medium rounded-full transition-all duration-200 ${
                  isActive
                    ? "border border-stone-300 bg-stone-100/90 text-stone-950 font-semibold shadow-2xs"
                    : "border border-transparent text-stone-600 hover:text-stone-900 hover:bg-stone-50"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action Button / User Menu */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <div className="relative" ref={profileRef}>
              <button
                type="button"
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 p-1 pr-2.5 rounded-full bg-stone-100 hover:bg-stone-200/80 transition-colors border border-stone-200 focus:outline-none"
                aria-label="User account menu"
              >
                {user?.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.name || "User avatar"}
                    className="w-8 h-8 rounded-full object-cover border border-stone-300"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs">
                    {user?.name ? user.name.charAt(0).toUpperCase() : <User size={16} />}
                  </div>
                )}
                <ChevronDown size={14} className={`text-stone-600 transition-transform duration-200 ${profileOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Taller, Spacious Profile Dropdown Menu */}
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-3xl p-3 border border-stone-200/90 animate-in fade-in-down z-50 shadow-xl space-y-2">
                  {/* User Profile Info Header */}
                  <div className="p-3 bg-stone-50/80 rounded-2xl border border-stone-100 flex items-center gap-3">
                    {user?.avatarUrl ? (
                      <img
                        src={user.avatarUrl}
                        alt={user.name || "User avatar"}
                        className="w-10 h-10 rounded-full object-cover border border-stone-200 shrink-0"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm shrink-0">
                        {user?.name ? user.name.charAt(0).toUpperCase() : <User size={18} />}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <p className="text-xs font-bold text-stone-900 truncate">{user?.name || "Account"}</p>
                        {user?.authProvider === "google" ? (
                          <span className="text-[9px] bg-blue-50 text-blue-600 font-bold px-1.5 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                            <svg className="w-2.5 h-2.5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                            Google
                          </span>
                        ) : user?.role === "admin" ? (
                          <span className="text-[9px] bg-purple-50 text-purple-700 font-bold px-1.5 py-0.5 rounded-full shrink-0">
                            Admin
                          </span>
                        ) : null}
                      </div>
                      <p className="text-[11px] text-stone-500 truncate mt-0.5">{user?.email}</p>
                    </div>
                  </div>

                  {/* Navigation Links */}
                  <div className="py-1 space-y-1">

                    <button
                      onClick={() => handleNavClick("/dashboard/saved")}
                      className="w-full px-3 py-2 text-xs font-semibold text-stone-700 hover:text-stone-900 hover:bg-stone-50 rounded-xl flex items-center gap-2.5 transition-colors"
                    >
                      <Heart size={15} className="text-stone-500" />
                      Saved Events
                    </button>

                    <button
                      onClick={() => handleNavClick("/dashboard/settings")}
                      className="w-full px-3 py-2 text-xs font-semibold text-stone-700 hover:text-stone-900 hover:bg-stone-50 rounded-xl flex items-center gap-2.5 transition-colors"
                    >
                      <Settings size={15} className="text-stone-500" />
                      Account Settings
                    </button>

                    {user?.role === "admin" && (
                      <button
                        onClick={() => handleNavClick("/admin")}
                        className="w-full px-3 py-2 text-xs font-semibold text-purple-700 hover:bg-purple-50 rounded-xl flex items-center gap-2.5 transition-colors"
                      >
                        <ShieldAlert size={15} className="text-purple-600" />
                        Admin Console
                      </button>
                    )}
                  </div>

                  <div className="border-t border-stone-100 pt-1">
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
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleNavClick("/signin")}
                className="text-sm font-medium text-stone-600 hover:text-stone-900 px-3 py-2 transition-colors"
              >
                Log in
              </button>
              <button
                onClick={() => handleNavClick("/signin")}
                className="bg-black text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-stone-800 transition-all shadow-xs"
              >
                Sign In
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
        className={`md:hidden absolute top-full left-0 right-0 bg-white/98 backdrop-blur-lg border-b border-stone-200/80 p-5 shadow-xl transition-all duration-300 ease-out origin-top ${
          mobileOpen
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col space-y-3">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.to)}
              className="text-left px-3 py-2 text-sm font-medium text-stone-700 hover:text-black hover:bg-stone-50 rounded-xl transition-colors"
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
                className="flex-1 py-2.5 rounded-full border border-stone-200 text-black text-xs font-semibold hover:bg-stone-50 transition-colors"
              >
                Log in
              </button>
              <button
                onClick={() => handleNavClick("/signin")}
                className="flex-1 py-2.5 rounded-full bg-black text-white text-xs font-semibold hover:bg-stone-800 transition-colors"
              >
                Sign In
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
