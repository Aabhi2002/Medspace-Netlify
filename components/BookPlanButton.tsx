"use client"

import { motion } from "motion/react"
import { Zap } from "lucide-react"
import { useLeadCapture } from "@/context/LeadCaptureContext"

interface BookPlanButtonProps {
  highlighted?: boolean
  planName?: string
  billingCycle?: 'monthly' | 'yearly'
}

export function BookPlanButton({ 
  highlighted = false, 
  planName = '', 
  billingCycle = 'monthly' 
}: BookPlanButtonProps) {
  const { openModal } = useLeadCapture()

  const handleClick = () => {
    // Log the plan details (you can use this data later for analytics or pre-filling forms)
    console.log('📊 Plan selected:', { plan: planName.toLowerCase(), cycle: billingCycle })
    openModal()
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
      style={
        highlighted
          ? {
              background: "linear-gradient(135deg, var(--accent-teal), #0096C7)",
              color: "white",
              boxShadow: "0 4px 15px rgba(0, 168, 184, 0.3)",
            }
          : {
              background: "rgba(0, 168, 184, 0.1)",
              color: "var(--accent-teal)",
            }
      }
      onClick={handleClick}
    >
      <span>Book This Plan</span>
      <Zap className="w-4 h-4" />
    </motion.button>
  )
}
