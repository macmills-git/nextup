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
  const carouselRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Heading scroll animation
  useEffect(() => {
    if (!headingRef.current) return;
    const els = headingRef.current.querySelectorAll('.gsap-el');
    gsap.fromTo(els, { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power2.out',
      scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
    });
    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  // Simple carousel auto-advance - very slow
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % destinations.length);
    }, 5000); // 5 seconds between transitions
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  // Smooth scroll carousel position
  useEffect(() => {
    if (!carouselRef.current) return;
    const cards = carouselRef.current.querySelectorAll('.venue-card');
    const total = destinations.length;

    cards.forEach((card, i) => {
      const offset = ((i - activeIndex + total) % total);
      const centered = offset - Math.floor(total / 2);
      const isActive = offset === 0;
      const absPos = Math.abs(centered);

      gsap.to(card, {
        x: centered * 240,
        scale: isActive ? 1.05 : Math.max(0.75, 1 - absPos * 0.06),
        opacity: absPos > 3 ? 0 : Math.max(0.3, 1 - absPos * 0.2),
        zIndex: isActive ? 20 : 10 - absPos,
        y: isActive ? -8 : 0,
        duration: 1.5, // Very slow, smooth
        ease: 'power2.inOut',
      });
    });
  }, [activeIndex]);

  return (
    <section ref={sectionRef} className="py-28 relative overflow-hidden bg-secondary dark:bg-background">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
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

        {/* Carousel */}
        <div className="relative flex items-center justify-center h-[400px] overflow-hidden">
          <div ref={carouselRef} className="relative flex items-center justify-center w-full h-full">
            {destinations.map((dest, i) => (
              <div
                key={i}
                className="venue-card absolute cursor-pointer"
                onClick={() => setActiveIndex(i)}
              >
                <div className="w-[200px] h-[300px] md:w-[210px] md:h-[320px] rounded-[20px] overflow-hidden relative group transition-shadow duration-500"
                  style={{ boxShadow: '0 12px 30px hsl(var(--foreground) / 0.1)' }}>
                  <img src={dest.image} alt={dest.city} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Heart className="w-5 h-5 text-white/80 hover:text-red-400 transition-colors cursor-pointer" />
                  </div>
                  <div className="absolute top-3 left-3 w-9 h-9 rounded-full bg-white/90 dark:bg-black/50 flex items-center justify-center text-base shadow-lg backdrop-blur-sm">
                    {dest.flag}
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      <span className="text-[11px] text-white/90 font-medium">{dest.rating}</span>
                    </div>
                    <h3 className="text-white font-bold text-sm leading-tight">{dest.city}</h3>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-white/60 text-[11px]">{dest.country}</span>
                      <span className="text-white/50 text-[10px] flex items-center gap-0.5">
                        <Users className="w-2.5 h-2.5" /> {dest.visitors}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {destinations.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-700 ${
                i === activeIndex ? 'bg-primary w-8' : 'bg-muted-foreground/30 w-1.5'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
