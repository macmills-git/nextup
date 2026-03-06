import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const orbitItems = [
  { name: "Sarah C.", initial: "S" },
  { name: "James O.", initial: "J" },
  { name: "Emily R.", initial: "E" },
  { name: "Priya S.", initial: "P" },
  { name: "Alex K.", initial: "A" },
  { name: "Marcus W.", initial: "M" },
  { name: "Chen L.", initial: "C" },
  { name: "David H.", initial: "D" },
  { name: "Maria G.", initial: "G" },
];

const RadialIntro = () => {
  const ref = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current.querySelectorAll('.ri-el'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' }
      }
    );
  }, []);

  useEffect(() => {
    if (!orbitRef.current) return;
    const items = orbitRef.current.querySelectorAll('.orbit-item');
    // Slow continuous rotation
    gsap.to(orbitRef.current, {
      rotation: 360,
      duration: 30,
      ease: 'none',
      repeat: -1,
    });
    // Counter-rotate each item so they stay upright
    items.forEach(item => {
      gsap.to(item, {
        rotation: -360,
        duration: 30,
        ease: 'none',
        repeat: -1,
      });
    });
  }, []);

  return (
    <section ref={ref} className="py-24 bg-secondary dark:bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <h2 className="ri-el text-3xl md:text-4xl font-bold text-foreground mb-3">
          Trusted by event professionals worldwide
        </h2>
        <p className="ri-el text-sm text-muted-foreground max-w-md mx-auto mb-16">
          Join thousands of planners who rely on Event Nest every day.
        </p>

        <div className="ri-el flex justify-center">
          <div className="relative w-72 h-72 md:w-96 md:h-96">
            {/* Center logo */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center shadow-elevated">
                <span className="text-white text-2xl font-bold">E</span>
              </div>
            </div>

            {/* Orbit rings */}
            <div className="absolute inset-4 rounded-full border border-border/50" />
            <div className="absolute inset-0 rounded-full border border-border/30" />

            {/* Orbiting avatars */}
            <div ref={orbitRef} className="absolute inset-0">
              {orbitItems.map((item, i) => {
                const angle = (i / orbitItems.length) * 360;
                const radius = 48; // percent from center
                const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
                const y = 50 + radius * Math.sin((angle * Math.PI) / 180);
                return (
                  <div
                    key={i}
                    className="orbit-item absolute w-10 h-10 -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${x}%`, top: `${y}%` }}
                  >
                    <div className="w-10 h-10 rounded-full border-2 border-background bg-card shadow-card flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">{item.initial}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RadialIntro;
