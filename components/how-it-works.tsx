"use client"

import { useState, useEffect, useRef } from "react"
import { CheckCircle2, MapPin, Settings, Sparkles } from "lucide-react"
import Image from "next/image"

const steps = [
  {
    number: 1,
    title: "Pick Your Slot",
    description: "Browse rooms by location or specialty; choose your preferred 2-hour blocks.",
    icon: MapPin,
  },
  {
    number: 2,
    title: "Onboard in Minutes",
    description: "PMS setup, SEO config, and concierge routing all handled.",
    icon: Settings,
  },
  {
    number: 3,
    title: "Consult & Grow",
    description: "Arrive, consult, and leave — we manage the rest.",
    icon: Sparkles,
  },
]

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const stepObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const dotElement = entry.target.querySelector(".step-dot") as HTMLElement
          if (entry.isIntersecting) {
            if (dotElement) {
              dotElement.classList.add("active")
            }
            const index = stepsRef.current.indexOf(entry.target as HTMLDivElement)
            setActiveStep(index)
          } else {
            if (dotElement) {
              dotElement.classList.remove("active")
            }
          }
        })
      },
      { threshold: 0.6 },
    )

    stepsRef.current.forEach((step) => {
      if (step) stepObserver.observe(step)
    })

    return () => stepObserver.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="how"
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #E6F9FA, #F1FAFB, #FFFFFF)",
      }}
    >
      {/* Floating accent elements */}
      <div
        className="absolute top-20 right-10 w-40 h-40 rounded-full opacity-10 blur-3xl"
        style={{ backgroundColor: "var(--accent-teal)" }}
      />
      <div
        className="absolute bottom-20 left-10 w-32 h-32 rounded-full opacity-10 blur-3xl"
        style={{ backgroundColor: "var(--primary-blue)" }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20 animate-fade-in">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: "var(--text-dark)" }}>
            How It <span style={{ color: "var(--accent-teal)" }}>Works</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--text-light)" }}>
            Experience the smooth progression from booking to thriving — a guided journey designed for your success
          </p>
        </div>

        {/* Timeline Container - Desktop (enhanced) */}
        <div className="relative hidden md:block">
          {/* Enhanced timeline line with gradient */}
          <div
            className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full timeline-line rounded-full"
            style={{
              background: "linear-gradient(180deg, var(--accent-teal), rgba(0, 168, 184, 0.6), var(--accent-teal))",
              boxShadow: `0 0 20px rgba(0,168,184,0.4), inset 0 0 10px rgba(255,255,255,0.3)`,
            }}
          />

          {/* Steps */}
          <div className="space-y-24">
            {steps.map((step, index) => (
              <div
                key={step.number}
                ref={(el) => {
                  stepsRef.current[index] = el
                }}
                className={`timeline-step relative transition-all duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}
                style={{
                  transitionDelay: isVisible ? `${index * 200}ms` : "0ms",
                }}
              >
                {/* Enhanced timeline dot */}
                <div className="flex items-center justify-center absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-0 z-20">
                  <div 
                    className={`step-dot flex items-center justify-center w-16 h-16 rounded-full transition-all duration-500 ${
                      activeStep === index ? 'scale-110' : 'scale-100'
                    }`}
                    style={{
                      background: activeStep === index 
                        ? "linear-gradient(135deg, var(--accent-teal), #0096C7)" 
                        : "linear-gradient(135deg, rgba(0, 168, 184, 0.8), rgba(0, 168, 184, 0.6))",
                      boxShadow: activeStep === index 
                        ? "0 8px 25px rgba(0, 168, 184, 0.4), 0 0 20px rgba(0, 168, 184, 0.6)" 
                        : "0 4px 15px rgba(0, 168, 184, 0.3)",
                      border: "3px solid white",
                    }}
                  >
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Step Content - Alternating sides */}
                <div className={`flex ${index % 2 === 0 ? "flex-row-reverse" : "flex-row"} items-start gap-12`}>
                  <div className="w-1/2" />

                  {/* Enhanced Card */}
                  <div
                    className={`timeline-card w-1/2 transition-all duration-500 ${
                      activeStep === index ? "translate-y-0 opacity-100 scale-105" : "translate-y-4 opacity-90 scale-100"
                    }`}
                  >
                    <div
                      className={`p-8 rounded-3xl border-2 transition-all duration-500 relative overflow-hidden group`}
                      style={{
                        borderColor: activeStep === index ? "var(--accent-teal)" : "rgba(0, 168, 184, 0.2)",
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        backdropFilter: "blur(10px)",
                        boxShadow: activeStep === index 
                          ? "0 12px 35px rgba(0,168,184,0.25), 0 0 20px rgba(0,168,184,0.1)" 
                          : "0 6px 25px rgba(0,0,0,0.08)",
                      }}
                    >
                      {/* Gradient overlay for active step */}
                      {activeStep === index && (
                        <div 
                          className="absolute inset-0 opacity-5"
                          style={{
                            background: "linear-gradient(135deg, var(--accent-teal), rgba(0, 168, 184, 0.3))"
                          }}
                        />
                      )}
                      
                      {/* Subtle shine effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      </div>

                      <div className="flex items-start gap-6 relative z-10">
                        {/* Enhanced number badge */}
                        <div className="flex-shrink-0">
                          <div
                            className={`flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300 ${
                              activeStep === index ? 'scale-110' : 'scale-100'
                            }`}
                            style={{ 
                              background: activeStep === index 
                                ? "linear-gradient(135deg, var(--accent-teal), #0096C7)" 
                                : "linear-gradient(135deg, rgba(0, 168, 184, 0.15), rgba(0, 168, 184, 0.08))",
                              border: "2px solid rgba(0, 168, 184, 0.2)",
                              boxShadow: activeStep === index 
                                ? "0 4px 15px rgba(0, 168, 184, 0.3)" 
                                : "0 2px 8px rgba(0, 168, 184, 0.1)"
                            }}
                          >
                            <span 
                              className="text-xl font-bold" 
                              style={{ 
                                color: activeStep === index ? "white" : "var(--accent-teal)" 
                              }}
                            >
                              {step.number}
                            </span>
                          </div>
                        </div>
                        
                        {/* Enhanced content */}
                        <div className="flex-1">
                          <h3 
                            className={`text-2xl font-bold mb-3 transition-all duration-300 ${
                              activeStep === index ? 'text-teal-700' : ''
                            }`} 
                            style={{ color: activeStep === index ? "var(--accent-teal)" : "var(--text-dark)" }}
                          >
                            {step.title}
                          </h3>
                          <p 
                            style={{ color: "var(--text-light)" }} 
                            className="leading-relaxed text-lg"
                          >
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Container - Mobile (enhanced) */}
        <div className="md:hidden">
          <div className="space-y-6 relative">
            {/* Mobile timeline line */}
            <div
              className="absolute left-6 top-6 bottom-6 w-0.5 rounded-full"
              style={{
                background: "linear-gradient(180deg, var(--accent-teal), rgba(0, 168, 184, 0.6), var(--accent-teal))",
                boxShadow: "0 0 10px rgba(0,168,184,0.3)",
              }}
            />
            
            {steps.map((step, index) => (
              <div key={step.number} className="transition-all duration-500 relative">
                {/* Mobile timeline dot */}
                <div 
                  className="absolute left-3 top-3 w-6 h-6 rounded-full z-10 flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, var(--accent-teal), #0096C7)",
                    boxShadow: "0 4px 12px rgba(0, 168, 184, 0.3)",
                    border: "2px solid white",
                  }}
                >
                  <step.icon className="w-3 h-3 text-white" />
                </div>
                
                <div
                  className="ml-12 p-6 rounded-2xl border-2 relative overflow-hidden group"
                  style={{
                    borderColor: "rgba(0, 168, 184, 0.2)",
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(10px)",
                    boxShadow: "0 6px 25px rgba(0,0,0,0.08)",
                  }}
                >
                  {/* Subtle shine effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>
                  
                  <div className="flex items-start gap-4 relative z-10">
                    {/* Enhanced number badge */}
                    <div className="flex-shrink-0">
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-xl"
                        style={{ 
                          background: "linear-gradient(135deg, rgba(0, 168, 184, 0.15), rgba(0, 168, 184, 0.08))",
                          border: "2px solid rgba(0, 168, 184, 0.2)",
                          boxShadow: "0 2px 8px rgba(0, 168, 184, 0.1)"
                        }}
                      >
                        <span className="text-lg font-bold" style={{ color: "var(--accent-teal)" }}>
                          {step.number}
                        </span>
                      </div>
                    </div>
                    
                    {/* Enhanced content */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2" style={{ color: "var(--text-dark)" }}>
                        {step.title}
                      </h3>
                      <p style={{ color: "var(--text-light)" }} className="leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Optional Info Card */}
        <div className="mt-24 relative z-10 animate-fade-in-up flex justify-center">
          <div className="w-fit">
            <div
              className="px-12 py-6 rounded-2xl border"
              style={{
                backdropFilter: "blur(8px)",
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                borderColor: "var(--accent-teal)",
              }}
            >
              <div className="flex items-center gap-8">
                <div>
                  <p
                    className="text-sm uppercase tracking-wide font-semibold mb-2"
                    style={{ color: "var(--accent-teal)" }}
                  >
                    We Handle Everything
                  </p>
                  <p className="text-2xl font-bold" style={{ color: "var(--text-dark)" }}>
                    <span className="inline-flex items-center gap-2">
                      <Image src="/Facility.png" alt="Facility" width={22} height={22} className="inline-block" />
                      Facility
                    </span>
                    <span className="mx-2">•</span>
                    <span className="inline-flex items-center gap-2">
                      <Image src="/Reception.png" alt="Reception" width={22} height={22} className="inline-block" />
                      Reception
                    </span>
                    <span className="mx-2">•</span>
                    <span className="inline-flex items-center gap-2">
                      <Image src="/Calls.png" alt="Calls" width={22} height={22} className="inline-block" />
                      Calls
                    </span>
                    <span className="mx-2">•</span>
                    <span className="inline-flex items-center gap-2">
                      <Image src="/receptionist.png" alt="PMS" width={22} height={22} className="inline-block" />
                      PMS
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-12">
          <button
            onClick={() => {
              const pricingSection = document.getElementById("pricing")
              pricingSection?.scrollIntoView({ behavior: "smooth" })
            }}
            className="px-8 py-4 rounded-xl border-2 font-semibold transition-all duration-300 hover:shadow-lg active:scale-95"
            style={{
              borderColor: "var(--accent-teal)",
              color: "var(--accent-teal)",
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLElement).style.backgroundColor = "rgba(0,168,184,0.05)"
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLElement).style.backgroundColor = "transparent"
            }}
          >
            Step Along With Us → Book a Plan
          </button>
        </div>
      </div>
    </section>
  )
}
