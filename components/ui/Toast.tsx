'use client'

import { useState, useCallback, createContext, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react'

type ToastType = 'success' | 'error' | 'warning' | 'info'

interface Toast {
  id: string
  type: ToastType
  title: string
  message?: string
  duration?: number
}

interface ToastContextType {
  toast: (opts: Omit<Toast, 'id'>) => void
  success: (title: string, message?: string) => void
  error: (title: string, message?: string) => void
  warning: (title: string, message?: string) => void
  info: (title: string, message?: string) => void
}

const ToastContext = createContext<ToastContextType>({
  toast: () => {},
  success: () => {},
  error: () => {},
  warning: () => {},
  info: () => {},
})

const ICONS = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
}

const COLORS = {
  success: { bg: 'rgba(74,222,128,0.1)', border: 'rgba(74,222,128,0.2)', icon: '#4ade80' },
  error:   { bg: 'rgba(248,113,113,0.1)', border: 'rgba(248,113,113,0.2)', icon: '#f87171' },
  warning: { bg: 'rgba(251,191,36,0.1)', border: 'rgba(251,191,36,0.2)', icon: '#fbbf24' },
  info:    { bg: 'rgba(137,170,204,0.1)', border: 'rgba(137,170,204,0.2)', icon: '#89AACC' },
}

function ToastItem({ t, onRemove }: { t: Toast; onRemove: (id: string) => void }) {
  const Icon = ICONS[t.type]
  const colors = COLORS[t.type]

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 60, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 60, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="flex items-start gap-3 p-4 rounded-2xl shadow-2xl max-w-sm w-full backdrop-blur-xl"
      style={{ background: colors.bg, border: `1px solid ${colors.border}` }}
    >
      <Icon size={18} style={{ color: colors.icon }} className="flex-shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-medium">{t.title}</p>
        {t.message && <p className="text-white/50 text-xs mt-0.5 leading-relaxed">{t.message}</p>}
      </div>
      <button onClick={() => onRemove(t.id)} className="text-white/30 hover:text-white transition-colors flex-shrink-0">
        <X size={14} />
      </button>
    </motion.div>
  )
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const remove = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const toast = useCallback((opts: Omit<Toast, 'id'>) => {
    const id = `toast-${Date.now()}`
    setToasts(prev => [...prev.slice(-4), { ...opts, id }])
    setTimeout(() => remove(id), opts.duration ?? 4000)
  }, [remove])

  const success = useCallback((title: string, message?: string) => toast({ type: 'success', title, message }), [toast])
  const error = useCallback((title: string, message?: string) => toast({ type: 'error', title, message }), [toast])
  const warning = useCallback((title: string, message?: string) => toast({ type: 'warning', title, message }), [toast])
  const info = useCallback((title: string, message?: string) => toast({ type: 'info', title, message }), [toast])

  return (
    <ToastContext.Provider value={{ toast, success, error, warning, info }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[9998] flex flex-col gap-3 pointer-events-none">
        <AnimatePresence mode="popLayout">
          {toasts.map(t => (
            <div key={t.id} className="pointer-events-auto">
              <ToastItem t={t} onRemove={remove} />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)
