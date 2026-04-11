'use client'

import { motion } from 'framer-motion'

interface PageLoadingProps {
  text?: string
}

export default function PageLoading({ text = 'Loading…' }: PageLoadingProps) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-8">
      {/* Cube loader */}
      <div className="cube-loader">
        <div className="cube-top" />
        <div className="cube-wrapper">
          {[0, 1, 2, 3].map(i => (
            <span key={i} style={{ '--i': i } as React.CSSProperties} className="cube-span" />
          ))}
        </div>
      </div>

      <motion.p
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-white/40 text-sm tracking-widest uppercase"
      >
        {text}
      </motion.p>
    </div>
  )
}

export function InlineLoader({ size = 20 }: { size?: number }) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      className="rounded-full border-2 border-white/20 border-t-white/70 flex-shrink-0"
      style={{ width: size, height: size }}
    />
  )
}

export function PulseLoader({ count = 3 }: { count?: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
          className="w-2 h-2 rounded-full bg-[#89AACC]"
        />
      ))}
    </div>
  )
}
