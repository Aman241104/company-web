'use client'
import { motion } from 'framer-motion'

const testimonials = [
  { name: 'Priya Sharma', role: 'CEO, TechVista Solutions', quote: 'We had an outdated internal tool our team dreaded using. Mehta rebuilt it end-to-end in eight weeks — adoption went from 40% to 100% within a month of launch.', avatar: 'PS', color: '#5B8AF7' },
  { name: 'Rahul Gupta', role: 'Founder, GreenLeaf Organics', quote: "The SEO work moved us from page 4 to position 2 for our core keyword. Organic revenue is now our biggest channel — it wasn't even on the map before.", avatar: 'RG', color: '#8B5CF6' },
  { name: 'Ananya Patel', role: 'CTO, NovaMed Diagnostics', quote: 'They built our patient management system in 14 weeks. Fourteen months later, zero critical bugs, zero downtime. That kind of reliability in healthtech is rare.', avatar: 'AP', color: '#34D399' },
  { name: 'Vikram Singh', role: 'Director, PeakPerform Sports', quote: 'Checkout abandonment dropped 34% after the redesign — measured, not estimated. The mobile experience is the best in our category. Competitors have noticed.', avatar: 'VS', color: '#FBBF24' },
  { name: 'Meena Joshi', role: 'CMO, UrbanNest Realty', quote: "Our Meta ROAS sits at 6.2x consistently. Before Mehta, we were burning budget with no attribution clarity. Now every rupee has a clear line to pipeline.", avatar: 'MJ', color: '#F87171' },
  { name: 'Arjun Malhotra', role: 'MD, ClearPath Finance', quote: 'In fintech you cannot afford partners who cut corners on security or communication. Mehta has never missed a deadline or a status update in two years together.', avatar: 'AM', color: '#60A5FA' },
  { name: 'Sunita Reddy', role: 'Founder, ZingBliss', quote: 'Six weeks from brief to App Store. The app launched with a 4.8 rating and held it. When I told other founders the timeline, nobody believed me until I showed the live link.', avatar: 'SR', color: '#A78BFA' },
  { name: 'Dev Kapoor', role: 'CEO, BrightMind EdTech', quote: 'Our LMS went from 500 to 50,000 active learners during a campaign peak — not a single downtime incident. The infrastructure handled 100× load without blinking.', avatar: 'DK', color: '#FB923C' },
]

const doubled = [...testimonials, ...testimonials]

function Card({ t }) {
  return (
    <div style={{ flexShrink: 0, width: 340, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '24px 26px', marginRight: 16, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 16, right: 20, fontFamily: 'Georgia, serif', fontSize: 64, lineHeight: 1, color: 'rgba(255,255,255,0.04)', userSelect: 'none', pointerEvents: 'none' }}>"</div>
      <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill="#FBBF24"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>
        ))}
      </div>
      <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.68, margin: '0 0 22px' }}>{t.quote}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
        <div style={{ width: 34, height: 34, borderRadius: '50%', background: `${t.color}18`, border: `1px solid ${t.color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: 10.5, color: t.color, flexShrink: 0 }}>
          {t.avatar}
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 600, fontSize: 13, color: '#fff' }}>{t.name}</div>
          <div style={{ fontFamily: 'var(--font-outfit)', fontSize: 12, color: 'rgba(255,255,255,0.32)' }}>{t.role}</div>
        </div>
      </div>
    </div>
  )
}

function Row({ reverse }) {
  return (
    <div style={{ position: 'relative', marginBottom: 16, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 100, zIndex: 2, background: 'linear-gradient(90deg, #060614 30%, transparent)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 100, zIndex: 2, background: 'linear-gradient(-90deg, #060614 30%, transparent)', pointerEvents: 'none' }} />
      <motion.div
        style={{ display: 'flex' }}
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration: reverse ? 44 : 38, repeat: Infinity, ease: 'linear' }}
      >
        {(reverse ? [...doubled].reverse() : doubled).map((t, i) => <Card key={i} t={t} />)}
      </motion.div>
    </div>
  )
}

export default function Testimonials() {
  return (
    <section style={{ padding: '100px 0', overflow: 'hidden', position: 'relative' }}>
      <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 800, height: 300, borderRadius: '50%', pointerEvents: 'none', background: 'radial-gradient(ellipse, rgba(139,92,246,0.06) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: 56, padding: '0 24px' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 14px', borderRadius: 99, marginBottom: 20, border: '1px solid rgba(91,138,247,0.25)', background: 'rgba(91,138,247,0.07)', fontFamily: 'var(--font-outfit)', fontSize: 12, color: 'rgba(91,138,247,0.85)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#5B8AF7', display: 'inline-block' }} />
          Client results
        </span>
        <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(32px, 5vw, 52px)', letterSpacing: '-0.03em', color: '#fff', margin: '0 0 14px', lineHeight: 1.1 }}>
          Don't take our word for it.
        </h2>
        <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 16, color: 'rgba(255,255,255,0.38)' }}>Real results from founders and teams who've shipped with us.</p>
      </motion.div>
      <Row reverse={false} />
      <Row reverse={true} />
    </section>
  )
}
