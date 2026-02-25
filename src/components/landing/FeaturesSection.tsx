import { Globe, Users, Sparkles, MessageSquare, Youtube, Slack, Mail } from "lucide-react";

const FeaturesSection = () => {
  return (
    <section className="py-24 relative" style={{ background: '#0B0B0F' }}>
      {/* Ambient radial gradient */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, rgba(59,130,246,0.04) 0%, transparent 70%)'
      }} />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">

          {/* Card 1 – Hosting Over the Edge */}
          <div className="group rounded-[24px] p-8 md:p-10 border transition-all duration-300 hover:-translate-y-1.5 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #1a1a22 0%, #121218 50%, #0e0e14 100%)',
              borderColor: 'rgba(255,255,255,0.08)',
              boxShadow: '0 30px 50px rgba(0,0,0,0.3)'
            }}>
            {/* Radial rings */}
            <div className="flex justify-center mb-8 relative">
              <div className="relative w-32 h-32">
                {[80, 60, 40].map((size, i) => (
                  <div key={i} className="absolute rounded-full border" style={{
                    width: `${size}%`, height: `${size}%`,
                    top: `${(100-size)/2}%`, left: `${(100-size)/2}%`,
                    borderColor: `rgba(255,255,255,${0.06 - i * 0.015})`,
                  }} />
                ))}
              </div>
              {/* Floating glass icons */}
              <div className="absolute top-2 left-1/4 w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-sm transition-transform duration-300 group-hover:scale-105"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 8px 20px rgba(0,0,0,0.3)' }}>
                <Sparkles className="w-4 h-4 text-blue-400" />
              </div>
              <div className="absolute top-4 right-1/4 w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-sm transition-transform duration-300 group-hover:scale-105"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 8px 20px rgba(0,0,0,0.3)' }}>
                <MessageSquare className="w-4 h-4 text-blue-400" />
              </div>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Hosting over the edge</h3>
            <p className="text-sm leading-relaxed" style={{ color: '#9CA3AF' }}>
              With our edge network, we host your events by going into each city — faster load times, global reach, zero downtime.
            </p>
          </div>

          {/* Card 2 – Global Availability */}
          <div className="group rounded-[24px] p-8 md:p-10 border transition-all duration-300 hover:-translate-y-1.5 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #1a1a22 0%, #121218 50%, #0e0e14 100%)',
              borderColor: 'rgba(255,255,255,0.08)',
              boxShadow: '0 30px 50px rgba(0,0,0,0.3)'
            }}>
            {/* Dotted world map pattern */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }} />
            {/* Glowing dots */}
            {[[30,25],[70,35],[45,60],[80,50],[20,70]].map(([l,t], i) => (
              <div key={i} className="absolute w-1.5 h-1.5 rounded-full animate-pulse" style={{
                left: `${l}%`, top: `${t}%`,
                background: '#3b82f6',
                boxShadow: '0 0 8px 2px rgba(59,130,246,0.5)'
              }} />
            ))}
            <p className="text-sm font-medium mb-2 relative z-10" style={{ color: '#9CA3AF' }}>Available in every country</p>
            <p className="text-5xl md:text-6xl font-bold text-white mb-4 relative z-10">100+ Countries</p>
            <p className="text-sm leading-relaxed relative z-10" style={{ color: '#9CA3AF' }}>
              Access our platform from anywhere in the world with our globally distributed network and localized support in multiple languages.
            </p>
          </div>

          {/* Card 3 – Major User Adoption */}
          <div className="group rounded-[24px] p-8 md:p-10 border transition-all duration-300 hover:-translate-y-1.5 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #1a1a22 0%, #121218 50%, #0e0e14 100%)',
              borderColor: 'rgba(255,255,255,0.08)',
              boxShadow: '0 30px 50px rgba(0,0,0,0.3)'
            }}>
            {/* Floating glass icon buttons */}
            <div className="flex gap-3 mb-8">
              {[Youtube, Slack, Globe, Mail, Sparkles].map((Icon, i) => (
                <div key={i} className="w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-sm transition-all duration-300 group-hover:scale-105 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 8px 20px rgba(0,0,0,0.3)' }}>
                  <Icon className="w-4 h-4 text-gray-400" />
                </div>
              ))}
            </div>
            <p className="text-5xl md:text-6xl font-bold text-white mb-4">542,000 Users</p>
            {/* Avatar stack */}
            <div className="flex -space-x-2 mb-4">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-[10px] text-gray-400"
                  style={{ background: `hsl(${i*50}, 10%, 25%)`, borderColor: '#121218' }}>
                  <Users className="w-3 h-3" />
                </div>
              ))}
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Major User Adoption</h3>
            <p className="text-sm leading-relaxed" style={{ color: '#9CA3AF' }}>
              Join our growing community of over 500,000 users who trust our platform for their event planning and management needs.
            </p>
          </div>

          {/* Card 4 – Testimonial */}
          <div className="group rounded-[24px] p-8 md:p-10 border transition-all duration-300 hover:-translate-y-1.5 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #1a1a22 0%, #121218 50%, #0e0e14 100%)',
              borderColor: 'rgba(255,255,255,0.08)',
              boxShadow: '0 30px 50px rgba(0,0,0,0.3)'
            }}>
            <h3 className="text-2xl font-bold text-white mb-2">People love us</h3>
            <p className="text-sm mb-6" style={{ color: '#9CA3AF' }}>
              See what our users are saying about their experience with our platform.
            </p>
            {/* Stacked card effect */}
            <div className="relative">
              <div className="absolute -bottom-2 left-2 right-2 h-full rounded-2xl" style={{
                background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)'
              }} />
              <div className="absolute -bottom-1 left-1 right-1 h-full rounded-2xl" style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)'
              }} />
              <div className="relative rounded-2xl p-5" style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(10px)'
              }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.1)' }}>
                    <Users className="w-4 h-4 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Sarah Johnson</p>
                    <p className="text-xs" style={{ color: '#6b7280' }}>Event Director</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: '#d1d5db' }}>
                  "EventNest has completely{' '}
                  <span style={{ color: '#00FF99', textShadow: '0 0 10px rgba(0,255,153,0.3)' }}>
                    transformed how we plan events
                  </span>
                  . The AI assistant alone saved us 40 hours per event."
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
