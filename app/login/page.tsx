'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Flame, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { useToast } from '@/components/ui/Toast'
import { InlineLoader } from '@/components/ui/PageLoading'

export default function LoginPage() {
  const { login, loginWithGoogle } = useAuth()
  const { success, error: toastErr } = useToast()
  const router = useRouter()
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const res = await login(form.email, form.password)
    setLoading(false)
    if (res.ok) {
      success('Welcome back!', 'You are now signed in.')
      router.push('/dashboard')
    } else {
      toastErr('Sign in failed', res.error || 'Please check your credentials.')
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(137,170,204,0.06)_0%,_transparent_70%)] pointer-events-none" />

      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="w-full max-w-md">
        <Link href="/" className="flex items-center justify-center gap-2 mb-10">
          <Flame size={28} className="text-white" />
          <span className="text-white font-semibold text-2xl tracking-tight">DesignForge</span>
        </Link>

        <div className="auth-container">
          <h1 className="auth-heading">Sign In</h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-white/40 text-xs tracking-widest uppercase block mb-2">Email</label>
              <input type="email" className="auth-input w-full" placeholder="your@email.com"
                value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
            </div>
            <div>
              <label className="text-white/40 text-xs tracking-widest uppercase block mb-2">Password</label>
              <div className="relative">
                <input type={show ? 'text' : 'password'} className="auth-input w-full pr-12"
                  placeholder="Your password"
                  value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
                <button type="button" onClick={() => setShow(!show)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/25 text-xs">Demo: demo@designforge.studio</span>
              <span className="text-[#89AACC] text-xs cursor-pointer hover:underline">Forgot Password?</span>
            </div>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit"
              disabled={loading}
              className="auth-login-button flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? <><InlineLoader size={16} /> Signing in…</> : 'Sign In'}
            </motion.button>
          </form>

          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-white/30 text-xs">Or continue with</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <div className="flex justify-center gap-4">
            <button onClick={loginWithGoogle}
              className="social-button google flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 text-white/60 text-sm hover:border-white/20 hover:text-white transition-all">
              <svg className="w-4 h-4" viewBox="0 0 488 512" fill="white">
                <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
              </svg>
              Google
            </button>
          </div>

          <p className="text-center text-white/30 text-sm mt-6">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-[#89AACC] hover:underline">Create one →</Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
