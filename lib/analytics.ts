'use client'

import { useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

type GaEvent = {
  action: string
  category?: string
  label?: string
  value?: number
  nonInteraction?: boolean
  [key: string]: unknown
}

/** Fire a Google Analytics GA4 event */
export function trackGAEvent(event: GaEvent) {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', event.action, {
    event_category: event.category || 'engagement',
    event_label:    event.label,
    value:          event.value,
    non_interaction: event.nonInteraction,
    ...event,
  })
}

/** Also track via internal /api/analytics for our own dashboard */
export async function trackInternalEvent(eventName: string, properties?: Record<string, string | number | boolean>) {
  try {
    await fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event: eventName, properties }),
    })
  } catch { /* silent */ }
}

/** Hook: auto-tracks page views on route change */
export function useAnalytics() {
  const pathname = usePathname()

  useEffect(() => {
    // GA4 page view
    if (window.gtag) {
      window.gtag('event', 'page_view', { page_path: pathname })
    }
    // Internal tracking
    trackInternalEvent('page_view', { path: pathname })
  }, [pathname])

  const track = useCallback((event: string, data?: Record<string, string | number | boolean>) => {
    trackGAEvent({ action: event, ...data })
    trackInternalEvent(event, data)
  }, [])

  return { track }
}
