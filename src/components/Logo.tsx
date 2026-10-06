import React from "react";
import logoDarkImg from "@/Gemini_Generated_Image_60wrp760wrp760wr.jpg";
import logoLightImg from "@/Gemini_Generated_Image_i9qwssi9qwssi9qw.jpg";

interface LogoProps {
  variant?: "dark" | "light";
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  className?: string;
  textClassName?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = "dark",
  size = "md",
  showText = true,
  className = "",
  textClassName = "",
}) => {
  // logoDarkImg: Black logo on light background
  // logoLightImg: White logo on dark background
  const imgSrc = variant === "light" ? logoLightImg : logoDarkImg;

  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
    xl: "w-14 h-14",
  };

  const textSizeClasses = {
    sm: "text-base",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-3xl",
  };

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <img
        src={imgSrc}
        alt="NextUp Logo"
        className={`${sizeClasses[size]} rounded-full object-cover shadow-xs border border-stone-200/60`}
      />
      {showText && (
        <span
          className={`${textSizeClasses[size]} font-bold tracking-tight ${
            variant === "light" ? "text-white" : "text-black"
          } ${textClassName}`}
        >
          NextUp<span className="text-primary font-black">.</span>
        </span>
      )}
    </div>
  );
};

export default Logo;
