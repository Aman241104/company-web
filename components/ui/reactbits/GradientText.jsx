'use client'
import { useRef } from 'react'
import { motion, useAnimationFrame } from 'framer-motion'

export default function GradientText({
  children,
  className = '',
  colors = ['#2563EB', '#4f46e5', '#818cf8', '#60a5fa', '#2563EB'],
  animationSpeed = 8,
  showBorder = false,
}) {
  const textRef = useRef(null)
  const progressRef = useRef(0)

  useAnimationFrame((_, delta) => {
    progressRef.current = (progressRef.current + (delta / 1000) * animationSpeed) % 100
    if (!textRef.current) return
    const pos = progressRef.current
    const gradient = `linear-gradient(135deg, ${colors.map((c, i) => `${c} ${(i / (colors.length - 1)) * 100 + pos}%`).join(', ')})`
    textRef.current.style.backgroundImage = gradient
  })

  return (
    <span className={`relative inline-flex ${showBorder ? 'p-[1px] rounded-xl' : ''} ${className}`}>
      {showBorder && (
        <motion.span
          className="absolute inset-0 rounded-xl"
          style={{ background: `linear-gradient(135deg, ${colors.join(', ')})`, opacity: 0.5 }}
        />
      )}
      <span
        ref={textRef}
        className="bg-clip-text text-transparent"
        style={{
          backgroundImage: `linear-gradient(135deg, ${colors.join(', ')})`,
          backgroundSize: '200% 200%',
        }}
      >
        {children}
      </span>
    </span>
  )
}
