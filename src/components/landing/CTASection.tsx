import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, User } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const chatMessages = [
  { role: "user" as const, text: "I need to plan a corporate event for 200 people next month." },
  { role: "ai" as const, text: "I'd love to help! Let me suggest a timeline. First, what's your budget range and preferred venue type?" },
  { role: "user" as const, text: "Budget is around $15,000. We'd prefer a downtown hotel ballroom." },
  { role: "ai" as const, text: "Great choice! I found 3 venues in your range. I've also drafted a 4-week planning timeline with vendor recommendations. Shall I share it?" },
  { role: "user" as const, text: "Yes, please share the timeline and top vendor picks." },
  { role: "ai" as const, text: "Done! Your timeline is ready with 12 milestones. I've shortlisted 5 caterers and 3 AV companies — all rated 4.8+ ⭐" },
];

const AIInteraction = () => {
  const [visibleCount, setVisibleCount] = useState(0);
  const [scrollPhase, setScrollPhase] = useState(0);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visibleCount < chatMessages.length) {
      const timer = setTimeout(() => setVisibleCount(c => c + 1), 900);
      return () => clearTimeout(timer);
    }
    const scrollTimer = setTimeout(() => setScrollPhase(1), 800);
    return () => clearTimeout(scrollTimer);
  }, [visibleCount]);

  useEffect(() => {
    if (scrollPhase === 0 || !chatRef.current) return;
    const el = chatRef.current;
    const doScroll = () => {
      if (scrollPhase === 1) {
        el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
        setTimeout(() => setScrollPhase(2), 600);
      } else if (scrollPhase === 2) {
        el.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => setScrollPhase(3), 600);
      } else if (scrollPhase === 3) {
        el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
        setTimeout(() => setScrollPhase(4), 600);
      } else if (scrollPhase === 4) {
        el.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => { setScrollPhase(0); setVisibleCount(0); }, 2000);
      }
    };
    doScroll();
  }, [scrollPhase]);

  return (
    <div className="max-w-2xl mx-auto rounded-2xl p-6 overflow-hidden" style={{
      background: 'linear-gradient(135deg, #121218 0%, #0e0e14 100%)',
      border: '1px solid rgba(255,255,255,0.08)',
      height: '420px',
      animation: 'gradientCardFlow 4s ease-in-out infinite',
    }}>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-xs font-medium text-white/60">AI Assistant • Online</span>
      </div>
      <div ref={chatRef} className="space-y-3 overflow-y-auto" style={{ height: '340px', scrollBehavior: 'smooth' }}>
        {chatMessages.slice(0, visibleCount).map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''} animate-fade-in`}>
            <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{
              background: msg.role === 'ai' ? 'rgba(59,130,246,0.2)' : 'rgba(255,255,255,0.1)'
            }}>
              {msg.role === 'ai' ? <Bot className="w-3.5 h-3.5 text-blue-400" /> : <User className="w-3.5 h-3.5 text-gray-400" />}
            </div>
            <div className={`rounded-2xl px-4 py-2.5 text-sm max-w-[75%] ${
              msg.role === 'user' ? 'text-white rounded-br-sm' : 'text-gray-300 rounded-bl-sm'
            }`} style={{
              background: msg.role === 'user' ? 'rgba(59,130,246,0.15)' : 'rgba(255,255,255,0.06)'
            }}>
              {msg.text}
            </div>
          </div>
        ))}
        {visibleCount < chatMessages.length && visibleCount > 0 && (
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(59,130,246,0.2)' }}>
              <Bot className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <div className="flex gap-1 items-center px-4 py-3 rounded-2xl rounded-bl-sm" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const CTASection = () => {
  return (
    <>
      {/* AI Interaction Section */}
      <section className="py-20" style={{ background: '#0B0B0F' }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">Interactive AI Assistant</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
              Your AI event planner in action
            </h2>
          </div>
          <AIInteraction />
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden" style={{ background: '#0B0B0F' }}>
        <div className="absolute inset-0 pointer-events-none">
          {[20, 35, 50, 65, 80].map((pos) => (
            <div key={`v${pos}`} className="absolute top-0 bottom-0 w-px" style={{ left: `${pos}%`, background: 'rgba(255,255,255,0.04)' }} />
          ))}
          {[20, 40, 60, 80].map((pos) => (
            <div key={`h${pos}`} className="absolute left-0 right-0 h-px" style={{ top: `${pos}%`, background: 'rgba(255,255,255,0.04)' }} />
          ))}
        </div>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center top, rgba(255,255,255,0.03) 0%, transparent 60%)' }} />
        <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-bold mb-6" style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.4) 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
          }}>
            Your All-in-One Event Companion
          </h2>
          <p className="text-sm md:text-base mb-10 max-w-xl mx-auto" style={{ color: '#9CA3AF' }}>
            Simplify event planning, vendor management, and team coordination with cutting-edge tools designed for everyone — from beginners to pros.
          </p>
          <Button size="lg" asChild className="rounded-full px-8 py-3 text-sm font-medium" style={{
            background: 'linear-gradient(135deg, #4F7CF7, #5B8DFB)',
            border: 'none', color: 'white',
            boxShadow: '0 4px 20px rgba(79,124,247,0.35)',
          }}>
            <Link to="/signup">
              Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default CTASection;
