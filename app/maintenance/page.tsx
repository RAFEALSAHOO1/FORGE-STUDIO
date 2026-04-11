'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Flame, Wrench, Clock } from 'lucide-react'

function Countdown({ target }: { target: Date }) {
  const [diff, setDiff] = useState(0)

  useEffect(() => {
    const tick = () => setDiff(Math.max(0, target.getTime() - Date.now()))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [target])

  const h = Math.floor(diff / 3600000)
  const m = Math.floor((diff % 3600000) / 60000)
  const s = Math.floor((diff % 60000) / 1000)
  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <div className="flex items-center gap-4">
      {[{ v: h, l: 'Hours' }, { v: m, l: 'Minutes' }, { v: s, l: 'Seconds' }].map(({ v, l }) => (
        <div key={l} className="text-center">
          <div className="liquid-glass rounded-2xl w-20 h-20 flex items-center justify-center mb-2">
            <span className="text-3xl text-white font-mono tabular-nums">{pad(v)}</span>
          </div>
          <p className="text-white/30 text-xs tracking-widest uppercase">{l}</p>
        </div>
      ))}
    </div>
  )
}

const RETURN_TIME = new Date(Date.now() + 4 * 3600 * 1000) // 4 hours from now

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #89AACC, transparent 70%)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #4E85BF, transparent 70%)' }} />
      </div>

      {/* Cube loader */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <div className="cube-loader">
          <div className="cube-top" />
          <div className="cube-wrapper">
            {[0, 1, 2, 3].map(i => (
              <span key={i} style={{ '--i': i } as React.CSSProperties} className="cube-span" />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="flex items-center gap-3 mb-8"
      >
        <Flame size={28} className="text-white" />
        <span className="text-white font-semibold text-2xl tracking-tight">DesignForge Studio</span>
      </motion.div>

      {/* Message */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="text-center max-w-xl mb-12"
      >
        <div className="flex items-center justify-center gap-3 mb-6">
          <Wrench size={20} className="text-[#89AACC]" />
          <span className="text-white/50 text-sm tracking-widest uppercase">Under Maintenance</span>
        </div>

        <h1
          className="text-4xl md:text-6xl text-white tracking-tight leading-[1.1] mb-6"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          We&apos;re forging something{' '}
          <em className="italic text-white/50">better.</em>
        </h1>

        <p className="text-white/40 text-base leading-relaxed">
          Our studio is temporarily offline for scheduled maintenance. We&apos;re upgrading our systems to
          serve you with an even better experience. We&apos;ll be back shortly.
        </p>
      </motion.div>

      {/* Countdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mb-12"
      >
        <div className="flex items-center justify-center gap-2 mb-6 text-white/30 text-sm">
          <Clock size={14} />
          <span>Estimated return time</span>
        </div>
        <Countdown target={RETURN_TIME} />
      </motion.div>

      {/* Email notify */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="w-full max-w-sm"
      >
        <p className="text-white/30 text-sm text-center mb-4">Get notified when we&apos;re back</p>
        <div className="liquid-glass rounded-full pl-6 pr-2 py-2 flex items-center gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 bg-transparent text-white placeholder:text-white/30 text-sm outline-none"
          />
          <button className="bg-white rounded-full px-5 py-2 text-black text-sm font-medium hover:bg-white/90 transition-colors flex-shrink-0">
            Notify Me
          </button>
        </div>
      </motion.div>

      {/* Status items */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-xl w-full"
      >
        {[
          { label: 'Design Engine', status: 'Upgrading', color: '#f7e479' },
          { label: 'Payment System', status: 'Operational', color: '#4ade80' },
          { label: 'Customer Portal', status: 'Upgrading', color: '#f7e479' },
        ].map(({ label, status, color }) => (
          <div key={label} className="liquid-glass rounded-2xl p-4 flex items-center justify-between">
            <p className="text-white/50 text-xs">{label}</p>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: color }} />
              <span className="text-xs" style={{ color }}>{status}</span>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
