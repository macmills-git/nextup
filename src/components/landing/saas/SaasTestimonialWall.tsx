import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SaasTestimonialWall = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current.querySelectorAll('.tw-el'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' }
      }
    );
  }, []);

  return (
    <section ref={ref} className="py-24 bg-background" id="testimonials">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Main testimonial - large layout matching reference */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px border border-border/15 rounded-2xl overflow-hidden bg-border/10">
            {/* Left - large photo */}
            <div className="tw-el bg-card aspect-square md:aspect-auto overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=700&fit=crop&crop=face"
                alt="Sarah Chen"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Right - quote + stat */}
            <div className="bg-card flex flex-col">
              <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
                <p className="tw-el text-sm font-bold tracking-[0.2em] text-muted-foreground/60 mb-6">A R C H</p>
                <blockquote className="tw-el text-lg md:text-xl font-medium text-foreground leading-relaxed mb-8">
                  "The automation capabilities are incredible. Our event pipeline went from manual chaos to seamless orchestration. Nested lets us focus on creating experiences instead of managing logistics."
                </blockquote>
                <div className="tw-el">
                  <p className="text-sm font-bold text-foreground">Sarah Chen</p>
                  <p className="text-sm text-muted-foreground">CTO, TechFlow Events</p>
                </div>
              </div>

              {/* Stat block */}
              <div className="tw-el border-t border-border/10 p-8 md:p-10 flex items-end justify-end">
                <div className="text-right">
                  <p className="text-6xl md:text-7xl font-bold text-foreground leading-none">5x</p>
                  <p className="text-sm text-muted-foreground mt-1">Faster Delivery</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SaasTestimonialWall;
