/**
 * Orders utility functions
 * Provides helpers for order-related operations
 */

export interface Order {
  id: string
  userId: string
  productName: string
  productId: string
  category: string
  amount: number // in cents
  status: 'pending' | 'progress' | 'completed' | 'cancelled'
  paymentId?: string
  createdAt: string
  updatedAt?: string
}

export interface OrderDetails {
  textContent?: string
  primaryColor?: string
  fontFamily?: string
  fontSize?: number
  size?: string
  addons?: string[]
  notes?: string
}

/**
 * Format amount from cents to currency string
 * @param amountCents - Amount in cents (e.g., 2900 for $29.00)
 * @returns Formatted string (e.g., "$29.00")
 */
export function formatOrderAmount(amountCents: number): string {
  return `$${(amountCents / 100).toFixed(2)}`
}

/**
 * Get status badge color
 */
export function getStatusColor(status: string): string {
  switch (status) {
    case 'pending':
      return 'text-yellow-400 bg-yellow-500/15'
    case 'progress':
      return 'text-blue-400 bg-blue-500/15'
    case 'completed':
      return 'text-green-400 bg-green-500/15'
    case 'cancelled':
      return 'text-red-400 bg-red-500/15'
    default:
      return 'text-white/60 bg-white/10'
  }
}

/**
 * Get status label
 */
export function getStatusLabel(status: string): string {
  switch (status) {
    case 'pending':
      return 'Pending Review'
    case 'progress':
      return 'In Progress'
    case 'completed':
      return 'Completed'
    case 'cancelled':
      return 'Cancelled'
    default:
      return 'Unknown'
  }
}

/**
 * Format date to readable string
 */
export function formatDate(dateString: string): string {
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  } catch {
    return dateString
  }
}

/**
 * Calculate order status progress (0-100)
 */
export function getStatusProgress(status: string): number {
  switch (status) {
    case 'pending':
      return 25
    case 'progress':
      return 50
    case 'completed':
      return 100
    case 'cancelled':
      return 0
    default:
      return 0
  }
}
