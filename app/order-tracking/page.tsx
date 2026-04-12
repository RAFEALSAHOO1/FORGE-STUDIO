'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Download, RefreshCw, ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import { OrderTimeline, defaultOrderSteps } from '@/components/ui/OrderTimeline'
import { SkeletonCard } from '@/components/ui/Skeleton'
import { useAuth } from '@/lib/auth-context'

const SAMPLE_ORDERS = [
  { id: 'ORD-001', service: 'Wedding Invitation Suite', status: 'progress' as const, date: 'Apr 3, 2025', thumb: '💌', designer: 'Priya M.', amount: '$39' },
  { id: 'ORD-002', service: 'Brand Identity Package',   status: 'pending'  as const, date: 'Apr 5, 2025', thumb: '🎨', designer: 'Alex R.',  amount: '$149' },
  { id: 'ORD-003', service: 'Instagram Story Templates',status: 'completed'as const, date: 'Mar 28, 2025',thumb: '📱', designer: 'Jordan C.',amount: '$49' },
  { id: 'ORD-004', service: 'Logo Design',             status: 'cancelled'as const, date: 'Mar 20, 2025',thumb: '🔷', designer: 'Sam T.',   amount: '$29' },
]

const STATUS_STYLE: Record<string, { bg: string; text: string; label: string }> = {
  pending:   { bg: 'rgba(247,228,121,0.15)', text: '#f7e479', label: 'Pending' },
  progress:  { bg: 'rgba(137,170,204,0.15)', text: '#89AACC', label: 'In Progress' },
  completed: { bg: 'rgba(74,222,128,0.15)',  text: '#4ade80', label: 'Completed' },
  cancelled: { bg: 'rgba(248,113,113,0.15)', text: '#f87171', label: 'Cancelled' },
}

export default function OrderTrackingPage() {
  const { user } = useAuth()
  const [orders, setOrders]       = useState(SAMPLE_ORDERS)
  const [active, setActive]       = useState(SAMPLE_ORDERS[0])
  const [loading, setLoading]     = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const fetchOrders = useCallback(async (showSpinner = false) => {
    if (showSpinner) setRefreshing(true)
    try {
      const userId = user?.id || 'user-1'
      const res    = await fetch(`/api/orders?userId=${userId}`)
      const data   = await res.json()
      if (data.success && data.data.orders.length > 0) {
        const mapped = data.data.orders.map((o: Record<string, unknown>) => ({
          id:       o.id as string,
          service:  o.productName as string,
          status:   o.status as typeof SAMPLE_ORDERS[0]['status'],
          date:     new Date(o.createdAt as string).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          thumb:    '🎨',
          designer: 'Design Team',
          amount:   `$${((o.amount as number) / 100 || 0).toFixed(2)}`,
        }))
        setOrders(mapped)
        setActive(mapped[0])
      }
    } catch { /* Keep sample data */ } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [user?.id])

  useEffect(() => { fetchOrders() }, [fetchOrders])

  const steps = active.status === 'cancelled' ? [] : defaultOrderSteps(active.status as 'pending' | 'progress' | 'completed')

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 pt-10 pb-32">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-12">
          <Link href="/dashboard" className="flex items-center gap-2 text-white/30 hover:text-white text-sm mb-6 transition-colors w-fit">
            <ArrowLeft size={14} /> Dashboard
          </Link>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-white/40 text-xs tracking-widest uppercase mb-2">Track your orders</p>
              <h1 className="text-4xl text-white tracking-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>Order Status</h1>
            </div>
            <button
              onClick={() => fetchOrders(true)}
              disabled={refreshing}
              className="flex items-center gap-2 liquid-glass rounded-full px-5 py-2.5 text-white/50 text-sm hover:text-white transition-colors disabled:opacity-40"
            >
              {refreshing ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />}
              Refresh
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Orders sidebar */}
          <div className="flex flex-col gap-3">
            <p className="text-white/30 text-xs tracking-widest uppercase mb-1">Your orders</p>
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
            ) : (
              orders.map(order => {
                const s = STATUS_STYLE[order.status] || STATUS_STYLE.pending
                return (
                  <motion.button
                    key={order.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setActive(order)}
                    className={`liquid-glass rounded-2xl p-5 text-left transition-all w-full ${active.id === order.id ? 'ring-1 ring-[#89AACC]/40' : ''}`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl flex-shrink-0">{order.thumb}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium leading-tight truncate">{order.service}</p>
                        <p className="text-white/25 text-xs mt-0.5">{order.id}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-white/25 text-xs">{order.date}</span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs"
                        style={{ background: s.bg, color: s.text }}>{s.label}</span>
                    </div>
                  </motion.button>
                )
              })
            )}

            <Link href="/order">
              <button className="w-full liquid-glass rounded-2xl p-4 text-center text-[#89AACC] text-sm hover:bg-white/5 transition-colors mt-1">
                + Place New Order
              </button>
            </Link>
          </div>

          {/* Active order detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.3 }}
              className="lg:col-span-2 flex flex-col gap-5"
            >
              {/* Order header card */}
              <div className="liquid-glass rounded-3xl p-8">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{active.thumb}</span>
                    <div>
                      <h2 className="text-white text-lg font-medium">{active.service}</h2>
                      <p className="text-white/35 text-sm">{active.id} · Ordered {active.date}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1.5 rounded-full text-sm flex-shrink-0"
                    style={{ background: STATUS_STYLE[active.status]?.bg, color: STATUS_STYLE[active.status]?.text }}>
                    {STATUS_STYLE[active.status]?.label}
                  </span>
                </div>

                {/* Info grid */}
                <div className="grid grid-cols-3 gap-4 py-5 border-y border-white/5 mb-6">
                  {[
                    { label: 'Assigned to', value: active.designer },
                    { label: 'Amount',       value: active.amount },
                    { label: 'Delivery',     value: active.status === 'completed' ? 'Delivered' : '3 days left' },
                  ].map(({ label, value }) => (
                    <div key={label} className="text-center">
                      <p className="text-white/25 text-xs mb-1">{label}</p>
                      <p className="text-white text-sm font-medium">{value}</p>
                    </div>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap gap-3">
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 liquid-glass rounded-full px-5 py-2.5 text-white/60 text-sm hover:text-white transition-colors">
                    <MessageCircle size={14} /> Message Designer
                  </motion.button>
                  {active.status === 'completed' && (
                    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      className="flex items-center gap-2 bg-white text-black rounded-full px-5 py-2.5 text-sm font-medium">
                      <Download size={14} /> Download Files
                    </motion.button>
                  )}
                  {active.status !== 'cancelled' && active.status !== 'completed' && (
                    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      className="flex items-center gap-2 liquid-glass rounded-full px-5 py-2.5 text-white/60 text-sm hover:text-white transition-colors">
                      <RefreshCw size={14} /> Request Revision
                    </motion.button>
                  )}
                </div>
              </div>

              {/* Timeline */}
              <div className="liquid-glass rounded-3xl p-8">
                <h3 className="text-white font-medium mb-8">Progress Timeline</h3>
                <OrderTimeline steps={steps} />
              </div>

              {/* Designer note */}
              {active.status !== 'pending' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                  className="liquid-glass rounded-3xl p-8">
                  <h3 className="text-white font-medium mb-5">Designer Update</h3>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#89AACC] to-[#4E85BF] flex items-center justify-center text-sm font-semibold text-white flex-shrink-0">
                      {active.designer.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <p className="text-white text-sm font-medium">{active.designer}</p>
                        <span className="text-white/25 text-xs">· 2 hours ago</span>
                      </div>
                      <p className="text-white/50 text-sm leading-relaxed">
                        {active.status === 'completed'
                          ? 'Your design has been completed and delivered! Please check your email for the download link. Let me know if you need any final tweaks.'
                          : "I've reviewed your brief and started working on initial concepts. The design will focus on elegance with a modern typographic treatment. I'll share the first draft within 24 hours."}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
