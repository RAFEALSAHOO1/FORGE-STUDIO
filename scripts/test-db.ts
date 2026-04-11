// Test database connection
import { config } from 'dotenv'
import { neon } from '@neondatabase/serverless'
import path from 'path'

// Load environment variables
config({ path: path.join(process.cwd(), '.env.local') })

const sql = neon(process.env.DATABASE_URL || process.env.NEON_DATABASE_URL || '')

async function testDB() {
  try {
    console.log('Testing database connection...')

    // Try to create a simple test table
    console.log('Creating test table...')
    await sql`CREATE TABLE IF NOT EXISTS test_table (id SERIAL PRIMARY KEY, name TEXT)`
    console.log('Test table created')

    // Check tables
    const tables = await sql`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`
    console.log('Tables:', tables.map(t => t.table_name))

    // Insert a test record
    await sql`INSERT INTO test_table (name) VALUES ('test')`
    console.log('Test record inserted')

    // Select it back
    const records = await sql`SELECT * FROM test_table`
    console.log('Test records:', records)

  } catch (error) {
    console.error('Database test failed:', error)
  }
}

testDB()