'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Flame, Menu, X, ChevronDown, ShoppingBag } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeToggle from '@/components/ui/ThemeToggle'

const navLinks = [
  { label: 'Browse', href: '/browse' },
  { label: 'Forge', href: '/forge' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

const accountLinks = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'New Order', href: '/order' },
  { label: 'Track Order', href: '/order-tracking' },
  { label: 'Profile', href: '/profile' },
  { label: 'Settings', href: '/settings' },
  { label: 'Admin Panel', href: '/admin' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropOpen, setDropOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="relative z-50 px-6 py-6">
      <div className="glass-3d rounded-full max-w-5xl mx-auto px-6 py-3 flex items-center justify-between" style={{ backdropFilter: 'blur(20px)' }}>
        {/* Left — logo + desktop links */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <Flame size={22} className="text-white" />
            <span className="text-white font-semibold text-lg tracking-tight">DesignForge</span>
          </Link>

          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname.startsWith(link.href) && link.href !== '/'
                    ? 'text-white'
                    : 'text-white/65 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Account dropdown */}
            <div className="relative" onMouseLeave={() => setDropOpen(false)}>
              <button
                onClick={() => setDropOpen(!dropOpen)}
                onMouseEnter={() => setDropOpen(true)}
                className="flex items-center gap-1 text-sm font-medium text-white/65 hover:text-white transition-colors"
              >
                Account <ChevronDown size={13} className={`transition-transform ${dropOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {dropOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full mt-3 left-0 glass-3d rounded-2xl py-2 min-w-[175px] shadow-2xl"
                  >
                    {accountLinks.map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        onClick={() => setDropOpen(false)}
                        className={`block px-5 py-2.5 text-sm transition-colors ${
                          pathname === l.href ? 'text-white bg-white/5' : 'text-white/60 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {l.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Right — theme toggle + CTA + mobile */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login" className="text-white/65 text-sm font-medium hover:text-white transition-colors">
              Sign In
            </Link>
            <Link href="/browse">
              <motion.span
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-1.5 liquid-glass rounded-full px-5 py-2 text-white text-sm font-medium hover:bg-white/8 transition-colors cursor-pointer"
              >
                <ShoppingBag size={14} /> Browse
              </motion.span>
            </Link>
          </div>
          <button
            className="md:hidden text-white/80 hover:text-white p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden max-w-5xl mx-auto mt-2"
          >
            <div className="liquid-glass rounded-3xl p-4 flex flex-col gap-1">
              {[...navLinks, ...accountLinks].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 text-sm rounded-xl transition-colors ${
                    pathname === link.href
                      ? 'text-white bg-white/8'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-white/10 mt-2 pt-3 flex gap-3 px-4">
                <Link href="/login" onClick={() => setMobileOpen(false)}
                  className="text-white text-sm font-medium">
                  Sign In
                </Link>
                <Link href="/signup" onClick={() => setMobileOpen(false)}
                  className="liquid-glass rounded-full px-5 py-1.5 text-white text-sm font-medium">
                  Sign Up
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
