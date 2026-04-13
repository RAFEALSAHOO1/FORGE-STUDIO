import { NextRequest } from 'next/server'
import { rateLimit, apiSuccess, apiError } from '@/lib/utils'
import { ensureDBInitialized } from '@/lib/db-init'
import { sql } from '@/lib/db'

/**
 * GET /api/admin/orders
 * List all orders (admin only)
 * Query params: status, limit, offset, sortBy
 */
export async function GET(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown'
  const { allowed } = rateLimit(`admin-orders-${ip}`, 30, 60_000)
  if (!allowed) return apiError('Rate limit exceeded', 429)

  try {
    await ensureDBInitialized()

    // TODO: Verify admin role from token
    // For now, allow all - implement role check later

    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')
    const limit = Math.min(100, Number(searchParams.get('limit')) || 20)
    const offset = Math.max(0, Number(searchParams.get('offset')) || 0)
    const sortBy = searchParams.get('sortBy') || 'created_at'

    // Validate sortBy
    const allowedSortFields = ['created_at', 'amount', 'status']
    const sortField = allowedSortFields.includes(sortBy) ? sortBy : 'created_at'

    // Build where clause
    let whereClause = 'WHERE 1=1'
    if (status && ['pending', 'progress', 'completed', 'cancelled'].includes(status)) {
      whereClause = `WHERE status = '${status}'`
    }

    // Get total count
    const countResult = (await sql.unsafe(`
      SELECT COUNT(*) as total FROM orders ${whereClause}
    `) as unknown) as any[]

    const total = countResult && countResult.length > 0 ? Number(countResult[0].total) : 0

    // Get paginated orders
    const orders = (await sql.unsafe(`
      SELECT 
        o.id, 
        o.user_id, 
        u.name as customer_name,
        u.email as customer_email,
        o.product_name, 
        o.product_id, 
        o.category, 
        o.amount, 
        o.status, 
        o.payment_id,
        o.details,
        o.created_at,
        o.updated_at
      FROM orders o
      LEFT JOIN users u ON o.user_id = u.id
      ${whereClause}
      ORDER BY o.${sortField} DESC
      LIMIT ${limit} OFFSET ${offset}
    `) as unknown) as any[]

    return apiSuccess({
      orders: (orders || []).map(o => ({
        id: o.id,
        userId: o.user_id,
        customerName: o.customer_name,
        customerEmail: o.customer_email,
        productName: o.product_name,
        productId: o.product_id,
        category: o.category,
        amount: o.amount,
        status: o.status,
        paymentId: o.payment_id,
        createdAt: o.created_at,
        updatedAt: o.updated_at,
      })),
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    })
  } catch (error) {
    console.error('Admin fetch orders error:', error)
    const message = error instanceof Error ? error.message : 'Failed to fetch orders'
    return apiError(message, 500)
  }
}
