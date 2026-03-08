import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const leaders = [
  { name: "Sarah Chen", role: "CEO, Eventify", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face" },
  { name: "Marcus Williams", role: "Director, GatherPro", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" },
  { name: "Aisha Patel", role: "VP Events, Summit Co", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face" },
  { name: "James O'Brien", role: "Founder, PartyPlan", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face" },
  { name: "Yuki Tanaka", role: "CMO, FestivalHub", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face" },
  { name: "Elena Volkov", role: "CTO, MeetUp Plus", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face" },
  { name: "David Kim", role: "Head of Ops, Nexus", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face" },
  { name: "Fatima Al-Rashid", role: "CEO, Occasion", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face" },
  { name: "Lucas Berg", role: "Co-Founder, VenueIQ", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face" },
  { name: "Priya Sharma", role: "Director, CelebRate", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face" },
  { name: "Tom Nguyen", role: "VP Product, Eventia", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face" },
  { name: "Rachel Moore", role: "Head of Design, Fiesta", img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop&crop=face" },
];

const LeadersCarousel = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      sectionRef.current.querySelectorAll(".avatar-squircle"),
      { y: 30, opacity: 0, scale: 0.8 },
      {
        y: 0, opacity: 1, scale: 1,
        duration: 0.5, stagger: 0.05, ease: "back.out(1.4)",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      }
    );

    gsap.fromTo(
      sectionRef.current.querySelectorAll(".leaders-text"),
      { y: 25, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: 0.5, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Neo-Brutal card */}
        <div className="relative max-w-4xl mx-auto rounded-2xl border-2 border-border bg-card shadow-brutal-xl overflow-hidden">
          <div className="relative z-10 px-8 py-12 md:px-14 md:py-16">
            {/* Headshot mosaic */}
            <div className="flex justify-center mb-10">
              <div className="grid grid-cols-6 gap-3 md:gap-4">
                {leaders.map((leader, i) => {
                  const isPlaceholder = i === 3 || i === 8;
                  return (
                    <div
                      key={i}
                      className="avatar-squircle group relative"
                      style={{
                        opacity: 0,
                        marginTop: i % 2 === 0 ? 0 : "10px",
                      }}
                    >
                      <div
                        className={`w-12 h-12 md:w-16 md:h-16 rounded-xl overflow-hidden border-2 border-border transition-all duration-150 ${
                          isPlaceholder
                            ? "border-dashed bg-muted"
                            : "shadow-brutal group-hover:translate-x-[-2px] group-hover:translate-y-[-2px] group-hover:shadow-brutal-lg"
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
                      {!isPlaceholder && (
                        <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-150 pointer-events-none z-20">
                          <div className="bg-card border-2 border-border rounded-lg px-2.5 py-1 shadow-brutal whitespace-nowrap">
                            <p className="text-[10px] font-bold text-foreground">{leader.name}</p>
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
              <span className="inline-flex items-center text-xs font-bold text-foreground bg-secondary border-2 border-border px-4 py-1 rounded-lg shadow-brutal">
                Testimonials
              </span>
            </div>

            {/* Heading */}
            <h2 className="leaders-text text-3xl md:text-5xl font-black text-center text-foreground mb-3 leading-tight">
              Trusted by leaders
              <br />
              <span className="text-muted-foreground">from various industries</span>
            </h2>

            <p className="leaders-text text-sm text-muted-foreground text-center max-w-md mx-auto mb-8 font-medium">
              Learn why professionals trust our solutions to complete their customer journeys.
            </p>

            {/* CTA */}
            <div className="leaders-text text-center">
              <a
                href="#testimonials"
                className="group/btn inline-flex items-center gap-2 text-sm font-bold bg-foreground text-background px-6 py-2.5 rounded-xl border-2 border-border shadow-brutal transition-all duration-150 brutal-hover"
              >
                Read Success Stories
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover/btn:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadersCarousel;
