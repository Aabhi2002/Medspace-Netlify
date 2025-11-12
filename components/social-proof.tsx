"use client"

import { useEffect, useState, useRef } from "react"

interface StatCard {
  label: string
  value: number
  suffix: string
}

const stats: StatCard[] = [
  { label: "Active Doctors", value: 500, suffix: "+" },
  { label: "OPD Slots", value: 10000, suffix: "+" },
  { label: "Patient Visits", value: 50000, suffix: "+" },
  { label: "Cities", value: 15, suffix: "+" },
]

const Counter = ({ end, suffix }: { end: number; suffix: string }) => {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true
        let current = 0
        const increment = end / 50
        const interval = setInterval(() => {
          current += increment
          if (current >= end) {
            setCount(end)
            clearInterval(interval)
          } else {
            setCount(Math.floor(current))
          }
        }, 20)
      }
    })

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end])

  return (
    <div ref={ref} className="text-5xl font-bold text-[#2a319b]">
      {count}
      {suffix}
    </div>
  )
}

export function SocialProof() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#E6F9FA] to-[#F1FAFB]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              style={{
                boxShadow: "0 4px 15px rgba(0,168,184,0.1)",
              }}
            >
              <p className="text-sm font-medium text-gray-500 mb-3">{stat.label}</p>
              <Counter end={stat.value} suffix={stat.suffix} />
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute -top-8 -left-6 text-9xl text-[#00a8b8] opacity-10 font-serif" aria-hidden="true">
            ❝
          </div>
          <div className="relative bg-white/70 backdrop-blur-md rounded-2xl p-12 border border-white/50 shadow-xl">
            <p className="text-lg text-gray-700 text-center mb-6">
              "MedSpaces transformed how I practice medicine. No more rent worries, dedicated support, and I focus
              entirely on patient care. Best decision I made."
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2a319b] to-[#00a8b8] flex items-center justify-center text-white text-lg font-bold">
                DR
              </div>
              <div className="text-center">
                <p className="font-semibold text-gray-900">Dr. Sunil Reddy</p>
                <p className="text-sm text-gray-600">General Physician, Hyderabad</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
