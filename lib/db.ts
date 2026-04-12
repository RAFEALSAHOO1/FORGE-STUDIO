import { neon } from '@neondatabase/serverless'

const dbUrl = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL || ''

// Create a no-op sql function for build time when DATABASE_URL is not available
const noOpSql = async (query: string, ...args: unknown[]) => {
  throw new Error(`Database not configured. DATABASE_URL is required. Got: "${dbUrl}"`)
}

const sql = dbUrl ? neon(dbUrl) : (noOpSql as any)

export default sql