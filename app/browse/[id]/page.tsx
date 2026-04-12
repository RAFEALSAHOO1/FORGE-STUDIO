'use client'

import { useState } from "react"
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowLeft, Star, Clock, FileText, CheckCircle,
  Package, Zap, Shield, ChevronDown, ChevronUp
} from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Reviews from '@/components/ui/Reviews'
import { SkeletonCard } from '@/components/ui/Skeleton'
import { PRODUCTS, CATEGORIES, getProductsByCategory } from '@/lib/products'

const URGENCY_OPTIONS = [
  { label: 'Standard', days: 7, extra: 0, icon: Clock },
  { label: 'Express', days: 3, extra: 20, icon: Zap },
  { label: 'Rush', days: 1, extra: 60, icon: Package },
]

export default function ProductPage({ params }: { params: { id: string } }) {
  const { id } = params as unknown as { id: string }
  const product = PRODUCTS.find(p => p.id === id)
  const [urgency, setUrgency] = useState(0)
  const [faqOpen, setFaqOpen] = useState<number | null>(null)

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-4">🔍</p>
          <h1 className="text-white text-2xl mb-4">Product not found</h1>
          <Link href="/browse" className="liquid-glass rounded-full px-6 py-3 text-white text-sm">
            Browse all →
          </Link>
        </div>
      </div>
    )
  }

  const category = CATEGORIES.find(c => c.id === product.category)
  const related = getProductsByCategory(product.category).filter(p => p.id !== product.id).slice(0, 4)
  const totalPrice = product.price + URGENCY_OPTIONS[urgency].extra

  const FAQS = [
    { q: 'How do I provide my requirements?', a: 'After ordering, you\'ll fill in a detailed brief form. You can also upload reference images, share links, and specify colors, fonts, and style preferences.' },
    { q: 'What file formats will I receive?', a: `You'll receive ${product.formats.join(', ')} files. All files are high-resolution and print-ready unless otherwise stated.` },
    { q: 'How many revisions do I get?', a: 'Standard orders include 2 revision rounds. Unlimited revisions are available as an add-on for $15.' },
    { q: 'Can I request a different size?', a: 'Yes! We offer custom sizing. Select "Custom" in the size options or specify your exact dimensions in the notes field.' },
    { q: 'What if I\'m not happy with the result?', a: 'We offer revisions within scope and a 7-day satisfaction period. If we can\'t meet your brief, we\'ll issue a refund per our policy.' },
  ]

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 pt-8 pb-24">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-white/30 text-sm mb-8">
          <Link href="/browse" className="hover:text-white transition-colors flex items-center gap-1">
            <ArrowLeft size={14} /> Browse
          </Link>
          <span>/</span>
          <Link href={`/browse?category=${product.category}`} className="hover:text-white transition-colors">
            {category?.name}
          </Link>
          <span>/</span>
          <span className="text-white/60">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left — preview + details */}
          <div className="lg:col-span-3 flex flex-col gap-8">
            {/* Hero preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="liquid-glass rounded-3xl overflow-hidden aspect-[4/3] flex items-center justify-center relative"
            >
              <motion.span
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="text-8xl select-none"
              >
                {product.icon}
              </motion.span>
              {/* Corner badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                {product.popular && <span className="px-3 py-1 rounded-full text-xs bg-[#89AACC]/90 text-white font-medium">Popular</span>}
                {product.new && <span className="px-3 py-1 rounded-full text-xs bg-green-500/90 text-white font-medium">New</span>}
                {product.premium && <span className="px-3 py-1 rounded-full text-xs bg-yellow-500/90 text-black font-medium">Premium</span>}
              </div>
              <div className="absolute bottom-4 right-4">
                <span className="text-white/30 text-xs">Preview illustration</span>
              </div>
            </motion.div>

            {/* What's included */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="liquid-glass rounded-3xl p-7"
            >
              <h3 className="text-white font-medium mb-5">What&apos;s included</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  `Custom ${product.name} design`,
                  `${product.formats.join(' + ')} files`,
                  `${product.deliveryDays}-day delivery`,
                  '2 revision rounds',
                  'Direct designer communication',
                  'Brand-matched design',
                  ...product.sizes.slice(0, 2).map(s => `${s} size included`),
                  'Commercial usage rights',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <CheckCircle size={14} className="text-[#89AACC] flex-shrink-0" />
                    <span className="text-white/65 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Sizes & formats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="liquid-glass rounded-3xl p-7"
            >
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-white/40 text-xs tracking-widest uppercase mb-4">Available Sizes</p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map(s => (
                      <span key={s} className="px-3 py-1.5 rounded-lg bg-white/5 text-white/60 text-xs">{s}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-white/40 text-xs tracking-widest uppercase mb-4">File Formats</p>
                  <div className="flex flex-wrap gap-2">
                    {product.formats.map(f => (
                      <span key={f} className="px-3 py-1.5 rounded-lg bg-[#89AACC]/10 text-[#89AACC] text-xs font-medium">{f}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {product.tags.map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full text-xs bg-white/5 text-white/30 capitalize">{tag}</span>
              ))}
            </div>

            {/* FAQ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="liquid-glass rounded-3xl p-7"
            >
              <h3 className="text-white font-medium mb-6">Frequently asked questions</h3>
              <div className="flex flex-col gap-3">
                {FAQS.map((faq, i) => (
                  <div key={i} className="border-b border-white/5 last:border-0 pb-3 last:pb-0">
                    <button
                      onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                      className="flex items-center justify-between w-full text-left gap-4 py-1"
                    >
                      <span className="text-white/80 text-sm">{faq.q}</span>
                      {faqOpen === i ? <ChevronUp size={14} className="text-white/40 flex-shrink-0" /> : <ChevronDown size={14} className="text-white/40 flex-shrink-0" />}
                    </button>
                    {faqOpen === i && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="text-white/45 text-sm leading-relaxed mt-2 pb-1"
                      >
                        {faq.a}
                      </motion.p>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Reviews section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="liquid-glass rounded-3xl p-7"
            >
              <h3 className="text-white font-medium mb-8">Customer reviews</h3>
              <Reviews compact />
            </motion.div>
          </div>

          {/* Right — order panel */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 flex flex-col gap-5">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="liquid-glass rounded-3xl p-7"
              >
                <h1 className="text-white text-2xl font-medium mb-1 leading-snug" style={{ fontFamily: "'Instrument Serif', serif" }}>
                  {product.name}
                </h1>
                <p className="text-white/50 text-sm leading-relaxed mb-6">{product.description}</p>

                {/* Star summary */}
                <div className="flex items-center gap-2 mb-6">
                  {[1,2,3,4,5].map(i => <Star key={i} size={14} className={i <= 5 ? 'text-yellow-400 fill-yellow-400' : 'text-white/20'} />)}
                  <span className="text-white/40 text-xs">5.0 (12 reviews)</span>
                </div>

                {/* Urgency selector */}
                <p className="text-white/40 text-xs tracking-widest uppercase mb-3">Delivery Speed</p>
                <div className="flex flex-col gap-2 mb-7">
                  {URGENCY_OPTIONS.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => setUrgency(i)}
                      className={`flex items-center justify-between p-4 rounded-2xl border text-sm transition-all ${
                        urgency === i
                          ? 'border-[#89AACC] bg-[#89AACC]/8 text-white'
                          : 'border-white/8 text-white/50 hover:border-white/20 hover:text-white/80'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <opt.icon size={15} className={urgency === i ? 'text-[#89AACC]' : 'text-white/30'} />
                        <span className="font-medium">{opt.label}</span>
                        <span className={`text-xs ${urgency === i ? 'text-[#89AACC]/70' : 'text-white/30'}`}>
                          {opt.days} day{opt.days > 1 ? 's' : ''}
                        </span>
                      </div>
                      <span className={urgency === i ? 'text-[#89AACC]' : 'text-white/30'}>
                        {opt.extra > 0 ? `+$${opt.extra}` : 'Included'}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Price */}
                <div className="flex items-end justify-between mb-6 pb-6 border-b border-white/8">
                  <div>
                    <p className="text-white/30 text-xs mb-1">Total price</p>
                    <p className="text-white text-4xl font-light" style={{ fontFamily: "'Instrument Serif', serif" }}>
                      ${totalPrice}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/30 text-xs">Delivery in</p>
                    <p className="text-white text-sm font-medium">{URGENCY_OPTIONS[urgency].days} day{URGENCY_OPTIONS[urgency].days > 1 ? 's' : ''}</p>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col gap-3">
                  <Link href={`/forge?product=${product.id}`}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-white text-black rounded-full py-3.5 text-sm font-semibold hover:bg-white/90 transition-colors"
                    >
                      Customise & Order
                    </motion.button>
                  </Link>
                  <Link href={`/order?product=${product.id}&urgency=${urgency}`}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full liquid-glass rounded-full py-3.5 text-white text-sm font-medium hover:bg-white/5 transition-colors"
                    >
                      Quick Order →
                    </motion.button>
                  </Link>
                </div>

                {/* Trust badges */}
                <div className="grid grid-cols-2 gap-3 mt-6">
                  {[
                    { icon: Shield, label: '100% satisfaction' },
                    { icon: CheckCircle, label: 'Verified designers' },
                    { icon: FileText, label: 'Full ownership' },
                    { icon: Clock, label: 'On-time delivery' },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-2">
                      <Icon size={13} className="text-[#89AACC] flex-shrink-0" />
                      <span className="text-white/40 text-xs">{label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Category info */}
              {category && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="liquid-glass rounded-2xl p-5"
                >
                  <p className="text-white/30 text-xs tracking-widest uppercase mb-2">Category</p>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{category.icon}</span>
                    <div>
                      <p className="text-white text-sm font-medium">{category.name}</p>
                      <p className="text-white/30 text-xs">{category.description}</p>
                    </div>
                  </div>
                  <Link href={`/browse?category=${category.id}`} className="text-[#89AACC] text-xs mt-3 inline-block hover:underline">
                    Browse all {category.name} →
                  </Link>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl text-white mb-8 tracking-tight"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              You might also like
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {related.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                >
                  <Link href={`/browse/${p.id}`}>
                    <motion.div
                      whileHover={{ y: -4, scale: 1.02 }}
                      className="liquid-glass rounded-2xl p-5 cursor-pointer hover:bg-white/3 transition-colors"
                    >
                      <span className="text-3xl block mb-3">{p.icon}</span>
                      <p className="text-white text-sm font-medium mb-1">{p.name}</p>
                      <p className="text-white/40 text-xs mb-3">{p.description.slice(0, 55)}…</p>
                      <p className="text-white font-medium">${p.price}</p>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
