"use client"

import { ChevronRight } from "lucide-react"
import { TrustBadges } from "./trust-badges"

export function HeroContent() {
  return (
    <div className="content-wrapper relative min-h-[600px] py-20 overflow-hidden"
         style={{
           background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)'
         }}>
      
      {/* Background Decorative Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-emerald-200 to-teal-300 rounded-full opacity-20 blur-xl"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-orange-200 to-red-300 rounded-full opacity-20 blur-xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-100 to-cyan-200 rounded-full opacity-10 blur-3xl"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        
        {/* Enhanced Description */}
        <div className="mb-16">
          <div className="inline-block p-8 bg-white bg-opacity-80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white border-opacity-50 animate-fade-in-up">
            <p className="text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto" 
               style={{ 
                 fontFamily: 'Inter, system-ui, sans-serif',
                 fontWeight: '500',
                 color: '#1f2937',
                 lineHeight: '1.6'
               }}>
              <span className="text-emerald-600 font-semibold">Standardized, hygienic</span> OPD rooms on 
              <span className="text-orange-600 font-semibold"> 2-hour slots</span>—with 
              <span className="text-teal-600 font-semibold"> concierge</span>, 
              <span className="text-blue-600 font-semibold"> practice management software(PMS)</span>, 
              <span className="text-purple-600 font-semibold"> community</span>, and 
              <span className="text-pink-600 font-semibold"> growth marketing</span> bundled in.
            </p>
          </div>
        </div>

        {/* Enhanced CTAs */}
        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-16">
          <button
            className="group relative px-12 py-5 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white font-bold rounded-2xl hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 flex items-center justify-center gap-4 text-xl shadow-xl overflow-hidden"
            onClick={() => {
              const el = document.getElementById('pricing');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10">Book a Plan</span>
            <ChevronRight className="relative z-10 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl"></div>
          </button>
          
          <button
            className="group relative px-12 py-5 bg-white border-3 border-orange-500 text-orange-600 font-bold rounded-2xl hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 hover:text-white hover:border-transparent hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 text-xl shadow-lg backdrop-blur-sm"
            onClick={() => {
              const el = document.getElementById('pricing');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className="relative z-10">See Pricing & Deliverables</span>
          </button>
        </div>

        {/* Enhanced Trust Badges Container */}
        <div className="flex justify-center">
          <div className="relative w-fit">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-100 via-teal-50 to-cyan-100 rounded-3xl opacity-50 blur-sm"></div>
            <div className="relative z-10 px-12 py-6 bg-white bg-opacity-60 backdrop-blur-md rounded-3xl shadow-xl border border-white border-opacity-50">
              <TrustBadges />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Animation Elements */}
      <div className="absolute top-20 right-20 w-4 h-4 bg-emerald-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0s' }}></div>
      <div className="absolute top-40 left-20 w-3 h-3 bg-orange-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-40 right-40 w-2 h-2 bg-teal-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-20 left-40 w-5 h-5 bg-blue-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0.5s' }}></div>
    </div>
  )
}
