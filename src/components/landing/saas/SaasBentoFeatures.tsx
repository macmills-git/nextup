import { useEffect, useRef } from "react";
import { Zap, Shield, Globe, BarChart3, Rocket, RefreshCw, Settings2, CheckCircle, Layers, Code2, Wifi, Phone, Monitor } from "@/lib/fa-icons";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SaasBentoFeatures = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current.querySelectorAll('.feat-anim'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.06, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%' }
      }
    );
  }, []);

  return (
    <section ref={ref} className="relative">
      {/* ============ BLOCK 1: Built for Event Intelligence — Warm cream canvas with dotted grid + coral glow ============ */}
      <div className="relative overflow-hidden py-24 border-y border-border/40"
           style={{ background: 'linear-gradient(180deg, hsl(35 45% 97%) 0%, hsl(28 50% 95%) 100%)' }}>
        <div className="pointer-events-none absolute inset-0 opacity-[0.06]"
             style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="pointer-events-none absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full bg-primary/15 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-40 -right-40 w-[520px] h-[620px] rounded-full bg-primary/10 blur-[140px]" />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">

        {/* Section 1: "Built for Event Intelligence" - two-column layout */}
        <div className="text-center mb-16">
          <p className="feat-anim text-sm text-primary font-medium mb-4">Platform</p>
          <h2 className="feat-anim text-3xl md:text-5xl font-bold text-foreground mb-4">
            Built for Event Intelligence
          </h2>
          <p className="feat-anim text-base text-muted-foreground max-w-xl mx-auto">
            Build, test and deploy event workflows with a powerful visual interface designed for planning teams
          </p>
        </div>


        <div className="max-w-6xl mx-auto mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px border border-border/15 rounded-2xl overflow-hidden bg-border/10">
            {/* Left: Feature list */}
            <div className="bg-card flex flex-col">
              {[
                { icon: Layers, title: "Design your Workflow", desc: "A drag-and-drop interface to create, connect, and configure event components into logical workflows", accent: false },
                { icon: Globe, title: "Connect your Tools", desc: "Agents operate independently and coordinate tasks to complete all complex goals together", accent: true },
                { icon: Monitor, title: "Deploy & Scale", desc: "Run event workflows in a sandbox to preview behavior, debug logic, and test interactions", accent: false },
              ].map((item, i) => (
                <div key={i} className={`feat-anim p-8 md:p-10 border-b border-border/10 last:border-b-0 ${item.accent ? 'bg-muted/20' : ''}`}>
                  <div className="flex items-center gap-2.5 mb-3">
                    <item.icon className="w-4 h-4 text-foreground" />
                    <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  {item.accent && <div className="w-32 h-0.5 bg-primary/60 mt-6 rounded-full" />}
                </div>
              ))}
            </div>

            {/* Right: Interactive mockup */}
            <div className="feat-anim bg-card p-8 md:p-10 flex items-center justify-center relative overflow-hidden">
              {/* Dot grid background */}
              <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: 'radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }} />

              <div className="relative w-full max-w-sm space-y-6">
                {/* Task card */}
                <div className="bg-card border border-border/30 rounded-xl p-5 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-4 h-4 rounded border border-border/50" />
                    <span className="text-sm font-medium text-foreground">Tasks</span>
                  </div>
                  <p className="text-sm text-primary/70 leading-relaxed">
                    Write the first and second rule of it using venue selection and budget.
                  </p>
                  {/* Timeline line */}
                  <div className="flex items-center gap-2 mt-5">
                    <div className="w-3 h-3 rounded-full border-2 border-primary/40 bg-background" />
                    <div className="flex-1 h-px bg-primary/30" />
                    <div className="w-3 h-3 rounded-full border-2 border-primary/40 bg-background" />
                  </div>
                  <div className="h-3 bg-muted/40 rounded-full mt-3 w-2/3" />
                </div>

                {/* Integrations card */}
                <div className="bg-card border border-border/30 rounded-xl p-5 shadow-sm absolute top-4 -right-4 w-52">
                  <div className="flex items-center gap-2 mb-4">
                    <Monitor className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">Integrations</span>
                    <span className="ml-auto text-xs text-muted-foreground">200</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-muted/50 flex items-center justify-center">
                          <span className="text-[8px]">📊</span>
                        </div>
                        <span className="text-xs text-foreground">Analytics</span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full border border-emerald-200 text-emerald-600 dark:border-emerald-800 dark:text-emerald-400">Connected</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-muted/50 flex items-center justify-center">
                          <span className="text-[8px]">🤖</span>
                        </div>
                        <span className="text-xs text-foreground">AI Planner</span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full border border-emerald-200 text-emerald-600 dark:border-emerald-800 dark:text-emerald-400">Connected</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: "Making Planners 10x faster" - 3x2 grid with center mockup */}
        <div className="text-center mb-16">
          <h2 className="feat-anim text-3xl md:text-5xl font-bold text-foreground mb-4">
            Making Planners 10x faster
          </h2>
          <p className="feat-anim text-base text-muted-foreground max-w-xl mx-auto">
            We empower planners and teams to create, simulate, and manage event-driven workflows visually
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-px bg-border/10 border border-border/15 rounded-2xl overflow-hidden mb-24">
          {/* Row 1 */}
          {[
            { icon: Rocket, title: "Launch Faster", desc: "Go from concept to fully planned event in hours, not weeks — with AI-generated timelines and checklists" },
            null, // center mockup spans 2 rows
            { icon: Settings2, title: "Reuse Templates", desc: "Save successful event plans as templates and reuse them across future events with one click" },
          ].map((item, i) => {
            if (!item) return (
              <div key={i} className="feat-anim bg-card row-span-2 flex flex-col items-center justify-center p-8 relative overflow-hidden">
                {/* Dot grid */}
                <div className="absolute inset-0 opacity-[0.03]" style={{
                  backgroundImage: 'radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)',
                  backgroundSize: '16px 16px'
                }} />
                {/* Integration icons */}
                <div className="relative flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-card border border-border/30 shadow-sm flex items-center justify-center">
                    <span className="text-lg">📊</span>
                  </div>
                  <div className="w-14 h-14 rounded-xl bg-card border border-border/30 shadow-md flex items-center justify-center">
                    <span className="text-xl">🎯</span>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-card border border-border/30 shadow-sm flex items-center justify-center">
                    <span className="text-lg">📅</span>
                  </div>
                </div>
                {/* Vertical line */}
                <div className="w-px h-8 bg-border/30" />
                <span className="text-[10px] px-3 py-1 rounded-full border border-emerald-200 text-emerald-600 dark:border-emerald-800 dark:text-emerald-400 my-3">Connected</span>
                <div className="w-px h-6 bg-border/30" />
                {/* Mini dashboard */}
                <div className="bg-card border border-border/30 rounded-lg p-3 mt-2 w-full max-w-[200px]">
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                    <div className="w-2 h-2 rounded-full bg-yellow-400" />
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    <span className="ml-auto text-[8px] text-muted-foreground">△ Event created</span>
                  </div>
                  <p className="text-[10px] font-semibold text-foreground">Dashboard</p>
                  <p className="text-[8px] text-muted-foreground">Event Analytics</p>
                </div>
              </div>
            );
            return (
              <div key={i} className="feat-anim bg-card p-8">
                <item.icon className="w-5 h-5 text-primary mb-4" />
                <h4 className="text-base font-semibold text-foreground mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
          {/* Row 2 */}
          {[
            { icon: RefreshCw, title: "Iterate Rapidly", desc: "Adjust budgets, swap vendors, and shift timelines on the fly with real-time updates across your team" },
            { icon: CheckCircle, title: "Prevent Overruns", desc: "Smart budget alerts and deadline tracking ensure your events stay on time and within budget" },
          ].map((item, i) => (
            <div key={`r2-${i}`} className={`feat-anim bg-card p-8 ${i === 0 ? 'md:col-start-1' : 'md:col-start-3'}`}>
              <item.icon className="w-5 h-5 text-primary mb-4" />
              <h4 className="text-base font-semibold text-foreground mb-2">{item.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
          {/* Row 3 */}
          {[
            { icon: BarChart3, title: "Scale Smarter", desc: "From intimate dinners to 10,000-person conferences — Nested scales with your ambitions" },
            null,
            { icon: Code2, title: "Custom Workflows", desc: "Build automated sequences for RSVPs, vendor follow-ups, and post-event surveys" },
          ].map((item, i) => {
            if (!item) return (
              <div key={`r3-${i}`} className="feat-anim bg-card p-8" />
            );
            return (
              <div key={`r3-${i}`} className="feat-anim bg-card p-8">
                <item.icon className="w-5 h-5 text-primary mb-4" />
                <h4 className="text-base font-semibold text-foreground mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Section 3: Native Tools Integration */}
        <div className="max-w-6xl mx-auto mb-24">
          <div className="border border-border/15 rounded-2xl overflow-hidden bg-card">
            <div className="p-8 md:p-10 border-b border-border/10">
              <div className="flex items-center gap-2.5 mb-3">
                <Wifi className="w-4 h-4 text-primary" />
                <h3 className="text-base font-semibold text-foreground">Native Tools Integration</h3>
              </div>
              <p className="text-sm text-muted-foreground max-w-2xl">
                Connect your favorite tools — calendars, payment processors, communication platforms — and let Nested sync everything in real time.
              </p>
            </div>
            <div className="feat-anim p-8 md:p-12 flex items-center justify-center min-h-[320px] relative overflow-hidden">
              {/* Dot grid */}
              <div className="absolute inset-0 opacity-[0.02]" style={{
                backgroundImage: 'radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }} />
              {/* Integration hub visualization */}
              <div className="relative w-full max-w-lg">
                {/* Tool labels on left */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 space-y-6">
                  {[
                    { icon: "📅", label: "Google Calendar", color: "bg-primary/20" },
                    { icon: "💻", label: "Stripe Payments", color: "bg-primary/30" },
                    { icon: "📞", label: "Slack Notifications", color: "bg-yellow-500/20" },
                  ].map((tool, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Monitor className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">{tool.label}</span>
                      <div className={`h-px flex-1 min-w-[40px] ${i === 0 ? 'bg-primary/30' : i === 1 ? 'bg-primary/40' : 'bg-yellow-500/30'}`} />
                    </div>
                  ))}
                </div>

                {/* Center hub */}
                <div className="mx-auto w-16 h-16 rounded-xl bg-card border border-border/40 shadow-md flex items-center justify-center">
                  <span className="text-2xl">🎯</span>
                </div>
                <span className="block text-center mt-3 text-[10px] px-3 py-1 rounded-full border border-emerald-200 text-emerald-600 dark:border-emerald-800 dark:text-emerald-400 w-fit mx-auto">Connected</span>

                {/* Tool icons on right */}
                <div className="absolute right-0 top-0 space-y-4">
                  {["⚡", "📋", "📊", "🔗", "💬"].map((emoji, i) => (
                    <div key={i} className="w-10 h-10 rounded-xl bg-card border border-border/30 shadow-sm flex items-center justify-center">
                      <span className="text-sm">{emoji}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom feature strip */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border/10 border-t border-border/10">
              {[
                { icon: Shield, title: "One Click Auth", desc: "Secure team access with role-based permissions and single sign-on for your organization" },
                { icon: RefreshCw, title: "Realtime Sync", desc: "Changes to events, budgets, and vendor assignments sync instantly across all team members" },
                { icon: Code2, title: "Custom Integrations", desc: "Use our API and webhooks to connect Nested with your existing event management tools" },
              ].map((item, i) => (
                <div key={i} className="feat-anim bg-card p-6 md:p-8">
                  <item.icon className="w-5 h-5 text-primary mb-3" />
                  <h4 className="text-sm font-semibold text-foreground mb-1.5">{item.title}</h4>
                  <p className="text-[13px] text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 4: LLM Model Selector & Text to workflow builder */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-px bg-border/10 border border-border/15 rounded-2xl overflow-hidden">
          {/* LLM Model Selector */}
          <div className="feat-anim bg-card p-8 md:p-10">
            <div className="flex items-center gap-2.5 mb-3">
              <Globe className="w-4 h-4 text-foreground" />
              <h3 className="text-base font-semibold text-foreground">Vendor Model Selector</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Browse and compare verified vendors by category, ratings, availability, and pricing — all within your event workspace.
            </p>
            {/* Mock vendor list */}
            <div className="space-y-3">
              <div className="bg-card border border-border/30 rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-foreground">Event Analytics</span>
                  <span className="text-[9px] text-muted-foreground">GPT 5</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full border border-emerald-200 text-emerald-600 dark:border-emerald-800 dark:text-emerald-400">Connected</span>
              </div>
              <div className="bg-card border border-border/30 rounded-lg p-3">
                <div className="flex items-center gap-1.5 mb-3">
                  <div className="w-2 h-2 rounded-full bg-red-400" />
                  <div className="w-2 h-2 rounded-full bg-yellow-400" />
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border/20">
                  <div className="flex items-center gap-2">
                    <Monitor className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-xs text-foreground">All Models</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground">69,420</span>
                </div>
                {[
                  { name: "Premium Vendor AI", status: "Unavailable", color: "text-red-500 border-red-200 dark:border-red-800" },
                  { name: "Smart Scheduler", status: "Connected", color: "text-emerald-600 border-emerald-200 dark:border-emerald-800" },
                  { name: "Budget Optimizer", status: "Waiting", color: "text-yellow-600 border-yellow-200 dark:border-yellow-800" },
                ].map((model, i) => (
                  <div key={i} className="flex items-center justify-between py-2.5 border-b border-border/10 last:border-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px]">{i === 0 ? '✴️' : i === 1 ? '🔗' : '🔄'}</span>
                      <span className="text-xs text-foreground">{model.name}</span>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border ${model.color}`}>{model.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Text to workflow builder */}
          <div className="feat-anim bg-card p-8 md:p-10">
            <div className="flex items-center gap-2.5 mb-3">
              <Layers className="w-4 h-4 text-foreground" />
              <h3 className="text-base font-semibold text-foreground">Text to workflow builder</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Describe your event in plain language and let AI generate a complete plan — with timelines, vendor suggestions, and budget estimates.
            </p>
            {/* Chat mockup */}
            <div className="bg-card border border-border/30 rounded-xl p-5 shadow-sm space-y-4">
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-muted/50 flex items-center justify-center flex-shrink-0">
                  <span className="text-[8px]">🤖</span>
                </div>
                <div className="bg-muted/30 rounded-lg rounded-bl-sm px-3 py-2 text-xs text-muted-foreground">
                  Hi! I can help you plan any event. What do you have in mind?
                </div>
              </div>
              <div className="flex items-start gap-2 flex-row-reverse">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop&crop=face" alt="User" className="w-6 h-6 rounded-full object-cover flex-shrink-0" />
                <div className="bg-primary rounded-lg rounded-br-sm px-3 py-2 text-xs text-primary-foreground">
                  Plan a 200-person corporate gala with catering, live music, and photography
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-muted/50 flex items-center justify-center flex-shrink-0">
                  <span className="text-[8px]">🤖</span>
                </div>
                <div className="bg-muted/30 rounded-lg rounded-bl-sm px-3 py-2 text-xs text-muted-foreground">
                  Done! I've created a 12-week timeline with 5 vendor recommendations and a $45K budget breakdown. Ready to review?
                </div>
              </div>
              <div className="border border-border/30 rounded-lg px-3 py-2.5 flex items-center justify-between mt-2">
                <span className="text-xs text-muted-foreground">Ask Nested AI</span>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground text-xs">📎</span>
                  <span className="text-muted-foreground text-xs">➤</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SaasBentoFeatures;
