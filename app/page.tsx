'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import LoadingScreen from '@/components/ui/LoadingScreen'
import HeroSection from '@/components/sections/HeroSection'
import {
  AboutSection, FeaturedVideoSection, PhilosophySection, ServicesSection, CTASection,
} from '@/components/sections/LandingSections'
import ProductHighlights from '@/components/sections/ProductHighlights'
import Footer from '@/components/layout/Footer'

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)
  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      <main style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.5s ease-out' }}>
        <HeroSection />
        <AboutSection />
        <FeaturedVideoSection />
        <ProductHighlights />
        <PhilosophySection />
        <ServicesSection />
        <CTASection />
        <Footer />
      </main>
    </>
  )
}
