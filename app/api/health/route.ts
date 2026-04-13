import { NextResponse } from 'next/server'
import { ensureDBInitialized, isDBInitializedFlag } from '@/lib/db-init'
import { dbHealthCheck } from '@/lib/db-utils'

/**
 * Health check endpoint
 * Verifies database connectivity and triggers initialization
 * 
 * GET /api/health
 */
export async function GET() {
  try {
    // Ensure database is initialized on first request
    await ensureDBInitialized()

    // Check database health
    const isHealthy = await dbHealthCheck()

    return NextResponse.json(
      {
        success: true,
        status: 'healthy',
        timestamp: new Date().toISOString(),
        database: {
          connected: isHealthy,
          initialized: isDBInitializedFlag(),
        },
      },
      { status: 200 }
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      {
        success: false,
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: message,
        database: {
          connected: false,
          initialized: false,
        },
      },
      { status: 503 }
    )
  }
}
