'use client'
import { useState, useEffect, useRef, useCallback } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'

export default function DecryptedText({
  text = '',
  speed = 50,
  maxIterations = 10,
  sequential = true,
  revealDirection = 'start',
  className = '',
  encryptedClassName = '',
  parentClassName = '',
  animateOn = 'hover',
}) {
  const [displayText, setDisplayText] = useState(text)
  const [isAnimating, setIsAnimating] = useState(false)
  const [revealedCount, setRevealedCount] = useState(0)
  const iterationRef = useRef(0)
  const intervalRef = useRef(null)

  const getRevealIndex = useCallback((step) => {
    if (revealDirection === 'end') return text.length - 1 - step
    if (revealDirection === 'center') {
      const mid = Math.floor(text.length / 2)
      return step % 2 === 0 ? mid + Math.floor(step / 2) : mid - Math.ceil(step / 2)
    }
    return step
  }, [text, revealDirection])

  const animate = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    iterationRef.current = 0
    let revealed = 0

    intervalRef.current = setInterval(() => {
      iterationRef.current++
      if (sequential) {
        const revealIdx = getRevealIndex(revealed)
        setDisplayText(
          text.split('').map((char, i) => {
            if (char === ' ') return ' '
            if (i === revealIdx || (revealDirection === 'start' && i < revealed) || (revealDirection === 'end' && i > text.length - 1 - revealed)) {
              return char
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          }).join('')
        )
        if (iterationRef.current % 2 === 0) {
          revealed++
          setRevealedCount(revealed)
        }
        if (revealed >= text.length) {
          clearInterval(intervalRef.current)
          setDisplayText(text)
          setIsAnimating(false)
        }
      } else {
        setDisplayText(
          text.split('').map((char) => {
            if (char === ' ') return ' '
            if (Math.random() < iterationRef.current / maxIterations) return char
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          }).join('')
        )
        if (iterationRef.current >= maxIterations) {
          clearInterval(intervalRef.current)
          setDisplayText(text)
          setIsAnimating(false)
        }
      }
    }, speed)
  }, [isAnimating, text, sequential, getRevealIndex, revealDirection, maxIterations, speed])

  useEffect(() => {
    if (animateOn === 'view') animate()
    return () => clearInterval(intervalRef.current)
  }, [])

  const handlers = animateOn === 'hover'
    ? { onMouseEnter: animate }
    : {}

  return (
    <span className={parentClassName} {...handlers}>
      {displayText.split('').map((char, i) => {
        const isRevealed = sequential
          ? (revealDirection === 'start' ? i < revealedCount : i > text.length - 1 - revealedCount)
          : char === text[i]
        return (
          <span key={i} className={isRevealed || !isAnimating ? className : encryptedClassName}>
            {char}
          </span>
        )
      })}
    </span>
  )
}
