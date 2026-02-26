import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Features", to: "/features" },
  { label: "Pricing", to: "/pricing" },
  { label: "Templates", to: "/templates" },
  { label: "Help/Support", to: "/help" },
  { label: "Docs", to: "/docs" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsCompact(window.scrollY > window.innerHeight * 0.85);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl">
      <div className="flex items-center justify-between h-14 px-2">
        {/* Logo - squeeze animation */}
        <div
          className="flex items-center transition-all duration-500 ease-in-out overflow-hidden"
          style={{
            maxWidth: isCompact ? '0px' : '180px',
            opacity: isCompact ? 0 : 1,
            transform: isCompact ? 'scaleX(0)' : 'scaleX(1)',
            transformOrigin: 'right center',
          }}
        >
          <Link to="/" className="flex items-center gap-2 whitespace-nowrap">
            <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center">
              <span className="text-white font-bold text-xs">E</span>
            </div>
            <span className="font-bold text-sm text-white">Event Nest</span>
          </Link>
        </div>

        {/* Desktop nav - centered pill */}
        <div className="hidden md:flex items-center gap-1 bg-white/8 backdrop-blur-xl border border-white/10 rounded-full px-1.5 py-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to || (item.to === "/" && location.pathname === "/");
            return (
              <Link
                key={item.label}
                to={item.to}
                className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                  isActive
                    ? "bg-white/15 text-white"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Auth buttons + theme toggle - squeeze animation */}
        <div
          className="hidden md:flex items-center gap-2 transition-all duration-500 ease-in-out overflow-hidden"
          style={{
            maxWidth: isCompact ? '0px' : '280px',
            opacity: isCompact ? 0 : 1,
            transform: isCompact ? 'scaleX(0)' : 'scaleX(1)',
            transformOrigin: 'left center',
          }}
        >
          <button
            onClick={toggleTheme}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-yellow-400" /> : <Moon className="w-3.5 h-3.5 text-blue-300" />}
          </button>
          <Button size="sm" asChild className="h-8 text-xs rounded-full whitespace-nowrap" style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: 'rgba(255,255,255,0.8)',
          }}>
            <Link to="/signin">Log in</Link>
          </Button>
          <Button size="sm" asChild className="h-8 text-xs rounded-full whitespace-nowrap" style={{
            background: 'linear-gradient(135deg, #4F7CF7, #5B8DFB)',
            border: 'none',
            color: 'white',
            boxShadow: '0 4px 15px rgba(79,124,247,0.3)',
          }}>
            <Link to="/signup">Sign up</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-white/80" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl mt-2 px-5 pb-4 pt-2 space-y-2">
          {navItems.map((item) => (
            <Link key={item.label} to={item.to} className="block text-xs font-medium text-white/70 py-2 hover:text-white" onClick={() => setMobileOpen(false)}>
              {item.label}
            </Link>
          ))}
          <div className="flex gap-2 pt-2 items-center">
            <button onClick={toggleTheme} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.06)' }}>
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-yellow-400" /> : <Moon className="w-3.5 h-3.5 text-blue-300" />}
            </button>
            <Button size="sm" asChild className="h-8 text-xs rounded-full" style={{
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.8)'
            }}>
              <Link to="/signin">Log in</Link>
            </Button>
            <Button size="sm" asChild className="h-8 text-xs rounded-full" style={{
              background: 'linear-gradient(135deg, #4F7CF7, #5B8DFB)', border: 'none', color: 'white'
            }}>
              <Link to="/signup">Sign up</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
