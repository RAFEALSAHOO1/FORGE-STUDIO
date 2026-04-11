'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Camera, Edit2, Save, X, Package, CheckCircle, Star, Clock } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import { useAuth } from '@/lib/auth-context'
import { useToast } from '@/components/ui/Toast'
import { InlineLoader } from '@/components/ui/PageLoading'

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const { success, error: toastErr } = useToast()

  const [editing, setEditing] = useState(false)
  const [saving, setSaving]   = useState(false)
  const [profile, setProfile] = useState({
    name:     user?.name     || 'Alex Johnson',
    email:    user?.email    || 'alex@example.com',
    bio:      'Brand strategist and creative director. Love clean design.',
    location: 'Mumbai, India',
    website:  'designforge.studio',
    phone:    '+91 98765 43210',
  })

  /* Sync name + email from auth context */
  useEffect(() => {
    if (user) {
      setProfile(p => ({ ...p, name: user.name, email: user.email }))
    }
  }, [user])

  const handleSave = async () => {
    setSaving(true)
    try {
      /* In production: PATCH /api/users/:id */
      await new Promise(r => setTimeout(r, 700))
      success('Profile updated', 'Your changes have been saved.')
      setEditing(false)
    } catch {
      toastErr('Save failed', 'Please try again.')
    } finally { setSaving(false) }
  }

  const STATS = [
    { label: 'Total Orders',  value: '15', icon: Package,     color: '#89AACC' },
    { label: 'Completed',     value: '12', icon: CheckCircle, color: '#4ade80' },
    { label: 'In Progress',   value: '3',  icon: Clock,       color: '#f7e479' },
    { label: 'Rating',        value: '5.0',icon: Star,        color: '#fb923c' },
  ]

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 pt-10 pb-32">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>

          {/* Hero card */}
          <div className="liquid-glass rounded-3xl p-8 md:p-12 mb-8 relative overflow-hidden">
            {/* BG glow */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#89AACC] opacity-5 -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#89AACC] to-[#4E85BF] flex items-center justify-center text-4xl font-semibold text-white select-none">
                  {profile.name.charAt(0).toUpperCase()}
                </div>
                <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-white/90 transition-colors">
                  <Camera size={14} className="text-black" />
                </button>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <h1 className="text-2xl text-white font-medium mb-0.5">{profile.name}</h1>
                    <p className="text-white/35 text-sm">{profile.email}</p>
                    {user?.role === 'admin' && (
                      <span className="mt-2 inline-block px-3 py-0.5 rounded-full text-xs bg-orange-500/15 text-orange-400">Admin</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {editing ? (
                      <>
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                          onClick={handleSave} disabled={saving}
                          className="flex items-center gap-2 bg-white text-black rounded-full px-5 py-2 text-sm font-medium disabled:opacity-60">
                          {saving ? <InlineLoader size={14} /> : <Save size={14} />}
                          Save
                        </motion.button>
                        <button onClick={() => setEditing(false)}
                          className="liquid-glass rounded-full px-4 py-2 text-white/60 text-sm hover:text-white transition-colors">
                          <X size={14} />
                        </button>
                      </>
                    ) : (
                      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                        onClick={() => setEditing(true)}
                        className="flex items-center gap-2 liquid-glass rounded-full px-5 py-2 text-white/65 text-sm hover:text-white transition-colors">
                        <Edit2 size={14} /> Edit Profile
                      </motion.button>
                    )}
                  </div>
                </div>
                <p className="text-white/45 text-sm mt-3 leading-relaxed max-w-md">{profile.bio}</p>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 pt-8 border-t border-white/5">
              {STATS.map(s => (
                <div key={s.label} className="text-center">
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <s.icon size={13} style={{ color: s.color }} />
                    <p className="text-2xl text-white" style={{ fontFamily: "'Instrument Serif', serif" }}>{s.value}</p>
                  </div>
                  <p className="text-white/30 text-xs">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Edit form */}
          <motion.div
            animate={{ opacity: editing ? 1 : 0.65 }}
            className="liquid-glass rounded-3xl p-8"
          >
            <h2 className="text-white text-lg font-medium mb-7">Profile Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(Object.entries(profile) as [keyof typeof profile, string][]).map(([key, val]) => (
                <div key={key} className={key === 'bio' ? 'md:col-span-2' : ''}>
                  <label className="text-white/35 text-xs tracking-widest uppercase block mb-2 capitalize">
                    {key}
                  </label>
                  {key === 'bio' ? (
                    <textarea
                      className="auth-input resize-none w-full"
                      rows={3}
                      value={val}
                      disabled={!editing}
                      onChange={e => setProfile(p => ({ ...p, [key]: e.target.value }))}
                    />
                  ) : (
                    <input
                      className="auth-input w-full"
                      value={val}
                      disabled={!editing}
                      readOnly={key === 'email'} /* email locked to auth */
                      onChange={e => key !== 'email' && setProfile(p => ({ ...p, [key]: e.target.value }))}
                    />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Danger zone */}
          <div className="liquid-glass rounded-3xl p-8 mt-8 border border-red-500/10">
            <h3 className="text-white/70 text-base font-medium mb-5">Account Actions</h3>
            <div className="flex flex-wrap gap-3">
              <button className="px-5 py-2.5 rounded-xl border border-white/10 text-white/40 text-sm hover:border-white/20 hover:text-white transition-all">
                Export My Data
              </button>
              <button
                onClick={() => logout()}
                className="px-5 py-2.5 rounded-xl border border-red-500/20 text-red-400/70 text-sm hover:border-red-500/40 hover:text-red-400 transition-all">
                Sign Out
              </button>
              <button className="px-5 py-2.5 rounded-xl border border-red-500/20 text-red-400/50 text-sm hover:border-red-500/40 hover:text-red-400/80 transition-all">
                Delete Account
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
