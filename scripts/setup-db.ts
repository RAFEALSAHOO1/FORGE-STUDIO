// Database setup script
import { config } from 'dotenv'
import fs from 'fs'
import path from 'path'

// Load environment variables
config({ path: path.join(process.cwd(), '.env.local') })

console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'SET' : 'NOT SET')
console.log('NEON_DATABASE_URL:', process.env.NEON_DATABASE_URL ? 'SET' : 'NOT SET')

import sql from '@/lib/db'

async function setupDatabase() {
  try {
    console.log('Setting up database...')

    // Read schema file
    const schemaPath = path.join(process.cwd(), 'schema.sql')
    const schema = fs.readFileSync(schemaPath, 'utf8')

    // Split into individual statements
    const statements = schema
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'))

    // Execute each statement
    for (const statement of statements) {
      if (statement.trim()) {
        console.log('Executing:', statement.substring(0, 50) + '...')
        await sql.unsafe(statement)
      }
    }

    console.log('Database setup complete!')
  } catch (error) {
    console.error('Database setup failed:', error)
    process.exit(1)
  }
}

setupDatabase()