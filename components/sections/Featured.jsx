'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CheckCircle, ArrowUpRight } from 'lucide-react'
import BrowserMockup from '@/components/ui/BrowserMockup'
import ViboERPDashboard from '@/components/ui/ViboERPDashboard'

gsap.registerPlugin(ScrollTrigger)

const features = [
  'Multi-tenant ERP with real-time dashboards',
  'Inventory, CRM, HR & Finance in one platform',
  '2,400+ active users across 50+ businesses',
  'Sub-200ms response times with Redis caching',
  'Custom white-label deployments for agencies',
  'RBAC with granular permission controls',
]

const pills = [
  { label: 'Users', value: '2,400+' },
  { label: 'Tracked', value: '₹28M+' },
  { label: 'Projects', value: '128 Active' },
]

export default function Featured() {
  const sectionRef = useRef(null)
  const leftRef = useRef(null)
  const rightRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 768px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            once: true,
          },
          defaults: { ease: 'power3.out' },
        })

        tl.fromTo('.featured-label', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0)
          .fromTo('.featured-title-word', { y: '110%', opacity: 0 }, { y: '0%', opacity: 1, stagger: 0.07, duration: 0.85, willChange: 'transform' }, 0.2)
          .fromTo('.featured-feature', { opacity: 0, x: -24 }, { opacity: 1, x: 0, stagger: 0.08, duration: 0.6 }, 0.6)
          .fromTo('.featured-cta', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 1.1)
          .fromTo(rightRef.current, { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 1.0 }, 0.3)
          .fromTo('.featured-pill', { opacity: 0, y: 20, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.5 }, 0.9)
      })

      mm.add('(max-width: 767px)', () => {
        gsap.fromTo('.featured-animate',
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, stagger: 0.06, duration: 0.6,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="featured"
      ref={sectionRef}
      className="relative py-24 md:py-36 bg-[#04050e] overflow-hidden border-t border-white/[0.04]"
    >
      {/* Blue gradient blob */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 600,
          height: 600,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(ellipse, rgba(37,99,235,0.09) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: 400,
          height: 400,
          right: '-100px',
          top: '20%',
          background: 'radial-gradient(ellipse, rgba(79,70,229,0.06) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        {/* Label */}
        <p className="featured-label featured-animate opacity-0 text-white/25 text-xs uppercase tracking-[0.3em] mb-4">
          Flagship Product
        </p>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* LEFT: text + features */}
          <div ref={leftRef}>
            <h2
              className="font-display font-black leading-none mb-4"
              style={{ fontSize: 'clamp(2.25rem, 6vw, 6rem)', letterSpacing: '-0.04em' }}
            >
              {['Our Flagship', 'Product'].map((w, i) => (
                <span key={i} className="block overflow-hidden">
                  <span className={`featured-title-word featured-animate inline-block opacity-0 will-change-transform ${i === 0 ? 'text-white' : 'bg-gradient-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent'}`}>
                    {w}
                  </span>
                </span>
              ))}
            </h2>

            <div className="overflow-hidden mb-2">
              <h3
                className="featured-title-word featured-animate inline-block opacity-0 font-display font-black will-change-transform"
                style={{ fontSize: 'clamp(2rem, 4vw, 4rem)', letterSpacing: '-0.03em', color: 'rgba(255,255,255,0.12)' }}
              >
                ViboERP
              </h3>
            </div>

            <p className="featured-animate opacity-0 text-white/40 text-base leading-relaxed max-w-md mb-10">
              A full-scale enterprise resource planning SaaS platform built for modern businesses. Manage inventory, sales, HR, and finances from a single unified dashboard.
            </p>

            {/* Feature list */}
            <ul className="space-y-3 mb-10">
              {features.map((f, i) => (
                <li key={i} className="featured-feature featured-animate opacity-0 flex items-start gap-3">
                  <CheckCircle size={16} className="text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-white/55 text-sm">{f}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="featured-cta featured-animate opacity-0 flex items-center gap-4">
              <a
                href="#contact"
                className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-medium overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #2563EB, #4f46e5)', boxShadow: '0 0 30px rgba(37,99,235,0.3)' }}
              >
                <span className="absolute inset-0 translate-x-[-110%] skew-x-[-20deg] bg-white/10 group-hover:translate-x-[150%] transition-transform duration-700" />
                <span className="relative">Get ViboERP</span>
                <ArrowUpRight size={14} className="relative transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a href="#work" className="text-sm text-white/35 hover:text-white/60 transition-colors border-b border-white/10 hover:border-white/25 pb-0.5">
                See Case Study
              </a>
            </div>
          </div>

          {/* RIGHT: large browser mockup */}
          <div ref={rightRef} className="opacity-0 will-change-transform">
            <div
              className="relative"
              style={{
                filter: 'drop-shadow(0 40px 80px rgba(37,99,235,0.2))',
              }}
            >
              <div className="overflow-hidden" style={{ maxHeight: 'clamp(200px, 50vw, 500px)' }}>
                <BrowserMockup url="app.viboerp.com/dashboard" className="w-full">
                  <div style={{ minHeight: 400 }}>
                    <ViboERPDashboard />
                  </div>
                </BrowserMockup>
              </div>
            </div>

            {/* Metric pills */}
            <div className="flex gap-3 mt-6 flex-wrap">
              {pills.map((p) => (
                <div
                  key={p.label}
                  className="featured-pill opacity-0 flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/[0.08]"
                  style={{ background: 'rgba(37,99,235,0.08)' }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span className="text-white font-semibold text-sm">{p.value}</span>
                  <span className="text-white/35 text-xs">{p.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
