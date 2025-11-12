'use client'

import React, { useState } from "react"
import { motion } from "motion/react"

export function Contact() {
  const [form, setForm] = useState({
    name: "",
    specialty: "",
    city: "",
    slot: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-[#E6F9FA] to-[#F8FEFE]">
      {/* Blurred Accent Shape */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[38rem] h-48 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background:
        "linear-gradient(90deg,#00a8b8 30%,#2a319b 90%)" }} />
      <div className="max-w-md mx-auto relative z-10">
        <motion.form
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="bg-white/90 rounded-3xl p-10 shadow-xl flex flex-col gap-7 animate-fade-in-up"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.13 }}
            className="text-3xl font-bold mb-3 text-center text-[#2a319b]"
          >
            Book a Plan with MedSpaces
          </motion.h2>

          {/* Name */}
          <motion.input
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Your Name"
            className="rounded-xl px-5 py-4 border-2 border-transparent shadow focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300 focus:outline-none transition-all text-lg bg-white/95 placeholder:text-gray-400"
          />
          {/* Specialty */}
          <motion.input
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            type="text"
            name="specialty"
            value={form.specialty}
            onChange={handleChange}
            required
            placeholder="Specialty"
            className="rounded-xl px-5 py-4 border-2 border-transparent shadow focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300 focus:outline-none transition-all text-lg bg-white/95 placeholder:text-gray-400"
          />
          {/* City */}
          <motion.input
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            required
            placeholder="City"
            className="rounded-xl px-5 py-4 border-2 border-transparent shadow focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300 focus:outline-none transition-all text-lg bg-white/95 placeholder:text-gray-400"
          />
          {/* Preferred Slot Window */}
          <motion.input
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            type="text"
            name="slot"
            value={form.slot}
            onChange={handleChange}
            required
            placeholder="Preferred Slot Window (e.g. Mon 10–12)"
            className="rounded-xl px-5 py-4 border-2 border-transparent shadow focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300 focus:outline-none transition-all text-lg bg-white/95 placeholder:text-gray-400"
          />
          <div className="flex flex-col sm:flex-row gap-4 pt-2 w-full">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="flex-1 py-4 px-6 font-semibold rounded-full bg-gradient-to-r from-teal-500 to-cyan-400 text-white shadow-lg hover:shadow-2xl transition-all text-lg focus:outline-none focus:ring focus:ring-cyan-200"
              style={{ transition: 'all 0.6s cubic-bezier(0.4,0,0.2,1)' }}
            >Book a Plan</motion.button>
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="flex-1 py-4 px-6 font-semibold rounded-full border-2 border-teal-400 text-teal-500 bg-white hover:bg-cyan-50 hover:text-teal-700 transition-all text-lg focus:outline-none focus:ring focus:ring-cyan-100"
              style={{ transition: 'all 0.6s cubic-bezier(0.4,0,0.2,1)' }}
            >Schedule a Walkthrough</motion.button>
          </div>
        </motion.form>
      </div>
    </section>
  )
}
