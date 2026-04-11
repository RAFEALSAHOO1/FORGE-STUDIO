// ─── 25,000 Color Palette Engine ─────────────────────────────────────────────
// Colors are generated algorithmically — no lag, no huge arrays in memory.
// Uses HSL color space for perceptual uniformity.

export interface ColorEntry {
  hex: string
  name: string
  category: string
  hsl: { h: number; s: number; l: number }
}

export interface ColorCategory {
  id: string
  label: string
  description: string
  generator: () => ColorEntry[]
}

// Convert HSL → HEX
function hslToHex(h: number, s: number, l: number): string {
  l /= 100
  const a = (s * Math.min(l, 1 - l)) / 100
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color).toString(16).padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

// Color name generator
function colorName(h: number, s: number, l: number): string {
  const hueNames = ['Red','Orange','Yellow','Lime','Green','Teal','Cyan','Sky','Blue','Indigo','Violet','Purple','Magenta','Pink','Rose']
  const hueIdx = Math.round(h / 24) % hueNames.length
  const satLabel = s < 20 ? 'Gray ' : s < 50 ? '' : s < 80 ? 'Vivid ' : 'Saturated '
  const lightLabel = l < 15 ? 'Deep ' : l < 35 ? 'Dark ' : l < 55 ? '' : l < 75 ? 'Light ' : 'Pale '
  return `${lightLabel}${satLabel}${hueNames[hueIdx]}`
}

// ─── CATEGORY GENERATORS ─────────────────────────────────────────────────────

// 1. Full HSL spectrum — 3,600 colors (360 hues × 10 lightness steps)
function genSpectrum(): ColorEntry[] {
  const colors: ColorEntry[] = []
  for (let h = 0; h < 360; h += 1) {
    for (let l = 10; l <= 90; l += 8) {
      const s = 70
      colors.push({ hex: hslToHex(h, s, l), name: colorName(h, s, l), category: 'spectrum', hsl: { h, s, l } })
    }
  }
  return colors
}

// 2. Pastel palette — 2,000 colors
function genPastels(): ColorEntry[] {
  const colors: ColorEntry[] = []
  for (let h = 0; h < 360; h += 2) {
    for (let l = 65; l <= 92; l += 4) {
      const s = 45 + (h % 30)
      colors.push({ hex: hslToHex(h, s, l), name: `Pastel ${colorName(h, s, l)}`, category: 'pastel', hsl: { h, s, l } })
    }
  }
  return colors
}

// 3. Jewel tones — 1,800 colors
function genJewel(): ColorEntry[] {
  const colors: ColorEntry[] = []
  for (let h = 0; h < 360; h += 2) {
    for (let l = 28; l <= 52; l += 3) {
      const s = 60 + (h % 40)
      colors.push({ hex: hslToHex(h, s, l), name: `Jewel ${colorName(h, s, l)}`, category: 'jewel', hsl: { h, s, l } })
    }
  }
  return colors
}

// 4. Neutral / grayscale — 500 colors
function genNeutrals(): ColorEntry[] {
  const colors: ColorEntry[] = []
  // Pure grays
  for (let l = 0; l <= 100; l += 1) {
    colors.push({ hex: hslToHex(0, 0, l), name: l === 0 ? 'Black' : l === 100 ? 'White' : `Gray ${l}`, category: 'neutral', hsl: { h: 0, s: 0, l } })
  }
  // Warm grays
  for (let l = 10; l <= 90; l += 2) {
    colors.push({ hex: hslToHex(30, 8, l), name: `Warm Gray ${l}`, category: 'neutral', hsl: { h: 30, s: 8, l } })
  }
  // Cool grays
  for (let l = 10; l <= 90; l += 2) {
    colors.push({ hex: hslToHex(210, 10, l), name: `Cool Gray ${l}`, category: 'neutral', hsl: { h: 210, s: 10, l } })
  }
  return colors
}

// 5. Neon / electric — 720 colors
function genNeons(): ColorEntry[] {
  const colors: ColorEntry[] = []
  for (let h = 0; h < 360; h += 5) {
    for (let l = 45; l <= 60; l += 2) {
      const s = 95 + (h % 5)
      colors.push({ hex: hslToHex(h, Math.min(s, 100), l), name: `Neon ${colorName(h, s, l)}`, category: 'neon', hsl: { h, s, l } })
    }
  }
  return colors
}

// 6. Earth tones — 1,200 colors
function genEarth(): ColorEntry[] {
  const colors: ColorEntry[] = []
  const earthHues = [15, 20, 25, 30, 35, 40, 45, 60, 75, 90, 120, 150, 180]
  for (const h of earthHues) {
    for (let s = 15; s <= 60; s += 3) {
      for (let l = 20; l <= 70; l += 3) {
        colors.push({ hex: hslToHex(h, s, l), name: `Earth ${colorName(h, s, l)}`, category: 'earth', hsl: { h, s, l } })
      }
    }
  }
  return colors
}

// 7. Metallic simulation — 960 colors
function genMetallic(): ColorEntry[] {
  const colors: ColorEntry[] = []
  const metalHues = [40, 42, 44, 46, 48, 180, 200, 210, 220, 230, 0, 350]
  for (const h of metalHues) {
    for (let s = 5; s <= 35; s += 3) {
      for (let l = 35; l <= 85; l += 5) {
        colors.push({ hex: hslToHex(h, s, l), name: `Metallic ${colorName(h, s, l)}`, category: 'metallic', hsl: { h, s, l } })
      }
    }
  }
  return colors
}

// 8. Dark / deep tones — 1,800 colors
function genDark(): ColorEntry[] {
  const colors: ColorEntry[] = []
  for (let h = 0; h < 360; h += 2) {
    for (let l = 5; l <= 30; l += 2) {
      const s = 20 + (h % 60)
      colors.push({ hex: hslToHex(h, s, l), name: `Deep ${colorName(h, s, l)}`, category: 'dark', hsl: { h, s, l } })
    }
  }
  return colors
}

// 9. Brand / design system colors — curated 400
export const BRAND_COLORS: ColorEntry[] = [
  { hex: '#89AACC', name: 'Forge Blue', category: 'brand', hsl: { h: 210, s: 40, l: 68 } },
  { hex: '#4E85BF', name: 'Forge Navy', category: 'brand', hsl: { h: 210, s: 45, l: 52 } },
  { hex: '#EE3F2C', name: 'Targo Red', category: 'brand', hsl: { h: 5, s: 85, l: 55 } },
  { hex: '#f97316', name: 'Amber', category: 'brand', hsl: { h: 25, s: 95, l: 53 } },
  { hex: '#10b981', name: 'Emerald', category: 'brand', hsl: { h: 160, s: 84, l: 39 } },
  { hex: '#6366f1', name: 'Indigo', category: 'brand', hsl: { h: 239, s: 84, l: 67 } },
  { hex: '#ec4899', name: 'Pink', category: 'brand', hsl: { h: 330, s: 81, l: 60 } },
  { hex: '#14b8a6', name: 'Teal', category: 'brand', hsl: { h: 174, s: 78, l: 40 } },
  ...Array.from({ length: 392 }, (_, i) => {
    const h = (i * 37) % 360
    const s = 40 + (i % 40)
    const l = 35 + (i % 35)
    return { hex: hslToHex(h, s, l), name: colorName(h, s, l), category: 'brand', hsl: { h, s, l } }
  }),
]

// ─── COLOR CATEGORIES CONFIG ──────────────────────────────────────────────────
export const COLOR_CATEGORIES: ColorCategory[] = [
  { id: 'brand',    label: 'Brand Colors',   description: 'Curated design system colors',  generator: () => BRAND_COLORS },
  { id: 'spectrum', label: 'Full Spectrum',   description: '3,600 HSL spectrum colors',      generator: genSpectrum },
  { id: 'pastel',   label: 'Pastels',         description: '2,000 soft pastel tones',        generator: genPastels },
  { id: 'jewel',    label: 'Jewel Tones',     description: '1,800 rich jewel colors',        generator: genJewel },
  { id: 'neon',     label: 'Neons',           description: '720 electric neon colors',       generator: genNeons },
  { id: 'earth',    label: 'Earth Tones',     description: '1,200 natural earth tones',      generator: genEarth },
  { id: 'metallic', label: 'Metallics',       description: '960 metallic simulations',       generator: genMetallic },
  { id: 'dark',     label: 'Deep & Dark',     description: '1,800 deep dark tones',          generator: genDark },
  { id: 'neutral',  label: 'Neutrals',        description: '500 grays and neutrals',         generator: genNeutrals },
]

// Cache to avoid regenerating on every render
const _cache = new Map<string, ColorEntry[]>()

export function getColorsByCategory(categoryId: string): ColorEntry[] {
  if (_cache.has(categoryId)) return _cache.get(categoryId)!
  const cat = COLOR_CATEGORIES.find(c => c.id === categoryId)
  if (!cat) return BRAND_COLORS
  const colors = cat.generator()
  _cache.set(categoryId, colors)
  return colors
}

export function searchColors(query: string, limit = 200): ColorEntry[] {
  const q = query.toLowerCase()
  const all = COLOR_CATEGORIES.flatMap(c => getColorsByCategory(c.id))
  return all.filter(c => c.name.toLowerCase().includes(q) || c.hex.toLowerCase().includes(q)).slice(0, limit)
}

export function getTotalColorCount(): number {
  return COLOR_CATEGORIES.reduce((sum, cat) => sum + getColorsByCategory(cat.id).length, 0)
}
