'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

// One observer for every [data-reveal] element on the page: adds
// data-shown when it scrolls into view. Initial/final states live in
// app/site.css so server HTML is already in the hidden state (no flash).
export default function Reveal() {
  const pathname = usePathname()
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]:not([data-shown])')
    if (!('IntersectionObserver' in window)) {
      els.forEach((e) => e.setAttribute('data-shown', ''))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          ;(target.get(e.target) || [e.target]).forEach((x) => x.setAttribute('data-shown', ''))
          io.unobserve(e.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px' }
    )
    // Line/float reveals sit inside overflow-hidden masks, which makes the
    // observer report them as clipped — watch their mask parent instead.
    const target = new Map()
    els.forEach((e) => {
      const t = e.dataset.reveal === 'line' || e.dataset.reveal === 'float' ? e.closest('.overflow-hidden, .scroll-float')?.parentElement || e.parentElement : e
      if (!target.has(t)) target.set(t, [])
      target.get(t).push(e)
      io.observe(t)
    })
    return () => io.disconnect()
  }, [pathname])
  return null
}
