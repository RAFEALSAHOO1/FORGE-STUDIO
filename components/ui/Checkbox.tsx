'use client'

import { useId } from 'react'

interface CheckboxProps {
  label?: string
  checked?: boolean
  onChange?: (checked: boolean) => void
  className?: string
}

export default function Checkbox({ label, checked, onChange, className = '' }: CheckboxProps) {
  const id = useId()

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="checkbox-wrapper">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
        />
        <label htmlFor={id}>
          <div className="tick_mark" />
        </label>
      </div>
      {label && (
        <span className="text-white/70 text-sm select-none cursor-pointer" onClick={() => onChange?.(!checked)}>
          {label}
        </span>
      )}
    </div>
  )
}
