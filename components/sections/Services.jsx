'use client'
import { motion } from 'framer-motion'
import { Monitor, Code2, Smartphone, TrendingUp, Search, Cloud } from 'lucide-react'
import { HighlightGroup, HighlighterItem } from '@/components/ui/highlighter'

const Pill = ({ children }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 14px', borderRadius: 99, marginBottom: 20, border: '1px solid rgba(91,138,247,0.25)', background: 'rgba(91,138,247,0.07)', fontFamily: 'var(--font-outfit)', fontSize: 12, color: 'rgba(91,138,247,0.85)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
    <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#5B8AF7', display: 'inline-block' }} />
    {children}
  </span>
)

function WebMock() {
  return (
    <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 8, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ padding: '7px 10px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: 5 }}>
        {['#FF5F57','#FEBC2E','#28C840'].map(c => <div key={c} style={{ width: 7, height: 7, borderRadius: '50%', background: c, opacity: 0.7 }} />)}
      </div>
      <div style={{ padding: '10px' }}>
        <div style={{ height: 8, width: '70%', background: 'rgba(91,138,247,0.25)', borderRadius: 3, marginBottom: 6 }} />
        <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
          {['40%', '30%', '20%'].map(w => <div key={w} style={{ height: 5, width: w, background: 'rgba(255,255,255,0.08)', borderRadius: 2 }} />)}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
          {[0,1,2,3].map(i => <div key={i} style={{ height: 36, background: 'rgba(255,255,255,0.04)', borderRadius: 6, border: '1px solid rgba(255,255,255,0.06)' }} />)}
        </div>
      </div>
    </div>
  )
}

function MobileMock() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: 100, background: 'rgba(0,0,0,0.4)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.1)', padding: '8px 6px' }}>
        <div style={{ height: 6, width: 40, background: 'rgba(255,255,255,0.1)', borderRadius: 3, margin: '0 auto 8px' }} />
        <div style={{ background: 'rgba(91,138,247,0.12)', borderRadius: 10, padding: '8px 6px' }}>
          <div style={{ height: 5, width: '80%', background: 'rgba(91,138,247,0.4)', borderRadius: 2, marginBottom: 4 }} />
          <div style={{ height: 4, width: '60%', background: 'rgba(255,255,255,0.1)', borderRadius: 2, marginBottom: 8 }} />
          <div style={{ height: 24, background: 'rgba(91,138,247,0.2)', borderRadius: 6, marginBottom: 6 }} />
          <div style={{ height: 18, background: 'rgba(255,255,255,0.04)', borderRadius: 6, marginBottom: 4 }} />
          <div style={{ height: 18, background: 'rgba(255,255,255,0.04)', borderRadius: 6 }} />
        </div>
      </div>
    </div>
  )
}

function ChartMock() {
  const vals = [40, 65, 48, 80, 58, 95, 72]
  return (
    <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 8, padding: 10, border: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-outfit)', marginBottom: 8 }}>Campaign ROAS</div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 50 }}>
        {vals.map((h, i) => <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: '3px 3px 0 0', background: i === 6 ? 'linear-gradient(180deg, #5B8AF7, #8B5CF6)' : 'rgba(91,138,247,0.2)' }} />)}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
        {['M','T','W','T','F','S','S'].map((d, i) => <span key={i} style={{ fontSize: 8, color: 'rgba(255,255,255,0.18)', fontFamily: 'var(--font-outfit)' }}>{d}</span>)}
      </div>
    </div>
  )
}

function CodeMock() {
  const lines = [
    { t: 'async function deploy(app)', c: '#5B8AF7' },
    { t: '  const build = await compile()', c: 'rgba(255,255,255,0.4)' },
    { t: '  await run(tests)', c: 'rgba(255,255,255,0.3)' },
    { t: '  return push(build) ✓', c: '#34D399' },
  ]
  return (
    <div style={{ background: 'rgba(0,0,0,0.5)', borderRadius: 8, padding: '10px 12px', fontFamily: 'monospace', border: '1px solid rgba(255,255,255,0.06)' }}>
      {lines.map((l, i) => <div key={i} style={{ fontSize: 10, color: l.c, lineHeight: 1.8 }}>{l.t}</div>)}
    </div>
  )
}

const services = [
  { icon: Monitor, title: 'Website Development', desc: 'Fast, conversion-focused websites — from marketing pages to Shopify stores. Built to load in under 2 seconds, rank on Google, and turn visitors into paying customers.', tags: ['React', 'Next.js', 'Shopify'], mock: <WebMock /> },
  { icon: Smartphone, title: 'Mobile Apps', desc: 'Cross-platform iOS & Android apps shipped faster than native — without the quality compromise. Built with React Native by a team with 20+ live apps and 4.8+ store ratings.', tags: ['React Native', 'iOS', 'Android'], mock: <MobileMock /> },
  { icon: Code2, title: 'Software Development', desc: 'Robust APIs, microservices, and full-stack applications built for production. Clean code, automated tests, CI/CD from day one — systems that teams can actually maintain.', tags: ['Node.js', 'Python', 'PostgreSQL'], mock: <CodeMock /> },
  { icon: TrendingUp, title: 'Performance Marketing', desc: 'Meta and Google campaigns built on rigorous A/B testing and smart audience segmentation. We manage ₹5Cr+ in ad spend and optimise relentlessly until the ROAS makes sense.', tags: ['Meta Ads', 'Google Ads', 'Analytics'], mock: <ChartMock /> },
  { icon: Search, title: 'SEO Optimization', desc: 'Technical audits, content strategy, and link acquisition that move rankings — not vanity metrics. We focus exclusively on the keywords that drive qualified traffic and revenue.', tags: ['Technical SEO', 'Content', 'Link Building'], mock: null },
  { icon: Cloud, title: 'SaaS Products', desc: 'From product strategy through multi-tenant architecture to billing and auth — we build SaaS platforms founders can pitch with confidence and scale without re-engineering.', tags: ['SaaS', 'Cloud', 'Multi-tenant'], mock: null },
]

function ServiceCard({ service, index }) {
  const { icon: Icon, title, desc, tags, mock } = service
  return (
    <HighlighterItem className="rounded-2xl">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: index * 0.07 }}
        style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 28, position: 'relative', transition: 'border-color 0.3s' }}
        onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(91,138,247,0.25)'}
        onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: mock ? 16 : 12 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(91,138,247,0.1)', border: '1px solid rgba(91,138,247,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Icon size={17} color="#5B8AF7" />
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            {tags.map(t => <span key={t} style={{ fontFamily: 'var(--font-outfit)', fontSize: 10.5, color: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.05)', padding: '3px 8px', borderRadius: 99, border: '1px solid rgba(255,255,255,0.07)' }}>{t}</span>)}
          </div>
        </div>
        <h3 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: 17, color: '#fff', margin: '0 0 8px', letterSpacing: '-0.02em' }}>{title}</h3>
        <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 13.5, color: 'rgba(255,255,255,0.52)', lineHeight: 1.65, margin: '0 0 16px' }}>{desc}</p>
        {mock && <div>{mock}</div>}
      </motion.div>
    </HighlighterItem>
  )
}

export default function Services() {
  return (
    <section id="services" style={{ padding: '100px 24px', maxWidth: 1140, margin: '0 auto' }}>
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: 64 }}>
        <Pill>What we do</Pill>
        <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(32px, 5vw, 54px)', letterSpacing: '-0.03em', color: '#fff', margin: '0 0 16px', lineHeight: 1.1 }}>
          One team, every layer.<br />
          <span style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', backgroundImage: 'linear-gradient(135deg, #5B8AF7, #8B5CF6)' }}>From pixels to pipelines.</span>
        </h2>
        <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 16, color: 'rgba(255,255,255,0.45)', maxWidth: 480, margin: '0 auto' }}>
          Six disciplines, one accountable team. No handoffs to agencies you've never met — we own the outcome end to end.
        </p>
      </motion.div>

      <HighlightGroup className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 14, marginBottom: 14 }}>
        {services.slice(0, 4).map((s, i) => <ServiceCard key={s.title} service={s} index={i} />)}
      </HighlightGroup>
      <HighlightGroup className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 14 }}>
        {services.slice(4).map((s, i) => <ServiceCard key={s.title} service={s} index={i + 4} />)}
      </HighlightGroup>
    </section>
  )
}
