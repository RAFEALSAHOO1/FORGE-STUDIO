import { NextRequest } from 'next/server'
import { rateLimit, apiSuccess, apiError, sanitizeString } from '@/lib/utils'
import { ensureDBInitialized } from '@/lib/db-init'
import { sql } from '@/lib/db'

/**
 * POST /api/orders/create
 * Create a new order from Forge design
 */
export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown'
  const { allowed } = rateLimit(`orders-${ip}`, 20, 60_000)
  if (!allowed) return apiError('Too many requests. Wait 1 minute.', 429)

  try {
    await ensureDBInitialized()

    const body = await req.json()
    const {
      productId,
      productName,
      category,
      textContent,
      primaryColor,
      fontFamily,
      fontSize,
      size,
      addons,
      notes,
      amount, // optional - default to 29.00 (in cents: 2900)
      userId,
    } = body

    // ── Validate input ────────────────────────────────────────────────
    if (!productId || !productName) {
      return apiError('Product ID and name required', 400)
    }

    // Get user ID from token or body
    let finalUserId = userId
    if (!finalUserId) {
      const token = req.headers.get('authorization')?.replace('Bearer ', '')
      if (!token) {
        return apiError('Authentication required. Login to create orders.', 401)
      }
      const parts = token.split('_')
      if (parts.length < 2) return apiError('Invalid token', 401)
      finalUserId = parts[1]
    }

    // Validate user exists
    const userResult = (await sql`
      SELECT id FROM users WHERE id = ${finalUserId}
    `) as any[]
    if (!userResult || userResult.length === 0) {
      return apiError('Invalid user', 401)
    }

    // ── Prepare order data ────────────────────────────────────────────
    const orderAmount = amount || 2900 // Default: $29.00 in cents
    const sanitizedCategory = sanitizeString(category, 50) || 'general'
    const sanitizedNotes = sanitizeString(notes, 5000) || ''

    // Store all design details as JSONB
    const designDetails = {
      textContent: sanitizeString(textContent, 1000),
      primaryColor,
      fontFamily,
      fontSize: typeof fontSize === 'number' ? fontSize : 24,
      size: sanitizeString(size, 100),
      addons: Array.isArray(addons) ? addons : [],
      notes: sanitizedNotes,
    }

    // ── Insert order into database ────────────────────────────────────
    const result = (await sql`
      INSERT INTO orders (
        user_id,
        product_name,
        product_id,
        category,
        amount,
        status,
        details
      ) VALUES (
        ${finalUserId},
        ${sanitizeString(productName, 100)},
        ${sanitizeString(productId, 50)},
        ${sanitizedCategory},
        ${orderAmount},
        'pending',
        ${JSON.stringify(designDetails)}
      )
      RETURNING id, user_id, product_name, product_id, category, amount, status, created_at
    `) as any[]

    if (!result || result.length === 0) {
      return apiError('Failed to create order', 500)
    }

    const order = result[0]

    return apiSuccess(
      {
        order: {
          id: order.id,
          productName: order.product_name,
          productId: order.product_id,
          amount: order.amount,
          status: order.status,
          createdAt: order.created_at,
        },
        message: 'Order created successfully. Proceed to payment.',
      },
      201
    )
  } catch (error) {
    console.error('Order creation error:', error)
    const message = error instanceof Error ? error.message : 'Failed to create order'
    return apiError(message, 500)
  }
}
