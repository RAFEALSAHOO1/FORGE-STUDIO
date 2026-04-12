'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  Search, SlidersHorizontal, X, Star, Sparkles,
  TrendingUp, ChevronRight, Grid3X3, List, ArrowUpRight, Filter
} from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { SkeletonCard } from '@/components/ui/Skeleton'
import { CATEGORIES, PRODUCTS, type Product, type Category, searchProducts } from '@/lib/products'

// ─── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({ product, view }: { product: Product; view: 'grid' | 'list' }) {
  const [hovered, setHovered] = useState(false)

  if (view === 'list') {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="liquid-glass rounded-2xl p-5 flex items-center gap-5 hover:bg-white/3 transition-colors group cursor-pointer"
      >
        <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center text-2xl flex-shrink-0">
          {product.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <p className="text-white font-medium text-sm truncate">{product.name}</p>
            {product.popular && <span className="px-2 py-0.5 rounded-full text-xs bg-[#89AACC]/20 text-[#89AACC] flex-shrink-0">Popular</span>}
            {product.new && <span className="px-2 py-0.5 rounded-full text-xs bg-green-500/20 text-green-400 flex-shrink-0">New</span>}
            {product.premium && <span className="px-2 py-0.5 rounded-full text-xs bg-yellow-500/20 text-yellow-400 flex-shrink-0">Premium</span>}
          </div>
          <p className="text-white/40 text-xs truncate">{product.description}</p>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-white/30 text-xs">{product.deliveryDays} day{product.deliveryDays > 1 ? 's' : ''} delivery</span>
            <span className="text-white/20 text-xs">·</span>
            <span className="text-white/30 text-xs">{product.formats.join(', ')}</span>
          </div>
        </div>
        <div className="flex items-center gap-4 flex-shrink-0">
          <div className="text-right">
            <p className="text-white font-medium">${product.price}</p>
            <p className="text-white/30 text-xs">from</p>
          </div>
          <Link href={`/forge?product=${product.id}`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="liquid-glass rounded-full px-4 py-2 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-all"
            >
              Order →
            </motion.button>
          </Link>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="liquid-glass rounded-3xl overflow-hidden group cursor-pointer flex flex-col"
    >
      {/* Thumbnail */}
      <div className="aspect-[4/3] bg-gradient-to-br from-white/5 to-white/2 flex items-center justify-center relative overflow-hidden">
        <motion.span
          animate={{ scale: hovered ? 1.2 : 1 }}
          transition={{ duration: 0.3 }}
          className="text-5xl"
        >
          {product.icon}
        </motion.span>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {product.popular && (
            <span className="px-2 py-1 rounded-full text-xs bg-[#89AACC]/90 text-white backdrop-blur-sm font-medium">Popular</span>
          )}
          {product.new && (
            <span className="px-2 py-1 rounded-full text-xs bg-green-500/90 text-white backdrop-blur-sm font-medium">New</span>
          )}
          {product.premium && (
            <span className="px-2 py-1 rounded-full text-xs bg-yellow-500/90 text-black backdrop-blur-sm font-medium">Premium</span>
          )}
        </div>
        {/* Hover CTA */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Link href={`/forge?product=${product.id}`}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-black rounded-full px-6 py-2.5 text-sm font-semibold shadow-xl"
                >
                  Customise & Order
                </motion.button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-white text-sm font-medium leading-snug">{product.name}</h3>
          <div className="liquid-glass rounded-full p-1.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowUpRight size={12} className="text-white/60" />
          </div>
        </div>
        <p className="text-white/40 text-xs leading-relaxed mb-4 flex-1">{product.description}</p>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white font-semibold">${product.price}</p>
            <p className="text-white/30 text-xs">{product.deliveryDays}d delivery</p>
          </div>
          <div className="flex gap-1 flex-wrap justify-end">
            {product.formats.slice(0, 2).map(f => (
              <span key={f} className="px-2 py-0.5 rounded-full text-xs bg-white/5 text-white/40">{f}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Category Pill ────────────────────────────────────────────────────────────
function CategoryPill({ cat, active, onClick, count }: { cat: Category; active: boolean; onClick: () => void; count: number }) {
  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium flex-shrink-0 transition-all ${
        active ? 'bg-white text-black' : 'liquid-glass text-white/60 hover:text-white'
      }`}
    >
      <span>{cat.icon}</span>
      <span>{cat.name}</span>
      <span className={`text-xs rounded-full px-1.5 py-0.5 ${active ? 'bg-black/10 text-black' : 'bg-white/10 text-white/40'}`}>
        {count}
      </span>
    </motion.button>
  )
}

// ─── Main Browse Page ─────────────────────────────────────────────────────────
const SORT_OPTIONS = [
  { value: 'default', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'name', label: 'Name A–Z' },
]

const FILTER_OPTIONS = [
  { value: 'all', label: 'All', icon: Grid3X3 },
  { value: 'popular', label: 'Popular', icon: TrendingUp },
  { value: 'new', label: 'New', icon: Sparkles },
  { value: 'premium', label: 'Premium', icon: Star },
]

export default function BrowsePage() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [activeSubcat, setActiveSubcat] = useState<string | null>(null)
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('default')
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [loading, setLoading] = useState(true)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500])
  const [showFilters, setShowFilters] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)

  // Simulate initial load
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(t)
  }, [])

  const filteredProducts = useMemo(() => {
    let results = query.trim() ? searchProducts(query) : [...PRODUCTS]

    if (activeCategory) results = results.filter(p => p.category === activeCategory)
    if (activeSubcat) results = results.filter(p => p.subcategory === activeSubcat)
    if (filter === 'popular') results = results.filter(p => p.popular)
    else if (filter === 'new') results = results.filter(p => p.new)
    else if (filter === 'premium') results = results.filter(p => p.premium)

    results = results.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])

    if (sort === 'price-asc') results.sort((a, b) => a.price - b.price)
    else if (sort === 'price-desc') results.sort((a, b) => b.price - a.price)
    else if (sort === 'name') results.sort((a, b) => a.name.localeCompare(b.name))

    return results
  }, [query, activeCategory, activeSubcat, filter, sort, priceRange])

  const activecat = CATEGORIES.find(c => c.id === activeCategory)

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* Hero header */}
      <div className="max-w-6xl mx-auto px-6 pt-12 pb-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="text-white/40 text-sm tracking-widest uppercase mb-4">Browse</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <h1 className="text-5xl md:text-6xl text-white tracking-tight leading-[1.05]"
              style={{ fontFamily: "'Instrument Serif', serif" }}>
              All Design{' '}
              <em className="italic text-white/40">Services</em>
            </h1>
            <p className="text-white/40 text-sm max-w-xs leading-relaxed">
              {PRODUCTS.length}+ premium design services across {CATEGORIES.length} categories — all custom-made for you.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative max-w-2xl">
            <div className="liquid-glass rounded-2xl flex items-center gap-3 px-5 py-3.5 focus-within:ring-1 focus-within:ring-white/20 transition-all">
              <Search size={18} className="text-white/30 flex-shrink-0" />
              <input
                ref={searchRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search posters, invitations, logos, menus…"
                className="flex-1 bg-transparent text-white placeholder:text-white/30 text-sm outline-none"
              />
              {query && (
                <button onClick={() => setQuery('')} className="text-white/30 hover:text-white transition-colors">
                  <X size={16} />
                </button>
              )}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all ${showFilters ? 'bg-white/15 text-white' : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'}`}
              >
                <Filter size={12} />
                Filters
              </button>
            </div>
            {query && (
              <p className="text-white/30 text-xs mt-2 ml-1">{filteredProducts.length} results for &ldquo;{query}&rdquo;</p>
            )}
          </div>
        </motion.div>
      </div>

      {/* Category strip */}
      <div className="border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-5">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => { setActiveCategory(null); setActiveSubcat(null) }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium flex-shrink-0 transition-all ${
                !activeCategory ? 'bg-white text-black' : 'liquid-glass text-white/60 hover:text-white'
              }`}
            >
              All Categories
              <span className={`text-xs rounded-full px-1.5 py-0.5 ${!activeCategory ? 'bg-black/10 text-black' : 'bg-white/10 text-white/40'}`}>
                {PRODUCTS.length}
              </span>
            </motion.button>
            {CATEGORIES.map(cat => (
              <CategoryPill
                key={cat.id}
                cat={cat}
                active={activeCategory === cat.id}
                onClick={() => { setActiveCategory(activeCategory === cat.id ? null : cat.id); setActiveSubcat(null) }}
                count={PRODUCTS.filter(p => p.category === cat.id).length}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-24">
        {/* Subcategory pills (when category selected) */}
        <AnimatePresence>
          {activecat && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-6"
            >
              <div className="flex gap-2 overflow-x-auto pb-2 pt-4 scrollbar-none border-b border-white/5">
                <button
                  onClick={() => setActiveSubcat(null)}
                  className={`px-4 py-2 rounded-full text-xs flex-shrink-0 transition-all ${!activeSubcat ? 'bg-white/15 text-white' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                >
                  All {activecat.name}
                </button>
                {activecat.subcategories.map(sub => (
                  <button
                    key={sub.id}
                    onClick={() => setActiveSubcat(activeSubcat === sub.id ? null : sub.id)}
                    className={`px-4 py-2 rounded-full text-xs flex-shrink-0 transition-all ${activeSubcat === sub.id ? 'bg-white/15 text-white' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                  >
                    {sub.name}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Advanced filters panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-8"
            >
              <div className="liquid-glass rounded-2xl p-6 mt-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <label className="text-white/40 text-xs tracking-widest uppercase block mb-3">Filter by</label>
                  <div className="flex flex-col gap-2">
                    {FILTER_OPTIONS.map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => setFilter(opt.value)}
                        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-left transition-all ${filter === opt.value ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                      >
                        <opt.icon size={14} />
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-white/40 text-xs tracking-widest uppercase block mb-3">Sort by</label>
                  <div className="flex flex-col gap-2">
                    {SORT_OPTIONS.map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => setSort(opt.value)}
                        className={`px-4 py-2.5 rounded-xl text-sm text-left transition-all ${sort === opt.value ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-white/40 text-xs tracking-widest uppercase block mb-3">
                    Price Range: ${priceRange[0]} – ${priceRange[1]}
                  </label>
                  <div className="flex flex-col gap-4">
                    <input type="range" min={0} max={500} step={10} value={priceRange[1]}
                      onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-full accent-[#89AACC] cursor-pointer" />
                    <div className="flex justify-between text-white/30 text-xs">
                      <span>$0</span><span>$500</span>
                    </div>
                    <button onClick={() => { setFilter('all'); setSort('default'); setPriceRange([0, 500]) }}
                      className="text-white/30 text-xs hover:text-white transition-colors text-left">
                      Reset filters
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results toolbar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <p className="text-white/40 text-sm">
              {loading ? 'Loading…' : `${filteredProducts.length} service${filteredProducts.length !== 1 ? 's' : ''}`}
            </p>
            {(filter !== 'all' || activeCategory || query) && (
              <button
                onClick={() => { setFilter('all'); setActiveCategory(null); setActiveSubcat(null); setQuery('') }}
                className="flex items-center gap-1 text-xs text-white/30 hover:text-white transition-colors"
              >
                <X size={12} /> Clear all
              </button>
            )}
          </div>
          <div className="flex items-center gap-3">
            {/* Sort select */}
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="bg-transparent text-white/50 text-xs outline-none cursor-pointer border border-white/10 rounded-lg px-3 py-2"
              style={{ background: 'rgba(255,255,255,0.03)' }}
            >
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value} style={{ background: '#1a1a2e' }}>{o.label}</option>)}
            </select>
            {/* View toggle */}
            <div className="flex liquid-glass rounded-lg p-1">
              <button onClick={() => setView('grid')} className={`p-1.5 rounded-md transition-colors ${view === 'grid' ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white'}`}>
                <Grid3X3 size={14} />
              </button>
              <button onClick={() => setView('list')} className={`p-1.5 rounded-md transition-colors ${view === 'list' ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white'}`}>
                <List size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Product grid / list */}
        {loading ? (
          <div className={view === 'grid' ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5' : 'flex flex-col gap-3'}>
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} className="h-56" />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-32">
            <p className="text-6xl mb-6">🔍</p>
            <h3 className="text-white text-2xl mb-3" style={{ fontFamily: "'Instrument Serif', serif" }}>
              No designs found
            </h3>
            <p className="text-white/40 text-sm mb-8">Try adjusting your search or filters</p>
            <button
              onClick={() => { setQuery(''); setActiveCategory(null); setFilter('all') }}
              className="liquid-glass rounded-full px-8 py-3 text-white text-sm hover:bg-white/5 transition-colors"
            >
              Clear all filters
            </button>
          </motion.div>
        ) : (
          <motion.div
            layout
            className={view === 'grid'
              ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'
              : 'flex flex-col gap-3'
            }
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} view={view} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Category showcase section (when no filters active) */}
        {!activeCategory && !query && filter === 'all' && !loading && (
          <div className="mt-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mb-12"
            >
              <h2 className="text-3xl text-white mb-3" style={{ fontFamily: "'Instrument Serif', serif" }}>
                Browse by Category
              </h2>
              <p className="text-white/40 text-sm">10 design categories, 50+ services, all custom-made.</p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {CATEGORIES.map((cat, i) => (
                <motion.button
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  whileHover={{ scale: 1.04, y: -4 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { setActiveCategory(cat.id); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                  className="liquid-glass rounded-2xl p-5 text-left hover:bg-white/3 transition-colors group"
                >
                  <span className="text-3xl block mb-3">{cat.icon}</span>
                  <h3 className="text-white text-sm font-medium mb-1 leading-tight">{cat.name}</h3>
                  <p className="text-white/30 text-xs">{PRODUCTS.filter(p => p.category === cat.id).length} services</p>
                  <div className="flex items-center gap-1 mt-3 text-white/20 group-hover:text-white/50 transition-colors text-xs">
                    Browse <ChevronRight size={10} />
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
