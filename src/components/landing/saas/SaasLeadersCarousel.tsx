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

const SaasLeadersCarousel = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.fromTo(
      sectionRef.current.querySelectorAll(".avatar-item"),
      { y: 20, opacity: 0, scale: 0.9 },
      {
        y: 0, opacity: 1, scale: 1,
        duration: 0.5, stagger: 0.04, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      }
    );
    gsap.fromTo(
      sectionRef.current.querySelectorAll(".leaders-text"),
      { y: 20, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: 0.6, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="relative max-w-4xl mx-auto rounded-3xl border border-border/30 bg-gradient-to-b from-card to-background p-8 md:p-14 overflow-hidden">
          {/* Subtle glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-primary/5 blur-3xl rounded-full" />
          
          <div className="relative z-10">
            {/* Avatar grid */}
            <div className="flex justify-center mb-10">
              <div className="flex flex-wrap justify-center gap-3">
                {leaders.map((leader, i) => (
                  <div key={i} className="avatar-item group relative" style={{ opacity: 0 }}>
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border-2 border-background shadow-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/20">
                      <img
                        src={leader.img}
                        alt={leader.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-20">
                      <div className="bg-card/90 backdrop-blur-md border border-border/30 rounded-lg px-2.5 py-1 shadow-lg whitespace-nowrap">
                        <p className="text-[10px] font-semibold text-foreground">{leader.name}</p>
                        <p className="text-[8px] text-muted-foreground">{leader.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="leaders-text text-center mb-4">
              <span className="inline-flex items-center text-xs font-medium text-primary bg-primary/10 px-4 py-1 rounded-full border border-primary/20">
                Testimonials
              </span>
            </div>

            <h2 className="leaders-text text-3xl md:text-5xl font-bold text-center text-foreground mb-3 leading-tight">
              Trusted by leaders
              <br />
              <span className="text-muted-foreground">from various industries</span>
            </h2>

            <p className="leaders-text text-sm text-muted-foreground text-center max-w-md mx-auto mb-8">
              Learn why professionals trust our solutions to complete their customer journeys.
            </p>

            <div className="leaders-text text-center">
              <a
                href="#testimonials"
                className="group/btn inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors duration-200"
              >
                Read Success Stories
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SaasLeadersCarousel;
