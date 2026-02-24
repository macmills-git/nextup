import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface FontWeightTextProps {
  text: string
  className?: string
  fontSize?: number
  minWeight?: number
  maxWeight?: number
  animationDuration?: number
  delayMultiplier?: number
}

export function FontWeightText({
  text,
  className = "",
  fontSize = 150,
  minWeight = 0,
  maxWeight = 840,
  animationDuration = 1.5,
  delayMultiplier = 0.25,
}: FontWeightTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const spans = containerRef.current.querySelectorAll("span")
    const numLetters = spans.length
    spans.forEach((span, i) => {
      const mappedIndex = i - numLetters / 2
      ;(span as HTMLElement).style.animationDelay = mappedIndex * delayMultiplier + "s"
    })
  }, [text, delayMultiplier])

  const characters = text.split("").map((char, index) => (
    <span
      key={index}
      style={{
        display: "inline-block",
        animation: `breath ${animationDuration}s ease-in-out infinite alternate`,
        fontVariationSettings: `"wght" ${minWeight}`,
        whiteSpace: char === " " ? "pre" : undefined,
      }}
    >
      {char}
    </span>
  ))

  return (
    <div ref={containerRef} className={cn("inline-block", className)}>
      <div style={{ fontSize, lineHeight: 1.1 }}>
        {characters}
        <style>{`
          @keyframes breath {
            0% {
              font-variation-settings: "wght" ${minWeight};
            }
            100% {
              font-variation-settings: "wght" ${maxWeight};
            }
          }
        `}</style>
      </div>
    </div>
  )
}
