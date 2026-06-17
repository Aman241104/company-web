'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'

const links = [
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'Process', href: '/#process' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'About', href: '/about' },
]

function NavLink({ href, children }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a href={href} style={{
      fontFamily: 'var(--font-outfit)', fontSize: 13, textDecoration: 'none',
      color: hovered ? '#fff' : 'rgba(255,255,255,0.52)',
      padding: '6px 14px', borderRadius: 99,
      background: hovered ? 'rgba(255,255,255,0.07)' : 'transparent',
      transition: 'all 0.2s',
    }}
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
    >
      {children}
    </a>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', justifyContent: 'center', padding: '16px 24px', pointerEvents: 'none' }}>
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        style={{
          pointerEvents: 'all', width: '100%', maxWidth: 760,
          display: 'flex', alignItems: 'center',
          padding: '8px 8px 8px 20px', borderRadius: 99,
          border: `1px solid ${scrolled ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.07)'}`,
          background: scrolled ? 'rgba(6,6,20,0.92)' : 'rgba(6,6,20,0.5)',
          backdropFilter: 'blur(20px)',
          boxShadow: scrolled ? '0 8px 48px rgba(0,0,0,0.5)' : 'none',
          transition: 'all 0.35s ease',
        }}
      >
        {/* Logo */}
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 9, textDecoration: 'none', flexShrink: 0 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: 'linear-gradient(135deg, #5B8AF7 0%, #8B5CF6 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 13, color: '#fff', flexShrink: 0 }}>M</div>
          <span style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: 13.5, color: '#fff', letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>
            Mehta <span style={{ color: 'rgba(255,255,255,0.35)' }}>Technologies</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex" style={{ flex: 1, justifyContent: 'center', gap: 2, display: 'flex' }}>
          {links.map(l => <NavLink key={l.label} href={l.href}>{l.label}</NavLink>)}
        </div>

        {/* CTA */}
        <a href="/contact" className="hidden md:flex" style={{ textDecoration: 'none', flexShrink: 0 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '8px 18px', borderRadius: 99, background: 'linear-gradient(135deg, #5B8AF7, #8B5CF6)', fontFamily: 'var(--font-outfit)', fontWeight: 600, fontSize: 12.5, color: '#fff', cursor: 'pointer' }}>
            Get in Touch <ArrowUpRight size={13} />
          </span>
        </a>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="flex md:hidden" style={{ marginLeft: 'auto', background: 'rgba(255,255,255,0.07)', border: 'none', borderRadius: 8, padding: 7, cursor: 'pointer', color: '#fff' }}>
          {open ? <X size={17} /> : <Menu size={17} />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            style={{ position: 'fixed', top: 78, left: 16, right: 16, background: 'rgba(9,9,28,0.97)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '8px 8px 12px', pointerEvents: 'all' }}
          >
            {links.map(l => (
              <a key={l.label} href={l.href} onClick={() => setOpen(false)} style={{ display: 'block', fontFamily: 'var(--font-outfit)', fontSize: 15, color: 'rgba(255,255,255,0.65)', textDecoration: 'none', padding: '12px 12px', borderRadius: 8 }}>
                {l.label}
              </a>
            ))}
            <a href="/contact" onClick={() => setOpen(false)} style={{ display: 'block', marginTop: 8, textAlign: 'center', padding: 13, borderRadius: 99, textDecoration: 'none', background: 'linear-gradient(135deg, #5B8AF7, #8B5CF6)', fontFamily: 'var(--font-outfit)', fontWeight: 600, fontSize: 14, color: '#fff' }}>
              Get in Touch
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
