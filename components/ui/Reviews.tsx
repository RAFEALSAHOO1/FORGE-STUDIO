'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ThumbsUp, ChevronDown, ChevronUp } from 'lucide-react'

interface Review {
  id: string
  author: string
  initials: string
  rating: number
  date: string
  title: string
  body: string
  verified: boolean
  helpful: number
  product: string
}

const SAMPLE_REVIEWS: Review[] = [
  { id: 'r1', author: 'Sarah K.', initials: 'SK', rating: 5, date: 'Apr 2, 2025', title: 'Absolutely stunning wedding invitations!', body: 'The designer understood exactly what I wanted. The final design exceeded every expectation — delicate, elegant, and truly one-of-a-kind. Delivered two days early too. Highly recommend!', verified: true, helpful: 14, product: 'Classic Wedding Suite' },
  { id: 'r2', author: 'Mark T.', initials: 'MT', rating: 5, date: 'Mar 28, 2025', title: 'My brand finally looks professional', body: 'After years with a mediocre logo, the Brand Identity Kit transformed my business. The designer nailed our values — bold yet approachable. The whole kit (logo, colors, fonts) is cohesive and premium.', verified: true, helpful: 9, product: 'Full Brand Identity Kit' },
  { id: 'r3', author: 'Priya M.', initials: 'PM', rating: 5, date: 'Mar 15, 2025', title: 'Instagram pack boosted our engagement 3x', body: 'We got the 50-template social media kit and our content looks completely transformed. Clients keep asking who does our graphics. Worth every penny.', verified: true, helpful: 22, product: 'Social Media Kit (50 Templates)' },
  { id: 'r4', author: 'James W.', initials: 'JW', rating: 4, date: 'Mar 10, 2025', title: 'Great flyer design, minor tweak needed', body: 'Really happy with the event flyer. Had to request one revision for a font change but the team was super responsive and turned it around in hours. Final result was great.', verified: true, helpful: 5, product: 'Event Announcement Flyer' },
  { id: 'r5', author: 'Liu F.', initials: 'LF', rating: 5, date: 'Feb 28, 2025', title: 'The café menu is perfect for our opening', body: 'Needed a beautiful menu for our café launch and DesignForge delivered beyond expectations. The warmth and character of the design perfectly represents our brand. Our customers love it!', verified: true, helpful: 11, product: 'Coffee Shop Menu Board' },
]

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} size={size} className={i <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-white/20'} />
      ))}
    </div>
  )
}

interface ReviewsProps {
  productId?: string
  compact?: boolean
}

export default function Reviews({ productId, compact = false }: ReviewsProps) {
  const [helpful, setHelpful] = useState<Record<string, boolean>>({})
  const [expanded, setExpanded] = useState(false)

  const reviews = productId ? SAMPLE_REVIEWS.filter(r => r.product === productId) : SAMPLE_REVIEWS
  const shown = compact && !expanded ? reviews.slice(0, 2) : reviews

  const avgRating = reviews.reduce((s, r) => s + r.rating, 0) / (reviews.length || 1)

  return (
    <div>
      {/* Summary */}
      <div className="flex items-center gap-6 mb-8">
        <div className="text-center">
          <p className="text-5xl text-white font-light" style={{ fontFamily: "'Instrument Serif', serif" }}>
            {avgRating.toFixed(1)}
          </p>
          <StarRating rating={Math.round(avgRating)} size={16} />
          <p className="text-white/30 text-xs mt-1">{reviews.length} reviews</p>
        </div>
        <div className="flex-1 flex flex-col gap-1.5">
          {[5, 4, 3, 2, 1].map(star => {
            const count = reviews.filter(r => r.rating === star).length
            const pct = reviews.length ? (count / reviews.length) * 100 : 0
            return (
              <div key={star} className="flex items-center gap-3">
                <span className="text-white/30 text-xs w-3">{star}</span>
                <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-yellow-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8, delay: star * 0.05 }}
                  />
                </div>
                <span className="text-white/20 text-xs w-4">{count}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Review cards */}
      <div className="flex flex-col gap-5">
        <AnimatePresence>
          {shown.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="liquid-glass rounded-2xl p-6"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#89AACC] to-[#4E85BF] flex items-center justify-center text-sm font-semibold text-white flex-shrink-0">
                    {review.initials}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-white text-sm font-medium">{review.author}</p>
                      {review.verified && (
                        <span className="px-2 py-0.5 rounded-full text-xs bg-green-500/15 text-green-400">Verified</span>
                      )}
                    </div>
                    <p className="text-white/30 text-xs">{review.date} · {review.product}</p>
                  </div>
                </div>
                <StarRating rating={review.rating} />
              </div>

              <h4 className="text-white text-sm font-medium mb-2">{review.title}</h4>
              <p className="text-white/55 text-sm leading-relaxed mb-4">{review.body}</p>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setHelpful(prev => ({ ...prev, [review.id]: !prev[review.id] }))}
                  className={`flex items-center gap-1.5 text-xs transition-colors ${helpful[review.id] ? 'text-[#89AACC]' : 'text-white/30 hover:text-white/60'}`}
                >
                  <ThumbsUp size={12} />
                  Helpful ({review.helpful + (helpful[review.id] ? 1 : 0)})
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {compact && reviews.length > 2 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-white/40 hover:text-white text-sm mt-6 transition-colors mx-auto"
        >
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          {expanded ? 'Show less' : `Show all ${reviews.length} reviews`}
        </button>
      )}
    </div>
  )
}
