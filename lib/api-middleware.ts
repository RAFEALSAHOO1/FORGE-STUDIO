import { NextRequest, NextResponse } from 'next/server'
import { ensureDBInitialized } from '@/lib/db-init'

type Handler = (req: NextRequest) => Promise<Response | NextResponse>

/**
 * Wraps an API route handler to ensure database is initialized
 * Usage:
 * 
 * export const GET = withDB(async (req) => {
 *   const users = await sql`SELECT * FROM users`
 *   return NextResponse.json({ users })
 * })
 */
export function withDB(handler: Handler): (req: NextRequest) => Promise<Response> {
  return async (req: NextRequest) => {
    try {
      // Ensure database is initialized before running handler
      await ensureDBInitialized()
      return await handler(req)
    } catch (error) {
      console.error('API error:', error)
      const message = error instanceof Error ? error.message : 'Internal server error'
      return NextResponse.json(
        { success: false, error: message },
        { status: 500 }
      )
    }
  }
}

/**
 * Alternative: Direct initialization in handler
 * Usage in your handler:
 * 
 * export async function GET(req: NextRequest) {
 *   await ensureDBInitialized()
 *   // ... rest of handler
 * }
 */
export { ensureDBInitialized } from '@/lib/db-init'
