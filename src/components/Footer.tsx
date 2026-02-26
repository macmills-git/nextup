import { Link } from "react-router-dom";
import { Twitter, Instagram, Linkedin, Facebook, Mail, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <div style={{ background: '#EEF1F6' }}>
      {/* Newsletter CTA Card - overlapping */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="relative -mb-20 rounded-[20px] px-8 py-10 md:px-12 md:py-14 flex flex-col md:flex-row items-center gap-8" style={{
          background: 'linear-gradient(135deg, #4F7CF7, #5B8DFB)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
        }}>
          {/* Decorative sparkles */}
          <div className="absolute top-4 left-8 text-white/20 text-4xl">✦</div>
          <div className="absolute bottom-6 left-1/3 text-white/10 text-2xl">✧</div>
          <div className="absolute top-6 right-12 text-white/15 text-3xl">✦</div>

          {/* Left: 3D-style icon */}
          <div className="w-32 h-32 md:w-40 md:h-40 flex-shrink-0 relative">
            <div className="w-full h-full rounded-2xl flex items-center justify-center" style={{
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            }}>
              <div className="text-6xl">📅</div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
              Subscribe to our newsletter to get updates on latest events
            </h3>
            <p className="text-sm text-white/80 mb-5">
              Get 20% off on your first premium plan just by subscribing to our newsletter
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto md:mx-0">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-3 rounded-full text-sm outline-none"
                style={{ background: 'white', color: '#111827' }}
              />
              <Button className="rounded-full px-6 py-3 text-sm font-medium" style={{
                background: 'white', color: '#111827',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              }}>
                Subscribe <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <p className="text-[11px] text-white/50 mt-3">
              You can unsubscribe at any time. Read our privacy policy.
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="pt-32 pb-8">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="rounded-2xl bg-white p-10 md:p-14" style={{
            boxShadow: '0 20px 50px rgba(0,0,0,0.04)',
          }}>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {/* Brand */}
              <div className="md:col-span-1">
                <Link to="/" className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                    <span className="text-white font-bold text-sm">E</span>
                  </div>
                  <span className="font-bold text-lg" style={{ color: '#111827' }}>Event Nest</span>
                </Link>
                <p className="text-sm leading-relaxed mb-5" style={{ color: '#6B7280' }}>
                  Your intelligent event planning and vendor marketplace platform.
                </p>
                <div className="flex gap-3">
                  {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                    <a key={i} href="#" className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-blue-50" style={{ background: '#F3F4F6' }}>
                      <Icon size={14} style={{ color: '#6B7280' }} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Company */}
              <div>
                <h4 className="font-semibold mb-4 text-sm" style={{ color: '#111827' }}>Company</h4>
                <ul className="space-y-2.5">
                  {["About Us", "Features", "Pricing", "Templates"].map(link => (
                    <li key={link}>
                      <a href="#" className="text-sm transition-colors hover:text-blue-500" style={{ color: '#6B7280' }}>{link}</a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support */}
              <div>
                <h4 className="font-semibold mb-4 text-sm" style={{ color: '#111827' }}>Support</h4>
                <ul className="space-y-2.5">
                  {["Help Center", "Documentation", "Community", "Feedback"].map(link => (
                    <li key={link}>
                      <a href="#" className="text-sm transition-colors hover:text-blue-500" style={{ color: '#6B7280' }}>{link}</a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Links */}
              <div>
                <h4 className="font-semibold mb-4 text-sm" style={{ color: '#111827' }}>Resources</h4>
                <ul className="space-y-2.5">
                  {["Blog", "Guides", "API Docs", "Changelog"].map(link => (
                    <li key={link}>
                      <a href="#" className="text-sm transition-colors hover:text-blue-500" style={{ color: '#6B7280' }}>{link}</a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="font-semibold mb-4 text-sm" style={{ color: '#111827' }}>Contact Us</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm" style={{ color: '#6B7280' }}>
                    <Phone className="w-4 h-4 text-blue-500" />
                    +1 (555) 123-4567
                  </div>
                  <div className="flex items-center gap-2 text-sm" style={{ color: '#6B7280' }}>
                    <Mail className="w-4 h-4 text-blue-500" />
                    hello@eventnest.com
                  </div>
                </div>
              </div>
            </div>

            {/* Legal bar */}
            <div className="mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid #E5E7EB' }}>
              <p className="text-xs" style={{ color: '#9CA3AF' }}>© 2026 Event Nest. All rights reserved.</p>
              <div className="flex items-center gap-4">
                {["Privacy Policy", "Terms of Use", "Legal", "Site Map"].map(link => (
                  <a key={link} href="#" className="text-xs transition-colors hover:text-blue-500" style={{ color: '#9CA3AF' }}>{link}</a>
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
