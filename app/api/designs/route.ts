import { NextRequest } from 'next/server'
import sql from '@/lib/db'
import { rateLimit, apiSuccess, apiError, sanitizeString } from '@/lib/utils'

// ─── Design interface ────────────────────────────────────────────────────────
interface Design {
  id: number
  user_id: string
  product_id: string
  product_name: string
  text_content: string | null
  primary_color: string
  font_family: string
  font_size: number
  size: string
  addons: string[]
  notes: string | null
  status: 'draft' | 'ordered' | 'delivered'
  created_at: string
  updated_at: string
}

// ─── POST /api/designs — create a new design ─────────────────────────────────
export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown'
  const { allowed, remaining } = rateLimit(`designs-create-${ip}`, 30, 60_000)

  if (!allowed) {
    return apiError('Too many requests. Please slow down.', 429)
  }

  try {
    const body = await req.json()

    const design = {
      user_id: sanitizeString(body.userId) || 'anonymous',
      product_id: sanitizeString(body.productId, 100),
      product_name: sanitizeString(body.productName, 200),
      text_content: sanitizeString(body.textContent, 1000) || null,
      primary_color: /^#[0-9a-fA-F]{3,6}$/.test(body.primaryColor) ? body.primaryColor : '#89AACC',
      font_family: sanitizeString(body.fontFamily, 100) || 'Inter',
      font_size: Math.min(Math.max(Number(body.fontSize) || 48, 8), 200),
      size: sanitizeString(body.size, 50) || 'A4',
      addons: Array.isArray(body.addons) ? body.addons.map((a: unknown) => sanitizeString(a as string, 50)) : [],
      notes: sanitizeString(body.notes, 2000) || null,
      status: 'draft' as const,
    }

    const result = await sql`
      INSERT INTO designs (
        user_id, product_id, product_name, text_content, primary_color,
        font_family, font_size, size, addons, notes, status
      ) VALUES (
        ${design.user_id}, ${design.product_id}, ${design.product_name}, ${design.text_content},
        ${design.primary_color}, ${design.font_family}, ${design.font_size}, ${design.size},
        ${JSON.stringify(design.addons)}, ${design.notes}, ${design.status}
      )
      RETURNING *
    `

    const createdDesign = (result as any[])[0]

    return apiSuccess({ design: createdDesign }, 201)
  } catch (error) {
    console.error('Create design error:', error)
    return apiError('Failed to create design. Please try again.', 500)
  }
}

// ─── GET /api/designs — list user's designs ───────────────────────────────────
export async function GET(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown'
  const { allowed } = rateLimit(`designs-list-${ip}`, 120, 60_000)
  if (!allowed) return apiError('Rate limit exceeded', 429)

  try {
    const { searchParams } = new URL(req.url)
    const userId = sanitizeString(searchParams.get('userId') ?? '')
    const status = searchParams.get('status')
    const page = Math.max(1, Number(searchParams.get('page')) || 1)
    const limit = Math.min(50, Number(searchParams.get('limit')) || 10)
    const offset = (page - 1) * limit

    let whereClause = sql``
    const params: any[] = []

    if (userId) {
      whereClause = sql`WHERE user_id = ${userId}`
    }

    if (status && ['draft', 'ordered', 'delivered'].includes(status)) {
      whereClause = userId
        ? sql`${whereClause} AND status = ${status}`
        : sql`WHERE status = ${status}`
    }

    // Get total count
    const countResult = await sql`
      SELECT COUNT(*) as total FROM designs ${whereClause}
    `
    const total = Number((countResult as any[])[0].total)

    // Get paginated results
    const designs = await sql`
      SELECT * FROM designs ${whereClause}
      ORDER BY created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `

    return apiSuccess({
      designs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('List designs error:', error)
    return apiError('Failed to fetch designs', 500)
  }
}
