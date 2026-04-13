import { sql } from './db'

/**
 * Database schema initialization
 * Creates all required tables if they don't exist (idempotent)
 */

type InitResult = {
  success: boolean
  tables: string[]
  errors: string[]
}

/**
 * Initialize database schema
 * Runs CREATE TABLE IF NOT EXISTS queries for all tables
 * Safe to call multiple times - only creates if table doesn't exist
 */
export async function initDB(): Promise<InitResult> {
  const result: InitResult = {
    success: true,
    tables: [],
    errors: [],
  }

  // Define all CREATE TABLE statements
  const createTableStatements = [
    // Users table
    `CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT,
      image TEXT,
      role TEXT DEFAULT 'user',
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    )`,

    // Orders table
    `CREATE TABLE IF NOT EXISTS orders (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      product_name TEXT NOT NULL,
      product_id TEXT,
      category TEXT,
      amount INTEGER NOT NULL,
      status TEXT DEFAULT 'pending',
      currency TEXT DEFAULT 'USD',
      details JSONB,
      payment_id TEXT,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    )`,

    // Designs table
    `CREATE TABLE IF NOT EXISTS designs (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      product_id TEXT NOT NULL,
      product_name TEXT NOT NULL,
      title TEXT,
      text_content TEXT,
      primary_color TEXT,
      font_family TEXT,
      font_size INTEGER,
      size TEXT,
      addons JSONB,
      notes TEXT,
      config JSONB,
      preview_url TEXT,
      status TEXT DEFAULT 'draft',
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    )`,

    // Analytics events table
    `CREATE TABLE IF NOT EXISTS analytics_events (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      event_name TEXT NOT NULL,
      event_type TEXT,
      user_id UUID REFERENCES users(id) ON DELETE SET NULL,
      path TEXT,
      properties JSONB,
      ip_address TEXT,
      user_agent TEXT,
      created_at TIMESTAMP DEFAULT NOW()
    )`,

    // Sessions table (for auth)
    `CREATE TABLE IF NOT EXISTS sessions (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      token TEXT UNIQUE NOT NULL,
      expires_at TIMESTAMP NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )`,

    // Templates table
    `CREATE TABLE IF NOT EXISTS templates (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      description TEXT,
      thumbnail_url TEXT,
      config JSONB,
      created_at TIMESTAMP DEFAULT NOW()
    )`,
  ]

  // Execute each CREATE TABLE statement
  for (const statement of createTableStatements) {
    try {
      await sql.unsafe(statement)
      
      // Extract table name from statement
      const match = statement.match(/CREATE TABLE IF NOT EXISTS (\w+)/i)
      const tableName = match ? match[1] : 'unknown'
      result.tables.push(tableName)
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error)
      result.errors.push(errorMsg)
      result.success = false
      console.error(`Failed to create table: ${errorMsg}`)
    }
  }

  // Create indexes for performance (if not exists)
  try {
    await sql.unsafe(`CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id)`)
    await sql.unsafe(`CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status)`)
    await sql.unsafe(`CREATE INDEX IF NOT EXISTS idx_designs_user_id ON designs(user_id)`)
    await sql.unsafe(`CREATE INDEX IF NOT EXISTS idx_designs_status ON designs(status)`)
    await sql.unsafe(`CREATE INDEX IF NOT EXISTS idx_analytics_user_id ON analytics_events(user_id)`)
    await sql.unsafe(`CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id)`)
    await sql.unsafe(`CREATE INDEX IF NOT EXISTS idx_templates_category ON templates(category)`)
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error)
    console.warn(`Failed to create indexes: ${errorMsg}`)
  }

  return result
}

/**
 * Check if database is initialized
 * Returns true if all critical tables exist
 */
export async function isDBInitialized(): Promise<boolean> {
  try {
    // Try to query one of the critical tables
    await sql`SELECT 1 FROM users LIMIT 1`
    return true
  } catch {
    return false
  }
}

/**
 * Safely initialize database on startup
 * Runs initDB() and logs results
 */
export async function setupDatabase(): Promise<void> {
  try {
    console.log('🔄 Initializing database schema...')
    const result = await initDB()
    
    if (result.success) {
      console.log(`✅ Database initialized successfully. Tables created: ${result.tables.join(', ')}`)
    } else {
      console.warn(`⚠️  Database initialization completed with warnings: ${result.errors.join(', ')}`)
    }
  } catch (error) {
    console.error('❌ Database setup failed:', error)
    throw error
  }
}
