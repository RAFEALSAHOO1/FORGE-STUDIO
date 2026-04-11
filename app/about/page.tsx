'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const TEAM = [
  { name: 'Alex Rivera', role: 'Creative Director', initials: 'AR' },
  { name: 'Priya Mehta', role: 'Lead Designer', initials: 'PM' },
  { name: 'Jordan Cole', role: 'Brand Strategist', initials: 'JC' },
  { name: 'Sam Torres', role: 'Motion Artist', initials: 'ST' },
]

const VALUES = [
  { title: 'Precision', desc: 'Every pixel is intentional. Every decision deliberate.' },
  { title: 'Curiosity', desc: 'We ask questions others overlook to find answers that matter.' },
  { title: 'Craft', desc: 'Premium materials, premium execution — always.' },
  { title: 'Clarity', desc: 'Great design communicates without confusion.' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* Hero */}
      <section className="px-6 pt-20 pb-32 max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-white/40 text-sm tracking-widest uppercase mb-8"
        >
          About DesignForge Studio
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl text-white tracking-tight leading-[1.05] max-w-4xl mb-12"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          We turn bold ideas into{' '}
          <em className="italic text-white/50">visual masterpieces.</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-white/50 text-lg leading-relaxed max-w-2xl"
        >
          DesignForge Studio is a premium design service built for brands, businesses, and
          individuals who refuse to settle for ordinary. We specialize in custom visual design
          solutions — from posters and invitations to full brand identity systems.
        </motion.p>
      </section>

      {/* Values */}
      <section className="px-6 py-24 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-5xl text-white tracking-tight mb-16"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            What we stand for
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                whileHover={{ scale: 1.02 }}
                className="liquid-glass rounded-3xl p-8"
              >
                <p className="text-white/40 text-xs tracking-widest uppercase mb-4">0{i + 1}</p>
                <h3
                  className="text-white text-2xl mb-4 tracking-tight"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  {v.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="px-6 py-24 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-5xl text-white tracking-tight mb-16"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            The team
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="liquid-glass rounded-2xl p-6 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#89AACC] to-[#4E85BF] flex items-center justify-center text-xl font-semibold text-white mx-auto mb-4">
                  {member.initials}
                </div>
                <p className="text-white text-sm font-medium">{member.name}</p>
                <p className="text-white/40 text-xs mt-1">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 py-24 border-t border-white/5">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '500+', label: 'Projects delivered' },
            { value: '98%', label: 'Client satisfaction' },
            { value: '3 days', label: 'Average turnaround' },
            { value: '50+', label: 'Design categories' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <p
                className="text-4xl md:text-5xl text-white mb-2"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                {stat.value}
              </p>
              <p className="text-white/40 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
