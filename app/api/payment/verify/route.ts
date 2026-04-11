import { NextRequest } from 'next/server'
import { apiSuccess, apiError, sanitizeString, rateLimit } from '@/lib/utils'

// POST /api/payment/verify
// Called from frontend after Razorpay payment to verify signature before fulfillment

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown'
  const { allowed } = rateLimit(`payment-verify-${ip}`, 20, 60_000)
  if (!allowed) return apiError('Rate limit exceeded', 429)

  try {
    const body = await req.json()
    const gateway = sanitizeString(body.gateway || 'stripe', 20)

    if (gateway === 'razorpay') {
      // Production: verify Razorpay signature
      // const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body
      // const crypto = require('crypto')
      // const expected = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      //   .update(`${razorpay_order_id}|${razorpay_payment_id}`).digest('hex')
      // if (expected !== razorpay_signature) return apiError('Invalid payment signature', 400)

      // Mock success
      return apiSuccess({
        verified: true,
        gateway: 'razorpay',
        paymentId: sanitizeString(body.razorpay_payment_id || `rz_pay_${Date.now()}`, 100),
        orderId: sanitizeString(body.razorpay_order_id || '', 100),
        method: 'upi',
        status: 'captured',
      })
    }

    if (gateway === 'stripe') {
      // Production: confirm payment intent is succeeded
      // const pi = await stripe.paymentIntents.retrieve(body.paymentIntentId)
      // if (pi.status !== 'succeeded') return apiError('Payment not completed', 400)

      return apiSuccess({
        verified: true,
        gateway: 'stripe',
        paymentId: sanitizeString(body.paymentIntentId || `pi_${Date.now()}`, 100),
        status: 'succeeded',
      })
    }

    return apiError('Unknown payment gateway', 400)
  } catch {
    return apiError('Payment verification failed', 500)
  }
}
