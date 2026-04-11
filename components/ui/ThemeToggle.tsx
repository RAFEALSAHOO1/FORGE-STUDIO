'use client'

import { useTheme } from '@/lib/theme-context'

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  return (
    <label className="inline-flex items-center relative cursor-pointer" title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
      <input
        className="peer hidden"
        id="theme-toggle"
        type="checkbox"
        checked={!isDark}
        onChange={() => setTheme(isDark ? 'light' : 'dark')}
      />
      <div className="relative w-[80px] h-[36px] bg-white peer-checked:bg-zinc-500 rounded-full
        after:absolute after:content-[''] after:w-[28px] after:h-[28px]
        after:bg-gradient-to-r after:from-orange-500 after:to-yellow-400
        peer-checked:after:from-zinc-900 peer-checked:after:to-zinc-900
        after:rounded-full after:top-[4px] after:left-[4px]
        active:after:w-[36px]
        peer-checked:after:left-[76px] peer-checked:after:translate-x-[-100%]
        shadow-sm duration-300 after:duration-300 after:shadow-md"
      />
      {/* Sun icon */}
      <svg height="0" width="72" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
        className="fill-white peer-checked:opacity-60 absolute w-4 h-4 left-[10px]">
        <path d="M12,17c-2.76,0-5-2.24-5-5s2.24-5,5-5,5,2.24,5,5-2.24,5-5,5ZM13,0h-2V5h2V0Zm0,19h-2v5h2v-5ZM5,11H0v2H5v-2Zm19,0h-5v2h5v-2Zm-2.81-6.78l-1.41-1.41-3.54,3.54,1.41,1.41,3.54-3.54ZM7.76,17.66l-1.41-1.41-3.54,3.54,1.41,1.41,3.54-3.54Zm0-11.31l-3.54-3.54-1.41,1.41,3.54,3.54,1.41-1.41Zm13.44,13.44l-3.54-3.54-1.41,1.41,3.54,3.54,1.41-1.41Z"/>
      </svg>
      {/* Moon icon */}
      <svg height="512" width="512" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
        className="fill-black opacity-60 peer-checked:opacity-70 peer-checked:fill-white absolute w-4 h-4 right-[10px]">
        <path d="M12.009,24A12.067,12.067,0,0,1,.075,10.725,12.121,12.121,0,0,1,10.1.152a13,13,0,0,1,5.03.206,2.5,2.5,0,0,1,1.8,1.8,2.47,2.47,0,0,1-.7,2.425c-4.559,4.168-4.165,10.645.807,14.412h0a2.5,2.5,0,0,1-.7,4.319A13.875,13.875,0,0,1,12.009,24Z"/>
      </svg>
    </label>
  )
}
