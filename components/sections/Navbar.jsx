'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const MLogoSVG = () => (
  <svg width="34" height="30" viewBox="0 0 100 85" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="10,80 32,10 50,48 68,10 90,80 76,80 66,52 50,72 34,52 24,80" fill="white" />
    <polygon points="50,48 44,60 50,72 56,60" fill="#030408" />
  </svg>
)

const navLinks = [
  { num: '01', label: 'Projects', href: '/work', sub: 'Selected projects' },
  { num: '02', label: 'Services', href: '/services', sub: 'What we do' },
  { num: '03', label: 'About', href: '/about', sub: 'Who we are' },
  { num: '04', label: 'Process', href: '/#process', sub: 'How we work' },
  { num: '05', label: 'Contact', href: '/contact', sub: 'Start a project' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const overlayRef = useRef(null)
  const linkRefs = useRef([])
  const metaRef = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const overlay = overlayRef.current
    if (!overlay) return

    if (open) {
      document.body.style.overflow = 'hidden'
      gsap.set(overlay, { display: 'flex' })
      gsap.fromTo(overlay,
        { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' },
        { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: 0.75, ease: 'power4.inOut' }
      )
      gsap.fromTo(linkRefs.current,
        { x: 80, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.06, duration: 0.7, ease: 'power3.out', delay: 0.4 }
      )
      gsap.fromTo(lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: 'power2.inOut', delay: 0.35 }
      )
      gsap.fromTo(metaRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.55 }
      )
    } else {
      document.body.style.overflow = ''
      gsap.to(overlay, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        duration: 0.65,
        ease: 'power4.inOut',
        onComplete: () => gsap.set(overlay, { display: 'none' }),
      })
    }
  }, [open])

  const close = () => {
    setOpen(false)
  }

  return (
    <>
      {/* Minimal header bar — Agex reference style */}
      <header
        className="fixed top-0 inset-x-0 z-50 flex items-center justify-between relative"
        style={{
          padding: scrolled ? '12px max(16px, 4vw)' : '20px max(16px, 4vw)',
          transition: 'padding 0.4s ease, background 0.4s ease, border-color 0.4s ease',
          background: scrolled ? 'rgba(3,5,15,0.85)' : 'transparent',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
        }}
      >
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 shrink-0">
          <MLogoSVG />
          <span className="font-display font-semibold text-white tracking-[0.12em] text-[13px] hidden sm:block">MEHTA</span>
        </a>

        {/* Center pill nav — truly centered via absolute positioning */}
        <nav
          className="hidden lg:flex items-center gap-7 absolute left-1/2 -translate-x-1/2"
          style={{
            padding: '7px 24px',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 9999,
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(12px)',
          }}
        >
          {navLinks.slice(0, 4).map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-[13px] text-white/40 hover:text-white transition-colors duration-200 tracking-wide"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Right: CTA + hamburger */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="/contact"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] text-white font-semibold"
            style={{
              background: 'linear-gradient(135deg, #2563EB, #4f46e5)',
              boxShadow: '0 0 20px rgba(37,99,235,0.3)',
            }}
          >
            Get Started
          </a>
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 group"
            aria-label="Open menu"
          >
            <span className="text-[11px] text-white/35 tracking-[0.2em] uppercase group-hover:text-white/60 transition-colors hidden sm:block">Menu</span>
            <div className="flex flex-col gap-1.5 p-2">
              <span className="block w-5 h-px bg-white/50 group-hover:bg-white transition-colors duration-200" />
              <span className="block w-3.5 h-px bg-white/30 group-hover:bg-white/60 transition-colors duration-200" />
            </div>
          </button>
        </div>
      </header>

      {/* Full-screen overlay menu */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[200] flex-col"
        style={{ display: 'none', background: '#040404' }}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-8 md:px-14 pt-6 md:pt-8 shrink-0">
          <a href="/" onClick={() => close()} className="flex items-center gap-3">
            <MLogoSVG />
            <span className="font-display font-semibold text-white tracking-[0.12em] text-[13px]">MEHTA</span>
          </a>
          <button
            onClick={() => setOpen(false)}
            className="group flex items-center gap-3 text-white/40 hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <span className="text-[11px] tracking-[0.2em] uppercase hidden sm:block">Close</span>
            <div className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-all">
              <span className="text-sm leading-none">✕</span>
            </div>
          </button>
        </div>

        {/* Divider line */}
        <div ref={lineRef} className="mx-8 md:mx-14 mt-6 h-px origin-left"
          style={{ background: 'rgba(255,255,255,0.06)' }} />

        {/* Navigation links */}
        <nav className="flex-1 flex flex-col justify-center px-8 md:px-14 py-8">
          {navLinks.map((l, i) => (
            <div
              key={l.label}
              ref={(el) => (linkRefs.current[i] = el)}
              className="group border-b border-white/[0.05] first:border-t"
            >
              <a
                href={l.href}
                onClick={() => close()}
                className="flex items-center justify-between py-5 md:py-6 cursor-pointer"
              >
                <div className="flex items-baseline gap-5 md:gap-8">
                  <span className="text-white/35 font-display text-xs tabular-nums">{l.num}</span>
                  <span
                    className="font-display font-black text-white/80 group-hover:text-white transition-colors leading-none"
                    style={{ fontSize: 'clamp(1.75rem, 7vw, 6.5rem)', letterSpacing: '-0.03em' }}
                  >
                    {l.label}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-white/40 text-sm hidden md:block">{l.sub}</span>
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-blue-500/40 group-hover:bg-blue-500/10 transition-all">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/30 group-hover:text-blue-400 transition-colors" />
                    </svg>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </nav>

        {/* Bottom meta */}
        <div ref={metaRef} className="px-8 md:px-14 pb-10 md:pb-12 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 shrink-0" style={{ paddingBottom: 'max(2.5rem, env(safe-area-inset-bottom, 0px) + 1.5rem)' }}>
          <div>
            <p className="text-white/20 text-xs uppercase tracking-[0.25em] mb-2">Get in Touch</p>
            <a href="mailto:hello@mehtatechnologies.com" className="text-white/50 text-sm hover:text-white transition-colors">
              hello@mehtatechnologies.com
            </a>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white/25 text-xs">Available for new projects</span>
          </div>
        </div>
      </div>
    </>
  )
}
