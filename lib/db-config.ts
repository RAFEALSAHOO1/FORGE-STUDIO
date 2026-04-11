// Database configuration for Neon PostgreSQL
// Environment: Production configuration with Neon pooling

export const dbConfig = {
  // Neon Database Connection
  connectionUrl: process.env.NEON_DATABASE_URL || 'postgresql://neondb_owner:npg_PLdMq0RC8mVj@ep-lucky-sea-a1vwkk4d-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  
  // Connection Pool Settings
  pool: {
    min: 2,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  },
  
  // Database Names
  database: 'neondb',
  user: 'neondb_owner',
  host: 'ep-lucky-sea-a1vwkk4d-pooler.ap-southeast-1.aws.neon.tech',
  port: 5432,
  
  // SSL Configuration
  ssl: {
    rejectUnauthorized: false,
    ca: undefined,
  },
  
  // Connection String Helpers
  getConnectionString: () => {
    return process.env.NEON_DATABASE_URL || dbConfig.connectionUrl
  },
  
  // Validation
  validate: () => {
    const url = dbConfig.getConnectionString()
    if (!url) {
      throw new Error('NEON_DATABASE_URL environment variable is not set')
    }
    return true
  },
}

export default dbConfig
