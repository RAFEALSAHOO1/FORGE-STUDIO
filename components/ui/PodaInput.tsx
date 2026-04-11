'use client'

import { InputHTMLAttributes } from 'react'

interface PodaInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  label?: string
  className?: string
}

export default function PodaInput({ label, className = '', ...props }: PodaInputProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && <label className="text-white/40 text-xs tracking-widest uppercase">{label}</label>}
      <div id="poda" className="poda-wrapper relative">
        {/* Layered glow backgrounds */}
        <div className="poda-glow absolute overflow-hidden" style={{ maxHeight: 130, borderRadius: 12, filter: 'blur(30px)', opacity: 0.4, zIndex: -1, inset: 0 }} />
        <div className="poda-darkbg absolute" style={{ maxHeight: 65, borderRadius: 12, filter: 'blur(3px)', zIndex: -1, inset: 0 }} />
        <div className="poda-border absolute" style={{ maxHeight: 59, borderRadius: 11, filter: 'blur(0.5px)', zIndex: -1, inset: 0 }} />
        <div className="poda-white absolute" style={{ maxHeight: 63, borderRadius: 10, filter: 'blur(2px)', zIndex: -1, inset: 0 }} />

        <div id="main" className="relative flex items-center">
          {/* Search icon */}
          <div id="search-icon" className="absolute left-4 z-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24"
              strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"
              height="20" fill="none" className="feather feather-search">
              <circle stroke="url(#search-g)" r="8" cy="11" cx="11" />
              <line stroke="url(#searchl-g)" y2="16.65" y1="22" x2="16.65" x1="22" />
              <defs>
                <linearGradient gradientTransform="rotate(50)" id="search-g">
                  <stop stopColor="#f8e7f8" offset="0%" />
                  <stop stopColor="#b6a9b7" offset="50%" />
                </linearGradient>
                <linearGradient id="searchl-g">
                  <stop stopColor="#b6a9b7" offset="0%" />
                  <stop stopColor="#837484" offset="50%" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <input
            className="poda-input w-full"
            style={{
              background: '#010201',
              border: 'none',
              height: 56,
              borderRadius: 10,
              color: 'white',
              paddingLeft: 52,
              paddingRight: 52,
              fontSize: 16,
            }}
            {...props}
          />

          {/* Filter icon */}
          <div id="filter-icon" className="absolute right-2 z-10 flex items-center justify-center"
            style={{
              maxHeight: 40, maxWidth: 38, height: '100%', width: '100%',
              borderRadius: 10,
              background: 'linear-gradient(180deg, #161329, black, #1d1b4b)',
              border: '1px solid transparent',
            }}>
            <svg preserveAspectRatio="none" height="27" width="27" viewBox="4.8 4.56 14.832 15.408" fill="none">
              <path d="M8.16 6.65002H15.83C16.47 6.65002 16.99 7.17002 16.99 7.81002V9.09002C16.99 9.56002 16.7 10.14 16.41 10.43L13.91 12.64C13.56 12.93 13.33 13.51 13.33 13.98V16.48C13.33 16.83 13.1 17.29 12.81 17.47L12 17.98C11.24 18.45 10.2 17.92 10.2 16.99V13.91C10.2 13.5 9.97 12.98 9.73 12.69L7.52 10.36C7.23 10.08 7 9.55002 7 9.20002V7.87002C7 7.17002 7.52 6.65002 8.16 6.65002Z"
                stroke="#d6d6e6" strokeWidth="1" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
