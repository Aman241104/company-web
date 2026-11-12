'use client'
import { useEffect, useState } from 'react'

// Segmented pill in the slot the benchmark uses for its region switcher:
// Light / Dark. Light is the default; the choice persists (see layout.tsx).
const opts = [
  { id: 'light', label: 'Light' },
  { id: 'dark', label: 'Dark' },
]

export default function ThemeSwitch({ className = '', large = false }) {
  const [theme, setTheme] = useState('light')
  useEffect(() => {
    const sync = () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light')
    const id = requestAnimationFrame(sync)
    window.addEventListener('themechange', sync)
    return () => {
      cancelAnimationFrame(id)
      window.removeEventListener('themechange', sync)
    }
  }, [])
  const pick = (t) => {
    document.documentElement.setAttribute('data-theme', t)
    try { localStorage.setItem('theme', t) } catch {}
    window.dispatchEvent(new Event('themechange'))
  }
  const idx = opts.findIndex((o) => o.id === theme)
  return (
    <div role="radiogroup" aria-label="Colour theme" className={`group/region relative isolate shrink-0 grid-cols-2 rounded-full border border-line bg-surface/80 p-1 ${className}`}>
      <span
        aria-hidden="true"
        className="absolute inset-y-1 left-1 -z-10 w-[calc((100%-0.5rem)/2)] rounded-full bg-brand-gradient shadow-[0_6px_16px_-8px_color-mix(in_oklab,var(--color-brand)_80%,transparent)] transition-transform duration-500 ease-out-expo"
        style={{ transform: `translateX(${idx * 100}%)` }}
      />
      {opts.map((o) => (
        <button
          key={o.id}
          type="button"
          role="radio"
          aria-checked={theme === o.id}
          aria-label={`${o.label} theme`}
          onClick={() => pick(o.id)}
          className={`relative grid place-items-center rounded-full font-mono font-medium tracking-[0.08em] transition-colors duration-300 ${large ? 'text-xs' : 'text-[0.6875rem]'} ${theme === o.id ? 'text-on-brand' : 'text-ink-2 hover:text-ink'}`}
        >
          {o.label.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
