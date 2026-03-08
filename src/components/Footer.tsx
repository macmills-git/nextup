import { Link } from "react-router-dom";
import { Twitter, Instagram, Linkedin, Facebook, Mail, Phone } from "lucide-react";
import AnimatedLogo from "@/components/AnimatedLogo";
import { useEffect, useRef } from "react";

const Footer = () => {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.backgroundImage = `radial-gradient(circle at ${x}% ${y}%, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.3) 25%, hsl(var(--foreground) / 0.06) 50%)`;
    };
    
    const handleMouseLeave = () => {
      el.style.backgroundImage = '';
    };
    
    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="bg-secondary dark:bg-card/50">
      <div className="py-10">
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
          {/* Large text with hover effect */}
          <div className="py-12 text-center select-none overflow-hidden">
            <h2
              ref={textRef}
              className="text-[8vw] md:text-[6vw] font-black tracking-tighter leading-none cursor-default transition-colors duration-300"
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                color: 'transparent',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                backgroundImage: 'linear-gradient(to bottom, hsl(var(--foreground) / 0.06), hsl(var(--foreground) / 0.03))',
              }}
            >
              EVENT NEST
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
