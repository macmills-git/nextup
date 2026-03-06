import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MacBookShowcase = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current.querySelector('.macbook-wrapper'), 
      { y: 60, opacity: 0, rotateX: 15 },
      { y: 0, opacity: 1, rotateX: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' }
      }
    );
    gsap.fromTo(ref.current.querySelectorAll('.mac-text'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%' }
      }
    );
  }, []);

  return (
    <section ref={ref} className="py-24 bg-background relative overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center 40%, hsl(var(--primary) / 0.04) 0%, transparent 60%)',
      }} />

      <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
        {/* Icon */}
        <div className="mac-text flex justify-center mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        <h2 className="mac-text text-3xl md:text-5xl font-bold mb-3 text-foreground">Perfect set of tools</h2>
        <p className="mac-text text-sm md:text-base text-muted-foreground max-w-lg mx-auto mb-14">
          Event Nest comes with perfect tools for the perfect events out there.
        </p>

        {/* MacBook */}
        <div className="macbook-wrapper max-w-4xl mx-auto" style={{ perspective: '1200px' }}>
          {/* Screen */}
          <div className="relative rounded-t-xl overflow-hidden border-[6px] border-muted/40 dark:border-muted bg-card shadow-elevated" style={{ aspectRatio: '16/10' }}>
            {/* Mock dashboard inside */}
            <div className="w-full h-full p-3 bg-card overflow-hidden">
              {/* Top bar */}
              <div className="flex items-center gap-1.5 mb-3">
                <div className="w-2 h-2 rounded-full bg-destructive/60" />
                <div className="w-2 h-2 rounded-full bg-warning/60" />
                <div className="w-2 h-2 rounded-full bg-success/60" />
                <div className="flex-1 ml-4 h-5 rounded bg-secondary flex items-center px-2">
                  <span className="text-[8px] text-muted-foreground">eventnest.app/dashboard</span>
                </div>
              </div>
              <div className="flex gap-3 h-[calc(100%-2rem)]">
                {/* Sidebar */}
                <div className="w-[15%] bg-secondary rounded-lg p-2 space-y-1.5 hidden md:block">
                  {['Dashboard', 'Events', 'Vendors', 'Messages', 'Analytics', 'Team', 'Settings'].map((item, i) => (
                    <div key={item} className={`h-4 rounded text-[6px] flex items-center px-1.5 ${i === 0 ? 'bg-primary/15 text-primary font-medium' : 'text-muted-foreground'}`}>
                      {item}
                    </div>
                  ))}
                </div>
                {/* Main */}
                <div className="flex-1 space-y-2.5">
                  <div className="flex gap-2">
                    <div className="flex-1 bg-secondary rounded-lg p-2.5">
                      <p className="text-[7px] text-muted-foreground mb-0.5">Total Revenue</p>
                      <p className="text-sm font-bold text-foreground">$42,000</p>
                      <svg viewBox="0 0 100 25" className="w-full h-5 mt-1" fill="none">
                        <polyline points="0,20 10,18 20,15 30,16 40,10 50,12 60,8 70,6 80,9 90,4 100,2" stroke="hsl(var(--primary))" strokeWidth="1.5" fill="none" />
                      </svg>
                    </div>
                    <div className="flex-1 bg-secondary rounded-lg p-2.5 hidden sm:block">
                      <p className="text-[7px] text-muted-foreground mb-0.5">Latest Transactions</p>
                      {['Venue Booking', 'Catering Deposit', 'Florist Payment'].map((t) => (
                        <div key={t} className="flex items-center justify-between py-0.5">
                          <span className="text-[6px] text-foreground">{t}</span>
                          <span className="text-[6px] text-success">✓</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-secondary rounded-lg p-2.5">
                    <p className="text-[7px] text-muted-foreground mb-1">Total Visitors</p>
                    <div className="flex items-end gap-[2px] h-8">
                      {[40,55,35,70,50,80,65,90,45,75,60,85].map((h,i) => (
                        <div key={i} className="flex-1 bg-primary/30 rounded-t-sm" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Keyboard/base */}
          <div className="relative">
            <div className="h-3 bg-muted/50 dark:bg-muted rounded-b-sm mx-4" style={{
              background: 'linear-gradient(180deg, hsl(var(--muted) / 0.6), hsl(var(--muted) / 0.3))',
            }} />
            <div className="h-1.5 bg-muted/30 rounded-b-xl mx-8" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MacBookShowcase;
