'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GradientText from '@/components/ui/reactbits/GradientText'
import CountUp from 'react-countup'
import LogoLoop from '@/components/ui/reactbits/LogoLoop'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    name: 'Priya Sharma', role: 'CEO, TechVista Solutions', init: 'PS', color: '#60a5fa',
    quote: 'Mehta Technologies transformed our outdated system into a product our customers love. Clean code, on-time delivery, zero excuses.',
    metric: '+340% user engagement',
  },
  {
    name: 'Arjun Kapoor', role: 'Founder, GrowthLabs', init: 'AK', color: '#34d399',
    quote: 'Our website\'s lead generation tripled in 3 months. These guys understand both design and business — a rare combination.',
    metric: '3× lead generation',
  },
  {
    name: 'Neha Patel', role: 'COO, RetailMax', init: 'NP', color: '#c084fc',
    quote: 'ViboERP completely changed how we operate. Real-time visibility across 12 branches. ROI was visible within the first month.',
    metric: 'ROI in 30 days',
  },
  {
    name: 'Rohit Mehta', role: 'Director, CloudStack India', init: 'RM', color: '#fbbf24',
    quote: 'Ranked #1 for our core keywords in 4 months. Not magic — just proper technical SEO and a solid content strategy.',
    metric: '#1 ranking in 4mo',
  },
  {
    name: 'Sunita Joshi', role: 'MD, Precision Manufacturing', init: 'SJ', color: '#f87171',
    quote: 'From mobile app to ERP integration — they handled everything seamlessly. A true technology partner, not just a vendor.',
    metric: 'Full-stack delivery',
  },
  {
    name: 'Vikram Agarwal', role: 'CTO, FinFlow', init: 'VA', color: '#a78bfa',
    quote: '4× ROAS in the first month of performance marketing. Their approach is refreshingly data-driven and result-focused.',
    metric: '4× ROAS month 1',
  },
  {
    name: 'Deepak Nair', role: 'Founder, PropSpace', init: 'DN', color: '#60a5fa',
    quote: 'Built our entire platform from scratch. Architecture is solid, code is clean, and they stay engaged long after launch.',
    metric: '12k monthly buyers',
  },
  {
    name: 'Meera Iyer', role: 'CMO, BrandForge', init: 'MI', color: '#34d399',
    quote: 'The rebrand + website combo drove a 200% increase in qualified inbound enquiries. Worth every rupee invested.',
    metric: '+200% inbound leads',
  },
]

function StarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="#fbbf24">
      <polygon points="6.5,1 8,5 12,5.5 9,8 9.8,12 6.5,10.2 3.2,12 4,8 1,5.5 5,5" />
    </svg>
  )
}

function Card({ t }) {
  return (
    <div
      className="shrink-0 w-[300px] md:w-[340px] rounded-2xl border border-white/[0.06] overflow-hidden flex flex-col cursor-default group"
      style={{
        background: 'linear-gradient(135deg, #0a0a0f 0%, #0d0d16 100%)',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${t.color}25`
        e.currentTarget.style.boxShadow = `0 0 50px ${t.color}0d`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Accent top bar */}
      <div className="h-0.5 w-full" style={{ background: `linear-gradient(to right, ${t.color}60, transparent)` }} />

      <div className="p-6 flex flex-col flex-1">
        {/* Stars */}
        <div className="flex gap-0.5 mb-4">
          {Array(5).fill(0).map((_, i) => <StarIcon key={i} />)}
        </div>

        {/* Quote mark */}
        <div className="font-display text-5xl leading-none mb-2 select-none" style={{ color: `${t.color}20` }}>"</div>

        {/* Quote */}
        <p className="text-white/50 text-sm leading-relaxed flex-1 mb-5">{t.quote}</p>

        {/* Metric pill */}
        <div
          className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full text-[11px] font-medium mb-5"
          style={{ background: `${t.color}10`, color: t.color, border: `1px solid ${t.color}20` }}
        >
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: t.color }} />
          {t.metric}
        </div>

        {/* Author */}
        <div className="flex items-center gap-3 pt-4 border-t border-white/[0.05]">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
            style={{ background: `linear-gradient(135deg, ${t.color}50, ${t.color}80)` }}
          >
            {t.init}
          </div>
          <div>
            <p className="text-white text-sm font-medium">{t.name}</p>
            <p className="text-white/30 text-xs">{t.role}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 768px)', () => {
        gsap.fromTo('.test-word',
          { y: '110%', opacity: 0 },
          {
            y: '0%', opacity: 1, stagger: 0.07, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
          }
        )
      })
      mm.add('(max-width: 767px)', () => {
        gsap.fromTo('.test-word',
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, stagger: 0.05, duration: 0.6,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const row1 = testimonials.slice(0, 4)
  const row2 = testimonials.slice(4)

  return (
    <section ref={sectionRef} className="py-24 md:py-36 bg-[#04050e] overflow-hidden border-t border-white/[0.04]">
      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 mb-14">
        <p className="text-white/25 text-xs uppercase tracking-[0.3em] mb-6">Client Love</p>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2
            className="font-display font-black leading-none"
            style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', letterSpacing: '-0.04em' }}
          >
            {['Trusted By', 'Builders &', 'Founders'].map((w, i) => (
              <span key={i} className="block overflow-hidden">
                <span className={`test-word inline-block opacity-0 will-change-transform ${i !== 2 ? 'text-white' : ''}`}>
                  {i === 2 ? (
                    <GradientText colors={['#60a5fa', '#4f46e5', '#a78bfa', '#60a5fa']} animationSpeed={5}>
                      {w}
                    </GradientText>
                  ) : w}
                </span>
              </span>
            ))}
          </h2>
          <div className="flex flex-col gap-2 md:items-end md:pb-2">
            <p className="text-white/35 text-sm">Real results from real partnerships.</p>
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {Array(5).fill(0).map((_, i) => <StarIcon key={i} />)}
              </div>
              <span className="text-white/30 text-xs">
                5.0 avg · <CountUp end={80} suffix="+ clients" enableScrollSpy scrollSpyOnce duration={2} />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Row 1 — forward */}
      <div className="mb-4">
        <LogoLoop
          logos={row1.map(t => ({ t }))}
          speed={48}
          direction="left"
          gap={24}
          pauseOnHover
          fadeOut
          renderItem={(item) => <Card t={item.t} />}
        />
      </div>

      {/* Row 2 — reverse */}
      <LogoLoop
        logos={row2.map(t => ({ t }))}
        speed={40}
        direction="right"
        gap={24}
        pauseOnHover
        fadeOut
        renderItem={(item) => <Card t={item.t} />}
      />
    </section>
  )
}
