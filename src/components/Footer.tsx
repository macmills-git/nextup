import { Link } from "react-router-dom";
import { Twitter, Instagram, Linkedin, Facebook, Mail, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedLogo from "@/components/AnimatedLogo";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;
    const els = footerRef.current.querySelectorAll('.footer-anim');
    gsap.fromTo(els, { y: 30, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power2.out',
      scrollTrigger: { trigger: footerRef.current, start: 'top 90%' },
    });
  }, []);

  return (
    <div ref={footerRef} className="bg-secondary dark:bg-card/50">
      {/* Newsletter CTA Card */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="footer-anim relative -mb-20 rounded-[20px] px-8 py-10 md:px-12 md:py-14 flex flex-col md:flex-row items-center gap-8 transition-transform duration-300 hover:scale-[1.01]" style={{
          background: 'linear-gradient(135deg, hsl(225, 90%, 60%), hsl(225, 80%, 65%))',
          boxShadow: '0 20px 60px hsl(var(--foreground) / 0.15)',
        }}>
          <div className="absolute top-4 left-8 text-white/20 text-4xl">✦</div>
          <div className="absolute bottom-6 left-1/3 text-white/10 text-2xl">✧</div>
          <div className="absolute top-6 right-12 text-white/15 text-3xl">✦</div>

          <div className="w-32 h-32 md:w-40 md:h-40 flex-shrink-0 relative">
            <div className="w-full h-full rounded-2xl flex items-center justify-center bg-white/15 backdrop-blur-sm" style={{
              boxShadow: '0 10px 30px hsl(var(--foreground) / 0.1)',
            }}>
              <div className="text-6xl">📅</div>
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
              Subscribe to our newsletter to get updates on latest events
            </h3>
            <p className="text-sm text-white/80 mb-5">
              Get 20% off on your first premium plan just by subscribing to our newsletter
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto md:mx-0">
              <input type="email" placeholder="Enter your email" className="flex-1 px-5 py-3 rounded-full text-sm outline-none bg-white text-foreground focus:ring-2 focus:ring-white/50 transition-shadow" />
              <Button className="rounded-full px-6 py-3 text-sm font-medium bg-white text-foreground hover:bg-white/90 transition-transform duration-200 hover:scale-105" style={{
                boxShadow: '0 4px 15px hsl(var(--foreground) / 0.1)',
              }}>
                Subscribe <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <p className="text-[11px] text-white/50 mt-3">You can unsubscribe at any time. Read our privacy policy.</p>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="pt-32 pb-8">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="footer-anim rounded-2xl bg-card p-10 md:p-14 shadow-card border border-border">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              <div className="md:col-span-1">
                <Link to="/" className="flex items-center gap-2 mb-4">
                  <AnimatedLogo size={28} />
                  <span className="font-bold text-lg text-foreground">Event Nest</span>
                </Link>
                <p className="text-sm leading-relaxed mb-5 text-muted-foreground">Your intelligent event planning and vendor marketplace platform.</p>
                <div className="flex gap-3">
                  {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                    <a key={i} href="#" className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 bg-secondary hover:bg-accent border border-border hover:scale-110 hover:rotate-6">
                      <Icon size={14} className="text-muted-foreground" />
                    </a>
                  ))}
                </div>
              </div>

              {[
                { title: "Company", links: ["About Us", "Features", "Pricing", "Templates"] },
                { title: "Support", links: ["Help Center", "Documentation", "Community", "Feedback"] },
                { title: "Resources", links: ["Blog", "Guides", "API Docs", "Changelog"] },
              ].map((col) => (
                <div key={col.title} className="footer-anim">
                  <h4 className="font-semibold mb-4 text-sm text-foreground">{col.title}</h4>
                  <ul className="space-y-2.5">
                    {col.links.map(link => (
                      <li key={link}>
                        <a href="#" className="text-sm transition-colors text-muted-foreground hover:text-primary">{link}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="footer-anim">
                <h4 className="font-semibold mb-4 text-sm text-foreground">Contact Us</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="w-4 h-4 text-primary" /> +1 (555) 123-4567
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4 text-primary" /> hello@eventnest.com
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-border">
              <p className="text-xs text-muted-foreground">© 2026 Event Nest. All rights reserved.</p>
              <div className="flex items-center gap-4">
                {["Privacy Policy", "Terms of Use", "Legal", "Site Map"].map(link => (
                  <a key={link} href="#" className="text-xs transition-colors text-muted-foreground hover:text-primary">{link}</a>
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
