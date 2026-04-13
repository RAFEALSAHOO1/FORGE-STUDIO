import { sql } from './db'

/**
 * Check if database connection is alive
 * Usage: const isConnected = await dbHealthCheck()
 */
export async function dbHealthCheck(): Promise<boolean> {
  try {
    await sql`SELECT 1`
    return true
  } catch {
    return false
  }
}

/**
 * Execute a query that returns a count
 * Note: Use template literals for parameterized queries
 * Usage: const count = await dbCount`SELECT COUNT(*) FROM users WHERE status = ${status}`
 */
export async function dbCount(query: any): Promise<number> {
  try {
    const result = await query
    return result && result.length > 0 && result[0].count 
      ? Number(result[0].count) 
      : 0
  } catch (error) {
    console.error('Database count error:', error)
    return 0
  }
}
