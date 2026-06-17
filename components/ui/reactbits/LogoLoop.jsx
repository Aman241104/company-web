'use client'
import { useCallback, useEffect, useMemo, useRef, useState, memo } from 'react'

const SMOOTH_TAU = 0.25

const toCssLen = v => typeof v === 'number' ? `${v}px` : (v ?? undefined)

export const LogoLoop = memo(({
  logos = [], speed = 80, direction = 'left',
  width = '100%', logoHeight = 32, gap = 48,
  pauseOnHover = true, scaleOnHover = false, fadeOut = true,
  renderItem, ariaLabel = 'Logo loop', className = '', style = {},
}) => {
  const containerRef = useRef(null)
  const trackRef = useRef(null)
  const seqRef = useRef(null)
  const rafRef = useRef(null)
  const lastTsRef = useRef(null)
  const offsetRef = useRef(0)
  const velocityRef = useRef(0)
  const [seqWidth, setSeqWidth] = useState(0)
  const [copyCount, setCopyCount] = useState(2)
  const [isHovered, setIsHovered] = useState(false)

  const targetVelocity = useMemo(() => {
    const dir = direction === 'left' ? 1 : -1
    return Math.abs(speed) * dir
  }, [speed, direction])

  const effectiveHoverSpeed = pauseOnHover === true ? 0 : undefined

  const updateDimensions = useCallback(() => {
    const containerWidth = containerRef.current?.clientWidth ?? 0
    const seqRect = seqRef.current?.getBoundingClientRect?.()
    const sw = seqRect?.width ?? 0
    if (sw > 0) {
      setSeqWidth(Math.ceil(sw))
      const copies = Math.ceil(containerWidth / sw) + 2
      setCopyCount(Math.max(2, copies))
    }
  }, [])

  useEffect(() => {
    const obs = new ResizeObserver(updateDimensions)
    if (containerRef.current) obs.observe(containerRef.current)
    updateDimensions()
    return () => obs.disconnect()
  }, [logos, gap, logoHeight, updateDimensions])

  useEffect(() => {
    if (!seqWidth || !trackRef.current) return
    const track = trackRef.current
    const hovered = isHovered && effectiveHoverSpeed !== undefined

    const animate = ts => {
      if (lastTsRef.current === null) lastTsRef.current = ts
      const dt = Math.max(0, ts - lastTsRef.current) / 1000
      lastTsRef.current = ts
      const target = hovered ? (effectiveHoverSpeed ?? targetVelocity) : targetVelocity
      const ease = 1 - Math.exp(-dt / SMOOTH_TAU)
      velocityRef.current += (target - velocityRef.current) * ease
      if (seqWidth > 0) {
        let next = offsetRef.current + velocityRef.current * dt
        next = ((next % seqWidth) + seqWidth) % seqWidth
        offsetRef.current = next
        track.style.transform = `translate3d(${-next}px,0,0)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); lastTsRef.current = null }
  }, [seqWidth, targetVelocity, isHovered, effectiveHoverSpeed])

  const renderLogo = useCallback((item, key) => {
    if (renderItem) return <li key={key} style={{ display:'flex', alignItems:'center', paddingLeft: gap/2, paddingRight: gap/2, flexShrink:0 }}>{renderItem(item, key)}</li>
    if ('node' in item) return <li key={key} style={{ display:'flex', alignItems:'center', height: logoHeight, paddingLeft: gap/2, paddingRight: gap/2, flexShrink:0 }}>{item.node}</li>
    return (
      <li key={key} style={{ display:'flex', alignItems:'center', paddingLeft: gap/2, paddingRight: gap/2, flexShrink:0 }}>
        <img src={item.src} alt={item.alt??''} loading="lazy" draggable={false}
          style={{ height: logoHeight, width:'auto', maxWidth:'none', display:'block', opacity:.6, filter:'grayscale(1) brightness(2)' }} />
      </li>
    )
  }, [renderItem, gap, logoHeight])

  const logoLists = useMemo(() => Array.from({ length: copyCount }, (_, ci) => (
    <ul key={`copy-${ci}`} ref={ci===0?seqRef:undefined} role="list" aria-hidden={ci>0}
      style={{ display:'flex', alignItems:'center', listStyle:'none', padding:0, margin:0, flexShrink:0 }}>
      {logos.map((item, ii) => renderLogo(item, `${ci}-${ii}`))}
    </ul>
  )), [copyCount, logos, renderLogo])

  const fadeStyle = fadeOut ? {
    WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
    maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
  } : {}

  return (
    <div ref={containerRef} className={className} role="region" aria-label={ariaLabel}
      style={{ overflow:'hidden', width: toCssLen(width), ...fadeStyle, ...style }}>
      <div ref={trackRef} style={{ display:'flex', alignItems:'center', willChange:'transform' }}
        onMouseEnter={() => effectiveHoverSpeed !== undefined && setIsHovered(true)}
        onMouseLeave={() => effectiveHoverSpeed !== undefined && setIsHovered(false)}>
        {logoLists}
      </div>
    </div>
  )
})

LogoLoop.displayName = 'LogoLoop'
export default LogoLoop
