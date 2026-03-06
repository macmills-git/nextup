import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const trustedLogos = [
  { name: "Aceternity UI", icon: "◆" },
  { name: "Gamity", icon: "●" },
  { name: "Host IT", icon: "◎" },
  { name: "Asteroid Kit", icon: "▲" },
  { name: "PlanPro", icon: "⬡" },
];

const DashboardShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const els = sectionRef.current.querySelectorAll('.trust-el');
    gsap.fromTo(els, { y: 30, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
    });
  }, []);

  // Sparkle particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number; decay: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };
    resize();
    window.addEventListener('resize', resize);

    const spawn = () => {
      if (particles.length < 60) {
        particles.push({
          x: Math.random() * canvas.offsetWidth,
          y: Math.random() * canvas.offsetHeight,
          vx: (Math.random() - 0.5) * 0.3,
          vy: -Math.random() * 0.5 - 0.1,
          size: Math.random() * 1.5 + 0.5,
          alpha: Math.random() * 0.6 + 0.2,
          decay: Math.random() * 0.003 + 0.001,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      spawn();
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        if (p.alpha <= 0) { particles.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(225, 90%, 70%, ${p.alpha})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-background relative overflow-hidden">
      {/* Sparkle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

      <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
        <h2 className="trust-el text-3xl md:text-4xl font-bold mb-3" style={{
          backgroundImage: 'linear-gradient(180deg, hsl(var(--foreground)), hsl(var(--muted-foreground)))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Trusted by Industry Leaders
        </h2>
        <p className="trust-el text-sm text-muted-foreground max-w-lg mx-auto mb-12">
          Join the ranks of forward-thinking companies already leveraging our AI technology
        </p>
        <div className="trust-el flex items-center justify-center gap-10 md:gap-16 flex-wrap">
          {trustedLogos.map((logo, i) => (
            <div key={i} className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity duration-300">
              <span className="text-xl text-foreground">{logo.icon}</span>
              <span className="text-sm font-semibold text-foreground tracking-tight">{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DashboardShowcase;
