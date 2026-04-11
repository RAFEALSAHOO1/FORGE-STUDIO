import { NextRequest } from 'next/server'
import { rateLimit, apiSuccess, apiError, sanitizeString, sanitizeEmail } from '@/lib/utils'

// ─── Session store (use JWT + DB in production) ───────────────────────────────
interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'user' | 'admin'
  createdAt: string
  provider: 'email' | 'google'
}

const users: User[] = [
  {
    id: 'user-1',
    name: 'Demo User',
    email: 'demo@designforge.studio',
    role: 'user',
    createdAt: '2025-01-01T00:00:00Z',
    provider: 'email',
  },
  {
    id: 'admin-1',
    name: 'Admin',
    email: 'admin@designforge.studio',
    role: 'admin',
    createdAt: '2025-01-01T00:00:00Z',
    provider: 'email',
  },
]

// ─── POST /api/auth — login / register ────────────────────────────────────────
export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown'
  const { allowed } = rateLimit(`auth-${ip}`, 10, 60_000)
  if (!allowed) return apiError('Too many auth attempts. Wait 1 minute.', 429)

  try {
    const body = await req.json()
    const action = body.action // 'login' | 'register' | 'google'

    if (action === 'google') {
      // In production: verify Google ID token here
      // const ticket = await googleClient.verifyIdToken(...)
      return apiSuccess({
        message: 'Google OAuth — redirect to /api/auth/google/callback',
        redirectUrl: 'https://accounts.google.com/o/oauth2/v2/auth?...',
      })
    }

    const email = sanitizeEmail(body.email)
    const name = sanitizeString(body.name, 100)

    if (!email) return apiError('Valid email required', 400)

    if (action === 'login') {
      const user = users.find(u => u.email === email)
      if (!user) return apiError('No account found with that email', 404)

      return apiSuccess({
        user: { id: user.id, name: user.name, email: user.email, role: user.role },
        token: `forge_token_${user.id}_${Date.now()}`, // Use JWT in production
      })
    }

    if (action === 'register') {
      if (!name) return apiError('Name is required', 400)
      if (users.find(u => u.email === email)) return apiError('Email already registered', 409)

      const newUser: User = {
        id: `user-${Date.now()}`,
        name,
        email,
        role: 'user',
        createdAt: new Date().toISOString(),
        provider: 'email',
      }

      users.push(newUser)

      return apiSuccess({
        user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role },
        token: `forge_token_${newUser.id}_${Date.now()}`,
      }, 201)
    }

    return apiError('Invalid action', 400)
  } catch {
    return apiError('Authentication failed', 500)
  }
}

// ─── GET /api/auth — verify session ──────────────────────────────────────────
export async function GET(req: NextRequest) {
  const token = req.headers.get('authorization')?.replace('Bearer ', '')

  if (!token) return apiError('No auth token', 401)

  // In production: verify JWT
  const userId = token.split('_')[2]
  const user = users.find(u => u.id === userId)

  if (!user) return apiError('Invalid session', 401)

  return apiSuccess({ user: { id: user.id, name: user.name, email: user.email, role: user.role } })
}
