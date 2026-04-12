'use client'

import { useState, useCallback, useEffect, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import { RotateCcw, Sliders, Type, Palette, AlignLeft, SlidersHorizontal, Layers, Check } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Checkbox from '@/components/ui/Checkbox'
import UiverseButton from '@/components/ui/UiverseButton'
import { LiveDesignPreview } from '@/components/ui/ForgeAnimations'
import { InlineLoader } from '@/components/ui/PageLoading'
import {
  COLOR_CATEGORIES, getColorsByCategory, searchColors, getTotalColorCount, type ColorEntry,
} from '@/lib/colors'
import {
  getAllFonts, searchFonts, getPopularFonts, loadFont, FONT_CATEGORIES, type FontEntry,
} from '@/lib/fonts'
import { PRODUCTS, CATEGORIES } from '@/lib/products'

// ─── Product strip config ─────────────────────────────────────────────────────
const PRODUCT_STRIP = [
  { id:'poster',         label:'Poster',         emoji:'🖼️',  sizes:['A4','A3','A2','Square','Custom'] },
  { id:'invitation',     label:'Invitation',     emoji:'💌',  sizes:['5×7"','4×6"','Square','A5','Custom'] },
  { id:'business-card',  label:'Business Card',  emoji:'💼',  sizes:['3.5×2"','Square','Mini','Custom'] },
  { id:'brand-kit',      label:'Brand Kit',      emoji:'🎯',  sizes:['Full Kit','Logo Only','Color + Type'] },
  { id:'social',         label:'Social Media',   emoji:'📱',  sizes:['Post 1:1','Story 9:16','Cover','Banner'] },
  { id:'flyer',          label:'Flyer',          emoji:'📄',  sizes:['A5','A4','DL','Half-page'] },
  { id:'menu',           label:'Menu',           emoji:'🍽️', sizes:['A4 Portrait','A4 Landscape','Trifold'] },
]

const ADDONS = [
  { id:'hires',     label:'High-res 300dpi export' },
  { id:'bleed',     label:'Bleed & crop marks (print)' },
  { id:'dark',      label:'Dark mode variant' },
  { id:'light',     label:'Light mode variant' },
  { id:'editable',  label:'Editable source file (AI/PSD)' },
  { id:'revisions', label:'Unlimited revisions (+$15)' },
]

type PanelTab = 'product' | 'text' | 'colors' | 'fonts' | 'options' | 'notes'

const PANEL_TABS: { id: PanelTab; label: string; icon: React.ElementType }[] = [
  { id:'product', label:'Product',  icon:Layers },
  { id:'text',    label:'Text',     icon:Type },
  { id:'colors',  label:'Colors',   icon:Palette },
  { id:'fonts',   label:'Fonts',    icon:AlignLeft },
  { id:'options', label:'Options',  icon:Sliders },
  { id:'notes',   label:'Notes',    icon:SlidersHorizontal },
]

// ─── Virtualized color grid — renders only visible rows ──────────────────────
const SWATCH_SIZE = 28
const SWATCHES_PER_ROW = 8
const ROW_HEIGHT = SWATCH_SIZE + 4

interface VirtualColorGridProps {
  colors: ColorEntry[]
  selected: string
  onSelect: (hex: string) => void
}

function VirtualColorGrid({ colors, selected, onSelect }: VirtualColorGridProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollTop, setScrollTop] = useState(0)
  const visibleRows = 8
  const totalRows = Math.ceil(colors.length / SWATCHES_PER_ROW)
  const startRow = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - 2)
  const endRow   = Math.min(totalRows, startRow + visibleRows + 4)

  const visibleColors = useMemo(() => {
    const start = startRow * SWATCHES_PER_ROW
    const end   = endRow   * SWATCHES_PER_ROW
    return colors.slice(start, end).map((c, i) => ({ ...c, idx: start + i }))
  }, [colors, startRow, endRow])

  return (
    <div
      ref={containerRef}
      onScroll={e => setScrollTop((e.target as HTMLDivElement).scrollTop)}
      className="overflow-y-auto scrollbar-none rounded-xl"
      style={{ height: visibleRows * ROW_HEIGHT + 12 }}
    >
      {/* Spacer for rows above */}
      <div style={{ height: startRow * ROW_HEIGHT }} />
      <div className="grid px-1" style={{ gridTemplateColumns: `repeat(${SWATCHES_PER_ROW}, 1fr)`, gap: 4 }}>
        {visibleColors.map(color => (
          <button
            key={color.idx}
            onClick={() => onSelect(color.hex)}
            title={`${color.name} — ${color.hex}`}
            className="rounded-md transition-transform hover:scale-110 hover:z-10 relative"
            style={{
              background: color.hex,
              width: SWATCH_SIZE,
              height: SWATCH_SIZE,
              boxShadow: selected === color.hex ? '0 0 0 2px white, 0 0 0 4px ' + color.hex : undefined,
              transform: selected === color.hex ? 'scale(1.15)' : undefined,
            }}
          />
        ))}
      </div>
      {/* Spacer for rows below */}
      <div style={{ height: (totalRows - endRow) * ROW_HEIGHT }} />
    </div>
  )
}

// ─── Virtualized font list ────────────────────────────────────────────────────
interface VirtualFontListProps {
  fonts: FontEntry[]
  selected: string
  onSelect: (family: string) => void
}

function VirtualFontList({ fonts, selected, onSelect }: VirtualFontListProps) {
  const ITEM_H = 52
  const VISIBLE = 8
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollTop, setScrollTop] = useState(0)
  const startIdx = Math.max(0, Math.floor(scrollTop / ITEM_H) - 2)
  const endIdx   = Math.min(fonts.length, startIdx + VISIBLE + 4)
  const visible  = fonts.slice(startIdx, endIdx).map((f, i) => ({ ...f, idx: startIdx + i }))

  return (
    <div
      ref={containerRef}
      onScroll={e => setScrollTop((e.target as HTMLDivElement).scrollTop)}
      className="overflow-y-auto scrollbar-none rounded-xl border border-white/8"
      style={{ height: VISIBLE * ITEM_H }}
    >
      <div style={{ height: startIdx * ITEM_H }} />
      {visible.map(font => (
        <button
          key={font.idx}
          onClick={() => { onSelect(font.family); loadFont(font.family) }}
          className={`w-full px-4 py-2.5 text-sm text-left border-b border-white/5 last:border-0 transition-colors flex items-center justify-between gap-3 ${selected === font.family ? 'bg-white/10 text-white' : 'text-white/55 hover:bg-white/5 hover:text-white'}`}
          style={{ height: ITEM_H }}
        >
          <span>{font.family}</span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${font.popular ? 'bg-[#89AACC]/20 text-[#89AACC]' : 'bg-white/5 text-white/25'}`}>
            {font.popular ? '⭐' : font.category.slice(0, 4)}
          </span>
        </button>
      ))}
      <div style={{ height: (fonts.length - endIdx) * ITEM_H }} />
    </div>
  )
}

// ─── Main Forge Page ──────────────────────────────────────────────────────────
function ForgePageInner(): import("react").JSX.Element {
  const router      = useRouter()
  const qp          = useSearchParams()
  const [product, setProduct]         = useState(PRODUCT_STRIP[0])
  const [size, setSize]               = useState(PRODUCT_STRIP[0].sizes[0])
  const [panelTab, setPanelTab]       = useState<PanelTab>('product')
  const [textContent, setTextContent] = useState('')
  const [color, setColor]             = useState('#89AACC')
  const [hexInput, setHexInput]       = useState('#89AACC')
  const [font, setFont]               = useState('Playfair Display')
  const [fontSize, setFontSize]       = useState(48)
  const [bgColor, setBgColor]         = useState('#1a1a1a')
  const [addons, setAddons]           = useState<Record<string, boolean>>({})
  const [notes, setNotes]             = useState('')
  const [colorCat, setColorCat]       = useState('brand')
  const [colorSearch, setColorSearch] = useState('')
  const [fontSearch, setFontSearch]   = useState('')
  const [fontCat, setFontCat]         = useState<string>('all')
  const [saving, setSaving]           = useState(false)
  const [saved, setSaved]             = useState(false)
  const [rotation, setRotation]       = useState(0)
  const totalColors = useMemo(() => getTotalColorCount(), [])

  // On mount, pre-load selected font
  useEffect(() => { loadFont(font) }, [font])

  // From URL params
  useEffect(() => {
    const pid = qp.get('product')
    if (pid) {
      const found = PRODUCT_STRIP.find(p => p.id === pid)
      if (found) { setProduct(found); setSize(found.sizes[0]) }
    }
  }, [qp])

  // Color list
  const colorList = useMemo<ColorEntry[]>(() => {
    if (colorSearch.trim()) return searchColors(colorSearch, 500)
    return getColorsByCategory(colorCat)
  }, [colorCat, colorSearch])

  // Font list
  const fontList = useMemo<FontEntry[]>(() => {
    if (fontSearch.trim()) return searchFonts(fontSearch, 200)
    if (fontCat === 'popular') return getPopularFonts()
    if (fontCat === 'all') return getAllFonts().slice(0, 500)
    return getAllFonts().filter(f => f.category === fontCat).slice(0, 300)
  }, [fontSearch, fontCat])

  const handleSave = useCallback(async () => {
    setSaving(true)
    try {
      await fetch('/api/designs', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ productId:product.id, productName:product.label,
          textContent, primaryColor:color, fontFamily:font, fontSize, size,
          addons: Object.keys(addons).filter(k=>addons[k]), notes }),
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch { /* silent */ } finally { setSaving(false) }
  }, [product, textContent, color, font, fontSize, size, addons, notes])

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-6 pb-16">

        {/* Header */}
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.5}} className="mb-6">
          <p className="text-white/40 text-xs tracking-widest uppercase mb-1">Design Studio</p>
          <h1 className="text-4xl text-white tracking-tight" style={{fontFamily:"'Instrument Serif', serif"}}>The Forge</h1>
        </motion.div>

        {/* Product strip */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {PRODUCT_STRIP.map(p=>(
            <motion.button key={p.id} whileHover={{scale:1.04}} whileTap={{scale:0.96}}
              onClick={()=>{setProduct(p);setSize(p.sizes[0])}}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium flex-shrink-0 transition-all ${product.id===p.id?'bg-white text-black':'liquid-glass text-white/60 hover:text-white'}`}>
              <span>{p.emoji}</span>{p.label}
            </motion.button>
          ))}
        </div>

        {/* Main: preview + panel */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6">

          {/* 3D Preview */}
          <motion.div initial={{opacity:0,scale:0.97}} animate={{opacity:1,scale:1}} transition={{duration:0.5}}
            className="liquid-glass rounded-3xl overflow-hidden flex flex-col" style={{minHeight:520}}>
            {/* Toolbar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
              <div className="flex items-center gap-3">
                <span className="text-white/40 text-sm">{product.emoji} {product.label}</span>
                <span className="text-white/20 text-sm">·</span>
                <select value={size} onChange={e=>setSize(e.target.value)}
                  className="bg-transparent text-white/60 text-sm outline-none cursor-pointer">
                  {product.sizes.map(s=><option key={s} value={s} style={{background:'#111'}}>{s}</option>)}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white/25 text-xs">BG</span>
                <input type="color" value={bgColor} onChange={e=>setBgColor(e.target.value)} className="w-7 h-7 rounded cursor-pointer border-0 bg-transparent" title="Background color"/>
                <motion.button whileHover={{scale:1.1}} onClick={()=>setRotation(r=>(r+90)%360)}
                  className="liquid-glass rounded-xl p-2 text-white/40 hover:text-white transition-colors">
                  <RotateCcw size={14}/>
                </motion.button>
                <motion.button whileHover={{scale:1.1}} onClick={handleSave}
                  disabled={saving}
                  className={`liquid-glass rounded-xl px-4 py-2 text-sm transition-all ${saved?'text-green-400':'text-white/60 hover:text-white'}`}>
                  {saving?<InlineLoader size={14}/>:saved?<><Check size={14}/> Saved</>:<>Save</>}
                </motion.button>
              </div>
            </div>
            {/* Canvas */}
            <div className="flex-1 flex items-center justify-center p-8">
              <LiveDesignPreview
                text={textContent}
                color={color}
                fontFamily={font}
                fontSize={fontSize}
                background={bgColor}
                productType={product.id}
                icon={product.emoji}
              />
            </div>
            <div className="px-6 py-3 border-t border-white/5 flex justify-between items-center">
              <p className="text-white/20 text-xs">Live preview · Not final design</p>
              <p className="text-white/15 text-xs font-mono">{color} · {font.slice(0,20)}</p>
            </div>
          </motion.div>

          {/* Customization Panel */}
          <motion.div initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} transition={{duration:0.5,delay:0.1}}
            className="liquid-glass rounded-3xl overflow-hidden flex flex-col" style={{maxHeight:'85vh',position:'sticky',top:24}}>
            {/* Tabs */}
            <div className="flex overflow-x-auto border-b border-white/5 scrollbar-none flex-shrink-0">
              {PANEL_TABS.map(({id,label,icon:Icon})=>(
                <button key={id} onClick={()=>setPanelTab(id)}
                  className={`flex items-center gap-1.5 px-4 py-3 text-xs font-medium flex-shrink-0 transition-all border-b-2 ${panelTab===id?'border-[#89AACC] text-white':'border-transparent text-white/40 hover:text-white'}`}>
                  <Icon size={11}/>{label}
                </button>
              ))}
            </div>

            {/* Panel body — scrollable */}
            <div className="overflow-y-auto flex-1 p-5 scrollbar-none">
              <AnimatePresence mode="wait">
                <motion.div key={panelTab} initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-6}} transition={{duration:0.15}}>

                  {/* ── Product tab ── */}
                  {panelTab==='product' && (
                    <div className="flex flex-col gap-4">
                      <div className="grid grid-cols-2 gap-2">
                        {PRODUCT_STRIP.map(p=>(
                          <button key={p.id} onClick={()=>{setProduct(p);setSize(p.sizes[0])}}
                            className={`flex items-center gap-2 p-3 rounded-xl text-sm text-left transition-all ${product.id===p.id?'bg-white/10 text-white ring-1 ring-[#89AACC]/40':'bg-white/4 text-white/50 hover:text-white hover:bg-white/8'}`}>
                            <span>{p.emoji}</span>{p.label}
                          </button>
                        ))}
                      </div>
                      <label className="text-white/40 text-xs uppercase tracking-widest mt-2">Size</label>
                      <div className="grid grid-cols-1 gap-1">
                        {product.sizes.map(s=>(
                          <button key={s} onClick={()=>setSize(s)}
                            className={`px-4 py-2.5 rounded-xl text-sm text-left transition-all ${size===s?'bg-white/10 text-white':'text-white/45 hover:bg-white/5 hover:text-white'}`}>
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ── Text tab ── */}
                  {panelTab==='text' && (
                    <div className="flex flex-col gap-5">
                      <div>
                        <label className="text-white/40 text-xs uppercase tracking-widest block mb-2">Main Text</label>
                        <textarea className="auth-input w-full resize-none text-sm" rows={3}
                          placeholder="Your headline text…" value={textContent} onChange={e=>setTextContent(e.target.value)}/>
                      </div>
                      <div>
                        <label className="text-white/40 text-xs uppercase tracking-widest block mb-2">Font Size: {fontSize}px</label>
                        <input type="range" min={12} max={120} value={fontSize} onChange={e=>setFontSize(Number(e.target.value))}
                          className="w-full accent-[#89AACC] cursor-pointer"/>
                      </div>
                      <div>
                        <label className="text-white/40 text-xs uppercase tracking-widest block mb-2">Text Alignment</label>
                        <div className="flex gap-2">
                          {['Left','Center','Right'].map(a=>(
                            <button key={a} className="flex-1 py-2 rounded-lg text-xs text-white/50 bg-white/5 hover:bg-white/10 hover:text-white transition-all">{a}</button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── Colors tab — virtualized 25,000 colors ── */}
                  {panelTab==='colors' && (
                    <div className="flex flex-col gap-4">
                      {/* Selected color */}
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl ring-2 ring-white/15 flex-shrink-0 transition-all" style={{background:color}}/>
                        <div>
                          <p className="text-white font-mono text-sm">{color}</p>
                          <p className="text-white/30 text-xs">{totalColors.toLocaleString()} colors available</p>
                        </div>
                        <input type="color" value={color} onChange={e=>{setColor(e.target.value);setHexInput(e.target.value)}}
                          className="ml-auto w-10 h-10 rounded-lg cursor-pointer border-0 bg-transparent" title="Color picker"/>
                      </div>

                      {/* Hex input */}
                      <div className="flex gap-2">
                        <input className="auth-input flex-1 font-mono text-sm" placeholder="#000000" maxLength={7}
                          value={hexInput}
                          onChange={e=>{
                            const v=e.target.value; setHexInput(v)
                            if(/^#[0-9a-fA-F]{6}$/.test(v)) setColor(v)
                          }}/>
                        <button onClick={()=>setColor(hexInput)}
                          className="px-4 rounded-xl bg-white/8 text-white text-sm hover:bg-white/15 transition-colors">Apply</button>
                      </div>

                      {/* Category selector */}
                      <div className="flex flex-wrap gap-1.5">
                        {COLOR_CATEGORIES.map(cat=>(
                          <button key={cat.id} onClick={()=>{setColorCat(cat.id);setColorSearch('')}}
                            className={`px-3 py-1.5 rounded-full text-xs transition-all ${colorCat===cat.id?'bg-white/15 text-white':'text-white/35 hover:text-white hover:bg-white/8'}`}>
                            {cat.label}
                          </button>
                        ))}
                      </div>

                      {/* Search */}
                      <input className="auth-input text-sm" placeholder="Search colors…" value={colorSearch} onChange={e=>setColorSearch(e.target.value)}/>

                      {/* Showing count */}
                      <p className="text-white/20 text-xs">{colorSearch ? `${Math.min(colorList.length,500)} results` : `${colorList.length.toLocaleString()} ${COLOR_CATEGORIES.find(c=>c.id===colorCat)?.label} colors`}</p>

                      {/* Virtualized grid — smooth, zero lag */}
                      <VirtualColorGrid colors={colorList} selected={color} onSelect={hex=>{setColor(hex);setHexInput(hex)}}/>
                    </div>
                  )}

                  {/* ── Fonts tab — virtualized 10,000 fonts ── */}
                  {panelTab==='fonts' && (
                    <div className="flex flex-col gap-4">
                      {/* Preview */}
                      <div className="rounded-xl bg-white/4 p-4" style={{fontFamily:`'${font}', serif`}}>
                        <p className="text-white text-2xl mb-1" style={{fontFamily:`'${font}', serif`}}>Aa Bb Cc 123</p>
                        <p className="text-white/40 text-sm">The quick brown fox jumps</p>
                      </div>
                      <p className="text-[#89AACC] text-xs font-medium">{font}</p>

                      {/* Search */}
                      <input className="auth-input text-sm" placeholder="Search 10,000+ fonts…"
                        value={fontSearch} onChange={e=>setFontSearch(e.target.value)}/>

                      {/* Categories */}
                      <div className="flex flex-wrap gap-1.5">
                        <button onClick={()=>setFontCat('all')} className={`px-3 py-1.5 rounded-full text-xs transition-all ${fontCat==='all'?'bg-white/15 text-white':'text-white/35 hover:text-white hover:bg-white/8'}`}>All</button>
                        <button onClick={()=>setFontCat('popular')} className={`px-3 py-1.5 rounded-full text-xs transition-all ${fontCat==='popular'?'bg-white/15 text-white':'text-white/35 hover:text-white hover:bg-white/8'}`}>⭐ Popular</button>
                        {FONT_CATEGORIES.map(fc=>(
                          <button key={fc.id} onClick={()=>setFontCat(fc.id)}
                            className={`px-3 py-1.5 rounded-full text-xs transition-all ${fontCat===fc.id?'bg-white/15 text-white':'text-white/35 hover:text-white hover:bg-white/8'}`}>
                            {fc.label} <span className="text-white/20">{fc.count.toLocaleString()}</span>
                          </button>
                        ))}
                      </div>

                      <p className="text-white/20 text-xs">{fontList.length.toLocaleString()} fonts shown · 10,000 total</p>

                      {/* Virtualized list — smooth */}
                      <VirtualFontList fonts={fontList} selected={font} onSelect={f=>{setFont(f);loadFont(f)}}/>
                    </div>
                  )}

                  {/* ── Options tab ── */}
                  {panelTab==='options' && (
                    <div className="flex flex-col gap-5">
                      <label className="text-white/40 text-xs uppercase tracking-widest">Add-ons</label>
                      <div className="flex flex-col gap-4">
                        {ADDONS.map(({id,label})=>(
                          <Checkbox key={id} label={label} checked={!!addons[id]} onChange={v=>setAddons(p=>({...p,[id]:v}))}/>
                        ))}
                      </div>
                      <div className="border-t border-white/8 pt-5">
                        <label className="text-white/40 text-xs uppercase tracking-widest block mb-4">Design Style</label>
                        <div className="grid grid-cols-2 gap-2">
                          {['Minimal','Bold','Elegant','Playful','Modern','Classic','Luxury','Retro'].map(s=>(
                            <button key={s} className="py-2 rounded-lg text-xs text-white/45 bg-white/4 hover:bg-white/10 hover:text-white transition-all">{s}</button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── Notes tab ── */}
                  {panelTab==='notes' && (
                    <div className="flex flex-col gap-4">
                      <label className="text-white/40 text-xs uppercase tracking-widest block mb-1">Designer Instructions</label>
                      <textarea className="auth-input w-full resize-none text-sm" rows={8}
                        placeholder="Color references, style links, brand guidelines, do's and don'ts…"
                        value={notes} onChange={e=>setNotes(e.target.value.slice(0,2000))}/>
                      <p className="text-white/20 text-xs">{notes.length}/2000</p>
                      <input className="auth-input w-full text-sm" placeholder="Reference link (https://…)"/>
                      <div className="border-2 border-dashed border-white/10 rounded-xl p-6 text-center hover:border-white/20 transition-colors cursor-pointer">
                        <p className="text-white/35 text-sm">Drop files here or click to upload</p>
                        <p className="text-white/20 text-xs mt-1">PNG, JPG, PDF, AI — up to 50MB</p>
                      </div>
                    </div>
                  )}

                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer CTA */}
            <div className="border-t border-white/5 p-5 flex flex-col gap-3 flex-shrink-0">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/35">Starting from</span>
                <span className="text-[#89AACC] text-xl font-light" style={{fontFamily:"'Instrument Serif', serif"}}>$29</span>
              </div>
              <UiverseButton text="Order Now" secondText="Submitting" onClick={()=>router.push(`/order?product=${product.id}`)}/>
              <p className="text-white/20 text-xs text-center">Free revision · Delivered in 3–7 days</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

import { Suspense } from 'react'

export default function ForgePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="cube-loader">
          <div className="cube-top" />
          <div className="cube-wrapper">
            {[0,1,2,3].map(i=><span key={i} style={{'--i':i} as React.CSSProperties} className="cube-span"/>)}
          </div>
        </div>
      </div>
    }>
      <ForgePageInner />
    </Suspense>
  )
}
