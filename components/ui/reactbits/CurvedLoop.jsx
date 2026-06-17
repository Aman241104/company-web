'use client'
import { useRef, useEffect, useState, useMemo, useId } from 'react'

export default function CurvedLoop({
  marqueeText = '',
  speed = 2,
  className = '',
  curveAmount = 300,
  direction = 'left',
  interactive = true,
  style = {},
}) {
  const text = useMemo(() => {
    const hasTrailing = /\s|\u00A0$/.test(marqueeText)
    return (hasTrailing ? marqueeText.replace(/\s+$/, '') : marqueeText) + '\u00A0'
  }, [marqueeText])

  const measureRef = useRef(null)
  const textPathRef = useRef(null)
  const [spacing, setSpacing] = useState(0)
  const [offset, setOffset] = useState(0)
  const uid = useId()
  const pathId = `curve-${uid}`
  const pathD = `M-100,40 Q500,${40 + curveAmount} 1540,40`
  const dragRef = useRef(false)
  const lastXRef = useRef(0)
  const dirRef = useRef(direction)
  const velRef = useRef(0)

  const totalText = spacing ? Array(Math.ceil(1800 / spacing) + 2).fill(text).join('') : text
  const ready = spacing > 0

  useEffect(() => {
    if (measureRef.current) setSpacing(measureRef.current.getComputedTextLength())
  }, [text])

  useEffect(() => {
    if (!spacing || !textPathRef.current) return
    const initial = -spacing
    textPathRef.current.setAttribute('startOffset', initial + 'px')
    setOffset(initial)
  }, [spacing])

  useEffect(() => {
    if (!spacing || !ready) return
    let frame
    const step = () => {
      if (!dragRef.current && textPathRef.current) {
        const delta = dirRef.current === 'right' ? speed : -speed
        const cur = parseFloat(textPathRef.current.getAttribute('startOffset') || '0')
        let next = cur + delta
        if (next <= -spacing) next += spacing
        if (next > 0) next -= spacing
        textPathRef.current.setAttribute('startOffset', next + 'px')
        setOffset(next)
      }
      frame = requestAnimationFrame(step)
    }
    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [spacing, speed, ready])

  const onPointerDown = e => {
    if (!interactive) return
    dragRef.current = true
    lastXRef.current = e.clientX
    velRef.current = 0
    e.target.setPointerCapture(e.pointerId)
  }
  const onPointerMove = e => {
    if (!interactive || !dragRef.current || !textPathRef.current) return
    const dx = e.clientX - lastXRef.current
    lastXRef.current = e.clientX
    velRef.current = dx
    const cur = parseFloat(textPathRef.current.getAttribute('startOffset') || '0')
    let next = cur + dx
    if (next <= -spacing) next += spacing
    if (next > 0) next -= spacing
    textPathRef.current.setAttribute('startOffset', next + 'px')
    setOffset(next)
  }
  const endDrag = () => {
    if (!interactive) return
    dragRef.current = false
    dirRef.current = velRef.current > 0 ? 'right' : 'left'
  }

  return (
    <div
      style={{ width: '100%', overflow: 'hidden', userSelect: 'none', visibility: ready ? 'visible' : 'hidden', cursor: interactive ? (dragRef.current ? 'grabbing' : 'grab') : 'auto', ...style }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
    >
      <svg style={{ width: '100%', height: 100, display: 'block' }} viewBox="0 0 1440 120">
        <text ref={measureRef} xmlSpace="preserve" style={{ visibility: 'hidden', opacity: 0, pointerEvents: 'none' }}>
          {text}
        </text>
        <defs>
          <path id={pathId} d={pathD} fill="none" stroke="transparent" />
        </defs>
        {ready && (
          <text fontWeight="bold" xmlSpace="preserve" className={className}>
            <textPath ref={textPathRef} href={`#${pathId}`} startOffset={offset + 'px'} xmlSpace="preserve">
              {totalText}
            </textPath>
          </text>
        )}
      </svg>
    </div>
  )
}
