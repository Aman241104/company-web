'use client'
import { useEffect, useRef } from 'react'

export default function ScrollProgress() {
  const ref = useRef(null)
  useEffect(() => {
    let raf = 0
    const on = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const h = document.documentElement.scrollHeight - innerHeight
        if (ref.current) ref.current.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`
      })
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return <div ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[55] h-[2px] origin-left bg-brand-gradient will-change-transform" style={{ transform: 'scaleX(0)' }} />
}
