import { useEffect, useRef, useState } from "react";
import { MapPin, Star, Users, Heart, ArrowRight, Calendar, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const destinations = [
  { city: "Grand Ballroom", country: "Wedding Venue", visitors: "4.2k", image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&h=800&fit=crop", flag: "🏛️", rating: "4.9" },
  { city: "Sky Conference", country: "Corporate Center", visitors: "3.8k", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=800&fit=crop", flag: "🏢", rating: "4.8" },
  { city: "Garden Estate", country: "Outdoor Venue", visitors: "5.1k", image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&h=800&fit=crop", flag: "🌿", rating: "4.9" },
  { city: "The Loft NYC", country: "Social Events", visitors: "2.9k", image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=600&h=800&fit=crop", flag: "🎉", rating: "4.7" },
  { city: "Coastal Resort", country: "Beach Venue", visitors: "6.3k", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=800&fit=crop", flag: "🏖️", rating: "5.0" },
  { city: "Mountain Lodge", country: "Retreat Venue", visitors: "3.2k", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=800&fit=crop", flag: "🏔️", rating: "4.8" },
  { city: "Art Gallery", country: "Exhibition Space", visitors: "4.5k", image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=800&fit=crop", flag: "🎨", rating: "4.6" },
  { city: "Rooftop Terrace", country: "City Views", visitors: "7.1k", image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&h=800&fit=crop", flag: "🌃", rating: "4.9" },
];

const FeaturesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasExpanded, setHasExpanded] = useState(false);

  // Heading scroll animation
  useEffect(() => {
    if (!headingRef.current) return;
    const els = headingRef.current.querySelectorAll('.gsap-el');
    gsap.fromTo(els, { y: 50, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out',
      scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
    });
  }, []);

  // Stacked cards fan-out on scroll
  useEffect(() => {
    if (!stackRef.current || !sectionRef.current) return;
    const cards = stackRef.current.querySelectorAll('.venue-card');

    // Start stacked
    gsap.set(cards, (i: number) => ({
      x: 0,
      y: i * 4,
      rotation: (i - Math.floor(cards.length / 2)) * 1.5,
      scale: 1 - i * 0.02,
      zIndex: cards.length - i,
      opacity: i < 5 ? 1 : 0.5,
    }));

    // Fan out on scroll
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 60%',
      onEnter: () => {
        if (hasExpanded) return;
        setHasExpanded(true);
        const total = cards.length;
        const cardW = 200;
        const gap = 30;
        gsap.to(cards, {
          x: (i: number) => (i - Math.floor(total / 2)) * (cardW + gap),
          y: 0,
          rotation: 0,
          scale: 1,
          opacity: 1,
          duration: 1.2,
          stagger: 0.08,
          ease: 'power3.out',
          onComplete: () => {
            // Start auto-shuffle
            startShuffle();
          },
        });
      },
    });

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, [hasExpanded]);

  const startShuffle = () => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % destinations.length);
    }, 3000);
    return () => clearInterval(interval);
  };

  // Animate active card change
  useEffect(() => {
    if (!stackRef.current || !hasExpanded) return;
    const cards = stackRef.current.querySelectorAll('.venue-card');
    const total = cards.length;
    const cardW = 200;
    const gap = 30;

    cards.forEach((card, i) => {
      const offset = ((i - activeIndex + total) % total);
      const centered = offset - Math.floor(total / 2);
      const isActive = offset === 0;

      gsap.to(card, {
        x: centered * (cardW + gap),
        scale: isActive ? 1.08 : 0.92 - Math.abs(centered) * 0.02,
        opacity: Math.abs(centered) > 3 ? 0.3 : 1,
        zIndex: isActive ? 20 : 10 - Math.abs(centered),
        y: isActive ? -12 : 0,
        duration: 0.8,
        ease: 'power2.out',
      });
    });
  }, [activeIndex, hasExpanded]);

  return (
    <section ref={sectionRef} className="py-28 relative overflow-hidden bg-secondary dark:bg-background">
      {/* Background gradient mesh */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.04]" style={{
          background: 'radial-gradient(circle, hsl(225, 90%, 60%), transparent)',
          animation: 'floatY 8s ease-in-out infinite',
        }} />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full opacity-[0.04]" style={{
          background: 'radial-gradient(circle, hsl(280, 70%, 60%), transparent)',
          animation: 'floatY 10s ease-in-out infinite 3s',
        }} />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-20">
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

        {/* Stacked → Fan-out Cards */}
        <div className="relative flex items-center justify-center min-h-[480px] overflow-hidden">
          <div ref={stackRef} className="relative flex items-center justify-center" style={{ perspective: '1200px' }}>
            {destinations.map((dest, i) => (
              <div
                key={i}
                className="venue-card absolute cursor-pointer"
                onClick={() => setActiveIndex(i)}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="w-[200px] h-[300px] md:w-[220px] md:h-[340px] rounded-[20px] overflow-hidden relative group transition-shadow duration-300" style={{
                  boxShadow: '0 15px 40px hsl(var(--foreground) / 0.12)',
                }}>
                  <img src={dest.image} alt={dest.city} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {/* Top icons */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Heart className="w-5 h-5 text-white/80 hover:text-red-400 transition-colors cursor-pointer drop-shadow-lg" />
                  </div>
                  <div className="absolute top-3 left-3 w-9 h-9 rounded-full bg-white/90 dark:bg-black/50 flex items-center justify-center text-base shadow-lg backdrop-blur-sm">
                    {dest.flag}
                  </div>

                  {/* Bottom info */}
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
                    <div className="flex gap-1 mt-2">
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-white/20 text-white/90 backdrop-blur-sm">Popular</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-10">
          {destinations.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
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
