'use client'

interface SkeletonCardProps {
  className?: string
}

export function SkeletonCard({ className = '' }: SkeletonCardProps) {
  return (
    <div className={`skeleton-card ${className}`}>
      <div className="card_load" />
      <div className="flex flex-col flex-1 gap-2 pt-1">
        <div className="card_load_extreme_title" />
        <div className="card_load_extreme_descripion" />
      </div>
    </div>
  )
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 rounded"
          style={{
            width: i === lines - 1 ? '60%' : '100%',
            background: 'linear-gradient(120deg, #2a2a2a 30%, #3a3a3a 38%, #3a3a3a 40%, #2a2a2a 48%)',
            backgroundSize: '200% 100%',
            backgroundPosition: '100% 0',
            animation: 'load89234 2s infinite',
          }}
        />
      ))}
    </div>
  )
}

export function SkeletonGrid({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}
