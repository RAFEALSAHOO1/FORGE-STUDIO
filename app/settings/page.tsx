'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Bell, Shield, Palette, Globe, Trash2, AlertTriangle } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import ThemeToggle from '@/components/ui/ThemeToggle'
import Checkbox from '@/components/ui/Checkbox'
import { useAuth } from '@/lib/auth-context'
import { useToast } from '@/components/ui/Toast'

const SECTIONS = [
  { id: 'appearance',    label: 'Appearance',         icon: Palette },
  { id: 'notifications', label: 'Notifications',      icon: Bell },
  { id: 'privacy',       label: 'Privacy & Security', icon: Shield },
  { id: 'language',      label: 'Language & Region',  icon: Globe },
  { id: 'danger',        label: 'Danger Zone',        icon: Trash2 },
]

// CSS variable style — typed properly
const radioCssVar = (n: number): React.CSSProperties =>
  ({ '--total-radio': n } as React.CSSProperties)

export default function SettingsPage() {
  const { user, logout } = useAuth()
  const { success, info, error: toastErr } = useToast()

  const [active, setActive] = useState('appearance')
  const [accent, setAccent] = useState('#89AACC')
  const [notifs, setNotifs] = useState({
    orderUpdates: true,  newsletter: false,
    marketing: false,    sms: true,
  })
  const [privacy, setPrivacy] = useState({
    twoFactor: false, publicProfile: true, dataSharing: false,
  })
  const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' })

  const ACCENT_COLORS = [
    '#89AACC','#4ade80','#f7e479','#fb923c','#f87171',
    '#c084fc','#22d3ee','#f9a8d4','#a3e635','#fbbf24',
  ]

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 pt-10 pb-32">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-12">
          <p className="text-white/40 text-xs tracking-widest uppercase mb-2">Configuration</p>
          <h1 className="text-4xl text-white tracking-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>Settings</h1>
          {user && <p className="text-white/30 text-sm mt-1">{user.email}</p>}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="liquid-glass rounded-2xl p-2 flex flex-col gap-1">
              {SECTIONS.map(({ id, label, icon: Icon }) => (
                <button key={id} onClick={() => setActive(id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all text-left ${active === id ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
                  <Icon size={15} /> {label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <motion.div key={active} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25 }} className="liquid-glass rounded-2xl p-8">

              {/* ── Appearance ── */}
              {active === 'appearance' && (
                <div className="flex flex-col gap-8">
                  <h2 className="text-white text-lg font-medium">Appearance</h2>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white text-sm font-medium mb-1">Theme</p>
                      <p className="text-white/35 text-xs">Toggle between dark and light mode</p>
                    </div>
                    <ThemeToggle />
                  </div>
                  <div className="h-px bg-white/5" />
                  <div>
                    <p className="text-white text-sm font-medium mb-4">Accent Color</p>
                    <div className="flex gap-3 flex-wrap">
                      {ACCENT_COLORS.map(c => (
                        <button key={c} onClick={() => setAccent(c)}
                          className="w-9 h-9 rounded-xl transition-transform hover:scale-110"
                          style={{
                            background: c,
                            boxShadow: accent === c ? `0 0 0 2px white, 0 0 0 4px ${c}` : undefined,
                            transform: accent === c ? 'scale(1.15)' : undefined,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="h-px bg-white/5" />
                  <div>
                    <p className="text-white text-sm font-medium mb-4">Font Size</p>
                    {/* radio-container with proper CSS variable typing */}
                    <div className="radio-container" style={radioCssVar(3)}>
                      {(['Small', 'Medium', 'Large'] as const).map((size, i) => (
                        <React.Fragment key={size}>
                          <input id={`fs-${size}`} name="fontsize" type="radio" defaultChecked={i === 1} />
                          <label htmlFor={`fs-${size}`}>{size}</label>
                        </React.Fragment>
                      ))}
                      <div className="glider-container"><div className="glider" /></div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── Notifications ── */}
              {active === 'notifications' && (
                <div className="flex flex-col gap-6">
                  <h2 className="text-white text-lg font-medium">Notifications</h2>
                  {(Object.entries(notifs) as [keyof typeof notifs, boolean][]).map(([key, val]) => (
                    <div key={key} className="flex items-center justify-between py-2">
                      <div>
                        <p className="text-white text-sm font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                        <p className="text-white/35 text-xs mt-0.5">Receive {key.toLowerCase()} notifications</p>
                      </div>
                      <Checkbox checked={val} onChange={v => setNotifs(n => ({ ...n, [key]: v }))} />
                    </div>
                  ))}
                  <button onClick={() => success('Preferences saved', 'Notification settings updated.')}
                    className="auth-login-button mt-2">Save Preferences</button>
                </div>
              )}

              {/* ── Privacy ── */}
              {active === 'privacy' && (
                <div className="flex flex-col gap-6">
                  <h2 className="text-white text-lg font-medium">Privacy & Security</h2>
                  {(Object.entries(privacy) as [keyof typeof privacy, boolean][]).map(([key, val]) => (
                    <div key={key} className="flex items-center justify-between py-2">
                      <div>
                        <p className="text-white text-sm font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                        <p className="text-white/35 text-xs mt-0.5">
                          {key === 'twoFactor' ? 'Extra layer of security on login' :
                           key === 'publicProfile' ? 'Others can find your profile' :
                           'Help improve DesignForge'}
                        </p>
                      </div>
                      <Checkbox checked={val} onChange={v => setPrivacy(p => ({ ...p, [key]: v }))} />
                    </div>
                  ))}
                  <div className="h-px bg-white/5" />
                  <div>
                    <p className="text-white text-sm font-medium mb-5">Change Password</p>
                    <div className="flex flex-col gap-4">
                      <input className="auth-input w-full" type="password" placeholder="Current password"
                        value={passwords.current} onChange={e => setPasswords(p => ({ ...p, current: e.target.value }))} />
                      <input className="auth-input w-full" type="password" placeholder="New password (8+ characters)"
                        value={passwords.next} onChange={e => setPasswords(p => ({ ...p, next: e.target.value }))} />
                      <input className="auth-input w-full" type="password" placeholder="Confirm new password"
                        value={passwords.confirm} onChange={e => setPasswords(p => ({ ...p, confirm: e.target.value }))} />
                      <button onClick={() => {
                        if (!passwords.current) { toastErr('Current password required', ''); return }
                        if (passwords.next !== passwords.confirm) { toastErr('Passwords do not match', ''); return }
                        if (passwords.next.length < 8) { toastErr('Too short', 'Password must be 8+ characters.'); return }
                        success('Password updated', 'Your password has been changed.')
                        setPasswords({ current: '', next: '', confirm: '' })
                      }} className="auth-login-button">Update Password</button>
                    </div>
                  </div>
                </div>
              )}

              {/* ── Language ── */}
              {active === 'language' && (
                <div className="flex flex-col gap-6">
                  <h2 className="text-white text-lg font-medium">Language & Region</h2>
                  {[
                    { label: 'Language', options: ['English (US)', 'English (UK)', 'Español', 'Français', 'Deutsch', 'العربية', 'हिंदी', '中文'] },
                    { label: 'Timezone', options: ['UTC-5 (Eastern)', 'UTC-8 (Pacific)', 'UTC+0 (GMT)', 'UTC+1 (CET)', 'UTC+5:30 (IST)', 'UTC+8 (CST)', 'UTC+9 (JST)'] },
                    { label: 'Currency', options: ['USD ($)', 'EUR (€)', 'GBP (£)', 'INR (₹)', 'AED (د.إ)', 'CAD (C$)', 'AUD (A$)'] },
                  ].map(({ label, options }) => (
                    <div key={label}>
                      <label className="text-white/35 text-xs tracking-widest uppercase block mb-2">{label}</label>
                      <select className="auth-input w-full cursor-pointer" style={{ background: 'rgba(255,255,255,0.05)' }}>
                        {options.map(o => <option key={o} style={{ background: '#1a1a2e' }}>{o}</option>)}
                      </select>
                    </div>
                  ))}
                  <button onClick={() => success('Saved', 'Language preferences updated.')} className="auth-login-button">Save</button>
                </div>
              )}

              {/* ── Danger zone ── */}
              {active === 'danger' && (
                <div>
                  <h2 className="text-white text-lg font-medium mb-2">Danger Zone</h2>
                  <p className="text-white/35 text-sm mb-8">These actions are irreversible. Proceed with caution.</p>
                  <div className="flex flex-col gap-4">
                    {[
                      { label: 'Export All Data',    desc: 'Download a copy of all your data.',                      btn: 'Export',     color: '#89AACC', action: () => info('Export started', 'You will receive an email with your data.') },
                      { label: 'Deactivate Account', desc: 'Temporarily disable your account.',                      btn: 'Deactivate', color: '#f7e479', action: () => info('Account deactivated', 'Sign in again to reactivate.') },
                      { label: 'Delete Account',     desc: 'Permanently delete your account and all associated data.', btn: 'Delete',     color: '#f87171', action: () => { logout(); } },
                    ].map(({ label, desc, btn, color, action }) => (
                      <div key={label} className="flex items-center justify-between p-5 rounded-xl border"
                        style={{ borderColor: `${color}22` }}>
                        <div className="flex items-start gap-3">
                          <AlertTriangle size={15} style={{ color, marginTop: 2 }} className="flex-shrink-0" />
                          <div>
                            <p className="text-white text-sm font-medium">{label}</p>
                            <p className="text-white/35 text-xs mt-0.5">{desc}</p>
                          </div>
                        </div>
                        <button onClick={action}
                          className="px-4 py-1.5 rounded-lg text-xs font-medium border transition-colors hover:bg-white/5 flex-shrink-0 ml-4"
                          style={{ color, borderColor: `${color}44` }}>
                          {btn}
                        </button>
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
