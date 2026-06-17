'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import DashboardMock from '@/components/ui/DashboardMock'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function Hero() {
  const [stars, setStars] = useState([])

  useEffect(() => {
    setStars(Array.from({ length: 70 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.6 + 0.4,
      opacity: Math.random() * 0.5 + 0.08,
      dur: 2 + Math.random() * 3,
    })))
  }, [])

  return (
    <section id="hero" style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: 100, paddingBottom: 80, overflow: 'hidden' }}>

      {/* Stars */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {stars.map(s => (
          <div key={s.id} style={{ position: 'absolute', left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size, borderRadius: '50%', background: '#fff', opacity: s.opacity, animation: `opacity-glow ${s.dur}s ease-in-out infinite alternate` }} />
        ))}
      </div>

      {/* Dot grid */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.18, backgroundImage: 'radial-gradient(rgba(91,138,247,0.35) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      {/* Central glow */}
      <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)', width: 700, height: 420, borderRadius: '50%', pointerEvents: 'none', background: 'radial-gradient(ellipse, rgba(91,138,247,0.16) 0%, rgba(139,92,246,0.10) 45%, transparent 70%)', filter: 'blur(40px)', animation: 'opacity-glow 3.5s ease-in-out infinite alternate' }} />

      {/* Bottom fade */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 220, pointerEvents: 'none', background: 'linear-gradient(to top, #060614, transparent)' }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: 720, margin: '0 auto', padding: '0 24px' }}>

        {/* Badge */}
        <motion.div {...fadeUp(0)}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 99, marginBottom: 32, border: '1px solid rgba(91,138,247,0.28)', background: 'rgba(91,138,247,0.08)', fontFamily: 'var(--font-outfit)', fontSize: 12.5, color: 'rgba(91,138,247,0.9)', letterSpacing: '0.03em' }}>
            <Sparkles size={12} />
            150+ products shipped · 80+ happy clients
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1 {...fadeUp(0.1)} style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(42px, 8vw, 80px)', lineHeight: 1.05, letterSpacing: '-0.03em', margin: '0 0 24px', color: '#fff' }}>
          We Build Products<br />
          That <span style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', backgroundImage: 'linear-gradient(135deg, #5B8AF7 0%, #8B5CF6 100%)' }}>Actually Ship</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p {...fadeUp(0.2)} style={{ fontFamily: 'var(--font-outfit)', fontSize: 'clamp(15px, 2vw, 18px)', color: 'rgba(255,255,255,0.48)', lineHeight: 1.65, maxWidth: 520, margin: '0 auto 40px' }}>
          From your first MVP to enterprise-grade platforms — we handle design, engineering, and growth so you can focus on building the business.
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(0.3)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
          <a href="#contact" style={{ textDecoration: 'none' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 28px', borderRadius: 99, background: 'linear-gradient(135deg, #5B8AF7, #8B5CF6)', fontFamily: 'var(--font-outfit)', fontWeight: 600, fontSize: 14.5, color: '#fff', cursor: 'pointer', letterSpacing: '0.01em', boxShadow: '0 8px 32px rgba(91,138,247,0.28)' }}>
              Start Your Project <ArrowRight size={15} />
            </span>
          </a>
          <a href="#work" style={{ textDecoration: 'none' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-outfit)', fontSize: 14, color: 'rgba(255,255,255,0.48)', cursor: 'pointer', padding: '13px 20px', borderRadius: 99, border: '1px solid rgba(255,255,255,0.08)' }}>
              View Our Work <ArrowRight size={14} />
            </span>
          </a>
        </motion.div>
      </div>

      {/* Dashboard mock */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: 'relative', zIndex: 10, marginTop: 64, width: '100%', maxWidth: 880, padding: '0 24px' }}
      >
        <DashboardMock />
      </motion.div>
    </section>
  )
}
