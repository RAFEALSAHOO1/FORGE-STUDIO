import { setupDatabase } from './db-schema'

// Track if database initialization has been attempted
let dbInitialized = false
let dbInitPromise: Promise<void> | null = null

/**
 * Ensure database is initialized
 * Safe to call multiple times - only initializes once
 * 
 * Usage:
 * - Call at app startup
 * - Call in API handlers that need database
 */
export async function ensureDBInitialized(): Promise<void> {
  // If already initialized, return immediately
  if (dbInitialized) {
    return
  }

  // If initialization is in progress, wait for it to complete
  if (dbInitPromise) {
    return dbInitPromise
  }

  // Start initialization
  dbInitPromise = (async () => {
    try {
      await setupDatabase()
      dbInitialized = true
    } catch (error) {
      console.error('Failed to initialize database:', error)
      // Don't set flag to true - allow retries on next attempt
      throw error
    }
  })()

  return dbInitPromise
}

/**
 * Force database reinitialization
 * Useful for testing or manual resets
 */
export function resetDBInitFlag(): void {
  dbInitialized = false
  dbInitPromise = null
}

/**
 * Check if database has been initialized in this process
 */
export function isDBInitializedFlag(): boolean {
  return dbInitialized
}
