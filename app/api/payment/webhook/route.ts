import { NextRequest } from 'next/server'
import { apiSuccess, apiError } from '@/lib/utils'

// ─── POST /api/payment/webhook ────────────────────────────────────────────────
// Receives webhooks from Stripe and Razorpay

export async function POST(req: NextRequest) {
  const signature = req.headers.get('stripe-signature')
  const razorpaySignature = req.headers.get('x-razorpay-signature')

  try {
    const body = await req.text()

    // ── Stripe webhook ────────────────────────────────────────────────────────
    if (signature) {
      // Production:
      // const event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
      const event = JSON.parse(body)

      switch (event.type) {
        case 'payment_intent.succeeded':
          await handleStripeSuccess(event.data.object)
          break
        case 'payment_intent.payment_failed':
          await handleStripeFailure(event.data.object)
          break
        case 'charge.refunded':
          await handleStripeRefund(event.data.object)
          break
        case 'checkout.session.completed':
          await handleCheckoutComplete(event.data.object)
          break
        default:
          console.log(`[webhook] Unhandled Stripe event: ${event.type}`)
      }
      return apiSuccess({ received: true, gateway: 'stripe' })
    }

    // ── Razorpay webhook ──────────────────────────────────────────────────────
    if (razorpaySignature) {
      // Production:
      // const crypto = require('crypto')
      // const expectedSig = crypto.createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET!).update(body).digest('hex')
      // if (razorpaySignature !== expectedSig) return apiError('Invalid signature', 400)
      const event = JSON.parse(body)

      switch (event.event) {
        case 'payment.captured':
          await handleRazorpaySuccess(event.payload.payment.entity)
          break
        case 'payment.failed':
          await handleRazorpayFailure(event.payload.payment.entity)
          break
        case 'refund.created':
          await handleRazorpayRefund(event.payload.refund.entity)
          break
        default:
          console.log(`[webhook] Unhandled Razorpay event: ${event.event}`)
      }
      return apiSuccess({ received: true, gateway: 'razorpay' })
    }

    return apiError('Unknown webhook source', 400)
  } catch (err) {
    console.error('[webhook error]', err)
    return apiError('Webhook processing failed', 500)
  }
}

// ─── Handlers ─────────────────────────────────────────────────────────────────
async function handleStripeSuccess(paymentIntent: Record<string, unknown>) {
  console.log('[Stripe] Payment succeeded:', paymentIntent.id)
  // TODO: Update order status in DB, send confirmation email
}

async function handleStripeFailure(paymentIntent: Record<string, unknown>) {
  console.log('[Stripe] Payment failed:', paymentIntent.id)
  // TODO: Notify customer, update order status
}

async function handleStripeRefund(charge: Record<string, unknown>) {
  console.log('[Stripe] Refund processed:', charge.id)
  // TODO: Update order status, notify customer
}

async function handleCheckoutComplete(session: Record<string, unknown>) {
  console.log('[Stripe] Checkout completed:', session.id)
}

async function handleRazorpaySuccess(payment: Record<string, unknown>) {
  console.log('[Razorpay] UPI/NetBanking payment captured:', payment.id)
  // TODO: Update order, send confirmation
}

async function handleRazorpayFailure(payment: Record<string, unknown>) {
  console.log('[Razorpay] Payment failed:', payment.id)
}

async function handleRazorpayRefund(refund: Record<string, unknown>) {
  console.log('[Razorpay] Refund created:', refund.id)
}
