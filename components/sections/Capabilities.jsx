'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Zap, Smartphone, Settings, Database, Cloud, Sparkles } from 'lucide-react'
import GradientBlinds from '@/components/ui/reactbits/GradientBlinds'

gsap.registerPlugin(ScrollTrigger)

const cells = [
  {
    icon: Zap,
    name: 'Next.js',
    desc: 'Server-first React with blazing-fast SSR and App Router',
    accent: '#60a5fa',
    wide: true,
    bg: 'linear-gradient(135deg, #0d1117 0%, #0a1628 100%)',
  },
  {
    icon: Smartphone,
    name: 'React Native',
    desc: 'Cross-platform iOS & Android from one codebase',
    accent: '#34d399',
    wide: false,
    bg: 'linear-gradient(135deg, #0a1a10 0%, #061010 100%)',
  },
  {
    icon: Settings,
    name: 'Node.js',
    desc: 'High-throughput backend APIs and microservices',
    accent: '#a3e635',
    wide: false,
    bg: 'linear-gradient(135deg, #0a1400 0%, #080d00 100%)',
  },
  {
    icon: Database,
    name: 'PostgreSQL',
    desc: 'Reliable relational data with advanced query power',
    accent: '#fbbf24',
    wide: false,
    bg: 'linear-gradient(135deg, #1a1000 0%, #0d0800 100%)',
  },
  {
    icon: Cloud,
    name: 'AWS / GCloud',
    desc: 'Cloud-native infrastructure that scales on demand',
    accent: '#f472b6',
    wide: true,
    bg: 'linear-gradient(135deg, #1a0a1a 0%, #0d0d0d 100%)',
  },
  {
    icon: Sparkles,
    name: 'GSAP',
    desc: 'Professional-grade animations and scroll interactions',
    accent: '#c084fc',
    wide: false,
    bg: 'linear-gradient(135deg, #100a1a 0%, #0a0a18 100%)',
  },
]

function Cell({ cell, index }) {
  const Icon = cell.icon
  return (
    <div
      className={`cap-cell opacity-0 will-change-transform rounded-2xl p-6 border border-white/[0.06] flex flex-col gap-4 group cursor-default transition-all duration-[400ms] ${cell.wide ? 'lg:col-span-2' : 'lg:col-span-1'}`}
      style={{
        background: cell.bg,
        boxShadow: `0 0 0 1px rgba(255,255,255,0.04)`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 0 60px ${cell.accent}18, 0 0 0 1px ${cell.accent}30`
        e.currentTarget.style.borderColor = `${cell.accent}25`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 0 0 1px rgba(255,255,255,0.04)'
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
      }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
        style={{ background: `${cell.accent}18`, border: `1px solid ${cell.accent}30` }}
      >
        <Icon size={18} style={{ color: cell.accent }} />
      </div>
      <div>
        <p className="text-white font-semibold text-base mb-1.5">{cell.name}</p>
        <p className="text-white/35 text-sm leading-relaxed">{cell.desc}</p>
      </div>
    </div>
  )
}

export default function Capabilities() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 768px)', () => {
        gsap.fromTo('.cap-title-word',
          { y: '110%', opacity: 0 },
          {
            y: '0%', opacity: 1, stagger: 0.07, duration: 0.85, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
          }
        )
        gsap.fromTo('.cap-cell',
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, stagger: 0.08, duration: 0.7, ease: 'power2.out',
            scrollTrigger: { trigger: '.cap-grid', start: 'top 82%', once: true },
          }
        )
      })

      mm.add('(max-width: 767px)', () => {
        gsap.fromTo(['.cap-title-word', '.cap-cell'],
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
    <section
      id="capabilities"
      ref={sectionRef}
      className="py-24 md:py-36 bg-[#05060f] border-t border-white/[0.04] overflow-hidden relative"
    >
      {/* GradientBlinds background — subtle venetian-blind effect */}
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.12 }}>
        <GradientBlinds
          gradientColors={['#03050f', '#0a1628', '#1e3a8a', '#0a1628', '#03050f']}
          angle={140}
          noise={0.25}
          blindCount={10}
          spotlightRadius={0.55}
          spotlightSoftness={0.6}
          spotlightOpacity={0.4}
          distortAmount={0.08}
          mouseDampening={0.1}
        />
      </div>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        {/* Header */}
        <div className="mb-14 md:mb-18">
          <p className="text-white/25 text-xs uppercase tracking-[0.3em] mb-5">Our Stack</p>
          <div className="flex flex-col md:flex-row md:items-end gap-6 justify-between">
            <h2
              className="font-display font-black leading-none"
              style={{ fontSize: 'clamp(2.8rem, 7vw, 6rem)', letterSpacing: '-0.04em' }}
            >
              {['Built With', 'The Best', 'Stack'].map((w, i) => (
                <span key={i} className="block overflow-hidden">
                  <span
                    className={`cap-title-word inline-block opacity-0 will-change-transform ${i === 2 ? 'bg-gradient-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent' : 'text-white'}`}
                  >
                    {w}
                  </span>
                </span>
              ))}
            </h2>
            <p className="text-white/30 text-sm leading-relaxed max-w-xs md:text-right md:pb-2">
              We choose battle-tested technologies that scale — no trends, no shortcuts.
            </p>
          </div>
        </div>

        {/* Bento grid — 4 col: wide cells span 2 */}
        <div className="cap-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {cells.map((cell, i) => (
            <Cell key={cell.name} cell={cell} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
