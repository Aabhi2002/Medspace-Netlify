'use client'

import { useEffect } from 'react'

export function ParallaxHero() {
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const hero = document.querySelector('.parallax-hero') as HTMLElement
      const heroTitle = document.querySelector('.parallax-title') as HTMLElement
      const navBg = document.querySelector('.nav-bg') as HTMLElement
      const contentWrapper = document.querySelector('.content-wrapper') as HTMLElement

      if (hero && heroTitle) {
        if (scrollTop < 1000) {
          // Parallax zoom effect
          hero.style.backgroundSize = `${130 + parseInt((scrollTop / 5).toString())}%`
          
          // Title movement and fade
          heroTitle.style.top = `${50 + (scrollTop * 0.1)}%`
          heroTitle.style.opacity = `${1 - (scrollTop * 0.003)}`
        }
      }

      // Navigation background toggle
      if (navBg && contentWrapper) {
        const contentOffset = contentWrapper.offsetTop - 300
        if (scrollTop >= contentOffset) {
          navBg.classList.remove('bg-hidden')
          navBg.classList.add('bg-visible')
        } else {
          navBg.classList.remove('bg-visible')
          navBg.classList.add('bg-hidden')
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Enhanced Navigation */}
      <nav className="fixed z-[9999] top-0 left-0 w-full h-[35px]">
        <div className="nav-bg absolute block -top-full w-full h-full -z-10 bg-gray-800 transition-all duration-[450ms] ease-in-out bg-hidden"></div>
        <ul className="list-none m-0 py-1 px-8 float-right">
          <li className="inline-block m-0 py-1 px-3">
            <a href="#services" className="text-white no-underline font-light text-lg tracking-wide transition-all duration-250 ease-in-out hover:text-orange-400">
              Services
            </a>
          </li>
          <li className="inline-block m-0 py-1 px-3">
            <a href="#specialties" className="text-white no-underline font-light text-lg tracking-wide transition-all duration-250 ease-in-out hover:text-orange-400">
              Specialties
            </a>
          </li>
          <li className="inline-block m-0 py-1 px-3">
            <a href="#contact" className="text-white no-underline font-light text-lg tracking-wide transition-all duration-250 ease-in-out hover:text-orange-400">
              Contact
            </a>
          </li>
        </ul>
      </nav>

      {/* Parallax Hero Section */}
      <div className="parallax-hero relative w-full h-[500px] bg-gray-800 overflow-hidden bg-fixed bg-no-repeat bg-center"
           style={{
             backgroundImage: 'url(/Dermatology.png)',
             backgroundSize: '130%'
           }}>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        
        <h1 className="parallax-title absolute top-1/2 left-0 w-full px-2 text-5xl font-light text-center text-white tracking-wide transform -translate-y-1/2">
          Advanced Medical Spaces
          <span className="block text-2xl mt-4 text-orange-400 font-normal">
            Where Healthcare Excellence Meets Innovation
          </span>
        </h1>
      </div>

      {/* Content Section */}
      <div className="content-wrapper w-4/5 min-h-[3000px] py-4 px-[10%] bg-black text-white">
        <h1 className="m-0 text-orange-400 text-4xl mb-8 tracking-wide">
          Transforming Healthcare Delivery
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl text-orange-400 mb-4">Premium Medical Facilities</h2>
            <p className="font-light leading-relaxed indent-6 mb-4">
              Experience healthcare in state-of-the-art facilities designed with both patient comfort and medical excellence in mind. Our dermatology centers feature the latest diagnostic equipment and treatment technologies.
            </p>
            <p className="font-light leading-relaxed indent-6">
              From routine skin care to advanced dermatological procedures, our facilities provide the perfect environment for comprehensive medical care that patients deserve.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl text-orange-400 mb-4">Expert Medical Teams</h2>
            <p className="font-light leading-relaxed indent-6 mb-4">
              Our network connects you with board-certified specialists who bring years of experience and cutting-edge knowledge to every patient interaction.
            </p>
            <p className="font-light leading-relaxed indent-6">
              Whether you need specialized dermatological care, routine check-ups, or advanced treatment options, our medical professionals are equipped to deliver exceptional healthcare outcomes.
            </p>
          </div>
        </div>

        <div className="bg-gray-900 p-8 rounded-lg mb-12">
          <h2 className="text-3xl text-orange-400 mb-6 text-center">Why Choose Our Medical Spaces?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-4">🏥</div>
              <h3 className="text-xl text-orange-400 mb-2">Modern Facilities</h3>
              <p className="font-light">Cutting-edge medical equipment and comfortable patient environments</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">👨‍⚕️</div>
              <h3 className="text-xl text-orange-400 mb-2">Expert Care</h3>
              <p className="font-light">Board-certified specialists with extensive experience</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl text-orange-400 mb-2">Efficient Service</h3>
              <p className="font-light">Streamlined processes for faster, better healthcare delivery</p>
            </div>
          </div>
        </div>

        <div className="text-center py-12">
          <h2 className="text-3xl text-orange-400 mb-6">Ready to Experience Better Healthcare?</h2>
          <p className="text-xl font-light mb-8 max-w-2xl mx-auto">
            Join thousands of patients who have discovered the difference that premium medical facilities and expert care can make in their healthcare journey.
          </p>
          <button className="bg-orange-400 text-black px-8 py-3 rounded-lg text-lg font-medium hover:bg-orange-500 transition-colors duration-300">
            Schedule Your Consultation
          </button>
        </div>
      </div>

      <style jsx>{`
        .bg-hidden {
          top: -100%;
          opacity: 0;
        }
        .bg-visible {
          top: 0;
          opacity: 1;
        }
        html {
          scroll-behavior: smooth;
        }
        body {
          margin: 0;
          padding: 0;
          background: black;
          color: white;
        }
      `}</style>
    </>
  )
}