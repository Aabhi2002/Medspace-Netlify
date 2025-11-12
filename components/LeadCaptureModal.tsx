"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { useLeadCapture } from '@/context/LeadCaptureContext'

export function LeadCaptureModal() {
  const { isOpen, closeModal } = useLeadCapture()
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [quickInquiry, setQuickInquiry] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setFormData({ name: '', email: '', message: '' })
        setQuickInquiry('')
        setSubmitStatus('idle')
        setErrorMessage('')
      }, 300)
    }
  }, [isOpen])

  // Handle quick inquiry selection
  const handleQuickInquiryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value
    setQuickInquiry(selectedValue)
    
    // Auto-populate message field if a quick inquiry is selected
    if (selectedValue) {
      setFormData({ ...formData, message: selectedValue })
    }
  }

  // Auto-close after success
  useEffect(() => {
    if (submitStatus === 'success') {
      const timer = setTimeout(() => {
        closeModal()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [submitStatus, closeModal])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage('')

    console.log('📤 [CLIENT] Submitting form data:', formData)

    try {
      console.log('🌐 [CLIENT] Sending POST request to /api/submit')
      
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      console.log('📨 [CLIENT] Response status:', response.status, response.statusText)

      const data = await response.json()
      console.log('📦 [CLIENT] Response data:', data)

      if (response.ok) {
        console.log('✅ [CLIENT] Form submitted successfully!')
        setSubmitStatus('success')
      } else {
        console.error('❌ [CLIENT] Form submission failed:', data.error)
        setSubmitStatus('error')
        setErrorMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      console.error('❌ [CLIENT] Network error:', error)
      setSubmitStatus('error')
      setErrorMessage('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
      console.log('🏁 [CLIENT] Form submission complete')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="min-h-screen px-4 py-20 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: 'spring', duration: 0.5 }}
                className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>

                {/* Success State */}
                {submitStatus === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-8 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', delay: 0.2 }}
                      className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 mb-6"
                    >
                      <CheckCircle className="w-10 h-10 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Thank You!</h3>
                    <p className="text-gray-600 text-lg">
                      Your information has been received. We'll contact you soon.
                    </p>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 3 }}
                      className="h-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full mt-6"
                    />
                  </motion.div>
                ) : (
                  <>
                    {/* Header */}
                    <div className="bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-500 p-8 text-white">
                      <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        <h2 className="text-3xl font-bold mb-2">Get in Touch</h2>
                        <p className="text-teal-50">We'd love to hear from you!</p>
                      </motion.div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                      {/* Name Field */}
                      <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          disabled={isSubmitting}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
                          placeholder="Dr. John Doe"
                        />
                      </motion.div>

                      {/* Email Field */}
                      <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          disabled={isSubmitting}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
                          placeholder="doctor@example.com"
                        />
                      </motion.div>

                      {/* Quick Inquiry Dropdown */}
                      <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        <label htmlFor="quickInquiry" className="block text-sm font-semibold text-gray-700 mb-2">
                          Quick Inquiry (Optional)
                        </label>
                        <select
                          id="quickInquiry"
                          value={quickInquiry}
                          onChange={handleQuickInquiryChange}
                          disabled={isSubmitting}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed bg-white"
                        >
                          <option value="">Select a common question...</option>
                          <option value="I'd like to talk to an advisor.">I'd like to "Talk to an Advisor".</option>
                          <option value="I need a custom plan (e.g., more days, multiple clinics).">I need a custom plan (e.g., more days, multiple clinics).</option>
                          <option value="What's the main difference between the 'Growth' and 'Premium' plans?">What's the main difference between the 'Growth' and 'Premium' plans?</option>
                          <option value="Can you explain the 'SEO + Recall Automation' feature?">Can you explain the 'SEO + Recall Automation' feature?</option>
                          <option value="I have a question about the 'Starter' plan.">I have a question about the 'Starter' plan.</option>
                        </select>
                      </motion.div>

                      {/* Message Field - Now Optional */}
                      <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          disabled={isSubmitting}
                          rows={4}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all resize-none disabled:bg-gray-50 disabled:cursor-not-allowed"
                          placeholder="Tell us about your practice and requirements... (or select from Quick Inquiry above)"
                        />
                      </motion.div>

                      {/* Error Message */}
                      {submitStatus === 'error' && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl"
                        >
                          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-red-700">{errorMessage}</p>
                        </motion.div>
                      )}

                      {/* Submit Button */}
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                        className="w-full py-4 px-6 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            />
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            <span>Send Message</span>
                          </>
                        )}
                      </motion.button>

                      <p className="text-xs text-center text-gray-500">
                        We'll get back to you within 24 hours
                      </p>
                    </form>
                  </>
                )}
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
