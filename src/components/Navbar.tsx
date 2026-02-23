import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">E</span>
          </div>
          <span className="font-bold text-lg text-foreground">Event Nest</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">About Home</Link>
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Features</Link>
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Pricing</Link>
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Help/Support</Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/signin">Log in</Link>
          </Button>
          <Button size="sm" asChild>
            <Link to="/signup">Sign up</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background border-b border-border px-4 pb-4 space-y-3">
          <Link to="/" className="block text-sm font-medium text-foreground py-2">About Home</Link>
          <Link to="/" className="block text-sm font-medium text-muted-foreground py-2">Features</Link>
          <Link to="/" className="block text-sm font-medium text-muted-foreground py-2">Pricing</Link>
          <Link to="/" className="block text-sm font-medium text-muted-foreground py-2">Help/Support</Link>
          <div className="flex gap-3 pt-2">
            <Button variant="ghost" size="sm" asChild><Link to="/signin">Log in</Link></Button>
            <Button size="sm" asChild><Link to="/signup">Sign up</Link></Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
