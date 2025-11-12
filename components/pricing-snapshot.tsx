"use client"

import React, { useState } from "react"
import { motion } from "motion/react"
import { Check } from "lucide-react"
import { BookPlanButton } from "./BookPlanButton"

const plans = [
  {
    name: "Starter",
    tagline: "Practice Ready",
    price: 20000,
    slots: "3 days/week, 2-hour slots",
    features: ["Concierge support", "PMS (basic)", "Community access", "Front desk support"],
    highlighted: false,
  },
  {
    name: "Growth",
    tagline: "Practice Plus",
    price: 35000,
    slots: "Everything in Starter",
    features: ["SEO + Recall Automation", "CRM Access", "Community (12 months)", "Digital Growth Tools"],
    highlighted: true,
  },
  {
    name: "Premium",
    tagline: "Practice Pro",
    price: 50000,
    slots: "Everything in Growth",
    features: ["Content & Campaigns", "Advanced Analytics", "PR & Add-ons (Free)", "Priority Support"],
    highlighted: false,
  },
]

const addOns = [
  { name: "Personal Website" },
  { name: "Photoshoot" },
  { name: "Video" },
  { name: "Content" },
  { name: "PR" },
]

export function PricingSnapshot() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')
  const [animatedPrices, setAnimatedPrices] = useState<{ [key: number]: number }>({})

  // Calculate prices based on billing cycle
  const getPrice = (monthlyPrice: number) => {
    if (billingCycle === 'yearly') {
      return Math.round(monthlyPrice * 12 * 0.8) // 20% discount
    }
    return monthlyPrice
  }

  // Update animated prices when billing cycle changes
  React.useEffect(() => {
    plans.forEach((plan, idx) => {
      const timer = setTimeout(
        () => {
          setAnimatedPrices((prev) => ({ ...prev, [idx]: getPrice(plan.price) }))
        },
        100 + idx * 50,
      )
      return () => clearTimeout(timer)
    })
  }, [billingCycle])

  return (
    <section
      id="pricing"
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #FFFFFF 0%, rgba(230, 249, 250, 0.6) 50%, #FFFFFF 100%)",
      }}
    >
      {/* Floating accent elements */}
      <div
        className="absolute top-40 left-1/4 w-72 h-72 rounded-full opacity-6 blur-3xl"
        style={{ backgroundColor: "var(--accent-teal)" }}
      />
      <div
        className="absolute bottom-40 right-1/4 w-80 h-80 rounded-full opacity-6 blur-3xl"
        style={{ backgroundColor: "var(--primary-blue)" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl sm:text-6xl font-bold mb-6"
            style={{ color: "var(--text-dark)" }}
          >
            Plans That Grow With You
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl max-w-2xl mx-auto mb-8"
            style={{ color: "var(--text-light)" }}
          >
            Choose the perfect plan for your practice stage
          </motion.p>

          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-4 mb-12"
          >
            <span
              className={`text-lg font-semibold transition-all duration-300 ${
                billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-400'
              }`}
            >
              Monthly
            </span>

            {/* Toggle Switch */}
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className="relative w-16 h-8 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              style={{
                background: billingCycle === 'yearly'
                  ? 'linear-gradient(135deg, var(--accent-teal), #0096C7)'
                  : '#e5e7eb',
              }}
              aria-label="Toggle billing cycle"
            >
              <motion.div
                className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-md"
                animate={{
                  left: billingCycle === 'yearly' ? '36px' : '4px',
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>

            <span
              className={`text-lg font-semibold transition-all duration-300 ${
                billingCycle === 'yearly' ? 'text-gray-900' : 'text-gray-400'
              }`}
            >
              Yearly{' '}
              <span className="text-sm font-normal text-teal-600">(Save 20%)</span>
            </span>
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="relative rounded-2xl overflow-hidden border transition-all duration-500 group hover:shadow-2xl"
              style={{
                backdropFilter: "blur(10px)",
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                borderColor: plan.highlighted ? "var(--accent-teal)" : "rgba(0, 168, 184, 0.2)",
                boxShadow: plan.highlighted ? "0 12px 40px rgba(0, 168, 184, 0.15)" : "0 4px 20px rgba(0, 0, 0, 0.05)",
              }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Most Popular Ribbon */}
              {plan.highlighted && (
                <div className="absolute top-0 right-0 -mt-1 mr-4">
                  <motion.div
                    initial={{ rotate: -45, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    className="px-4 py-1 rounded-b-lg font-semibold text-xs uppercase tracking-widest"
                    style={{
                      background: "linear-gradient(135deg, var(--accent-teal), #0096C7)",
                      color: "white",
                      boxShadow: "0 4px 12px rgba(0, 168, 184, 0.4)",
                    }}
                  >
                    Most Popular
                  </motion.div>
                </div>
              )}

              {/* Glow effect for highlighted card */}
              {plan.highlighted && (
                <motion.div
                  className="absolute -top-12 -right-12 w-40 h-40 rounded-full opacity-20 blur-3xl group-hover:opacity-40 transition-opacity"
                  style={{ background: "var(--accent-teal)" }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                />
              )}

              {/* Card Content */}
              <div className="p-8 relative z-10">
                <h3 className="text-2xl font-bold mb-1" style={{ color: "var(--text-dark)" }}>
                  {plan.name}
                </h3>
                <p className="text-sm mb-6" style={{ color: "var(--accent-teal)" }}>
                  {plan.tagline}
                </p>

                {/* Price - Animated with smooth transition */}
                <div className="mb-2">
                  <motion.span
                    key={`${plan.name}-${billingCycle}`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-5xl font-bold"
                    style={{ color: "var(--primary-blue)" }}
                  >
                    ₹{animatedPrices[idx]?.toLocaleString('en-IN') ?? 0}
                  </motion.span>
                  <motion.span
                    key={`period-${billingCycle}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-gray-600"
                  >
                    /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                  </motion.span>
                </div>

                {/* Slots */}
                <p className="text-sm mb-8" style={{ color: "var(--text-light)" }}>
                  {plan.slots}
                </p>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div
                        className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full mt-0.5"
                        style={{ background: "var(--accent-teal)" }}
                      >
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-sm" style={{ color: "var(--text-light)" }}>
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3 flex flex-col">
                  <BookPlanButton 
                    highlighted={plan.highlighted}
                    planName={plan.name}
                    billingCycle={billingCycle}
                  />

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    className="w-full py-3 rounded-xl font-semibold transition-all border"
                    style={{
                      borderColor: "rgba(0, 168, 184, 0.3)",
                      color: "var(--text-light)",
                      background: "transparent",
                    }}
                  >
                    Talk to an Advisor
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA at bottom removed to hide 'Compare All Features' and fill space */}
        
      </div>
    </section>
  )
}
