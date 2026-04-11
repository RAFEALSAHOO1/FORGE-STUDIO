import { NextRequest } from 'next/server'
import { rateLimit, apiSuccess, apiError, sanitizeString, trackEvent } from '@/lib/utils'

interface Order {
  id: string
  userId: string
  designId: string
  productName: string
  amount: number
  currency: string
  status: 'pending' | 'paid' | 'in_progress' | 'completed' | 'cancelled'
  urgency: string
  deliveryEmail: string
  createdAt: string
  updatedAt: string
  stripePaymentId?: string
}

const orders: Order[] = [
  {
    id: 'ord-001',
    userId: 'user-1',
    designId: 'des-001',
    productName: 'Event Poster',
    amount: 2900,
    currency: 'usd',
    status: 'in_progress',
    urgency: 'standard',
    deliveryEmail: 'user@example.com',
    createdAt: '2025-04-01T12:00:00Z',
    updatedAt: '2025-04-02T09:00:00Z',
  },
]

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown'
  const { allowed } = rateLimit(`orders-create-${ip}`, 10, 60_000)
  if (!allowed) return apiError('Too many order requests', 429)

  try {
    const body = await req.json()

    const order: Order = {
      id: `ord-${Date.now()}`,
      userId: sanitizeString(body.userId) || 'anonymous',
      designId: sanitizeString(body.designId, 100),
      productName: sanitizeString(body.productName, 200),
      amount: Math.round(Number(body.amount) || 0),
      currency: 'usd',
      status: 'pending',
      urgency: ['standard', 'express', 'rush'].includes(body.urgency) ? body.urgency : 'standard',
      deliveryEmail: sanitizeString(body.deliveryEmail, 254),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    orders.push(order)

    trackEvent({
      event: 'order_started',
      properties: { productName: order.productName, amount: order.amount, urgency: order.urgency },
    })

    return apiSuccess({ order, checkoutUrl: `/payment?orderId=${order.id}` }, 201)
  } catch {
    return apiError('Failed to create order', 500)
  }
}

export async function GET(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown'
  const { allowed } = rateLimit(`orders-list-${ip}`, 100, 60_000)
  if (!allowed) return apiError('Rate limit exceeded', 429)

  try {
    const { searchParams } = new URL(req.url)
    const userId = sanitizeString(searchParams.get('userId') ?? '')
    const status = searchParams.get('status')

    let filtered = userId ? orders.filter(o => o.userId === userId) : orders
    if (status) filtered = filtered.filter(o => o.status === status)

    return apiSuccess({ orders: filtered, total: filtered.length })
  } catch {
    return apiError('Failed to fetch orders', 500)
  }
}
