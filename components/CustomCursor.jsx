'use client'
import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const labelRef = useRef(null)
  const [isTouch, setIsTouch] = useState(true)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    setIsTouch(!hasFinePointer)

    // Defensive fallback for hybrid touchscreen-laptop devices that misreport
    // pointer capability: flip to real-cursor mode on the first genuine mouse move.
    const onFirstPointerMove = (e) => {
      if (e.pointerType === 'mouse') setIsTouch(false)
    }
    window.addEventListener('pointermove', onFirstPointerMove, { once: true })
    return () => window.removeEventListener('pointermove', onFirstPointerMove)
  }, [])

  useEffect(() => {
    if (isTouch || reducedMotion) return
    const dot = dotRef.current
    const ring = ringRef.current
    const label = labelRef.current
    if (!dot || !ring || !label) return

    let mouseX = 0, mouseY = 0
    let ringX = 0, ringY = 0
    let animId

    let hasMovedOnce = false
    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`
      label.style.transform = `translate(${mouseX}px, ${mouseY}px)`
      if (!hasMovedOnce) {
        hasMovedOnce = true
        dot.style.opacity = '1'
        ring.style.opacity = '1'
      }
    }

    const lerp = (a, b, t) => a + (b - a) * t
    const animate = () => {
      ringX = lerp(ringX, mouseX, 0.1)
      ringY = lerp(ringY, mouseY, 0.1)
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`
      animId = requestAnimationFrame(animate)
    }
    animate()

    const onEnterView = () => {
      ring.style.width = '80px'
      ring.style.height = '80px'
      ring.style.background = 'rgba(37,99,235,0.15)'
      ring.style.borderColor = 'rgba(37,99,235,0.6)'
      ring.style.backdropFilter = 'blur(4px)'
      dot.style.opacity = '0'
      label.style.opacity = '1'
    }
    const onLeaveView = () => {
      ring.style.width = '28px'
      ring.style.height = '28px'
      ring.style.background = 'transparent'
      ring.style.borderColor = 'rgba(255,255,255,0.28)'
      ring.style.backdropFilter = 'none'
      dot.style.opacity = '1'
      label.style.opacity = '0'
    }

    const onEnterLink = () => {
      ring.style.width = '48px'
      ring.style.height = '48px'
      ring.style.background = 'rgba(37,99,235,0.1)'
      ring.style.borderColor = 'rgba(37,99,235,0.7)'
      dot.style.opacity = '0'
      label.style.opacity = '0'
    }
    const onLeaveLink = () => {
      ring.style.width = '28px'
      ring.style.height = '28px'
      ring.style.background = 'transparent'
      ring.style.borderColor = 'rgba(255,255,255,0.28)'
      dot.style.opacity = '1'
      label.style.opacity = '0'
    }

    document.addEventListener('mousemove', onMove)

    const bindAll = () => {
      document.querySelectorAll('[data-cursor="view"]').forEach((el) => {
        el.addEventListener('mouseenter', onEnterView)
        el.addEventListener('mouseleave', onLeaveView)
      })
      document.querySelectorAll('a, button, [data-cursor="link"]').forEach((el) => {
        el.addEventListener('mouseenter', onEnterLink)
        el.addEventListener('mouseleave', onLeaveLink)
      })
    }
    bindAll()

    // Debounced: DOM churn from framer-motion/GSAP fires many mutations per frame during
    // animations — rebinding on every single one is wasteful, so batch via rAF instead.
    let rebindScheduled = false
    const scheduleRebind = () => {
      if (rebindScheduled) return
      rebindScheduled = true
      requestAnimationFrame(() => {
        rebindScheduled = false
        bindAll()
      })
    }
    const observer = new MutationObserver(scheduleRebind)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      cancelAnimationFrame(animId)
      document.removeEventListener('mousemove', onMove)
      observer.disconnect()
    }
  }, [isTouch, reducedMotion])

  if (isTouch || reducedMotion) return null

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none will-change-transform"
        style={{
          width: 6, height: 6, borderRadius: '50%',
          background: '#2563EB',
          marginLeft: -3, marginTop: -3,
          opacity: 0,
          transition: 'opacity 0.3s',
        }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none will-change-transform flex items-center justify-center"
        style={{
          width: 28, height: 28, borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.28)',
          background: 'transparent',
          marginLeft: -14, marginTop: -14,
          opacity: 0,
          transition: 'width 0.35s cubic-bezier(0.22,1,0.36,1), height 0.35s cubic-bezier(0.22,1,0.36,1), background 0.3s, border-color 0.3s, opacity 0.3s',
        }}
      />
      <div
        ref={labelRef}
        className="fixed top-0 left-0 z-[9997] pointer-events-none will-change-transform flex items-center justify-center"
        style={{
          opacity: 0,
          marginLeft: -18, marginTop: -18,
          transition: 'opacity 0.25s ease',
        }}
      >
        <span style={{ fontSize: 9, letterSpacing: '0.12em', color: 'white', fontWeight: 600, textTransform: 'uppercase' }}>
          VIEW
        </span>
      </div>
    </>
  )
}
