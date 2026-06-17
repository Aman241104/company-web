'use client'
import { useRef, useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'

function buildAnimations(direction) {
  const from = direction === 'top'
    ? { filter: 'blur(10px)', opacity: 0, y: -20 }
    : { filter: 'blur(10px)', opacity: 0, y: 20 }
  const to = { filter: 'blur(0px)', opacity: 1, y: 0 }
  return { from, to }
}

export default function BlurText({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  onAnimationComplete,
  threshold = 0.1,
}) {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('')
  const controls = useAnimation()
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  const { from, to } = buildAnimations(direction)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])

  useEffect(() => {
    if (inView) controls.start('visible')
  }, [inView, controls])

  return (
    <p ref={ref} className={`flex flex-wrap ${className}`} style={{ gap: animateBy === 'words' ? '0.4ch' : 0 }}>
      {elements.map((el, i) => (
        <motion.span
          key={i}
          custom={i}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: from,
            visible: (i) => ({
              ...to,
              transition: { delay: (i * delay) / 1000, duration: 0.6, ease: 'easeOut' },
            }),
          }}
          onAnimationComplete={i === elements.length - 1 ? onAnimationComplete : undefined}
          style={{ display: 'inline-block', willChange: 'transform, filter, opacity' }}
        >
          {el}{animateBy === 'words' ? '' : ''}
        </motion.span>
      ))}
    </p>
  )
}
