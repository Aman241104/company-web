'use client'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const testimonials = [
  { name: 'Priya Sharma', role: 'CEO, TechVista Solutions', quote: 'We had an outdated internal tool that our team dreaded using. Mehta rebuilt it end-to-end in eight weeks — adoption went from 40% to 100% within a month of launch.', avatar: 'PS', color: '#5B8AF7' },
  { name: 'Rahul Gupta', role: 'Founder, GreenLeaf Organics', quote: "The SEO work they did moved us from page 4 to position 2 for our core keyword. Organic revenue is now our biggest channel — it wasn't even on the map before.", avatar: 'RG', color: '#8B5CF6' },
  { name: 'Ananya Patel', role: 'CTO, NovaMed Diagnostics', quote: 'They built our patient management system in 14 weeks. Fourteen months later, zero critical bugs, zero downtime. That kind of reliability in healthtech is rare and genuinely appreciated.', avatar: 'AP', color: '#34D399' },
  { name: 'Vikram Singh', role: 'Director, PeakPerform Sports', quote: 'Checkout abandonment dropped by 34% after the redesign — measured, not estimated. The mobile experience is the best in our category. Our competitors have noticed.', avatar: 'VS', color: '#FBBF24' },
  { name: 'Meena Joshi', role: 'CMO, UrbanNest Realty', quote: "Our Meta ROAS sits at 6.2x consistently. Before Mehta, we were burning budget with no attribution clarity. Now every rupee we spend has a clear line to pipeline.", avatar: 'MJ', color: '#F87171' },
  { name: 'Arjun Malhotra', role: 'MD, ClearPath Finance', quote: 'In fintech you cannot afford partners who cut corners on security or communication. Mehta has never missed a deadline or a status update in two years of working together.', avatar: 'AM', color: '#60A5FA' },
  { name: 'Sunita Reddy', role: 'Founder, ZingBliss', quote: 'Six weeks from brief to App Store. The app launched with a 4.8 rating and held it. When I told other founders the timeline, nobody believed me until I showed them the live link.', avatar: 'SR', color: '#A78BFA' },
  { name: 'Dev Kapoor', role: 'CEO, BrightMind EdTech', quote: 'Our LMS went from 500 to 50,000 active learners during a campaign peak — not a single downtime incident. The infrastructure they designed handled 100× load without blinking.', avatar: 'DK', color: '#FB923C' },
]

const doubled = [...testimonials, ...testimonials]

function Card({ t }) {
  return (
    <div style={{ flexShrink: 0, width: 320, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 24, marginRight: 14, position: 'relative' }}>
      <div style={{ display: 'flex', gap: 3, marginBottom: 14 }}>
        {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={12} fill="#FBBF24" color="#FBBF24" />)}
      </div>
      <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 14, color: 'rgba(255,255,255,0.62)', lineHeight: 1.65, margin: '0 0 20px' }}>"{t.quote}"</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: `${t.color}22`, border: `1px solid ${t.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: 11, color: t.color, flexShrink: 0 }}>
          {t.avatar}
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 600, fontSize: 13.5, color: '#fff' }}>{t.name}</div>
          <div style={{ fontFamily: 'var(--font-outfit)', fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{t.role}</div>
        </div>
      </div>
    </div>
  )
}

function Row({ reverse }) {
  return (
    <div style={{ position: 'relative', marginBottom: 14 }}>
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 80, zIndex: 2, background: 'linear-gradient(90deg, #060614, transparent)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 80, zIndex: 2, background: 'linear-gradient(-90deg, #060614, transparent)', pointerEvents: 'none' }} />
      <motion.div
        style={{ display: 'flex' }}
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration: reverse ? 42 : 38, repeat: Infinity, ease: 'linear' }}
      >
        {(reverse ? [...doubled].reverse() : doubled).map((t, i) => <Card key={i} t={t} />)}
      </motion.div>
    </div>
  )
}

export default function Testimonials() {
  return (
    <section style={{ padding: '100px 0', overflow: 'hidden' }}>
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: 56, padding: '0 24px' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 14px', borderRadius: 99, marginBottom: 20, border: '1px solid rgba(91,138,247,0.25)', background: 'rgba(91,138,247,0.07)', fontFamily: 'var(--font-outfit)', fontSize: 12, color: 'rgba(91,138,247,0.85)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#5B8AF7', display: 'inline-block' }} />
          Testimonials
        </span>
        <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(32px, 5vw, 52px)', letterSpacing: '-0.03em', color: '#fff', margin: '0 0 14px', lineHeight: 1.1 }}>
          Don't take our word<br />
          <span style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', backgroundImage: 'linear-gradient(135deg, #5B8AF7, #8B5CF6)' }}>for it.</span>
        </h2>
        <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 16, color: 'rgba(255,255,255,0.4)' }}>Real results from founders and teams who've shipped with us.</p>
      </motion.div>
      <Row reverse={false} />
      <Row reverse={true} />
    </section>
  )
}
