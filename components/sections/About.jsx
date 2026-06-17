'use client'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

function useCountUp(target, duration = 1800, inView = false) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    let start = null
    const step = (ts) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setVal(Math.floor(ease * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, target, duration])
  return val
}

const stats = [
  { value: 150, suffix: '+', label: 'Projects Delivered', desc: '12+ industries' },
  { value: 80, suffix: '+', label: 'Happy Clients', desc: 'India · US · UK · UAE' },
  { value: 5, suffix: '+', label: 'Years Shipping', desc: 'Founded Mumbai, 2019' },
  { value: 99, suffix: '%', label: 'Client Retention', desc: 'Clients who return' },
]

function StatItem({ stat, index, last }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  const count = useCountUp(stat.value, 1600, inView)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      style={{
        flex: 1,
        padding: '44px 32px',
        borderRight: last ? 'none' : '1px solid rgba(255,255,255,0.07)',
        textAlign: 'center',
      }}
    >
      <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(38px, 4vw, 54px)', letterSpacing: '-0.04em', lineHeight: 1, color: '#fff', marginBottom: 8 }}>
        {count}<span style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', backgroundImage: 'linear-gradient(135deg, #5B8AF7, #8B5CF6)' }}>{stat.suffix}</span>
      </div>
      <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 600, fontSize: 14, color: 'rgba(255,255,255,0.75)', marginBottom: 4 }}>{stat.label}</div>
      <div style={{ fontFamily: 'var(--font-outfit)', fontSize: 12.5, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.01em' }}>{stat.desc}</div>
    </motion.div>
  )
}

export default function About() {
  return (
    <section id="about" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 80px' }}>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="grid grid-cols-2 md:grid-cols-4" style={{ display: 'flex', flexWrap: 'wrap' }}>
          {stats.map((s, i) => <StatItem key={s.label} stat={s} index={i} last={i === stats.length - 1} />)}
        </div>
      </div>
    </section>
  )
}
