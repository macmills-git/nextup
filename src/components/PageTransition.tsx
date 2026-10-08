import { useEffect, useRef, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';

const PageTransition = ({ children }: { children: ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    if (!ref.current) return;
    try {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }
      );
    } catch {
      if (ref.current) ref.current.style.opacity = '1';
    }
  }, [pathname]);

  return <div ref={ref} key={pathname} className="w-full">{children}</div>;
};

export default PageTransition;
