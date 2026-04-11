'use client'

import { ReactNode } from 'react'

interface CardProps {
  title?: string
  paragraph?: string
  items?: string[]
  buttonText?: string
  onButtonClick?: () => void
  children?: ReactNode
  className?: string
}

export default function Card({ title, paragraph, items = [], buttonText, onButtonClick, children, className = '' }: CardProps) {
  return (
    <div className={`light-morph rounded-2xl p-6 backdrop-blur-xl ${className}`}>
      <div className="card__border" />
      {(title || paragraph) && (
        <div className="card_title__container">
          {title && <span className="card_title text-white text-base font-medium">{title}</span>}
          {paragraph && <p className="card_paragraph text-white/50 text-xs mt-1">{paragraph}</p>}
        </div>
      )}
      {items.length > 0 && (
        <>
          <hr className="w-full border-t border-[hsl(240,9%,17%)]" />
          <ul className="card__list flex flex-col gap-2">
            {items.map((item, i) => (
              <li key={i} className="card__list_item flex items-center gap-2">
                <span className="check flex items-center justify-center w-4 h-4 bg-[hsl(189,92%,58%)] rounded-full">
                  <svg className="w-3 h-3 fill-[hsl(240,15%,9%)]" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" />
                  </svg>
                </span>
                <span className="list_text text-white/80 text-xs">{item}</span>
              </li>
            ))}
          </ul>
        </>
      )}
      {children}
      {buttonText && (
        <button
          onClick={onButtonClick}
          className="button w-full py-2 text-xs text-white rounded-full cursor-pointer transition-all hover:shadow-lg"
          style={{
            background: 'linear-gradient(135deg, hsl(189,92%,58%), hsl(189,99%,26%))',
            boxShadow: 'inset 0 -2px 25px -4px rgba(255,255,255,0.5), 0 8px 20px rgba(137,170,204,0.2)',
          }}
        >
          {buttonText}
        </button>
      )}
    </div>
  )
}
