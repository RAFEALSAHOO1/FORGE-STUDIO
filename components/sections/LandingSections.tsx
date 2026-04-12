'use client'

import { useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

/* ──────────────────────────────────────────────────────────
   ABOUT SECTION
────────────────────────────────────────────────────────── */
export function AboutSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      ref={ref}
      className="bg-black pt-32 md:pt-44 pb-10 md:pb-14 px-6 overflow-hidden relative"
    >
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.03)_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <motion.p
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-white/40 text-sm tracking-widest uppercase mb-6"
        >
          About Us
        </motion.p>

        <motion.h2
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl text-white leading-[1.1] tracking-tight max-w-4xl"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Pioneering{' '}
          <em className="italic text-white/60">ideas</em> for
          <br className="hidden md:block" />
          {' '}minds that{' '}
          <em className="italic text-white/60">create, build, and inspire.</em>
        </motion.h2>
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────────────────────
   FEATURED VIDEO SECTION
────────────────────────────────────────────────────────── */
const FEATURED_VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4'

export function FeaturedVideoSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="bg-black pt-6 md:pt-10 pb-20 md:pb-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.9 }}
          className="rounded-3xl overflow-hidden aspect-video relative"
        >
          <video
            src={FEATURED_VIDEO}
            muted
            autoPlay
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

          {/* Bottom overlay content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 flex flex-col md:flex-row items-end gap-6">
            {/* Left card */}
            <div className="glass-3d rounded-2xl p-6 md:p-8 max-w-md backdrop-blur-xl">
              <p className="text-white/50 text-xs tracking-widest uppercase mb-3">Our Approach</p>
              <p className="text-white text-sm md:text-base leading-relaxed">
                We believe in the power of curiosity-driven exploration. Every project starts with a
                question, and every answer opens a new door to innovation.
              </p>
            </div>

            {/* Right CTA */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass-3d rounded-full px-8 py-3 text-white text-sm font-medium flex-shrink-0 hover:bg-white/10 transition-all backdrop-blur-xl shadow-lg"
            >
              Explore more
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────────────────────
   PHILOSOPHY SECTION
────────────────────────────────────────────────────────── */
const PHILOSOPHY_VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4'

export function PhilosophySection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="bg-black py-28 md:py-40 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Heading */}
        <motion.h2
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl text-white tracking-tight mb-16 md:mb-24"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Innovation{' '}
          <em className="italic text-white/40">x</em>{' '}
          Vision
        </motion.h2>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Left — video */}
          <motion.div
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="rounded-3xl overflow-hidden aspect-[4/3]"
          >
            <video
              src={PHILOSOPHY_VIDEO}
              muted
              autoPlay
              loop
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Right — text */}
          <motion.div
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col justify-center gap-8"
          >
            {/* Block 1 */}
            <div>
              <p className="text-white/40 text-xs tracking-widest uppercase mb-4">Choose your space</p>
              <p className="text-white/70 text-base md:text-lg leading-relaxed">
                Every meaningful breakthrough begins at the intersection of disciplined strategy
                and remarkable creative vision. We operate at that crossroads, turning bold
                thinking into tangible outcomes that move people and reshape industries.
              </p>
            </div>

            <div className="w-full h-px bg-white/10" />

            {/* Block 2 */}
            <div>
              <p className="text-white/40 text-xs tracking-widest uppercase mb-4">Shape the future</p>
              <p className="text-white/70 text-base md:text-lg leading-relaxed">
                We believe that the best work emerges when curiosity meets conviction. Our
                process is designed to uncover hidden opportunities and translate them into
                experiences that resonate long after the first impression.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────────────────────
   SERVICES SECTION
────────────────────────────────────────────────────────── */
const SERVICE_CARDS = [
  {
    video: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4',
    tag: 'Strategy',
    title: 'Research & Insight',
    description: 'We dig deep into data, culture, and human behavior to surface the insights that drive meaningful, lasting change.',
    href: '/browse?category=research',
  },
  {
    video: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4',
    tag: 'Craft',
    title: 'Design & Execution',
    description: 'From concept to launch, we obsess over every detail to deliver experiences that feel effortless and look extraordinary.',
    href: '/forge',
  },
]

export function ServicesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const router = useRouter()

  return (
    <section className="bg-black py-28 md:py-40 px-6 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02)_0%,_transparent_60%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Header row */}
        <motion.div
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="flex items-center justify-between mb-12 md:mb-16"
        >
          <h2
            className="text-3xl md:text-5xl text-white tracking-tight"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            What we do
          </h2>
          <span className="hidden md:block text-white/40 text-sm tracking-widest uppercase">Our services</span>
        </motion.div>

        {/* Service cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {SERVICE_CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              onClick={() => router.push(card.href)}
              className="water-morph rounded-3xl overflow-hidden group cursor-pointer transition-all hover:shadow-2xl"
            >
              {/* Video */}
              <div className="aspect-video relative overflow-hidden">
                <video
                  src={card.video}
                  muted
                  autoPlay
                  loop
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              {/* Body */}
              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-white/40 text-xs tracking-widest uppercase">{card.tag}</span>
                  <div className="glow-morph rounded-full p-2 transition-all hover:shadow-lg">
                    <ArrowUpRight size={16} className="text-white/60" />
                  </div>
                </div>
                <h3
                  className="text-white text-xl md:text-2xl mb-3 tracking-tight"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  {card.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">{card.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────────────────────
   CTA SECTION
────────────────────────────────────────────────────────── */
export function CTASection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="bg-black py-28 md:py-40 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="glass-deep rounded-3xl p-12 md:p-20 text-center backdrop-blur-xl shadow-2xl"
        >
          <p className="text-white/40 text-xs tracking-widest uppercase mb-6">Start your journey</p>
          <h2
            className="text-4xl md:text-6xl text-white tracking-tight mb-8 max-w-2xl mx-auto leading-[1.1]"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Ready to forge something{' '}
            <em className="italic text-white/60">extraordinary?</em>
          </h2>
          <p className="text-white/50 text-base leading-relaxed max-w-xl mx-auto mb-10">
            Join hundreds of businesses that trust DesignForge Studio to bring their visual ideas to life.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <motion.a
              href="/forge"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="bg-white text-black rounded-full px-10 py-4 text-sm font-semibold hover:bg-white/90 transition-colors shadow-lg"
            >
              Start Forging
            </motion.a>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="glass-3d rounded-full px-10 py-4 text-white text-sm font-medium hover:bg-white/10 transition-all backdrop-blur-xl"
            >
              Talk to Us
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
