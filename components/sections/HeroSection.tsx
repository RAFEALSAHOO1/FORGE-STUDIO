'use client'

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Globe, Instagram, Twitter } from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'

const DARK_VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4'

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)

  /* Seamless crossfade loop — vanilla rAF per spec */
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.style.opacity = '0'

    const fadeIn = () => {
      const start = performance.now()
      const tick = (now: number) => {
        const t = Math.min((now - start) / 500, 1)
        if (video) video.style.opacity = String(t)
        if (t < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }

    const fadeOut = (then: () => void) => {
      const startVal = parseFloat(video.style.opacity)
      const start = performance.now()
      const tick = (now: number) => {
        const t = Math.min((now - start) / 500, 1)
        if (video) video.style.opacity = String(startVal * (1 - t))
        if (t < 1) requestAnimationFrame(tick)
        else then()
      }
      requestAnimationFrame(tick)
    }

    const handleCanPlay = () => {
      video.play()
      fadeIn()
    }

    const handleTimeUpdate = () => {
      if (!video.duration) return
      const remaining = video.duration - video.currentTime
      if (remaining <= 0.55 && parseFloat(video.style.opacity) > 0.5) {
        video.style.opacity = '0.5'
      }
    }

    const handleEnded = () => {
      fadeOut(() => {
        if (!video) return
        video.currentTime = 0
        video.play()
        setTimeout(fadeIn, 100)
      })
    }

    video.addEventListener('canplay', handleCanPlay)
    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('ended', handleEnded)

    return () => {
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('ended', handleEnded)
    }
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col">
      {/* Background video */}
      <video
        ref={videoRef}
        src={DARK_VIDEO}
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover object-bottom"
        style={{ opacity: 0 }}
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />

      {/* Navbar */}
      <div className="relative z-20">
        <Navbar />
      </div>

      {/* Hero content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 text-center -translate-y-[10%]">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="text-7xl md:text-8xl lg:text-9xl text-white tracking-tight whitespace-nowrap mb-10"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Forge it then{' '}
          <em className="italic" style={{ color: 'rgba(255,255,255,0.7)' }}>all.</em>
        </motion.h1>

        {/* Email pill input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="max-w-xl w-full mb-5"
        >
          <div className="liquid-glass rounded-full pl-6 pr-2 py-2 flex items-center gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-transparent text-white placeholder:text-white/40 text-sm outline-none"
            />
            <button className="bg-white rounded-full p-3 text-black hover:bg-white/90 transition-colors flex-shrink-0">
              <ArrowRight size={20} />
            </button>
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-white/60 text-sm leading-relaxed max-w-sm mb-8"
        >
          Stay updated with the latest news and insights. Subscribe to our newsletter today and never miss out on exciting updates.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="flex flex-wrap items-center gap-4 justify-center"
        >
          <Link href="/forge">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors"
            >
              Start Forging
            </motion.button>
          </Link>
          <Link href="/about">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors"
            >
              Our Manifesto
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Social icons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 1 }}
        className="relative z-10 flex justify-center gap-4 pb-12"
      >
        {[Instagram, Twitter, Globe].map((Icon, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all"
          >
            <Icon size={20} />
          </motion.button>
        ))}
      </motion.div>
    </div>
  )
}
