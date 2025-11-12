"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"

export interface InfiniteMovingCardsProps {
  items: {
    name: string
    icon: string
    logo?: string
    color: string
  }[]
  direction?: "left" | "right"
  speed?: "slow" | "normal" | "fast"
  pauseOnHover?: boolean
  className?: string
}

const speedConfig = {
  slow: 40,
  normal: 20,
  fast: 10,
}

export function InfiniteMovingCards({
  items,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className = "",
}: InfiniteMovingCardsProps) {
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const scrollerRef = React.useRef<HTMLDivElement>(null)

  useEffect(() => {
    addAnimation()
  }, [])

  const addAnimation = () => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children)

      scrollerContent.forEach((child) => {
        const duplicatedChild = child.cloneNode(true)
        scrollerRef.current?.appendChild(duplicatedChild)
      })

      getDirection()
      getSpeed()
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty("--animation-direction", "forwards")
      } else {
        containerRef.current.style.setProperty("--animation-direction", "reverse")
      }
    }
  }

  const getSpeed = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty("--animation-duration", `${speedConfig[speed]}s`)
    }
  }

  return (
    <div
      ref={containerRef}
      className={`scroller relative w-full overflow-hidden ${className}`}
      onMouseEnter={() => pauseOnHover && setIsHovered(true)}
      onMouseLeave={() => pauseOnHover && setIsHovered(false)}
      style={
        {
          "--animation-duration": `${speedConfig[speed]}s`,
          "--animation-direction": direction === "left" ? "forwards" : "reverse",
        } as React.CSSProperties
      }
    >
      <style>{`
        @keyframes scroll {
          to {
            transform: translate(calc(-50% - 0.5rem));
          }
        }
        .scroller__inner {
          animation: scroll ${speedConfig[speed]}s linear infinite;
          animation-direction: ${direction === "left" ? "forwards" : "reverse"};
          animation-play-state: ${isHovered && pauseOnHover ? "paused" : "running"};
        }
      `}</style>
      <div ref={scrollerRef} className="scroller__inner flex gap-6 w-max py-4">
        {items.map((item, idx) => (
          <div key={idx} className="flex-shrink-0 group cursor-pointer">
            <div
              className="px-8 py-5 rounded-2xl font-semibold transition-all duration-500 hover:shadow-xl border-2 flex items-center justify-center gap-3 group-hover:scale-105 group-hover:-translate-y-1 relative overflow-hidden"
              style={{
                backgroundColor: item.color,
                borderColor: "var(--accent-teal)",
                minWidth: "220px",
                color: "var(--text-dark)",
                boxShadow: "0 4px 15px rgba(0, 168, 184, 0.1)",
              }}
            >
              {/* Subtle gradient overlay on hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "linear-gradient(135deg, rgba(0, 168, 184, 0.1), rgba(0, 168, 184, 0.05))"
                }}
              />
              
              {/* Icon container with enhanced styling */}
              <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-xl group-hover:scale-110 transition-transform duration-300"
                style={{
                  background: "linear-gradient(135deg, rgba(0, 168, 184, 0.15), rgba(0, 168, 184, 0.08))",
                  border: "1px solid rgba(0, 168, 184, 0.2)"
                }}
              >
                {item.logo ? (
                  <Image
                    src={item.logo}
                    alt={item.name}
                    width={24}
                    height={24}
                    className="w-6 h-6 object-contain"
                  />
                ) : (
                  <span className="text-xl">{item.icon}</span>
                )}
              </div>
              
              {/* Text with enhanced typography */}
              <span className="relative z-10 text-base font-bold tracking-wide">{item.name}</span>
              
              {/* Subtle shine effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
