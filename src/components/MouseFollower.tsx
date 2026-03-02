import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const MouseFollower = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const move = (e: MouseEvent) => {
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1, ease: 'power2.out' });
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.3, ease: 'power2.out' });
    };

    const grow = () => gsap.to(ring, { scale: 1.8, opacity: 0.15, duration: 0.3 });
    const shrink = () => gsap.to(ring, { scale: 1, opacity: 0.3, duration: 0.3 });

    window.addEventListener('mousemove', move);
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', grow);
      el.addEventListener('mouseleave', shrink);
    });

    return () => {
      window.removeEventListener('mousemove', move);
      document.querySelectorAll('a, button').forEach(el => {
        el.removeEventListener('mouseenter', grow);
        el.removeEventListener('mouseleave', shrink);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-primary pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden lg:block"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-primary/30 pointer-events-none z-[9997] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden lg:block"
        style={{ opacity: 0.3 }}
      />
    </>
  );
};

export default MouseFollower;
