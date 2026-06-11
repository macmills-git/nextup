import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Events Near Me", to: "/events-near-me" },
  { label: "Features", to: "/features" },
  { label: "Pricing", to: "/pricing" },
  { label: "Docs", to: "/docs" },
];

const Wordmark = ({ scrolled }: { scrolled: boolean }) => (
  <span
    className="font-black text-foreground leading-none transition-all duration-500"
    style={{
      fontFamily: "'Space Grotesk', 'Inter Tight', 'Helvetica Now Display', sans-serif",
      letterSpacing: "-0.06em",
      fontSize: scrolled ? "20px" : "24px",
    }}
  >
    NESTED
  </span>
);

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
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
        className="w-full backdrop-blur-xl backdrop-saturate-150 border border-white/60 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{
          maxWidth: scrolled ? "920px" : "100%",
          borderRadius: scrolled ? "9999px" : "0px",
          background: "rgba(255,255,255,0.85)",
          boxShadow: scrolled
            ? "0 12px 40px -10px rgba(0,0,0,0.18), inset 0 1px 0 0 rgba(255,255,255,0.6)"
            : "0 4px 24px -8px rgba(0,0,0,0.08), inset 0 1px 0 0 rgba(255,255,255,0.5)",
        }}
      >
        <div className="flex items-center justify-between h-16 px-5 lg:px-7">
          <Link to="/" className="flex items-center">
            <Wordmark scrolled={scrolled} />
          </Link>

          <div className="hidden md:flex items-center gap-1 bg-stone-100/70 rounded-full px-2 py-1.5 border border-stone-200/60">
            {navItems.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  className={`px-4 py-1.5 text-[15px] font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? "bg-foreground text-background shadow-sm"
                      : "text-stone-700 hover:text-foreground hover:bg-white/70"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Button
              size="sm"
              asChild
              className="h-9 text-[15px] px-4 rounded-full border border-stone-300 bg-transparent text-foreground font-medium hover:bg-stone-100"
              style={{ display: scrolled ? "none" : undefined }}
            >
              <Link to="/signin">Log in</Link>
            </Button>
            <Button
              size="sm"
              asChild
              className="h-9 text-[15px] px-4 rounded-full bg-primary text-primary-foreground font-medium hover:brightness-110 shadow-sm"
            >
              <Link to="/signup">Sign up</Link>
            </Button>
          </div>

          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-stone-200 px-5 pb-4 pt-2 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="block text-[15px] text-foreground py-2 hover:text-primary"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex gap-2 pt-2 items-center">
              <Button size="sm" asChild className="h-9 text-[15px] rounded-full border border-stone-300 bg-transparent text-foreground">
                <Link to="/signin">Log in</Link>
              </Button>
              <Button size="sm" asChild className="h-9 text-[15px] rounded-full bg-primary text-primary-foreground">
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
