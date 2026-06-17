'use client'
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Team from '@/components/sections/Team'
import LogoLoop from '@/components/ui/reactbits/LogoLoop'

const projectScreenshots = [
  { src: '/silverspoon-screenshot.png', label: 'Silver Spoon by ACJ' },
  { src: '/interior.png', label: 'Stylux Interiors' },
  { src: '/jjfilms.png', label: 'JJ Films' },
  { src: '/zingbliss.png', label: 'ZingBliss' },
  { src: '/sweet.png', label: 'Gourmettazone' },
  { src: '/luxeliving.png', label: 'LuxeLiving' },
  { src: '/nextsphere.png', label: 'NexSphere' },
  { src: '/testimonial.png', label: 'College Capsule' },
  { src: '/chahana.png', label: 'Chahana Dental' },
  { src: '/aangan.png', label: 'Aangan Boutique' },
  { src: '/eyehospital.png', label: 'EyeCare Hospital' },
  { src: '/destination.png', label: 'Destination Anywhere' },
  { src: '/inventory.png', label: 'FruitManager' },
  { src: '/hvac.png', label: 'HVAC' },
  { src: '/chemical.png', label: 'Classic Organic Chemicals' },
  { src: '/form-web.png', label: 'Elite Cloud Books' },
]

const values = [
  { num: '01', title: 'Results over activity', desc: 'We measure success by your outcomes, not our hours. If it doesn\'t move the needle, we don\'t do it.' },
  { num: '02', title: 'Radical transparency', desc: 'Weekly updates, live staging environments, honest timelines. You always know where your project stands.' },
  { num: '03', title: 'Long-term thinking', desc: 'We build for scale and maintainability. The code we write today should still serve you five years from now.' },
  { num: '04', title: 'Speed without shortcuts', desc: 'We move fast by being prepared, not by cutting corners. Quality and velocity aren\'t mutually exclusive.' },
]

const timeline = [
  { year: '2019', event: 'Founded in Mumbai as a 2-person web studio. First 3 clients in the first month.' },
  { year: '2020', event: 'Expanded to mobile app development. Crossed 10 active clients despite the pandemic.' },
  { year: '2021', event: 'Launched ViboERP — our flagship SaaS product for Indian SMEs.' },
  { year: '2022', event: 'Opened Bengaluru office, added performance marketing and SEO verticals.' },
  { year: '2023', event: 'Crossed 100 projects shipped, 80+ active clients, team of 12.' },
  { year: '2024', event: 'Enterprise division launched. Expanded internationally — US, UK, UAE clients.' },
  { year: '2025', event: 'AI product division underway. Team of 18 across Mumbai & Bengaluru.' },
]

const stats = [
  { value: 150, suffix: '+', label: 'Projects Delivered', desc: 'Across 12+ industries' },
  { value: 80, suffix: '+', label: 'Happy Clients', desc: 'India, US, UK & UAE' },
  { value: 5, suffix: '+', label: 'Years in Business', desc: 'Founded in Mumbai, 2019' },
  { value: 99, suffix: '%', label: 'Client Retention', desc: 'Clients who come back' },
]

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
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: index * 0.1 }}
      style={{ textAlign: 'center', padding: '36px 24px', background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', bottom: -40, left: '50%', transform: 'translateX(-50%)', width: 120, height: 80, borderRadius: '50%', background: 'radial-gradient(circle, rgba(91,138,247,0.12), transparent 70%)', filter: 'blur(20px)' }} />
      <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(42px, 5vw, 56px)', letterSpacing: '-0.03em', lineHeight: 1, background: 'linear-gradient(135deg, #5B8AF7, #8B5CF6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: 8 }}>
        {count}{stat.suffix}
      </div>
      <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 600, fontSize: 15, color: 'rgba(255,255,255,0.8)', marginBottom: 4 }}>{stat.label}</div>
      <div style={{ fontFamily: 'var(--font-outfit)', fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>{stat.desc}</div>
    </motion.div>
  )
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
})

const Pill = ({ children }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 14px', borderRadius: 99, marginBottom: 20, border: '1px solid rgba(91,138,247,0.25)', background: 'rgba(91,138,247,0.07)', fontFamily: 'var(--font-outfit)', fontSize: 12, color: 'rgba(91,138,247,0.85)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
    <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#5B8AF7', display: 'inline-block', animation: 'opacity-glow 2s ease-in-out infinite alternate' }} />
    {children}
  </span>
)

export default function AboutPage() {
  const [stars, setStars] = useState([])
  useEffect(() => {
    setStars(Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.5 + 0.4,
      opacity: Math.random() * 0.4 + 0.06,
      dur: 2 + Math.random() * 3,
    })))
  }, [])

  return (
    <>
      {/* Hero */}
      <section style={{ position: 'relative', minHeight: '70vh', display: 'flex', alignItems: 'center', paddingTop: 120, paddingBottom: 80, overflow: 'hidden' }}>
        {/* Stars */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          {stars.map(s => (
            <div key={s.id} style={{ position: 'absolute', left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size, borderRadius: '50%', background: '#fff', opacity: s.opacity, animation: `opacity-glow ${s.dur}s ease-in-out infinite alternate` }} />
          ))}
        </div>
        {/* Glow */}
        <div style={{ position: 'absolute', top: '20%', left: '60%', transform: 'translateX(-50%)', width: 600, height: 400, borderRadius: '50%', pointerEvents: 'none', background: 'radial-gradient(ellipse, rgba(91,138,247,0.12) 0%, rgba(139,92,246,0.07) 40%, transparent 70%)', filter: 'blur(60px)' }} />

        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }} className="grid-about-hero">
            <div>
              <motion.div {...fadeUp(0)}><Pill>Our Story</Pill></motion.div>
              <motion.h1 {...fadeUp(0.1)} style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: 1.05, letterSpacing: '-0.03em', color: '#fff', margin: '0 0 24px' }}>
                Technology that creates<br />
                <span style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', backgroundImage: 'linear-gradient(135deg, #5B8AF7, #8B5CF6)' }}>real value.</span>
              </motion.h1>
              <motion.p {...fadeUp(0.2)} style={{ fontFamily: 'var(--font-outfit)', fontSize: 17, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, margin: '0 0 36px', maxWidth: 480 }}>
                Mehta Technologies was built on one belief — technology should create measurable business value, not just look impressive in demos. Since 2019, we've delivered on that promise for 80+ clients across India and internationally.
              </motion.p>
              <motion.div {...fadeUp(0.3)} style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a href="/contact" style={{ textDecoration: 'none' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 28px', borderRadius: 99, background: 'linear-gradient(135deg, #5B8AF7, #8B5CF6)', fontFamily: 'var(--font-outfit)', fontWeight: 600, fontSize: 14.5, color: '#fff', cursor: 'pointer', boxShadow: '0 8px 32px rgba(91,138,247,0.28)' }}>
                    Work With Us <ArrowRight size={15} />
                  </span>
                </a>
                <a href="/work" style={{ textDecoration: 'none' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-outfit)', fontSize: 14, color: 'rgba(255,255,255,0.48)', cursor: 'pointer', padding: '13px 20px', borderRadius: 99, border: '1px solid rgba(255,255,255,0.08)' }}>
                    See Our Work
                  </span>
                </a>
              </motion.div>
            </div>

            {/* Quick facts card */}
            <motion.div {...fadeUp(0.15)} style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: '32px 28px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '60%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(91,138,247,0.4), transparent)' }} />
              <div style={{ fontFamily: 'var(--font-outfit)', fontSize: 11, color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 24 }}>Quick Facts</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                {stats.map((s, i) => (
                  <div key={s.label}>
                    <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 38, letterSpacing: '-0.03em', lineHeight: 1, background: 'linear-gradient(135deg, #5B8AF7, #8B5CF6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: 6 }}>{s.value}{s.suffix}</div>
                    <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 600, fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 2 }}>{s.label}</div>
                    <div style={{ fontFamily: 'var(--font-outfit)', fontSize: 11.5, color: 'rgba(255,255,255,0.28)' }}>{s.desc}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#34D399', boxShadow: '0 0 8px rgba(52,211,153,0.5)' }} />
                <span style={{ fontFamily: 'var(--font-outfit)', fontSize: 12.5, color: 'rgba(255,255,255,0.35)' }}>Available for new projects</span>
              </div>
            </motion.div>
          </div>
        </div>

        <style>{`@media (max-width: 768px) { .grid-about-hero { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      {/* Stats bar */}
      <section style={{ padding: '80px 24px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 48, height: 1, background: 'rgba(255,255,255,0.08)' }} />
              <span style={{ fontFamily: 'var(--font-outfit)', fontSize: 12, color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>By the numbers</span>
              <div style={{ width: 48, height: 1, background: 'rgba(255,255,255,0.08)' }} />
            </div>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: 12 }}>
            {stats.map((s, i) => <StatCard key={s.label} stat={s} index={i} />)}
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: '80px 24px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ marginBottom: 56 }}>
            <Pill>What We Stand For</Pill>
            <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(32px, 5vw, 52px)', letterSpacing: '-0.03em', color: '#fff', margin: '0 0 16px', lineHeight: 1.1 }}>
              How we think.<br />
              <span style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', backgroundImage: 'linear-gradient(135deg, #5B8AF7, #8B5CF6)' }}>How we work.</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4" style={{ gap: 14 }}>
            {values.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.08 }}
                style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '28px 24px', position: 'relative', overflow: 'hidden' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(91,138,247,0.22)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}>
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '60%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(91,138,247,0.4), transparent)', opacity: 0.6 }} />
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(91,138,247,0.1)', border: '1px solid rgba(91,138,247,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <span style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: 11, color: '#5B8AF7' }}>{v.num}</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: 16, color: '#fff', margin: '0 0 10px', letterSpacing: '-0.02em' }}>{v.title}</h3>
                <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 13.5, color: 'rgba(255,255,255,0.42)', lineHeight: 1.65, margin: 0 }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project screenshots marquee */}
      <section style={{ padding: '48px 0', borderTop: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 24px 20px' }}>
          <span style={{ fontFamily: 'var(--font-outfit)', fontSize: 11, color: 'rgba(255,255,255,0.22)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>150+ projects delivered</span>
        </div>
        <LogoLoop
          logos={[...projectScreenshots, ...projectScreenshots].map(({ src, label }, i) => ({
            node: (
              <div key={i} style={{ width: 200, height: 112, borderRadius: 10, border: '1px solid rgba(255,255,255,0.07)', overflow: 'hidden', flexShrink: 0 }}>
                <img src={src} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block', opacity: 0.6 }} />
              </div>
            )
          }))}
          logoHeight={112} speed={45} direction="left" gap={12} fadeOut
        />
        <div style={{ marginTop: 12 }}>
          <LogoLoop
            logos={[...[...projectScreenshots].reverse(), ...[...projectScreenshots].reverse()].map(({ src, label }, i) => ({
              node: (
                <div key={i} style={{ width: 200, height: 112, borderRadius: 10, border: '1px solid rgba(255,255,255,0.07)', overflow: 'hidden', flexShrink: 0 }}>
                  <img src={src} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block', opacity: 0.4 }} />
                </div>
              )
            }))}
            logoHeight={112} speed={35} direction="right" gap={12} fadeOut
          />
        </div>
      </section>

      {/* Timeline */}
      <section style={{ padding: '100px 24px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ marginBottom: 56 }}>
            <Pill>Our Journey</Pill>
            <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(32px, 5vw, 52px)', letterSpacing: '-0.03em', color: '#fff', margin: 0, lineHeight: 1.1 }}>
              Built year<br />
              <span style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', backgroundImage: 'linear-gradient(135deg, #5B8AF7, #8B5CF6)' }}>by year.</span>
            </h2>
          </motion.div>
          <div style={{ maxWidth: 680, display: 'flex', flexDirection: 'column', gap: 0 }}>
            {timeline.map((item, i) => (
              <motion.div key={item.year} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.06 }}
                style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'linear-gradient(135deg, #5B8AF7, #8B5CF6)', marginTop: 20, flexShrink: 0 }} />
                  {i < timeline.length - 1 && <div style={{ width: 1, flex: 1, minHeight: 40, background: 'linear-gradient(to bottom, rgba(91,138,247,0.3), transparent)' }} />}
                </div>
                <div style={{ padding: '14px 0', paddingBottom: 20 }}>
                  <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: 12, color: '#5B8AF7', marginBottom: 4, letterSpacing: '0.05em' }}>{item.year}</div>
                  <div style={{ fontFamily: 'var(--font-outfit)', fontSize: 14.5, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }}>{item.event}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <Team />

      {/* CTA */}
      <section style={{ padding: '100px 24px', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 500, height: 300, borderRadius: '50%', pointerEvents: 'none', background: 'radial-gradient(ellipse, rgba(91,138,247,0.1), transparent 70%)', filter: 'blur(50px)' }} />
        <div style={{ maxWidth: 580, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <Pill>Let's build together</Pill>
            <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(32px, 6vw, 60px)', letterSpacing: '-0.03em', color: '#fff', margin: '0 0 18px', lineHeight: 1.05 }}>
              Ready to work with a<br />
              <span style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', backgroundImage: 'linear-gradient(135deg, #5B8AF7, #8B5CF6)' }}>team that ships?</span>
            </h2>
            <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 16, color: 'rgba(255,255,255,0.42)', lineHeight: 1.7, margin: '0 0 36px' }}>
              Free 30-minute discovery call. No pitch, no commitment — just a clear conversation about what you're building.
            </p>
            <a href="/contact" style={{ textDecoration: 'none' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 32px', borderRadius: 99, background: 'linear-gradient(135deg, #5B8AF7, #8B5CF6)', fontFamily: 'var(--font-outfit)', fontWeight: 600, fontSize: 15, color: '#fff', cursor: 'pointer', boxShadow: '0 8px 32px rgba(91,138,247,0.28)' }}>
                Start a Conversation <ArrowRight size={16} />
              </span>
            </a>
          </motion.div>
        </div>
      </section>
    </>
  )
}
