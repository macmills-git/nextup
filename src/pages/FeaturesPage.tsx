import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, DollarSign, Users, Sparkles, MessageSquare, Clock, Store, CheckCircle, Zap, Shield, Globe, BarChart3, ArrowRight, Bot, Layers, FileText, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "10,000+", label: "Events Planned" },
  { value: "500+", label: "Verified Vendors" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "50+", label: "Event Templates" },
];

const FeaturesPage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const bentoRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(heroRef.current.querySelectorAll('.fp-anim'),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
      );
    }
    if (bentoRef.current) {
      gsap.fromTo(bentoRef.current.querySelectorAll('.bento-item'),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: 'power2.out',
          scrollTrigger: { trigger: bentoRef.current, start: 'top 85%' }
        }
      );
    }
    if (gridRef.current) {
      gsap.fromTo(gridRef.current.querySelectorAll('.grid-item'),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.04, ease: 'power2.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 85%' }
        }
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-32 pb-20 container mx-auto px-4 lg:px-8">
        {/* Hero */}
        <div ref={heroRef} className="text-center max-w-3xl mx-auto mb-20">
          <span className="fp-anim inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-4 py-1.5 rounded-full mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Features
          </span>
          <h1 className="fp-anim text-4xl md:text-6xl font-bold mt-3 mb-6 text-foreground tracking-tight">
            Packed with thousands of features
          </h1>
          <p className="fp-anim text-sm md:text-base text-muted-foreground">
            From event creation to vendor management, Event Nest has tools for literally everything. It can even plan your event for you.
          </p>
        </div>

        {/* Bento grid - large cards */}
        <div ref={bentoRef} className="max-w-6xl mx-auto space-y-5 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* AI Chat card */}
            <div className="bento-item rounded-2xl p-6 bg-card border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-1">AI-Powered Planning</h3>
              <p className="text-sm text-muted-foreground mb-4">Generate event plans from a text prompt, a brief, or a simple idea at the speed of light.</p>
              <div className="rounded-xl bg-secondary p-3 space-y-2">
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot className="w-2.5 h-2.5 text-primary" />
                  </div>
                  <div className="bg-card rounded-lg rounded-bl-sm px-2.5 py-1.5 text-[11px] text-foreground">
                    I found 3 venues in your budget. Here's a timeline with vendor recommendations.
                  </div>
                </div>
                <div className="flex items-start gap-2 flex-row-reverse">
                  <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[8px] text-muted-foreground">U</span>
                  </div>
                  <div className="bg-primary/10 rounded-lg rounded-br-sm px-2.5 py-1.5 text-[11px] text-foreground">
                    Perfect! Share the timeline and vendor picks.
                  </div>
                </div>
              </div>
            </div>

            {/* Chat/Bot card */}
            <div className="bento-item rounded-2xl p-6 bg-card border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-1">Smart Communication Hub</h3>
              <p className="text-sm text-muted-foreground mb-4">Create chatbots and auto-responses with a single button click.</p>
              <div className="rounded-xl bg-secondary p-3 space-y-1.5">
                {[
                  { text: "Hello! Give me all the vendor contacts for this event", from: "user", color: "bg-primary" },
                  { text: "Sure! Here are 12 vendor contacts with ratings.", from: "bot", color: "bg-success" },
                  { text: "Can you also draft the vendor brief?", from: "user", color: "bg-warning" },
                  { text: "Done! Brief generated and sent.", from: "bot", color: "bg-primary" },
                ].map((msg, i) => (
                  <div key={i} className={`${msg.color} rounded-lg px-2.5 py-1.5 text-[10px] text-white ${msg.from === 'user' ? 'ml-auto max-w-[80%]' : 'mr-auto max-w-[80%]'}`}>
                    {msg.text}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bento-item rounded-2xl p-6 bg-card border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-1">Multi-Vendor Support</h3>
              <p className="text-sm text-muted-foreground mb-4">Whether it's caterers, photographers or DJs, we support everything.</p>
              <div className="rounded-xl bg-secondary p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-semibold text-foreground">Add Vendor</span>
                  <span className="text-[9px] text-primary font-medium cursor-pointer">+ Add</span>
                </div>
                {[
                  { name: "Elite Catering", date: "23rd March", active: false },
                  { name: "Lens Studio Pro", date: "21st March", active: true },
                  { name: "Sound Systems", date: "3rd May", active: false },
                  { name: "Floral Dreams", date: "1st April", active: true },
                ].map((v, i) => (
                  <div key={i} className="flex items-center justify-between py-1.5 border-t border-border/50">
                    <div>
                      <span className="text-[10px] text-foreground">{v.name}</span>
                      <span className="text-[8px] text-muted-foreground ml-2">{v.date}</span>
                    </div>
                    <div className={`w-6 h-3 rounded-full ${v.active ? 'bg-primary' : 'bg-muted'}`} />
                  </div>
                ))}
              </div>
            </div>

            <div className="bento-item rounded-2xl p-6 bg-card border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-1">Deploy in seconds</h3>
              <p className="text-sm text-muted-foreground mb-4">With our blazing fast platform, you can create and publish event pages instantly.</p>
              <div className="flex flex-wrap gap-1.5">
                {["📅 Events", "👥 Teams", "📊 Analytics", "💬 Messages", "🎯 Goals", "🏪 Vendors", "📋 Tasks", "💰 Budget", "🎨 Templates", "🔔 Alerts"].map((tag) => (
                  <span key={tag} className="text-[10px] px-2.5 py-1 rounded-full border border-border bg-secondary text-foreground">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-card border border-border rounded-2xl p-10 max-w-4xl mx-auto mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s, i) => (
              <div key={i}>
                <p className="text-3xl md:text-4xl font-bold text-foreground">{s.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Feature grid - 8 small cards */}
        <div ref={gridRef} className="max-w-6xl mx-auto mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-3">Everything you need</h2>
            <p className="text-muted-foreground">Built for professionals who demand the best tools.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { icon: Calendar, title: "Event Creation", desc: "Create events with dates, locations, and budgets in seconds." },
              { icon: Store, title: "Vendor Marketplace", desc: "Discover and compare verified vendors with reviews." },
              { icon: DollarSign, title: "Budget Tracking", desc: "No cap, no lock, no credit card required." },
              { icon: Clock, title: "Timeline Planning", desc: "Automated timelines with milestones and deadlines." },
              { icon: Zap, title: "Real-time Updates", desc: "Instant notifications for all event changes." },
              { icon: Shield, title: "Secure & Private", desc: "Enterprise-grade encrypted data storage." },
              { icon: Users, title: "Team Collaboration", desc: "You can simply share access with your whole team." },
              { icon: CheckCircle, title: "And everything else", desc: "Everything else you could possibly need." },
            ].map((f, i) => (
              <div key={i} className="grid-item rounded-xl p-5 bg-card border border-border hover:shadow-elevated transition-shadow">
                <f.icon className="w-5 h-5 text-foreground mb-3" />
                <h4 className="text-sm font-semibold text-foreground mb-1">{f.title}</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button size="lg" asChild className="rounded-full px-8 py-3 text-sm font-medium border-none text-white gradient-primary" style={{
            boxShadow: '0 4px 20px hsl(225, 90%, 60%, 0.35)',
          }}>
            <Link to="/signup">Get Started Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FeaturesPage;
