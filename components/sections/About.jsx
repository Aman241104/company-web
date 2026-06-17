'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LogoLoop from '@/components/ui/reactbits/LogoLoop'
import AnimatedCounter from '@/components/ui/AnimatedCounter'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { end: 150, suffix: '+', label: 'Projects Shipped', sub: 'Across 10+ industries' },
  { end: 80,  suffix: '+', label: 'Happy Clients',    sub: 'Startups to enterprise' },
  { end: 5,   suffix: '+', label: 'Years Building',   sub: 'Since 2019' },
  { end: 99,  suffix: '%', label: 'Client Retention', sub: 'Long-term partnerships' },
]

const partnerItems = [
  'Razorpay', 'AWS', 'Vercel', 'Google Cloud', 'Shopify',
  'Twilio', 'Stripe', 'Supabase', 'Cloudflare', 'MongoDB',
].map(name => ({
  node: (
    <span className="flex items-center gap-2.5 shrink-0">
      <span className="w-1 h-1 rounded-full bg-white/30 shrink-0" />
      <span className="text-white/30 text-[12px] font-medium tracking-wide">{name}</span>
    </span>
  ),
}))

const highlights = [
  { value: '99%', label: 'Retention Rate', color: '#60a5fa' },
  { value: '4.9★', label: 'Avg. Client Rating', color: '#a78bfa' },
  { value: '<48h', label: 'First Response', color: '#34d399' },
]

const offices = [
  { city: 'Mumbai', dot: '#2563EB' },
  { city: 'Bengaluru', dot: '#7c3aed' },
  { city: 'Remote', dot: '#10b981' },
]

export default function About() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 768px)', () => {
        gsap.fromTo('.about-word',
          { y: '110%', opacity: 0 },
          {
            y: '0%', opacity: 1, stagger: 0.07, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
          }
        )
        gsap.fromTo('.stat-card',
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, stagger: 0.08, duration: 0.6, ease: 'power2.out',
            scrollTrigger: { trigger: '.stat-grid', start: 'top 82%', once: true },
          }
        )
        gsap.fromTo('.about-line',
          { scaleX: 0 },
          {
            scaleX: 1, duration: 1.4, ease: 'power2.inOut',
            scrollTrigger: { trigger: '.about-line', start: 'top 85%', once: true },
          }
        )
        gsap.fromTo('.about-visual',
          { opacity: 0, x: 40 },
          {
            opacity: 1, x: 0, duration: 1.0, ease: 'power2.out',
            scrollTrigger: { trigger: '.about-visual', start: 'top 80%', once: true },
          }
        )
      })

      mm.add('(max-width: 767px)', () => {
        gsap.fromTo(['.about-word', '.stat-card', '.about-visual'],
          { opacity: 0, y: 24 },
          {
            opacity: 1, y: 0, stagger: 0.05, duration: 0.6,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="py-24 md:py-36 bg-[#04050e] border-t border-white/[0.04]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">

        <p className="text-white/25 text-xs uppercase tracking-[0.3em] mb-10">About Us</p>

        {/* Two-col layout */}
        <div className="grid lg:grid-cols-[1fr_420px] gap-12 md:gap-16 mb-16 items-start">

          {/* Left: text */}
          <div>
            <h2
              className="font-display font-black leading-none mb-8"
              style={{ fontSize: 'clamp(2.25rem, 5vw, 5.5rem)', letterSpacing: '-0.04em' }}
            >
              {["We Don't", 'Just Build.', 'We Deliver', 'Impact.'].map((w, i) => (
                <span key={i} className="block overflow-hidden">
                  <span
                    className={`about-word inline-block opacity-0 will-change-transform ${i >= 2 ? 'bg-gradient-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent' : 'text-white'}`}
                  >
                    {w}
                  </span>
                </span>
              ))}
            </h2>

            <p className="text-white/45 text-base leading-relaxed mb-4">
              Founded on one belief —{' '}
              <span className="text-white/75">technology should create measurable value</span>, not just look good.
            </p>
            <p className="text-white/50 text-sm leading-relaxed mb-8">
              We are engineers, designers, and growth strategists who combine deep technical expertise with sharp business thinking. From day one, focused on building solutions that scale — not just ship.
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {['Results-Driven', 'Clean Architecture', 'Long-Term Thinking', 'Agile Delivery', 'Transparent'].map((v) => (
                <span
                  key={v}
                  className="text-[11px] text-white/35 px-3 py-1.5 rounded-full border border-white/[0.07]"
                  style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                  {v}
                </span>
              ))}
            </div>

            <div className="flex gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-semibold"
                style={{ background: 'linear-gradient(135deg, #2563EB, #4f46e5)', boxShadow: '0 0 30px rgba(37,99,235,0.3)' }}
              >
                Work With Us
              </a>
              <a
                href="#work"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white/45 text-sm border border-white/[0.1] hover:text-white hover:border-white/20 transition-all duration-300"
              >
                See Our Work
              </a>
            </div>
          </div>

          {/* Right: polished info card */}
          <div className="about-visual opacity-0 will-change-transform">
            <div
              className="rounded-2xl border border-white/[0.07] overflow-hidden"
              style={{ background: 'linear-gradient(145deg, #0a0b14, #0d0f1e)' }}
            >
              {/* Card header */}
              <div
                className="px-6 pt-6 pb-5 border-b border-white/[0.06]"
                style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.06), transparent)' }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-white/20 text-[9px] uppercase tracking-[0.3em]">Company Profile</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-white/25 text-[10px]">Active</span>
                  </div>
                </div>
                <p className="text-white/65 text-sm leading-relaxed italic">
                  "We don't just write code — we architect outcomes that compound over time."
                </p>
              </div>

              {/* Highlights */}
              <div className="p-6 border-b border-white/[0.06]">
                <p className="text-white/35 text-[9px] uppercase tracking-[0.3em] mb-4">Key Metrics</p>
                <div className="flex flex-col gap-3">
                  {highlights.map((h) => (
                    <div key={h.label} className="flex items-center justify-between">
                      <span className="text-white/40 text-[13px]">{h.label}</span>
                      <span
                        className="font-display font-bold text-sm"
                        style={{ color: h.color }}
                      >
                        {h.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Team + offices */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex -space-x-2">
                    {['#2563EB', '#4f46e5', '#7c3aed', '#10b981', '#f59e0b'].map((c, i) => (
                      <div
                        key={i}
                        className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-[9px] font-bold text-white"
                        style={{ background: c, borderColor: '#0a0b14' }}
                      >
                        {['G', 'R', 'A', 'P', 'S'][i]}
                      </div>
                    ))}
                    <div
                      className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center"
                      style={{ borderColor: '#0a0b14', background: 'rgba(255,255,255,0.05)' }}
                    >
                      <span className="text-white/30 text-[8px]">+13</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-white/50 text-xs font-medium">18 team members</p>
                    <p className="text-white/20 text-[10px]">Engineers, designers & strategists</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  {offices.map((o) => (
                    <div key={o.city} className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: o.dot }} />
                      <span className="text-white/30 text-[11px]">{o.city}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="about-line h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12 origin-left" />

        {/* Stats — bordered grid with dividers */}
        <div className="stat-grid grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden mb-12"
          style={{ background: 'rgba(255,255,255,0.015)' }}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className={`stat-card opacity-0 will-change-transform flex flex-col items-center justify-center py-5 md:py-8 px-3 md:px-4 ${i >= 2 ? 'border-t md:border-t-0 border-white/[0.06]' : ''}`}
            >
              <div
                className="font-display font-bold leading-none mb-2"
                style={{ fontSize: 'clamp(1.4rem, 3vw, 2.8rem)', letterSpacing: '-0.04em' }}
              >
                <span className="bg-gradient-to-br from-blue-300 to-violet-400 bg-clip-text text-transparent">
                  <AnimatedCounter end={s.end} suffix={s.suffix} duration={1800} />
                </span>
              </div>
              <p className="text-white/60 text-[12px] font-medium mb-0.5">{s.label}</p>
              <p className="text-white/40 text-[10px] uppercase tracking-wider hidden sm:block">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Partner logo marquee — LogoLoop */}
        <div className="border-t border-white/[0.04] pt-8">
          <p className="text-white/35 text-[9px] uppercase tracking-[0.35em] text-center mb-5">
            Trusted Technologies &amp; Partners
          </p>
          <LogoLoop
            logos={partnerItems}
            speed={45}
            direction="left"
            gap={28}
            pauseOnHover
            fadeOut
            logoHeight={24}
          />
        </div>

      </div>
    </section>
  )
}
