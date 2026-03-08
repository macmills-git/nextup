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
        className="w-full bg-background border-2 border-border transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{
          maxWidth: scrolled ? "860px" : "100%",
          borderRadius: scrolled ? "16px" : "0px",
          boxShadow: scrolled ? "var(--shadow-brutal)" : "none",
          borderBottomWidth: scrolled ? "2px" : "2px",
        }}
      >
        <div className="flex items-center justify-between h-14 px-4 lg:px-6">
          <Link to="/" className="flex items-center gap-2">
            <AnimatedLogo size={24} />
            <span
              className="font-bold text-sm text-foreground transition-all duration-500"
              style={{ opacity: scrolled ? 0 : 1, width: scrolled ? 0 : "auto", overflow: "hidden" }}
            >
              Event Nest
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1 bg-muted border-2 border-border rounded-xl px-1.5 py-1 shadow-brutal">
            {navItems.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all duration-150 ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-brutal"
                      : "text-foreground hover:bg-secondary hover:shadow-brutal"
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
              className="w-8 h-8 rounded-lg flex items-center justify-center border-2 border-border bg-secondary hover:bg-accent transition-colors brutal-hover"
            >
              {theme === "dark" ? (
                <Sun className="w-3.5 h-3.5 text-foreground" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-foreground" />
              )}
            </button>
            <Button
              size="sm"
              asChild
              className="h-8 text-xs rounded-lg border-2 border-border bg-background text-foreground font-bold hover:bg-secondary brutal-hover"
              style={{ display: scrolled ? "none" : undefined }}
            >
              <Link to="/signin">Log in</Link>
            </Button>
            <Button
              size="sm"
              asChild
              className="h-8 text-xs rounded-lg border-2 border-border bg-primary text-primary-foreground font-bold hover:brightness-110 shadow-brutal brutal-hover"
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
          <div className="md:hidden bg-background border-t-2 border-border px-5 pb-4 pt-2 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="block text-xs font-bold text-foreground py-2 hover:text-primary"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex gap-2 pt-2 items-center">
              <button
                onClick={toggleTheme}
                className="w-8 h-8 rounded-lg flex items-center justify-center bg-secondary border-2 border-border"
              >
                {theme === "dark" ? (
                  <Sun className="w-3.5 h-3.5 text-foreground" />
                ) : (
                  <Moon className="w-3.5 h-3.5 text-foreground" />
                )}
              </button>
              <Button size="sm" asChild className="h-8 text-xs rounded-lg border-2 border-border bg-background text-foreground font-bold">
                <Link to="/signin">Log in</Link>
              </Button>
              <Button size="sm" asChild className="h-8 text-xs rounded-lg border-2 border-border bg-primary text-primary-foreground font-bold shadow-brutal">
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
