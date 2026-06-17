'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'
import BrowserMockup from '@/components/ui/BrowserMockup'
import ViboERPDashboard from '@/components/ui/ViboERPDashboard'
import RotatingText from '@/components/ui/reactbits/RotatingText'
import DecryptedText from '@/components/ui/reactbits/DecryptedText'
import GradientText from '@/components/ui/reactbits/GradientText'
import BlurText from '@/components/ui/reactbits/BlurText'
import CountUp from 'react-countup'
import LogoLoop from '@/components/ui/reactbits/LogoLoop'
import GradualBlur from '@/components/ui/reactbits/GradualBlur'

gsap.registerPlugin(ScrollTrigger)

const clients = [
  { init: 'GK', color: '#2563EB' },
  { init: 'PS', color: '#7c3aed' },
  { init: 'AK', color: '#059669' },
  { init: 'NP', color: '#d97706' },
  { init: 'RM', color: '#dc2626' },
]

const marqueeItems = ['Website Development', 'Mobile Apps', 'SaaS Products', 'Performance Marketing', 'UI/UX Design', 'SEO', 'Cloud Infrastructure', 'ERP Solutions']

/* Floating tag pills — inspired by Growaz reference */
const floatingTags = [
  { label: '⚡ Full-Stack', delay: '0s', side: 'left', top: '30%' },
  { label: '🚀 Product-Led', delay: '1.8s', side: 'right', top: '22%' },
  { label: '✦ Enterprise', delay: '0.9s', side: 'left', top: '52%' },
  { label: '★ 5.0 Rated', delay: '2.5s', side: 'right', top: '46%' },
]

function FloatingTags() {
  return (
    <>
      {floatingTags.map((tag, i) => (
        <div
          key={i}
          className="absolute z-20 pointer-events-none hidden 2xl:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-medium border"
          style={{
            top: tag.top,
            left: tag.side === 'left' ? '1.5%' : undefined,
            right: tag.side === 'right' ? '1.5%' : undefined,
            background: 'rgba(255,255,255,0.03)',
            borderColor: 'rgba(255,255,255,0.08)',
            color: 'rgba(255,255,255,0.4)',
            animation: `float 7s ease-in-out infinite`,
            animationDelay: tag.delay,
            backdropFilter: 'blur(8px)',
          }}
        >
          {tag.label}
        </div>
      ))}
    </>
  )
}

function AvatarStack() {
  return (
    <div className="flex">
      {clients.map((c, i) => (
        <div
          key={i}
          className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2"
          style={{
            background: `linear-gradient(135deg, ${c.color}, ${c.color}aa)`,
            borderColor: '#03050f',
            marginLeft: i ? -10 : 0,
            zIndex: clients.length - i,
          }}
        >
          {c.init}
        </div>
      ))}
    </div>
  )
}

export default function Hero() {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const beamRef = useRef(null)

  /* Twinkling star canvas */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let w = (canvas.width = window.innerWidth)
    let h = (canvas.height = window.innerHeight * 1.4)
    let animId

    const stars = Array.from({ length: 160 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.2 + 0.2,
      phase: Math.random() * Math.PI * 2,
      speed: 0.008 + Math.random() * 0.015,
      vx: (Math.random() - 0.5) * 0.05,
      vy: (Math.random() - 0.5) * 0.05,
    }))

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h)
      stars.forEach((s) => {
        s.x += s.vx; s.y += s.vy
        if (s.x < 0) s.x = w; if (s.x > w) s.x = 0
        if (s.y < 0) s.y = h; if (s.y > h) s.y = 0
        const alpha = 0.3 + 0.5 * Math.sin(t * s.speed + s.phase)
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(148,190,255,${alpha})`
        ctx.fill()
      })
      animId = requestAnimationFrame(draw)
    }
    animId = requestAnimationFrame(draw)
    const onResize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight * 1.4
    }
    window.addEventListener('resize', onResize)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onResize) }
  }, [])

  /* GSAP reveal */
  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 768px)', () => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' }, delay: 0.35 })
      tl.fromTo(beamRef.current, { opacity: 0, scaleY: 0 }, { opacity: 1, scaleY: 1, duration: 1.4, ease: 'power2.out', transformOrigin: 'bottom center' }, 0)
        .fromTo('.hero-badge', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7 }, 0.3)
        .fromTo('.hero-h1', { y: '105%', skewY: 2 }, { y: '0%', skewY: 0, duration: 1.0, stagger: 0.1 }, 0.5)
        .fromTo('.hero-sub', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, 1.0)
        .fromTo('.hero-ctas', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, 1.1)
        .fromTo('.hero-social', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 1.2)
        .fromTo('.hero-mockup', { opacity: 0, y: 80, rotateX: 12 }, { opacity: 1, y: 0, rotateX: 4, duration: 1.4, ease: 'power3.out' }, 1.0)
    })
    mm.add('(max-width: 767px)', () => {
      gsap.fromTo(['.hero-badge', '.hero-h1', '.hero-sub', '.hero-ctas', '.hero-social', '.hero-mockup'],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.7, ease: 'power3.out', delay: 0.2 }
      )
    })
    return () => mm.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col overflow-hidden"
      style={{ background: '#03050f', minHeight: '100vh' }}
    >
      {/* ── Stars canvas ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.85 }}
      />

      {/* ── Floating tag pills ── */}
      <FloatingTags />

      {/* ── Grain texture ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          opacity: 0.025,
        }}
      />

      {/* ── Light beam (Agex-style) ── */}
      <div ref={beamRef} className="absolute inset-0 pointer-events-none overflow-hidden" style={{ transformOrigin: 'bottom center' }}>
        {/* Wide base glow — stronger */}
        <div className="absolute" style={{
          bottom: '-5%', left: '50%', transform: 'translateX(-50%)',
          width: 1200, height: 1000,
          background: 'radial-gradient(ellipse 40% 65% at 50% 100%, rgba(37,99,235,0.75) 0%, rgba(37,99,235,0.32) 28%, rgba(79,70,229,0.1) 52%, transparent 70%)',
        }} />
        {/* Second wider ambient glow */}
        <div className="absolute" style={{
          bottom: '-5%', left: '50%', transform: 'translateX(-50%)',
          width: 1600, height: 700,
          background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(37,99,235,0.18) 0%, rgba(79,70,229,0.06) 45%, transparent 70%)',
          filter: 'blur(20px)',
        }} />
        {/* Narrow hairline beam — bright */}
        <div className="absolute left-1/2 -translate-x-1/2" style={{
          top: 0, bottom: 0, width: 1,
          background: 'linear-gradient(to top, rgba(200,220,255,1) 0%, rgba(147,197,253,1) 20%, rgba(96,165,250,0.8) 45%, rgba(37,99,235,0.3) 70%, transparent 90%)',
        }} />
        {/* Bright core — narrow */}
        <div className="absolute left-1/2 -translate-x-1/2" style={{
          top: 0, bottom: 0, width: 3,
          background: 'linear-gradient(to top, rgba(147,197,253,0.9) 0%, rgba(96,165,250,0.5) 35%, transparent 80%)',
          filter: 'blur(1px)',
        }} />
        {/* Soft beam column */}
        <div className="absolute left-1/2 -translate-x-1/2" style={{
          top: 0, bottom: 0, width: 100,
          background: 'linear-gradient(to top, rgba(37,99,235,0.38) 0%, rgba(37,99,235,0.15) 35%, rgba(37,99,235,0.05) 65%, transparent 90%)',
          filter: 'blur(22px)',
        }} />
        {/* Wide soft column */}
        <div className="absolute left-1/2 -translate-x-1/2" style={{
          top: 0, bottom: 0, width: 280,
          background: 'linear-gradient(to top, rgba(37,99,235,0.15) 0%, rgba(37,99,235,0.06) 40%, transparent 75%)',
          filter: 'blur(50px)',
        }} />
        {/* Horizontal lens flare — brighter */}
        <div className="absolute left-0 right-0" style={{
          top: '30%', height: 1,
          background: 'linear-gradient(to right, transparent 5%, rgba(96,165,250,0.2) 28%, rgba(200,220,255,0.7) 50%, rgba(96,165,250,0.2) 72%, transparent 95%)',
        }} />
        <div className="absolute left-0 right-0" style={{
          top: 'calc(30% - 8px)', height: 16,
          background: 'linear-gradient(to right, transparent 12%, rgba(96,165,250,0.06) 38%, rgba(147,197,253,0.18) 50%, rgba(96,165,250,0.06) 62%, transparent 88%)',
          filter: 'blur(5px)',
        }} />
        {/* Top fade */}
        <div className="absolute top-0 left-0 right-0 h-24" style={{
          background: 'linear-gradient(to bottom, #03050f, transparent)',
        }} />
      </div>

      {/* ── Perspective grid floor ── */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden" style={{ height: 280 }}>
        <div style={{
          position: 'absolute', bottom: 0, left: '-20%', right: '-20%', height: '100%',
          backgroundImage: 'linear-gradient(rgba(37,99,235,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.12) 1px, transparent 1px)',
          backgroundSize: '70px 70px',
          transform: 'perspective(500px) rotateX(75deg)',
          transformOrigin: '50% 100%',
          maskImage: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)',
        }} />
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 flex-1 flex flex-col items-center text-center px-5 md:px-12 pt-24 md:pt-36 lg:pt-44 pb-0 w-full max-w-[1200px] self-center">

        {/* Pill badge */}
        <div className="hero-badge opacity-0 mb-10">
          <span
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-[11px] tracking-[0.18em] uppercase border"
            style={{
              background: 'rgba(37,99,235,0.07)',
              borderColor: 'rgba(37,99,235,0.28)',
              color: 'rgba(147,197,253,0.85)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <DecryptedText
              text="Premium Technology Partner · Est. 2019"
              animateOn="view"
              speed={22}
              sequential={true}
              className="text-blue-300/80"
              encryptedClassName="text-blue-500/35"
            />
          </span>
        </div>

        {/* Heading */}
        <div className="mb-10 md:mb-14">
          <div className="overflow-hidden pb-1">
            <div
              className="hero-h1 will-change-transform font-display font-black text-white"
              style={{ fontSize: 'clamp(1.875rem, 3vw, 3.5rem)', letterSpacing: '-0.035em', lineHeight: 1.05 }}
            >
              We{' '}
              <span className="inline-block overflow-hidden align-baseline" style={{ verticalAlign: 'baseline' }}>
                <RotatingText
                  texts={['Build', 'Craft', 'Ship', 'Scale']}
                  mainClassName="font-display font-black text-white"
                  elementLevelClassName="font-display font-black text-white"
                  splitBy="characters"
                  rotationInterval={2800}
                  staggerDuration={0.03}
                  staggerFrom="first"
                  transition={{ type: 'spring', damping: 20, stiffness: 250 }}
                  initial={{ y: '110%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: '-110%', opacity: 0 }}
                />
              </span>
            </div>
          </div>
          <div className="overflow-hidden pb-1">
            <div
              className="hero-h1 will-change-transform font-display font-black"
              style={{ fontSize: 'clamp(1.875rem, 3vw, 3.5rem)', letterSpacing: '-0.035em', lineHeight: 1.05 }}
            >
              <GradientText
                colors={['#60a5fa', '#818cf8', '#a78bfa', '#c084fc', '#60a5fa']}
                animationSpeed={5}
              >
                Digital Products
              </GradientText>
            </div>
          </div>
          <div className="overflow-hidden pb-1">
            <div
              className="hero-h1 will-change-transform font-display font-black"
              style={{
                fontSize: 'clamp(1.875rem, 3vw, 3.5rem)',
                letterSpacing: '-0.035em',
                lineHeight: 1.05,
                WebkitTextStroke: '1.5px rgba(255,255,255,0.18)',
                color: 'transparent',
              }}
            >
              That Dominate.
            </div>
          </div>
        </div>

        {/* Subtitle */}
        <div className="hero-sub opacity-0 mb-12 max-w-2xl">
          <BlurText
            text="End-to-end technology for businesses that want to build, scale, and lead their digital space."
            className="text-white/40 text-base md:text-xl leading-relaxed"
            animateBy="words"
            delay={45}
            direction="top"
            threshold={0.1}
          />
        </div>

        {/* CTAs */}
        <div className="hero-ctas opacity-0 flex flex-col sm:flex-row items-center gap-4 mb-10">
          <a
            href="/work"
            className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-white font-semibold text-sm overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #2563EB, #4f46e5)',
              boxShadow: '0 0 40px rgba(37,99,235,0.5), 0 0 80px rgba(37,99,235,0.2), 0 0 0 1px rgba(37,99,235,0.4)',
              animation: 'glow-pulse 3s ease-in-out infinite',
            }}
          >
            <span className="absolute inset-0 translate-x-[-110%] skew-x-[-20deg] bg-white/10 group-hover:translate-x-[150%] transition-transform duration-700" />
            <span className="relative">View Our Work</span>
            <ArrowUpRight size={15} className="relative transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="/contact"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-white/70 text-sm font-medium border hover:text-white hover:border-white/30 transition-all duration-300"
            style={{ borderColor: 'rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.06)' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.11)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
          >
            Start a Project
          </a>
        </div>

        {/* Social proof */}
        <div className="hero-social opacity-0 flex items-center gap-4 mb-14">
          <AvatarStack />
          <div className="h-5 w-px bg-white/10" />
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="12" height="12" viewBox="0 0 13 13" fill="#fbbf24">
                <polygon points="6.5,1 8,5 12,5.5 9,8 9.8,12 6.5,10.2 3.2,12 4,8 1,5.5 5,5" />
              </svg>
            ))}
          </div>
          <span className="text-white/35 text-xs">
            <CountUp end={150} suffix="+" duration={2.5} enableScrollSpy scrollSpyOnce /> clients trust us
          </span>
        </div>

        {/* ── Floating dashboard mockup — desktop only ── */}
        <div
          className="hero-mockup opacity-0 w-full max-w-5xl mx-auto relative hidden md:block"
          style={{ perspective: '1400px', transformStyle: 'preserve-3d' }}
        >
          {/* Glow under mockup */}
          <div
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 pointer-events-none"
            style={{
              width: '75%', height: 80,
              background: 'radial-gradient(ellipse, rgba(37,99,235,0.5) 0%, transparent 70%)',
              filter: 'blur(20px)',
            }}
          />
          <div
            style={{
              transform: 'rotateX(4deg)',
              transformStyle: 'preserve-3d',
              boxShadow: '0 60px 140px rgba(0,0,0,0.85), 0 0 0 1px rgba(37,99,235,0.25), 0 -1px 0 0 rgba(96,165,250,0.3)',
              borderRadius: 12,
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {/* Top edge glow line */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 1, zIndex: 10,
              background: 'linear-gradient(to right, transparent 5%, rgba(96,165,250,0.6) 30%, rgba(200,225,255,0.9) 50%, rgba(96,165,250,0.6) 70%, transparent 95%)',
            }} />
            <div className="overflow-hidden" style={{ maxHeight: 'clamp(220px, 45vw, 600px)' }}>
              <BrowserMockup url="app.viboerp.com">
                <ViboERPDashboard />
              </BrowserMockup>
            </div>
          </div>
        </div>
      </div>

      {/* ── Trusted by + Stats combined strip ── */}
      <div className="relative z-10 border-t border-white/[0.05]" style={{ background: 'rgba(3,5,15,0.7)' }}>

        {/* Project screenshots marquee */}
        <div className="border-b border-white/[0.04] overflow-hidden" style={{ background: 'rgba(255,255,255,0.008)', padding: '10px 0' }}>
          <div className="flex items-center gap-5 px-6 mb-2.5">
            <span className="text-white/20 text-[9px] uppercase tracking-[0.3em] font-medium shrink-0">Client Work</span>
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, rgba(255,255,255,0.06), transparent)' }} />
            <a href="/work" className="text-white/25 text-[9px] uppercase tracking-[0.2em] hover:text-white/50 transition-colors shrink-0">View All →</a>
          </div>
          <LogoLoop
            logos={[
              '/silverspoon-screenshot.png', '/interior.png', '/jjfilms.png', '/zingbliss.png',
              '/sweet.png', '/luxeliving.png', '/nextsphere.png', '/chahana.png',
              '/aangan.png', '/eyehospital.png', '/destination.png', '/chemical.png',
              '/silverspoon-screenshot.png', '/interior.png', '/jjfilms.png', '/zingbliss.png',
            ].map((src, i) => ({
              node: (
                <div
                  key={i}
                  className="shrink-0 overflow-hidden"
                  style={{
                    width: 148, height: 84, borderRadius: 9,
                    border: '1px solid rgba(255,255,255,0.09)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
                  }}
                >
                  <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }} />
                </div>
              )
            }))}
            logoHeight={84}
            speed={38}
            direction="left"
            gap={10}
            fadeOut
          />
        </div>

        {/* Marquee row */}
        <div className="py-4 border-b border-white/[0.04]">
          <LogoLoop
            logos={[...marqueeItems, ...marqueeItems].map((item, i) => ({
              node: (
                <span key={i} className="flex items-center gap-2.5 shrink-0">
                  <span className="w-1 h-1 rounded-full bg-blue-500/30 shrink-0" />
                  <span className="text-white/22 text-[10px] uppercase tracking-[0.22em] font-medium">{item}</span>
                </span>
              )
            }))}
            speed={50}
            direction="left"
            gap={28}
            pauseOnHover
            fadeOut
          />
        </div>

        {/* Stats row — grid with dividers */}
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.05]">
          {[
            { end: 150, suffix: '+', label: 'Projects Shipped', sub: 'Across 10+ industries' },
            { end: 80, suffix: '+', label: 'Happy Clients', sub: 'Startups to enterprise' },
            { end: 5, suffix: '+', label: 'Years Building', sub: 'Since 2019' },
            { end: 99, suffix: '%', label: 'Client Retention', sub: 'Long-term partnerships' },
          ].map(({ end, suffix, label, sub }, i) => (
            <div key={label} className={`flex flex-col items-center justify-center py-7 px-4 ${i >= 2 ? 'border-t md:border-t-0 border-white/[0.05]' : ''}`}>
              <div
                className="font-display font-bold text-white mb-1"
                style={{ fontSize: 'clamp(1.5rem, 2.2vw, 2.25rem)', letterSpacing: '-0.04em' }}
              >
                <CountUp end={end} suffix={suffix} duration={2.5} enableScrollSpy scrollSpyOnce />
              </div>
              <div className="text-white/50 text-[11px] font-medium mb-0.5">{label}</div>
              <div className="text-white/40 text-[9px] uppercase tracking-wider hidden sm:block">{sub}</div>
            </div>
          ))}
        </div>
      </div>

      <GradualBlur position="bottom" strength={2} height="5rem" />
    </section>
  )
}
