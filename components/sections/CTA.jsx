'use client'
import { motion } from 'framer-motion'
import { ArrowRight, Mail, Phone } from 'lucide-react'

export default function CTA() {
  return (
    <section id="contact" style={{ padding: '120px 24px 100px', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      {/* Glow */}
      <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', width: 500, height: 300, borderRadius: '50%', pointerEvents: 'none', background: 'radial-gradient(ellipse, rgba(91,138,247,0.09) 0%, rgba(139,92,246,0.05) 50%, transparent 70%)', filter: 'blur(80px)' }} />

      <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 32 }}>
            <div style={{ flex: 1, maxWidth: 80, height: 1, background: 'linear-gradient(90deg, transparent, rgba(91,138,247,0.4))' }} />
            <span style={{ fontFamily: 'var(--font-outfit)', fontSize: 12, color: 'rgba(91,138,247,0.7)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Let's work together</span>
            <div style={{ flex: 1, maxWidth: 80, height: 1, background: 'linear-gradient(-90deg, transparent, rgba(91,138,247,0.4))' }} />
          </div>

          <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(40px, 7vw, 76px)', letterSpacing: '-0.035em', color: '#fff', margin: '0 0 22px', lineHeight: 1.02 }}>
            Your idea deserves<br />
            <span style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', backgroundImage: 'linear-gradient(135deg, #5B8AF7, #8B5CF6)' }}>a real launch.</span>
          </h2>

          <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 17, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, margin: '0 0 44px', maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' }}>
            Free 30-minute discovery call. We'll scope your project honestly, estimate the timeline, and tell you exactly what it will take — no pitch, just clarity.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 48, flexWrap: 'wrap' }}>
            <a href="mailto:hello@mehtatechnologies.com" style={{ textDecoration: 'none' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '15px 32px', borderRadius: 99, background: 'linear-gradient(135deg, #5B8AF7, #8B5CF6)', fontFamily: 'var(--font-outfit)', fontWeight: 600, fontSize: 15, color: '#fff', cursor: 'pointer', boxShadow: '0 8px 40px rgba(91,138,247,0.28)' }}>
                Start a Project <ArrowRight size={15} />
              </span>
            </a>
            <a href="#" style={{ textDecoration: 'none' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 28px', borderRadius: 99, background: 'transparent', border: '1px solid rgba(255,255,255,0.12)', fontFamily: 'var(--font-outfit)', fontWeight: 500, fontSize: 15, color: 'rgba(255,255,255,0.55)', cursor: 'pointer' }}>
                Book a Call
              </span>
            </a>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap' }}>
            <a href="mailto:hello@mehtatechnologies.com" style={{ display: 'flex', alignItems: 'center', gap: 7, fontFamily: 'var(--font-outfit)', fontSize: 13.5, color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}>
              <Mail size={13} strokeWidth={1.5} /> hello@mehtatechnologies.com
            </a>
            <a href="tel:+919876543210" style={{ display: 'flex', alignItems: 'center', gap: 7, fontFamily: 'var(--font-outfit)', fontSize: 13.5, color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}>
              <Phone size={13} strokeWidth={1.5} /> +91 98765 43210
            </a>
          </div>

        </motion.div>
      </div>
    </section>
  )
}
