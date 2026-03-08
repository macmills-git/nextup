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

    tl.fromTo(ref.current.querySelector('.macbook-container'),
      { y: 80, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power3.out' }
    );

    gsap.fromTo(ref.current.querySelectorAll('.mac-text'),
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%' }
      }
    );
  }, []);

  return (
    <section ref={ref} className="py-28 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
        <span className="mac-text inline-flex items-center text-xs font-bold text-foreground bg-secondary border-2 border-border px-4 py-1 rounded-lg shadow-brutal mb-4">
          Dashboard
        </span>
        <h2 className="mac-text text-3xl md:text-5xl font-black mb-3 text-foreground">Perfect set of tools</h2>
        <p className="mac-text text-sm md:text-base text-muted-foreground max-w-lg mx-auto mb-14 font-medium">
          Event Nest comes with perfect tools for the perfect events out there.
        </p>

        <div className="macbook-container max-w-4xl mx-auto" style={{ perspective: '1500px' }}>
          <div
            className="relative origin-bottom"
            style={{
              transform: lidOpen ? 'rotateX(0deg)' : 'rotateX(-80deg)',
              transition: 'transform 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
              transformStyle: 'preserve-3d',
            }}
          >
            <div className="relative rounded-t-2xl overflow-hidden border-2 border-border bg-card shadow-brutal-xl" style={{ aspectRatio: '16/10' }}>
              <div className="w-full h-full p-3 bg-card overflow-hidden" style={{
                opacity: lidOpen ? 1 : 0,
                transition: 'opacity 0.6s ease 0.8s',
              }}>
                <div className="flex items-center gap-1.5 mb-3">
                  <div className="w-3 h-3 rounded-md bg-destructive border border-border" />
                  <div className="w-3 h-3 rounded-md bg-warning border border-border" />
                  <div className="w-3 h-3 rounded-md bg-success border border-border" />
                  <div className="flex-1 ml-4 h-6 rounded-lg bg-muted border-2 border-border flex items-center px-2">
                    <span className="text-[9px] font-bold text-muted-foreground">eventnest.app/dashboard</span>
                  </div>
                </div>
                <div className="flex gap-3 h-[calc(100%-2.5rem)]">
                  <div className="w-[15%] bg-muted border-2 border-border rounded-lg p-2 space-y-1.5 hidden md:block">
                    {['Dashboard', 'Events', 'Vendors', 'Messages', 'Analytics', 'Team', 'Settings'].map((item, i) => (
                      <div key={item} className={`h-5 rounded-md text-[7px] font-bold flex items-center px-1.5 border ${i === 0 ? 'bg-primary text-primary-foreground border-border' : 'text-muted-foreground border-transparent'}`}>
                        {item}
                      </div>
                    ))}
                  </div>
                  <div className="flex-1 space-y-2.5">
                    <div className="flex gap-2">
                      <div className="flex-1 bg-muted border-2 border-border rounded-lg p-2.5">
                        <p className="text-[8px] font-bold text-muted-foreground mb-0.5">Your Posts</p>
                        <p className="text-sm font-black text-foreground">242,000</p>
                        <p className="text-[7px] text-muted-foreground">Total posts</p>
                        <svg viewBox="0 0 100 30" className="w-full h-6 mt-1" fill="none">
                          <polyline points="0,25 8,22 16,20 24,18 32,15 40,16 48,10 56,12 64,8 72,11 80,6 88,9 100,4" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" />
                        </svg>
                      </div>
                      <div className="flex-1 bg-muted border-2 border-border rounded-lg p-2.5 hidden sm:block">
                        <p className="text-[8px] font-bold text-muted-foreground mb-0.5">Latest Transactions</p>
                        {[
                          { name: 'Invoice #AA-04-19', desc: 'New Madleton LLC.', amount: '$118.00' },
                          { name: 'Client Bernard Stanley', desc: 'bernard.scanley@gmail.com', amount: '$3200.00' },
                          { name: 'Meeting with the client', desc: '24 Vandervort Springs', amount: '29 Oct 2019' },
                          { name: 'Invoice #AA-04-19-1890243', desc: 'Tripeamouth LLC.', amount: '$578.00' },
                        ].map((t, i) => (
                          <div key={i} className="flex items-center justify-between py-0.5">
                            <div>
                              <span className="text-[6px] font-bold text-foreground block">{t.name}</span>
                              <span className="text-[5px] text-muted-foreground">{t.desc}</span>
                            </div>
                            <span className="text-[6px] text-foreground font-bold">{t.amount}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-muted border-2 border-border rounded-lg p-2.5">
                      <p className="text-[8px] font-bold text-muted-foreground mb-1">Posts Breakdown</p>
                      <div className="flex items-end gap-[2px] h-8">
                        {[40,55,35,70,50,80,65,90,45,75,60,85].map((h,i) => (
                          <div key={i} className="flex-1 bg-primary rounded-t-sm border border-border" style={{ height: `${h}%` }} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="h-4 bg-muted rounded-b-lg mx-4 border-2 border-t-0 border-border" />
            <div className="h-2 bg-muted/50 rounded-b-xl mx-8 border-2 border-t-0 border-border" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MacBookShowcase;
