'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Flame, Shield, ArrowLeft } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const SECTIONS = [
  {
    id: 'introduction',
    title: '1. Introduction',
    content: `DesignForge Studio ("we", "our", or "us") is committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our design services.

Please read this policy carefully. If you disagree with its terms, please discontinue use of our site. We reserve the right to make changes to this policy at any time. We will alert you about any changes by updating the "Last Updated" date.`,
  },
  {
    id: 'information-collected',
    title: '2. Information We Collect',
    content: `We may collect information about you in various ways:

**Personal Data You Provide:**
• Name, email address, and contact information when you register or place an order
• Payment information (processed securely through Stripe — we never store raw card data)
• Design preferences, project details, and uploaded reference files
• Communications you send us (support messages, feedback)

**Information Collected Automatically:**
• Log data (IP address, browser type, pages visited, time spent)
• Device information (device type, operating system)
• Cookies and similar tracking technologies
• Usage patterns and interaction data

**Information from Third Parties:**
• Google OAuth profile data (name, email, profile picture) if you sign in with Google
• Analytics data from integrated services`,
  },
  {
    id: 'use-of-information',
    title: '3. How We Use Your Information',
    content: `We use the information we collect to:

• Create and manage your account
• Process and fulfill design orders
• Send transactional emails (order confirmations, delivery notifications)
• Respond to customer service requests
• Send marketing communications (with your explicit consent)
• Improve our website, services, and user experience
• Prevent fraud and ensure security
• Comply with legal obligations
• Analyze usage trends to improve our platform

**Legal Basis (GDPR):** We process your data under: Contract performance, legitimate interests, legal obligations, and consent (for marketing).`,
  },
  {
    id: 'data-sharing',
    title: '4. Data Sharing & Disclosure',
    content: `We do not sell, trade, or rent your personal data to third parties. We may share data with:

**Service Providers:**
• Stripe (payment processing)
• Google (OAuth authentication, Analytics)
• Vercel/hosting providers (infrastructure)
• Email service providers (transactional emails)

**Legal Requirements:**
We may disclose your information if required by law, court order, or government authority.

**Business Transfers:**
If we are involved in a merger or acquisition, your data may be transferred as part of that transaction.

All third-party providers are contractually required to protect your data and use it only as instructed.`,
  },
  {
    id: 'cookies',
    title: '5. Cookies & Tracking',
    content: `We use cookies and similar technologies to:
• Keep you logged in across sessions
• Remember your preferences (theme, language)
• Analyze site traffic and usage patterns
• Provide personalized experiences

**Types of Cookies:**
• Essential: Required for the site to function
• Analytics: Help us understand how you use our site
• Preferences: Remember your settings

You can control cookies through your browser settings. Note that disabling cookies may affect site functionality.`,
  },
  {
    id: 'data-retention',
    title: '6. Data Retention',
    content: `We retain your personal data for as long as:
• Your account is active
• Necessary to fulfill the purposes described in this policy
• Required by applicable law (e.g., tax and accounting records for 7 years)

Design files and order data are retained for 2 years after project completion. You may request deletion at any time (subject to legal retention requirements).`,
  },
  {
    id: 'your-rights',
    title: '7. Your Rights (GDPR)',
    content: `Under GDPR and applicable privacy laws, you have the right to:

• **Access** — Request a copy of your personal data
• **Rectification** — Correct inaccurate data
• **Erasure** ("Right to be forgotten") — Request deletion of your data
• **Portability** — Receive your data in a machine-readable format
• **Restriction** — Limit how we process your data
• **Objection** — Object to processing based on legitimate interests
• **Withdraw Consent** — Withdraw consent for marketing at any time

To exercise these rights, contact us at privacy@designforge.studio. We will respond within 30 days.`,
  },
  {
    id: 'security',
    title: '8. Data Security',
    content: `We implement industry-standard security measures including:
• SSL/TLS encryption for all data in transit
• Encrypted storage for sensitive data
• Regular security audits and penetration testing
• Access controls limiting data access to authorized personnel
• Secure payment processing via Stripe (PCI DSS compliant)

Despite these measures, no internet transmission is 100% secure. We encourage you to use strong, unique passwords and enable two-factor authentication.`,
  },
  {
    id: 'children',
    title: '9. Children\'s Privacy',
    content: `Our services are not directed to individuals under the age of 16. We do not knowingly collect personal information from children. If you believe we have inadvertently collected data from a minor, please contact us immediately and we will delete it promptly.`,
  },
  {
    id: 'international',
    title: '10. International Transfers',
    content: `Your data may be transferred to and processed in countries outside your own. When we transfer data from the EU/UK, we ensure appropriate safeguards are in place, including Standard Contractual Clauses (SCCs) approved by the European Commission.`,
  },
  {
    id: 'contact',
    title: '11. Contact Us',
    content: `For privacy-related questions, data requests, or concerns, contact our Data Protection Officer:

**Email:** privacy@designforge.studio
**Address:** DesignForge Studio, [Address]
**Response Time:** Within 30 days

For GDPR complaints, you may also contact your local Data Protection Authority.`,
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 pt-12 pb-24">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          {/* Header */}
          <Link href="/" className="flex items-center gap-2 text-white/30 hover:text-white text-sm mb-10 transition-colors w-fit">
            <ArrowLeft size={14} /> Back to home
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-[#89AACC]/10 flex items-center justify-center">
              <Shield size={22} className="text-[#89AACC]" />
            </div>
            <div>
              <h1 className="text-4xl text-white tracking-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
                Privacy Policy
              </h1>
              <p className="text-white/30 text-sm mt-1">Last updated: April 8, 2025 · Effective: April 8, 2025</p>
            </div>
          </div>

          {/* Summary banner */}
          <div className="liquid-glass rounded-2xl p-6 mb-12 border border-[#89AACC]/20">
            <p className="text-white/70 text-sm leading-relaxed">
              <span className="text-white font-medium">Plain English Summary:</span> We collect only the data we need to serve you.
              We never sell your data. You can delete your account anytime. We use industry-standard security.
              This policy complies with GDPR, CCPA, and applicable privacy laws.
            </p>
          </div>

          {/* Table of contents */}
          <div className="liquid-glass rounded-2xl p-6 mb-12">
            <p className="text-white/40 text-xs tracking-widest uppercase mb-4">Contents</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {SECTIONS.map(sec => (
                <a key={sec.id} href={`#${sec.id}`}
                  className="text-white/50 text-sm hover:text-white transition-colors py-1 flex items-center gap-2">
                  <span className="text-white/20">→</span>
                  {sec.title}
                </a>
              ))}
            </div>
          </div>

          {/* Sections */}
          <div className="flex flex-col gap-12">
            {SECTIONS.map((sec, i) => (
              <motion.section
                key={sec.id}
                id={sec.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.03 }}
              >
                <h2 className="text-white text-xl font-medium mb-4 tracking-tight">{sec.title}</h2>
                <div className="text-white/55 text-sm leading-relaxed whitespace-pre-line">
                  {sec.content.split('\n').map((line, j) => (
                    <p key={j} className={`${line.startsWith('•') ? 'ml-4' : ''} ${line.startsWith('**') ? 'text-white/80 font-medium mt-4 mb-1' : ''} mb-1.5`}>
                      {line.replace(/\*\*(.*?)\*\*/g, '$1')}
                    </p>
                  ))}
                </div>
                {i < SECTIONS.length - 1 && <div className="mt-8 h-px bg-white/5" />}
              </motion.section>
            ))}
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}
