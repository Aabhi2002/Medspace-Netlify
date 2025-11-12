"use client"

import { useState } from 'react'
import { PartnershipModal } from './PartnershipModal'

export function FacilityPartners() {
  const [isPartnershipModalOpen, setIsPartnershipModalOpen] = useState(false)

  return (
    <>
    <section className="relative py-32 overflow-hidden">
      {/* Background with overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[rgba(42,49,155,0.8)] to-[rgba(0,168,184,0.6)]"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(42,49,155,0.8) 0%, rgba(0,168,184,0.6) 100%)`,
        }}
      />

      {/* Animated glow effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00a8b8] rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Content */}
      <div className="relative max-w-6xl mx-auto px-6">
        <div className="text-center text-white">
          {/* Icon Formula with Labels */}
          <div className="mb-10">
            <div className="flex items-center justify-center gap-4 md:gap-6 flex-wrap mb-4">
              {/* Building Icon */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 md:w-10 md:h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
                    <line x1="9" y1="6" x2="15" y2="6"></line>
                    <line x1="9" y1="10" x2="15" y2="10"></line>
                    <line x1="9" y1="14" x2="15" y2="14"></line>
                    <line x1="9" y1="18" x2="15" y2="18"></line>
                  </svg>
                </div>
                <p className="text-xs md:text-sm font-semibold text-white/90">Your Space</p>
              </div>

              {/* Plus Sign */}
              <div className="text-3xl md:text-4xl text-white font-light mt-[-20px]">+</div>

              {/* Handshake Icon */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 md:w-10 md:h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                    <path d="M2 17l10 5 10-5"></path>
                    <path d="M2 12l10 5 10-5"></path>
                  </svg>
                </div>
                <p className="text-xs md:text-sm font-semibold text-white/90">Partnership</p>
              </div>

              {/* Equals Sign */}
              <div className="text-3xl md:text-4xl text-white font-light mt-[-20px]">=</div>

              {/* Growth Arrow Icon */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-white/30 to-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/40 hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-8 h-8 md:w-10 md:h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                    <polyline points="17 6 23 6 23 12"></polyline>
                  </svg>
                </div>
                <p className="text-xs md:text-sm font-semibold text-white/90">Growth </p>
              </div>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Monetize Idle OPD Rooms</h2>
          <p className="text-xl md:text-2xl text-white/90 mb-4">Without new CapEx.</p>

          <div className="space-y-6 mb-12 text-lg md:text-xl text-white/95 max-w-2xl mx-auto">
            <p>
              <span className="font-semibold">We bring</span> brand, technology, and doctors.
            </p>
            <p>
              <span className="font-semibold">You provide</span> space and support.
            </p>
            <p>
              <span className="font-semibold">Together</span> we create value.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setIsPartnershipModalOpen(true)}
              className="px-10 py-4 bg-white text-[#2a319b] rounded-full font-bold text-lg hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Partner with MedSpaces →
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <p className="text-sm font-semibold text-white/80 mb-2">TRANSPARENT</p>
              <p className="text-lg font-bold text-white">Real-time Dashboards</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <p className="text-sm font-semibold text-white/80 mb-2">PROVEN</p>
              <p className="text-lg font-bold text-white">Real Results</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <p className="text-sm font-semibold text-white/80 mb-2">FLEXIBLE</p>
              <p className="text-lg font-bold text-white">Custom JV Models</p>
            </div>
          </div>
        </div>
      </div>

      {/* Partnership Modal */}
      <PartnershipModal 
        isOpen={isPartnershipModalOpen} 
        onClose={() => setIsPartnershipModalOpen(false)} 
      />
    </section>
    </>
  )
}
