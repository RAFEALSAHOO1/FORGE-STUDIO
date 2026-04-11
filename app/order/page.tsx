'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import {
  Image, FileText, CreditCard, Layers, Megaphone,
  Instagram, Package, ChevronRight, ChevronLeft, Check
} from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Checkbox from '@/components/ui/Checkbox'
import UiverseButton from '@/components/ui/UiverseButton'

const SERVICES = [
  { id: 'poster', label: 'Poster', icon: Image, desc: 'Event, sale, party & promotional posters', price: 'From $29' },
  { id: 'invitation', label: 'Invitation', icon: FileText, desc: 'Wedding, birthday & event invitations', price: 'From $39' },
  { id: 'business-card', label: 'Business Card', icon: CreditCard, desc: 'Personal, corporate & luxury cards', price: 'From $19' },
  { id: 'branding', label: 'Brand Kit', icon: Layers, desc: 'Logo, palette, typography & guidelines', price: 'From $149' },
  { id: 'social-media', label: 'Social Media', icon: Instagram, desc: 'Posts, stories, reels & highlights', price: 'From $49' },
  { id: 'flyer', label: 'Flyer / Brochure', icon: Megaphone, desc: 'Business & event flyers, brochures', price: 'From $24' },
  { id: 'menu', label: 'Menu Design', icon: Package, desc: 'Restaurant, café & bar menus', price: 'From $59' },
  { id: 'other', label: 'Other', icon: Package, desc: 'Tell us what you need', price: 'Custom' },
]

const URGENCY = ['Standard (7 days)', 'Express (3 days)', 'Rush (24 hours)']
const URGENCY_PRICES = ['Included', '+$20', '+$60']

const STEPS = ['Service', 'Details', 'Confirm']

export default function OrderPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [selected, setSelected] = useState('')
  const [urgency, setUrgency] = useState(0)
  const [details, setDetails] = useState({
    title: '', description: '', size: '',
    colorScheme: '', notes: '',
    revisions: false, printReady: false, brandGuide: false,
  })

  const canNext = step === 0 ? !!selected : step === 1 ? !!details.title : true

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 pt-10 pb-32">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-12">
          <p className="text-white/40 text-sm tracking-widest uppercase mb-2">New Project</p>
          <h1 className="text-4xl text-white tracking-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Place an Order
          </h1>
        </motion.div>

        {/* Step indicator */}
        <div className="flex items-center gap-0 mb-12">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                i === step ? 'bg-white/10 text-white' :
                i < step ? 'text-[#4ade80]' : 'text-white/30'
              }`}>
                {i < step ? <Check size={14} /> : <span className="w-4 h-4 rounded-full border border-current flex items-center justify-center text-xs">{i+1}</span>}
                {s}
              </div>
              {i < STEPS.length - 1 && <div className="w-8 h-px bg-white/10 mx-1" />}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Step 0 — Service selection */}
          {step === 0 && (
            <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <h2 className="text-white/60 text-sm mb-6">Choose a design service</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {SERVICES.map((svc) => (
                  <motion.button
                    key={svc.id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelected(svc.id)}
                    className={`liquid-glass rounded-2xl p-5 text-left transition-all duration-200 ${
                      selected === svc.id ? 'ring-2 ring-[#89AACC] bg-[#89AACC]/5' : 'hover:bg-white/3'
                    }`}
                  >
                    <svc.icon size={24} className={`mb-3 ${selected === svc.id ? 'text-[#89AACC]' : 'text-white/40'}`} />
                    <p className="text-white text-sm font-medium mb-1">{svc.label}</p>
                    <p className="text-white/40 text-xs leading-relaxed mb-3">{svc.desc}</p>
                    <p className="text-[#89AACC] text-xs font-medium">{svc.price}</p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 1 — Details */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <div className="liquid-glass rounded-3xl p-8 flex flex-col gap-6">
                <h2 className="text-white text-lg font-medium">Project Details</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-white/40 text-xs tracking-widest uppercase block mb-2">Project Title *</label>
                    <input className="auth-input w-full" placeholder="e.g. Summer Music Festival Poster"
                      value={details.title} onChange={e => setDetails({ ...details, title: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-white/40 text-xs tracking-widest uppercase block mb-2">Dimensions / Size</label>
                    <select className="auth-input w-full cursor-pointer" style={{ background: 'rgba(255,255,255,0.05)' }}
                      value={details.size} onChange={e => setDetails({ ...details, size: e.target.value })}>
                      <option style={{ background: '#1a1a2e' }} value="">Select size…</option>
                      {['A4', 'A3', 'A5', 'Square (1:1)', 'Story (9:16)', 'Banner (16:9)', 'Custom'].map(s => (
                        <option key={s} style={{ background: '#1a1a2e' }}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-white/40 text-xs tracking-widest uppercase block mb-2">Description</label>
                  <textarea className="auth-input w-full resize-none" rows={4}
                    placeholder="Describe your vision, tone, style references, target audience…"
                    value={details.description} onChange={e => setDetails({ ...details, description: e.target.value })} />
                </div>

                <div>
                  <label className="text-white/40 text-xs tracking-widest uppercase block mb-2">Color Preferences</label>
                  <input className="auth-input w-full" placeholder="e.g. Dark navy + gold accents, or brand colors: #1A2B3C"
                    value={details.colorScheme} onChange={e => setDetails({ ...details, colorScheme: e.target.value })} />
                </div>

                {/* Urgency */}
                <div>
                  <label className="text-white/40 text-xs tracking-widest uppercase block mb-4">Delivery Speed</label>
                  <div className="grid grid-cols-3 gap-3">
                    {URGENCY.map((u, i) => (
                      <button key={u} onClick={() => setUrgency(i)}
                        className={`p-4 rounded-xl border text-sm text-left transition-all ${
                          urgency === i ? 'border-[#89AACC] bg-[#89AACC]/5 text-white' : 'border-white/10 text-white/50 hover:border-white/20'
                        }`}>
                        <p className="font-medium mb-1">{u}</p>
                        <p className={`text-xs ${urgency === i ? 'text-[#89AACC]' : 'text-white/30'}`}>{URGENCY_PRICES[i]}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Add-ons */}
                <div>
                  <label className="text-white/40 text-xs tracking-widest uppercase block mb-4">Add-ons</label>
                  <div className="flex flex-col gap-4">
                    <Checkbox label="Unlimited revisions (+$15)" checked={details.revisions} onChange={v => setDetails({ ...details, revisions: v })} />
                    <Checkbox label="Print-ready files (+$10)" checked={details.printReady} onChange={v => setDetails({ ...details, printReady: v })} />
                    <Checkbox label="Brand style guide (+$25)" checked={details.brandGuide} onChange={v => setDetails({ ...details, brandGuide: v })} />
                  </div>
                </div>

                <div>
                  <label className="text-white/40 text-xs tracking-widest uppercase block mb-2">Additional Notes</label>
                  <textarea className="auth-input w-full resize-none" rows={3}
                    placeholder="Any other requirements, links, references…"
                    value={details.notes} onChange={e => setDetails({ ...details, notes: e.target.value })} />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2 — Confirm */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <div className="liquid-glass rounded-3xl p-8">
                <h2 className="text-white text-lg font-medium mb-8">Order Summary</h2>
                <div className="flex flex-col gap-4 mb-8">
                  {[
                    ['Service', SERVICES.find(s => s.id === selected)?.label || ''],
                    ['Title', details.title || '—'],
                    ['Size', details.size || 'Not specified'],
                    ['Delivery', URGENCY[urgency]],
                    ['Add-ons', [details.revisions && 'Revisions', details.printReady && 'Print-ready', details.brandGuide && 'Brand guide'].filter(Boolean).join(', ') || 'None'],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between items-start py-3 border-b border-white/5">
                      <span className="text-white/40 text-sm">{k}</span>
                      <span className="text-white text-sm text-right max-w-[60%]">{v}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-white font-medium">Estimated Total</span>
                    <span className="text-[#89AACC] text-xl font-medium" style={{ fontFamily: "'Instrument Serif', serif" }}>$89</span>
                  </div>
                </div>
                <div className="flex justify-center">
                  <UiverseButton text="Place Order" secondText="Processing" onClick={() => router.push('/order-tracking')} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-10">
          <button
            onClick={() => setStep(s => s - 1)}
            disabled={step === 0}
            className="flex items-center gap-2 liquid-glass rounded-full px-6 py-3 text-white/60 text-sm hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={16} /> Back
          </button>
          {step < STEPS.length - 1 && (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              disabled={!canNext}
              onClick={() => setStep(s => s + 1)}
              className="flex items-center gap-2 bg-white text-black rounded-full px-8 py-3 text-sm font-semibold hover:bg-white/90 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Continue <ChevronRight size={16} />
            </motion.button>
          )}
        </div>
      </div>
    </div>
  )
}
