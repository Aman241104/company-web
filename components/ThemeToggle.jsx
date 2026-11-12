'use client'
import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

// Light by default; dark is opt-in and remembered per visitor.
// app/layout.tsx applies the saved choice before paint (no flash).
export default function ThemeToggle({ className = '' }) {
  const [dark, setDark] = useState(false)
  // Sync with the theme the no-flash script already applied before hydration.
  useEffect(() => {
    const sync = () => setDark(document.documentElement.dataset.theme === 'dark')
    const id = requestAnimationFrame(sync)
    window.addEventListener('themechange', sync)
    return () => {
      cancelAnimationFrame(id)
      window.removeEventListener('themechange', sync)
    }
  }, [])

  const toggle = () => {
    const next = !dark
    setDark(next)
    document.documentElement.dataset.theme = next ? 'dark' : 'light'
    try { localStorage.setItem('theme', next ? 'dark' : 'light') } catch {}
    window.dispatchEvent(new Event('themechange'))
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={dark}
      className={`inline-flex items-center justify-center w-10 h-10 rounded-full border border-ink/15 text-ink hover:border-ink/40 transition-colors ${className}`}
    >
      {dark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}
