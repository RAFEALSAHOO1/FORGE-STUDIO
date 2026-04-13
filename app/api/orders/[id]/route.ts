import { NextRequest } from 'next/server'
import { apiSuccess, apiError } from '@/lib/utils'
import { ensureDBInitialized } from '@/lib/db-init'
import { sql } from '@/lib/db'

/**
 * Dynamic route for order operations
 * GET /api/orders/[id] - Fetch order details
 * PUT /api/orders/[id] - Update order status (admin only)
 */

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await ensureDBInitialized()

    const orderId = params.id

    const result = (await sql`
      SELECT 
        id, 
        user_id, 
        product_name, 
        product_id, 
        category, 
        amount, 
        status, 
        details,
        created_at
      FROM orders 
      WHERE id = ${orderId}
    `) as any[]

    if (!result || result.length === 0) {
      return apiError('Order not found', 404)
    }

    const order = result[0]

    return apiSuccess({
      order: {
        id: order.id,
        userId: order.user_id,
        productName: order.product_name,
        productId: order.product_id,
        category: order.category,
        amount: order.amount,
        status: order.status,
        details: order.details,
        createdAt: order.created_at,
      },
    })
  } catch (error) {
    console.error('Fetch order error:', error)
    const message = error instanceof Error ? error.message : 'Failed to fetch order'
    return apiError(message, 500)
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await ensureDBInitialized()

    const orderId = params.id
    const body = await req.json()
    const { status, paymentId } = body

    // Validate status
    const validStatuses = ['pending', 'progress', 'completed', 'cancelled']
    if (status && !validStatuses.includes(status)) {
      return apiError(`Invalid status. Must be one of: ${validStatuses.join(', ')}`, 400)
    }

    // Check if order exists
    const existing = (await sql`
      SELECT id FROM orders WHERE id = ${orderId}
    `) as any[]

    if (!existing || existing.length === 0) {
      return apiError('Order not found', 404)
    }

    // Update order - handle multiple conditions
    if (!status && !paymentId) {
      return apiError('No fields to update. Provide status or paymentId.', 400)
    }

    if (status) {
      await sql`UPDATE orders SET status = ${status}, updated_at = NOW() WHERE id = ${orderId}`
    }

    if (paymentId) {
      await sql`UPDATE orders SET payment_id = ${paymentId}, updated_at = NOW() WHERE id = ${orderId}`
    }

    // Fetch updated order
    const result = (await sql`
      SELECT id, status, payment_id, updated_at FROM orders WHERE id = ${orderId}
    `) as any[]

    if (!result || result.length === 0) {
      return apiError('Failed to update order', 500)
    }

    const updated = result[0]

    return apiSuccess({
      order: {
        id: updated.id,
        status: updated.status,
        paymentId: updated.payment_id,
        updatedAt: updated.updated_at,
      },
      message: 'Order updated successfully',
    })
  } catch (error) {
    console.error('Update order error:', error)
    const message = error instanceof Error ? error.message : 'Failed to update order'
    return apiError(message, 500)
  }
}
