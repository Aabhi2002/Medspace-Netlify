"use client"

export function HeroVideo() {
  return (
    <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl">
      <div className="w-full h-full bg-gradient-to-br from-teal-50 to-cyan-50 flex items-center justify-center relative">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          src="https://placeholder.com/video"
        >
          Your browser does not support the video tag.
        </video>

        {/* Dark Overlay for Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />

        {/* Floating Accent Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-6 right-6 w-12 h-12 bg-teal-400/30 rounded-full blur-xl" />
          <div className="absolute bottom-10 left-8 w-16 h-16 bg-cyan-400/20 rounded-full blur-2xl" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full gap-4">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
          </div>
          <p className="text-white text-sm font-medium">Your OPD Facility Video</p>
        </div>
      </div>

      {/* Gradient Overlay for Depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to left, rgba(0,153,168,0.25), rgba(255,255,255,0))",
        }}
      />
    </div>
  )
}
