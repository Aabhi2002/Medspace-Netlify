"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import Image from "next/image"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasScroll, setHasScroll] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setHasScroll(scrollTop > 10)
      
      // Parallax navigation background effect
      const navBg = document.querySelector('.nav-bg') as HTMLElement
      const contentWrapper = document.querySelector('.content-wrapper') as HTMLElement
      
      if (navBg) {
        if (scrollTop >= 300) {
          navBg.classList.remove('bg-hidden')
          navBg.classList.add('bg-visible')
        } else {
          navBg.classList.remove('bg-visible')
          navBg.classList.add('bg-hidden')
        }
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "Specialties", href: "#specialties" },
    { label: "For Doctors", href: "#for-doctors" },
    { label: "For Facilities", href: "#for-facilities" },
    { label: "Community", href: "#community" },
    { label: "Contact", href: "#footer-main" },
  ]

  return (
    <nav className="fixed top-0 left-0 w-full z-[9999] h-[95px] transition-all duration-300">
      {/* Parallax Navigation Background */}
      <div className="nav-bg absolute inset-0 bg-gray-800 bg-opacity-90 backdrop-blur-md transition-all duration-[450ms] ease-in-out bg-hidden"></div>
      
      <div className="relative z-10" style={{ background: hasScroll ? 'rgba(240, 240, 240, 0.95)' : 'rgba(240, 240, 240, 0.55)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/Medspaces Logo(1).png"
              alt="MedSpaces Logo"
              width={210}
              height={120}
              priority
              className="h-[88px] w-auto"
            />
          </Link>
      
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium transition-all duration-300 relative group hover:text-teal-600 hover:scale-105"
                style={{ 
                  color: "var(--text-light)",
                  fontFamily: 'Ubuntu, sans-serif',
                  letterSpacing: '1px',
                  fontWeight: 'lighter'
                }}
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full"
                />
                <span
                  className="absolute inset-0 bg-gradient-to-r from-teal-50 to-cyan-50 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-lg -z-10"
                />
              </Link>
            ))}
          </div>

          {/* CTA Buttons - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <button
              className="group relative px-6 py-3 text-sm font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 overflow-hidden"
              style={{ 
                color: "var(--accent-teal)", 
                border: `2px solid var(--accent-teal)`,
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)'
              }}
              onClick={() => {
                const footer = document.getElementById('footer-main');
                if (footer) footer.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                Schedule Walkthrough
              </span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? (
              <X className="w-6 h-6" style={{ color: "var(--text-dark)" }} />
            ) : (
              <Menu className="w-6 h-6" style={{ color: "var(--text-dark)" }} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white bg-opacity-95 backdrop-blur-md border-t shadow-lg" style={{ borderColor: "var(--light-bg)" }}>
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block text-sm font-medium py-3 px-2 rounded-lg hover:bg-teal-50 hover:text-teal-600 transition-all duration-200"
                style={{ color: "var(--text-light)" }}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 space-y-2 border-t" style={{ borderColor: "var(--light-bg)" }}>
              <button
                className="w-full px-4 py-3 text-sm font-semibold rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 shadow-md hover:shadow-lg"
                onClick={() => {
                  const footer = document.getElementById('footer-main');
                  if (footer) footer.scrollIntoView({ behavior: 'smooth' });
                  setIsOpen(false);
                }}
              >
                Schedule Walkthrough
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
