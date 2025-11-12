"use client"

import { Building2, Users2, Zap, Globe } from "lucide-react"
import { useEffect, useRef } from "react"

const badges = [
  { icon: Building2, label: "Zero CapEx" },
  { icon: Users2, label: "Concierge Included" },
  { icon: Zap, label: "PMS + CRM" },
  { icon: Globe, label: "Nushift Community" },
]

export function TrustBadges() {
  const badgesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const elements = badgesRef.current?.querySelectorAll("[data-badge]")
    if (!elements) return

    elements.forEach((el, index) => {
      el.classList.add("animate-fade-in-up")
      ;(el as HTMLElement).style.animationDelay = `${index * 100}ms`
    })
  }, [])

  return (
    <div ref={badgesRef} className="flex flex-wrap justify-center items-center gap-8">
      {badges.map((badge, index) => {
        const Icon = badge.icon
        return (
          <div
            key={index}
            data-badge
            className="px-5 py-4 rounded-2xl bg-white/50 backdrop-blur-lg border border-white/70 hover:bg-white/70 hover:scale-105 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group relative overflow-hidden"
            style={{
              boxShadow: "0 4px 15px rgba(0, 168, 184, 0.1)",
            }}
          >
            {/* Subtle gradient overlay on hover */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: "linear-gradient(135deg, rgba(0, 168, 184, 0.08), rgba(0, 168, 184, 0.04))"
              }}
            />
            
            <div className="flex flex-col items-center gap-2.5 relative z-10">
              {/* Icon with subtle container */}
              <div 
                className="flex items-center justify-center w-9 h-9 rounded-xl group-hover:scale-105 transition-transform duration-300"
                style={{
                  background: "linear-gradient(135deg, rgba(0, 168, 184, 0.12), rgba(0, 168, 184, 0.06))",
                  border: "1px solid rgba(0, 168, 184, 0.2)"
                }}
              >
                <Icon className="w-5 h-5 text-teal-600 group-hover:text-teal-700 transition-colors duration-300" />
              </div>
              
              {/* Enhanced text */}
              <span className="text-xs font-semibold text-gray-800 whitespace-nowrap group-hover:text-gray-900 transition-colors duration-300">
                {badge.label}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
