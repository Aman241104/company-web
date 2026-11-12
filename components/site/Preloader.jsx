'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Logo } from './Header'

// Benchmark preloader: logo + practice words rise in, a progress hairline
// fills, then a brand panel wipes up and away. Once per session, home only.
const words = ['Development', 'Digital Marketing', 'Designing']

export default function Preloader() {
  const path = usePathname()
  const [state, setState] = useState('idle') // idle | run | done
  useEffect(() => {
    let seen = false
    try { seen = sessionStorage.getItem('pl-seen') === '1' } catch {}
    const ready = () => document.documentElement.setAttribute('data-preloaded', '')
    if (path !== '/' || seen || matchMedia('(prefers-reduced-motion: reduce)').matches) return ready()
    try { sessionStorage.setItem('pl-seen', '1') } catch {}
    const a = requestAnimationFrame(() => setState('run'))
    const c = setTimeout(ready, 1750)
    const b = setTimeout(() => setState('done'), 2600)
    return () => { cancelAnimationFrame(a); clearTimeout(b); clearTimeout(c) }
  }, [path])
  if (state !== 'run') return null
  return (
    <div data-play="" className="mtx-pl-root pointer-events-none fixed inset-0 z-[200] overflow-hidden" aria-hidden="true" id="mtx-preloader">
      <div className="mtx-pl-stage pointer-events-auto absolute inset-0 flex flex-col items-center justify-center bg-bg px-6">
        <Logo size={44} />
        <p className="mt-8 flex flex-col items-center gap-y-1.5 text-center font-display text-[clamp(1.375rem,0.9rem+1.6vw,2.25rem)] leading-[1.15] font-medium text-ink lg:flex-row lg:gap-x-6">
          {words.map((w, i) => (
            <span key={w} className="contents">
              {i > 0 && <span className="mtx-pl-dot hidden size-1.5 shrink-0 rounded-full bg-brand lg:block" style={{ '--mtx-pl-i': i }} />}
              <span className="block overflow-hidden pb-[0.14em]">
                <span className="mtx-pl-word whitespace-nowrap" style={{ '--mtx-pl-i': i }}>{w}</span>
              </span>
            </span>
          ))}
        </p>
        <div className="absolute bottom-[max(12vh,4rem)] left-1/2 h-px w-[min(16rem,56vw)] -translate-x-1/2 overflow-hidden bg-line">
          <span className="mtx-pl-bar block h-full bg-brand-gradient" />
        </div>
      </div>
      <div className="mtx-pl-panel absolute inset-0 bg-brand-gradient" />
    </div>
  )
}
