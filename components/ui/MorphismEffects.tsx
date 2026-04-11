'use client'

import { useEffect, useRef } from 'react'

interface MorphismEffectsProps {
  className?: string
  variant?: 'glass-3d' | 'light-morph' | 'water-morph' | 'glass-deep' | 'glow-morph'
  trackLight?: boolean
}

export function MorphismContainer({ 
  children, 
  className = '', 
  variant = 'glass-3d',
  trackLight = false 
}: MorphismEffectsProps & { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!trackLight || !containerRef.current) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      
      const rect = containerRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100

      containerRef.current.style.setProperty('--light-x', `${Math.max(0, Math.min(100, x))}%`)
      containerRef.current.style.setProperty('--light-y', `${Math.max(0, Math.min(100, y))}%`)
    }

    const handleMouseLeave = () => {
      if (!containerRef.current) return
      containerRef.current.style.setProperty('--light-x', '50%')
      containerRef.current.style.setProperty('--light-y', '50%')
    }

    window.addEventListener('mousemove', handleMouseMove)
    containerRef.current.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (containerRef.current) {
        containerRef.current.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [trackLight])

  return (
    <div 
      ref={containerRef}
      className={`${variant} ${className}`}
    >
      {children}
    </div>
  )
}

export function GlassButton({ 
  children, 
  className = '',
  onClick,
  variant = 'glass-3d'
}: { 
  children: React.ReactNode
  className?: string
  onClick?: () => void
  variant?: 'glass-3d' | 'light-morph' | 'water-morph' | 'glow-morph'
}) {
  return (
    <button
      onClick={onClick}
      className={`${variant} px-6 py-3 rounded-xl font-medium text-white transition-all hover:shadow-xl active:scale-95 ${className}`}
    >
      {children}
    </button>
  )
}

export function LightMorphCard({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode
  className?: string
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return
      
      const rect = cardRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100

      cardRef.current.style.setProperty('--light-x', `${Math.max(0, Math.min(100, x))}%`)
      cardRef.current.style.setProperty('--light-y', `${Math.max(0, Math.min(100, y))}%`)
    }

    const handleMouseLeave = () => {
      if (!cardRef.current) return
      cardRef.current.style.setProperty('--light-x', '50%')
      cardRef.current.style.setProperty('--light-y', '50%')
    }

    window.addEventListener('mousemove', handleMouseMove)
    if (cardRef.current) {
      cardRef.current.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (cardRef.current) {
        cardRef.current.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [])

  return (
    <div 
      ref={cardRef}
      className={`light-morph rounded-2xl p-6 ${className}`}
    >
      {children}
    </div>
  )
}

export function WaterMorphSection({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`water-morph rounded-3xl p-8 ${className}`}>
      {children}
    </div>
  )
}

export function GlassDeepBox({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`glass-deep rounded-2xl p-6 ${className}`}>
      {children}
    </div>
  )
}

export function GlowMorphBox({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`glow-morph rounded-xl p-4 ${className}`}>
      {children}
    </div>
  )
}
