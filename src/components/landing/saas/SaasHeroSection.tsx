import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Search, ArrowRight } from "@/lib/fa-icons";
import venueImg from "@/assets/event-venue.jpg";

const SaasHeroSection = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    const tl = gsap.timeline();
    tl.fromTo(contentRef.current.querySelectorAll('.hero-anim'),
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.15 }
    );
    tl.fromTo(contentRef.current.querySelector('.hero-search'),
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }, "-=0.4"
    );
    tl.fromTo(contentRef.current.querySelectorAll('.hero-pill'),
      { scale: 0.7, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.8)' }, "-=0.6"
    );
  }, []);

  return (
    <section className="relative overflow-hidden bg-background pb-12">
      {/* Hero photo */}
      <div className="relative h-[88vh] min-h-[640px] w-full overflow-hidden">
        <img
          src={venueImg}
          alt="A beautifully designed event venue"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Soft overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/30 to-background/85" />

        <div ref={contentRef} className="relative z-10 h-full container mx-auto px-4 lg:px-8 pt-32 flex flex-col">
          <div className="flex-1 flex flex-col items-center justify-center text-center max-w-5xl mx-auto">
            <span className="hero-anim text-xs md:text-sm uppercase tracking-[0.25em] text-foreground/70 mb-6">
              The Operating System For Events
            </span>
            <h1
              className="hero-anim text-foreground font-bold tracking-[-0.04em] leading-[0.95]"
              style={{ fontSize: "clamp(2.75rem, 7.2vw, 6.5rem)" }}
            >
              We Bring <span className="italic font-light text-foreground/60">New Experience</span>
              <br />
              of Your <span className="italic font-light text-foreground/60">Dream</span> Event
            </h1>
            <p className="hero-anim mt-6 max-w-lg text-sm md:text-base text-muted-foreground">
              Helping you plan, coordinate, and run unforgettable events — one project at a time. Your satisfaction is our priority.
            </p>

            {/* Floating CTA pills */}
            <div className="hidden md:block">
              <div className="hero-pill absolute left-[8%] top-[42%] px-4 py-2 rounded-full bg-background border border-border shadow-elevated text-xs font-medium text-foreground">
                Plan Event
              </div>
              <div className="hero-pill absolute right-[10%] top-[34%] px-4 py-2 rounded-full bg-foreground text-background shadow-elevated text-xs font-medium">
                Find Vendors
              </div>
              <div className="hero-pill absolute right-[18%] top-[58%] px-4 py-2 rounded-full bg-background border border-border shadow-elevated text-xs font-medium text-foreground">
                Sell Tickets
              </div>
            </div>
          </div>

          {/* HOFIN-style search panel */}
          <div className="hero-search relative z-20 -mb-20 md:-mb-24 mt-auto">
            <div className="bg-card border border-border rounded-2xl shadow-elevated p-3 md:p-4 max-w-5xl mx-auto">
              <div className="flex flex-wrap items-center gap-1 mb-3 px-2">
                {["Plan", "Discover", "Vendors"].map((t, i) => (
                  <button key={t} className={`px-3 py-1 rounded-full text-xs font-medium ${i === 0 ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted"}`}>
                    {t}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {[
                  { label: "Location", value: "Select Location" },
                  { label: "Event Type", value: "Wedding" },
                  { label: "Theme", value: "Modern" },
                  { label: "Budget", value: "$10k – $50k" },
                ].map((f) => (
                  <div key={f.label} className="px-3 py-2 rounded-xl bg-secondary border border-border">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{f.label}</p>
                    <p className="text-sm font-medium text-foreground truncate">{f.value}</p>
                  </div>
                ))}
                <Button asChild className="h-full min-h-[58px] rounded-xl bg-foreground text-background hover:bg-foreground/90 font-semibold col-span-2 md:col-span-1">
                  <Link to="/signup">
                    <Search className="mr-2 h-4 w-4" /> Start <ArrowRight className="ml-2 h-3 w-3" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About strip */}
      <div className="container mx-auto px-4 lg:px-8 pt-32 pb-16">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block text-[10px] uppercase tracking-[0.3em] px-3 py-1 rounded-full border border-border text-muted-foreground mb-6">About</span>
          <p className="text-xl md:text-3xl font-medium text-foreground leading-snug tracking-tight">
            We&apos;re your trusted partner in events.{" "}
            <span className="text-muted-foreground">With years of experience helping teams across the globe, our platform is dedicated to providing personalized planning and achieving the best possible results — from finding your dream venue to running the event day flawlessly.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SaasHeroSection;
