import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  { name: "Peer Richelsen", handle: "@peer_rich", text: "Amazing to see Event Nest find its way into proper templates. Excited to be powering the next thousands of events!", verified: true },
  { name: "Yousef", handle: "@Yousefcopy", text: "Looks sick 🔥", verified: true },
  { name: "Ajay", handle: "@ajayignesh01", text: "Wow, this is awesome!", verified: true },
  { name: "Mark V.", handle: "@MarkKind", text: "You can't imagine how much time I spent to find the perfect event tool. Super useful!", verified: true },
  { name: "Striver", handle: "@striver_79", text: "Just checked out Event Nest — great work. Looks premium, top notch 🚀", verified: true },
  { name: "Rajesh David", handle: "@rajeshdavidbabu", text: "So well done. And it's free! Phenomenal work by the team 🔥", verified: true },
  { name: "Oamar", handle: "@oamarkanji", text: "Man this is awesome", verified: true },
  { name: "sreejith", handle: "@Srejtk", text: "So happy to see this work being recognised 🎉❤️. His work is literally a treasure trove for event planners 💎", verified: true },
  { name: "Teddy Ni", handle: "@Teddartfic", text: "Wow, this site is an ABSOLUTE GOLDMINE for event professionals. Love to see such an amazing display of my favorite planning tools.", verified: true },
  { name: "Greg Bergé", handle: "@gregberge_", text: "I like the interaction and animation. Beautiful!", verified: true },
  { name: "rum_ovo_xo", handle: "@potaatopatato", text: "I like the interaction and animation. Beautiful!", verified: false },
  { name: "Vlad", handle: "@defosv", text: "This component is great work 👌", verified: true },
  { name: "Adrian", handle: "@jsmasterypro", text: "Have you heard of Event Nest? It's packed with various animated components that are ready to copy and paste! Mind-blowing stuff... 🤯", verified: true },
  { name: "Nahuel Candia", handle: "@dncandia", text: "This is absolutely mind blowing. Already thinking on how to use these for our events 🌱", verified: true },
  { name: "Design Chief", handle: "@dnaijatech", text: "Event Nest has some of the best components for designing event pages I've ever seen.", verified: true },
  { name: "Hackmamba", handle: "@hackmamba", text: "This is awesome 👏", verified: true },
  { name: "Sean brydon", handle: "@SeanBrydon13", text: "Wow all for free! Setup a tip jar or buy me a coffee! I'd paid for this", verified: true },
  { name: "Cody De Arkland", handle: "@Codydearkland", text: "This library is so dope. Stoked to see more components drop.", verified: true },
  { name: "Micky", handle: "@Rasmc", text: "Yoo.... This has to be the most beautiful component library I've ever seen!", verified: true },
  { name: "Enis", handle: "@enisdev", text: "Bro this is too beautiful, why is this even free??", verified: true },
];

const accentColors = [
  "bg-secondary",
  "bg-accent/20",
  "bg-primary/10",
  "bg-destructive/10",
];

const TestimonialWall = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current.querySelectorAll('.tw-card'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, stagger: 0.03, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%' }
      }
    );
    gsap.fromTo(ref.current.querySelectorAll('.tw-heading'),
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 90%' }
      }
    );
  }, []);

  const cols = [[], [], [], []] as typeof testimonials[];
  testimonials.forEach((t, i) => cols[i % 4].push(t));

  return (
    <section ref={ref} className="py-28 bg-background" id="testimonials">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <span className="tw-heading inline-flex items-center text-xs font-bold text-foreground bg-secondary border-2 border-border px-4 py-1 rounded-lg shadow-brutal mb-4">
            Wall of Love
          </span>
          <h2 className="tw-heading text-3xl md:text-5xl font-black text-foreground mb-3">
            Loved by thousands of people
          </h2>
          <p className="tw-heading text-sm text-muted-foreground max-w-md mx-auto font-medium">
            Here's what some of our users have to say about Event Nest.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {cols.map((col, ci) => (
            <div key={ci} className="space-y-4">
              {col.map((t, i) => (
                <div
                  key={i}
                  className="tw-card group rounded-xl p-4 bg-card border-2 border-border shadow-brutal transition-all duration-150 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal-lg"
                >
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <div className={`w-8 h-8 rounded-lg ${accentColors[(ci + i) % accentColors.length]} border-2 border-border flex items-center justify-center flex-shrink-0`}>
                      <span className="text-xs font-black text-foreground">{t.name[0]}</span>
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-bold text-foreground truncate">{t.name}</span>
                        {t.verified && (
                          <svg className="w-3.5 h-3.5 text-primary flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                          </svg>
                        )}
                      </div>
                      <span className="text-[11px] text-muted-foreground font-medium">{t.handle}</span>
                    </div>
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed">{t.text}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialWall;
