import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        serif: ["'Instrument Serif'", 'serif'],
        sans: ["'Inter'", 'sans-serif'],
        rubik: ["'Rubik'", 'sans-serif'],
      },
      colors: {
        forge: {
          black: '#0a0a0a',
          dark: '#101010',
          muted: '#888888',
          stroke: '#1f1f1f',
          text: '#f5f5f5',
          accent: '#89AACC',
          'accent-2': '#4E85BF',
          targo: '#EE3F2C',
        },
      },
      keyframes: {
        'letter-anim': {
          '50%': { textShadow: '0 0 3px #fff8', color: '#fff' },
        },
        'flicker': {
          '50%': { opacity: '0.3' },
        },
        'appear-anim': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'load89234': {
          '100%': { backgroundPosition: '-100% 0' },
        },
        'rotate': {
          'to': { transform: 'rotate(360deg)' },
        },
        'cube-animate': {
          '0%': { transform: 'rotateX(-30deg) rotateY(0)' },
          '100%': { transform: 'rotateX(-30deg) rotateY(360deg)' },
        },
        'rotate-glider': {
          '100%': { transform: 'translate(-50%, -50%) rotate(450deg)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'glass-shimmer': {
          '0%, 100%': { 
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.1) 30%, transparent 50%, rgba(0, 0, 0, 0.05) 100%)',
          },
          '50%': { 
            background: 'linear-gradient(45deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.2) 30%, transparent 50%, rgba(0, 0, 0, 0.1) 100%)',
          },
        },
        'water-wave': {
          '0%': { transform: 'translateX(0) translateY(0)' },
          '25%': { transform: 'translateX(-50px) translateY(-20px)' },
          '50%': { transform: 'translateX(-100px) translateY(0)' },
          '75%': { transform: 'translateX(-50px) translateY(20px)' },
          '100%': { transform: 'translateX(0) translateY(0)' },
        },
        'light-reflect': {
          '0%, 100%': { 
            background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3) 0%, transparent 70%)',
          },
          '50%': { 
            background: 'radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.3) 0%, transparent 70%)',
          },
        },
      },
      animation: {
        'letter-anim': 'letter-anim 2s ease-in-out infinite',
        'flicker': 'flicker 2s linear infinite',
        'appear-anim': 'appear-anim 1s ease-in-out forwards',
        'load89234': 'load89234 2s infinite',
        'cube-rotate': 'cube-animate 4s linear infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'glass-shimmer': 'glass-shimmer 3s ease-in-out infinite',
        'water-wave': 'water-wave 8s linear infinite',
        'light-reflect': 'light-reflect 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
