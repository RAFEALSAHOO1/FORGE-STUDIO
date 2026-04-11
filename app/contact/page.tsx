'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Instagram, Twitter, Globe } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 pt-16 pb-32">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <p className="text-white/40 text-sm tracking-widest uppercase mb-6">Get in touch</p>
          <h1
            className="text-5xl md:text-7xl text-white tracking-tight leading-[1.05] max-w-3xl"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Let&apos;s build something{' '}
            <em className="italic text-white/50">remarkable.</em>
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="auth-container">
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/40 text-xs tracking-widest uppercase block mb-2">Name</label>
                    <input
                      className="auth-input"
                      placeholder="Your name"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-white/40 text-xs tracking-widest uppercase block mb-2">Email</label>
                    <input
                      type="email"
                      className="auth-input"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-white/40 text-xs tracking-widest uppercase block mb-2">Service needed</label>
                  <select
                    className="auth-input cursor-pointer"
                    value={form.service}
                    onChange={e => setForm({ ...form, service: e.target.value })}
                    style={{ background: 'rgba(255,255,255,0.05)' }}
                  >
                    <option value="" style={{ background: '#1a1a2e' }}>Select a service…</option>
                    {['Posters', 'Invitations', 'Business Cards', 'Logo & Branding', 'Social Media Content', 'Flyers & Brochures', 'Menu Design', 'Full Brand Kit'].map(s => (
                      <option key={s} value={s} style={{ background: '#1a1a2e' }}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-white/40 text-xs tracking-widest uppercase block mb-2">Message</label>
                  <textarea
                    className="auth-input resize-none"
                    placeholder="Describe your project…"
                    rows={5}
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    required
                    style={{ height: 'auto' }}
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="auth-login-button flex items-center justify-center gap-2 mt-2"
                >
                  {sent ? (
                    <span>Message Sent ✓</span>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col gap-8"
          >
            {[
              { icon: Mail, label: 'Email', value: 'hello@designforge.studio' },
              { icon: Phone, label: 'Phone', value: '+1 (555) 000-FORGE' },
              { icon: MapPin, label: 'Location', value: 'Remote — Worldwide' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="liquid-glass rounded-2xl p-6 flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                  <Icon size={20} className="text-[#89AACC]" />
                </div>
                <div>
                  <p className="text-white/40 text-xs tracking-widest uppercase mb-1">{label}</p>
                  <p className="text-white text-sm">{value}</p>
                </div>
              </div>
            ))}

            {/* Social */}
            <div className="liquid-glass rounded-2xl p-6">
              <p className="text-white/40 text-xs tracking-widest uppercase mb-5">Follow our work</p>
              <div className="flex gap-3">
                {[Instagram, Twitter, Globe].map((Icon, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
                  >
                    <Icon size={18} />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Response time */}
            <div className="liquid-glass rounded-2xl p-6">
              <p className="text-white/40 text-xs tracking-widest uppercase mb-3">Response time</p>
              <p className="text-white text-2xl font-light mb-1" style={{ fontFamily: "'Instrument Serif', serif" }}>
                Within 24 hours
              </p>
              <p className="text-white/40 text-sm">We reply to every message, every time.</p>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
