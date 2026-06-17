'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GradientText from '@/components/ui/reactbits/GradientText'
import BlurText from '@/components/ui/reactbits/BlurText'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    number: '01', step: 1, title: 'Discover & Strategy',
    desc: 'Deep discovery into your goals, audience, competitors, and constraints. This shapes everything — no strategy, no project start.',
    duration: '1–2 weeks',
    accent: '#60a5fa', accentRgb: '96,165,250',
    bg: 'linear-gradient(135deg, #060d1a 0%, #091428 100%)',
    deliverable: 'Strategy Doc + Scope',
  },
  {
    number: '02', step: 2, title: 'Design & Prototype',
    desc: 'UX wireframes, high-fidelity mockups, interactive prototypes. We iterate until the design feels inevitable — sign-off before a single line of code.',
    duration: '2–4 weeks',
    accent: '#c084fc', accentRgb: '192,132,252',
    bg: 'linear-gradient(135deg, #0d0614 0%, #150820 100%)',
    deliverable: 'Figma Prototype',
  },
  {
    number: '03', step: 3, title: 'Build & Iterate',
    desc: 'Agile sprints with weekly demos. Clean code, automated tests, CI/CD pipelines. You see real progress every single week.',
    duration: '4–12 weeks',
    accent: '#34d399', accentRgb: '52,211,153',
    bg: 'linear-gradient(135deg, #020e09 0%, #051410 100%)',
    deliverable: 'Working Product',
  },
  {
    number: '04', step: 4, title: 'Launch & Scale',
    desc: 'Staged rollout with monitoring, performance testing, and SEO setup. We stay post-launch to optimise, fix, and scale with you.',
    duration: 'Ongoing',
    accent: '#fbbf24', accentRgb: '251,191,36',
    bg: 'linear-gradient(135deg, #130e00 0%, #1a1000 100%)',
    deliverable: 'Live + Monitored',
  },
]

function StepCard({ step, index }) {
  return (
    <div
      className="proc-step opacity-0 relative overflow-hidden rounded-2xl border border-white/[0.06] p-5 md:p-7 lg:p-9 flex flex-col gap-5 md:gap-6 group cursor-default"
      style={{ background: step.bg, minHeight: 'clamp(180px, 30vw, 280px)' }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 0 80px rgba(${step.accentRgb},0.1), 0 0 0 1px rgba(${step.accentRgb},0.2)`
        e.currentTarget.style.borderColor = `rgba(${step.accentRgb},0.2)`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
      }}
    >
      {/* Glow on hover */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(ellipse at 0% 0%, rgba(${step.accentRgb},0.12) 0%, transparent 65%)` }}
      />

      {/* Ghost watermark number */}
      <span
        className="absolute -right-4 -bottom-4 font-display font-black select-none pointer-events-none leading-none transition-colors duration-500 group-hover:opacity-80"
        style={{
          fontSize: '11rem',
          color: `rgba(${step.accentRgb}, 0.05)`,
          letterSpacing: '-0.04em',
          lineHeight: 1,
        }}
      >
        {step.number}
      </span>

      {/* Step indicator */}
      <div className="relative z-10 flex items-center gap-4">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-display font-bold text-sm transition-transform duration-300 group-hover:scale-110"
          style={{
            background: `rgba(${step.accentRgb},0.12)`,
            border: `1px solid rgba(${step.accentRgb},0.3)`,
            color: step.accent,
          }}
        >
          {step.step}
        </div>
        <div
          className="h-px flex-1"
          style={{ background: `linear-gradient(to right, rgba(${step.accentRgb},0.3), transparent)` }}
        />
        <span
          className="text-[10px] px-2.5 py-1 rounded-full font-medium shrink-0"
          style={{
            background: `rgba(${step.accentRgb},0.08)`,
            color: step.accent,
            border: `1px solid rgba(${step.accentRgb},0.15)`,
          }}
        >
          {step.duration}
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1">
        <h3
          className="font-display font-bold text-white mb-3 leading-tight"
          style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.7rem)', letterSpacing: '-0.02em' }}
        >
          {step.title}
        </h3>
        <p className="text-white/35 text-sm leading-relaxed">{step.desc}</p>
      </div>

      {/* Deliverable tag */}
      <div className="relative z-10 flex items-center gap-2 pt-4 border-t border-white/[0.05]">
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: step.accent }} />
        <span className="text-white/25 text-xs">Deliverable:</span>
        <span className="text-white/50 text-xs font-medium">{step.deliverable}</span>
      </div>
    </div>
  )
}

export default function Process() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 768px)', () => {
        gsap.fromTo('.proc-word',
          { y: '110%', opacity: 0 },
          {
            y: '0%', opacity: 1, stagger: 0.07, duration: 0.85, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
          }
        )
        gsap.fromTo('.proc-step',
          { opacity: 0, y: 48, scale: 0.96 },
          {
            opacity: 1, y: 0, scale: 1, stagger: 0.12, duration: 0.8, ease: 'power2.out',
            scrollTrigger: { trigger: '.proc-grid', start: 'top 80%', once: true },
          }
        )
      })

      mm.add('(max-width: 767px)', () => {
        gsap.fromTo(['.proc-word', '.proc-step'],
          { opacity: 0, y: 24 },
          {
            opacity: 1, y: 0, stagger: 0.06, duration: 0.6, ease: 'power2.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="process" ref={sectionRef} className="py-24 md:py-36 bg-[#05060f] border-t border-white/[0.04]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14 md:mb-20">
          <div>
            <p className="text-white/25 text-xs uppercase tracking-[0.3em] mb-5">How We Work</p>
            <h2
              className="font-display font-black leading-none"
              style={{ fontSize: 'clamp(2.25rem, 6vw, 5.5rem)', letterSpacing: '-0.04em' }}
            >
              {['Our', '4-Step', 'Process'].map((w, i) => (
                <span key={i} className="block overflow-hidden">
                  <span className={`proc-word inline-block opacity-0 will-change-transform ${i !== 1 ? 'text-white' : ''}`}>
                    {i === 1 ? (
                      <GradientText
                        colors={['#60a5fa', '#818cf8', '#a78bfa', '#60a5fa']}
                        animationSpeed={7}
                      >
                        {w}
                      </GradientText>
                    ) : w}
                  </span>
                </span>
              ))}
            </h2>
          </div>
          <div className="max-w-xs md:pb-2">
            <BlurText
              text="Proven methodology, transparent communication, and results that stick."
              className="text-white/35 text-sm leading-relaxed"
              animateBy="words"
              delay={70}
              direction="top"
              threshold={0.3}
            />
          </div>
        </div>

        {/* 2×2 grid */}
        <div className="proc-grid grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {steps.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>

        {/* CTA row */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 px-6 py-5 rounded-2xl border border-white/[0.05]"
          style={{ background: 'rgba(255,255,255,0.015)' }}>
          <p className="text-white/35 text-sm">Ready to start your project?</p>
          <a
            href="#contact"
            className="shrink-0 inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-white font-medium text-sm"
            style={{ background: 'linear-gradient(135deg, #2563EB, #4f46e5)' }}
          >
            Start the Process →
          </a>
        </div>
      </div>
    </section>
  )
}
