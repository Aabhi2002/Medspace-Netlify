"use client"

import React, { useState, useRef, useId } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Check, X, Clock, Phone, Building2, Monitor, TrendingUp, Users } from "lucide-react"
import { useOutsideClick } from "@/hooks/use-outside-click"

const features = [
  {
    title: "2-Hour OPD Slots",
    subtitle: "Clean, ready, and on time",
    description: "Predictable time blocks designed for your practice schedule",
    icon: Clock,
    fullDescription:
      "Our 2-hour OPD slots are meticulously designed to fit seamlessly into your practice. Each slot comes pre-prepared and cleaned, ensuring you have a ready-to-use space at the exact time you need it. No setup hassles, no delays—just a professional environment ready for patient care. Perfect for maintaining your schedule consistency and maximizing your productivity.",
  },
  {
    title: "Front Desk + Phone Concierge",
    subtitle: "Professional reception handled",
    description: "Dedicated team manages patient check-ins and calls",
    icon: Phone,
    fullDescription:
      "We handle all patient interactions at the front desk. Our trained concierge team manages patient check-ins, appointment scheduling, and all incoming calls with professionalism. This means your staff can focus on clinical work while we ensure every patient receives a warm, professional welcome. Your practice runs smoother when patient management is handled by dedicated professionals.",
  },
  {
    title: "Facility Management",
    subtitle: "Housekeeping, utilities, compliance",
    description: "We handle cleaning, maintenance, and all regulatory requirements",
    icon: Building2,
    fullDescription:
      "Facility management becomes our responsibility. We handle all housekeeping, utility management, and ensure your facility remains compliant with all healthcare regulations. From regular cleaning to maintenance schedules, from waste management to regulatory inspections—we've got it all covered. You focus on medicine; we focus on keeping your space impeccable and compliant.",
  },
  {
    title: "Practice Management System",
    subtitle: "Calendar, billing, analytics",
    description: "Complete PMS with billing automation and growth insights",
    icon: Monitor,
    fullDescription:
      "Our integrated Practice Management System brings everything together. Manage your calendar, automate billing processes, and access detailed analytics on your practice performance. Track patient visits, revenue trends, and operational metrics in real-time. With our PMS, you have complete visibility into your practice health and growth opportunities.",
  },
  {
    title: "Digital Growth",
    subtitle: "SEO, recall automation, campaigns",
    description: "Marketing automation and patient recall campaigns included",
    icon: TrendingUp,
    fullDescription:
      "Grow your patient base with our digital growth suite. Our SEO strategies improve your online visibility, patient recall campaigns keep your existing patients engaged, and automated marketing campaigns bring new patients to your door. All handled professionally so you can focus on delivering exceptional care. Watch your practice grow through strategic digital marketing.",
  },
  {
    title: "Community & Referrals",
    subtitle: "Nushift Connect, events",
    description: "Join a thriving community of doctors sharing referrals",
    icon: Users,
    fullDescription:
      "Join Nushift Connect—a vibrant community of healthcare professionals sharing referrals and best practices. Participate in exclusive events, networking sessions, and collaborative opportunities. Access a network of specialists who can support your practice through referrals and professional relationships. Being part of our community means you're never alone in your practice journey.",
  },
]

export function WhatYouGet() {
  const [active, setActive] = useState<(typeof features)[number] | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const id = useId()

  useOutsideClick(ref, () => setActive(null))

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null)
      }
    }

    if (active) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [active])

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 h-full w-full z-10 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active ? (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="min-h-screen px-4 py-20 md:py-24 flex items-center justify-center">
              <motion.button
                key={`button-${active.title}-${id}`}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.05 } }}
                className="flex fixed top-20 md:top-24 right-4 z-50 lg:hidden items-center justify-center bg-white rounded-full h-10 w-10 hover:bg-gray-100 transition-colors shadow-lg"
                onClick={() => setActive(null)}
              >
                <X className="w-5 h-5 text-gray-700" />
              </motion.button>
              <motion.div
                layoutId={`card-${active.title}-${id}`}
                ref={ref}
                className="w-full max-w-2xl bg-white dark:bg-neutral-900 rounded-3xl overflow-hidden shadow-2xl my-8"
              >
              {/* Modal Header with Feature Icon */}
              <div
                className="p-8"
                style={{
                  background: "linear-gradient(135deg, var(--light-bg) 0%, rgba(0, 168, 184, 0.1) 100%)",
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div
                      className="flex items-center justify-center w-16 h-16 rounded-2xl"
                      style={{
                        background: "linear-gradient(135deg, var(--accent-teal), #0096C7)",
                        boxShadow: "0 8px 25px rgba(0, 168, 184, 0.3)",
                      }}
                    >
                      <active.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <motion.button
                    layoutId={`close-button-${active.title}-${id}`}
                    onClick={() => setActive(null)}
                    className="hidden lg:flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full h-10 w-10 transition-colors shadow-md"
                  >
                    <X className="w-5 h-5 text-gray-700" />
                  </motion.button>
                </div>
                <motion.h2
                  layoutId={`title-${active.title}-${id}`}
                  className="text-3xl font-bold mb-2"
                  style={{ color: "var(--text-dark)" }}
                >
                  {active.title}
                </motion.h2>
                <motion.p
                  layoutId={`subtitle-${active.subtitle}-${id}`}
                  className="text-lg"
                  style={{ color: "var(--accent-teal)", fontWeight: "500" }}
                >
                  {active.subtitle}
                </motion.p>
              </div>

              {/* Enhanced Modal Content */}
              <div className="px-8 pb-8">
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="prose prose-lg max-w-none">
                    <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                      {active.fullDescription}
                    </p>
                  </div>
                  
                  {/* Key Benefits Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                        <h4 className="font-semibold text-emerald-800">Time Saving</h4>
                      </div>
                      <p className="text-sm text-emerald-700">Focus on patient care while we handle operations</p>
                    </div>
                    
                    <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                        <h4 className="font-semibold text-blue-800">Professional Quality</h4>
                      </div>
                      <p className="text-sm text-blue-700">Maintain high standards with dedicated support</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Enhanced Modal Footer */}
              <div className="px-8 py-6 bg-gradient-to-r from-gray-50 to-blue-50 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-center sm:text-left">
                    <p className="text-sm font-medium text-gray-700">
                      Ready to experience this feature?
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Join hundreds of doctors already using MedSpaces
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <motion.button
                      onClick={() => {
                        const el = document.getElementById('pricing');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                        setActive(null);
                      }}
                      className="px-6 py-3 rounded-xl font-semibold transition-all hover:shadow-lg hover:-translate-y-0.5 bg-gradient-to-r from-teal-500 to-cyan-500 text-white"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Get Started
                    </motion.button>
                    <motion.button
                      onClick={() => setActive(null)}
                      className="px-6 py-3 rounded-xl font-semibold transition-all hover:shadow-md bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Close
                    </motion.button>
                  </div>
                </div>
              </div>
              </motion.div>
            </div>
          </div>
        ) : null}
      </AnimatePresence>

      {/* Main Section */}
      <section
        className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #FFFFFF 0%, #E6F9FA 50%, #F1FAFB 100%)",
        }}
      >
        {/* Floating accent elements */}
        <div
          className="absolute top-32 left-10 w-64 h-64 rounded-full opacity-8 blur-3xl"
          style={{ backgroundColor: "var(--accent-teal)" }}
        />
        <div
          className="absolute bottom-32 right-10 w-80 h-80 rounded-full opacity-8 blur-3xl"
          style={{ backgroundColor: "var(--primary-blue)" }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Heading Section */}
          <div className="mb-20">
            <h2 className="text-5xl sm:text-6xl font-bold mb-6" style={{ color: "var(--text-dark)" }}>
              What You Get —
              <br />
              <span className="relative inline-block">
                Everything You Need to Practice, <span style={{ color: "var(--accent-teal)" }}>Simplified</span>
              </span>
            </h2>
            <p className="text-lg mt-6 max-w-3xl" style={{ color: "var(--text-light)" }}>
              Complete ecosystem designed to amplify your care. We handle the business, so you focus on patients.
            </p>
          </div>

          {/* Features Grid - Cards that open modal on click */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {features.map((feature, index) => (
              <motion.div
                key={`card-${feature.title}-${id}`}
                layoutId={`card-${feature.title}-${id}`}
                onClick={() => setActive(feature)}
                className="p-6 rounded-2xl border cursor-pointer transition-all duration-500 group hover:shadow-lg"
                style={{
                  backdropFilter: "blur(10px)",
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  borderColor: "rgba(0, 168, 184, 0.3)",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
                }}
                whileHover={{ scale: 1.02, borderColor: "var(--accent-teal)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Feature Glow Circle */}
                <motion.div
                  className="absolute -top-6 -right-6 w-16 h-16 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: "radial-gradient(circle, rgba(0,168,184,0.3), rgba(0,168,184,0))",
                  }}
                />

                {/* Feature Icon */}
                <div className="mb-4">
                  <motion.div
                    className="relative flex items-center justify-center w-16 h-16 rounded-2xl mb-2"
                    style={{
                      background: "linear-gradient(135deg, rgba(0, 168, 184, 0.1), rgba(0, 168, 184, 0.05))",
                      border: "2px solid rgba(0, 168, 184, 0.2)",
                    }}
                    whileHover={{ 
                      scale: 1.05, 
                      borderColor: "var(--accent-teal)",
                      background: "linear-gradient(135deg, rgba(0, 168, 184, 0.15), rgba(0, 168, 184, 0.08))"
                    }}
                  >
                    <feature.icon className="w-8 h-8" style={{ color: "var(--accent-teal)" }} />
                  </motion.div>
                </div>

                {/* Title */}
                <motion.h3
                  layoutId={`title-${feature.title}-${id}`}
                  className="text-lg font-bold mb-1"
                  style={{ color: "var(--text-dark)" }}
                >
                  {feature.title}
                </motion.h3>

                {/* Subtitle */}
                <motion.p
                  layoutId={`subtitle-${feature.subtitle}-${id}`}
                  className="text-sm mb-3"
                  style={{ color: "var(--accent-teal)", fontWeight: "500" }}
                >
                  {feature.subtitle}
                </motion.p>

                {/* Brief Description */}
                <motion.p
                  layoutId={`description-${feature.description}-${id}`}
                  className="text-sm leading-relaxed mb-4"
                  style={{ color: "var(--text-light)" }}
                >
                  {feature.description}
                </motion.p>

                <motion.button
                  layoutId={`cta-button-${feature.title}-${id}`}
                  className="px-4 py-2 text-sm rounded-lg font-semibold transition-all mt-4"
                  style={{
                    background: "rgba(0, 168, 184, 0.1)",
                    color: "var(--accent-teal)",
                    border: "1px solid var(--accent-teal)",
                  }}
                  whileHover={{
                    background: "var(--accent-teal)",
                    color: "white",
                    boxShadow: "0 4px 12px rgba(0, 168, 184, 0.3)",
                  }}
                >
                  Know More →
                </motion.button>
              </motion.div>
            ))}
          </div>

          {/* CTA Card - Compare Bundles */}
          <div
            className="relative mt-20 p-8 rounded-2xl border"
            style={{
              backdropFilter: "blur(12px)",
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              borderColor: "var(--accent-teal)",
              boxShadow: "0 12px 40px rgba(0, 168, 184, 0.15)",
            }}
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
              <div>
                <p
                  className="text-sm uppercase tracking-widest font-semibold mb-2"
                  style={{ color: "var(--accent-teal)" }}
                >
                  Ready to Transform?
                </p>
                <h3 className="text-3xl font-bold" style={{ color: "var(--text-dark)" }}>
                  Choose Your Perfect Fit
                </h3>
                <p className="mt-2 max-w-xl" style={{ color: "var(--text-light)" }}>
                  Explore our flexible bundles designed to scale with your practice
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
