"use client"
import { motion } from "motion/react"
import Image from "next/image"
import { InfiniteMovingCards } from "./ui/infinite-moving-cards"

const specialties = [
  { name: "Gynaecology", icon: "🌸", logo: "/Gynaecology.png", color: "#FFE4E1" },
  { name: "Psychiatry", icon: "🧠", logo: "/psychiatry.png", color: "#E6F0FF" },
  { name: "Dermatology", icon: "✨", logo: "/Dermatology.png", color: "#FFF5E1" },
  { name: "Dentistry", icon: "😁", logo: "/Dentistry.png", color: "#E1F5FF" },
  { name: "Orthopedics", icon: "🦴", logo: "/Orthopedics.png", color: "#F0E1FF" },
  { name: "Plastic Surgery", icon: "💉", color: "#FFE1F5" },
  { name: "Diabetology", icon: "🍬", logo: "/Diabetology.png", color: "#E1FFE1" },
  { name: "Gastroenterology", icon: "🥗", logo: "/gastroenterology.png", color: "#FFFFE1" },
  { name: "Infertility", icon: "🧬", logo: "/Infertility.png", color: "#E1F5F5" },
  { name: "Endocrinology", icon: "⚖️", logo: "/Endocrinology.png", color: "#F5E1FF" },
  { name: "Andrology", icon: "👨‍⚕️", color: "#FFE1E1" },
  { name: "Urology", icon: "🚻", logo: "/Urology.png", color: "#E1E1FF" },
  { name: "Child Development", icon: "👶", logo: "/Child Development.png", color: "#FFEBE1" },
  { name: "Psychology", icon: "🌈", logo: "/Psychology.png", color: "#E1FFEB" },
]

export function Specialties() {
  return (
    <section
      className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #FFFFFF 0%, rgba(230, 249, 250, 0.4) 50%, #FFFFFF 100%)",
      }}
    >
      <div
        className="absolute top-1/4 right-0 w-96 h-96 rounded-full opacity-5 blur-3xl"
        style={{ backgroundColor: "var(--accent-teal)" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl sm:text-6xl font-bold mb-6"
            style={{ color: "var(--text-dark)" }}
          >
            Specialities We Host
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl max-w-2xl mx-auto"
            style={{ color: "var(--text-light)" }}
          >
            From consultation to care — we've got every field covered.
          </motion.p>
        </div>

        <div className="hidden lg:block mb-12 rounded-2xl p-1" style={{ background: "rgba(0, 168, 184, 0.05)" }}>
          <InfiniteMovingCards
            items={specialties}
            direction="left"
            speed="slow"
            pauseOnHover={true}
            className="[&_.scroller__inner]:gap-4"
          />
        </div>

        {/* Mobile: 2-column grid */}
        <div className="lg:hidden grid grid-cols-2 gap-4 mb-12">
          {specialties.map((specialty, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (idx % 6) * 0.05 }}
              className="group cursor-pointer"
            >
              <div
                className="p-4 rounded-2xl font-semibold transition-all duration-300 hover:shadow-lg border-2 text-center group-hover:scale-105"
                style={{
                  backgroundColor: specialty.color,
                  borderColor: "var(--accent-teal)",
                }}
              >
                <div className="flex flex-col items-center justify-center gap-2">
                  {specialty.logo ? (
                    <Image
                      src={specialty.logo}
                      alt={specialty.name}
                      width={40}
                      height={40}
                      className="w-10 h-10 object-contain"
                    />
                  ) : (
                    <span className="text-3xl">{specialty.icon}</span>
                  )}
                  <span className="text-sm" style={{ color: "var(--text-dark)" }}>
                    {specialty.name}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Section Divider Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="h-1 bg-gradient-to-r from-transparent via-teal-400 to-transparent my-24 rounded-full origin-center"
          style={{
            background: "linear-gradient(90deg, transparent, var(--accent-teal), transparent)",
            boxShadow: "0 0 20px var(--glow-light)",
          }}
        />
      </div>
    </section>
  )
}
