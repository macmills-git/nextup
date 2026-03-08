import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useState } from "react";
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
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between h-14">
        <Link to="/" className="flex items-center gap-2">
          <AnimatedLogo size={24} />
          <span className="font-bold text-sm text-foreground">Event Nest</span>
        </Link>

        <div className="hidden md:flex items-center gap-1 bg-card/80 dark:bg-secondary/50 border border-border rounded-full px-1.5 py-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link key={item.label} to={item.to} className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${isActive ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}>
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <button onClick={toggleTheme} className="w-8 h-8 rounded-full flex items-center justify-center border border-border bg-card hover:bg-secondary transition-colors micro-press">
            {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-yellow-400" /> : <Moon className="w-3.5 h-3.5 text-primary" />}
          </button>
          <Button size="sm" asChild className="h-8 text-xs rounded-full border border-border bg-card text-foreground hover:bg-secondary micro-press">
            <Link to="/signin">Log in</Link>
          </Button>
          <Button size="sm" asChild className="h-8 text-xs rounded-full border-none text-white gradient-primary micro-press">
            <Link to="/signup">Sign up</Link>
          </Button>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-card/95 backdrop-blur-xl border-t border-border px-5 pb-4 pt-2 space-y-2 animate-fade-in">
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
