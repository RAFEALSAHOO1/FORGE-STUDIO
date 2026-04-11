import { NextRequest } from 'next/server'
import { rateLimit, apiSuccess, apiError, sanitizeString } from '@/lib/utils'

// In-memory store (mirrors /api/designs POST store in production — both hit same DB)
// For demo: importing from a shared module would be correct; here we re-declare minimal shape
interface DesignRecord {
  id: string
  userId: string
  productId: string
  productName: string
  textContent: string
  primaryColor: string
  fontFamily: string
  fontSize: number
  size: string
  addons: string[]
  notes: string
  status: 'draft' | 'ordered' | 'delivered'
  createdAt: string
  updatedAt: string
}

// Shared in-memory store (replace with DB query in production)
const designs: DesignRecord[] = []

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const design = designs.find(d => d.id === params.id)
  if (!design) return apiError('Design not found', 404)
  return apiSuccess({ design })
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown'
  const { allowed } = rateLimit(`design-update-${ip}`, 30, 60_000)
  if (!allowed) return apiError('Rate limit exceeded', 429)

  const design = designs.find(d => d.id === params.id)
  if (!design) return apiError('Design not found', 404)

  try {
    const body = await req.json()

    if (body.textContent !== undefined) design.textContent = sanitizeString(body.textContent, 1000)
    if (body.primaryColor !== undefined && /^#[0-9a-fA-F]{3,6}$/.test(body.primaryColor)) design.primaryColor = body.primaryColor
    if (body.fontFamily  !== undefined) design.fontFamily  = sanitizeString(body.fontFamily, 100)
    if (body.fontSize    !== undefined) design.fontSize    = Math.min(Math.max(Number(body.fontSize) || 48, 8), 200)
    if (body.size        !== undefined) design.size        = sanitizeString(body.size, 50)
    if (body.notes       !== undefined) design.notes       = sanitizeString(body.notes, 2000)
    if (body.status      !== undefined && ['draft','ordered','delivered'].includes(body.status)) design.status = body.status

    design.updatedAt = new Date().toISOString()

    return apiSuccess({ design })
  } catch {
    return apiError('Failed to update design', 500)
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const idx = designs.findIndex(d => d.id === params.id)
  if (idx === -1) return apiError('Design not found', 404)
  designs.splice(idx, 1)
  return apiSuccess({ deleted: true, id: params.id })
}
