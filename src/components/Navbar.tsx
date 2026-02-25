import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "About Home", to: "/" },
  { label: "Features", to: "/#features" },
  { label: "Pricing", to: "/#pricing" },
  { label: "Help/Support", to: "/#support" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl">
      <div className="flex items-center justify-between h-14 px-2">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center">
            <span className="text-white font-bold text-xs">E</span>
          </div>
          <span className="font-bold text-sm text-white">Event Nest</span>
        </Link>

        {/* Desktop nav - centered pill */}
        <div className="hidden md:flex items-center gap-1 bg-white/8 backdrop-blur-xl border border-white/10 rounded-full px-1.5 py-1">
          {navItems.map((item) => {
            const isActive = item.to === "/" && location.pathname === "/";
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

        {/* Auth buttons */}
        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild className="text-white/80 hover:text-white hover:bg-white/10 text-xs h-8">
            <Link to="/signin">Log in</Link>
          </Button>
          <Button size="sm" asChild className="h-8 text-xs rounded-full">
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
            <Link key={item.label} to={item.to} className="block text-xs font-medium text-white/70 py-2 hover:text-white">
              {item.label}
            </Link>
          ))}
          <div className="flex gap-2 pt-2">
            <Button variant="ghost" size="sm" asChild className="text-white/80 hover:bg-white/10 text-xs h-8">
              <Link to="/signin">Log in</Link>
            </Button>
            <Button size="sm" asChild className="h-8 text-xs rounded-full">
              <Link to="/signup">Sign up</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
