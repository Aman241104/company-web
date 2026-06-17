'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import DashboardMock from '@/components/ui/DashboardMock'
import { Typewriter } from '@/components/ui/typewriter'
import { LiquidButton } from '@/components/ui/liquid-glass-button'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function Hero() {
  const [stars, setStars] = useState([])

  useEffect(() => {
    setStars(Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.1 + 0.3,
      opacity: Math.random() * 0.22 + 0.05,
      dur: 4 + Math.random() * 5,
    })))
  }, [])

  return (
    <section id="hero" style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: 100, paddingBottom: 80, overflow: 'hidden' }}>

      {/* ── Aurora animated stripes ── */}
      <div style={{
        position: 'absolute',
        inset: -20,
        pointerEvents: 'none',
        backgroundImage: [
          'repeating-linear-gradient(100deg, #060614 0%, #060614 7%, transparent 10%, transparent 12%, #060614 16%)',
          'repeating-linear-gradient(100deg, #5B8AF7 10%, #7C6AF7 15%, #8B5CF6 20%, #a78bfa 25%, #5B8AF7 30%)',
        ].join(', '),
        backgroundSize: '300% 200%, 200% 150%',
        backgroundPosition: '50% 50%, 50% 50%',
        filter: 'blur(14px)',
        opacity: 0.22,
        animation: 'aurora 55s linear infinite',
        WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 50% 35%, black 25%, transparent 72%)',
        maskImage: 'radial-gradient(ellipse 90% 80% at 50% 35%, black 25%, transparent 72%)',
        willChange: 'background-position',
      }} />

      {/* ── Gradient orbs ── */}
      <div style={{ position: 'absolute', top: '-8%', left: '2%', width: 560, height: 460, borderRadius: '50%', pointerEvents: 'none', background: 'radial-gradient(circle, rgba(91,138,247,0.11) 0%, transparent 68%)', filter: 'blur(70px)', animation: 'orb-drift 14s ease-in-out infinite', willChange: 'transform' }} />
      <div style={{ position: 'absolute', bottom: '12%', right: '-2%', width: 480, height: 400, borderRadius: '50%', pointerEvents: 'none', background: 'radial-gradient(circle, rgba(139,92,246,0.09) 0%, transparent 68%)', filter: 'blur(70px)', animation: 'orb-drift 18s ease-in-out infinite reverse', willChange: 'transform' }} />
      <div style={{ position: 'absolute', top: '42%', left: '50%', transform: 'translateX(-50%)', width: 440, height: 280, borderRadius: '50%', pointerEvents: 'none', background: 'radial-gradient(ellipse, rgba(91,138,247,0.07) 0%, transparent 70%)', filter: 'blur(50px)' }} />

      {/* ── Star field ── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {stars.map(s => (
          <div key={s.id} style={{ position: 'absolute', left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size, borderRadius: '50%', background: '#fff', opacity: s.opacity, animation: `opacity-glow ${s.dur}s ease-in-out infinite alternate` }} />
        ))}
      </div>

      {/* ── Dot grid ── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.06, backgroundImage: 'radial-gradient(rgba(255,255,255,0.55) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* ── Bottom fade ── */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 320, pointerEvents: 'none', background: 'linear-gradient(to top, #060614 0%, rgba(6,6,20,0.75) 45%, transparent)' }} />

      {/* ── Content ── */}
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: 720, margin: '0 auto', padding: '0 24px' }}>

        <motion.div {...fadeUp(0)}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 99, marginBottom: 32, border: '1px solid rgba(91,138,247,0.28)', background: 'rgba(91,138,247,0.08)', fontFamily: 'var(--font-outfit)', fontSize: 12.5, color: 'rgba(91,138,247,0.9)', letterSpacing: '0.03em' }}>
            <Sparkles size={12} />
            150+ products shipped · 80+ happy clients
          </span>
        </motion.div>

        <motion.h1 {...fadeUp(0.1)} style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(42px, 8vw, 80px)', lineHeight: 1.05, letterSpacing: '-0.03em', margin: '0 0 24px', color: '#fff' }}>
          We Build Products<br />
          <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
            That{' '}
            <span style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', backgroundImage: 'linear-gradient(135deg, #5B8AF7 0%, #8B5CF6 100%)', display: 'inline-block', minWidth: '5ch' }}>
              <Typewriter text={["Ship Fast", "Convert.", "Scale.", "Deliver."]} speed={70} deleteSpeed={40} waitTime={2400} showCursor={true} cursorChar="_" cursorClassName="opacity-60" />
            </span>
          </span>
        </motion.h1>

        <motion.p {...fadeUp(0.2)} style={{ fontFamily: 'var(--font-outfit)', fontSize: 'clamp(15px, 2vw, 18px)', color: 'rgba(255,255,255,0.48)', lineHeight: 1.65, maxWidth: 520, margin: '0 auto 40px' }}>
          From your first MVP to enterprise-grade platforms — we handle design, engineering, and growth so you can focus on building the business.
        </motion.p>

        <motion.div {...fadeUp(0.3)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
          <LiquidButton onClick={() => window.location.href='#contact'}>
            Start Your Project <ArrowRight size={15} />
          </LiquidButton>
          <a href="#work" style={{ textDecoration: 'none' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-outfit)', fontSize: 14, color: 'rgba(255,255,255,0.48)', cursor: 'pointer', padding: '13px 20px', borderRadius: 99, border: '1px solid rgba(255,255,255,0.08)' }}>
              View Our Work <ArrowRight size={14} />
            </span>
          </a>
        </motion.div>
      </div>

      {/* ── Dashboard mock ── */}
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
