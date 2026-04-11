'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

export interface AuthUser {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'user' | 'admin'
}

interface AuthContextType {
  user: AuthUser | null
  loading: boolean
  login: (email: string, password?: string) => Promise<{ ok: boolean; error?: string }>
  register: (name: string, email: string, password: string) => Promise<{ ok: boolean; error?: string }>
  loginWithGoogle: () => void
  logout: () => void
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => ({ ok: false }),
  register: async () => ({ ok: false }),
  loginWithGoogle: () => {},
  logout: () => {},
  isAdmin: false,
})

const TOKEN_KEY = 'forge_auth_token'
const USER_KEY  = 'forge_user'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser]       = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  // Restore session from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(USER_KEY)
      if (stored) setUser(JSON.parse(stored))
    } catch { /* ignore */ } finally { setLoading(false) }
  }, [])

  const persistUser = useCallback((u: AuthUser, token: string) => {
    setUser(u)
    localStorage.setItem(USER_KEY, JSON.stringify(u))
    localStorage.setItem(TOKEN_KEY, token)
  }, [])

  const login = useCallback(async (email: string, _password?: string) => {
    try {
      const res  = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', email }),
      })
      const data = await res.json()
      if (!data.success) return { ok: false, error: data.error }
      persistUser(data.data.user, data.data.token)
      return { ok: true }
    } catch { return { ok: false, error: 'Network error. Please try again.' } }
  }, [persistUser])

  const register = useCallback(async (name: string, email: string, _password: string) => {
    try {
      const res  = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'register', name, email }),
      })
      const data = await res.json()
      if (!data.success) return { ok: false, error: data.error }
      persistUser(data.data.user, data.data.token)
      return { ok: true }
    } catch { return { ok: false, error: 'Registration failed. Please try again.' } }
  }, [persistUser])

  const loginWithGoogle = useCallback(() => {
    // In production: redirect to Google OAuth
    // window.location.href = '/api/auth/google'
    console.log('[Auth] Google OAuth — configure GOOGLE_CLIENT_ID in .env')
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem(USER_KEY)
    localStorage.removeItem(TOKEN_KEY)
  }, [])

  return (
    <AuthContext.Provider value={{
      user, loading,
      login, register, loginWithGoogle, logout,
      isAdmin: user?.role === 'admin',
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
