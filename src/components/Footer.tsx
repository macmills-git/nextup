import { Link } from "react-router-dom";
import { Twitter, Instagram, Linkedin, Facebook, Mail, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedLogo from "@/components/AnimatedLogo";

const Footer = () => {
  return (
    <div className="bg-secondary dark:bg-card/50">
      {/* Newsletter CTA Card */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="relative -mb-20 rounded-[20px] px-8 py-10 md:px-12 md:py-14 flex flex-col md:flex-row items-center gap-8 gradient-primary" style={{
          boxShadow: '0 20px 60px hsl(var(--foreground) / 0.15)',
        }}>
          <div className="w-32 h-32 md:w-40 md:h-40 flex-shrink-0 relative">
            <div className="w-full h-full rounded-2xl flex items-center justify-center bg-white/15 backdrop-blur-sm">
              <div className="text-6xl">📅</div>
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Subscribe to our newsletter</h3>
            <p className="text-sm text-white/80 mb-5">Get 20% off on your first premium plan just by subscribing</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto md:mx-0">
              <input type="email" placeholder="Enter your email" className="flex-1 px-5 py-3 rounded-full text-sm outline-none bg-white text-foreground" />
              <Button className="rounded-full px-6 py-3 text-sm font-medium bg-white text-foreground hover:bg-white/90">
                Subscribe <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="pt-32 pb-8">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="rounded-2xl bg-card p-10 md:p-14 shadow-card border border-border">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              <div className="md:col-span-1">
                <Link to="/" className="flex items-center gap-2 mb-4">
                  <AnimatedLogo size={24} />
                  <span className="font-bold text-foreground">Event Nest</span>
                </Link>
                <p className="text-sm leading-relaxed mb-5 text-muted-foreground">Your intelligent event planning platform.</p>
                <div className="flex gap-2.5">
                  {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                    <a key={i} href="#" className="w-8 h-8 rounded-full flex items-center justify-center bg-secondary hover:bg-accent border border-border transition-colors">
                      <Icon size={13} className="text-muted-foreground" />
                    </a>
                  ))}
                </div>
              </div>
              {[
                { title: "Company", links: ["About Us", "Features", "Pricing", "Templates"] },
                { title: "Support", links: ["Help Center", "Documentation", "Community", "Feedback"] },
                { title: "Resources", links: ["Blog", "Guides", "API Docs", "Changelog"] },
              ].map((col) => (
                <div key={col.title}>
                  <h4 className="font-semibold mb-4 text-sm text-foreground">{col.title}</h4>
                  <ul className="space-y-2.5">
                    {col.links.map(link => (
                      <li key={link}><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">{link}</a></li>
                    ))}
                  </ul>
                </div>
              ))}
              <div>
                <h4 className="font-semibold mb-4 text-sm text-foreground">Contact Us</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground"><Phone className="w-4 h-4 text-primary" /> +1 (555) 123-4567</div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground"><Mail className="w-4 h-4 text-primary" /> hello@eventnest.com</div>
                </div>
              </div>
            </div>
            <div className="mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-border">
              <p className="text-xs text-muted-foreground">© 2026 Event Nest. All rights reserved.</p>
              <div className="flex items-center gap-4">
                {["Privacy Policy", "Terms of Use", "Legal", "Site Map"].map(link => (
                  <a key={link} href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">{link}</a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;