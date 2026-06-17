'use client'
import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import GradientText from '@/components/ui/reactbits/GradientText'
import GradualBlur from '@/components/ui/reactbits/GradualBlur'
import LightRays from '@/components/ui/reactbits/LightRays'
import BorderGlow from '@/components/ui/reactbits/BorderGlow'
import LogoLoop from '@/components/ui/reactbits/LogoLoop'
import Team from '@/components/sections/Team'
import Ballpit from '@/components/ui/reactbits/Ballpit'
import CountUp from 'react-countup'

const projectScreenshots = [
  { src: '/silverspoon-screenshot.png', label: 'Silver Spoon by ACJ' },
  { src: '/interior.png', label: 'Stylux Interiors' },
  { src: '/jjfilms.png', label: 'JJ Films' },
  { src: '/zingbliss.png', label: 'ZingBliss' },
  { src: '/sweet.png', label: 'Gourmettazone' },
  { src: '/luxeliving.png', label: 'LuxeLiving' },
  { src: '/nextsphere.png', label: 'NexSphere' },
  { src: '/testimonial.png', label: 'College Capsule' },
  { src: '/chahana.png', label: 'Chahana Dental' },
  { src: '/aangan.png', label: 'Aangan Boutique' },
  { src: '/eyehospital.png', label: 'EyeCare Hospital' },
  { src: '/destination.png', label: 'Destination Anywhere' },
  { src: '/inventory.png', label: 'FruitManager' },
  { src: '/hvac.png', label: 'HVAC' },
  { src: '/chemical.png', label: 'Classic Organic Chemicals' },
  { src: '/form-web.png', label: 'Elite Cloud Books' },
]

const values = [
  { title: 'Results over activity', desc: 'We measure success by your outcomes, not our hours. If it doesn\'t move the needle, we don\'t do it.', color: '#60a5fa' },
  { title: 'Radical transparency', desc: 'Weekly updates, live dashboards, honest timelines. You always know where your money and project stand.', color: '#34d399' },
  { title: 'Long-term thinking', desc: 'We build for scale and maintainability. The code we write today should serve you 5 years from now.', color: '#c084fc' },
  { title: 'Speed without shortcuts', desc: 'We move fast by being prepared, not by cutting corners. Quality and velocity aren\'t mutually exclusive.', color: '#fbbf24' },
]

const timeline = [
  { year: '2019', event: 'Founded in Mumbai as a 2-person web studio', color: '#60a5fa' },
  { year: '2020', event: 'Expanded to mobile development, first 10 clients', color: '#34d399' },
  { year: '2021', event: 'Launched ViboERP — our flagship SaaS product', color: '#c084fc' },
  { year: '2022', event: 'Opened Bengaluru office, added performance marketing', color: '#fbbf24' },
  { year: '2023', event: 'Crossed 100 projects shipped, 80+ active clients', color: '#f87171' },
  { year: '2024', event: 'Enterprise division launched, team of 18', color: '#a78bfa' },
  { year: '2025', event: 'Expanding to Southeast Asia, AI product division', color: '#60a5fa' },
]

const stats = [
  { end: 150, suffix: '+', label: 'Projects Shipped', sub: 'Across 10+ industries' },
  { end: 80, suffix: '+', label: 'Happy Clients', sub: 'From startups to enterprises' },
  { end: 5, suffix: '+', label: 'Years Building', sub: 'Digital solutions at scale' },
  { end: 99, suffix: '%', label: 'Client Retention', sub: 'Long-term partnerships' },
  { end: 18, suffix: '', label: 'Team Members', sub: 'Across Mumbai & Bengaluru' },
  { end: 4.9, suffix: '★', label: 'Average Rating', sub: 'Across all client reviews', decimals: 1 },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden" style={{ background: '#03050f' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.5 }}>
          <LightRays raysOrigin="top-center" raysColor="#4f79ff" raysSpeed={0.6} lightSpread={1.3} rayLength={1.7} followMouse mouseInfluence={0.06} />
        </div>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 30% 40%, rgba(37,99,235,0.07), transparent)' }} />
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] text-white/30 text-xs tracking-[0.2em] uppercase mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                Our Story
              </div>
              <h1 className="font-display font-black leading-none mb-6" style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)', letterSpacing: '-0.04em' }}>
                <span className="block text-white">Technology</span>
                <span className="block text-white">That Creates</span>
                <span className="block">
                  <GradientText colors={['#60a5fa','#4f46e5','#a78bfa','#60a5fa']} animationSpeed={5}>
                    Real Value.
                  </GradientText>
                </span>
              </h1>
              <p className="text-white/40 text-base leading-relaxed mb-8 max-w-lg">
                Mehta Technologies was built on one belief — technology should create measurable business value, not just look impressive in demos. Since 2019, we've delivered on that promise for 80+ clients across India and Southeast Asia.
              </p>
              <div className="flex gap-4">
                <a href="/contact" className="px-7 py-3.5 rounded-full text-white text-sm font-medium" style={{ background: 'linear-gradient(135deg, #2563EB, #4f46e5)' }}>
                  Work With Us
                </a>
                <a href="/work" className="px-7 py-3.5 rounded-full text-white/50 text-sm border border-white/10 hover:text-white hover:border-white/20 transition-all">
                  See Our Work
                </a>
              </div>
            </div>

            {/* Right: glowing card */}
            <BorderGlow glowColor="rgba(37,99,235,0.4)" borderRadius="1.25rem" glowIntensity={0.3} animated>
              <div className="rounded-[1.25rem] p-5 md:p-8" style={{ background: 'linear-gradient(135deg, #0a0a14, #0d0d20)' }}>
                <p className="text-white/35 text-[10px] uppercase tracking-[0.3em] mb-5">Quick Facts</p>
                <div className="grid grid-cols-2 gap-6">
                  {stats.slice(0, 4).map(s => (
                    <div key={s.label}>
                      <div className="font-display font-black text-white leading-none mb-1" style={{ fontSize: '2.5rem', letterSpacing: '-0.04em' }}>
                        <span style={{ background: 'linear-gradient(135deg, #60a5fa, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                          <CountUp end={s.end} suffix={s.suffix} enableScrollSpy scrollSpyOnce duration={2} decimals={s.decimals ?? 0} />
                        </span>
                      </div>
                      <p className="text-white/60 text-sm font-medium">{s.label}</p>
                      <p className="text-white/25 text-xs">{s.sub}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-5 border-t border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-white/35 text-xs">Available for new projects</span>
                  </div>
                </div>
              </div>
            </BorderGlow>
          </div>
        </div>
        <GradualBlur position="bottom" strength={3} height="8rem" />
      </section>

      {/* Values */}
      <section className="py-24 border-t border-white/[0.04]" style={{ background: '#04050e' }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <p className="text-white/25 text-xs uppercase tracking-[0.3em] mb-5">What We Stand For</p>
          <h2 className="font-display font-black text-white mb-14" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '-0.04em' }}>
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <BorderGlow key={v.title} glowColor={`${v.color}50`} borderRadius="1.25rem" glowIntensity={0}>
                <div className="rounded-[1.25rem] p-6 h-full" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ width: 36, height: 36, borderRadius: '0.625rem', background: `${v.color}15`, border: `1px solid ${v.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                    <span style={{ color: v.color, fontSize: '1rem', fontWeight: 700, fontFamily: 'var(--font-poppins)' }}>{String(i+1).padStart(2,'0')}</span>
                  </div>
                  <h3 style={{ color: 'white', fontWeight: 700, fontSize: '1rem', marginBottom: 8, fontFamily: 'var(--font-poppins)' }}>{v.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.85rem', lineHeight: 1.7 }}>{v.desc}</p>
                </div>
              </BorderGlow>
            ))}
          </div>
        </div>
      </section>

      {/* Project screenshots marquee */}
      <section className="py-12 border-t border-white/[0.04] overflow-hidden" style={{ background: '#04050e' }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 mb-6">
          <p className="text-white/20 text-[10px] uppercase tracking-[0.3em]">150+ Projects Delivered</p>
        </div>
        <LogoLoop
          logos={[...projectScreenshots, ...projectScreenshots].map(({ src, label }, i) => ({
            node: (
              <div key={i} className="shrink-0 group relative overflow-hidden" style={{ width: 200, height: 112, borderRadius: 10, border: '1px solid rgba(255,255,255,0.07)' }}>
                <img src={src} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block', opacity: 0.65, transition: 'opacity 0.3s' }} />
                <div className="absolute inset-0 flex items-end p-2.5" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)', opacity: 0, transition: 'opacity 0.3s' }}>
                  <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 10, fontWeight: 600, letterSpacing: '0.05em' }}>{label}</span>
                </div>
              </div>
            )
          }))}
          logoHeight={112}
          speed={45}
          direction="left"
          gap={12}
          fadeOut
        />
        <div className="mt-3">
          <LogoLoop
            logos={[...[...projectScreenshots].reverse(), ...[...projectScreenshots].reverse()].map(({ src, label }, i) => ({
              node: (
                <div key={i} className="shrink-0 overflow-hidden" style={{ width: 200, height: 112, borderRadius: 10, border: '1px solid rgba(255,255,255,0.07)' }}>
                  <img src={src} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block', opacity: 0.45 }} />
                </div>
              )
            }))}
            logoHeight={112}
            speed={35}
            direction="right"
            gap={12}
            fadeOut
          />
        </div>
      </section>

      {/* Ballpit — interactive physics interlude */}
      <section className="relative overflow-hidden border-t border-white/[0.04]" style={{ background: '#04050e', height: 360 }}>
        <Ballpit
          count={55}
          gravity={0}
          friction={0.9985}
          colors={['#2563EB', '#4f46e5', '#7c3aed', '#3b82f6', '#60a5fa']}
          followCursor
          className="absolute inset-0 w-full h-full"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 gap-2">
          <p className="text-white/20 text-[9px] uppercase tracking-[0.4em]">Interactive · Move your cursor</p>
        </div>
        <div className="absolute top-0 left-0 right-0 h-16 pointer-events-none" style={{ background: 'linear-gradient(to bottom, #04050e, transparent)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none" style={{ background: 'linear-gradient(to top, #05060f, transparent)' }} />
      </section>

      {/* Timeline */}
      <section className="py-24 border-t border-white/[0.04]" style={{ background: '#05060f' }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <p className="text-white/25 text-xs uppercase tracking-[0.3em] mb-5">Our Journey</p>
          <h2 className="font-display font-black text-white mb-14" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '-0.04em' }}>
            Built Year By Year
          </h2>
          <div className="flex flex-col gap-4">
            {timeline.map((item, i) => (
              <div key={item.year} className="flex items-start gap-5 group">
                {/* Year pill */}
                <div className="shrink-0 w-16 pt-3.5 text-right">
                  <span className="text-xs font-bold tabular-nums" style={{ color: item.color }}>{item.year}</span>
                </div>
                {/* Line + dot */}
                <div className="shrink-0 flex flex-col items-center pt-1">
                  <div className="w-3 h-3 rounded-full border-2 transition-all duration-300" style={{ background: `${item.color}30`, borderColor: item.color }} />
                  {i < timeline.length - 1 && <div className="w-px flex-1 mt-1" style={{ background: `linear-gradient(to bottom, ${item.color}40, transparent)`, minHeight: 40 }} />}
                </div>
                {/* Card */}
                <div className="flex-1 pb-4 group-hover:translate-x-1 transition-transform duration-300">
                  <div className="px-5 py-4 rounded-xl border transition-all duration-300" style={{ background: 'rgba(255,255,255,0.03)', borderColor: `rgba(255,255,255,0.07)` }}>
                    <p className="text-white font-semibold text-sm leading-snug">{item.event}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team section */}
      <Team />

      {/* CTA */}
      <section className="py-24 border-t border-white/[0.04] text-center" style={{ background: '#03050f' }}>
        <div className="max-w-xl mx-auto px-6">
          <h2 className="font-display font-black text-white mb-5" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.04em' }}>
            Let's Build Something
          </h2>
          <p className="text-white/35 text-base mb-8">Ready to work with a team that actually cares about your success?</p>
          <a href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-semibold" style={{ background: 'linear-gradient(135deg, #2563EB, #4f46e5)' }}>
            Start a Conversation <ArrowUpRight size={16} />
          </a>
        </div>
      </section>
    </>
  )
}
