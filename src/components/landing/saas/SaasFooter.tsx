import { Link } from "react-router-dom";
import AnimatedLogo from "@/components/AnimatedLogo";

const SaasFooter = () => {
  return (
    <footer className="border-t border-border/10 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="py-12 grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <AnimatedLogo size={22} />
              <span className="font-bold text-sm text-foreground">Event Nest</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your intelligent event planning platform.
            </p>
          </div>
          {[
            { title: "Product", links: ["Features", "Pricing", "Templates", "Changelog"] },
            { title: "Company", links: ["About", "Careers", "Blog", "Press"] },
            { title: "Resources", links: ["Documentation", "Help Center", "Community", "API"] },
            { title: "Legal", links: ["Privacy", "Terms", "Security", "GDPR"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map(link => (
                  <li key={link}><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="py-6 border-t border-border/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">© 2026 Event Nest. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {["Twitter", "GitHub", "LinkedIn"].map(link => (
              <a key={link} href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">{link}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SaasFooter;
