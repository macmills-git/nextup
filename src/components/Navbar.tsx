import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl">
      <div className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl shadow-lg shadow-black/10">
        <div className="px-5 lg:px-6 flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center">
              <span className="text-white font-bold text-xs">E</span>
            </div>
            <span className="font-bold text-sm text-white">Event Nest</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-xs font-medium text-white/90 hover:text-white transition-colors">About Home</Link>
            <Link to="/" className="text-xs font-medium text-white/60 hover:text-white transition-colors">Features</Link>
            <Link to="/" className="text-xs font-medium text-white/60 hover:text-white transition-colors">Pricing</Link>
            <Link to="/" className="text-xs font-medium text-white/60 hover:text-white transition-colors">Help/Support</Link>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild className="text-white/80 hover:text-white hover:bg-white/10 text-xs h-8">
              <Link to="/signin">Log in</Link>
            </Button>
            <Button size="sm" asChild className="h-8 text-xs rounded-xl">
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
          <div className="md:hidden border-t border-white/10 px-5 pb-4 pt-2 space-y-2">
            <Link to="/" className="block text-xs font-medium text-white/90 py-2">About Home</Link>
            <Link to="/" className="block text-xs font-medium text-white/60 py-2">Features</Link>
            <Link to="/" className="block text-xs font-medium text-white/60 py-2">Pricing</Link>
            <Link to="/" className="block text-xs font-medium text-white/60 py-2">Help/Support</Link>
            <div className="flex gap-2 pt-2">
              <Button variant="ghost" size="sm" asChild className="text-white/80 hover:bg-white/10 text-xs h-8">
                <Link to="/signin">Log in</Link>
              </Button>
              <Button size="sm" asChild className="h-8 text-xs rounded-xl">
                <Link to="/signup">Sign up</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
