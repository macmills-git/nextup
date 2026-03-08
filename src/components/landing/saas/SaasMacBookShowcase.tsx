import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SaasMacBookShowcase = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current.querySelector('.dashboard-frame'),
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' }
      }
    );
    gsap.fromTo(ref.current.querySelectorAll('.dash-text'),
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%' }
      }
    );
  }, []);

  return (
    <section ref={ref} className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Dashboard mockup - clean Nodus-style */}
        <div className="dashboard-frame max-w-5xl mx-auto rounded-2xl border border-border/20 bg-card shadow-xl shadow-foreground/5 overflow-hidden">
          {/* Top bar */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-border/10">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive/50" />
                <div className="w-3 h-3 rounded-full bg-warning/50" />
                <div className="w-3 h-3 rounded-full bg-success/50" />
              </div>
              <span className="text-xs font-semibold text-foreground ml-2">Nested</span>
            </div>
            <div className="flex-1 max-w-sm mx-8">
              <div className="flex items-center gap-2 bg-muted/40 rounded-lg px-3 py-1.5">
                <span className="text-[10px] text-muted-foreground">🔍 Search for anything...</span>
                <span className="ml-auto text-[9px] text-muted-foreground bg-background rounded px-1.5 py-0.5 border border-border/20">⌘K</span>
              </div>
            </div>
            <div className="w-7 h-7 rounded-full bg-muted/60 border border-border/20" />
          </div>

          <div className="flex">
            {/* Sidebar */}
            <div className="w-48 border-r border-border/10 p-3 hidden md:block">
              <div className="space-y-0.5">
                {[
                  { name: 'Dashboard', icon: '📊', active: true },
                  { name: 'Events', icon: '📅' },
                  { name: 'Vendors', icon: '🏪' },
                  { name: 'Messages', icon: '💬' },
                  { name: 'Team', icon: '👥' },
                  { name: 'Analytics', icon: '📈' },
                  { name: 'Settings', icon: '⚙️' },
                  { name: 'Notifications', icon: '🔔' },
                ].map((item) => (
                  <div key={item.name} className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-medium cursor-default ${item.active ? 'bg-muted/60 text-foreground' : 'text-muted-foreground hover:bg-muted/30'}`}>
                    <span className="text-xs">{item.icon}</span>
                    {item.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Main content */}
            <div className="flex-1 p-4 space-y-4">
              <p className="text-sm font-semibold text-foreground">Dashboard</p>

              {/* Stats row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { icon: '📅', value: '128', label: 'Active events', change: '' },
                  { icon: '📊', value: '96.7%', label: 'Task success rate', change: '4%', up: true },
                  { icon: '⏱', value: '12.4s', label: 'Average response time', change: '27%', up: false },
                  { icon: '🤖', value: 'GPT-4o', label: 'Most used model', change: '' },
                ].map((stat, i) => (
                  <div key={i} className="rounded-xl border border-border/15 p-3 bg-background">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-xs">{stat.icon}</span>
                      <span className="text-base font-bold text-foreground">{stat.value}</span>
                      {stat.change && (
                        <span className={`text-[9px] font-medium ${stat.up ? 'text-success' : 'text-primary'}`}>
                          {stat.change} {stat.up ? '↗' : '↘'}
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Table */}
              <div className="rounded-xl border border-border/15 bg-background p-3">
                <p className="text-xs font-semibold text-foreground mb-3">Event monitor</p>
                <div className="overflow-hidden">
                  <div className="grid grid-cols-5 gap-2 text-[9px] font-medium text-muted-foreground pb-2 border-b border-border/10 px-1">
                    <span>Event name</span><span>Type</span><span>Status</span><span>Budget</span><span>Last updated</span>
                  </div>
                  {[
                    { name: 'Corporate Gala 2026', type: 'Corporate', status: 'Active', statusColor: 'bg-success', budget: '$45K', time: '14 min ago' },
                    { name: 'Product Launch', type: 'Marketing', status: 'Planning', statusColor: 'bg-warning', budget: '$28K', time: '32 min ago' },
                    { name: 'Team Offsite', type: 'Internal', status: 'Active', statusColor: 'bg-success', budget: '$12K', time: '1 hr ago' },
                  ].map((row, i) => (
                    <div key={i} className="grid grid-cols-5 gap-2 text-[10px] text-foreground py-2 px-1 border-b border-border/5 last:border-0">
                      <span className="font-medium">{row.name}</span>
                      <span className="text-muted-foreground">{row.type}</span>
                      <span className="flex items-center gap-1"><span className={`w-1.5 h-1.5 rounded-full ${row.statusColor}`} />{row.status}</span>
                      <span>{row.budget}</span>
                      <span className="text-muted-foreground">{row.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Charts row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="rounded-xl border border-border/15 bg-background p-3">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-semibold text-foreground">Events by status</p>
                    <span className="text-[9px] text-muted-foreground bg-muted/40 rounded px-2 py-0.5">Past 7 days</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="relative w-20 h-20">
                      <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                        <circle cx="18" cy="18" r="15" fill="none" stroke="hsl(var(--muted))" strokeWidth="3" />
                        <circle cx="18" cy="18" r="15" fill="none" stroke="hsl(var(--primary))" strokeWidth="3" strokeDasharray="65 35" />
                        <circle cx="18" cy="18" r="15" fill="none" stroke="hsl(var(--primary)/0.3)" strokeWidth="3" strokeDasharray="20 80" strokeDashoffset="-65" />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-sm font-bold text-foreground">87</span>
                        <span className="text-[7px] text-muted-foreground">Events</span>
                      </div>
                    </div>
                    <div className="space-y-1.5 text-[10px]">
                      <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm bg-primary" /> Active</div>
                      <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm bg-primary/30" /> Planning</div>
                      <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm bg-muted" /> Completed</div>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl border border-border/15 bg-background p-3">
                  <p className="text-xs font-semibold text-foreground mb-3">Tasks breakdown</p>
                  <div className="flex items-end gap-[3px] h-16">
                    {[12, 18, 8, 22, 15, 20, 10, 19, 14, 21, 11, 17].map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col gap-[2px]">
                        <div className="bg-primary/20 rounded-t-sm" style={{ height: `${h * 1.5}px` }} />
                        <div className="bg-primary/50 rounded-b-sm" style={{ height: `${h}px` }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SaasMacBookShowcase;
