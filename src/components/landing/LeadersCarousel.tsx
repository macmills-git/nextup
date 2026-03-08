import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const leaders = [
  { name: "Sarah Chen", role: "CEO, Eventify", initials: "SC", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face" },
  { name: "Marcus Williams", role: "Director, GatherPro", initials: "MW", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" },
  { name: "Aisha Patel", role: "VP Events, Summit Co", initials: "AP", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face" },
  { name: "James O'Brien", role: "Founder, PartyPlan", initials: "JO", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face" },
  { name: "Yuki Tanaka", role: "CMO, FestivalHub", initials: "YT", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face" },
  { name: "Elena Volkov", role: "CTO, MeetUp Plus", initials: "EV", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face" },
  { name: "David Kim", role: "Head of Ops, Nexus", initials: "DK", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face" },
  { name: "Fatima Al-Rashid", role: "CEO, Occasion", initials: "FA", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face" },
  { name: "Lucas Berg", role: "Co-Founder, VenueIQ", initials: "LB", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face" },
  { name: "Priya Sharma", role: "Director, CelebRate", initials: "PS", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face" },
  { name: "Tom Nguyen", role: "VP Product, Eventia", initials: "TN", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face" },
  { name: "Rachel Moore", role: "Head of Design, Fiesta", initials: "RM", img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop&crop=face" },
];




// Staggered mosaic positions — asymmetric floating layout
const mosaicPositions = [
  { row: 0, col: 0, size: "w-16 h-16", opacity: 1 },
  { row: 0, col: 1, size: "w-14 h-14", opacity: 0.7 },
  { row: 0, col: 2, size: "w-18 h-18", opacity: 1 },
  { row: 0, col: 3, size: "w-12 h-12", opacity: 0.5 },
  { row: 0, col: 4, size: "w-16 h-16", opacity: 1 },
  { row: 0, col: 5, size: "w-14 h-14", opacity: 0.8 },
  { row: 1, col: 0, size: "w-14 h-14", opacity: 0.6 },
  { row: 1, col: 1, size: "w-16 h-16", opacity: 1 },
  { row: 1, col: 2, size: "w-12 h-12", opacity: 0.5 },
  { row: 1, col: 3, size: "w-18 h-18", opacity: 1 },
  { row: 1, col: 4, size: "w-14 h-14", opacity: 0.7 },
  { row: 1, col: 5, size: "w-16 h-16", opacity: 1 },
];

const LeadersCarousel = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Staggered avatar entrance
    gsap.fromTo(
      sectionRef.current.querySelectorAll(".avatar-squircle"),
      { y: 30, opacity: 0, scale: 0.8 },
      {
        y: 0, opacity: 1, scale: 1,
        duration: 0.5, stagger: 0.06, ease: "back.out(1.4)",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      }
    );

    // Text blur-to-focus reveal
    gsap.fromTo(
      sectionRef.current.querySelectorAll(".leaders-text"),
      { y: 25, opacity: 0, filter: "blur(8px)" },
      {
        y: 0, opacity: 1, filter: "blur(0px)",
        duration: 0.7, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
      }
    );

    // Tilt effect on card
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
    };

    const handleMouseLeave = () => {
      card.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg)";
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-transparent relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Floating card container */}
        <div
          ref={cardRef}
          className="relative max-w-4xl mx-auto rounded-3xl border border-border/60 bg-card/80 backdrop-blur-xl overflow-hidden"
          style={{
            boxShadow: "0 25px 80px -20px hsl(var(--foreground) / 0.12), 0 10px 30px -10px hsl(var(--primary) / 0.08)",
            transition: "transform 0.15s ease-out",
          }}
        >
          {/* Subtle inner glow */}
          <div
            className="absolute inset-0 pointer-events-none rounded-3xl"
            style={{
              background: "radial-gradient(ellipse at 50% 0%, hsl(var(--primary) / 0.04) 0%, transparent 60%)",
            }}
          />

          <div className="relative z-10 px-8 py-12 md:px-14 md:py-16">
            {/* Headshot mosaic grid */}
            <div className="flex justify-center mb-10">
              <div className="grid grid-cols-6 gap-3 md:gap-4">
                {leaders.map((leader, i) => {
                  const pos = mosaicPositions[i];
                  const isPlaceholder = pos.opacity < 0.6;
                  return (
                    <div
                      key={i}
                      className="avatar-squircle group relative"
                      style={{
                        opacity: 0, // GSAP will animate this
                        marginTop: i % 2 === 0 ? 0 : "12px",
                      }}
                    >
                      <div
                        className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl overflow-hidden transition-all duration-300 ${
                          isPlaceholder
                            ? "border-2 border-dashed border-border/40 bg-muted/20"
                            : "group-hover:scale-110 group-hover:shadow-elevated"
                        }`}
                      >
                        {!isPlaceholder ? (
                          <img
                            src={leader.img}
                            alt={leader.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full" />
                        )}
                      </div>
                      {/* Hover tooltip */}
                      {!isPlaceholder && (
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:-translate-y-1 pointer-events-none z-20">
                          <div className="bg-card border border-border rounded-lg px-2.5 py-1 shadow-elevated whitespace-nowrap">
                            <p className="text-[10px] font-semibold text-foreground">{leader.name}</p>
                            <p className="text-[8px] text-muted-foreground">{leader.role}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Badge */}
            <div className="leaders-text text-center mb-4">
              <span className="inline-flex items-center text-[11px] font-medium text-primary bg-primary/10 border border-primary/20 px-3.5 py-1 rounded-full">
                Testimonials
              </span>
            </div>

            {/* Heading */}
            <h2 className="leaders-text text-3xl md:text-5xl font-bold text-center text-foreground mb-3 leading-tight">
              Trusted by leaders
              <br />
              <span className="text-muted-foreground">from various industries</span>
            </h2>

            {/* Body text */}
            <p className="leaders-text text-sm text-muted-foreground text-center max-w-md mx-auto mb-8">
              Learn why professionals trust our solutions to complete their customer journeys.
            </p>

            {/* CTA */}
            <div className="leaders-text text-center">
              <a
                href="#testimonials"
                className="group/btn inline-flex items-center gap-2 text-sm font-medium bg-foreground text-background px-6 py-2.5 rounded-full transition-all duration-300 hover:shadow-elevated micro-press"
              >
                Read Success Stories
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadersCarousel;
