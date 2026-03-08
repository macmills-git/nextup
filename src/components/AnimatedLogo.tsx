const AnimatedLogo = ({ size = 28, className = '' }: { size?: number; className?: string }) => {
  const id = `logoGrad_${size}`;
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className} fill="none">
      {/* Diamond shape */}
      <path
        d="M20 4L36 20L20 36L4 20L20 4Z"
        fill={`url(#${id})`}
        fillOpacity="0.15"
        stroke={`url(#${id})`}
        strokeWidth="1.5"
      />
      {/* Inner N letterform */}
      <path
        d="M14 27V13L26 27V13"
        stroke={`url(#${id})`}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="40" y2="40">
          <stop offset="0%" stopColor="hsl(40, 55%, 55%)" />
          <stop offset="50%" stopColor="hsl(35, 45%, 50%)" />
          <stop offset="100%" stopColor="hsl(220, 60%, 25%)" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default AnimatedLogo;
