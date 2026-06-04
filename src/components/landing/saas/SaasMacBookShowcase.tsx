import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SaasMacBookShowcase = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const macbook = ref.current.querySelector('.macbook-wrap');
    const screen = ref.current.querySelector('.macbook-screen-inner');
    gsap.fromTo(macbook,
      { y: 120, rotateX: -25, opacity: 0, transformPerspective: 1200 },
      { y: 0, rotateX: 0, opacity: 1, duration: 1.4, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' }
      }
    );
    gsap.fromTo(screen,
      { scale: 0.92, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, delay: 0.4, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' }
      }
    );
    gsap.fromTo(ref.current.querySelectorAll('.fg-text'),
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' }
      }
    );
    // Continuous tilt / swing — rotates side-to-side and gentle bob
    gsap.to(macbook, {
      rotateY: 6, rotateZ: 1.2, y: -14,
      duration: 3.6, ease: 'sine.inOut', yoyo: true, repeat: -1,
      transformOrigin: '50% 100%',
    });
    gsap.to(macbook, {
      rotateY: -6, rotateZ: -1.2,
      duration: 3.6, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.8,
    });
  }, []);

  return (
    <section ref={ref} className="relative py-32 overflow-hidden bg-foreground text-background">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: 'linear-gradient(hsl(var(--background)/0.5) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--background)/0.5) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />
      <div className="absolute inset-0 bg-gradient-to-b from-foreground via-foreground to-foreground/95" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Foreground bold text */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <p className="fg-text text-xs uppercase tracking-[0.3em] text-background/60 mb-6">Mission Control</p>
          <h2 className="fg-text font-bold tracking-[-0.04em] leading-[0.95] text-background"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}>
            One dashboard.<br/>
            <span className="text-background/50">Every event detail.</span>
          </h2>
          <p className="fg-text mt-6 text-base md:text-lg text-background/70 max-w-xl mx-auto">
            Track events, vendors, budgets, and teams in real time — built for fast-moving event organizations.
          </p>
        </div>

        {/* MacBook frame */}
        <div className="macbook-wrap max-w-5xl mx-auto relative" style={{ perspective: 1500 }}>
          {/* Lid / screen */}
          <div className="relative rounded-t-[18px] bg-neutral-800 p-[10px] pb-[14px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-3 bg-neutral-900 rounded-b-lg z-10" />
            <div className="macbook-screen-inner relative aspect-[16/10] rounded-[10px] overflow-hidden bg-card border border-neutral-700">
              {/* Browser-like dashboard */}
              <div className="h-full flex flex-col">
                <div className="flex items-center justify-between px-4 py-2 border-b border-border/30 bg-background">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-warning/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-success/60" />
                  </div>
                  <span className="text-[10px] text-muted-foreground font-medium">nested.app/dashboard</span>
                  <span className="w-5 h-5 rounded-full bg-muted" />
                </div>

                <div className="flex-1 flex">
                  <div className="w-44 border-r border-border/30 p-3 hidden md:block bg-card">
                    <div className="space-y-1">
                      {[
                        { name: 'Dashboard', active: true },
                        { name: 'Projects' }, { name: 'Vendors' }, { name: 'Messages' },
                        { name: 'Team' }, { name: 'Analytics' }, { name: 'Settings' },
                      ].map((item) => (
                        <div key={item.name}
                          className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-medium ${item.active ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}>
                          <span className="w-1 h-1 rounded-full bg-current opacity-60" />
                          {item.name}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex-1 p-4 md:p-5 space-y-4 bg-background overflow-hidden">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-foreground">Event Operations</p>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-success/10 text-success border border-success/30">All systems go</span>
                    </div>

                    <div className="grid grid-cols-4 gap-3">
                      {[
                        { value: '128', label: 'Active', accent: 'bg-primary' },
                        { value: '96%', label: 'On track', accent: 'bg-success' },
                        { value: '$1.2M', label: 'Budget', accent: 'bg-warning' },
                        { value: '24', label: 'Vendors', accent: 'bg-foreground' },
                      ].map((stat, i) => (
                        <div key={i} className="rounded-xl border border-border/40 p-3 bg-card">
                          <div className={`w-2 h-2 rounded-full ${stat.accent} mb-2`} />
                          <p className="text-base md:text-lg font-bold text-foreground leading-none">{stat.value}</p>
                          <p className="text-[10px] text-muted-foreground mt-1">{stat.label}</p>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="col-span-2 rounded-xl border border-border/40 bg-card p-3">
                        <div className="flex items-end gap-1 h-20">
                          {[40, 55, 30, 70, 50, 80, 60, 90, 75, 65, 85, 95].map((h, i) => (
                            <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-primary/30 to-primary" style={{ height: `${h}%` }} />
                          ))}
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-2">Events booked · last 12 months</p>
                      </div>
                      <div className="rounded-xl border border-border/40 bg-card p-3 space-y-2">
                        <p className="text-[10px] font-semibold text-foreground">Upcoming</p>
                        {['Corp Gala', 'Launch Party', 'Team Offsite'].map((e, i) => (
                          <div key={i} className="flex items-center gap-2 text-[10px]">
                            <span className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-success' : i === 1 ? 'bg-warning' : 'bg-primary'}`} />
                            <span className="text-foreground truncate">{e}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Base / hinge */}
          <div className="relative h-3 bg-gradient-to-b from-neutral-700 via-neutral-600 to-neutral-800 rounded-b-[20px] mx-auto"
               style={{ width: '108%', marginLeft: '-4%' }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1.5 rounded-b-md bg-neutral-900" />
          </div>
          {/* Reflection */}
          <div className="absolute -bottom-12 left-1/4 right-1/4 h-12 bg-gradient-to-b from-background/10 to-transparent blur-2xl rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default SaasMacBookShowcase;
