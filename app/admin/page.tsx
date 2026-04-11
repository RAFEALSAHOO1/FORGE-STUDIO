'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  LayoutDashboard, Package, Users, Settings, TrendingUp,
  DollarSign, Clock, CheckCircle, AlertCircle, RefreshCw,
  Loader2, ShieldAlert
} from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import { OrdersTable, UsersTable, type OrderRow, type UserRow } from '@/components/ui/AdminTable'
import { SkeletonCard } from '@/components/ui/Skeleton'
import { useAuth } from '@/lib/auth-context'
import { useToast } from '@/components/ui/Toast'

type AdminView = 'overview' | 'orders' | 'users' | 'analytics'

const SAMPLE_ORDERS: OrderRow[] = [
  { id: 'ORD-001', client: 'Sarah Kim',    service: 'Wedding Invitation Suite', status: 'progress',  date: 'Apr 3, 2025',  amount: '$39' },
  { id: 'ORD-002', client: 'Mark Torres',  service: 'Brand Identity Package',   status: 'pending',   date: 'Apr 5, 2025',  amount: '$149' },
  { id: 'ORD-003', client: 'Priya Shah',   service: 'Instagram Story Pack',     status: 'completed', date: 'Mar 28, 2025', amount: '$49' },
  { id: 'ORD-004', client: 'James Wilson', service: 'Event Poster Design',      status: 'pending',   date: 'Apr 6, 2025',  amount: '$29' },
  { id: 'ORD-005', client: 'Liu Fang',     service: 'Restaurant Menu',          status: 'cancelled', date: 'Apr 1, 2025',  amount: '$59' },
  { id: 'ORD-006', client: 'Emma Clarke',  service: 'Business Card Set',        status: 'completed', date: 'Mar 25, 2025', amount: '$19' },
]

const SAMPLE_USERS: UserRow[] = [
  { id: 'USR-001', name: 'Sarah Kim',    email: 'sarah@example.com',  role: 'user',  joined: 'Jan 2024', orders: 4,  status: 'active' },
  { id: 'USR-002', name: 'Mark Torres',  email: 'mark@example.com',   role: 'user',  joined: 'Feb 2024', orders: 2,  status: 'active' },
  { id: 'USR-003', name: 'Admin User',   email: 'admin@forge.studio', role: 'admin', joined: 'Jan 2024', orders: 0,  status: 'active' },
  { id: 'USR-004', name: 'Priya Shah',   email: 'priya@example.com',  role: 'user',  joined: 'Mar 2024', orders: 8,  status: 'active' },
  { id: 'USR-005', name: 'James Wilson', email: 'james@example.com',  role: 'user',  joined: 'Apr 2024', orders: 1,  status: 'suspended' },
]

const NAV = [
  { id: 'overview'  as AdminView, label: 'Overview',   icon: LayoutDashboard },
  { id: 'orders'    as AdminView, label: 'Orders',     icon: Package },
  { id: 'users'     as AdminView, label: 'Users',      icon: Users },
  { id: 'analytics' as AdminView, label: 'Analytics',  icon: TrendingUp },
]

const STATS = [
  { label: 'Total Revenue',    value: '$12,840', icon: DollarSign,  color: '#4ade80', delta: '+18% this month' },
  { label: 'Active Orders',    value: '23',      icon: Clock,       color: '#89AACC', delta: '5 need review' },
  { label: 'Completed Today',  value: '7',       icon: CheckCircle, color: '#f7e479', delta: 'On track' },
  { label: 'Pending Approval', value: '4',       icon: AlertCircle, color: '#fb923c', delta: 'Action needed' },
]

export default function AdminPage() {
  const { user, isAdmin } = useAuth()
  const { success, error: toastErr, info } = useToast()

  const [view, setView]         = useState<AdminView>('overview')
  const [orders, setOrders]     = useState(SAMPLE_ORDERS)
  const [users, setUsers]       = useState(SAMPLE_USERS)
  const [filter, setFilter]     = useState('all')
  const [loading, setLoading]   = useState(false)
  const [analytics, setAnalytics] = useState<Record<string, number>>({})

  /* Fetch real analytics */
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res  = await fetch('/api/analytics')
        const data = await res.json()
        if (data.success) setAnalytics(data.data.eventCounts || {})
      } catch { /* keep empty */ }
    }
    fetchAnalytics()
  }, [])

  /* Auth guard — show lock screen for non-admins */
  if (user && !isAdmin) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
          <ShieldAlert size={48} className="text-red-400 opacity-60" />
          <h1 className="text-white text-2xl text-center" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Admin access required
          </h1>
          <p className="text-white/40 text-sm">Your account doesn&apos;t have admin privileges.</p>
          <Link href="/dashboard">
            <button className="liquid-glass rounded-full px-6 py-3 text-white text-sm hover:bg-white/5 transition-colors">
              ← Back to Dashboard
            </button>
          </Link>
        </div>
      </div>
    )
  }

  const handleApprove = (id: string) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'progress' as const } : o))
    success('Order approved', `Order ${id} is now in progress.`)
  }

  const handleCancel = (id: string) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'cancelled' as const } : o))
    info('Order cancelled', `Order ${id} has been cancelled.`)
  }

  const handleSuspend = (id: string) => {
    setUsers(prev => prev.map(u => u.id === id ? {
      ...u, status: u.status === 'suspended' ? 'active' as const : 'suspended' as const
    } : u))
  }

  const handleMakeAdmin = (id: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, role: 'admin' as const } : u))
    success('Role updated', `User ${id} is now an admin.`)
  }

  const filteredOrders = filter === 'all' ? orders : orders.filter(o => o.status === filter)

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-6 pb-32">
        {/* Admin banner */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="liquid-glass rounded-2xl px-6 py-4 mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center">
              <AlertCircle size={16} className="text-orange-400" />
            </div>
            <p className="text-white/75 text-sm">
              <span className="text-orange-400 font-medium">Admin Panel</span>
              {' · '}Signed in as <span className="text-white font-medium">{user?.name || 'Admin'}</span>
              {' · '}<span className="text-white/40">{orders.filter(o => o.status === 'pending').length} orders pending approval</span>
            </p>
          </div>
          <span className="text-white/20 text-xs hidden md:block">DesignForge Admin v1.0</span>
        </motion.div>

        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="hidden lg:flex flex-col gap-1 w-52 flex-shrink-0">
            <p className="text-white/20 text-xs tracking-widest uppercase px-3 mb-3">Navigation</p>
            {NAV.map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => setView(id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all text-left ${view === id ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
                <Icon size={16} /> {label}
              </button>
            ))}
            <div className="mt-4 pt-4 border-t border-white/5">
              <Link href="/settings">
                <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-white/40 hover:text-white hover:bg-white/5 transition-all w-full text-left">
                  <Settings size={16} /> Settings
                </button>
              </Link>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Mobile tabs */}
            <div className="lg:hidden flex gap-2 mb-6 overflow-x-auto pb-1 scrollbar-none">
              {NAV.map(({ id, label, icon: Icon }) => (
                <button key={id} onClick={() => setView(id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm flex-shrink-0 transition-all ${view === id ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white'}`}>
                  <Icon size={14} /> {label}
                </button>
              ))}
            </div>

            <motion.div key={view} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>

              {/* ── OVERVIEW ── */}
              {view === 'overview' && (
                <div className="flex flex-col gap-8">
                  <div>
                    <p className="text-white/40 text-xs tracking-widest uppercase mb-2">Admin</p>
                    <h1 className="text-3xl text-white tracking-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>Studio Overview</h1>
                  </div>

                  <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                    {STATS.map((s, i) => (
                      <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                        className="liquid-glass rounded-2xl p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${s.color}18` }}>
                            <s.icon size={18} style={{ color: s.color }} />
                          </div>
                          <TrendingUp size={14} className="text-white/15" />
                        </div>
                        <p className="text-3xl text-white mb-1" style={{ fontFamily: "'Instrument Serif', serif" }}>{s.value}</p>
                        <p className="text-white/55 text-xs font-medium">{s.label}</p>
                        <p className="text-white/25 text-xs mt-1">{s.delta}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Pending approvals */}
                  <div className="liquid-glass rounded-3xl overflow-hidden">
                    <div className="flex items-center justify-between px-8 py-5 border-b border-white/5">
                      <h2 className="text-white font-medium">Pending Approvals</h2>
                      <button onClick={() => setView('orders')} className="text-[#89AACC] text-xs hover:underline">View all →</button>
                    </div>
                    <OrdersTable
                      orders={orders.filter(o => o.status === 'pending')}
                      onApprove={handleApprove} onCancel={handleCancel}
                    />
                    {orders.filter(o => o.status === 'pending').length === 0 && (
                      <div className="py-12 text-center text-white/25 text-sm">No pending orders 🎉</div>
                    )}
                  </div>

                  {/* Revenue breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { label: 'Posters',  pct: 35, amount: '$4,494' },
                      { label: 'Branding', pct: 40, amount: '$5,136' },
                      { label: 'Other',    pct: 25, amount: '$3,210' },
                    ].map(({ label, pct, amount }) => (
                      <div key={label} className="liquid-glass rounded-2xl p-6">
                        <p className="text-white/35 text-xs tracking-widest uppercase mb-3">{label}</p>
                        <p className="text-white text-2xl mb-3" style={{ fontFamily: "'Instrument Serif', serif" }}>{amount}</p>
                        <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
                          <motion.div className="h-full rounded-full"
                            style={{ background: 'linear-gradient(90deg, #89AACC, #4E85BF)' }}
                            initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                            transition={{ duration: 1, delay: 0.4 }} />
                        </div>
                        <p className="text-white/25 text-xs mt-2">{pct}% of revenue</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── ORDERS ── */}
              {view === 'orders' && (
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <p className="text-white/40 text-xs tracking-widest uppercase mb-1">Manage</p>
                      <h1 className="text-3xl text-white tracking-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>All Orders</h1>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {['all', 'pending', 'progress', 'completed', 'cancelled'].map(f => (
                        <button key={f} onClick={() => setFilter(f)}
                          className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-all ${filter === f ? 'bg-white/15 text-white' : 'text-white/35 hover:text-white hover:bg-white/5'}`}>
                          {f} ({f === 'all' ? orders.length : orders.filter(o => o.status === f).length})
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="liquid-glass rounded-3xl overflow-hidden">
                    <OrdersTable orders={filteredOrders} onApprove={handleApprove} onCancel={handleCancel} />
                    {filteredOrders.length === 0 && (
                      <div className="py-14 text-center text-white/25 text-sm">No orders match this filter.</div>
                    )}
                  </div>
                </div>
              )}

              {/* ── USERS ── */}
              {view === 'users' && (
                <div className="flex flex-col gap-6">
                  <div>
                    <p className="text-white/40 text-xs tracking-widest uppercase mb-1">Manage</p>
                    <h1 className="text-3xl text-white tracking-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>Users</h1>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: 'Total Users', value: users.length },
                      { label: 'Active',      value: users.filter(u => u.status === 'active').length },
                      { label: 'Admins',      value: users.filter(u => u.role === 'admin').length },
                    ].map(({ label, value }) => (
                      <div key={label} className="liquid-glass rounded-2xl p-5 text-center">
                        <p className="text-2xl text-white" style={{ fontFamily: "'Instrument Serif', serif" }}>{value}</p>
                        <p className="text-white/35 text-xs mt-1">{label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="liquid-glass rounded-3xl overflow-hidden">
                    <UsersTable users={users} onSuspend={handleSuspend} onMakeAdmin={handleMakeAdmin} />
                  </div>
                </div>
              )}

              {/* ── ANALYTICS ── */}
              {view === 'analytics' && (
                <div className="flex flex-col gap-6">
                  <div>
                    <p className="text-white/40 text-xs tracking-widest uppercase mb-1">Insights</p>
                    <h1 className="text-3xl text-white tracking-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>Analytics</h1>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {Object.entries(analytics).length > 0 ? (
                      Object.entries(analytics).map(([event, count]) => (
                        <div key={event} className="liquid-glass rounded-2xl p-5">
                          <p className="text-white text-2xl mb-1" style={{ fontFamily: "'Instrument Serif', serif" }}>{count}</p>
                          <p className="text-white/35 text-xs capitalize">{event.replace(/_/g, ' ')}</p>
                        </div>
                      ))
                    ) : (
                      [
                        { label: 'Page Views',      value: '2,847' },
                        { label: 'Browse Opens',    value: '1,203' },
                        { label: 'Forge Opens',     value: '486' },
                        { label: 'Designs Saved',   value: '134' },
                        { label: 'Orders Started',  value: '89' },
                        { label: 'Orders Completed',value: '72' },
                      ].map(({ label, value }) => (
                        <div key={label} className="liquid-glass rounded-2xl p-5">
                          <p className="text-white text-2xl mb-1" style={{ fontFamily: "'Instrument Serif', serif" }}>{value}</p>
                          <p className="text-white/35 text-xs">{label}</p>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Conversion funnel */}
                  <div className="liquid-glass rounded-3xl p-8">
                    <h3 className="text-white font-medium mb-6">Conversion Funnel</h3>
                    {[
                      { stage: 'Visitors',        value: 2847, pct: 100 },
                      { stage: 'Browse Page',      value: 1203, pct: 42 },
                      { stage: 'Forge Opens',      value: 486,  pct: 17 },
                      { stage: 'Order Started',    value: 89,   pct: 3.1 },
                      { stage: 'Payment Complete', value: 72,   pct: 2.5 },
                    ].map(({ stage, value, pct }) => (
                      <div key={stage} className="mb-4">
                        <div className="flex items-center justify-between text-sm mb-1.5">
                          <span className="text-white/60">{stage}</span>
                          <span className="text-white/40">{value.toLocaleString()} <span className="text-white/25 text-xs">({pct}%)</span></span>
                        </div>
                        <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                          <motion.div className="h-full rounded-full bg-gradient-to-r from-[#89AACC] to-[#4E85BF]"
                            initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                            transition={{ duration: 1, ease: 'easeOut' }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
