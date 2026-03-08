const leaders = [
  { name: "Sarah Chen", role: "CEO, Eventify", img: "SC" },
  { name: "Marcus Williams", role: "Director, GatherPro", img: "MW" },
  { name: "Aisha Patel", role: "VP Events, Summit Co", img: "AP" },
  { name: "James O'Brien", role: "Founder, PartyPlan", img: "JO" },
  { name: "Yuki Tanaka", role: "CMO, FestivalHub", img: "YT" },
  { name: "Elena Volkov", role: "CTO, MeetUp Plus", img: "EV" },
  { name: "David Kim", role: "Head of Ops, Nexus", img: "DK" },
  { name: "Fatima Al-Rashid", role: "CEO, Occasion", img: "FA" },
  { name: "Lucas Berg", role: "Co-Founder, VenueIQ", img: "LB" },
  { name: "Priya Sharma", role: "Director, CelebRate", img: "PS" },
  { name: "Tom Nguyen", role: "VP Product, Eventia", img: "TN" },
  { name: "Rachel Moore", role: "Head of Design, Fiesta", img: "RM" },
];

const colors = [
  "from-blue-500 to-indigo-600",
  "from-emerald-500 to-teal-600",
  "from-purple-500 to-pink-600",
  "from-amber-500 to-orange-600",
  "from-cyan-500 to-blue-600",
  "from-rose-500 to-red-600",
];

const LeadersCarousel = () => {
  const doubled = [...leaders, ...leaders];

  return (
    <section className="py-20 bg-transparent overflow-hidden relative">
      <div className="text-center mb-12">
        <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">Testimonials</span>
        <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-4 mb-3">
          Trusted by leaders<br />
          <span className="text-muted-foreground">from various industries</span>
        </h2>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Learn why professionals trust our solutions to complete their customer journeys.
        </p>
      </div>

      {/* Carousel */}
      <div className="relative">
        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10" style={{ background: 'linear-gradient(to right, hsl(var(--background)), transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10" style={{ background: 'linear-gradient(to left, hsl(var(--background)), transparent)' }} />

        <div className="flex carousel-scroll" style={{ width: 'max-content' }}>
          {doubled.map((leader, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-40 mx-3 group"
            >
              <div className="rounded-2xl overflow-hidden border border-border bg-card p-1 transition-all duration-300 group-hover:scale-105 group-hover:shadow-elevated group-hover:border-primary/30">
                {/* Avatar placeholder */}
                <div className={`w-full aspect-[3/4] rounded-xl bg-gradient-to-br ${colors[i % colors.length]} flex items-center justify-center`}>
                  <span className="text-2xl font-bold text-white/90">{leader.img}</span>
                </div>
              </div>
              <div className="mt-2 text-center">
                <p className="text-xs font-semibold text-foreground">{leader.name}</p>
                <p className="text-[10px] text-muted-foreground">{leader.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-10">
        <a href="#testimonials" className="inline-flex items-center gap-2 text-sm font-medium bg-foreground text-background px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity micro-press">
          Read Success Stories →
        </a>
      </div>
    </section>
  );
};

export default LeadersCarousel;
