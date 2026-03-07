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
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-in-out"
      style={{
        width: scrolled ? '680px' : '95%',
        maxWidth: scrolled ? '680px' : '1200px',
      }}>
      <div className={`flex items-center justify-between h-14 px-2 transition-all duration-500 ease-in-out ${
        scrolled 
          ? 'bg-card/90 dark:bg-card/90 backdrop-blur-xl border border-border rounded-full shadow-elevated' 
          : ''
      }`}>
        <div className={`flex items-center transition-all duration-500 ease-in-out overflow-hidden ${scrolled ? 'max-w-0 opacity-0 scale-x-0' : 'max-w-[180px] opacity-100 scale-x-100'}`}
          style={{ transformOrigin: 'right center' }}>
          <Link to="/" className="flex items-center gap-2 whitespace-nowrap">
            <AnimatedLogo size={24} />
            <span className="font-bold text-sm text-foreground">Event Nest</span>
          </Link>
        </div>

        <div className={`hidden md:flex items-center gap-1 backdrop-blur-xl rounded-full px-1.5 py-1 transition-all duration-500 ${
          scrolled 
            ? '' 
            : 'bg-card/80 dark:bg-white/8 border border-border dark:border-white/10 shadow-card'
        }`}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link key={item.label} to={item.to} className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${isActive ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}>
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className={`hidden md:flex items-center gap-2 transition-all duration-500 ease-in-out overflow-hidden ${scrolled ? 'max-w-0 opacity-0 scale-x-0' : 'max-w-[280px] opacity-100 scale-x-100'}`}
          style={{ transformOrigin: 'left center' }}>
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
