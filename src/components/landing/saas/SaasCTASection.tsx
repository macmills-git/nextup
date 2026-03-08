import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useRef, useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  { q: "What exactly does this platform do?", a: "Event Nest is an all-in-one event planning platform that helps you manage vendors, coordinate teams, track budgets, and create unforgettable events — all from a single dashboard." },
  { q: "How do I get started with creating my first event?", a: "Simply sign up for a free account, click 'Create Event', and our AI-powered assistant will guide you through setting up your event timeline, budget, and vendor requirements." },
  { q: "What tools and services can I integrate?", a: "We integrate with popular tools like Slack, Google Calendar, Stripe for payments, and over 50+ other services to streamline your workflow." },
  { q: "Is my data secure when using Event Nest?", a: "Absolutely. We use enterprise-grade encryption, SOC 2 compliance, and regular security audits to ensure your data is always protected." },
  { q: "Can I test events before they go live?", a: "Yes! Our simulation mode lets you preview your entire event flow, test vendor communications, and validate budgets before going live." },
];

const SaasCTASection = () => {
  const ctaRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    if (!ctaRef.current) return;
    gsap.fromTo(ctaRef.current.querySelectorAll('.cta-el'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: ctaRef.current, start: 'top 80%' },
      }
    );
  }, []);

  return (
    <section className="relative py-24 overflow-hidden bg-background">
      <div ref={ctaRef} className="container mx-auto px-4 lg:px-8 max-w-3xl">
        {/* FAQ Header */}
        <div className="text-center mb-12">
          <p className="cta-el text-sm text-primary font-medium mb-4">FAQs</p>
          <h2 className="cta-el text-3xl md:text-5xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="cta-el text-base text-muted-foreground max-w-lg mx-auto mb-8">
            Find all your doubts and questions in one place. Still couldn't find what you're looking for?
          </p>
          <div className="cta-el flex items-center justify-center gap-3">
            <Button asChild className="rounded-full px-6 h-10 text-sm font-semibold bg-foreground text-background hover:bg-foreground/90">
              <Link to="/docs">Read Docs</Link>
            </Button>
            <Button variant="outline" asChild className="rounded-full px-6 h-10 text-sm font-medium border border-border/40 bg-background hover:bg-muted/50">
              <Link to="/help">Contact Us</Link>
            </Button>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="cta-el space-y-0 border-t border-border/15">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-border/15">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between py-5 text-left group"
              >
                <span className="text-sm md:text-base font-medium text-foreground group-hover:text-primary transition-colors">{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-muted-foreground flex-shrink-0 ml-4 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-40 pb-5' : 'max-h-0'}`}>
                <p className="text-sm text-muted-foreground leading-relaxed pr-8">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SaasCTASection;
