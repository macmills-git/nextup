import { Link } from "react-router-dom";
import Logo from "@/components/Logo";
import logoDarkImg from "@/Gemini_Generated_Image_60wrp760wrp760wr.jpg";
import { Twitter, Instagram, Linkedin, Send } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Footer = () => {
  const { user } = useAuth();
  return (
    <footer className="w-full pt-10 pb-8 px-4 md:px-8 bg-background font-sans">
      <div className="container mx-auto max-w-7xl">
        {/* Main Card Footer Container matching the app design system */}
        <div className="bg-card rounded-3xl md:rounded-[2.5rem] border border-border shadow-sm p-6 sm:p-10 md:p-12 relative overflow-hidden space-y-10">
          
          {/* 1. TOP HEADER ROW: Logo on Left, Social Media Links on Right */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-border">
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <Logo variant="dark" size="lg" />
            </Link>

            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-muted-foreground">Social Media</span>
              <div className="flex items-center gap-2">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-xl border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all shadow-xs"
                  title="Twitter / X"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-xl border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all shadow-xs"
                  title="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-xl border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all shadow-xs"
                  title="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* 2. MIDDLE COLUMNS: "Reach out to us" + Categorized Links */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
            {/* Left Box: Reach out to us using app primary palette */}
            <div className="lg:col-span-5 space-y-3">
              <h4 className="text-xs font-semibold text-primary uppercase tracking-wider">Reach out to us</h4>
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3.5 p-4 rounded-2xl bg-primary/5 border border-primary/20 hover:bg-primary/10 transition-all group max-w-sm shadow-xs"
              >
                <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 shadow-xs">
                  <Send className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                    Contact us on WhatsApp / Support
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    Our team will reply within 24h
                  </p>
                </div>
              </a>
            </div>

            {/* Right Link Columns with app primary hover styles */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs">
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground uppercase tracking-wider text-[11px]">Explore</h4>
                <ul className="space-y-2 text-muted-foreground font-normal">
                  <li><Link to="/events" className="hover:text-primary transition-colors">Discover Events</Link></li>
                  <li><Link to="/vendors" className="hover:text-primary transition-colors">Find Vendors</Link></li>
                  <li><Link to="/create/event" className="hover:text-primary transition-colors">Publish Event</Link></li>
                  <li><Link to="/create/vendor" className="hover:text-primary transition-colors">Vendor Onboarding</Link></li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-foreground uppercase tracking-wider text-[11px]">Account</h4>
                <ul className="space-y-2 text-muted-foreground font-normal">
                  <li><Link to="/dashboard" className="hover:text-primary transition-colors">Activity Hub</Link></li>
                  <li><Link to="/dashboard/events" className="hover:text-primary transition-colors">My Events</Link></li>
                  <li><Link to="/dashboard/saved" className="hover:text-primary transition-colors">Saved Events</Link></li>
                  <li><Link to="/dashboard/settings" className="hover:text-primary transition-colors">Settings</Link></li>
                </ul>
              </div>

              <div className="space-y-3 col-span-2 sm:col-span-1">
                <h4 className="font-semibold text-foreground uppercase tracking-wider text-[11px]">Platform</h4>
                <ul className="space-y-2 text-muted-foreground font-normal">
                  <li><Link to="/events" className="hover:text-primary transition-colors">Ghana & Campus</Link></li>
                  <li><Link to="/vendors" className="hover:text-primary transition-colors">Service Directory</Link></li>
                  {user?.role === "admin" ? (
                    <li><Link to="/admin" className="hover:text-primary font-semibold transition-colors">Admin Console</Link></li>
                  ) : (
                    <li><Link to="/dashboard" className="hover:text-primary transition-colors">Activity</Link></li>
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* 3. GIANT WATERMARK / BASE WORDMARK DESIGN */}
          <div className="pt-4 relative flex items-center justify-center overflow-hidden pointer-events-none select-none my-2">
            <div className="flex items-center justify-center gap-3 md:gap-5 opacity-15 md:opacity-20 transition-opacity">
              <img
                src={logoDarkImg}
                alt="NextUp Emblem Watermark"
                className="w-14 sm:w-24 md:w-32 lg:w-40 h-14 sm:h-24 md:h-32 lg:h-40 rounded-full object-cover"
              />
              <span className="text-[11vw] font-normal text-foreground leading-none tracking-tighter uppercase">
                NEXTUP<span className="text-primary font-black">.</span>
              </span>
            </div>
          </div>

          {/* 4. BOTTOM SUB-FOOTER BAR */}
          <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground font-normal relative z-10">
            <p>© {new Date().getFullYear()} NextUp. All rights reserved.</p>

            <div className="flex items-center gap-6">
              <Link to="/events" className="hover:text-primary transition-colors">Terms of Service</Link>
              <Link to="/events" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link to="/events" className="hover:text-primary transition-colors">Cookie Policy</Link>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;

