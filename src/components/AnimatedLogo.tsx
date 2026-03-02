import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const AnimatedLogo = ({ size = 28, className = '' }: { size?: number; className?: string }) => {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const paths = ref.current.querySelectorAll('.logo-path');
    const glow = ref.current.querySelector('.logo-glow');
    
    gsap.fromTo(paths, { strokeDashoffset: 100 }, {
      strokeDashoffset: 0, duration: 1.5, stagger: 0.2, ease: 'power2.out',
    });
    
    if (glow) {
      gsap.to(glow, {
        opacity: 0.6, scale: 1.2, duration: 2, repeat: -1, yoyo: true, ease: 'sine.inOut',
      });
    }
  }, []);

  return (
    <svg ref={ref} width={size} height={size} viewBox="0 0 40 40" className={className} fill="none">
      {/* Glow */}
      <circle className="logo-glow" cx="20" cy="20" r="16" fill="url(#logoGrad)" opacity="0.3" />
      {/* Hexagon frame */}
      <path
        className="logo-path"
        d="M20 4L34 12V28L20 36L6 28V12L20 4Z"
        stroke="url(#logoGrad)"
        strokeWidth="2"
        strokeDasharray="100"
        fill="none"
      />
      {/* E letter */}
      <path
        className="logo-path"
        d="M14 14H26M14 20H24M14 26H26M14 14V26"
        stroke="url(#logoGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="100"
      />
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="40" y2="40">
          <stop offset="0%" stopColor="hsl(225, 90%, 60%)" />
          <stop offset="100%" stopColor="hsl(260, 80%, 65%)" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default AnimatedLogo;
