'use client'
import { useMemo } from 'react'

export default function GradualBlur({
  position = 'bottom',
  strength = 2,
  height = '6rem',
  divCount = 6,
  zIndex = 10,
  className = '',
  style = {},
}) {
  const blurDivs = useMemo(() => {
    const divs = []
    const dirMap = { top: 'to top', bottom: 'to bottom', left: 'to left', right: 'to right' }
    const dir = dirMap[position] || 'to bottom'
    const increment = 100 / divCount

    for (let i = 1; i <= divCount; i++) {
      const blurValue = 0.0625 * (i / divCount * divCount + 1) * strength
      const p1 = Math.round((increment * i - increment) * 10) / 10
      const p2 = Math.round(increment * i * 10) / 10
      const p3 = Math.round((increment * i + increment) * 10) / 10

      let gradient = `transparent ${p1}%, black ${p2}%`
      if (p3 <= 100) gradient += `, black ${p3}%`

      divs.push(
        <div
          key={i}
          style={{
            position: 'absolute',
            inset: 0,
            maskImage: `linear-gradient(${dir}, ${gradient})`,
            WebkitMaskImage: `linear-gradient(${dir}, ${gradient})`,
            backdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
            WebkitBackdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
          }}
        />
      )
    }
    return divs
  }, [position, strength, divCount])

  const isVertical = position === 'top' || position === 'bottom'
  const containerStyle = {
    position: 'absolute',
    pointerEvents: 'none',
    zIndex,
    height: isVertical ? height : '100%',
    width: isVertical ? '100%' : height,
    [position]: 0,
    ...(isVertical ? { left: 0, right: 0 } : { top: 0, bottom: 0 }),
    ...style,
  }

  return (
    <div className={className} style={containerStyle}>
      {blurDivs}
    </div>
  )
}
