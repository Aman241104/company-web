'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const MLogoSVG = () => (
  <svg width="48" height="42" viewBox="0 0 100 85" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="10,80 32,10 50,48 68,10 90,80 76,80 66,52 50,72 34,52 24,80" fill="white" />
    <polygon points="50,48 44,60 50,72 56,60" fill="#060606" />
  </svg>
)

export default function Preloader() {
  const topRef = useRef(null)
  const btmRef = useRef(null)
  const [count, setCount] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    let rafId
    const start = performance.now()
    const duration = 1600

    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setCount(Math.floor(eased * 100))

      if (p < 1) {
        rafId = requestAnimationFrame(tick)
      } else {
        setTimeout(() => {
          gsap.to(topRef.current, {
            yPercent: -100, duration: 0.9, ease: 'power3.inOut',
          })
          gsap.to(btmRef.current, {
            yPercent: 100, duration: 0.9, ease: 'power3.inOut',
            onComplete: () => {
              document.body.style.overflow = ''
              setVisible(false)
            },
          })
        }, 300)
      }
    }

    rafId = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(rafId)
      document.body.style.overflow = ''
    }
  }, [])

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-[10000] pointer-events-none select-none">
      {/* Top curtain */}
      <div
        ref={topRef}
        className="absolute inset-x-0 top-0 flex flex-col items-center justify-end"
        style={{ height: '50vh', background: '#060606', paddingBottom: '2rem' }}
      >
        <div className="flex flex-col items-center gap-4">
          <div style={{ filter: 'drop-shadow(0 0 24px rgba(37,99,235,0.4))' }}>
            <MLogoSVG />
          </div>
          <span
            className="font-display font-semibold text-white/20 text-xs tracking-[0.4em] uppercase"
          >
            Mehta Technologies
          </span>
        </div>
      </div>

      {/* Horizontal split line */}
      <div
        className="absolute inset-x-0 z-10 pointer-events-none"
        style={{ top: '50vh', height: 1, background: 'linear-gradient(to right, transparent, rgba(37,99,235,0.5), transparent)' }}
      />

      {/* Bottom curtain */}
      <div
        ref={btmRef}
        className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-start"
        style={{ height: '50vh', background: '#060606', paddingTop: '2rem' }}
      >
        <div className="flex items-end gap-1">
          <span
            className="font-display font-black text-white leading-none tabular-nums"
            style={{ fontSize: 'clamp(4rem, 8vw, 8rem)', letterSpacing: '-0.04em' }}
          >
            {count}
          </span>
          <span className="font-display font-black text-white/20 pb-2" style={{ fontSize: '2rem' }}>%</span>
        </div>
      </div>
    </div>
  )
}
