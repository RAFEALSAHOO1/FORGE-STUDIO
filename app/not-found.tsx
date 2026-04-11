'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Flame, ArrowLeft, Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, #89AACC, transparent 70%)' }} />
      </div>

      {/* Giant 404 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, type: 'spring', stiffness: 100 }}
        className="relative mb-2"
      >
        <span
          className="text-[180px] md:text-[260px] leading-none font-bold tracking-tighter select-none"
          style={{
            fontFamily: "'Instrument Serif', serif",
            color: 'transparent',
            WebkitTextStroke: '1px rgba(255,255,255,0.06)',
          }}
        >
          404
        </span>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: 'spring' }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <span
            className="text-[180px] md:text-[260px] leading-none font-bold tracking-tighter select-none"
            style={{
              fontFamily: "'Instrument Serif', serif",
              background: 'linear-gradient(135deg, rgba(137,170,204,0.15), rgba(78,133,191,0.08))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            404
          </span>
        </motion.div>
      </motion.div>

      {/* Message */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-center max-w-lg mb-12"
      >
        <h1
          className="text-3xl md:text-5xl text-white tracking-tight mb-4"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Page not found
        </h1>
        <p className="text-white/40 text-base leading-relaxed">
          The page you&apos;re looking for has been moved, deleted, or never existed. Let&apos;s get you back on track.
        </p>
      </motion.div>

      {/* Action buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="flex flex-wrap items-center justify-center gap-4 mb-16"
      >
        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 bg-white text-black rounded-full px-8 py-3.5 text-sm font-semibold"
          >
            <Home size={16} /> Back to Home
          </motion.button>
        </Link>
        <Link href="/forge">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 liquid-glass rounded-full px-8 py-3.5 text-white text-sm font-medium hover:bg-white/5 transition-colors"
          >
            <Flame size={16} /> Open Forge
          </motion.button>
        </Link>
      </motion.div>

      {/* Helpful links */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="w-full max-w-md"
      >
        <p className="text-white/20 text-xs tracking-widest uppercase text-center mb-6">Popular pages</p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Dashboard',    href: '/dashboard' },
            { label: 'Order Design', href: '/order' },
            { label: 'About Us',     href: '/about' },
            { label: 'Contact',      href: '/contact' },
            { label: 'Admin Panel',  href: '/admin' },
            { label: 'Settings',     href: '/settings' },
          ].map(({ label, href }) => (
            <Link key={label} href={href}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="liquid-glass rounded-xl p-4 text-center text-sm text-white/50 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
              >
                {label}
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Brand mark */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="mt-16 flex items-center gap-2"
      >
        <Flame size={18} className="text-white/20" />
        <span className="text-white/20 text-sm tracking-tight">DesignForge Studio</span>
      </motion.div>
    </div>
  )
}
