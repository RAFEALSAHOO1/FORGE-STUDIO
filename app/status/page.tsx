'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, AlertTriangle, XCircle, Activity } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

type ServiceStatus = 'operational' | 'degraded' | 'down'

const SERVICES: { name: string; status: ServiceStatus; uptime: string; latency: string }[] = [
  { name: 'Website & CDN',       status: 'operational', uptime: '99.98%', latency: '42ms' },
  { name: 'Design API',          status: 'operational', uptime: '99.95%', latency: '88ms' },
  { name: 'Authentication',      status: 'operational', uptime: '100%',   latency: '31ms' },
  { name: 'Payment Processing',  status: 'operational', uptime: '99.99%', latency: '120ms' },
  { name: 'File Delivery',       status: 'operational', uptime: '99.90%', latency: '65ms' },
  { name: 'Order Management',    status: 'operational', uptime: '99.97%', latency: '55ms' },
  { name: 'Email Notifications', status: 'operational', uptime: '99.85%', latency: '200ms' },
  { name: 'Analytics',           status: 'operational', uptime: '99.80%', latency: '90ms' },
]

const INCIDENTS = [
  { date: 'Apr 5, 2025', title: 'Resolved: Elevated latency on design API', duration: '22 minutes', severity: 'minor' },
  { date: 'Mar 20, 2025', title: 'Resolved: Email delivery delays',         duration: '45 minutes', severity: 'minor' },
]

const STATUS_CONFIG: Record<ServiceStatus, { icon: typeof CheckCircle; color: string; label: string; bg: string }> = {
  operational: { icon: CheckCircle,   color: '#4ade80', label: 'Operational', bg: 'rgba(74,222,128,0.1)' },
  degraded:    { icon: AlertTriangle, color: '#fbbf24', label: 'Degraded',    bg: 'rgba(251,191,36,0.1)' },
  down:        { icon: XCircle,       color: '#f87171', label: 'Down',        bg: 'rgba(248,113,113,0.1)' },
}

// Deterministic seeded pseudo-random — avoids hydration mismatch
function seededRandom(seed: number): number {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

function UptimeBar({ uptime, serviceIndex }: { uptime: string; serviceIndex: number }) {
  // Compute bar data once, deterministically (no Math.random in render)
  const bars = useMemo(() => {
    const pct = parseFloat(uptime) / 100
    return Array.from({ length: 90 }, (_, i) => {
      const seed = serviceIndex * 100 + i
      const fail = seededRandom(seed) > pct
      const h = fail ? 40 : 60 + seededRandom(seed + 1000) * 40
      const op = 0.55 + seededRandom(seed + 2000) * 0.45
      return { fail, h, op }
    })
  }, [uptime, serviceIndex])

  return (
    <div className="flex gap-0.5 h-6 items-end">
      {bars.map((bar, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm transition-all"
          style={{
            height: `${bar.h}%`,
            background: bar.fail ? '#f87171' : '#4ade80',
            opacity: bar.op,
          }}
        />
      ))}
    </div>
  )
}

export default function StatusPage() {
  const allOk = SERVICES.every(s => s.status === 'operational')

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 pt-12 pb-24">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ background: allOk ? 'rgba(74,222,128,0.1)' : 'rgba(251,191,36,0.1)' }}>
              <Activity size={26} style={{ color: allOk ? '#4ade80' : '#fbbf24' }} />
            </div>
            <div>
              <h1 className="text-4xl text-white tracking-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>System Status</h1>
              <p className="text-white/40 text-sm mt-1">Real-time status of all DesignForge services</p>
            </div>
          </div>

          <div className="rounded-2xl p-5 flex items-center gap-4"
            style={{
              background: allOk ? 'rgba(74,222,128,0.08)' : 'rgba(251,191,36,0.08)',
              border: `1px solid ${allOk ? 'rgba(74,222,128,0.2)' : 'rgba(251,191,36,0.2)'}`,
            }}>
            <div className="w-3 h-3 rounded-full animate-pulse flex-shrink-0"
              style={{ background: allOk ? '#4ade80' : '#fbbf24' }} />
            <p className="text-white font-medium">
              {allOk ? 'All systems fully operational' : 'Some services are experiencing issues'}
            </p>
            <span className="ml-auto text-white/30 text-sm hidden md:block">
              {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
        </motion.div>

        {/* Services */}
        <div className="flex flex-col gap-4 mb-16">
          {SERVICES.map((svc, i) => {
            const cfg = STATUS_CONFIG[svc.status]
            return (
              <motion.div key={svc.name}
                initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06, duration: 0.4 }}
                className="liquid-glass rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: cfg.bg }}>
                      <cfg.icon size={16} style={{ color: cfg.color }} />
                    </div>
                    <p className="text-white text-sm font-medium">{svc.name}</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right hidden md:block">
                      <p className="text-white/30 text-xs">Uptime</p>
                      <p className="text-white/70 text-sm">{svc.uptime}</p>
                    </div>
                    <div className="text-right hidden md:block">
                      <p className="text-white/30 text-xs">Latency</p>
                      <p className="text-white/70 text-sm">{svc.latency}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{ background: cfg.bg, color: cfg.color }}>
                      {cfg.label}
                    </span>
                  </div>
                </div>
                <UptimeBar uptime={svc.uptime} serviceIndex={i} />
                <p className="text-white/20 text-xs mt-2">Last 90 days</p>
              </motion.div>
            )
          })}
        </div>

        {/* Incident history */}
        <h2 className="text-white text-xl font-medium mb-6">Incident History</h2>
        <div className="flex flex-col gap-4">
          {INCIDENTS.map((inc, i) => (
            <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.08 }}
              className="liquid-glass rounded-2xl p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-white text-sm font-medium mb-1">{inc.title}</p>
                  <p className="text-white/30 text-xs">{inc.date} · Duration: {inc.duration}</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs bg-yellow-500/10 text-yellow-400 flex-shrink-0 capitalize">
                  {inc.severity}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-white/20 text-sm">Subscribe to updates: <span className="text-white/40">status@designforge.studio</span></p>
        </div>
      </div>
      <Footer />
    </div>
  )
}
