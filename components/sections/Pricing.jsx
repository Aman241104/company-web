'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Check, ArrowUpRight, Zap } from 'lucide-react'
import GradientText from '@/components/ui/reactbits/GradientText'
import BorderGlow from '@/components/ui/reactbits/BorderGlow'

gsap.registerPlugin(ScrollTrigger)

const plans = [
  {
    name: 'Starter',
    price: '₹80K',
    period: 'project',
    subtitle: 'Perfect for early-stage startups',
    features: [
      'Up to 10 pages website',
      'Mobile-responsive design',
      'Basic SEO setup',
      'Contact form integration',
      'CMS integration',
      '1 month post-launch support',
    ],
    cta: 'Get Started',
    accent: '#60a5fa',
    accentRgb: '96,165,250',
    bg: 'linear-gradient(135deg, #060d1a 0%, #091428 100%)',
    popular: false,
  },
  {
    name: 'Growth',
    price: '₹2.5L',
    period: 'project',
    subtitle: 'For businesses ready to scale',
    features: [
      'Full-stack web application',
      'Custom design system',
      'API integrations',
      'User auth & dashboard',
      'Performance optimised',
      'Analytics setup',
      '3 months post-launch support',
      'Weekly progress updates',
    ],
    cta: 'Most Popular',
    accent: '#4f46e5',
    accentRgb: '79,70,229',
    bg: 'linear-gradient(135deg, #080616 0%, #0d0a24 100%)',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'engagement',
    subtitle: 'Mission-critical, enterprise-grade',
    features: [
      'Multi-service architecture',
      'Dedicated engineering team',
      'SaaS platform development',
      'Custom integrations & APIs',
      'DevOps & CI/CD setup',
      'Security audits',
      '12 months ongoing support',
      'SLA guarantee',
    ],
    cta: "Let's Talk",
    accent: '#a78bfa',
    accentRgb: '167,139,250',
    bg: 'linear-gradient(135deg, #0d0614 0%, #150820 100%)',
    popular: false,
  },
]

function PriceCard({ plan, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <BorderGlow
      glowColor={`rgba(${plan.accentRgb},0.5)`}
      borderColor={plan.popular ? `rgba(${plan.accentRgb},0.3)` : 'rgba(255,255,255,0.07)'}
      borderRadius='1.25rem'
      backgroundColor='transparent'
      glowIntensity={hovered ? 1 : plan.popular ? 0.5 : 0}
      style={{ height: '100%' }}
    >
      <div
        className="price-card opacity-0"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: plan.bg,
          borderRadius: '1.25rem',
          padding: plan.popular ? '2.5rem 2rem' : '2rem',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          transform: plan.popular && !hovered ? 'scale(1.03)' : hovered ? 'scale(1.02)' : 'scale(1)',
          transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        {plan.popular && (
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            background: `linear-gradient(90deg, ${plan.accent}80, transparent 70%)`,
            height: 2,
          }} />
        )}

        {/* Ghost number */}
        <span style={{
          position: 'absolute', right: -8, bottom: -8,
          fontSize: '8rem', fontWeight: 900, lineHeight: 1,
          color: `rgba(${plan.accentRgb},0.04)`, pointerEvents: 'none', userSelect: 'none',
          fontFamily: 'var(--font-poppins)',
          letterSpacing: '-0.04em',
        }}>
          {String(index + 1).padStart(2, '0')}
        </span>

        <div style={{ position: 'relative', zIndex: 1 }}>
          {plan.popular && (
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '4px 12px', borderRadius: 9999, marginBottom: 16,
              background: `rgba(${plan.accentRgb},0.12)`,
              border: `1px solid rgba(${plan.accentRgb},0.3)`,
              fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase',
              letterSpacing: '0.15em', color: plan.accent,
            }}>
              <Zap size={10} />
              Most Popular
            </div>
          )}

          <p style={{ color: `rgba(${plan.accentRgb},0.8)`, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.25em', marginBottom: 8 }}>
            {plan.name}
          </p>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 6 }}>
            <span style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: 'white', fontFamily: 'var(--font-poppins)', letterSpacing: '-0.04em', lineHeight: 1 }}>
              {plan.price}
            </span>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem' }}>/ {plan.period}</span>
          </div>

          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem', marginBottom: 28 }}>{plan.subtitle}</p>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 24, marginBottom: 28, flex: 1 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {plan.features.map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
                    background: `rgba(${plan.accentRgb},0.12)`, border: `1px solid rgba(${plan.accentRgb},0.3)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Check size={10} color={plan.accent} strokeWidth={3} />
                  </div>
                  <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.85rem' }}>{f}</span>
                </div>
              ))}
            </div>
          </div>

          <a
            href="/contact"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              padding: '0.875rem 1.5rem', borderRadius: '0.75rem',
              fontWeight: 600, fontSize: '0.875rem', color: 'white',
              background: plan.popular ? `linear-gradient(135deg, ${plan.accent}, rgba(${plan.accentRgb},0.6))` : 'rgba(255,255,255,0.06)',
              border: plan.popular ? 'none' : `1px solid rgba(${plan.accentRgb},0.25)`,
              textDecoration: 'none', transition: 'opacity 0.2s',
            }}
          >
            {plan.cta}
            <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </BorderGlow>
  )
}

export default function Pricing() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 768px)', () => {
        gsap.fromTo('.price-word',
          { y: '110%', opacity: 0 },
          { y: '0%', opacity: 1, stagger: 0.07, duration: 0.85, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true } }
        )
        gsap.fromTo('.price-card',
          { opacity: 0, y: 50, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, stagger: 0.12, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: '.price-grid', start: 'top 80%', once: true } }
        )
      })
      mm.add('(max-width: 767px)', () => {
        gsap.fromTo(['.price-word', '.price-card'],
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, stagger: 0.05, duration: 0.6, scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true } }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="pricing" ref={sectionRef} className="py-24 md:py-36 bg-[#04050e] border-t border-white/[0.04] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 80%, rgba(37,99,235,0.05), transparent)' }} />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        <div className="text-center mb-16">
          <p className="text-white/25 text-xs uppercase tracking-[0.3em] mb-5">Transparent Pricing</p>
          <h2 className="font-display font-black leading-none" style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', letterSpacing: '-0.04em' }}>
            {['Simple,', 'Honest'].map((w, i) => (
              <span key={i} className="block overflow-hidden">
                <span className={`price-word inline-block opacity-0 will-change-transform ${i === 0 ? 'text-white' : ''}`}>
                  {i === 1 ? <GradientText colors={['#60a5fa','#4f46e5','#a78bfa','#60a5fa']} animationSpeed={6}>{w}</GradientText> : w}
                </span>
              </span>
            ))}
            <span className="block overflow-hidden">
              <span className="price-word inline-block opacity-0 will-change-transform text-white">Pricing.</span>
            </span>
          </h2>
          <p className="text-white/35 text-base mt-5 max-w-lg mx-auto leading-relaxed">
            No hidden fees. No lock-in contracts. Just clear value at every tier.
          </p>
        </div>

        <div className="price-grid grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <PriceCard key={plan.name} plan={plan} index={i} />
          ))}
        </div>

        <p className="text-white/20 text-xs text-center mt-8">
          All prices are starting estimates. Final quote after discovery call. GST applicable.
        </p>
      </div>
    </section>
  )
}
