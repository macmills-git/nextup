import { Link } from "react-router-dom";
import { Twitter, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer style={{ background: '#0B0B0F', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="font-bold text-lg text-white">Event Nest</span>
            </Link>
            <p className="text-sm leading-relaxed mb-4" style={{ color: '#9CA3AF' }}>
              Your intelligent event planning and vendor marketplace platform. Plan smarter, execute better.
            </p>
            <div className="flex gap-3">
              {[Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-white/10" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <Icon size={14} style={{ color: '#9CA3AF' }} />
                </a>
              ))}
            </div>
          </div>

          {[
            { title: "Product", links: ["Features", "Pricing", "Integrations", "Changelog"] },
            { title: "Company", links: ["About", "Careers", "Press"] },
            { title: "Legal", links: ["Terms", "Privacy", "Cookies"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-semibold text-white mb-4 text-sm">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm transition-colors hover:text-white" style={{ color: '#6b7280' }}>{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="text-xs" style={{ color: '#6b7280' }}>© 2026 Event Nest. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="text-sm px-4 py-2 rounded-lg outline-none focus:ring-1 focus:ring-blue-500/50 transition-colors"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: 'white'
              }}
            />
            <Button size="sm" className="rounded-lg">Subscribe</Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
