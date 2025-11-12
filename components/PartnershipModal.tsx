"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, Send, CheckCircle, AlertCircle, Handshake } from 'lucide-react'

interface PartnershipModalProps {
  isOpen: boolean
  onClose: () => void
}

export function PartnershipModal({ isOpen, onClose }: PartnershipModalProps) {
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
        onClose()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [submitStatus, onClose])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage('')

    const submitData = {
      ...formData,
      formType: 'partnership', // This tells the API to save to Partnership tab
    }

    console.log('📤 [CLIENT - PARTNERSHIP] Submitting form data:', submitData)

    try {
      console.log('🌐 [CLIENT - PARTNERSHIP] Sending POST request to /api/submit')
      
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      })

      console.log('📨 [CLIENT - PARTNERSHIP] Response status:', response.status, response.statusText)

      const data = await response.json()
      console.log('📦 [CLIENT - PARTNERSHIP] Response data:', data)

      if (response.ok) {
        console.log('✅ [CLIENT - PARTNERSHIP] Form submitted successfully!')
        setSubmitStatus('success')
      } else {
        console.error('❌ [CLIENT - PARTNERSHIP] Form submission failed:', data.error)
        setSubmitStatus('error')
        setErrorMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      console.error('❌ [CLIENT - PARTNERSHIP] Network error:', error)
      setSubmitStatus('error')
      setErrorMessage('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
      console.log('🏁 [CLIENT - PARTNERSHIP] Form submission complete')
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
            onClick={onClose}
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
                  onClick={onClose}
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
                      className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 mb-6"
                    >
                      <CheckCircle className="w-10 h-10 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Thank You!</h3>
                    <p className="text-gray-600 text-lg">
                      Your details have been received. We'll contact you soon.
                    </p>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 3 }}
                      className="h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full mt-6"
                    />
                  </motion.div>
                ) : (
                  <>
                    {/* Header */}
                    <div className="bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 p-8 text-white">
                      <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="flex items-center gap-3 mb-3"
                      >
                        <Handshake className="w-8 h-8" />
                        <h2 className="text-3xl font-bold">Partner with MedSpaces</h2>
                      </motion.div>
                      <p className="text-purple-50">Let's grow together!</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                      {/* Name Field */}
                      <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <label htmlFor="partner-name" className="block text-sm font-semibold text-gray-700 mb-2">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          id="partner-name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          disabled={isSubmitting}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
                          placeholder="Your facility name"
                        />
                      </motion.div>

                      {/* Email Field */}
                      <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <label htmlFor="partner-email" className="block text-sm font-semibold text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="partner-email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          disabled={isSubmitting}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
                          placeholder="contact@facility.com"
                        />
                      </motion.div>

                      {/* Quick Inquiry Dropdown */}
                      <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        <label htmlFor="partner-quickInquiry" className="block text-sm font-semibold text-gray-700 mb-2">
                          Quick Inquiry (Optional)
                        </label>
                        <select
                          id="partner-quickInquiry"
                          value={quickInquiry}
                          onChange={handleQuickInquiryChange}
                          disabled={isSubmitting}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed bg-white"
                        >
                          <option value="">Select a common question...</option>
                          <option value="I'd like to discuss the financial/JV models.">I'd like to discuss the financial/JV models.</option>
                          <option value="What are the requirements for my space/clinic?">What are the requirements for my space/clinic?</option>
                          <option value="What kind of doctors/specialties will use my space?">What kind of doctors/specialties will use my space?</option>
                          <option value="I'd like a demo of the 'Real-time Dashboards'.">I'd like a demo of the 'Real-time Dashboards'.</option>
                          <option value="What exactly do I need to provide as 'space and support'?">What exactly do I need to provide as 'space and support'?</option>
                        </select>
                      </motion.div>

                      {/* Message Field - Now Optional */}
                      <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <label htmlFor="partner-message" className="block text-sm font-semibold text-gray-700 mb-2">
                          Message
                        </label>
                        <textarea
                          id="partner-message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          disabled={isSubmitting}
                          rows={4}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all resize-none disabled:bg-gray-50 disabled:cursor-not-allowed"
                          placeholder="Tell us about your facility and partnership interests... (or select from Quick Inquiry above)"
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
                        className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                            <span>Submit Partnership Request</span>
                          </>
                        )}
                      </motion.button>

                      <p className="text-xs text-center text-gray-500">
                        We'll review your request and get back to you within 48 hours
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
