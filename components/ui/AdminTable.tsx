'use client'

import { motion } from 'framer-motion'
import { CheckCircle, XCircle, Eye, MoreHorizontal } from 'lucide-react'
import { useState } from 'react'

export interface OrderRow {
  id: string
  client: string
  service: string
  status: 'pending' | 'progress' | 'completed' | 'cancelled'
  date: string
  amount: string
}

export interface UserRow {
  id: string
  name: string
  email: string
  role: 'user' | 'admin'
  joined: string
  orders: number
  status: 'active' | 'suspended'
}

const STATUS_BADGE: Record<string, { bg: string; text: string; label: string }> = {
  pending: { bg: 'rgba(247,228,121,0.15)', text: '#f7e479', label: 'Pending' },
  progress: { bg: 'rgba(137,170,204,0.15)', text: '#89AACC', label: 'In Progress' },
  completed: { bg: 'rgba(74,222,128,0.15)', text: '#4ade80', label: 'Completed' },
  cancelled: { bg: 'rgba(248,113,113,0.15)', text: '#f87171', label: 'Cancelled' },
  active: { bg: 'rgba(74,222,128,0.15)', text: '#4ade80', label: 'Active' },
  suspended: { bg: 'rgba(248,113,113,0.15)', text: '#f87171', label: 'Suspended' },
  user: { bg: 'rgba(137,170,204,0.15)', text: '#89AACC', label: 'User' },
  admin: { bg: 'rgba(251,146,60,0.15)', text: '#fb923c', label: 'Admin' },
}

function Badge({ status }: { status: string }) {
  const s = STATUS_BADGE[status] || { bg: '#222', text: '#888', label: status }
  return (
    <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: s.bg, color: s.text }}>
      {s.label}
    </span>
  )
}

/* ── Orders Table ── */
interface OrdersTableProps {
  orders: OrderRow[]
  onApprove?: (id: string) => void
  onCancel?: (id: string) => void
  onView?: (id: string) => void
}

export function OrdersTable({ orders, onApprove, onCancel, onView }: OrdersTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/5">
            {['Order ID', 'Client', 'Service', 'Status', 'Date', 'Amount', 'Actions'].map((h) => (
              <th key={h} className="text-left py-4 px-4 text-xs text-white/30 uppercase tracking-widest font-normal">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orders.map((order, i) => (
            <motion.tr
              key={order.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="border-b border-white/5 hover:bg-white/2 transition-colors group"
            >
              <td className="py-4 px-4 text-xs text-white/40 font-mono">{order.id}</td>
              <td className="py-4 px-4 text-sm text-white/80">{order.client}</td>
              <td className="py-4 px-4 text-sm text-white/60">{order.service}</td>
              <td className="py-4 px-4"><Badge status={order.status} /></td>
              <td className="py-4 px-4 text-sm text-white/40">{order.date}</td>
              <td className="py-4 px-4 text-sm text-white/70">{order.amount}</td>
              <td className="py-4 px-4">
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {order.status === 'pending' && (
                    <>
                      <button
                        onClick={() => onApprove?.(order.id)}
                        className="p-1.5 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors"
                        title="Approve"
                      >
                        <CheckCircle size={14} />
                      </button>
                      <button
                        onClick={() => onCancel?.(order.id)}
                        className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                        title="Cancel"
                      >
                        <XCircle size={14} />
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => onView?.(order.id)}
                    className="p-1.5 rounded-lg bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                    title="View"
                  >
                    <Eye size={14} />
                  </button>
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ── Users Table ── */
interface UsersTableProps {
  users: UserRow[]
  onSuspend?: (id: string) => void
  onMakeAdmin?: (id: string) => void
}

export function UsersTable({ users, onSuspend, onMakeAdmin }: UsersTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/5">
            {['User', 'Email', 'Role', 'Joined', 'Orders', 'Status', 'Actions'].map((h) => (
              <th key={h} className="text-left py-4 px-4 text-xs text-white/30 uppercase tracking-widest font-normal">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <motion.tr
              key={user.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="border-b border-white/5 hover:bg-white/2 transition-colors group"
            >
              <td className="py-4 px-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#89AACC] to-[#4E85BF] flex items-center justify-center text-xs font-semibold text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm text-white/80">{user.name}</span>
                </div>
              </td>
              <td className="py-4 px-4 text-sm text-white/50">{user.email}</td>
              <td className="py-4 px-4"><Badge status={user.role} /></td>
              <td className="py-4 px-4 text-sm text-white/40">{user.joined}</td>
              <td className="py-4 px-4 text-sm text-white/60">{user.orders}</td>
              <td className="py-4 px-4"><Badge status={user.status} /></td>
              <td className="py-4 px-4">
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => onSuspend?.(user.id)}
                    className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors text-xs px-2"
                    title="Suspend"
                  >
                    Suspend
                  </button>
                  {user.role !== 'admin' && (
                    <button
                      onClick={() => onMakeAdmin?.(user.id)}
                      className="p-1.5 rounded-lg bg-orange-500/10 text-orange-400 hover:bg-orange-500/20 transition-colors text-xs px-2"
                    >
                      Make Admin
                    </button>
                  )}
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
