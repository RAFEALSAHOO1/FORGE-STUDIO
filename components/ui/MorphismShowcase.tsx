'use client'

import { useState } from 'react'
import { MorphismContainer, LightMorphCard, WaterMorphSection, GlassDeepBox, GlowMorphBox } from './MorphismEffects'

export function MorphismShowcase() {
  const [selectedEffect, setSelectedEffect] = useState('glass-3d')

  const effects = [
    {
      name: 'Glass-3D',
      class: 'glass-3d',
      description: 'Premium 3D glass with depth, reflections & layered shadows',
    },
    {
      name: 'Light-Morph',
      class: 'light-morph',
      description: 'Dynamic light tracking with cursor-responsive gradients',
    },
    {
      name: 'Water-Morph',
      class: 'water-morph',
      description: 'Liquid flowing effects with wave animations',
    },
    {
      name: 'Glass-Deep',
      class: 'glass-deep',
      description: 'Ultra-premium deep glass for hero sections',
    },
    {
      name: 'Glow-Morph',
      class: 'glow-morph',
      description: 'Subtle elegant glow effects for secondary elements',
    },
  ]

  return (
    <div className="min-h-screen bg-black p-8 md:p-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Morphism Effects Showcase
          </h1>
          <p className="text-white/60 text-lg max-w-2xl">
            Explore high-quality 3D glass, water, and light morphism effects. All effects include advanced animations and are fully optimized for performance.
          </p>
        </div>

        {/* Effect Selection */}
        <div className="mb-12">
          <h2 className="text-white/40 text-sm uppercase tracking-widest mb-6">Select Effect</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {effects.map((effect) => (
              <button
                key={effect.class}
                onClick={() => setSelectedEffect(effect.class)}
                className={`p-3 rounded-lg transition-all ${
                  selectedEffect === effect.class
                    ? 'glass-3d bg-white/10 text-white'
                    : 'glass-3d bg-white/5 text-white/60 hover:text-white'
                }`}
              >
                <span className="text-sm font-medium">{effect.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Preview */}
        <div className="mb-16">
          <h2 className="text-white/40 text-sm uppercase tracking-widest mb-6">Live Preview</h2>
          <div className={`${selectedEffect} rounded-3xl p-12 md:p-20 min-h-80 flex items-center justify-center`}>
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {effects.find(e => e.class === selectedEffect)?.name}
              </h3>
              <p className="text-white/70 text-lg">
                {effects.find(e => e.class === selectedEffect)?.description}
              </p>
            </div>
          </div>
        </div>

        {/* Individual Examples */}
        <div className="mb-16">
          <h2 className="text-white/40 text-sm uppercase tracking-widest mb-8">All Effects</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Glass-3D */}
            <div>
              <h3 className="text-white text-sm font-semibold mb-3">Glass-3D</h3>
              <MorphismContainer 
                variant="glass-3d" 
                className="rounded-2xl p-8 min-h-40 flex items-center justify-center"
              >
                <div className="text-center">
                  <p className="text-white/70 text-sm">Premium 3D Glass Effect</p>
                </div>
              </MorphismContainer>
            </div>

            {/* Light-Morph */}
            <div>
              <h3 className="text-white text-sm font-semibold mb-3">Light-Morph</h3>
              <LightMorphCard className="min-h-40 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-white/70 text-sm">Cursor-Tracking Light</p>
                </div>
              </LightMorphCard>
            </div>

            {/* Water-Morph */}
            <div>
              <h3 className="text-white text-sm font-semibold mb-3">Water-Morph</h3>
              <WaterMorphSection className="min-h-40 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-white/70 text-sm">Liquid Flowing Effect</p>
                </div>
              </WaterMorphSection>
            </div>

            {/* Glass-Deep */}
            <div>
              <h3 className="text-white text-sm font-semibold mb-3">Glass-Deep</h3>
              <GlassDeepBox className="min-h-40 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-white/70 text-sm">Ultra-Premium Glass</p>
                </div>
              </GlassDeepBox>
            </div>

            {/* Glow-Morph */}
            <div>
              <h3 className="text-white text-sm font-semibold mb-3">Glow-Morph</h3>
              <GlowMorphBox className="min-h-40 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-white/70 text-sm">Subtle Glow Effect</p>
                </div>
              </GlowMorphBox>
            </div>

            {/* Liquid Glass */}
            <div>
              <h3 className="text-white text-sm font-semibold mb-3">Liquid Glass</h3>
              <div className="liquid-glass rounded-2xl p-8 min-h-40 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-white/70 text-sm">Original Glass Effect</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-white/40 text-sm uppercase tracking-widest mb-8">Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-3d rounded-2xl p-6">
              <h3 className="text-white text-lg font-semibold mb-3">Advanced Backdrop Filters</h3>
              <p className="text-white/70 text-sm">High-performance blur and brightness effects with full browser support</p>
            </div>

            <div className="glass-3d rounded-2xl p-6">
              <h3 className="text-white text-lg font-semibold mb-3">Dynamic Animations</h3>
              <p className="text-white/70 text-sm">Smooth 3-8 second animation cycles for shimmer, wave, and glow effects</p>
            </div>

            <div className="water-morph rounded-2xl p-6">
              <h3 className="text-white text-lg font-semibold mb-3">Light Tracking</h3>
              <p className="text-white/70 text-sm">Cursor-responsive light effects that follow user interaction</p>
            </div>

            <div className="water-morph rounded-2xl p-6">
              <h3 className="text-white text-lg font-semibold mb-3">Performance Optimized</h3>
              <p className="text-white/70 text-sm">Hardware-accelerated transforms and GPU-optimized animations</p>
            </div>

            <div className="glow-morph rounded-2xl p-6">
              <h3 className="text-white text-lg font-semibold mb-3">Fully Customizable</h3>
              <p className="text-white/70 text-sm">CSS variables and Tailwind integration for easy customization</p>
            </div>

            <div className="glow-morph rounded-2xl p-6">
              <h3 className="text-white text-lg font-semibold mb-3">React Components</h3>
              <p className="text-white/70 text-sm">Ready-to-use React components with built-in light tracking</p>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div>
          <h2 className="text-white/40 text-sm uppercase tracking-widest mb-6">Usage Example</h2>
          <div className="glass-3d rounded-2xl p-6 overflow-auto">
            <pre className="text-white/80 text-sm font-mono">
{`import { LightMorphCard, WaterMorphSection } from '@/components/ui/MorphismEffects'

export default function Component() {
  return (
    <>
      {/* Interactive light morphism card */}
      <LightMorphCard className="rounded-2xl p-6">
        <h2>Light Morphism Effect</h2>
        <p>Responds to cursor movement</p>
      </LightMorphCard>

      {/* Water morphism section */}
      <WaterMorphSection className="rounded-2xl p-8 my-8">
        <h2>Water Morphism Effect</h2>
        <p>Flowing liquid animation</p>
      </WaterMorphSection>

      {/* Glass-3D container with light tracking */}
      <MorphismContainer 
        variant="glass-3d" 
        trackLight={true}
        className="rounded-2xl p-6"
      >
        Premium content with light tracking
      </MorphismContainer>
    </>
  )
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MorphismShowcase
