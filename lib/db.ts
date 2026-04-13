import { neon, NeonQueryFunction } from '@neondatabase/serverless'

/**
 * Database connection URL - supports both pooled and direct connections
 * Pooler (recommended for serverless): ends with -pooler.neon.tech
 * Direct (for local dev): ends with .neon.tech
 */
const getDatabaseUrl = (): string => {
  const url = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL || ''
  
  if (!url) {
    throw new Error(
      '❌ Database connection failed: DATABASE_URL or NEON_DATABASE_URL not set\n' +
      'Please add to .env.local:\n' +
      'DATABASE_URL=postgresql://user:password@host/database?sslmode=require'
    )
  }
  
  return url
}

/**
 * Neon SQL client - optimized for serverless/edge functions
 * Features:
 * - Connection pooling via pooler endpoint
 * - SSL/TLS encryption
 * - Automatic connection handling
 * - Returns rows as simple array of objects
 * 
 * Usage:
 * const result = await sql`SELECT * FROM users WHERE id = ${id}`
 */
export const sql: NeonQueryFunction<any, any> = (() => {
  try {
    const url = getDatabaseUrl()
    // fullResults: true returns { rows: [...], rowCount: ..., command: ... } but we access just the rows
    // We configure to return just the rows array for simplicity
    return neon(url)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
    // Return a stub function that throws on use
    return (async () => {
      throw new Error('Database client not initialized. Check .env.local DATABASE_URL.')
    }) as any
  }
})()

// Default export for backwards compatibility
export default sql