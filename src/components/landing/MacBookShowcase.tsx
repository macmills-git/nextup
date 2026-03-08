import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MacBookShowcase = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [lidOpen, setLidOpen] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 80%',
        end: 'top 30%',
        scrub: 0.8,
        onEnter: () => setLidOpen(true),
        onLeaveBack: () => setLidOpen(false),
      },
    });

    // Animate the whole laptop up
    tl.fromTo(ref.current.querySelector('.macbook-container'),
      { y: 80, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power3.out' }
    );

    // Animate text
    gsap.fromTo(ref.current.querySelectorAll('.mac-text'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%' }
      }
    );
  }, []);

  return (
    <section ref={ref} className="py-24 bg-transparent relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center 40%, hsl(var(--primary) / 0.04) 0%, transparent 60%)',
      }} />

      <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
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

        {/* MacBook with opening lid animation */}
        <div className="macbook-container max-w-4xl mx-auto" style={{ perspective: '1500px' }}>
          {/* Screen / Lid */}
          <div
            className="relative origin-bottom"
            style={{
              transform: lidOpen ? 'rotateX(0deg)' : 'rotateX(-80deg)',
              transition: 'transform 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
              transformStyle: 'preserve-3d',
            }}
          >
            <div className="relative rounded-t-2xl overflow-hidden border-[6px] border-muted/40 dark:border-muted bg-card shadow-elevated" style={{ aspectRatio: '16/10' }}>
              {/* Glow when open */}
              <div className="absolute inset-0 pointer-events-none z-20 rounded-t-xl" style={{
                boxShadow: lidOpen ? 'inset 0 0 60px hsl(var(--primary) / 0.05)' : 'none',
                transition: 'box-shadow 1s ease 0.5s',
              }} />

              {/* Mock dashboard */}
              <div className="w-full h-full p-3 bg-card overflow-hidden" style={{
                opacity: lidOpen ? 1 : 0,
                transition: 'opacity 0.6s ease 0.8s',
              }}>
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
                  {/* Main content */}
                  <div className="flex-1 space-y-2.5">
                    <div className="flex gap-2">
                      <div className="flex-1 bg-secondary rounded-lg p-2.5">
                        <p className="text-[7px] text-muted-foreground mb-0.5">Your Posts</p>
                        <p className="text-sm font-bold text-foreground">242,000</p>
                        <p className="text-[6px] text-muted-foreground">Total posts</p>
                        <svg viewBox="0 0 100 30" className="w-full h-6 mt-1" fill="none">
                          <polyline points="0,25 8,22 16,20 24,18 32,15 40,16 48,10 56,12 64,8 72,11 80,6 88,9 100,4" stroke="hsl(var(--primary))" strokeWidth="1.5" fill="none" />
                          <text x="70" y="8" fontSize="3" fill="hsl(var(--primary))">March $48,200</text>
                        </svg>
                      </div>
                      <div className="flex-1 bg-secondary rounded-lg p-2.5 hidden sm:block">
                        <p className="text-[7px] text-muted-foreground mb-0.5">Latest Transactions</p>
                        {[
                          { name: 'Invoice #AA-04-19', desc: 'New Madleton LLC.', amount: '$118.00' },
                          { name: 'Client Bernard Stanley', desc: 'bernard.scanley@gmail.com', amount: '$3200.00' },
                          { name: 'Meeting with the client', desc: '24 Vandervort Springs', amount: '29 Oct 2019' },
                          { name: 'Invoice #AA-04-19-1890243', desc: 'Tripeamouth LLC.', amount: '$578.00' },
                        ].map((t, i) => (
                          <div key={i} className="flex items-center justify-between py-0.5">
                            <div>
                              <span className="text-[5px] text-foreground block">{t.name}</span>
                              <span className="text-[4px] text-muted-foreground">{t.desc}</span>
                            </div>
                            <span className="text-[5px] text-foreground font-medium">{t.amount}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-secondary rounded-lg p-2.5">
                      <p className="text-[7px] text-muted-foreground mb-1">Posts Breakdown</p>
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
          </div>

          {/* Base / Keyboard */}
          <div className="relative">
            <div className="h-3 bg-muted/50 dark:bg-muted rounded-b-sm mx-4" style={{
              background: 'linear-gradient(180deg, hsl(var(--muted) / 0.6), hsl(var(--muted) / 0.3))',
            }} />
            <div className="h-1.5 bg-muted/30 rounded-b-xl mx-8" />
            {/* Reflection glow */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-8 rounded-full opacity-30" style={{
              background: 'radial-gradient(ellipse, hsl(var(--primary) / 0.2), transparent 70%)',
              filter: 'blur(10px)',
            }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MacBookShowcase;
