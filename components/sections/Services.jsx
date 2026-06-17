'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Globe, Code2, Smartphone, Package, TrendingUp, Search } from 'lucide-react'
import BlurText from '@/components/ui/reactbits/BlurText'
import GradientText from '@/components/ui/reactbits/GradientText'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    number: '01', icon: Globe, title: 'Website Development',
    short: 'High-performance websites built to convert.',
    detail: 'Enterprise-grade Next.js websites with <2s LCP, conversion-optimised UX, and CMS integration. Every pixel is intentional.',
    tags: ['Next.js', 'React', 'CMS', 'Core Web Vitals'],
    accent: '#60a5fa', accentRgb: '96,165,250',
    bg: 'linear-gradient(135deg, #060d1a 0%, #091428 100%)',
    examples: ['/interior.png', '/jjfilms.png', '/chahana.png'],
  },
  {
    number: '02', icon: Code2, title: 'Software Development',
    short: 'Custom software engineered for scale.',
    detail: 'Backend systems, microservices, APIs and automation built with clean architecture. Code your team can own 5 years later.',
    tags: ['Node.js', 'Python', 'Microservices', 'GraphQL'],
    accent: '#34d399', accentRgb: '52,211,153',
    bg: 'linear-gradient(135deg, #020e09 0%, #051410 100%)',
    examples: ['/inventory.png', '/hvac.png', '/form-web.png'],
  },
  {
    number: '03', icon: Smartphone, title: 'Mobile App Development',
    short: 'Cross-platform apps users love.',
    detail: 'Native-quality iOS & Android with React Native or Flutter. Performance, offline-first, and App Store optimisation built in.',
    tags: ['React Native', 'Flutter', 'iOS', 'Android'],
    accent: '#c084fc', accentRgb: '192,132,252',
    bg: 'linear-gradient(135deg, #0d0614 0%, #150820 100%)',
    examples: ['/destination.png', '/zingbliss.png', '/aangan.png'],
  },
  {
    number: '04', icon: Package, title: 'SaaS Product Development',
    short: 'From 0 to launch, end-to-end.',
    detail: 'Full-lifecycle SaaS: architecture, MVP, payments, multi-tenant infra, and scale beyond 10,000 users. ViboERP is our proof.',
    tags: ['Multi-Tenant', 'Stripe', 'Auth', 'Infrastructure'],
    accent: '#fbbf24', accentRgb: '251,191,36',
    bg: 'linear-gradient(135deg, #130e00 0%, #1a1000 100%)',
    examples: ['/nextsphere.png', '/form-web.png', '/testimonial.png'],
  },
  {
    number: '05', icon: TrendingUp, title: 'Performance Marketing',
    short: 'Ads that scale revenue, not just spend.',
    detail: 'Google, Meta and LinkedIn campaigns engineered around ROAS, CAC and LTV — not vanity metrics. 4.2x avg ROAS across clients.',
    tags: ['Google Ads', 'Meta Ads', 'LinkedIn', 'Attribution'],
    accent: '#f87171', accentRgb: '248,113,113',
    bg: 'linear-gradient(135deg, #140505 0%, #1a0808 100%)',
    examples: ['/silverspoon-screenshot.png', '/luxeliving.png', '/sweet.png'],
  },
  {
    number: '06', icon: Search, title: 'Search Engine Optimisation',
    short: 'Rank #1 for keywords that bring revenue.',
    detail: 'Technical audits, content strategy, Core Web Vitals, and link building that compounds. We chase rankings that matter.',
    tags: ['Technical SEO', 'Content', 'Link Building', 'Schema'],
    accent: '#a78bfa', accentRgb: '167,139,250',
    bg: 'linear-gradient(135deg, #080614 0%, #0d091a 100%)',
    examples: ['/chemical.png', '/eyehospital.png', '/destination.png'],
  },
]

function ServiceCard({ svc }) {
  const [hovered, setHovered] = useState(false)
  const Icon = svc.icon

  return (
    <div
      className="svc-card opacity-0 relative overflow-hidden rounded-2xl border p-5 md:p-7 cursor-default flex flex-col"
      style={{
        background: svc.bg,
        minHeight: 270,
        borderColor: hovered ? `rgba(${svc.accentRgb},0.25)` : 'rgba(255,255,255,0.06)',
        transition: 'transform 0.45s cubic-bezier(0.22,1,0.36,1), box-shadow 0.45s ease, border-color 0.45s ease',
        transform: hovered ? 'translateY(-5px) scale(1.01)' : 'none',
        boxShadow: hovered
          ? `0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(${svc.accentRgb},0.2), 0 0 60px rgba(${svc.accentRgb},0.07)`
          : '0 4px 20px rgba(0,0,0,0.3)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Radial hover glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(ellipse at 30% 0%, rgba(${svc.accentRgb},0.1) 0%, transparent 65%)`,
        }}
      />

      {/* Ghost number watermark */}
      <span
        className="absolute -right-3 -top-3 font-display font-black leading-none select-none pointer-events-none"
        style={{
          fontSize: '7.5rem',
          color: `rgba(${svc.accentRgb}, ${hovered ? 0.09 : 0.04})`,
          transition: 'color 0.45s ease',
          letterSpacing: '-0.04em',
          lineHeight: 1,
        }}
      >
        {svc.number}
      </span>

      {/* Icon */}
      <div
        className="relative z-10 w-11 h-11 rounded-xl flex items-center justify-center mb-5 shrink-0 transition-transform duration-300"
        style={{
          background: `rgba(${svc.accentRgb},0.12)`,
          border: `1px solid rgba(${svc.accentRgb},0.25)`,
          transform: hovered ? 'scale(1.1)' : 'scale(1)',
        }}
      >
        <Icon size={20} style={{ color: svc.accent }} />
      </div>

      {/* Text */}
      <div className="relative z-10 flex-1">
        <h3
          className="font-display font-bold text-white mb-2 leading-tight"
          style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.35rem)', letterSpacing: '-0.02em' }}
        >
          {svc.title}
        </h3>
        <p className="text-white/35 text-sm leading-relaxed mb-4">{svc.short}</p>
        <p
          className="text-white/20 text-xs leading-relaxed mb-5 transition-all duration-500"
          style={{ maxHeight: hovered ? 80 : 0, overflow: 'hidden', opacity: hovered ? 1 : 0 }}
        >
          {svc.detail}
        </p>
      </div>

      {/* Example project thumbnails */}
      {svc.examples && (
        <div className="relative z-10 flex gap-1.5 mb-4 transition-opacity duration-500" style={{ opacity: hovered ? 0.9 : 0.35 }}>
          {svc.examples.map((src, i) => (
            <div
              key={i}
              className="flex-1 overflow-hidden"
              style={{
                height: 44, borderRadius: 6,
                border: `1px solid rgba(${svc.accentRgb},${hovered ? 0.3 : 0.12})`,
                transition: 'border-color 0.4s ease',
                transform: `rotate(${i === 0 ? -1 : i === 2 ? 1 : 0}deg)`,
              }}
            >
              <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }} />
            </div>
          ))}
        </div>
      )}

      {/* Tags */}
      <div className="relative z-10 flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.05]">
        {svc.tags.map((t) => (
          <span
            key={t}
            className="text-[10px] px-2.5 py-0.5 rounded-full"
            style={{ background: `rgba(${svc.accentRgb},0.08)`, color: svc.accent }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Services() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 768px)', () => {
        gsap.fromTo('.svc-heading-word',
          { y: '110%', opacity: 0 },
          {
            y: '0%', opacity: 1, stagger: 0.08, duration: 0.85, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
          }
        )
        gsap.fromTo('.svc-card',
          { opacity: 0, y: 40, scale: 0.97 },
          {
            opacity: 1, y: 0, scale: 1, stagger: 0.07, duration: 0.7, ease: 'power2.out',
            scrollTrigger: { trigger: '.svc-grid', start: 'top 82%', once: true },
          }
        )
      })

      mm.add('(max-width: 767px)', () => {
        gsap.fromTo(['.svc-heading-word', '.svc-card'],
          { opacity: 0, y: 24 },
          {
            opacity: 1, y: 0, stagger: 0.05, duration: 0.6, ease: 'power2.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="py-24 md:py-36 bg-[#05060f] border-t border-white/[0.04]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14 md:mb-20">
          <div>
            <p className="text-white/25 text-xs uppercase tracking-[0.3em] mb-5">What We Do</p>
            <h2
              className="font-display font-black leading-none"
              style={{ fontSize: 'clamp(1.75rem, 6vw, 5.5rem)', letterSpacing: '-0.04em' }}
            >
              {['Full-Stack', 'Digital', 'Services'].map((w, i) => (
                <span key={i} className="block overflow-hidden">
                  <span className={`svc-heading-word inline-block opacity-0 will-change-transform ${i === 2 ? '' : 'text-white'}`}>
                    {i === 2 ? (
                      <GradientText
                        colors={['#60a5fa', '#818cf8', '#a78bfa', '#818cf8', '#60a5fa']}
                        animationSpeed={6}
                      >
                        {w}
                      </GradientText>
                    ) : w}
                  </span>
                </span>
              ))}
            </h2>
          </div>
          <div className="max-w-sm lg:pb-2 lg:text-right">
            <BlurText
              text="Everything engineered from scratch for your goals, industry, and scale — no templates, no shortcuts."
              className="text-white/35 text-base leading-relaxed"
              animateBy="words"
              direction="top"
              delay={60}
              threshold={0.3}
            />
          </div>
        </div>

        {/* Card grid */}
        <div className="svc-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {services.map((svc) => (
            <ServiceCard key={svc.number} svc={svc} />
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div
          className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-5 p-6 md:p-8 rounded-2xl border border-white/[0.06]"
          style={{ background: 'rgba(255,255,255,0.015)' }}
        >
          <p className="text-white/40 text-sm">Not sure which service fits? <span className="text-white/70">Let's talk it through.</span></p>
          <a
            href="#contact"
            className="shrink-0 inline-flex items-center gap-2 px-7 py-3 rounded-full text-white text-sm font-medium"
            style={{ background: 'linear-gradient(135deg, #2563EB, #4f46e5)' }}
          >
            Get a Free Consultation
          </a>
        </div>
      </div>
    </section>
  )
}
