'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LivePreviewProps {
  text: string
  color: string
  fontFamily: string
  fontSize: number
  background: string
  productType: string
  icon: string
}

// Particle: values computed at creation, never recalculated in render
interface ParticleData {
  id: number
  x: number
  y: number
  scale: number
  duration: number
}

function ForgeParticle({ color, p }: { color: string; p: ParticleData }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ background: color, width: 6, height: 6, left: '50%', top: '50%' }}
      initial={{ x: 0, y: 0, scale: p.scale, opacity: 1 }}
      animate={{ x: p.x, y: p.y, scale: 0, opacity: 0 }}
      transition={{ duration: p.duration, ease: 'easeOut' }}
    />
  )
}

export function ForgeEffect({ active, color }: { active: boolean; color: string }) {
  const [particles, setParticles] = useState<ParticleData[]>([])
  const counterRef = useRef(0)

  useEffect(() => {
    if (!active) return
    const id = setInterval(() => {
      const n = counterRef.current++
      // All random values computed here, never in render body
      const particle: ParticleData = {
        id: n,
        x: (Math.random() - 0.5) * 280,
        y: -(Math.random() * 180 + 40),
        scale: Math.random() * 0.8 + 0.2,
        duration: Math.random() * 1.4 + 0.7,
      }
      setParticles(prev => [...prev.slice(-14), particle])
    }, 100)
    return () => clearInterval(id)
  }, [active])

  if (!active) return null
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map(p => <ForgeParticle key={p.id} color={color} p={p} />)}
    </div>
  )
}

export function LiveDesignPreview({ text, color, fontFamily, fontSize, background, productType, icon }: LivePreviewProps) {
  const [prevText, setPrevText] = useState(text)
  const [isForging, setIsForging] = useState(false)

  useEffect(() => {
    if (text !== prevText) {
      setIsForging(true)
      const t = setTimeout(() => { setIsForging(false); setPrevText(text) }, 550)
      return () => clearTimeout(t)
    }
  }, [text, prevText])

  const aspectClass =
    productType === 'business-card' ? 'aspect-[1.75/1]' :
    productType === 'social'        ? 'aspect-square max-h-72' :
    productType === 'invitation'    ? 'aspect-[2/3]' :
    'aspect-[3/4]'

  return (
    <div className={`relative ${aspectClass} mx-auto`} style={{ maxWidth: 300 }}>
      <motion.div
        className="absolute inset-0 rounded-2xl overflow-hidden"
        style={{ background }}
        animate={{
          boxShadow: isForging
            ? `0 0 40px ${color}55, 0 20px 60px rgba(0,0,0,0.8)`
            : '0 20px 60px rgba(0,0,0,0.7)',
        }}
        transition={{ duration: 0.4 }}
      >
        {/* Shine */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 50%)' }} />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 gap-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={text + fontFamily + fontSize}
              initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
              transition={{ duration: 0.3 }}
              className="text-center w-full break-words"
              style={{
                fontFamily: `'${fontFamily}', serif`,
                fontSize: Math.min(fontSize, 72) * 0.55,
                color,
                lineHeight: 1.2,
              }}
            >
              {text || `${icon} ${productType.replace(/-/g, ' ')}`}
            </motion.div>
          </AnimatePresence>

          <motion.div className="h-px rounded-full" style={{ background: color, opacity: 0.35 }}
            animate={{ width: isForging ? '75%' : '55%' }} transition={{ duration: 0.4 }} />

          <div className="flex gap-2 opacity-25">
            {[38, 55, 38].map((w, i) => (
              <motion.div key={i} className="h-1 rounded-full" style={{ width: w, background: color }}
                animate={{ opacity: isForging ? [0.25, 0.7, 0.25] : 0.25 }}
                transition={{ duration: 0.6, delay: i * 0.1 }} />
            ))}
          </div>
        </div>

        <AnimatePresence>
          {isForging && (
            <motion.div className="absolute inset-0 rounded-2xl"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ boxShadow: `inset 0 0 30px ${color}28` }} />
          )}
        </AnimatePresence>
      </motion.div>

      <ForgeEffect active={isForging} color={color} />

      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-5 rounded-full blur-xl opacity-35 pointer-events-none"
        style={{ background: color }} />
    </div>
  )
}

export function ColorSwatch({ color, selected, onClick }: { color: string; selected: boolean; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.18, zIndex: 10 }}
      whileTap={{ scale: 0.9 }}
      className="aspect-square rounded-lg relative"
      title={color}
      style={{
        background: color,
        width: '100%',
        boxShadow: selected ? `0 0 0 2px white, 0 0 0 4px ${color}` : undefined,
      }}
    />
  )
}

export function ForgeSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="aspect-[3/4] rounded-2xl bg-white/5 mx-auto w-full max-w-xs animate-shimmer" />
      <div className="h-4 w-2/3 rounded-full bg-white/5" />
      <div className="h-3 w-1/2 rounded-full bg-white/5" />
    </div>
  )
}
