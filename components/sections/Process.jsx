'use client'
import { motion } from 'framer-motion'
import { Search, Lightbulb, Code2, Rocket } from 'lucide-react'
import RadialOrbitalTimeline from '@/components/ui/radial-orbital-timeline'

const processSteps = [
  {
    id: 1, title: 'Discover', date: 'Week 1–2',
    content: "Deep-dive into your business goals, users, and constraints. We leave with a written product brief — so everyone agrees on what we're building before a line of code is written.",
    category: 'Discovery', icon: Search, relatedIds: [2], status: 'completed', energy: 100,
  },
  {
    id: 2, title: 'Design', date: 'Week 2–4',
    content: 'Wireframes and interactive prototypes first, pixels second. You click through the product before we build it — catching expensive assumptions early.',
    category: 'Design', icon: Lightbulb, relatedIds: [1, 3], status: 'completed', energy: 88,
  },
  {
    id: 3, title: 'Develop', date: 'Week 3–16',
    content: "Weekly sprint reviews, shared staging environment, and CI/CD from day one. You always know what's done, what's next, and what's blocking.",
    category: 'Development', icon: Code2, relatedIds: [2, 4], status: 'in-progress', energy: 72,
  },
  {
    id: 4, title: 'Deploy', date: 'Week 8+',
    content: 'We handle launch, monitoring, and the first 90 days of iteration. Most clients stay on retainer because shipping is where the real work begins.',
    category: 'Deployment', icon: Rocket, relatedIds: [3], status: 'pending', energy: 55,
  },
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

      <RadialOrbitalTimeline timelineData={processSteps} />

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
