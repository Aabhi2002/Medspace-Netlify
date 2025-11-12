"use client"

import { useEffect, useRef } from "react"

export function WaveDivider() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (svgRef.current) {
        const scrollY = window.scrollY
        svgRef.current.style.transform = `translateY(${scrollY * 0.2}px)`
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="relative w-full bg-white overflow-hidden">
      {/* Gradient shadow layer for depth - enhanced visibility */}
      <div
        className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(0, 168, 184, 0.12))",
        }}
      />

      {/* Faint shadow wave layer for depth */}
      <svg
        className="absolute w-full h-48"
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
        style={{ filter: "blur(12px)", opacity: 0.15 }}
      >
        <defs>
          <linearGradient id="shadowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00A8B8" />
            <stop offset="50%" stopColor="#00B4D8" />
            <stop offset="100%" stopColor="#E6F9FA" />
          </linearGradient>
        </defs>
        <path d="M0,80 Q300,40 600,80 T1200,80 L1200,200 L0,200 Z" fill="url(#shadowGradient)" />
      </svg>

      {/* Main wave layer with enhanced animation */}
      <svg
        ref={svgRef}
        className="absolute w-full h-48"
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
        style={{
          animation: "wave-morph-enhanced 8s ease-in-out infinite",
        }}
      >
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E6F9FA" />
            <stop offset="50%" stopColor="#CFF9FF" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>
          <filter id="waveGlow">
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>
        <path
          d="M0,100 Q300,50 600,100 T1200,100 L1200,200 L0,200 Z"
          fill="url(#waveGradient)"
          filter="url(#waveGlow)"
        />
      </svg>

      {/* Floating particle elements for depth - more visible */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${4 + i * 1.5}px`,
              height: `${4 + i * 1.5}px`,
              background: `rgba(0, 168, 184, ${0.15 + i * 0.05})`,
              filter: "blur(1.5px)",
              left: `${10 + i * 15}%`,
              bottom: `${20 + i * 8}px`,
              animation: `float-up-smooth ${4 + i * 0.5}s ease-in-out infinite`,
              boxShadow: `0 0 ${4 + i}px rgba(0, 168, 184, 0.3)`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes wave-morph-enhanced {
          0%, 100% {
            transform: translateX(0px) scaleY(1);
          }
          20% {
            transform: translateX(8px) scaleY(1.02);
          }
          40% {
            transform: translateX(-8px) scaleY(0.98);
          }
          60% {
            transform: translateX(8px) scaleY(1.02);
          }
          80% {
            transform: translateX(-8px) scaleY(0.98);
          }
        }

        @keyframes float-up-smooth {
          0% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.1;
          }
          25% {
            opacity: 0.25;
          }
          50% {
            transform: translateY(-60px) translateX(5px);
            opacity: 0.3;
          }
          75% {
            opacity: 0.15;
          }
          100% {
            transform: translateY(-120px) translateX(-8px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
