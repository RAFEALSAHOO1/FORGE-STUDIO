'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LoadingScreenProps {
  onComplete: () => void
}

const WORDS = ['Design', 'Create', 'Inspire']

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [wordIndex, setWordIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const onCompleteRef = useRef(onComplete)

  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  /* Rotating words — new word every 900ms, stops at last */
  useEffect(() => {
    if (wordIndex >= WORDS.length - 1) return
    const t = setTimeout(() => setWordIndex((i) => i + 1), 900)
    return () => clearTimeout(t)
  }, [wordIndex])

  /* Counter 000 → 100 over 2700ms using rAF */
  useEffect(() => {
    let raf: number
    const start = performance.now()
    const DURATION = 2700

    const tick = (now: number) => {
      const elapsed = now - start
      const p = Math.min((elapsed / DURATION) * 100, 100)
      setProgress(p)

      if (p < 100) {
        raf = requestAnimationFrame(tick)
      } else {
        setTimeout(() => onCompleteRef.current(), 400)
      }
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col"
      style={{ background: '#0a0a0a' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Portfolio label — top left */}
      <motion.div
        className="absolute top-8 left-8 md:top-12 md:left-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <span
          className="text-xs md:text-sm uppercase tracking-[0.3em]"
          style={{ color: '#888888' }}
        >
          Portfolio
        </span>
      </motion.div>

      {/* Rotating words — center */}
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={wordIndex}
            className="text-4xl md:text-6xl lg:text-7xl italic select-none"
            style={{
              fontFamily: "'Instrument Serif', serif",
              color: 'rgba(245,245,245,0.8)',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            {WORDS[wordIndex]}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Counter — bottom right */}
      <motion.div
        className="absolute bottom-8 right-8 md:bottom-12 md:right-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <span
          className="text-6xl md:text-8xl lg:text-9xl tabular-nums leading-none"
          style={{
            fontFamily: "'Instrument Serif', serif",
            color: '#f5f5f5',
          }}
        >
          {Math.round(progress).toString().padStart(3, '0')}
        </span>
      </motion.div>

      {/* Progress bar — bottom edge */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-[3px] w-full" style={{ background: 'rgba(31,31,31,0.5)' }}>
          <motion.div
            className="h-full origin-left"
            style={{
              background: 'linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)',
              boxShadow: '0 0 8px rgba(137,170,204,0.35)',
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: progress / 100 }}
            transition={{ duration: 0.1, ease: 'linear' }}
          />
        </div>
      </div>
    </motion.div>
  )
}
