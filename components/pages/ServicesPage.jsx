'use client'
import { useRef, useState } from 'react'
import { Globe, Code2, Smartphone, Package, TrendingUp, Search, ArrowUpRight, Check } from 'lucide-react'
import GradientText from '@/components/ui/reactbits/GradientText'
import LightRays from '@/components/ui/reactbits/LightRays'
import BorderGlow from '@/components/ui/reactbits/BorderGlow'
import GradualBlur from '@/components/ui/reactbits/GradualBlur'

const services = [
  {
    number: '01', icon: Globe, title: 'Website Development',
    subtitle: 'High-performance websites engineered to convert.',
    accent: '#60a5fa', accentRgb: '96,165,250',
    bg: 'linear-gradient(135deg, #060d1a 0%, #091428 100%)',
    features: [
      'Next.js App Router with <2s LCP guaranteed',
      'Conversion-optimised UX & A/B testing',
      'CMS integration (Sanity, Contentful, Strapi)',
      'Core Web Vitals 90+ scores',
      'Multi-language & internationalisation',
      'Accessibility (WCAG 2.1 AA)',
      'Custom animation & interactions',
      'Analytics & heat-mapping setup',
    ],
    deliverables: ['Figma Design', 'Next.js Codebase', 'CMS Setup', 'SEO Foundation'],
    timeline: '4–8 weeks',
    pricing: '₹80K+',
    tags: ['Next.js', 'React', 'CMS', 'Core Web Vitals'],
    caseStudy: { title: 'Silver Spoon by ACJ', result: '+280% online orders in first 3 months' },
  },
  {
    number: '02', icon: Code2, title: 'Software Development',
    subtitle: 'Custom backends and APIs built for scale and longevity.',
    accent: '#34d399', accentRgb: '52,211,153',
    bg: 'linear-gradient(135deg, #020e09 0%, #051410 100%)',
    features: [
      'Microservices & event-driven architecture',
      'REST & GraphQL API design',
      'Real-time features with WebSockets',
      'Background job processing',
      'Database design & optimisation',
      'Automated testing (unit, integration, E2E)',
      'CI/CD pipelines & DevOps',
      'Cloud-native infrastructure (AWS/GCP)',
    ],
    deliverables: ['API Docs', 'Clean Codebase', 'Test Suite', 'Deployment Pipeline'],
    timeline: '6–16 weeks',
    pricing: '₹1.5L+',
    tags: ['Node.js', 'Python', 'Microservices', 'GraphQL'],
    caseStudy: { title: 'FruitManager ERP', result: '3M+ daily transactions at 99.9% uptime' },
  },
  {
    number: '03', icon: Smartphone, title: 'Mobile App Development',
    subtitle: 'Cross-platform iOS & Android apps users love.',
    accent: '#c084fc', accentRgb: '192,132,252',
    bg: 'linear-gradient(135deg, #0d0614 0%, #150820 100%)',
    features: [
      'React Native & Flutter development',
      'Native performance with shared codebase',
      'Offline-first with local data sync',
      'Push notifications & deep linking',
      'In-app purchases & subscription billing',
      'App Store & Play Store submission',
      'App Store Optimisation (ASO)',
      'Crash analytics & monitoring',
    ],
    deliverables: ['iOS & Android App', 'ASO Strategy', 'App Store Listings', 'Analytics Setup'],
    timeline: '8–20 weeks',
    pricing: '₹2L+',
    tags: ['React Native', 'Flutter', 'iOS', 'Android'],
    caseStudy: { title: 'ZingBliss App', result: '18K active users, 4.8★ on both stores' },
  },
  {
    number: '04', icon: Package, title: 'SaaS Product Development',
    subtitle: 'End-to-end SaaS from architecture to 10,000+ users.',
    accent: '#fbbf24', accentRgb: '251,191,36',
    bg: 'linear-gradient(135deg, #130e00 0%, #1a1000 100%)',
    features: [
      'Multi-tenant architecture design',
      'Authentication & role-based access',
      'Subscription billing with Stripe',
      'Admin dashboard & analytics',
      'Usage metering & limits',
      'Onboarding & activation flows',
      'Customer success tooling',
      'Scalable to 50K+ users without rewrite',
    ],
    deliverables: ['SaaS Platform', 'Billing Setup', 'Admin Panel', 'Documentation'],
    timeline: '12–24 weeks',
    pricing: '₹5L+',
    tags: ['Multi-Tenant', 'Stripe', 'Auth', 'Infra'],
    caseStudy: { title: 'ViboERP', result: 'Our own product — 200+ SME clients' },
  },
  {
    number: '05', icon: TrendingUp, title: 'Performance Marketing',
    subtitle: 'Campaigns engineered around ROAS, not vanity metrics.',
    accent: '#f87171', accentRgb: '248,113,113',
    bg: 'linear-gradient(135deg, #140505 0%, #1a0808 100%)',
    features: [
      'Google Search, Shopping & Display Ads',
      'Meta (Facebook & Instagram) Ads',
      'LinkedIn B2B campaigns',
      'Full-funnel strategy from awareness to close',
      'Landing page optimisation for conversion',
      'Multi-touch attribution setup',
      'Weekly performance reporting',
      'Creative production & testing',
    ],
    deliverables: ['Ad Strategy', 'Campaign Setup', 'Creative Assets', 'Attribution Dashboard'],
    timeline: '30-day onboarding, ongoing',
    pricing: '₹30K/mo + ad spend',
    tags: ['Google Ads', 'Meta Ads', 'LinkedIn', 'Attribution'],
    caseStudy: { title: 'LuxeLiving Campaigns', result: '4.4× ROAS, 2.8× lead volume in 90 days' },
  },
  {
    number: '06', icon: Search, title: 'Search Engine Optimisation',
    subtitle: 'Rankings that compound into revenue, not just traffic.',
    accent: '#a78bfa', accentRgb: '167,139,250',
    bg: 'linear-gradient(135deg, #080614 0%, #0d091a 100%)',
    features: [
      'Full technical SEO audit & remediation',
      'Core Web Vitals & page speed optimisation',
      'Content strategy & cluster architecture',
      'Long-form content creation',
      'E-E-A-T signal building',
      'Schema markup & structured data',
      'Link building (white-hat, editorial)',
      'Monthly ranking & traffic reports',
    ],
    deliverables: ['SEO Audit', 'Keyword Strategy', 'Content Calendar', 'Monthly Reports'],
    timeline: '3–6 months to see results',
    pricing: '₹25K/mo',
    tags: ['Technical SEO', 'Content', 'Link Building', 'Schema'],
    caseStudy: { title: 'Chahana Dental', result: '#1 for 12 local keywords in 3 months' },
  },
]

function ServiceDetail({ svc }) {
  const [hovered, setHovered] = useState(false)
  const Icon = svc.icon

  return (
    <BorderGlow
      glowColor={`rgba(${svc.accentRgb},0.4)`}
      borderColor={hovered ? `rgba(${svc.accentRgb},0.2)` : 'rgba(255,255,255,0.06)'}
      borderRadius="1.25rem"
      backgroundColor="transparent"
      glowIntensity={hovered ? 0.8 : 0}
    >
      <div
        className="rounded-[1.25rem] overflow-hidden"
        style={{ background: svc.bg }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Top bar */}
        <div style={{ height: 2, background: `linear-gradient(90deg, ${svc.accent}60, transparent)` }} />

        <div className="p-5 sm:p-8 md:p-10">
          {/* Header row */}
          <div className="flex items-start justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <div style={{
                width: 48, height: 48, borderRadius: '0.875rem', flexShrink: 0,
                background: `rgba(${svc.accentRgb},0.12)`, border: `1px solid rgba(${svc.accentRgb},0.25)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon size={22} color={svc.accent} />
              </div>
              <div>
                <div style={{ color: `rgba(${svc.accentRgb},0.7)`, fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 4 }}>{svc.number}</div>
                <h2 style={{ color: 'white', fontWeight: 800, fontSize: 'clamp(1.3rem,2.5vw,1.8rem)', fontFamily: 'var(--font-poppins)', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                  {svc.title}
                </h2>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap justify-end">
              {svc.tags.map(t => (
                <span key={t} style={{ fontSize: '0.65rem', padding: '3px 10px', borderRadius: 9999, background: `rgba(${svc.accentRgb},0.08)`, color: svc.accent, border: `1px solid rgba(${svc.accentRgb},0.15)` }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          <p style={{ color: 'rgba(255,255,255,0.4)', marginBottom: 28, fontSize: '1rem', lineHeight: 1.7 }}>{svc.subtitle}</p>

          {/* Two-col: features + sidebar */}
          <div className="grid md:grid-cols-[1fr_280px] gap-6 md:gap-8">
            {/* Features list */}
            <div>
              <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 14 }}>What's included</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {svc.features.map((f) => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <div style={{ width: 18, height: 18, borderRadius: '50%', flexShrink: 0, background: `rgba(${svc.accentRgb},0.1)`, border: `1px solid rgba(${svc.accentRgb},0.25)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Check size={10} color={svc.accent} strokeWidth={3} />
                    </div>
                    <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="flex flex-col gap-4">
              {/* Timeline */}
              <div style={{ padding: 16, borderRadius: '0.875rem', background: `rgba(${svc.accentRgb},0.05)`, border: `1px solid rgba(${svc.accentRgb},0.12)` }}>
                <p style={{ color: `rgba(${svc.accentRgb},0.7)`, fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 6 }}>Timeline</p>
                <p style={{ color: 'white', fontWeight: 600, fontSize: '0.9rem' }}>{svc.timeline}</p>
              </div>

              {/* Starting price */}
              <div style={{ padding: 16, borderRadius: '0.875rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 6 }}>Starting At</p>
                <p style={{ color: 'white', fontWeight: 800, fontSize: 'clamp(0.9rem, 2.5vw, 1.2rem)', fontFamily: 'var(--font-poppins)', wordBreak: 'break-word' }}>{svc.pricing}</p>
              </div>

              {/* Case study */}
              <div style={{ padding: 16, borderRadius: '0.875rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 8 }}>Case Study</p>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', fontWeight: 600, marginBottom: 4 }}>{svc.caseStudy.title}</p>
                <p style={{ color: svc.accent, fontSize: '0.8rem', fontWeight: 500 }}>{svc.caseStudy.result}</p>
              </div>

              {/* Deliverables */}
              <div style={{ padding: 16, borderRadius: '0.875rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 10 }}>Deliverables</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {svc.deliverables.map(d => (
                    <div key={d} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 5, height: 5, borderRadius: '50%', background: svc.accent, flexShrink: 0 }} />
                      <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.8rem' }}>{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a href="/contact" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                padding: '0.875rem', borderRadius: '0.875rem',
                background: `linear-gradient(135deg, rgba(${svc.accentRgb},0.8), rgba(${svc.accentRgb},0.4))`,
                color: 'white', fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none',
              }}>
                Get a Quote
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </BorderGlow>
  )
}

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden" style={{ background: '#03050f' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.6 }}>
          <LightRays raysOrigin="top-center" raysColor="#4f79ff" raysSpeed={0.8} lightSpread={1.2} rayLength={1.5} followMouse mouseInfluence={0.08} />
        </div>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 0%, rgba(37,99,235,0.08), transparent)' }} />

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] text-white/30 text-xs tracking-[0.2em] uppercase mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            Full-Service Digital Studio
          </div>
          <h1 className="font-display font-black leading-none mb-6" style={{ fontSize: 'clamp(2.25rem, 8vw, 7rem)', letterSpacing: '-0.04em' }}>
            <span className="block text-white">Everything</span>
            <span className="block text-white">You Need</span>
            <span className="block">
              <GradientText colors={['#60a5fa','#4f46e5','#a78bfa','#60a5fa']} animationSpeed={5}>
                To Dominate.
              </GradientText>
            </span>
          </h1>
          <p className="text-white/65 text-lg max-w-xl mx-auto leading-relaxed">
            Six service lines. One partner. Zero excuses. We handle everything from strategy to launch to scale.
          </p>
        </div>

        <GradualBlur position="bottom" strength={3} height="8rem" />
      </section>

      {/* Service detail sections */}
      <section className="py-16 md:py-20" style={{ background: '#03050f' }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col gap-6">
          {services.map(svc => (
            <ServiceDetail key={svc.number} svc={svc} />
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 border-t border-white/[0.04]" style={{ background: '#03050f' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-white/25 text-xs uppercase tracking-[0.3em] mb-5">Ready to Start</p>
          <h2 className="font-display font-black text-white mb-5" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.04em' }}>
            Not sure which service fits?
          </h2>
          <p className="text-white/40 text-base mb-8 leading-relaxed">
            Book a free 30-minute discovery call. We'll listen to your goals and recommend the right approach — no sales pitch, no commitment.
          </p>
          <a href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-semibold text-sm"
            style={{ background: 'linear-gradient(135deg, #2563EB, #4f46e5)' }}>
            Book Free Discovery Call
            <ArrowUpRight size={16} />
          </a>
        </div>
      </section>
    </>
  )
}
