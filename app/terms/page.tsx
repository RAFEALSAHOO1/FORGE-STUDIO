'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FileText, ArrowLeft } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const SECTIONS = [
  {
    id: 'acceptance',
    title: '1. Acceptance of Terms',
    content: `By accessing or using DesignForge Studio ("Service"), you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree with any part of these Terms, you may not access the Service.

These Terms apply to all visitors, users, and clients of DesignForge Studio. We reserve the right to update these Terms at any time. Continued use of the Service after changes constitutes acceptance of the revised Terms.`,
  },
  {
    id: 'services',
    title: '2. Services Description',
    content: `DesignForge Studio provides custom visual design services including but not limited to:
• Posters and banners
• Invitations and event materials
• Menu cards and restaurant materials
• Business cards and corporate identity
• Social media content and templates
• Branding assets and logo design
• Packaging and product labels
• Digital templates and UI kits

All designs are created by our professional design team based on your specifications. We do not offer automated or AI-only design — each project involves human designer expertise.`,
  },
  {
    id: 'ordering',
    title: '3. Ordering & Payment',
    content: `**Order Process:**
When you place an order, you agree to provide accurate project details. Incomplete or misleading briefs may result in delays or additional charges.

**Pricing:**
All prices are listed in USD. Prices are subject to change without notice. The price at the time of order placement is binding.

**Payment:**
Payment is required in full before design work commences. We accept credit/debit cards via Stripe, PayPal, and cryptocurrency.

**Taxes:**
Applicable taxes will be added at checkout based on your location.

**Urgency Fees:**
Express (3-day) and Rush (24-hour) delivery incur additional fees clearly stated at checkout.`,
  },
  {
    id: 'revisions',
    title: '4. Revisions & Delivery',
    content: `**Included Revisions:**
Each service includes a specified number of revision rounds (stated on the product page). Additional revisions are available at a fee.

**Revision Scope:**
Revisions are limited to amendments within the original brief. Major changes to concept, style, or direction may be treated as new projects.

**Delivery:**
Final files are delivered to your registered email address as digital files in the specified formats. Delivery timelines begin after receipt of all required project information and payment.

**Delivery Delays:**
We strive to meet all deadlines. In the event of unavoidable delays, we will notify you immediately and adjust delivery dates.`,
  },
  {
    id: 'intellectual-property',
    title: '5. Intellectual Property',
    content: `**Ownership Transfer:**
Upon receipt of full payment, you receive full ownership and copyright of the final delivered design files, subject to the exceptions below.

**Third-Party Assets:**
Designs may incorporate stock images, fonts, or elements licensed from third parties. These retain their respective licenses. We will disclose any such usage upon request.

**Portfolio Rights:**
We reserve the right to display your project in our portfolio unless you request confidentiality in writing prior to delivery.

**Our Proprietary Tools:**
Our design processes, templates, and methodologies remain our intellectual property.`,
  },
  {
    id: 'prohibited',
    title: '6. Prohibited Uses',
    content: `You may not use our Service to create designs that:
• Infringe on third-party intellectual property rights
• Promote illegal activities
• Contain defamatory, obscene, or harassing content
• Impersonate individuals or organizations
• Violate applicable laws or regulations
• Are intended to deceive consumers (false advertising)

We reserve the right to refuse or cancel orders that violate these prohibitions, with a full refund issued.`,
  },
  {
    id: 'refunds',
    title: '7. Refund & Cancellation Policy',
    content: `**Cancellation Before Work Starts:**
Full refund if cancelled within 24 hours of order placement and before design work has started.

**Cancellation After Work Starts:**
50% refund if cancelled after design work has commenced but before delivery.

**No Refund After Delivery:**
No refunds after final files have been delivered, unless there is a material defect or we fail to deliver within the agreed specification.

**Disputes:**
If you are unsatisfied with the final design, please contact us within 7 days of delivery. We will work to resolve the issue through additional revisions.

To request a refund, email refunds@designforge.studio with your order ID.`,
  },
  {
    id: 'limitation',
    title: '8. Limitation of Liability',
    content: `To the maximum extent permitted by law, DesignForge Studio shall not be liable for:
• Indirect, incidental, special, or consequential damages
• Loss of profits, data, or business opportunities
• Damages resulting from the use or inability to use our Service
• Errors in your project brief that result in incorrect designs

Our total liability for any claim shall not exceed the amount paid for the specific order giving rise to the claim.`,
  },
  {
    id: 'governing-law',
    title: '9. Governing Law',
    content: `These Terms shall be governed by and construed in accordance with applicable law. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts in the applicable jurisdiction.

For EU users: You may also refer disputes to your local consumer protection authority or use the EU Online Dispute Resolution platform.`,
  },
  {
    id: 'contact',
    title: '10. Contact',
    content: `For questions about these Terms, please contact:

**Email:** legal@designforge.studio
**Support:** support@designforge.studio

We aim to respond to all legal inquiries within 5 business days.`,
  },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 pt-12 pb-24">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Link href="/" className="flex items-center gap-2 text-white/30 hover:text-white text-sm mb-10 transition-colors w-fit">
            <ArrowLeft size={14} /> Back to home
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center">
              <FileText size={22} className="text-green-400" />
            </div>
            <div>
              <h1 className="text-4xl text-white tracking-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
                Terms & Conditions
              </h1>
              <p className="text-white/30 text-sm mt-1">Last updated: April 8, 2025 · Effective: April 8, 2025</p>
            </div>
          </div>

          <div className="liquid-glass rounded-2xl p-6 mb-12 border border-green-500/20">
            <p className="text-white/70 text-sm leading-relaxed">
              <span className="text-white font-medium">Summary:</span> You own your designs after full payment.
              We offer revisions within scope. Refunds available within 24 hours. We never create illegal content.
              These terms are governed by applicable consumer protection law.
            </p>
          </div>

          {/* ToC */}
          <div className="liquid-glass rounded-2xl p-6 mb-12">
            <p className="text-white/40 text-xs tracking-widest uppercase mb-4">Contents</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {SECTIONS.map(sec => (
                <a key={sec.id} href={`#${sec.id}`}
                  className="text-white/50 text-sm hover:text-white transition-colors py-1 flex items-center gap-2">
                  <span className="text-white/20">→</span> {sec.title}
                </a>
              ))}
            </div>
          </div>

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
                <h2 className="text-white text-xl font-medium mb-4">{sec.title}</h2>
                <div className="text-white/55 text-sm leading-relaxed">
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

          <div className="mt-16 liquid-glass rounded-2xl p-6 text-center">
            <p className="text-white/40 text-sm mb-4">Questions about our terms?</p>
            <Link href="/contact">
              <button className="liquid-glass rounded-full px-8 py-3 text-white text-sm hover:bg-white/5 transition-colors">
                Contact Us
              </button>
            </Link>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}
