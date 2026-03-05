import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const trustedLogos = [
  { name: "Aceternity UI", icon: "◆" },
  { name: "Gamity", icon: "●" },
  { name: "Host IT", icon: "◎" },
  { name: "Asteroid Kit", icon: "▲" },
  { name: "PlanPro", icon: "⬡" },
];

const DashboardShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const els = sectionRef.current.querySelectorAll('.trust-el');
    gsap.fromTo(els, { y: 30, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-background relative">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <h2 className="trust-el text-3xl md:text-4xl font-bold mb-3" style={{
          backgroundImage: 'linear-gradient(180deg, hsl(var(--foreground)), hsl(var(--muted-foreground)))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Trusted by Industry Leaders
        </h2>
        <p className="trust-el text-sm text-muted-foreground max-w-lg mx-auto mb-12">
          Join the ranks of forward-thinking companies already leveraging our AI technology
        </p>
        <div className="trust-el flex items-center justify-center gap-10 md:gap-16 flex-wrap">
          {trustedLogos.map((logo, i) => (
            <div key={i} className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity duration-300">
              <span className="text-xl text-foreground">{logo.icon}</span>
              <span className="text-sm font-semibold text-foreground tracking-tight">{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DashboardShowcase;