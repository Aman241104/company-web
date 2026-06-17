'use client'
import { useState, useEffect, forwardRef, useCallback, useImperativeHandle } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const RotatingText = forwardRef(function RotatingText(
  {
    texts,
    transition = { type: 'spring', damping: 25, stiffness: 300 },
    initial = { y: '100%', opacity: 0 },
    animate = { y: 0, opacity: 1 },
    exit = { y: '-120%', opacity: 0 },
    animatePresenceMode = 'wait',
    animatePresenceInitial = false,
    rotationInterval = 2000,
    staggerDuration = 0,
    staggerFrom = 'first',
    loop = true,
    auto = true,
    splitBy = 'characters',
    onNext,
    mainClassName = '',
    splitLevelClassName = '',
    elementLevelClassName = '',
  },
  ref
) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = useCallback(() => {
    setCurrentIndex((i) => {
      if (!loop && i === texts.length - 1) return i
      return (i + 1) % texts.length
    })
    onNext?.(currentIndex)
  }, [loop, texts.length, onNext, currentIndex])

  const previous = useCallback(() => {
    setCurrentIndex((i) => {
      if (!loop && i === 0) return i
      return (i - 1 + texts.length) % texts.length
    })
  }, [loop, texts.length])

  const jumpTo = useCallback((index) => {
    setCurrentIndex(Math.max(0, Math.min(index, texts.length - 1)))
  }, [texts.length])

  const reset = useCallback(() => setCurrentIndex(0), [])

  useImperativeHandle(ref, () => ({ next, previous, jumpTo, reset }))

  useEffect(() => {
    if (!auto) return
    const id = setInterval(next, rotationInterval)
    return () => clearInterval(id)
  }, [auto, next, rotationInterval])

  const elements = splitBy === 'characters'
    ? texts[currentIndex].split('')
    : splitBy === 'words'
      ? texts[currentIndex].split(' ')
      : splitBy === 'lines'
        ? texts[currentIndex].split('\n')
        : [texts[currentIndex]]

  const getStaggerDelay = (i, total) => {
    if (staggerDuration === 0) return 0
    if (staggerFrom === 'first') return i * staggerDuration
    if (staggerFrom === 'last') return (total - 1 - i) * staggerDuration
    if (staggerFrom === 'center') return Math.abs(Math.floor(total / 2) - i) * staggerDuration
    return i * staggerDuration
  }

  return (
    <AnimatePresence mode={animatePresenceMode} initial={animatePresenceInitial}>
      <motion.span
        key={currentIndex}
        className={`inline-flex ${mainClassName}`}
        style={{ overflow: 'hidden' }}
      >
        {elements.map((el, i) => (
          <motion.span
            key={i}
            className={splitLevelClassName}
            style={{ display: 'inline-block', overflow: 'hidden' }}
          >
            <motion.span
              className={`inline-block ${elementLevelClassName}`}
              initial={initial}
              animate={{
                ...animate,
                transition: { ...transition, delay: getStaggerDelay(i, elements.length) },
              }}
              exit={exit}
            >
              {el === ' ' ? '\u00A0' : el}
            </motion.span>
          </motion.span>
        ))}
      </motion.span>
    </AnimatePresence>
  )
})

export default RotatingText
