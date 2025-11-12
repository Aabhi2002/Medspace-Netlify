"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function ImageGalleryScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const slidesRef = useRef<HTMLDivElement>(null)

  const images = [
    {
      src: "/main/benyamin-bohlouli-B_sK_xgzwVA-unsplash.jpg",
      heading: "Modern Healthcare",
      content: "State-of-the-art medical facilities"
    },
    {
      src: "/main/david-fintz-z-Jaxjj0KVY-unsplash.jpg",
      heading: "Expert Care",
      content: "Professional medical consultation"
    },
    {
      src: "/main/petr-magera-HuWm7malJ18-unsplash.jpg",
      heading: "Advanced Technology",
      content: "Cutting-edge medical equipment"
    },
    {
      src: "/main/petr-magera-QxE8npTJwag-unsplash.jpg",
      heading: "Patient Comfort",
      content: "Comfortable and welcoming environment"
    },
    {
      src: "/main/petr-magera-sKWfTQ8E_kU-unsplash.jpg",
      heading: "Quality Service",
      content: "Excellence in healthcare delivery"
    }
  ]

  useEffect(() => {
    if (!containerRef.current || !slidesRef.current) return

    // Get all slides and captions - same as your example
    const slides = gsap.utils.toArray(".gallery-slide")
    const captions = gsap.utils.toArray(".gallery-caption")
    const headings = gsap.utils.toArray(".gallery-heading")
    const contents = gsap.utils.toArray(".gallery-content")

    // Set initial states - same as your example
    gsap.set(headings, { 
      opacity: 0, 
      y: -100, 
      transformOrigin: "top" 
    })
    gsap.set(contents, { 
      opacity: 0, 
      y: 100, 
      transformOrigin: "bottom" 
    })

    // Create horizontal scroll animation - same as your example
    const tween = gsap.to(".gallery-slide", {
      ease: "none",
      xPercent: -100 * (slides.length - 1)
    })

    // Create ScrollTrigger with longer scroll distance to ensure completion
    ScrollTrigger.create({
      trigger: slidesRef.current,
      start: "top top",
      end: "+=600%", // Longer scroll distance to ensure all images are seen
      scrub: 1, // Smooth scrubbing like your example
      pin: true,
      animation: tween
    })

    // Animate captions - same pattern as your example
    captions.forEach((caption) => {
      const items = (caption as Element).querySelectorAll("*")
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        scrollTrigger: {
          trigger: caption as Element,
          start: "left right-=20%",
          end: "left left+=20%",
          scrub: true,
          containerAnimation: tween
        }
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section className="section-slides overflow-hidden" ref={containerRef}>
      <div className="slides flex" ref={slidesRef}>
        {/* Start slide */}
        <div className="gallery-slide slide flex items-center justify-center w-screen h-screen flex-shrink-0 bg-gradient-to-r from-[#fcbf49] to-[#f77f00] text-center">
          <div className="text-white">
            <h2 className="text-5xl md:text-7xl font-bold mb-4">Our Facilities</h2>
            <p className="text-xl md:text-2xl">Experience world-class healthcare</p>
          </div>
        </div>

        {/* Image slides */}
        {images.map((image, index) => (
          <div key={index} className="gallery-slide slide w-screen h-screen flex-shrink-0">
            <figure className="relative w-full h-full m-0">
              <img
                src={image.src}
                alt={image.heading}
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.log(`Failed to load image: ${image.src}`)
                  e.currentTarget.style.backgroundColor = '#f0f0f0'
                }}
              />
              <figcaption className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-15">
                <div className="gallery-caption caption flex flex-col justify-center items-center p-5">
                  <h3 className="gallery-heading heading inline-block px-4 py-2 font-bold text-center text-4xl md:text-6xl leading-none text-[#d62828] bg-[#fcbf49] mb-2">
                    {image.heading}
                  </h3>
                  <p className="gallery-content content inline-block px-4 py-2 text-white text-xl md:text-2xl font-bold text-center bg-[#ef476f] m-0">
                    {image.content}
                  </p>
                </div>
              </figcaption>
            </figure>
          </div>
        ))}

        {/* End slide */}
        <div className="gallery-slide slide flex items-center justify-center w-screen h-screen flex-shrink-0 bg-gradient-to-r from-[#fcbf49] to-[#f77f00] text-center">
          <div className="text-white">
            <h2 className="text-5xl md:text-7xl font-bold mb-4">Ready to Start?</h2>
            <p className="text-xl md:text-2xl">Join thousands of satisfied patients</p>
          </div>
        </div>
      </div>
    </section>
  )
}