'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

const tabs = ['For Startups', 'For Growing Teams', 'For Enterprises']

const content = {
  'For Startups': {
    badge: 'Launch fast',
    headline: 'Go from idea to live product in weeks, not months.',
    body: 'We help early-stage founders move at startup speed — scoped MVPs, lean engineering, and launch-ready design without the bloat of a big agency.',
    points: ['MVP scoping & rapid prototyping', 'Lean full-stack development', 'Investor-ready pitch decks & demos', 'Flexible sprint-based retainers'],
    color: '#5B8AF7', label: 'MVP Dashboard',
    stat1: { val: '6 wks', label: 'avg MVP time' }, stat2: { val: '3x', label: 'faster than in-house' },
  },
  'For Growing Teams': {
    badge: 'Scale smart',
    headline: 'Extend your engineering capacity without the hiring headache.',
    body: 'When your roadmap outpaces your team, we slot in as dedicated partners — shipping features, reducing tech debt, and keeping your stack healthy.',
    points: ['Dedicated dev team augmentation', 'CI/CD pipelines & DevOps setup', 'Technical architecture reviews', 'Performance & security audits'],
    color: '#8B5CF6', label: 'Team Analytics',
    stat1: { val: '40%', label: 'cost vs hiring' }, stat2: { val: '2 days', label: 'to onboard' },
  },
  'For Enterprises': {
    badge: 'Transform at scale',
    headline: 'Custom software and ERP systems built for enterprise complexity.',
    body: 'From bespoke CRMs to full ERP implementations, we architect and build systems that handle enterprise-grade data, compliance, and integrations.',
    points: ['Custom ERP & CRM development', 'Legacy system modernisation', 'Enterprise integrations & APIs', '24/7 SLA-backed support'],
    color: '#34D399', label: 'Enterprise ERP',
    stat1: { val: '99.9%', label: 'uptime SLA' }, stat2: { val: '12 mo', label: 'support included' },
  },
}

function TabMock({ tab }) {
  const { color, label, stat1, stat2 } = content[tab]
  const bars = [25,38,32,55,48,70,62,80,72,90,85,100]
  return (
    <div style={{ background: 'linear-gradient(145deg, #0C0C24 0%, #090920 100%)', border: `1px solid ${color}22`, borderRadius: 14, overflow: 'hidden', boxShadow: `0 0 60px ${color}0A, 0 40px 80px rgba(0,0,0,0.3)`, position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '50%', height: 1, background: `linear-gradient(90deg, transparent, ${color}60, transparent)` }} />
      <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(0,0,0,0.2)' }}>
        <div style={{ display: 'flex', gap: 5 }}>{['#FF5F57','#FEBC2E','#28C840'].map(c => <div key={c} style={{ width: 8, height: 8, borderRadius: '50%', background: c, opacity: 0.7 }} />)}</div>
        <span style={{ fontFamily: 'var(--font-outfit)', fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>{label}</span>
        <div style={{ marginLeft: 'auto', padding: '3px 10px', borderRadius: 99, background: `${color}18`, fontFamily: 'var(--font-outfit)', fontSize: 9, color }}> Live</div>
      </div>
      <div style={{ padding: '16px 16px 12px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
          {[stat1, stat2, { val: '80+', label: 'clients served' }, { val: '5★', label: 'avg rating' }].map(s => (
            <div key={s.label} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, padding: '12px' }}>
              <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: 20, color: '#fff', lineHeight: 1 }}>{s.val}</div>
              <div style={{ fontFamily: 'var(--font-outfit)', fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 8, padding: 12 }}>
          <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-outfit)', marginBottom: 10 }}>Growth Trajectory</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 56 }}>
            {bars.map((h, i) => <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: '2px 2px 0 0', background: i >= 10 ? `linear-gradient(180deg, ${color}, ${color}60)` : `${color}25` }} />)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Featured() {
  const [active, setActive] = useState(tabs[0])
  return (
    <section id="featured" style={{ padding: '100px 24px', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.01)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: 48 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 14px', borderRadius: 99, marginBottom: 20, border: '1px solid rgba(91,138,247,0.25)', background: 'rgba(91,138,247,0.07)', fontFamily: 'var(--font-outfit)', fontSize: 12, color: 'rgba(91,138,247,0.85)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#5B8AF7', display: 'inline-block' }} />
            Who we work with
          </span>
          <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(32px, 5vw, 52px)', letterSpacing: '-0.03em', color: '#fff', margin: '0 0 14px', lineHeight: 1.1 }}>
            The right team for<br />
            <span style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', backgroundImage: 'linear-gradient(135deg, #5B8AF7, #8B5CF6)' }}>wherever you are now.</span>
          </h2>
        </motion.div>

        {/* Tabs */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} style={{ display: 'flex', justifyContent: 'center', marginBottom: 48 }}>
          <div style={{ display: 'flex', gap: 4, padding: 5, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 99 }}>
            {tabs.map(t => (
              <button key={t} onClick={() => setActive(t)} style={{ padding: '8px 20px', borderRadius: 99, border: 'none', cursor: 'pointer', fontFamily: 'var(--font-outfit)', fontWeight: 500, fontSize: 13, background: active === t ? 'linear-gradient(135deg, #5B8AF7, #8B5CF6)' : 'transparent', color: active === t ? '#fff' : 'rgba(255,255,255,0.45)', transition: 'all 0.25s' }}>
                {t}
              </button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }} className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 48, alignItems: 'center' }}>
            <div>
              <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: 99, marginBottom: 20, background: 'rgba(91,138,247,0.1)', border: '1px solid rgba(91,138,247,0.2)', fontFamily: 'var(--font-outfit)', fontSize: 11.5, color: '#5B8AF7' }}>
                {content[active].badge}
              </span>
              <h3 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: 'clamp(22px, 3vw, 32px)', color: '#fff', margin: '0 0 16px', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                {content[active].headline}
              </h3>
              <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 15, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, margin: '0 0 28px' }}>
                {content[active].body}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {content[active].points.map(p => (
                  <div key={p} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <CheckCircle2 size={15} color="#5B8AF7" style={{ flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontFamily: 'var(--font-outfit)', fontSize: 14, color: 'rgba(255,255,255,0.65)' }}>{p}</span>
                  </div>
                ))}
              </div>
              <a href="#contact" style={{ textDecoration: 'none', display: 'inline-block', marginTop: 32 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 99, background: 'linear-gradient(135deg, #5B8AF7, #8B5CF6)', fontFamily: 'var(--font-outfit)', fontWeight: 600, fontSize: 14, color: '#fff', cursor: 'pointer' }}>
                  Start Here
                </span>
              </a>
            </div>
            <TabMock tab={active} />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
