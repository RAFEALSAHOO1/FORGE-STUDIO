'use client'

import { useAnalytics } from '@/lib/analytics'

/** Mounts analytics tracking. Wrap around app in layout.tsx. */
export default function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  useAnalytics() // auto-tracks page views
  return <>{children}</>
}
