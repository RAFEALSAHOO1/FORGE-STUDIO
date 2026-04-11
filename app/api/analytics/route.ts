import { NextRequest } from 'next/server'
import { rateLimit, apiSuccess, apiError, trackEvent, getAnalytics, sanitizeString } from '@/lib/utils'

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown'
  const { allowed } = rateLimit(`analytics-${ip}`, 300, 60_000)
  if (!allowed) return apiError('Rate limit exceeded', 429)

  try {
    const body = await req.json()
    const validEvents = [
      'page_view', 'product_view', 'forge_open', 'design_saved',
      'order_started', 'order_completed', 'search_performed',
      'category_browsed', 'cta_clicked', 'error_occurred',
    ]

    if (!validEvents.includes(body.event)) {
      return apiError('Invalid event type', 400)
    }

    trackEvent({
      event: body.event,
      properties: body.properties || {},
      timestamp: Date.now(),
    })

    return apiSuccess({ tracked: true })
  } catch {
    return apiError('Analytics tracking failed', 500)
  }
}

export async function GET(req: NextRequest) {
  // Admin only — in production add auth check
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown'
  const { allowed } = rateLimit(`analytics-read-${ip}`, 20, 60_000)
  if (!allowed) return apiError('Rate limit exceeded', 429)

  const events = getAnalytics()

  // Aggregate stats
  const eventCounts: Record<string, number> = {}
  events.forEach(e => {
    eventCounts[e.event] = (eventCounts[e.event] || 0) + 1
  })

  return apiSuccess({
    total: events.length,
    eventCounts,
    recent: events.slice(-20).reverse(),
  })
}
