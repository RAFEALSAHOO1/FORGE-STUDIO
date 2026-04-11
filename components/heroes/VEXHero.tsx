'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const VEX_VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4'

/* Animated heading: char-by-char entrance */
function AnimatedHeading({ text, delay = 200, charDelay = 30 }: { text: string; delay?: number; charDelay?: number }) {
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  const lines = text.split('\n')

  return (
    <h1
      className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal mb-4"
      style={{ letterSpacing: '-0.04em', fontFamily: "'Inter', sans-serif" }}
    >
      {lines.map((line, lineIdx) => (
        <span key={lineIdx} className="block">
          {line.split('').map((char, charIdx) => {
            const totalPrev = lines.slice(0, lineIdx).reduce((s, l) => s + l.length, 0)
            const animDelay = (totalPrev + charIdx) * charDelay
            return (
              <span
                key={charIdx}
                className="inline-block transition-all"
                style={{
                  opacity: animated ? 1 : 0,
                  transform: animated ? 'translateX(0)' : 'translateX(-18px)',
                  transitionDuration: '500ms',
                  transitionDelay: `${animDelay}ms`,
                  whiteSpace: char === ' ' ? 'pre' : undefined,
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            )
          })}
        </span>
      ))}
    </h1>
  )
}

/* FadeIn helper */
function FadeIn({ delay, duration = 1000, children }: { delay: number; duration?: number; children: React.ReactNode }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(t)
  }, [delay])
  return (
    <div
      className="transition-opacity"
      style={{ opacity: visible ? 1 : 0, transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  )
}

export default function VEXHero() {
  return (
    <div
      className="relative min-h-screen overflow-hidden bg-black text-white"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* BG video — NO overlay, NO dimming */}
      <video
        src={VEX_VIDEO}
        muted autoPlay loop playsInline preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col min-h-screen px-6 md:px-12 lg:px-16 pt-6">
        {/* Navbar */}
        <div className="glass-deep rounded-xl px-4 py-2 flex items-center justify-between backdrop-blur-lg">
          <span className="text-2xl font-semibold tracking-tight text-white">VEX</span>

          {/* Center links */}
          <nav className="hidden md:flex items-center gap-8">
            {['Story', 'Investing', 'Building', 'Advisory'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm text-white/80 hover:text-gray-300 transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <button className="bg-white text-black px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
            Start a Chat
          </button>
        </div>

        {/* Hero content — bottom of viewport */}
        <div className="flex-1 flex flex-col justify-end pb-12 lg:pb-16">
          <div className="lg:grid lg:grid-cols-2 lg:items-end gap-8">
            {/* Left column */}
            <div>
              <AnimatedHeading text={"Shaping tomorrow\nwith vision and action."} delay={200} charDelay={30} />

              <FadeIn delay={800} duration={1000}>
                <p className="text-base md:text-lg text-gray-300 mb-5 max-w-lg">
                  We back visionaries and craft ventures that define what comes next.
                </p>
              </FadeIn>

              <FadeIn delay={1200} duration={1000}>
                <div className="flex flex-wrap gap-4">
                  <button className="bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                    Start a Chat
                  </button>
                  <button className="liquid-glass-dark border border-white/20 text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-black transition-all">
                    Explore Now
                  </button>
                </div>
              </FadeIn>
            </div>

            {/* Right column — tag */}
            <div className="flex items-end justify-start lg:justify-end mt-8 lg:mt-0">
              <FadeIn delay={1400} duration={1000}>
                <div className="liquid-glass-dark border border-white/20 px-6 py-3 rounded-xl">
                  <span className="text-lg md:text-xl lg:text-2xl font-light text-white">
                    Investing. Building. Advisory.
                  </span>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
