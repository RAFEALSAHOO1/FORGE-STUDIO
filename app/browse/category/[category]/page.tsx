'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, Star, Zap } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { CATEGORIES, PRODUCTS, getCategoryById, getProductsByCategory } from '@/lib/products'

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = getCategoryById(params.category)
  const products = useMemo(() => getProductsByCategory(params.category), [params.category])

  if (!category) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-4">🔍</p>
          <h1 className="text-white text-2xl mb-4">Category not found</h1>
          <Link href="/browse" className="liquid-glass rounded-full px-6 py-3 text-white text-sm">Browse all →</Link>
        </div>
      </div>
    )
  }

  const popular  = products.filter(p => p.popular)
  const newItems = products.filter(p => p.new)
  const premium  = products.filter(p => p.premium)

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* Hero */}
      <div className="max-w-6xl mx-auto px-6 pt-10 pb-16">
        <Link href="/browse" className="flex items-center gap-2 text-white/30 hover:text-white text-sm mb-8 transition-colors w-fit">
          <ArrowLeft size={14} /> Browse all
        </Link>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-16">
          <div className="flex items-center gap-5 mb-6">
            <span className="text-6xl">{category.icon}</span>
            <div>
              <h1 className="text-5xl md:text-6xl text-white tracking-tight leading-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
                {category.name}
              </h1>
              <p className="text-white/40 text-base mt-2">{category.description}</p>
            </div>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-6">
            {[
              { label: 'Services', value: products.length },
              { label: 'Popular', value: popular.length },
              { label: 'New arrivals', value: newItems.length },
              { label: 'Premium', value: premium.length },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-white text-2xl font-light" style={{ fontFamily: "'Instrument Serif', serif" }}>{value}</p>
                <p className="text-white/30 text-xs">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Subcategories nav */}
        {category.subcategories.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-2 mb-12 scrollbar-none">
            {category.subcategories.map(sub => (
              <button key={sub.id}
                className="px-4 py-2 rounded-full text-sm flex-shrink-0 liquid-glass text-white/60 hover:text-white transition-colors">
                {sub.name}
              </button>
            ))}
          </div>
        )}

        {/* Products grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.map((product, i) => (
            <motion.div key={product.id}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.45 }}
              whileHover={{ y: -5, scale: 1.02 }}>
              <Link href={`/browse/${product.id}`}>
                <div className="liquid-glass rounded-3xl overflow-hidden group cursor-pointer flex flex-col h-full hover:bg-white/3 transition-colors">
                  {/* Thumb */}
                  <div className="aspect-[4/3] flex items-center justify-center relative bg-gradient-to-br from-white/4 to-white/2 overflow-hidden">
                    <motion.span animate={{ y: [0,-6,0] }} transition={{ duration:3, repeat:Infinity, ease:'easeInOut', delay:i*0.2 }}
                      className="text-5xl select-none">{product.icon}</motion.span>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      {product.popular && <span className="px-2 py-0.5 rounded-full text-xs bg-[#89AACC]/90 text-white font-medium">Popular</span>}
                      {product.new     && <span className="px-2 py-0.5 rounded-full text-xs bg-green-500/90 text-white font-medium">New</span>}
                      {product.premium && <span className="px-2 py-0.5 rounded-full text-xs bg-yellow-500/90 text-black font-medium">Premium</span>}
                    </div>
                    {/* Hover CTA */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="bg-white text-black rounded-full px-5 py-2 text-xs font-semibold shadow-xl">Order Now</span>
                    </div>
                  </div>
                  {/* Info */}
                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-white text-sm font-medium leading-snug">{product.name}</h3>
                      <ArrowUpRight size={12} className="text-white/20 group-hover:text-white/50 transition-colors mt-0.5 flex-shrink-0" />
                    </div>
                    <p className="text-white/35 text-xs leading-relaxed mb-3 flex-1 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-white font-semibold">${product.price}</p>
                      <span className="text-white/25 text-xs">{product.deliveryDays}d delivery</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}
          className="mt-20 liquid-glass rounded-3xl p-12 text-center">
          <span className="text-5xl block mb-4">{category.icon}</span>
          <h2 className="text-3xl text-white mb-3" style={{ fontFamily:"'Instrument Serif', serif" }}>
            Need a custom {category.name.toLowerCase()} design?
          </h2>
          <p className="text-white/40 text-sm mb-8 max-w-md mx-auto">
            Tell us exactly what you need and our designers will craft it from scratch — matched perfectly to your brand.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href={`/forge?category=${category.id}`}>
              <motion.button whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}
                className="bg-white text-black rounded-full px-10 py-4 text-sm font-semibold">
                Open The Forge →
              </motion.button>
            </Link>
            <Link href="/contact">
              <motion.button whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}
                className="liquid-glass rounded-full px-10 py-4 text-white text-sm font-medium hover:bg-white/5 transition-colors">
                Talk to a Designer
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}
