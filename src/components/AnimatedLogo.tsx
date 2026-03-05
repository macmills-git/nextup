import { useEffect, useRef } from 'react';

const AnimatedLogo = ({ size = 28, className = '' }: { size?: number; className?: string }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className} fill="none">
      {/* Outer ring */}
      <circle cx="20" cy="20" r="17" stroke="url(#logoGrad2)" strokeWidth="2" fill="none" opacity="0.3" />
      {/* Inner hexagon */}
      <path
        d="M20 6L32 13V27L20 34L8 27V13L20 6Z"
        stroke="url(#logoGrad2)"
        strokeWidth="2"
        fill="url(#logoGrad2)"
        fillOpacity="0.1"
      />
      {/* E letter */}
      <path
        d="M14 14H26M14 20H24M14 26H26M14 14V26"
        stroke="url(#logoGrad2)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Dot accent */}
      <circle cx="27" cy="14" r="2" fill="hsl(225, 90%, 60%)" />
      <defs>
        <linearGradient id="logoGrad2" x1="0" y1="0" x2="40" y2="40">
          <stop offset="0%" stopColor="hsl(225, 90%, 60%)" />
          <stop offset="100%" stopColor="hsl(260, 80%, 65%)" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default AnimatedLogo;