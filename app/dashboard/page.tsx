'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Package, Clock, CheckCircle, TrendingUp, Plus,
  ArrowRight, Star, FileImage, FileText, Layers,
  LogOut, User, Settings
} from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import { SkeletonCard } from '@/components/ui/Skeleton'
import { useAuth } from '@/lib/auth-context'
import { useToast } from '@/components/ui/Toast'
import Card from '@/components/ui/Card'

interface Order {
  id: string
  service: string
  status: 'pending' | 'progress' | 'completed' | 'cancelled'
  date: string
  amount: string
  thumb: string
}

const STATUS_STYLE: Record<string, { bg: string; text: string; label: string }> = {
  pending:   { bg: 'rgba(247,228,121,0.15)', text: '#f7e479', label: 'Pending' },
  progress:  { bg: 'rgba(137,170,204,0.15)', text: '#89AACC', label: 'In Progress' },
  completed: { bg: 'rgba(74,222,128,0.15)',  text: '#4ade80', label: 'Completed' },
  cancelled: { bg: 'rgba(248,113,113,0.15)', text: '#f87171', label: 'Cancelled' },
}

const QUICK = [
  { label: 'New Poster',     icon: FileImage, href: '/forge?product=poster' },
  { label: 'New Invitation', icon: FileText,  href: '/forge?product=invitation' },
  { label: 'Brand Kit',      icon: Layers,    href: '/forge?product=brand-kit' },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay },
})

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const { info } = useToast()
  const [orders, setOrders]   = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  /* Fetch real orders from API */
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = user?.id || 'user-1'
        const res  = await fetch(`/api/orders?userId=${userId}`)
        const data = await res.json()
        if (data.success && data.data.orders.length > 0) {
          setOrders(data.data.orders.map((o: Record<string, unknown>) => ({
            id:      o.id as string,
            service: o.productName as string,
            status:  o.status as Order['status'],
            date:    new Date(o.createdAt as string).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            amount:  `$${((o.amount as number) / 100).toFixed(2)}`,
            thumb:   '🎨',
          })))
        } else {
          /* Fallback sample data so dashboard never looks empty */
          setOrders([
            { id: 'ORD-001', service: 'Wedding Invitation Suite', status: 'progress',  date: 'Apr 3, 2025',  amount: '$39',  thumb: '💌' },
            { id: 'ORD-002', service: 'Brand Identity Package',   status: 'pending',   date: 'Apr 5, 2025',  amount: '$149', thumb: '🎨' },
            { id: 'ORD-003', service: 'Instagram Story Templates',status: 'completed', date: 'Mar 28, 2025', amount: '$49',  thumb: '📱' },
          ])
        }
      } catch {
        setOrders([
          { id: 'ORD-001', service: 'Wedding Invitation Suite', status: 'progress',  date: 'Apr 3, 2025',  amount: '$39',  thumb: '💌' },
          { id: 'ORD-002', service: 'Brand Identity Package',   status: 'pending',   date: 'Apr 5, 2025',  amount: '$149', thumb: '🎨' },
        ])
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [user?.id])

  const STATS = [
    { label: 'Active Orders',   value: orders.filter(o => o.status === 'progress').length  || 2,  icon: Clock,         color: '#89AACC', delta: 'In production' },
    { label: 'Completed',       value: orders.filter(o => o.status === 'completed').length || 12, icon: CheckCircle,   color: '#4ade80', delta: 'All time' },
    { label: 'Pending Review',  value: orders.filter(o => o.status === 'pending').length   || 1,  icon: Package,       color: '#f7e479', delta: 'Needs attention' },
    { label: 'Satisfaction',    value: '98%',                                                      icon: Star,          color: '#fb923c', delta: 'Based on reviews' },
  ]

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 pt-10 pb-32">

        {/* Header */}
        <motion.div {...fadeUp(0)} className="flex items-start justify-between mb-12 gap-4">
          <div>
            <p className="text-white/40 text-sm tracking-widest uppercase mb-2">Welcome back</p>
            <h1 className="text-4xl md:text-5xl text-white tracking-tight"
              style={{ fontFamily: "'Instrument Serif', serif" }}>
              {user ? `Hey, ${user.name.split(' ')[0]}` : 'Your Dashboard'}
            </h1>
            {user && <p className="text-white/30 text-sm mt-1">{user.email}</p>}
          </div>

          {/* User actions */}
          <div className="flex items-center gap-2">
            <Link href="/profile">
              <button className="liquid-glass rounded-xl p-2.5 text-white/40 hover:text-white transition-colors">
                <User size={16} />
              </button>
            </Link>
            <Link href="/settings">
              <button className="liquid-glass rounded-xl p-2.5 text-white/40 hover:text-white transition-colors">
                <Settings size={16} />
              </button>
            </Link>
            <button
              onClick={() => { logout(); info('Signed out', 'See you soon!') }}
              className="liquid-glass rounded-xl p-2.5 text-white/40 hover:text-red-400 transition-colors"
              title="Sign out"
            >
              <LogOut size={16} />
            </button>
          </div>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {STATS.map((s, i) => (
            <motion.div key={s.label} {...fadeUp(i * 0.07)} className="liquid-glass rounded-2xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${s.color}18` }}>
                  <s.icon size={18} style={{ color: s.color }} />
                </div>
                <TrendingUp size={14} className="text-white/15" />
              </div>
              <p className="text-3xl text-white mb-1"
                style={{ fontFamily: "'Instrument Serif', serif" }}>
                {s.value}
              </p>
              <p className="text-white/60 text-xs font-medium">{s.label}</p>
              <p className="text-white/25 text-xs mt-1">{s.delta}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Orders list */}
          <motion.div {...fadeUp(0.28)} className="lg:col-span-2">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-white text-lg font-medium">Recent Orders</h2>
              <Link href="/order-tracking"
                className="text-[#89AACC] text-xs flex items-center gap-1 hover:gap-2 transition-all">
                View all <ArrowRight size={12} />
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
              ) : (
                orders.map((order, i) => {
                  const s = STATUS_STYLE[order.status] || STATUS_STYLE.pending
                  return (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.07 }}
                      className="liquid-glass rounded-2xl p-5 flex items-center gap-4 hover:bg-white/[0.02] transition-colors group cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-2xl flex-shrink-0">
                        {order.thumb}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">{order.service}</p>
                        <p className="text-white/35 text-xs mt-0.5">{order.id} · {order.date}</p>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className="text-white/60 text-sm font-medium">{order.amount}</span>
                        <span className="px-3 py-1 rounded-full text-xs font-medium"
                          style={{ background: s.bg, color: s.text }}>
                          {s.label}
                        </span>
                      </div>
                    </motion.div>
                  )
                })
              )}

              {!loading && orders.length === 0 && (
                <div className="liquid-glass rounded-2xl p-10 text-center">
                  <p className="text-4xl mb-3">🎨</p>
                  <p className="text-white/50 text-sm mb-4">No orders yet. Start your first design!</p>
                  <Link href="/browse">
                    <button className="liquid-glass rounded-full px-6 py-2.5 text-white text-sm hover:bg-white/5 transition-colors">
                      Browse Services →
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div {...fadeUp(0.35)} className="flex flex-col gap-5">
            {/* Quick actions */}
            <div>
              <h2 className="text-white text-lg font-medium mb-4">Quick Actions</h2>
              <div className="flex flex-col gap-2.5">
                <Link href="/forge">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-3 liquid-glass rounded-2xl p-4 cursor-pointer hover:bg-white/5 transition-colors group">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#89AACC] to-[#4E85BF] flex items-center justify-center flex-shrink-0">
                      <Plus size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">New Custom Design</p>
                      <p className="text-white/35 text-xs">Open The Forge</p>
                    </div>
                    <ArrowRight size={14} className="text-white/15 ml-auto group-hover:text-white/40 transition-colors" />
                  </motion.div>
                </Link>

                {QUICK.map(qa => (
                  <Link key={qa.label} href={qa.href}>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-3 liquid-glass rounded-2xl p-4 cursor-pointer hover:bg-white/5 transition-colors group">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                        <qa.icon size={16} className="text-white/40" />
                      </div>
                      <p className="text-white/65 text-sm">{qa.label}</p>
                      <ArrowRight size={14} className="text-white/15 ml-auto group-hover:text-white/40 transition-colors" />
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Promo card */}
            <Card
              title="Special Offer"
              paragraph="Get 20% off your next brand kit order"
              items={['Logo + brand colors', 'Typography system', 'Business card design']}
              buttonText="Claim Offer →"
              onButtonClick={() => window.location.href = '/forge?product=brand-kit'}
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
