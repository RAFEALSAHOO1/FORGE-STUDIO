'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-[0.03]"
          style={{ background: 'radial-gradient(circle, #f87171, transparent 70%)' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-20 h-20 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-8"
      >
        <AlertTriangle size={36} className="text-red-400" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-center max-w-lg mb-10"
      >
        <h1
          className="text-4xl md:text-5xl text-white tracking-tight mb-4"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Something went wrong
        </h1>
        <p className="text-white/40 text-base leading-relaxed mb-4">
          An unexpected error occurred. Don&apos;t worry — your work is safe. Try refreshing or go back to the home page.
        </p>
        {error?.digest && (
          <p className="text-white/20 text-xs font-mono">Error ID: {error.digest}</p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="flex flex-wrap gap-4 justify-center"
      >
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => reset()}
          className="flex items-center gap-2 bg-white text-black rounded-full px-8 py-3.5 text-sm font-semibold"
        >
          <RefreshCw size={16} /> Try Again
        </motion.button>
        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 liquid-glass rounded-full px-8 py-3.5 text-white text-sm font-medium hover:bg-white/5 transition-colors"
          >
            <Home size={16} /> Go Home
          </motion.button>
        </Link>
      </motion.div>
    </div>
  )
}
