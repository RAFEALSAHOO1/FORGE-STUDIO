'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Clock, AlertCircle, Package, Truck, Star } from 'lucide-react'

type StepStatus = 'completed' | 'active' | 'pending'

interface TimelineStep {
  label: string
  description: string
  date?: string
  status: StepStatus
  icon: React.ReactNode
}

const STEP_ICONS = [Package, Clock, AlertCircle, Truck, Star, CheckCircle]

interface OrderTimelineProps {
  steps: TimelineStep[]
  className?: string
}

const statusColors: Record<StepStatus, string> = {
  completed: '#4ade80',
  active: '#89AACC',
  pending: '#888888',
}

export function OrderTimeline({ steps, className = '' }: OrderTimelineProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Vertical line */}
      <div className="absolute left-5 top-8 bottom-8 w-px bg-white/10" />

      <div className="flex flex-col gap-6">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="flex items-start gap-5 relative"
          >
            {/* Icon bubble */}
            <div
              className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0 transition-all duration-300"
              style={{
                background: step.status === 'pending' ? '#1a1a1a' : `${statusColors[step.status]}22`,
                border: `2px solid ${statusColors[step.status]}`,
                color: statusColors[step.status],
              }}
            >
              {step.status === 'completed' ? (
                <CheckCircle size={18} />
              ) : step.status === 'active' ? (
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <Clock size={18} />
                </motion.div>
              ) : (
                <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 pb-2">
              <div className="flex items-center justify-between gap-4 mb-1">
                <span
                  className="text-sm font-medium"
                  style={{ color: step.status === 'pending' ? '#888' : '#f5f5f5' }}
                >
                  {step.label}
                </span>
                {step.date && (
                  <span className="text-xs text-white/30">{step.date}</span>
                )}
              </div>
              <p className="text-xs text-white/40 leading-relaxed">{step.description}</p>
              {step.status === 'active' && (
                <div className="mt-2">
                  <div className="h-1 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: 'linear-gradient(90deg, #89AACC, #4E85BF)' }}
                      initial={{ width: '0%' }}
                      animate={{ width: '60%' }}
                      transition={{ duration: 1.5, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ── Default steps helper ── */
export function defaultOrderSteps(status: 'pending' | 'progress' | 'completed'): TimelineStep[] {
  const allSteps = [
    { label: 'Order Placed', description: 'Your order has been received and confirmed.', date: 'Apr 1, 2025', icon: null },
    { label: 'In Review', description: 'Our designers are reviewing your requirements.', date: 'Apr 2, 2025', icon: null },
    { label: 'Design Started', description: 'Work has begun on your custom design.', date: '', icon: null },
    { label: 'Revision Round', description: 'Your feedback is being incorporated.', date: '', icon: null },
    { label: 'Final Approval', description: 'Awaiting your final approval.', date: '', icon: null },
    { label: 'Delivered', description: 'Design delivered to your inbox!', date: '', icon: null },
  ]

  return allSteps.map((step, i) => {
    let s: StepStatus
    if (status === 'pending') s = i === 0 ? 'active' : 'pending'
    else if (status === 'progress') s = i < 3 ? 'completed' : i === 3 ? 'active' : 'pending'
    else s = 'completed'
    return { ...step, status: s }
  })
}
