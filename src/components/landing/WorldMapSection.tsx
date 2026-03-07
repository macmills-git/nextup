import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const avatars = [
  { name: "Sarah", top: "25%", left: "42%", delay: 0 },
  { name: "James", top: "55%", left: "52%", delay: 0.2 },
  { name: "Priya", top: "40%", left: "72%", delay: 0.1 },
  { name: "Alex", top: "30%", left: "18%", delay: 0.3 },
  { name: "Maria", top: "60%", left: "35%", delay: 0.15 },
  { name: "Chen", top: "35%", left: "82%", delay: 0.25 },
];

const connections = [
  { from: 0, to: 2 },
  { from: 0, to: 1 },
  { from: 1, to: 2 },
  { from: 3, to: 0 },
  { from: 4, to: 1 },
  { from: 1, to: 5 },
];

const WorldMapSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current.querySelectorAll('.wm-el'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' }
      }
    );
    gsap.fromTo(ref.current.querySelectorAll('.avatar-pin'),
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.7)',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' }
      }
    );
    gsap.fromTo(ref.current.querySelectorAll('.connection-line'),
      { strokeDashoffset: 500 },
      { strokeDashoffset: 0, duration: 1.5, stagger: 0.15, ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' }
      }
    );
  }, []);

  return (
    <section ref={ref} className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <span className="wm-el inline-block text-xs font-medium border border-border rounded-full px-4 py-1.5 mb-4 text-muted-foreground">Availability</span>
        <h2 className="wm-el text-3xl md:text-5xl font-bold mb-3 text-foreground">
          Connect to team members everywhere
        </h2>
        <p className="wm-el text-sm text-muted-foreground max-w-lg mx-auto mb-12">
          Our platform is available in all countries, with support from over 20,000+ event professionals.
        </p>

        {/* Map container - zoomed in */}
        <div className="relative max-w-5xl mx-auto overflow-hidden rounded-2xl" style={{ aspectRatio: '2/1' }}>
          <div className="absolute inset-0 scale-[1.15] origin-center">
            <svg viewBox="0 0 1000 500" className="w-full h-full opacity-20" fill="hsl(var(--muted-foreground))">
              {Array.from({ length: 80 }).map((_, row) =>
                Array.from({ length: 160 }).map((_, col) => {
                  const x = col * 6.25 + 3;
                  const y = row * 6.25 + 3;
                  const isLand = (
                    (x > 80 && x < 300 && y > 60 && y < 250 && Math.random() > 0.4) ||
                    (x > 180 && x < 340 && y > 260 && y < 450 && Math.random() > 0.45) ||
                    (x > 420 && x < 580 && y > 60 && y < 200 && Math.random() > 0.4) ||
                    (x > 430 && x < 600 && y > 180 && y < 420 && Math.random() > 0.45) ||
                    (x > 560 && x < 850 && y > 60 && y < 300 && Math.random() > 0.4) ||
                    (x > 750 && x < 900 && y > 320 && y < 430 && Math.random() > 0.5)
                  );
                  return isLand ? <circle key={`${row}-${col}`} cx={x} cy={y} r="1.5" /> : null;
                })
              )}
            </svg>

            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
              {connections.map((conn, i) => {
                const from = avatars[conn.from];
                const to = avatars[conn.to];
                const fromX = parseFloat(from.left);
                const fromY = parseFloat(from.top);
                const toX = parseFloat(to.left);
                const toY = parseFloat(to.top);
                const midY = Math.min(fromY, toY) - 10;
                return (
                  <path key={i} className="connection-line"
                    d={`M ${fromX} ${fromY} Q ${(fromX + toX) / 2} ${midY} ${toX} ${toY}`}
                    fill="none" stroke="hsl(var(--primary) / 0.4)" strokeWidth="0.3"
                    strokeDasharray="500" strokeDashoffset="500" />
                );
              })}
            </svg>

            {avatars.map((av, i) => (
              <div key={i} className="avatar-pin absolute w-10 h-10 -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                style={{ top: av.top, left: av.left }}>
                <div className="w-10 h-10 rounded-full border-2 border-background shadow-elevated overflow-hidden bg-primary/20 flex items-center justify-center transition-transform duration-200 group-hover:scale-125">
                  <span className="text-xs font-bold text-primary">{av.name[0]}</span>
                </div>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-card border border-border rounded-md px-2 py-0.5 whitespace-nowrap shadow-sm">
                  <span className="text-[10px] text-foreground font-medium">{av.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorldMapSection;
