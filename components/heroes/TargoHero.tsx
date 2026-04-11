'use client'

import { Phone } from 'lucide-react'

const TARGO_VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260227_042027_c4b2f2ea-1c7c-4d6e-9e3d-81a78063703f.mp4'

export default function TargoHero() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black" style={{ fontFamily: "'Rubik', sans-serif" }}>
      {/* BG video — no overlay, 100% opacity */}
      <video
        src={TARGO_VIDEO}
        muted autoPlay loop playsInline preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 1 }}
      />

      {/* Navbar */}
      <div className="relative z-20 flex items-center justify-between px-8 md:px-16 pt-8">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="6" fill="white" fillOpacity="0.15" />
            <path d="M8 24L16 8L24 24H8Z" fill="white" />
          </svg>
          <span className="text-white font-bold text-2xl tracking-tight uppercase" style={{ letterSpacing: '-0.04em' }}>targo</span>
        </div>

        {/* Center links */}
        <nav className="hidden md:flex items-center gap-8">
          {['Home', 'About', 'Contact Us'].map((item) => (
            <a key={item} href="#" className="text-white/80 hover:text-white text-sm font-medium transition-colors">
              {item}
            </a>
          ))}
        </nav>

        {/* Contact button */}
        <button
          className="targo-btn text-sm font-bold uppercase px-6 py-2.5 text-white"
          style={{ background: '#EE3F2C' }}
        >
          Contact Us
        </button>
      </div>

      {/* Main hero content — upper third, left-aligned */}
      <div className="relative z-10 px-8 md:px-16 pt-16 md:pt-24">
        <h1
          className="text-[42px] md:text-[64px] font-bold uppercase leading-[1.05] text-white mb-8 max-w-xl"
          style={{ letterSpacing: '-0.04em' }}
        >
          Swift and Simple Transport
        </h1>

        <button
          className="targo-btn text-sm font-bold uppercase px-8 py-3.5 text-white"
          style={{ background: '#EE3F2C' }}
        >
          Get Started
        </button>
      </div>

      {/* Bottom left — consultation card */}
      <div className="absolute bottom-10 left-8 md:left-16 z-20 max-w-xs">
        <div className="targo-glass rounded-2xl p-6 relative overflow-hidden">
          {/* Diagonal shine */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%)',
            }}
          />
          <div className="relative">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <Phone size={18} className="text-white" />
              </div>
              <div>
                <p className="text-white text-xs uppercase tracking-widest font-medium">Book a Free</p>
                <p className="text-white/60 text-xs">Consultation</p>
              </div>
            </div>
            <p className="text-white/60 text-xs leading-relaxed mb-4">
              Speak with our logistics experts and discover how targo can transform your supply chain.
            </p>
            <button
              className="targo-btn w-full text-xs font-bold uppercase py-2.5 text-black"
              style={{ background: 'white' }}
            >
              Book a Call
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
