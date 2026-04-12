'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react'
import Link from 'next/link'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log to analytics / Sentry in production
    console.error('[GlobalError]', error)
  }, [error])

  return (
    <html lang="en">
      <body className="bg-[#0a0a0a] text-[#f5f5f5] min-h-screen flex flex-col items-center justify-center px-6"
        style={{ fontFamily: "'Inter', sans-serif" }}>

        {/* Animated background glow */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-[0.04]"
            style={{ background: 'radial-gradient(circle, #f87171, transparent 70%)' }} />
        </div>

        {/* Error icon */}
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="w-24 h-24 rounded-3xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-8"
        >
          <AlertTriangle size={44} className="text-red-400" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center max-w-lg mb-10"
        >
          <h1 className="text-4xl md:text-5xl text-white tracking-tight mb-4"
            style={{ fontFamily: "'Instrument Serif', serif" }}>
            Unexpected Error
          </h1>
          <p className="text-white/40 text-base leading-relaxed mb-3">
            Something broke on our end. Don&apos;t worry — your work is safe. Our team has been notified.
          </p>
          {error?.message && (
            <p className="text-red-400/60 text-sm font-mono bg-red-500/5 rounded-xl px-4 py-2 inline-block">
              {error.message.slice(0, 120)}
            </p>
          )}
          {error?.digest && (
            <p className="text-white/15 text-xs font-mono mt-2">ID: {error.digest}</p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="flex flex-wrap gap-4 justify-center mb-12"
        >
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => reset()}
            className="flex items-center gap-2 bg-white text-black rounded-full px-8 py-3.5 text-sm font-semibold"
          >
            <RefreshCw size={15} /> Try Again
          </motion.button>
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 rounded-full border border-white/15 px-8 py-3.5 text-white text-sm font-medium hover:bg-white/5 transition-colors"
            >
              <Home size={15} /> Go Home
            </motion.button>
          </Link>
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 rounded-full border border-red-500/20 px-8 py-3.5 text-red-400 text-sm font-medium hover:bg-red-500/5 transition-colors"
            >
              <Bug size={15} /> Report Bug
            </motion.button>
          </Link>
        </motion.div>

        {/* Status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center gap-2 text-white/20 text-xs"
        >
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Other services are operational · Status: designforge.studio/status
        </motion.div>
      </body>
    </html>
  )
}
