'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Globe, Code2, Smartphone, Package, TrendingUp, Search, ArrowRight, Check } from 'lucide-react'

const Pill = ({ children }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 14px', borderRadius: 99, marginBottom: 20, border: '1px solid rgba(91,138,247,0.25)', background: 'rgba(91,138,247,0.07)', fontFamily: 'var(--font-outfit)', fontSize: 12, color: 'rgba(91,138,247,0.85)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
    <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#5B8AF7', display: 'inline-block', animation: 'opacity-glow 2s ease-in-out infinite alternate' }} />
    {children}
  </span>
)

const services = [
  {
    num: '01', icon: Globe, title: 'Website Development',
    subtitle: 'High-performance websites engineered to convert.',
    features: [
      'Next.js App Router with <2s LCP guaranteed',
      'Conversion-optimised UX & A/B testing ready',
      'CMS integration (Sanity, Contentful, Strapi)',
      'Core Web Vitals 90+ scores out of the box',
      'Multi-language & internationalisation support',
      'Accessibility (WCAG 2.1 AA) compliance',
      'Custom animation & micro-interactions',
      'Analytics, heatmaps & conversion tracking',
    ],
    deliverables: ['Figma Design', 'Next.js Codebase', 'CMS Setup', 'SEO Foundation'],
    timeline: '4–8 weeks',
    pricing: '₹80K+',
    tags: ['Next.js', 'React', 'CMS', 'Core Web Vitals'],
    caseStudy: { title: 'Silver Spoon by ACJ', result: '+280% online orders in first 3 months' },
  },
  {
    num: '02', icon: Code2, title: 'Software Development',
    subtitle: 'Custom backends and APIs built for scale and longevity.',
    features: [
      'Microservices & event-driven architecture',
      'REST & GraphQL API design and documentation',
      'Real-time features with WebSockets',
      'Background job processing and queuing',
      'Database design, indexing & optimisation',
      'Automated testing — unit, integration, E2E',
      'CI/CD pipelines & DevOps from day one',
      'Cloud-native infrastructure (AWS/GCP)',
    ],
    deliverables: ['API Docs', 'Clean Codebase', 'Test Suite', 'Deployment Pipeline'],
    timeline: '6–16 weeks',
    pricing: '₹1.5L+',
    tags: ['Node.js', 'Python', 'Microservices', 'GraphQL'],
    caseStudy: { title: 'FruitManager ERP', result: '3M+ daily transactions at 99.9% uptime' },
  },
  {
    num: '03', icon: Smartphone, title: 'Mobile App Development',
    subtitle: 'Cross-platform iOS & Android apps users actually love.',
    features: [
      'React Native & Flutter development',
      'Native performance with a shared codebase',
      'Offline-first architecture with local data sync',
      'Push notifications & deep linking',
      'In-app purchases & subscription billing',
      'App Store & Play Store submission handled',
      'App Store Optimisation (ASO) strategy',
      'Crash analytics and real-time monitoring',
    ],
    deliverables: ['iOS & Android App', 'ASO Strategy', 'App Store Listings', 'Analytics Setup'],
    timeline: '8–20 weeks',
    pricing: '₹2L+',
    tags: ['React Native', 'Flutter', 'iOS', 'Android'],
    caseStudy: { title: 'ZingBliss App', result: '18K active users, 4.8★ on both stores' },
  },
  {
    num: '04', icon: Package, title: 'SaaS Product Development',
    subtitle: 'End-to-end SaaS from architecture to 10,000+ users.',
    features: [
      'Multi-tenant architecture design from the start',
      'Authentication & role-based access control',
      'Subscription billing with Stripe or Razorpay',
      'Admin dashboard, analytics & usage reporting',
      'Usage metering, plan limits & feature flags',
      'Onboarding flows and activation sequences',
      'Customer success tooling and email automation',
      'Scalable to 50K+ users without a rewrite',
    ],
    deliverables: ['SaaS Platform', 'Billing Setup', 'Admin Panel', 'Documentation'],
    timeline: '12–24 weeks',
    pricing: '₹5L+',
    tags: ['Multi-Tenant', 'Stripe', 'Auth', 'Infra'],
    caseStudy: { title: 'ViboERP', result: 'Our own product — 200+ SME clients' },
  },
  {
    num: '05', icon: TrendingUp, title: 'Performance Marketing',
    subtitle: 'Campaigns engineered around ROAS, not vanity metrics.',
    features: [
      'Google Search, Shopping & Display Ads',
      'Meta (Facebook & Instagram) Ads',
      'LinkedIn B2B campaigns',
      'Full-funnel strategy from awareness to close',
      'Landing page optimisation for conversion',
      'Multi-touch attribution setup and reporting',
      'Weekly performance reports with commentary',
      'Creative production & rigorous A/B testing',
    ],
    deliverables: ['Ad Strategy', 'Campaign Setup', 'Creative Assets', 'Attribution Dashboard'],
    timeline: '30-day onboarding, then ongoing',
    pricing: '₹30K/mo + ad spend',
    tags: ['Google Ads', 'Meta Ads', 'LinkedIn', 'Attribution'],
    caseStudy: { title: 'LuxeLiving Campaigns', result: '4.4× ROAS, 2.8× lead volume in 90 days' },
  },
  {
    num: '06', icon: Search, title: 'Search Engine Optimisation',
    subtitle: 'Rankings that compound into revenue, not just traffic.',
    features: [
      'Full technical SEO audit and remediation',
      'Core Web Vitals & page speed optimisation',
      'Content strategy with keyword cluster architecture',
      'Long-form content creation by subject experts',
      'E-E-A-T signal building and entity optimisation',
      'Schema markup & structured data implementation',
      'Link building — white-hat, editorial placements',
      'Monthly ranking, traffic & revenue attribution reports',
    ],
    deliverables: ['SEO Audit', 'Keyword Strategy', 'Content Calendar', 'Monthly Reports'],
    timeline: '3–6 months to see results',
    pricing: '₹25K/mo',
    tags: ['Technical SEO', 'Content', 'Link Building', 'Schema'],
    caseStudy: { title: 'Chahana Dental', result: '#1 for 12 local keywords in 3 months' },
  },
]

function ServiceCard({ svc, index }) {
  const Icon = svc.icon
  return (
    <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.05 }}
      style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, overflow: 'hidden', position: 'relative', transition: 'border-color 0.3s' }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(91,138,247,0.25)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}>
      <div style={{ height: 2, background: 'linear-gradient(90deg, #5B8AF7, #8B5CF6, transparent)' }} />
      <div style={{ padding: '32px 28px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 46, height: 46, borderRadius: 12, background: 'rgba(91,138,247,0.1)', border: '1px solid rgba(91,138,247,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon size={20} color="#5B8AF7" />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-outfit)', fontSize: 10, color: 'rgba(91,138,247,0.6)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 3 }}>{svc.num}</div>
              <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(18px, 2.5vw, 22px)', color: '#fff', margin: 0, letterSpacing: '-0.02em', lineHeight: 1.2 }}>{svc.title}</h2>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            {svc.tags.map(t => (
              <span key={t} style={{ fontFamily: 'var(--font-outfit)', fontSize: 10, color: 'rgba(91,138,247,0.7)', background: 'rgba(91,138,247,0.07)', padding: '3px 10px', borderRadius: 99, border: '1px solid rgba(91,138,247,0.15)' }}>{t}</span>
            ))}
          </div>
        </div>

        <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 14.5, color: 'rgba(255,255,255,0.45)', lineHeight: 1.65, margin: '0 0 28px' }}>{svc.subtitle}</p>

        {/* Two-column layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', gap: 28 }} className="service-card-grid">
          {/* Features */}
          <div>
            <div style={{ fontFamily: 'var(--font-outfit)', fontSize: 10, color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 12 }}>What's included</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {svc.features.map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <div style={{ width: 18, height: 18, borderRadius: '50%', flexShrink: 0, background: 'rgba(91,138,247,0.1)', border: '1px solid rgba(91,138,247,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Check size={10} color="#5B8AF7" strokeWidth={3} />
                  </div>
                  <span style={{ fontFamily: 'var(--font-outfit)', fontSize: 13.5, color: 'rgba(255,255,255,0.65)' }}>{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ padding: '14px 16px', borderRadius: 12, background: 'rgba(91,138,247,0.06)', border: '1px solid rgba(91,138,247,0.12)' }}>
              <div style={{ fontFamily: 'var(--font-outfit)', fontSize: 10, color: 'rgba(91,138,247,0.6)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 5 }}>Timeline</div>
              <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 600, fontSize: 14, color: '#fff' }}>{svc.timeline}</div>
            </div>
            <div style={{ padding: '14px 16px', borderRadius: 12, background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div style={{ fontFamily: 'var(--font-outfit)', fontSize: 10, color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 5 }}>Starting At</div>
              <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 18, color: '#fff', letterSpacing: '-0.02em' }}>{svc.pricing}</div>
            </div>
            <div style={{ padding: '14px 16px', borderRadius: 12, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontFamily: 'var(--font-outfit)', fontSize: 10, color: 'rgba(255,255,255,0.22)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 8 }}>Case Study</div>
              <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 600, fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 4 }}>{svc.caseStudy.title}</div>
              <div style={{ fontFamily: 'var(--font-outfit)', fontSize: 13, color: '#5B8AF7' }}>{svc.caseStudy.result}</div>
            </div>
            <div style={{ padding: '14px 16px', borderRadius: 12, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontFamily: 'var(--font-outfit)', fontSize: 10, color: 'rgba(255,255,255,0.22)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 10 }}>Deliverables</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {svc.deliverables.map(d => (
                  <div key={d} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#5B8AF7', flexShrink: 0 }} />
                    <span style={{ fontFamily: 'var(--font-outfit)', fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>{d}</span>
                  </div>
                ))}
              </div>
            </div>
            <a href="/contact" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '13px', borderRadius: 12, background: 'linear-gradient(135deg, #5B8AF7, #8B5CF6)', fontFamily: 'var(--font-outfit)', fontWeight: 600, fontSize: 14, color: '#fff', boxShadow: '0 4px 20px rgba(91,138,247,0.25)' }}>
              Get a Quote <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 768px) { .service-card-grid { grid-template-columns: 1fr !important; } }`}</style>
    </motion.div>
  )
}

export default function ServicesPage() {
  const [stars, setStars] = useState([])
  useEffect(() => {
    setStars(Array.from({ length: 40 }, (_, i) => ({
      id: i, x: Math.random() * 100, y: Math.random() * 100,
      size: Math.random() * 1.5 + 0.4, opacity: Math.random() * 0.4 + 0.06, dur: 2 + Math.random() * 3,
    })))
  }, [])

  return (
    <>
      {/* Hero */}
      <section style={{ position: 'relative', paddingTop: 140, paddingBottom: 80, textAlign: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          {stars.map(s => (
            <div key={s.id} style={{ position: 'absolute', left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size, borderRadius: '50%', background: '#fff', opacity: s.opacity, animation: `opacity-glow ${s.dur}s ease-in-out infinite alternate` }} />
          ))}
        </div>
        <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 400, borderRadius: '50%', pointerEvents: 'none', background: 'radial-gradient(ellipse, rgba(91,138,247,0.14) 0%, rgba(139,92,246,0.08) 45%, transparent 70%)', filter: 'blur(60px)' }} />

        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
            <Pill>Full-Service Digital Studio</Pill>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(40px, 8vw, 80px)', lineHeight: 1.05, letterSpacing: '-0.03em', color: '#fff', margin: '0 0 24px' }}>
            Everything you need<br />
            <span style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', backgroundImage: 'linear-gradient(135deg, #5B8AF7, #8B5CF6)' }}>to dominate.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontFamily: 'var(--font-outfit)', fontSize: 17, color: 'rgba(255,255,255,0.45)', lineHeight: 1.65, maxWidth: 560, margin: '0 auto' }}>
            Six service lines, one accountable team. No handoffs to agencies you've never met — we own the outcome end to end.
          </motion.p>
        </div>
      </section>

      {/* Services */}
      <section style={{ padding: '24px 24px 100px' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {services.map((svc, i) => <ServiceCard key={svc.num} svc={svc} index={i} />)}
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ padding: '80px 24px 100px', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 400, height: 300, borderRadius: '50%', pointerEvents: 'none', background: 'radial-gradient(ellipse, rgba(91,138,247,0.1), transparent 70%)', filter: 'blur(50px)' }} />
        <div style={{ maxWidth: 600, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <Pill>Not sure which service fits?</Pill>
            <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(30px, 5vw, 48px)', letterSpacing: '-0.03em', color: '#fff', margin: '0 0 16px', lineHeight: 1.1 }}>
              Let's find the right<br />
              <span style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', backgroundImage: 'linear-gradient(135deg, #5B8AF7, #8B5CF6)' }}>approach together.</span>
            </h2>
            <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 15, color: 'rgba(255,255,255,0.42)', lineHeight: 1.7, margin: '0 0 32px' }}>
              Free 30-minute discovery call. We'll listen to your goals and recommend the right approach — no sales pitch, no commitment.
            </p>
            <a href="/contact" style={{ textDecoration: 'none' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 32px', borderRadius: 99, background: 'linear-gradient(135deg, #5B8AF7, #8B5CF6)', fontFamily: 'var(--font-outfit)', fontWeight: 600, fontSize: 15, color: '#fff', cursor: 'pointer', boxShadow: '0 8px 32px rgba(91,138,247,0.28)' }}>
                Book Free Discovery Call <ArrowRight size={15} />
              </span>
            </a>
          </motion.div>
        </div>
      </section>
    </>
  )
}
