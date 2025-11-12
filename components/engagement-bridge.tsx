"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Lightbulb, ChevronDown } from "lucide-react"

export function EngagementBridge() {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("engagement-bridge")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("engagement-bridge")
      if (element) {
        const rect = element.getBoundingClientRect()
        const visible = rect.top < window.innerHeight && rect.bottom > 0
        if (visible) {
          const progress = 1 - rect.top / window.innerHeight
          setScrollProgress(Math.max(0, Math.min(1, progress)))
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleScrollClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const nextSection = document.getElementById("next-section")
    if (nextSection) {
      const button = e.currentTarget as HTMLElement
      if (button) {
        const ripple = document.createElement("div")
        ripple.className = "absolute rounded-full"
        ripple.style.cssText = `
          width: 40px;
          height: 40px;
          background: rgba(0, 168, 184, 0.3);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: ripple-expand 0.8s ease-out;
          pointer-events: none;
        `
        button.appendChild(ripple)
        setTimeout(() => ripple.remove(), 800)
      }
      nextSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="engagement-bridge"
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-cyan-50/40 to-white overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(0, 168, 184, 0.08) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Did You Know? Highlight Bar - Enhanced visibility */}
        <div
          className={`mb-16 transition-all duration-700 transform ${
            isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95"
          }`}
          style={{
            background: "rgba(0, 168, 184, 0.12)",
            borderRadius: "20px",
            padding: "28px 36px",
            boxShadow: "0 8px 32px rgba(0, 168, 184, 0.15), inset 0 1px 2px rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(0, 168, 184, 0.2)",
          }}
        >
          <div className="flex items-start gap-5">
            {/* Pulsing glow bulb icon */}
            <div
              className="flex-shrink-0 mt-1.5 relative"
              style={{
                animation: "pulse-glow-enhanced 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
              }}
            >
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(0, 168, 184, 0.4) 0%, transparent 70%)",
                  animation: "pulse-ring 2.5s ease-out infinite",
                }}
              />
              <Lightbulb className="w-7 h-7 text-cyan-600 relative z-10" strokeWidth={1.5} />
            </div>

            <div className="flex-1">
              <h3
                className="font-semibold text-slate-900 mb-1.5"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "1.05rem",
                }}
              >
                Did You Know?
              </h3>
              <p className="text-slate-700 text-base leading-relaxed font-medium">
                Over 200+ doctors already consult through MedSpaces every week.
              </p>

              {/* Animated progress bar with shimmer */}
              <div className="mt-4 h-1.5 bg-gradient-to-r from-cyan-200 via-cyan-400 to-cyan-300 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-transparent via-white to-transparent"
                  style={{
                    width: isVisible ? "100%" : "0%",
                    transition: "width 3.5s cubic-bezier(0.4, 0, 0.2, 1)",
                    animation: "shimmer 2s infinite",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Cue Zone - Enhanced interactivity */}
        <div className="flex flex-col items-center gap-4 pt-12">
          <p
            className="text-sm font-medium text-slate-600 opacity-100 transition-opacity duration-500"
            style={{
              animation: `fade-in-text ${isVisible ? "0.8s" : "1.5s"} ease-out`,
            }}
          >
            Scroll to see how it works
          </p>

          <button
            onClick={handleScrollClick}
            className="relative group focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 rounded-full transition-transform hover:scale-110"
            aria-label="Scroll to next section"
            style={{
              animation: `bounce-pulse ${isVisible ? "1.5s" : "2s"} ease-in-out infinite`,
            }}
          >
            {/* Outer glow ring */}
            <div
              className="absolute inset-0 rounded-full border-2 border-cyan-500 transition-all duration-300"
              style={{
                boxShadow: "0 0 0 2px rgba(0, 168, 184, 0.1)",
                transform: scrollProgress > 0 ? "scale(1.1)" : "scale(1)",
              }}
            />

            {/* Main button */}
            <div className="w-12 h-12 rounded-full border-2 border-cyan-500 flex items-center justify-center bg-gradient-to-b from-cyan-50 to-white transition-all group-hover:shadow-xl group-hover:border-cyan-400">
              <ChevronDown
                className="w-6 h-6 text-cyan-600 transition-transform group-hover:translate-y-1"
                strokeWidth={2.5}
              />
            </div>

            {/* Ripple effect container */}
            <div className="absolute inset-0" />
          </button>

          {/* Floating indicator dots */}
          <div className="flex gap-2 mt-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-1.5 rounded-full bg-cyan-300"
                style={{
                  width: i === 1 ? "24px" : "6px",
                  opacity: i === 1 ? 1 : 0.4,
                  transition: "all 0.3s ease",
                  animation: `pulse-dot ${1.5 + i * 0.2}s ease-in-out infinite`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-glow-enhanced {
          0%, 100% {
            opacity: 0.7;
            filter: drop-shadow(0 0 4px rgba(0, 168, 184, 0.2));
          }
          50% {
            opacity: 1;
            filter: drop-shadow(0 0 12px rgba(0, 168, 184, 0.6));
          }
        }

        @keyframes pulse-ring {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          100% {
            transform: scale(1.4);
            opacity: 0;
          }
        }

        @keyframes bounce-arrow {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(6px);
          }
        }

        @keyframes bounce-pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes fade-in-text {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes ripple-expand {
          0% {
            width: 40px;
            height: 40px;
            opacity: 1;
          }
          100% {
            width: 100px;
            height: 100px;
            opacity: 0;
          }
        }

        @keyframes pulse-dot {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.3);
          }
        }

        button:hover {
          box-shadow: 0 12px 24px rgba(0, 168, 184, 0.25) !important;
        }

        button:active {
          transform: scale(0.95) !important;
        }
      `}</style>
    </section>
  )
}
