import { useEffect, useRef, useState, useCallback } from "react";
import { MapPin, Star, Users, Heart, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const destinations = [
  { city: "Grand Ballroom", country: "Wedding Venue", visitors: "4.2k", image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=500&fit=crop", flag: "🏛️", rating: "4.9" },
  { city: "Sky Conference", country: "Corporate Center", visitors: "3.8k", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=500&fit=crop", flag: "🏢", rating: "4.8" },
  { city: "Garden Estate", country: "Outdoor Venue", visitors: "5.1k", image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=500&fit=crop", flag: "🌿", rating: "4.9" },
  { city: "The Loft NYC", country: "Social Events", visitors: "2.9k", image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=400&h=500&fit=crop", flag: "🎉", rating: "4.7" },
  { city: "Coastal Resort", country: "Beach Venue", visitors: "6.3k", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=500&fit=crop", flag: "🏖️", rating: "5.0" },
  { city: "Mountain Lodge", country: "Retreat Venue", visitors: "3.2k", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=500&fit=crop", flag: "🏔️", rating: "4.8" },
  { city: "Art Gallery", country: "Exhibition Space", visitors: "4.5k", image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=500&fit=crop", flag: "🎨", rating: "4.6" },
  { city: "Rooftop Terrace", country: "City Views", visitors: "7.1k", image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=400&h=500&fit=crop", flag: "🌃", rating: "4.9" },
  { city: "Vineyard Hall", country: "Wine Country", visitors: "3.5k", image: "https://images.unsplash.com/photo-1510076857177-7470076d4098?w=400&h=500&fit=crop", flag: "🍷", rating: "4.7" },
  { city: "Historic Manor", country: "Heritage Venue", visitors: "2.8k", image: "https://images.unsplash.com/photo-1464808322410-1a934aab61e5?w=400&h=500&fit=crop", flag: "🏰", rating: "4.8" },
];

const FeaturesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const animRef = useRef<gsap.core.Tween | null>(null);

  // Heading animation
  useEffect(() => {
    if (!headingRef.current) return;
    const els = headingRef.current.querySelectorAll('.gsap-el');
    gsap.fromTo(els, { y: 30, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out',
      scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
    });
  }, []);

  // Infinite scroll marquee
  useEffect(() => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    // Total width of one set
    const setWidth = destinations.length * 228; // 220px card + 8px gap

    animRef.current = gsap.to(track, {
      x: -setWidth,
      duration: 40,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % setWidth),
      },
    });

    return () => { animRef.current?.kill(); };
  }, []);

  const handleMouseEnter = useCallback((i: number) => {
    setHoveredIndex(i);
    animRef.current?.pause();
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredIndex(null);
    animRef.current?.resume();
  }, []);

  // Double the items for seamless loop
  const doubledDestinations = [...destinations, ...destinations];

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden bg-secondary dark:bg-background">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div ref={headingRef} className="text-center mb-14">
          <span className="gsap-el inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-4 py-1.5 rounded-full mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Discover Venues
          </span>
          <h2 className="gsap-el text-3xl md:text-5xl font-bold mt-3 mb-4 text-foreground">
            Find the perfect venue for every event
          </h2>
          <p className="gsap-el text-sm md:text-base max-w-xl mx-auto text-muted-foreground">
            Browse curated venues and event spaces trusted by thousands of planners worldwide.
          </p>
        </div>
      </div>

      {/* Marquee track */}
      <div className="relative overflow-hidden">
        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-secondary dark:from-background to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-secondary dark:from-background to-transparent pointer-events-none" />

        <div ref={trackRef} className="flex gap-2 will-change-transform" style={{ width: 'max-content' }}>
          {doubledDestinations.map((dest, i) => {
            const isHovered = hoveredIndex === i;
            return (
              <div
                key={i}
                className="flex-shrink-0 cursor-pointer"
                onMouseEnter={() => handleMouseEnter(i)}
                onMouseLeave={handleMouseLeave}
                style={{ width: '220px' }}
              >
                <div className={`w-[220px] h-[300px] rounded-[18px] overflow-hidden relative group transition-all duration-500 ${isHovered ? 'scale-105 shadow-elevated' : ''}`}
                  style={{ boxShadow: isHovered ? '0 20px 40px hsl(var(--foreground) / 0.15)' : '0 8px 20px hsl(var(--foreground) / 0.06)' }}>
                  <img src={dest.image} alt={dest.city} className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : ''}`} loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Heart className="w-4 h-4 text-white/80 hover:text-red-400 transition-colors cursor-pointer" />
                  </div>
                  <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/90 dark:bg-black/50 flex items-center justify-center text-sm shadow-lg backdrop-blur-sm">
                    {dest.flag}
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-3.5">
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400" />
                      <span className="text-[10px] text-white/90 font-medium">{dest.rating}</span>
                    </div>
                    <h3 className="text-white font-bold text-xs leading-tight">{dest.city}</h3>
                    <div className="flex items-center justify-between mt-0.5">
                      <span className="text-white/60 text-[10px]">{dest.country}</span>
                      <span className="text-white/50 text-[9px] flex items-center gap-0.5">
                        <Users className="w-2 h-2" /> {dest.visitors}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;