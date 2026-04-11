import { NextRequest } from 'next/server'
import { rateLimit, apiSuccess, apiError, sanitizeString, sanitizeEmail } from '@/lib/utils'

// ─── Payment configuration ────────────────────────────────────────────────────
// In production: npm install stripe razorpay
// import Stripe from 'stripe'
// import Razorpay from 'razorpay'

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
// const razorpay = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID!, key_secret: process.env.RAZORPAY_KEY_SECRET! })

export type PaymentMethod =
  | 'card'          // Stripe — all international cards
  | 'paypal'        // PayPal — 200+ countries
  | 'upi'           // Razorpay UPI — India (GPay, PhonePe, Paytm, BHIM)
  | 'netbanking'    // Razorpay NetBanking — India
  | 'wallet'        // Razorpay Wallets — Paytm, Amazon Pay, etc.
  | 'crypto'        // Coinbase Commerce
  | 'apple_pay'     // Stripe Apple Pay
  | 'google_pay'    // Stripe Google Pay

export type Currency = 'USD' | 'EUR' | 'GBP' | 'INR' | 'AED' | 'CAD' | 'AUD' | 'SGD'

// Currency → payment gateway routing
const CURRENCY_GATEWAY: Record<Currency, 'stripe' | 'razorpay'> = {
  USD: 'stripe', EUR: 'stripe', GBP: 'stripe',
  AED: 'stripe', CAD: 'stripe', AUD: 'stripe', SGD: 'stripe',
  INR: 'razorpay', // Route India to Razorpay for UPI support
}

// Method → gateway
const METHOD_GATEWAY: Record<PaymentMethod, 'stripe' | 'razorpay' | 'coinbase'> = {
  card:        'stripe',
  apple_pay:   'stripe',
  google_pay:  'stripe',
  paypal:      'stripe',
  upi:         'razorpay',
  netbanking:  'razorpay',
  wallet:      'razorpay',
  crypto:      'coinbase',
}

// Exchange rates (in production: fetch from Fixer.io / Open Exchange Rates)
const USD_RATES: Record<Currency, number> = {
  USD: 1, EUR: 0.92, GBP: 0.79, INR: 83.5,
  AED: 3.67, CAD: 1.36, AUD: 1.53, SGD: 1.35,
}

function convertToUSD(amount: number, currency: Currency): number {
  return Math.round(amount / USD_RATES[currency] * 100) / 100
}

// In-memory payment store (replace with DB)
interface PaymentIntent {
  id: string
  orderId: string
  amount: number
  currency: Currency
  amountUSD: number
  method: PaymentMethod
  gateway: string
  status: 'pending' | 'processing' | 'succeeded' | 'failed' | 'refunded'
  customerId: string
  customerEmail: string
  createdAt: string
  gatewayRef?: string  // Stripe PI id / Razorpay order id
  metadata: Record<string, string>
}

const paymentStore: PaymentIntent[] = []

// ─── POST /api/payment/create ─────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown'
  const { allowed } = rateLimit(`payment-create-${ip}`, 10, 60_000)
  if (!allowed) return apiError('Too many payment requests. Please wait.', 429)

  try {
    const body = await req.json()

    const method = (body.method || 'card') as PaymentMethod
    const currency = (body.currency || 'USD') as Currency
    const amount = Number(body.amount)

    if (!amount || amount <= 0) return apiError('Invalid payment amount', 400)
    if (!USD_RATES[currency]) return apiError('Unsupported currency', 400)

    const gateway = METHOD_GATEWAY[method] || 'stripe'
    const amountUSD = convertToUSD(amount, currency)

    // ── Stripe flow (card, apple pay, google pay, paypal) ───────────────────
    if (gateway === 'stripe') {
      // Production code:
      // const paymentIntent = await stripe.paymentIntents.create({
      //   amount: Math.round(amount * 100), // stripe uses cents
      //   currency: currency.toLowerCase(),
      //   payment_method_types: method === 'card' ? ['card'] : [method.replace('_', '')],
      //   metadata: { orderId: body.orderId, customerEmail: body.customerEmail },
      // })
      const mockPI: PaymentIntent = {
        id: `pi_${Date.now()}`,
        orderId: sanitizeString(body.orderId),
        amount,
        currency,
        amountUSD,
        method,
        gateway: 'stripe',
        status: 'pending',
        customerId: sanitizeString(body.userId || 'guest'),
        customerEmail: sanitizeEmail(body.customerEmail),
        createdAt: new Date().toISOString(),
        gatewayRef: `pi_mock_${Date.now()}`,
        metadata: { orderId: body.orderId || '', productName: sanitizeString(body.productName) },
      }
      paymentStore.push(mockPI)
      return apiSuccess({
        paymentIntentId: mockPI.id,
        clientSecret: `${mockPI.id}_secret_mock`, // Stripe returns this for frontend
        gateway: 'stripe',
        currency,
        amount,
        amountUSD,
        // In production: publishableKey from env for Stripe.js
        publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder',
      }, 201)
    }

    // ── Razorpay flow (UPI, netbanking, wallets — India) ────────────────────
    if (gateway === 'razorpay') {
      // Production code:
      // const razorpayOrder = await razorpay.orders.create({
      //   amount: Math.round(amount * 100), // paise
      //   currency: 'INR',
      //   receipt: `rcpt_${Date.now()}`,
      //   notes: { orderId: body.orderId },
      // })
      const mockRZ: PaymentIntent = {
        id: `rz_${Date.now()}`,
        orderId: sanitizeString(body.orderId),
        amount,
        currency: 'INR',
        amountUSD,
        method,
        gateway: 'razorpay',
        status: 'pending',
        customerId: sanitizeString(body.userId || 'guest'),
        customerEmail: sanitizeEmail(body.customerEmail),
        createdAt: new Date().toISOString(),
        gatewayRef: `order_mock_${Date.now()}`,
        metadata: { orderId: body.orderId || '' },
      }
      paymentStore.push(mockRZ)
      return apiSuccess({
        razorpayOrderId: mockRZ.gatewayRef,
        paymentIntentId: mockRZ.id,
        gateway: 'razorpay',
        currency: 'INR',
        amount,
        amountUSD,
        keyId: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder',
        prefill: {
          email: sanitizeEmail(body.customerEmail),
          name: sanitizeString(body.customerName),
        },
        theme: { color: '#89AACC' },
      }, 201)
    }

    // ── Crypto (Coinbase Commerce) ───────────────────────────────────────────
    return apiSuccess({
      paymentIntentId: `cb_${Date.now()}`,
      gateway: 'coinbase',
      cryptoAddress: { BTC: 'bc1q9v8r7t6y5u4i3o2p1...', ETH: '0x742d35Cc6634C0532...', USDT: 'TXxxxxxxxxx...' },
      amountUSD,
      expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
    }, 201)
  } catch (err) {
    console.error('[payment/create]', err)
    return apiError('Payment creation failed. Please try again.', 500)
  }
}

// ─── GET /api/payment/create — get payment status ─────────────────────────────
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = sanitizeString(searchParams.get('id') ?? '')
  if (!id) return apiError('Payment ID required', 400)

  const payment = paymentStore.find(p => p.id === id || p.gatewayRef === id)
  if (!payment) return apiError('Payment not found', 404)

  return apiSuccess({ payment })
}
