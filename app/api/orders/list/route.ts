import { NextRequest } from 'next/server'
import { apiSuccess, apiError } from '@/lib/utils'
import { ensureDBInitialized } from '@/lib/db-init'
import { sql } from '@/lib/db'

/**
 * GET /api/orders/list
 * Fetch orders for a user (dashboard)
 * Query params: userId, status, limit, offset
 */
export async function GET(req: NextRequest) {
  try {
    await ensureDBInitialized()

    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')
    const status = searchParams.get('status')
    const limit = Math.min(50, Number(searchParams.get('limit')) || 10)
    const offset = Math.max(0, Number(searchParams.get('offset')) || 0)

    // Require user ID
    if (!userId) {
      return apiError('userId required', 400)
    }

    // Build where clause
    let whereClause = sql`WHERE user_id = ${userId}`

    if (status && ['pending', 'progress', 'completed', 'cancelled'].includes(status)) {
      whereClause = sql`WHERE user_id = ${userId} AND status = ${status}`
    }

    // Get total count
    const countResult = (await sql`
      SELECT COUNT(*) as total FROM orders ${whereClause}
    `) as any[]

    const total = countResult && countResult.length > 0 ? Number(countResult[0].total) : 0

    // Get paginated orders
    const orders = (await sql`
      SELECT 
        id, 
        product_name, 
        product_id, 
        category, 
        amount, 
        status, 
        details,
        created_at
      FROM orders ${whereClause}
      ORDER BY created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `) as any[]

    return apiSuccess({
      orders: (orders || []).map(o => ({
        id: o.id,
        productName: o.product_name,
        productId: o.product_id,
        category: o.category,
        amount: o.amount,
        status: o.status,
        createdAt: o.created_at,
        details: o.details,
      })),
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    })
  } catch (error) {
    console.error('Fetch orders error:', error)
    const message = error instanceof Error ? error.message : 'Failed to fetch orders'
    return apiError(message, 500)
  }
}
