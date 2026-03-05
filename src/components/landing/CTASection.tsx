import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, User, Star, Quote } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const chatMessages = [
  { role: "user" as const, text: "I need to plan a corporate event for 200 people next month." },
  { role: "ai" as const, text: "I'd love to help! Let me suggest a timeline. First, what's your budget range and preferred venue type?" },
  { role: "user" as const, text: "Budget is around $15,000. We'd prefer a downtown hotel ballroom." },
  { role: "ai" as const, text: "Great choice! I found 3 venues in your range. I've also drafted a 4-week planning timeline with vendor recommendations." },
  { role: "user" as const, text: "Yes, please share the timeline and top vendor picks." },
  { role: "ai" as const, text: "Done! Your timeline is ready with 12 milestones. I've shortlisted 5 caterers and 3 AV companies — all rated 4.8+ ⭐" },
];

const testimonials = [
  { name: "Sarah Chen", role: "Event Director, TechCorp", text: "Event Nest transformed how we plan corporate events. The AI assistant alone saved us 40 hours per event.", avatar: "S" },
  { name: "Marcus Williams", role: "Wedding Planner", text: "The vendor marketplace is incredible. I found 3 amazing photographers in minutes.", avatar: "M" },
  { name: "Emily Rodriguez", role: "Founder, Celebrate Co.", text: "Best event planning tool I've used. The budget tracking and timeline features are exactly what I needed.", avatar: "E" },
  { name: "James Okafor", role: "Corporate Events Manager", text: "Our team coordination improved dramatically. The real-time collaboration features are a game changer.", avatar: "J" },
  { name: "Priya Sharma", role: "Social Event Coordinator", text: "From small gatherings to large galas, Event Nest scales beautifully. The templates save so much time.", avatar: "P" },
  { name: "Alex Kim", role: "Conference Organizer", text: "The AI recommendations for vendors and timelines are surprisingly accurate. It's like having a senior planner on call 24/7.", avatar: "A" },
];

const AIInteraction = () => {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount < chatMessages.length) {
      const timer = setTimeout(() => setVisibleCount(c => c + 1), 1200);
      return () => clearTimeout(timer);
    }
    const resetTimer = setTimeout(() => setVisibleCount(0), 4000);
    return () => clearTimeout(resetTimer);
  }, [visibleCount]);

  return (
    <div className="max-w-2xl mx-auto rounded-2xl p-5 overflow-hidden bg-card border border-border" style={{ height: '360px' }}>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
        <span className="text-xs font-medium text-muted-foreground">AI Assistant • Online</span>
      </div>
      <div className="space-y-2.5 overflow-y-auto" style={{ height: '300px' }}>
        {chatMessages.slice(0, visibleCount).map((msg, i) => (
          <div key={i} className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''} animate-fade-in`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'ai' ? 'bg-primary/20' : 'bg-secondary'}`}>
              {msg.role === 'ai' ? <Bot className="w-3 h-3 text-primary" /> : <User className="w-3 h-3 text-muted-foreground" />}
            </div>
            <div className={`rounded-xl px-3.5 py-2 text-sm max-w-[75%] ${msg.role === 'user' ? 'bg-primary/15 text-foreground rounded-br-sm' : 'bg-secondary text-foreground rounded-bl-sm'}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {visibleCount < chatMessages.length && visibleCount > 0 && (
          <div className="flex gap-2.5">
            <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 bg-primary/20">
              <Bot className="w-3 h-3 text-primary" />
            </div>
            <div className="flex gap-1 items-center px-3.5 py-2.5 rounded-xl rounded-bl-sm bg-secondary">
              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const CTASection = () => {
  const aiRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!aiRef.current) return;
    gsap.fromTo(aiRef.current.querySelectorAll('.gsap-el'), { y: 30, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out',
      scrollTrigger: { trigger: aiRef.current, start: 'top 85%' },
    });
  }, []);

  useEffect(() => {
    if (!ctaRef.current) return;
    gsap.fromTo(ctaRef.current.querySelectorAll('.cta-el'), { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: ctaRef.current, start: 'top 80%' },
    });
  }, []);

  useEffect(() => {
    if (!testimonialsRef.current) return;
    gsap.fromTo(testimonialsRef.current.querySelectorAll('.testimonial-card'), { y: 20, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: 'power2.out',
      scrollTrigger: { trigger: testimonialsRef.current, start: 'top 85%' },
    });
  }, []);

  return (
    <>
      {/* AI Interaction */}
      <section className="py-16 bg-background">
        <div ref={aiRef} className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-8">
            <span className="gsap-el text-xs font-semibold uppercase tracking-wider text-primary">Interactive AI Assistant</span>
            <h2 className="gsap-el text-3xl md:text-4xl font-bold text-foreground mt-2 mb-3">Your AI event planner in action</h2>
          </div>
          <div className="gsap-el"><AIInteraction /></div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-secondary dark:bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Loved by builders, <span className="text-muted-foreground">easy turnarounds</span>
            </h2>
          </div>
          <div ref={testimonialsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card bg-card rounded-xl p-5 border border-border shadow-card">
                <Quote className="w-4 h-4 text-primary/30 mb-2" />
                <p className="text-sm text-foreground leading-relaxed mb-3">{t.text}</p>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{t.avatar}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{t.name}</p>
                    <p className="text-[11px] text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-28 overflow-hidden bg-background">
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground) / 0.15) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground) / 0.15) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />
        <div ref={ctaRef} className="relative z-10 text-center max-w-3xl mx-auto px-4">
          <h2 className="cta-el text-4xl md:text-5xl font-bold mb-5 text-foreground">
            Ready to transform your events?
          </h2>
          <p className="cta-el text-sm md:text-base mb-8 max-w-xl mx-auto text-muted-foreground">
            Join thousands of event planners who trust Event Nest to deliver unforgettable experiences.
          </p>
          <div className="cta-el">
            <Button size="lg" asChild className="rounded-full px-8 py-3 text-sm font-medium border-none text-white transition-transform duration-200 hover:scale-105 gradient-primary" style={{
              boxShadow: '0 4px 20px hsl(225, 90%, 60%, 0.35)',
            }}>
              <Link to="/signup">Get Started Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default CTASection;