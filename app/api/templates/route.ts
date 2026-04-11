import { NextRequest } from 'next/server'
import { rateLimit, apiSuccess, apiError, sanitizeString } from '@/lib/utils'
import { PRODUCTS, CATEGORIES, searchProducts, getProductsByCategory } from '@/lib/products'

// ─── GET /api/templates — browse templates with filters ────────────────────────
export async function GET(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown'
  const { allowed } = rateLimit(`templates-${ip}`, 200, 60_000)
  if (!allowed) return apiError('Rate limit exceeded', 429)

  try {
    const { searchParams } = new URL(req.url)
    const query = sanitizeString(searchParams.get('q') ?? '', 200)
    const category = sanitizeString(searchParams.get('category') ?? '', 100)
    const filter = searchParams.get('filter') ?? 'all' // all | popular | new | premium
    const sortBy = searchParams.get('sort') ?? 'default' // default | price-asc | price-desc | name
    const page = Math.max(1, Number(searchParams.get('page')) || 1)
    const limit = Math.min(50, Number(searchParams.get('limit')) || 12)

    let results = query ? searchProducts(query) : (category ? getProductsByCategory(category) : PRODUCTS)

    // Apply filters
    if (filter === 'popular') results = results.filter(p => p.popular)
    else if (filter === 'new') results = results.filter(p => p.new)
    else if (filter === 'premium') results = results.filter(p => p.premium)

    // Apply sort
    if (sortBy === 'price-asc') results = [...results].sort((a, b) => a.price - b.price)
    else if (sortBy === 'price-desc') results = [...results].sort((a, b) => b.price - a.price)
    else if (sortBy === 'name') results = [...results].sort((a, b) => a.name.localeCompare(b.name))

    const total = results.length
    const paginated = results.slice((page - 1) * limit, page * limit)

    return apiSuccess({
      products: paginated,
      categories: CATEGORIES.map(c => ({ id: c.id, name: c.name, icon: c.icon, count: getProductsByCategory(c.id).length })),
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    })
  } catch {
    return apiError('Failed to fetch templates', 500)
  }
}
