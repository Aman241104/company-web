'use client'
import { motion } from 'framer-motion'
import { Search, Lightbulb, Code2, Rocket } from 'lucide-react'

const steps = [
  { num: '01', icon: Search, title: 'Discover', desc: "A deep-dive into your business goals, users, and constraints. We leave with a written product brief — so everyone agrees on what we're building before a line of code is written." },
  { num: '02', icon: Lightbulb, title: 'Design', desc: 'Wireframes and interactive prototypes first, pixels second. You click through the product before we build it — catching expensive assumptions early.' },
  { num: '03', icon: Code2, title: 'Develop', desc: "Weekly sprint reviews, a shared staging environment, and CI/CD from day one. You always know what's done, what's next, and what's blocking." },
  { num: '04', icon: Rocket, title: 'Deploy & Scale', desc: 'We handle launch, monitoring, and the first 90 days of iteration. Most clients stay on retainer because shipping is where the real work begins.' },
]

export default function Process() {
  return (
    <section id="process" style={{ padding: '100px 24px', maxWidth: 1140, margin: '0 auto' }}>
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: 72 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 14px', borderRadius: 99, marginBottom: 20, border: '1px solid rgba(91,138,247,0.25)', background: 'rgba(91,138,247,0.07)', fontFamily: 'var(--font-outfit)', fontSize: 12, color: 'rgba(91,138,247,0.85)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#5B8AF7', display: 'inline-block' }} />
          How we work
        </span>
        <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(32px, 5vw, 52px)', letterSpacing: '-0.03em', color: '#fff', margin: '0 0 16px', lineHeight: 1.1 }}>
          A playbook refined<br />
          <span style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', backgroundImage: 'linear-gradient(135deg, #5B8AF7, #8B5CF6)' }}>across 150+ projects.</span>
        </h2>
        <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 16, color: 'rgba(255,255,255,0.4)', maxWidth: 440, margin: '0 auto' }}>
          No surprises, no scope creep, no "we'll fix it post-launch." Just a clear process that puts you in control from day one.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: 2, position: 'relative' }}>
        {/* Connecting line */}
        <div style={{ position: 'absolute', top: 36, left: '12.5%', right: '12.5%', height: 1, background: 'linear-gradient(90deg, rgba(91,138,247,0.15), rgba(139,92,246,0.15))' }} className="hidden md:block" />
        {steps.map((step, i) => {
          const Icon = step.icon
          return (
            <motion.div key={step.num} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.1 }} style={{ padding: '0 12px', textAlign: 'center' }}>
              <div style={{ width: 72, height: 72, borderRadius: '50%', margin: '0 auto 20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(91,138,247,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <div style={{ position: 'absolute', top: -8, right: -8, width: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(135deg, #5B8AF7, #8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: 9.5, color: '#fff' }}>
                  {step.num}
                </div>
                <Icon size={24} color="#5B8AF7" />
              </div>
              <h3 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: 17, color: '#fff', margin: '0 0 10px', letterSpacing: '-0.02em' }}>{step.title}</h3>
              <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 13.5, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>{step.desc}</p>
            </motion.div>
          )
        })}
      </div>

      {/* CTA strip */}
      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }} style={{ marginTop: 56, padding: '28px 32px', background: 'rgba(91,138,247,0.05)', border: '1px solid rgba(91,138,247,0.12)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: 18, color: '#fff', marginBottom: 4 }}>Want to see how this works for your project?</div>
          <div style={{ fontFamily: 'var(--font-outfit)', fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>Free 30-minute discovery call. We assess scope, risks, and timeline — honestly.</div>
        </div>
        <a href="#contact" style={{ textDecoration: 'none' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 99, background: 'linear-gradient(135deg, #5B8AF7, #8B5CF6)', fontFamily: 'var(--font-outfit)', fontWeight: 600, fontSize: 14, color: '#fff', cursor: 'pointer', whiteSpace: 'nowrap' }}>
            Book a Call
          </span>
        </a>
      </motion.div>
    </section>
  )
}
