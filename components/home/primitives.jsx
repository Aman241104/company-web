import Link from 'next/link'

// Server-safe primitives (no 'use client'), importable from server pages.
export const wrap = 'max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg'
export const btnPrimary = `${base} bg-accent text-white hover:bg-accent-dim px-5 py-3`
export const btnGhost = `${base} border border-ink/20 text-ink hover:border-ink/50 px-5 py-3`

// "● 01 / DEVELOPMENT" mono label used above every section heading.
export function Eyebrow({ children, className = '' }) {
  return (
    <p className={`inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-accent ${className}`}>
      <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-accent" />
      {children}
    </p>
  )
}

export function GhostLink({ href, children, className = '' }) {
  return (
    <Link href={href} className={`${btnGhost} ${className}`}>
      {children}
    </Link>
  )
}
