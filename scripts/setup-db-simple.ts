// Database setup script
import { config } from 'dotenv'
import { neon } from '@neondatabase/serverless'
import fs from 'fs'
import path from 'path'

// Load environment variables
config({ path: path.join(process.cwd(), '.env.local') })

console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'SET' : 'NOT SET')
console.log('NEON_DATABASE_URL:', process.env.NEON_DATABASE_URL ? 'SET' : 'NOT SET')

const sql = neon(process.env.DATABASE_URL || process.env.NEON_DATABASE_URL || '')

async function setupDatabase() {
  try {
    console.log('Setting up database...')

    // Read schema file
    const schemaPath = path.join(process.cwd(), 'schema.sql')
    const schema = fs.readFileSync(schemaPath, 'utf8')

    // Split into individual statements (handle multi-line)
    const rawStatements = schema.split(';')
    console.log('Raw statements count:', rawStatements.length)
    rawStatements.forEach((stmt, i) => console.log(`Raw ${i}: "${stmt.trim()}"`))

    const statements = rawStatements
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0)
      .filter(stmt => {
        // Remove pure comment lines, but keep statements that contain SQL after comments
        const lines = stmt.split('\n').map(l => l.trim()).filter(l => l.length > 0)
        return lines.some(line => !line.startsWith('--'))
      })
      .map(stmt => {
        // Remove comment lines from the statement
        return stmt.split('\n')
          .map(line => line.trim())
          .filter(line => line.length > 0 && !line.startsWith('--'))
          .join(' ')
          .trim()
      })
      .filter(stmt => stmt.length > 0)

    console.log('Filtered statements:', statements.length)
    statements.forEach((stmt, i) => console.log(`${i}: ${stmt.substring(0, 100)}...`))

    // Execute each statement
    for (const statement of statements) {
      if (statement.trim()) {
        console.log('Executing:', statement.substring(0, 50) + '...')
        try {
          await sql.unsafe(statement)
          console.log('✓ Success')
        } catch (error) {
          console.error('✗ Failed:', error)
          throw error
        }
      }
    }

    console.log('Database setup complete!')

    // Verify tables were created
    console.log('Verifying table creation...')
    const tables = await sql`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`
    console.log('Tables after setup:', tables.map(t => t.table_name))
  } catch (error) {
    console.error('Database setup failed:', error)
    process.exit(1)
  }
}

setupDatabase()