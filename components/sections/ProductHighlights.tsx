'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, TrendingUp, Sparkles } from 'lucide-react'
import { CATEGORIES, PRODUCTS, getFeaturedProducts } from '@/lib/products'

export default function ProductHighlights() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const featured = getFeaturedProducts()

  return (
    <section className="bg-black py-28 md:py-36 px-6 overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <p className="text-white/40 text-sm tracking-widest uppercase mb-4">What we make</p>
            <h2
              className="text-4xl md:text-6xl text-white tracking-tight leading-[1.05]"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              50+ premium{' '}
              <em className="italic text-white/40">design services</em>
            </h2>
          </div>
          <Link href="/browse">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 liquid-glass rounded-full px-7 py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors flex-shrink-0"
            >
              Browse all <ArrowRight size={14} />
            </motion.button>
          </Link>
        </motion.div>

        {/* Category grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-16">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.id}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
            >
              <Link href={`/browse?category=${cat.id}`}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.97 }}
                  className="liquid-glass rounded-2xl p-5 cursor-pointer hover:bg-white/4 transition-colors group text-center"
                >
                  <span className="text-3xl block mb-3">{cat.icon}</span>
                  <p className="text-white text-xs font-medium leading-tight">{cat.name}</p>
                  <p className="text-white/30 text-xs mt-1">
                    {PRODUCTS.filter(p => p.category === cat.id).length} services
                  </p>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Featured products strip */}
        <motion.div
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp size={16} className="text-[#89AACC]" />
            <p className="text-white/60 text-sm tracking-widest uppercase">Most popular right now</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featured.slice(0, 8).map((product, i) => (
              <motion.div
                key={product.id}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.06 }}
              >
                <Link href={`/browse/${product.id}`}>
                  <motion.div
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="liquid-glass rounded-2xl p-5 cursor-pointer hover:bg-white/3 transition-colors group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-2xl">{product.icon}</span>
                      {product.new && (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-green-500/15 text-green-400">
                          <Sparkles size={9} /> New
                        </span>
                      )}
                    </div>
                    <p className="text-white text-sm font-medium leading-tight mb-1">{product.name}</p>
                    <p className="text-white/35 text-xs mb-3 leading-relaxed line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-white font-semibold text-sm">From ${product.price}</p>
                      <span className="text-white/20 text-xs">{product.deliveryDays}d</span>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/browse">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-white text-black rounded-full px-10 py-4 text-sm font-semibold hover:bg-white/90 transition-colors"
              >
                View all 50+ services →
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
