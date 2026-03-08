import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const logos = [
  { name: "Eventbrite", text: "Eventbrite" },
  { name: "Marriott", text: "Marriott" },
  { name: "LiveNation", text: "Live Nation" },
  { name: "Hilton", text: "Hilton" },
  { name: "WME", text: "W M E" },
  { name: "Cvent", text: "Cvent" },
];

const SaasLeadersCarousel = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current.querySelectorAll('.logo-item'),
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%' }
      }
    );
  }, []);

  return (
    <section ref={ref} className="py-16 bg-background border-t border-border/10">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-px max-w-5xl mx-auto">
          {logos.map((logo, i) => (
            <div key={i} className={`logo-item flex items-center justify-center py-6 px-4 ${i === 1 ? 'bg-muted/40' : ''}`}>
              <span className="text-sm md:text-base font-bold text-muted-foreground/60 tracking-wider select-none">
                {logo.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SaasLeadersCarousel;
