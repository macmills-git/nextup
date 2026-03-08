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
          <stop offset="0%" stopColor="hsl(12, 76%, 61%)" />
          <stop offset="100%" stopColor="hsl(12, 60%, 45%)" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default AnimatedLogo;
