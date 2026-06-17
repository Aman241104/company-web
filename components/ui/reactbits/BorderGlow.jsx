'use client'
import { useRef, useCallback, useEffect } from 'react'

export default function BorderGlow({
  children,
  glowColor = 'rgba(37,99,235,0.6)',
  borderColor = 'rgba(255,255,255,0.08)',
  borderRadius = '1rem',
  backgroundColor = 'rgba(255,255,255,0.02)',
  glowIntensity = 0.8,
  animated = false,
  className = '',
  style = {},
}) {
  const containerRef = useRef(null)

  const handlePointerMove = useCallback(e => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const px = x / rect.width
    const py = y / rect.height
    const angle = Math.atan2(py - 0.5, px - 0.5) * (180 / Math.PI) + 180
    const edge = Math.min(Math.min(px, 1 - px), Math.min(py, 1 - py))
    const proximity = 1 - Math.min(edge * 4, 1)
    el.style.setProperty('--cursor-angle', `${angle}deg`)
    el.style.setProperty('--edge-proximity', String(proximity * glowIntensity))
  }, [glowIntensity])

  const handlePointerLeave = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    el.style.setProperty('--edge-proximity', '0')
  }, [])

  useEffect(() => {
    if (!animated) return
    const el = containerRef.current
    if (!el) return
    let start = null
    let raf
    const animate = (ts) => {
      if (!start) start = ts
      const t = (ts - start) / 1000
      el.style.setProperty('--cursor-angle', `${(t * 60) % 360}deg`)
      el.style.setProperty('--edge-proximity', String(glowIntensity))
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [animated, glowIntensity])

  return (
    <div
      ref={containerRef}
      className={className}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        position: 'relative',
        borderRadius,
        background: backgroundColor,
        '--glow-color': glowColor,
        '--border-color': borderColor,
        '--edge-proximity': '0',
        '--cursor-angle': '0deg',
        ...style,
      }}
    >
      {/* Glowing border overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius,
          pointerEvents: 'none',
          border: `1px solid ${borderColor}`,
          boxShadow: `inset 0 0 0 1px color-mix(in srgb, ${glowColor} calc(var(--edge-proximity) * 100%), transparent)`,
          background: `conic-gradient(from var(--cursor-angle) at 50% 50%, color-mix(in srgb, ${glowColor} calc(var(--edge-proximity) * 80%), transparent) 0deg, transparent 60deg, transparent 300deg, color-mix(in srgb, ${glowColor} calc(var(--edge-proximity) * 40%), transparent) 360deg)`,
          opacity: 'var(--edge-proximity)',
          transition: 'opacity 0.2s ease',
          zIndex: 0,
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  )
}
