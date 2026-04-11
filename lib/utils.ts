// ─── Rate Limiting ────────────────────────────────────────────────────────────
// In-memory store (use Redis in production)
const requestCounts = new Map<string, { count: number; resetTime: number }>()

export function rateLimit(
  identifier: string,
  limit = 60,
  windowMs = 60_000
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now()
  const record = requestCounts.get(identifier)

  if (!record || now > record.resetTime) {
    const resetTime = now + windowMs
    requestCounts.set(identifier, { count: 1, resetTime })
    return { allowed: true, remaining: limit - 1, resetTime }
  }

  if (record.count >= limit) {
    return { allowed: false, remaining: 0, resetTime: record.resetTime }
  }

  record.count++
  return { allowed: true, remaining: limit - record.count, resetTime: record.resetTime }
}

// ─── Input Sanitization ───────────────────────────────────────────────────────
export function sanitizeString(input: unknown, maxLength = 500): string {
  if (typeof input !== 'string') return ''
  return input
    .trim()
    .slice(0, maxLength)
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
}

export function sanitizeEmail(email: unknown): string {
  const s = sanitizeString(email, 254)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(s) ? s.toLowerCase() : ''
}

// ─── API Response Helpers ─────────────────────────────────────────────────────
export function apiSuccess<T>(data: T, status = 200) {
  return Response.json({ success: true, data }, { status })
}

export function apiError(message: string, status = 400) {
  return Response.json({ success: false, error: message }, { status })
}

// ─── Analytics Event Types ────────────────────────────────────────────────────
export type AnalyticsEvent =
  | 'page_view'
  | 'product_view'
  | 'forge_open'
  | 'design_saved'
  | 'order_started'
  | 'order_completed'
  | 'search_performed'
  | 'category_browsed'
  | 'cta_clicked'
  | 'error_occurred'

export interface AnalyticsPayload {
  event: AnalyticsEvent
  properties?: Record<string, string | number | boolean>
  timestamp?: number
}

// ─── In-memory analytics store (replace with DB) ─────────────────────────────
const analyticsStore: AnalyticsPayload[] = []

export function trackEvent(payload: AnalyticsPayload) {
  analyticsStore.push({ ...payload, timestamp: Date.now() })
  // Keep last 1000 events in memory
  if (analyticsStore.length > 1000) analyticsStore.shift()
}

export function getAnalytics() {
  return analyticsStore
}
