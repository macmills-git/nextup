import { Link } from "react-router-dom";

const SaasFooter = () => {
  return (
    <footer className="relative border-t border-border/10 bg-background overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="py-12 grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <span
                className="font-black text-foreground leading-none"
                style={{
                  fontFamily: "'Space Grotesk', 'Inter Tight', sans-serif",
                  letterSpacing: "-0.06em",
                  fontSize: "22px",
                }}
              >
                NESTED
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your intelligent event planning platform.
            </p>
          </div>
          {[
            { title: "Product", links: ["Features", "Pricing", "Templates", "Changelog"] },
            { title: "Company", links: ["About", "Careers", "Blog", "Press"] },
            { title: "Resources", links: ["Documentation", "Community", "API", "Status"] },
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
        <div className="py-6 border-t border-border/10 flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
          <p className="text-xs text-muted-foreground">© 2026 Nested. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {["Twitter", "GitHub", "LinkedIn"].map(link => (
              <a key={link} href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">{link}</a>
            ))}
          </div>
        </div>

        {/* Spacer for oversized wordmark */}
        <div aria-hidden className="h-[22vw] md:h-[24vw]" />
      </div>

      {/* Oversized wordmark — spans full viewport width */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 bottom-0 flex justify-center z-0 select-none overflow-hidden"
      >
        <span
          className="block whitespace-nowrap font-black text-foreground leading-[0.78]"
          style={{
            fontSize: "30vw",
            letterSpacing: "-0.08em",
            fontFamily: "'Space Grotesk', 'Inter Tight', 'Helvetica Now Display', sans-serif",
          }}
        >
          NESTED
        </span>
      </div>

    </footer>
  );
};

export default SaasFooter;
