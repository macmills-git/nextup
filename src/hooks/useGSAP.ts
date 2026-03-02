import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

// Fade in from bottom
export const useScrollFadeIn = (options?: { delay?: number; y?: number; duration?: number; stagger?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const children = ref.current.querySelectorAll('.gsap-fade-in');
    const targets = children.length > 0 ? children : ref.current;
    gsap.fromTo(targets, {
      y: options?.y ?? 60,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      duration: options?.duration ?? 0.8,
      delay: options?.delay ?? 0,
      stagger: options?.stagger ?? 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });
    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);
  return ref;
};

// Scale in effect
export const useScrollScale = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current, { scale: 0.85, opacity: 0 }, {
      scale: 1, opacity: 1, duration: 1, ease: 'power2.out',
      scrollTrigger: { trigger: ref.current, start: 'top 85%', toggleActions: 'play none none reverse' },
    });
    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);
  return ref;
};

// Parallax effect
export const useParallax = (speed: number = 0.3) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      yPercent: speed * 100,
      ease: 'none',
      scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true },
    });
    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);
  return ref;
};

// Stagger children
export const useStaggerIn = (selector: string = '.stagger-item', options?: { delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const items = ref.current.querySelectorAll(selector);
    gsap.fromTo(items, { y: 40, opacity: 0, scale: 0.95 }, {
      y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1,
      delay: options?.delay ?? 0,
      ease: 'back.out(1.4)',
      scrollTrigger: { trigger: ref.current, start: 'top 80%', toggleActions: 'play none none reverse' },
    });
    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);
  return ref;
};

// Count up animation
export const useCountUp = (end: number, duration: number = 2) => {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: end, duration, ease: 'power1.out',
      scrollTrigger: { trigger: ref.current, start: 'top 90%', toggleActions: 'play none none reset' },
      onUpdate: () => {
        if (ref.current) ref.current.textContent = Math.round(obj.val).toLocaleString();
      },
    });
    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, [end, duration]);
  return ref;
};

// Magnetic button effect
export const useMagnetic = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const move = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: 'power2.out' });
    };
    const reset = () => { gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' }); };
    el.addEventListener('mousemove', move);
    el.addEventListener('mouseleave', reset);
    return () => { el.removeEventListener('mousemove', move); el.removeEventListener('mouseleave', reset); };
  }, []);
  return ref;
};

// Text reveal line-by-line
export const useTextReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const lines = ref.current.querySelectorAll('.reveal-line');
    gsap.fromTo(lines, { y: '100%', opacity: 0 }, {
      y: '0%', opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out',
      scrollTrigger: { trigger: ref.current, start: 'top 80%', toggleActions: 'play none none reverse' },
    });
    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);
  return ref;
};

// 3D tilt on hover
export const useTilt3D = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const move = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(el, {
        rotateX: -y * 15, rotateY: x * 15, transformPerspective: 600,
        duration: 0.3, ease: 'power2.out',
      });
    };
    const reset = () => { gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.5, ease: 'power2.out' }); };
    el.addEventListener('mousemove', move);
    el.addEventListener('mouseleave', reset);
    return () => { el.removeEventListener('mousemove', move); el.removeEventListener('mouseleave', reset); };
  }, []);
  return ref;
};

// Progress bar animation
export const useProgressBar = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const bars = ref.current.querySelectorAll('.progress-fill');
    gsap.fromTo(bars, { scaleX: 0, transformOrigin: 'left center' }, {
      scaleX: 1, duration: 1.2, stagger: 0.2, ease: 'power2.out',
      scrollTrigger: { trigger: ref.current, start: 'top 80%', toggleActions: 'play none none reverse' },
    });
    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);
  return ref;
};
