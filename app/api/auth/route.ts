import { NextRequest } from 'next/server'
import { rateLimit, apiSuccess, apiError, sanitizeString, sanitizeEmail } from '@/lib/utils'
import { signup, login } from '@/lib/auth'
import { ensureDBInitialized } from '@/lib/db-init'
import { sql } from '@/lib/db'

// ─── POST /api/auth — signup / login ──────────────────────────────────────────
export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown'
  const { allowed } = rateLimit(`auth-${ip}`, 10, 60_000)
  if (!allowed) return apiError('Too many auth attempts. Wait 1 minute.', 429)

  try {
    // Ensure database is initialized
    await ensureDBInitialized()

    const body = await req.json()
    const action = body.action // 'login' | 'signup' | 'google'

    if (action === 'google') {
      // In production: verify Google ID token here
      return apiSuccess({
        message: 'Google OAuth — redirect to /api/auth/google/callback',
        redirectUrl: 'https://accounts.google.com/o/oauth2/v2/auth?...',
      })
    }

    // ── SIGNUP ────────────────────────────────────────────────────────────
    if (action === 'signup') {
      const name = sanitizeString(body.name, 100)
      const email = sanitizeEmail(body.email)
      const password = body.password

      if (!name) return apiError('Name is required', 400)
      if (!email) return apiError('Valid email required', 400)
      if (!password) return apiError('Password is required', 400)

      try {
        const user = await signup({ name, email, password })

        return apiSuccess(
          {
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            },
            token: `bearer_${user.id}_${Date.now()}`,
          },
          201
        )
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Signup failed'
        if (message.includes('already registered')) {
          return apiError('Email already registered', 409)
        }
        if (message.includes('must be at least')) {
          return apiError(message, 400)
        }
        return apiError(message, 400)
      }
    }

    // ── LOGIN ─────────────────────────────────────────────────────────────
    if (action === 'login') {
      const email = sanitizeEmail(body.email)
      const password = body.password

      if (!email) return apiError('Valid email required', 400)
      if (!password) return apiError('Password is required', 400)

      try {
        const user = await login({ email, password })

        return apiSuccess({
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token: `bearer_${user.id}_${Date.now()}`,
        })
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Login failed'
        return apiError(message, 401)
      }
    }

    return apiError('Invalid action. Use "signup" or "login"', 400)
  } catch (error) {
    console.error('Auth error:', error)
    const message = error instanceof Error ? error.message : 'Authentication failed'
    return apiError(message, 500)
  }
}

// ─── GET /api/auth — verify session ──────────────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '')

    if (!token) return apiError('No auth token', 401)

    // Extract user ID from token (format: bearer_USER_ID_TIMESTAMP)
    const parts = token.split('_')
    if (parts.length < 2) return apiError('Invalid token format', 401)

    const userId = parts[1]

    // Ensure database is initialized
    await ensureDBInitialized()

    // Fetch user from database
    const result = (await sql`
      SELECT id, name, email, role, created_at
      FROM users
      WHERE id = ${userId}
    `) as any[]

    if (!result || result.length === 0) {
      return apiError('Invalid session', 401)
    }

    const user = result[0]
    return apiSuccess({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    console.error('Session verification error:', error)
    return apiError('Session verification failed', 500)
  }
}
