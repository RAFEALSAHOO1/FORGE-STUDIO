import { sql } from './db'
import { randomBytes, scryptSync } from 'crypto'

/**
 * Password hashing and verification utilities
 * Uses Node.js built-in crypto (scrypt) for secure password hashing
 * For production with better performance, use bcryptjs: npm install bcryptjs
 */

interface SignupInput {
  name: string
  email: string
  password: string
}

interface LoginInput {
  email: string
  password: string
}

interface AuthUser {
  id: string
  name: string
  email: string
  role: string
  created_at: string
}

/**
 * Hash password using Node's crypto.scrypt
 * Format: algorithm$salt$hash
 */
async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString('hex')
  
  // Use scrypt for hashing (secure, resistant to GPU attacks)
  const hash = scryptSync(password, salt, 64).toString('hex')
  
  return `scrypt$${salt}$${hash}`
}

/**
 * Verify password against hash
 */
async function verifyPassword(password: string, hash: string): Promise<boolean> {
  try {
    const parts = hash.split('$')
    if (parts.length !== 3) return false

    const [algorithm, salt, storedHash] = parts
    
    if (algorithm !== 'scrypt') return false

    const computed = scryptSync(password, salt, 64).toString('hex')
    
    return computed === storedHash
  } catch {
    return false
  }
}

/**
 * CREATE account - Insert user into database
 */
export async function signup(input: SignupInput): Promise<AuthUser> {
  const { name, email, password } = input

  // Validate input
  if (!name || !email || !password) {
    throw new Error('Name, email, and password are required')
  }

  if (name.length < 2) {
    throw new Error('Name must be at least 2 characters')
  }

  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters')
  }

  if (!email.includes('@')) {
    throw new Error('Valid email required')
  }

  // Check if email already exists
  const existing = (await sql`SELECT id FROM users WHERE email = ${email.toLowerCase()}`) as any[]
  if (existing && existing.length > 0) {
    throw new Error('Email already registered')
  }

  // Hash password
  const passwordHash = await hashPassword(password)

  // Insert user into database
  const result = (await sql`
    INSERT INTO users (name, email, password_hash, role)
    VALUES (${name}, ${email.toLowerCase()}, ${passwordHash}, 'user')
    RETURNING id, name, email, role, created_at
  `) as any[]

  if (!result || result.length === 0) {
    throw new Error('Failed to create user')
  }

  return result[0] as AuthUser
}

/**
 * LOGIN - Fetch user and verify password
 */
export async function login(input: LoginInput): Promise<AuthUser> {
  const { email, password } = input

  // Validate input
  if (!email || !password) {
    throw new Error('Email and password required')
  }

  // Fetch user from database
  const result = (await sql`
    SELECT id, name, email, password_hash, role, created_at
    FROM users
    WHERE email = ${email.toLowerCase()}
  `) as any[]

  if (!result || result.length === 0) {
    throw new Error('Invalid email or password')
  }

  const user = result[0]

  // Verify password
  const isValid = await verifyPassword(password, user.password_hash)
  if (!isValid) {
    throw new Error('Invalid email or password')
  }

  // Return user without password hash
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    created_at: user.created_at,
  }
}

/**
 * Get user by ID
 */
export async function getUserById(userId: string): Promise<AuthUser | null> {
  const result = (await sql`
    SELECT id, name, email, role, created_at
    FROM users
    WHERE id = ${userId}
  `) as any[]

  if (!result || result.length === 0) {
    return null
  }

  return result[0] as AuthUser
}

/**
 * Get user by email
 */
export async function getUserByEmail(email: string): Promise<AuthUser | null> {
  const result = (await sql`
    SELECT id, name, email, role, created_at
    FROM users
    WHERE email = ${email.toLowerCase()}
  `) as any[]

  if (!result || result.length === 0) {
    return null
  }

  return result[0] as AuthUser
}
