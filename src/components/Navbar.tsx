import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import AnimatedLogo from "@/components/AnimatedLogo";

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
    const handleScroll = () => setIsCompact(window.scrollY > window.innerHeight * 0.85);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl">
      <div className="flex items-center justify-between h-14 px-2">
        <div className="flex items-center transition-all duration-500 ease-in-out overflow-hidden"
          style={{ maxWidth: isCompact ? '0px' : '180px', opacity: isCompact ? 0 : 1, transform: isCompact ? 'scaleX(0)' : 'scaleX(1)', transformOrigin: 'right center' }}>
          <Link to="/" className="flex items-center gap-2 whitespace-nowrap">
            <AnimatedLogo size={24} />
            <span className="font-bold text-sm text-foreground">Event Nest</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-1 bg-card/80 dark:bg-white/8 backdrop-blur-xl border border-border dark:border-white/10 rounded-full px-1.5 py-1 shadow-card">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link key={item.label} to={item.to} className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${isActive ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}>
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-2 transition-all duration-500 ease-in-out overflow-hidden"
          style={{ maxWidth: isCompact ? '0px' : '280px', opacity: isCompact ? 0 : 1, transform: isCompact ? 'scaleX(0)' : 'scaleX(1)', transformOrigin: 'left center' }}>
          <button onClick={toggleTheme} className="w-8 h-8 rounded-full flex items-center justify-center border border-border bg-card hover:bg-secondary transition-colors">
            {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-yellow-400" /> : <Moon className="w-3.5 h-3.5 text-primary" />}
          </button>
          <Button size="sm" asChild className="h-8 text-xs rounded-full border border-border bg-card text-foreground hover:bg-secondary">
            <Link to="/signin">Log in</Link>
          </Button>
          <Button size="sm" asChild className="h-8 text-xs rounded-full border-none text-white gradient-primary">
            <Link to="/signup">Sign up</Link>
          </Button>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-card/95 backdrop-blur-xl border border-border rounded-2xl mt-2 px-5 pb-4 pt-2 space-y-2 shadow-elevated animate-fade-in">
          {navItems.map((item) => (
            <Link key={item.label} to={item.to} className="block text-xs font-medium text-muted-foreground py-2 hover:text-foreground" onClick={() => setMobileOpen(false)}>{item.label}</Link>
          ))}
          <div className="flex gap-2 pt-2 items-center">
            <button onClick={toggleTheme} className="w-8 h-8 rounded-full flex items-center justify-center bg-secondary border border-border">
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-yellow-400" /> : <Moon className="w-3.5 h-3.5 text-primary" />}
            </button>
            <Button size="sm" asChild className="h-8 text-xs rounded-full border border-border bg-card text-foreground"><Link to="/signin">Log in</Link></Button>
            <Button size="sm" asChild className="h-8 text-xs rounded-full border-none text-white gradient-primary"><Link to="/signup">Sign up</Link></Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;