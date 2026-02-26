import { useState, useEffect } from "react";
import { MapPin, Star, Users, Calendar, Heart } from "lucide-react";

const destinations = [
  { city: "Grand Ballroom", country: "Wedding Venue", visitors: "4.2k", image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=500&fit=crop", flag: "🏛️" },
  { city: "Sky Conference", country: "Corporate Center", visitors: "3.8k", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=500&fit=crop", flag: "🏢" },
  { city: "Garden Estate", country: "Outdoor Venue", visitors: "5.1k", image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=500&fit=crop", flag: "🌿" },
  { city: "The Loft NYC", country: "Social Events", visitors: "2.9k", image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=400&h=500&fit=crop", flag: "🎉" },
  { city: "Coastal Resort", country: "Beach Venue", visitors: "6.3k", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=500&fit=crop", flag: "🏖️" },
];

const FeaturesSection = () => {
  const [activeIndex, setActiveIndex] = useState(2);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % destinations.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-28 relative overflow-hidden" style={{
      background: 'linear-gradient(180deg, #F8F9FB 0%, #FFFFFF 100%)',
    }}>
      {/* Soft ambient glows */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full opacity-30 pointer-events-none" style={{
        background: 'radial-gradient(circle, rgba(255,0,150,0.08) 0%, transparent 70%)',
      }} />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 rounded-full opacity-30 pointer-events-none" style={{
        background: 'radial-gradient(circle, rgba(0,150,255,0.08) 0%, transparent 70%)',
      }} />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#6B7280' }}>Discover Venues</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4" style={{ color: '#111827' }}>
            Find the perfect venue for every event
          </h2>
          <p className="text-sm md:text-base max-w-xl mx-auto" style={{ color: '#6B7280' }}>
            Browse curated venues and event spaces trusted by thousands of planners worldwide.
          </p>
        </div>

        {/* Carousel with phone mockup */}
        <div className="relative flex items-center justify-center min-h-[520px]">
          {/* Cards */}
          {destinations.map((dest, i) => {
            const offset = i - activeIndex;
            const absOffset = Math.abs(offset);
            const isCenter = offset === 0;

            return (
              <div
                key={i}
                className="absolute cursor-pointer transition-all duration-700 ease-in-out"
                onClick={() => setActiveIndex(i)}
                style={{
                  transform: `translateX(${offset * 220}px) scale(${isCenter ? 1 : 0.85 - absOffset * 0.05}) rotateY(${offset * -5}deg)`,
                  zIndex: 10 - absOffset,
                  opacity: absOffset > 2 ? 0 : 1 - absOffset * 0.25,
                  filter: isCenter ? 'none' : `blur(${absOffset * 1.5}px)`,
                  animation: isCenter ? 'floatY 4s ease-in-out infinite' : 'none',
                }}
              >
                <div className="w-[260px] h-[380px] rounded-[24px] overflow-hidden relative group" style={{
                  boxShadow: isCenter
                    ? '0 20px 60px rgba(0,0,0,0.15), 0 10px 20px rgba(0,0,0,0.08)'
                    : '0 10px 30px rgba(0,0,0,0.08)',
                }}>
                  <img
                    src={dest.image}
                    alt={dest.city}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0" style={{
                    background: 'linear-gradient(0deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)',
                  }} />

                  {/* Favorite */}
                  <div className="absolute top-4 right-4">
                    <Heart className="w-5 h-5 text-white/80 hover:text-red-400 transition-colors cursor-pointer" />
                  </div>

                  {/* Flag floating */}
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-lg shadow-lg">
                    {dest.flag}
                  </div>

                  {/* Bottom info */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                      <span className="text-xs text-white/90 font-medium">4.9</span>
                    </div>
                    <h3 className="text-white font-bold text-lg">{dest.city}</h3>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-white/70 text-xs">{dest.country}</span>
                      <span className="text-white/60 text-xs flex items-center gap-1">
                        <Users className="w-3 h-3" /> {dest.visitors}
                      </span>
                    </div>
                    {/* Tags */}
                    <div className="flex gap-1.5 mt-3">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 text-white/90 backdrop-blur-sm">Popular</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 text-white/90 backdrop-blur-sm">Verified</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {destinations.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                background: i === activeIndex ? '#111827' : '#D1D5DB',
                transform: i === activeIndex ? 'scale(1.5)' : 'scale(1)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
