'use client'
import { motion } from 'framer-motion'
import { Mail, Phone, Calendar } from 'lucide-react'

function GlobeRings() {
  return (
    <div style={{ position: 'absolute', bottom: -80, left: '50%', transform: 'translateX(-50%)', width: 560, height: 320, pointerEvents: 'none', zIndex: 0 }}>
      {[520, 390, 260, 130].map((size, i) => (
        <div key={size} style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: size, height: size / 2, borderRadius: `${size / 2}px ${size / 2}px 0 0`, border: `1px solid rgba(91,138,247,${0.035 + i * 0.022})` }} />
      ))}
      <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 240, height: 60, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(91,138,247,0.22), transparent 70%)', filter: 'blur(14px)' }} />
    </div>
  )
}

export default function CTA() {
  return (
    <section id="contact" style={{ padding: '100px 24px 80px', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      {/* BG glow */}
      <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 400, borderRadius: '50%', pointerEvents: 'none', background: 'radial-gradient(ellipse, rgba(91,138,247,0.1) 0%, rgba(139,92,246,0.07) 40%, transparent 70%)', filter: 'blur(60px)', animation: 'opacity-glow 4s ease-in-out infinite alternate' }} />
      <GlobeRings />

      <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 14px', borderRadius: 99, marginBottom: 24, border: '1px solid rgba(91,138,247,0.25)', background: 'rgba(91,138,247,0.07)', fontFamily: 'var(--font-outfit)', fontSize: 12, color: 'rgba(91,138,247,0.85)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#5B8AF7', display: 'inline-block' }} />
            Let's work together
          </span>

          <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(38px, 7vw, 72px)', letterSpacing: '-0.03em', color: '#fff', margin: '0 0 18px', lineHeight: 1.05 }}>
            Your idea deserves<br />
            <span style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', backgroundImage: 'linear-gradient(135deg, #5B8AF7, #8B5CF6)' }}>a real launch.</span>
          </h2>

          <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 16, color: 'rgba(255,255,255,0.42)', lineHeight: 1.7, margin: '0 0 40px' }}>
            Book a free 30-minute discovery call. We'll assess your idea, estimate scope honestly, and tell you exactly what it takes to ship. No pitch — just clarity.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 40, flexWrap: 'wrap' }}>
            <a href="mailto:hello@mehtatechnologies.com" style={{ textDecoration: 'none' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 30px', borderRadius: 99, background: 'linear-gradient(135deg, #5B8AF7, #8B5CF6)', fontFamily: 'var(--font-outfit)', fontWeight: 600, fontSize: 15, color: '#fff', cursor: 'pointer', boxShadow: '0 8px 32px rgba(91,138,247,0.28)' }}>
                <Mail size={15} /> Start a Project
              </span>
            </a>
            <a href="#" style={{ textDecoration: 'none' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 24px', borderRadius: 99, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', fontFamily: 'var(--font-outfit)', fontWeight: 600, fontSize: 15, color: 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>
                <Calendar size={15} /> Book a Call
              </span>
            </a>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 28, flexWrap: 'wrap' }}>
            <a href="mailto:hello@mehtatechnologies.com" style={{ display: 'flex', alignItems: 'center', gap: 7, fontFamily: 'var(--font-outfit)', fontSize: 13.5, color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>
              <Mail size={13} /> hello@mehtatechnologies.com
            </a>
            <a href="tel:+919876543210" style={{ display: 'flex', alignItems: 'center', gap: 7, fontFamily: 'var(--font-outfit)', fontSize: 13.5, color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>
              <Phone size={13} /> +91 98765 43210
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
