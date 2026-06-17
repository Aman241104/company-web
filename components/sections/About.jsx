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
  { value: 150, suffix: '+', label: 'Projects Delivered', desc: 'Across 12+ industries' },
  { value: 80, suffix: '+', label: 'Happy Clients', desc: 'India, US, UK & UAE' },
  { value: 5, suffix: '+', label: 'Years in Business', desc: 'Founded in Mumbai, 2019' },
  { value: 99, suffix: '%', label: 'Client Retention', desc: 'Clients who come back' },
]

function StatCard({ stat, index }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  const count = useCountUp(stat.value, 1600, inView)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: index * 0.1 }} style={{ textAlign: 'center', padding: '36px 24px', background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', bottom: -40, left: '50%', transform: 'translateX(-50%)', width: 120, height: 80, borderRadius: '50%', background: 'radial-gradient(circle, rgba(91,138,247,0.12), transparent 70%)', filter: 'blur(20px)' }} />
      <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(42px, 5vw, 56px)', letterSpacing: '-0.03em', lineHeight: 1, background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.6) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: 8 }}>
        {count}{stat.suffix}
      </div>
      <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 600, fontSize: 15, color: 'rgba(255,255,255,0.8)', marginBottom: 4 }}>{stat.label}</div>
      <div style={{ fontFamily: 'var(--font-outfit)', fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>{stat.desc}</div>
    </motion.div>
  )
}

export default function About() {
  return (
    <section id="about" style={{ padding: '80px 24px', maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
          <div style={{ width: 48, height: 1, background: 'rgba(255,255,255,0.08)' }} />
          <span style={{ fontFamily: 'var(--font-outfit)', fontSize: 12, color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Track record</span>
          <div style={{ width: 48, height: 1, background: 'rgba(255,255,255,0.08)' }} />
        </div>
        <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(26px, 4vw, 40px)', letterSpacing: '-0.03em', color: '#fff', margin: '0 0 12px', lineHeight: 1.1 }}>
          A focused team with a<br />
          <span style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', backgroundImage: 'linear-gradient(135deg, #5B8AF7, #8B5CF6)' }}>proven track record.</span>
        </h2>
        <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 15, color: 'rgba(255,255,255,0.38)', maxWidth: 480, margin: '0 auto' }}>
          Since 2019, we've shipped products across healthcare, fintech, e-commerce, logistics, and education. Every number below is earned.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: 12 }}>
        {stats.map((s, i) => <StatCard key={s.label} stat={s} index={i} />)}
      </div>
    </section>
  )
}
