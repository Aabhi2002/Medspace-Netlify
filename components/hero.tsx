"use client"

import { useEffect, useRef, useState } from "react"

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const typeWordRef = useRef<HTMLSpanElement>(null)
  
  // Video state tracking
  const [isPlayable, setIsPlayable] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in")
        }
      },
      { threshold: 0.1 },
    )

    if (heroRef.current) {
      observer.observe(heroRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Parallax scroll effect for title - preserves existing behavior
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const title = titleRef.current

      if (title && scrollTop < 1000) {
        title.style.transform = `translateY(${scrollTop * 0.1}px)`
        title.style.opacity = `${Math.max(0, 1 - (scrollTop * 0.003))}`
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Video playback with comprehensive event handling and diagnostics
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Attempt to play video - handles promise resolution/rejection
    const attemptPlay = () => {
      video.play()
        .then(() => {
          console.log('✅ play() resolved - video playing successfully')
          setIsPlayable(true)
        })
        .catch((err) => {
          console.log('❌ play() rejected:', err.message)
          // Autoplay blocked - will retry on user interaction
        })
    }

    const handleLoadedMetadata = (e: Event) => {
      const v = e.currentTarget as HTMLVideoElement
      console.log('✅ onLoadedMetadata | duration:', v.duration, 'dimensions:', `${v.videoWidth}x${v.videoHeight}`)
    }

    const handleLoadedData = (e: Event) => {
      const v = e.currentTarget as HTMLVideoElement
      console.log('✅ onLoadedData | readyState:', v.readyState, 'currentSrc:', v.currentSrc)
      // Attempt play once data is loaded
      attemptPlay()
    }

    const handleCanPlay = (e: Event) => {
      const v = e.currentTarget as HTMLVideoElement
      console.log('✅ onCanPlay | readyState:', v.readyState)
    }

    const handlePlaying = () => {
      console.log('✅ onPlaying - video is now actively playing')
      setIsPlayable(true)
    }

    const handleWaiting = () => {
      console.log('⏳ onWaiting - buffering')
    }

    const handleStalled = () => {
      console.log('⚠️ onStalled - network stalled')
    }

    const handleSuspend = () => {
      console.log('⏸️ onSuspend - browser paused loading')
    }

    const handleError = (e: Event) => {
      const v = e.currentTarget as HTMLVideoElement
      const err = v.error
      const errorCodes = {
        1: 'MEDIA_ERR_ABORTED',
        2: 'MEDIA_ERR_NETWORK',
        3: 'MEDIA_ERR_DECODE (codec issue)',
        4: 'MEDIA_ERR_SRC_NOT_SUPPORTED'
      }
      const errorMsg = errorCodes[err?.code as keyof typeof errorCodes] || 'Unknown error'
      console.error('❌ onError:', err?.code, errorMsg, '| currentSrc:', v.currentSrc)
      setHasError(true)
    }

    // Attach all event listeners for comprehensive monitoring
    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('loadeddata', handleLoadedData)
    video.addEventListener('canplay', handleCanPlay)
    video.addEventListener('playing', handlePlaying)
    video.addEventListener('waiting', handleWaiting)
    video.addEventListener('stalled', handleStalled)
    video.addEventListener('suspend', handleSuspend)
    video.addEventListener('error', handleError)

    // Force load the video
    video.load()

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('loadeddata', handleLoadedData)
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('playing', handlePlaying)
      video.removeEventListener('waiting', handleWaiting)
      video.removeEventListener('stalled', handleStalled)
      video.removeEventListener('suspend', handleSuspend)
      video.removeEventListener('error', handleError)
    }
  }, [])

  // Click handler to retry video playback if autoplay was blocked
  const handleHeroClick = () => {
    const video = videoRef.current
    if (video && !isPlayable && !hasError) {
      video.play()
        .then(() => {
          console.log('✅ Video playing after user interaction')
          setIsPlayable(true)
        })
        .catch((err) => {
          console.log('❌ Still failed after interaction:', err.message)
        })
    }
  }

  // Typewriter effect with reserved width to prevent layout shift
  useEffect(() => {
    const word = "Freedom"
    const el = typeWordRef.current
    if (!el) return

    // Reserve width equal to full word to prevent layout shift
    el.style.minWidth = '7ch' // "Freedom" is 7 characters
    el.style.display = 'inline-block'

    let index = 0
    let timeoutId: NodeJS.Timeout

    el.textContent = ""
    el.style.opacity = "0"

    const type = () => {
      if (index < word.length && el) {
        el.textContent = word.slice(0, index + 1)
        el.style.opacity = "1"
        index++
        timeoutId = setTimeout(type, 150)
      }
    }

    // Start typing after initial delay
    timeoutId = setTimeout(type, 800)

    return () => clearTimeout(timeoutId)
  }, [])

  return (
    <div 
      ref={heroRef}
      className="hero relative w-full overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black"
      style={{
        height: '100vh',
        minHeight: '500px',
      }}
      onClick={handleHeroClick}
    >
      {/* Video Background - MP4 with H.264 codec */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
          isPlayable ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ zIndex: 0 }}
      >
        <source src="/Background.mp4" type="video/mp4" />
      </video>
      
      {/* Fallback gradient - visible if video fails to load or decode */}
      {hasError && (
        <div 
          className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900"
          style={{ zIndex: 0 }}
          aria-hidden="true"
        />
      )}
      
      {/* Dark overlay for text readability - 40% opacity */}
      <div className="absolute inset-0 bg-black/40" style={{ zIndex: 1 }} aria-hidden="true"></div>
      {/* Content layer - text and headings with preserved styling */}
      <div className="absolute top-1/2 left-0 w-full px-4 text-center transform -translate-y-1/2" style={{ zIndex: 2 }}>
        <h1 
          ref={titleRef}
          className="transition-all duration-100 ease-out hero-main-title animate-fade-in-up text-center"
          style={{ 
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            lineHeight: '1.1',
            fontFamily: 'Montserrat, system-ui, sans-serif',
            fontWeight: '800',
            letterSpacing: '-0.01em'
          }}
        >
          {/* First Line: Space to care. */}
          <div className="block mb-4">
            <span style={{ color: '#FFFFFF', textShadow: '0px 4px 8px rgba(0,0,0,0.8)' }}>
              Space to{' '}
            </span>
            <span style={{ color: '#10B981', textShadow: '0px 4px 8px rgba(0,0,0,0.8), 0 0 20px rgba(16, 185, 129, 0.3)' }}>
              care.
            </span>
          </div>
          
          {/* Second Line: Freedom to grow. - typewriter with reserved width */}
          <div className="flex items-center justify-center flex-wrap gap-4">
            <span className="type-wrapper inline-block px-6 py-3 bg-gray-800 bg-opacity-90 rounded-lg shadow-2xl">
              {/* Typewriter span with reserved width to prevent layout shift */}
              <span ref={typeWordRef} className="font-extrabold text-white"></span>
            </span>
            
            <span style={{ color: '#FFFFFF', textShadow: '0px 4px 8px rgba(0,0,0,0.8)' }}>
              to{' '}
            </span>
            
            <span style={{ color: '#10B981', textShadow: '0px 4px 8px rgba(0,0,0,0.8), 0 0 20px rgba(16, 185, 129, 0.3)' }}>
              grow.
            </span>
          </div>
        </h1>
        
        {/* Subtitle - preserved exactly */}
        <p className="mt-8 text-xl md:text-2xl text-white font-light animate-fade-in-up opacity-90" 
            style={{ 
              animationDelay: '0.5s',
              textShadow: '0 2px 10px rgba(0,0,0,0.7)',
              fontFamily: 'Inter, system-ui, sans-serif',
              letterSpacing: '0.01em',
              maxWidth: '700px',
              margin: '2rem auto 0'
            }}>
          Standardized, hygienic OPD rooms with concierge, PMS, and growth marketing bundled in.
        </p>
      </div>
    </div>
  )
}