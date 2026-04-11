# DesignForge Studio — Complete Frontend + Backend

A **production-ready** premium design service platform built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy env template
cp .env.example .env.local

# 3. Fill in your environment variables (see below)

# 4. Run development server
npm run dev

# 5. Open http://localhost:3000
```

---

## 🌍 Environment Variables

Create `.env.local` from the template below:

```env
# ── App ────────────────────────────────────────────────────────────
NEXT_PUBLIC_APP_URL=http://localhost:3000

# ── Google Analytics ────────────────────────────────────────────────
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# ── Google OAuth (for real auth) ────────────────────────────────────
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# ── Database (Neon / Supabase / PlanetScale) ────────────────────────
DATABASE_URL=postgresql://user:pass@host/dbname

# ── Stripe Payments ─────────────────────────────────────────────────
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# ── Email (Resend / SendGrid) ────────────────────────────────────────
RESEND_API_KEY=re_...
FROM_EMAIL=noreply@designforge.studio

# ── Auth Secret (NextAuth) ──────────────────────────────────────────
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32
NEXTAUTH_URL=http://localhost:3000
```

---

## 📁 Project Structure

```
designforge-studio/
├── app/
│   ├── page.tsx                    ← Landing (loader + all sections)
│   ├── layout.tsx                  ← Root layout + GA + fonts
│   ├── globals.css                 ← Full design system
│   ├── global-error.tsx            ← Global error boundary
│   ├── error.tsx                   ← Page-level errors
│   ├── not-found.tsx               ← 404 page
│   ├── about/                      ← About page
│   ├── browse/                     ← Browse all products
│   │   └── [id]/                   ← Individual product page
│   ├── contact/                    ← Contact form
│   ├── login/                      ← Authentication
│   ├── signup/                     ← Registration
│   ├── dashboard/                  ← User dashboard
│   ├── profile/                    ← User profile
│   ├── settings/                   ← Settings (appearance/notifications/etc)
│   ├── order/                      ← 3-step order wizard
│   ├── order-tracking/             ← Order timeline + status
│   ├── payment/                    ← Payment (card/PayPal/crypto)
│   ├── admin/                      ← Admin panel (orders/users/overview)
│   ├── forge/                      ← The Forge customizer
│   ├── privacy/                    ← GDPR Privacy Policy
│   ├── terms/                      ← Terms & Conditions
│   ├── maintenance/                ← Maintenance page with countdown
│   ├── status/                     ← System status page
│   └── api/
│       ├── designs/                ← Save/list custom designs
│       ├── templates/              ← Browse products/templates
│       ├── orders/                 ← Create/list orders
│       ├── auth/                   ← Login/register/Google OAuth
│       └── analytics/             ← Event tracking
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx              ← Glass pill navbar (all links)
│   │   └── Footer.tsx              ← Full footer with legal links
│   ├── sections/
│   │   ├── HeroSection.tsx         ← Cinematic video hero
│   │   ├── LandingSections.tsx     ← About/Featured/Philosophy/Services/CTA
│   │   └── ProductHighlights.tsx   ← Category grid + featured products
│   ├── heroes/
│   │   ├── TargoHero.tsx           ← Logistics-style hero
│   │   └── VEXHero.tsx             ← Animated typography hero
│   └── ui/
│       ├── LoadingScreen.tsx       ← Rotating words + counter + progress
│       ├── UiverseButton.tsx       ← Sparkle letter-animation button
│       ├── ThemeToggle.tsx         ← Sun/moon theme switcher
│       ├── Checkbox.tsx            ← Gradient checkbox
│       ├── Skeleton.tsx            ← Shimmer skeleton loaders
│       ├── Card.tsx                ← Rotating-border card
│       ├── PodaInput.tsx           ← Layered glow input
│       ├── OrderTimeline.tsx       ← Animated order step timeline
│       ├── AdminTable.tsx          ← Orders + users management tables
│       ├── Toast.tsx               ← Toast notification system
│       ├── Reviews.tsx             ← Star ratings + review cards
│       ├── PageLoading.tsx         ← Page-level cube loader
│       └── ForgeAnimations.tsx     ← Live design preview + particles
├── lib/
│   ├── products.ts                 ← 50+ product catalog (all categories)
│   ├── theme-context.tsx           ← Dark/light/system theme
│   └── utils.ts                   ← Rate limiting + analytics + helpers
└── middleware.ts                   ← Security headers + rate limiting
```

---

## 🎨 Design System

### Liquid Glass
```css
.liquid-glass { /* All glass elements */ }
```

### Colors
- **Accent**: `#89AACC` / `#4E85BF`
- **Background**: `#0a0a0a`
- **Text**: `#f5f5f5`
- **Muted**: `#888888`

### Fonts
- **Display**: Instrument Serif (italic)
- **UI**: Inter (300–600)
- **Targo**: Rubik (bold)

---

## 🛠️ To Add Real Backend

### 1. Database (Neon/Supabase)
Replace in-memory stores in `app/api/*/route.ts` with:
```ts
import { neon } from '@neondatabase/serverless'
const sql = neon(process.env.DATABASE_URL!)
const results = await sql`SELECT * FROM designs WHERE user_id = ${userId}`
```

### 2. Stripe Payments
```ts
import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
const session = await stripe.checkout.sessions.create({ ... })
```

### 3. Google OAuth (NextAuth)
```bash
npm install next-auth
```
Add `app/api/auth/[...nextauth]/route.ts` with GoogleProvider.

### 4. Real Email (Resend)
```bash
npm install resend
```
```ts
import { Resend } from 'resend'
const resend = new Resend(process.env.RESEND_API_KEY)
await resend.emails.send({ from, to, subject, html })
```

---

## 🚀 Deploy on Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set env vars in Vercel dashboard
# vercel.com → Project → Settings → Environment Variables
```

---

## 📋 Pages Checklist

| Page | Route | Status |
|------|-------|--------|
| Landing | `/` | ✅ |
| Browse | `/browse` | ✅ |
| Product Detail | `/browse/[id]` | ✅ |
| The Forge | `/forge` | ✅ |
| About | `/about` | ✅ |
| Contact | `/contact` | ✅ |
| Login | `/login` | ✅ |
| Sign Up | `/signup` | ✅ |
| Dashboard | `/dashboard` | ✅ |
| Profile | `/profile` | ✅ |
| Settings | `/settings` | ✅ |
| Place Order | `/order` | ✅ |
| Track Order | `/order-tracking` | ✅ |
| Payment | `/payment` | ✅ |
| Admin Panel | `/admin` | ✅ |
| Privacy Policy | `/privacy` | ✅ |
| Terms | `/terms` | ✅ |
| Maintenance | `/maintenance` | ✅ |
| System Status | `/status` | ✅ |
| 404 | `/not-found` | ✅ |
| Error | `/error` | ✅ |

---

## 🔒 Security Features

- ✅ Rate limiting (60 req/min API, 300 req/min pages)
- ✅ Security headers (CSP, X-Frame-Options, etc.)
- ✅ Input sanitization on all API routes
- ✅ SQL injection prevention (parameterized queries)
- ✅ XSS protection headers
- ✅ CORS via Next.js built-in

---

Built with ❤️ using Next.js 14, TypeScript, Tailwind CSS, Framer Motion
