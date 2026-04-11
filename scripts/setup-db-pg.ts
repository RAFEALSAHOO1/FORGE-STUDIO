// Database setup script using pg
import { config } from 'dotenv'
import { Pool } from 'pg'
import fs from 'fs'
import path from 'path'

// Load environment variables
config({ path: path.join(process.cwd(), '.env.local') })

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || process.env.NEON_DATABASE_URL,
})

async function setupDatabase() {
  const client = await pool.connect()
  try {
    console.log('Setting up database with pg...')

    // Read schema file
    const schemaPath = path.join(process.cwd(), 'schema.sql')
    const schema = fs.readFileSync(schemaPath, 'utf8')

    // Split into individual statements
    const rawStatements = schema.split(';')
    const statements = rawStatements
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0)
      .filter(stmt => {
        const lines = stmt.split('\n').map(l => l.trim()).filter(l => l.length > 0)
        return lines.some(line => !line.startsWith('--'))
      })
      .map(stmt => {
        return stmt.split('\n')
          .map(line => line.trim())
          .filter(line => line.length > 0 && !line.startsWith('--'))
          .join(' ')
          .trim()
      })
      .filter(stmt => stmt.length > 0)

    console.log('Found statements:', statements.length)

    // Execute each statement
    for (const statement of statements) {
      if (statement.trim()) {
        console.log('Executing:', statement.substring(0, 50) + '...')
        await client.query(statement)
        console.log('✓ Success')
      }
    }

    console.log('Database setup complete!')

    // Verify
    const result = await client.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'")
    console.log('Tables:', result.rows.map(r => r.table_name))

  } catch (error) {
    console.error('Database setup failed:', error)
  } finally {
    client.release()
    await pool.end()
  }
}

setupDatabase()