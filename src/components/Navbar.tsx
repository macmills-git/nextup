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
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
      style={{ padding: scrolled ? "12px 16px 0" : "0px" }}
    >
      <nav
        className="w-full bg-background/80 backdrop-blur-xl border-b transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{
          maxWidth: scrolled ? "860px" : "100%",
          borderRadius: scrolled ? "16px" : "0px",
          borderWidth: scrolled ? "1px" : "0 0 1px 0",
          borderColor: "hsl(var(--border) / 0.2)",
          boxShadow: scrolled ? "0 8px 32px -8px hsl(var(--foreground) / 0.1)" : "none",
        }}
      >
        <div className="flex items-center justify-between h-14 px-4 lg:px-6">
          <Link to="/" className="flex items-center gap-2">
            <AnimatedLogo size={24} />
            <span
              className="font-semibold text-sm text-foreground transition-all duration-500"
              style={{ opacity: scrolled ? 0 : 1, width: scrolled ? 0 : "auto", overflow: "hidden" }}
            >
              Event Nest
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1 bg-muted/30 rounded-full px-1.5 py-1 border border-border/20">
            {navItems.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="w-8 h-8 rounded-full flex items-center justify-center border border-border/30 bg-muted/30 hover:bg-primary/10 hover:border-primary/30 transition-all duration-200"
            >
              {theme === "dark" ? (
                <Sun className="w-3.5 h-3.5 text-muted-foreground" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-muted-foreground" />
              )}
            </button>
            <Button
              size="sm"
              asChild
              className="h-8 text-xs rounded-full border border-border/30 bg-transparent text-foreground font-medium hover:bg-muted/50"
              style={{ display: scrolled ? "none" : undefined }}
            >
              <Link to="/signin">Log in</Link>
            </Button>
            <Button
              size="sm"
              asChild
              className="h-8 text-xs rounded-full bg-primary text-primary-foreground font-medium hover:brightness-110 shadow-sm"
            >
              <Link to="/signup">Sign up</Link>
            </Button>
          </div>

          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-background/90 backdrop-blur-xl border-t border-border/20 px-5 pb-4 pt-2 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="block text-xs text-foreground py-2 hover:text-primary"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex gap-2 pt-2 items-center">
              <button onClick={toggleTheme} className="w-8 h-8 rounded-full flex items-center justify-center bg-muted/30 border border-border/20">
                {theme === "dark" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              </button>
              <Button size="sm" asChild className="h-8 text-xs rounded-full border border-border/30 bg-transparent text-foreground">
                <Link to="/signin">Log in</Link>
              </Button>
              <Button size="sm" asChild className="h-8 text-xs rounded-full bg-primary text-primary-foreground">
                <Link to="/signup">Sign up</Link>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
