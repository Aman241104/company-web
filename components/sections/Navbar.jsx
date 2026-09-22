'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight, ChevronDown } from 'lucide-react'

const links = [
  { label: 'Home', href: '/' },
  {
    label: 'Services',
    href: '/services',
    dropdown: [
      { label: 'Website Development', href: '/services#service-01' },
      { label: 'E-Commerce Development', href: '/services#service-02' },
      { label: 'Custom Software Development', href: '/services#service-05' },
      { label: 'Mobile App Development', href: '/services#service-04' },
      { label: 'Performance Marketing', href: '/services#service-06' },
    ],
  },
  { label: 'Our Work', href: '/work' },
  { label: 'Vibo ERP', href: '/#products' },
  { label: 'About Us', href: '/about' },
]

function NavLink({ href, children, dropdown }) {
  const [hovered, setHovered] = useState(false)
  const menuId = dropdown ? `navdropdown-${String(children).toLowerCase().replace(/\s+/g, '-')}` : undefined

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link
        href={href}
        aria-haspopup={dropdown ? 'menu' : undefined}
        aria-expanded={dropdown ? hovered : undefined}
        aria-controls={menuId}
        className="inline-flex items-center gap-1.5 py-2 text-[13.5px] font-medium text-[#13332C]/65 hover:text-[#13332C] transition-colors"
      >
        {children}
        {dropdown && (
          <ChevronDown
            size={12}
            aria-hidden="true"
            className={`transition-transform duration-200 opacity-60 ${hovered ? 'rotate-180 opacity-100' : ''}`}
          />
        )}
      </Link>

      {dropdown && (
        <AnimatePresence>
          {hovered && (
            <motion.div
              id={menuId}
              role="menu"
              initial={{ opacity: 0, y: 4, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full left-0 mt-2 min-w-[220px] p-1.5 rounded-xl bg-white border border-[#13332C]/10 shadow-2xl shadow-black/10 z-50"
            >
              {dropdown.map((d) => (
                <Link
                  key={d.label}
                  href={d.href}
                  className="block px-3 py-2 text-[13px] text-[#13332C]/65 hover:text-[#13332C] hover:bg-[#FAF6EE] rounded-lg transition-colors"
                >
                  {d.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const mobileMenuRef = useRef(null)
  const mobileToggleRef = useRef(null)
  const lastFocusedRef = useRef(null)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    // Let other fixed-position elements (bottom mobile dock, floating
    // WhatsApp button) know to get out of the way while this menu is
    // open, so nothing stacks on top of it or stays reachable behind it.
    window.dispatchEvent(new CustomEvent('mobile-nav-toggle', { detail: { open } }))
  }, [open])

  useEffect(() => {
    if (!open) return

    const main = document.getElementById('main-content')
    lastFocusedRef.current = document.activeElement
    document.body.style.overflow = 'hidden'
    main?.setAttribute('aria-hidden', 'true')
    mobileMenuRef.current?.querySelector('a, button')?.focus()

    const handleEsc = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const handleTab = (e) => {
      if (e.key !== 'Tab' || !mobileMenuRef.current) return
      // The toggle button lives in the header row, outside the dropdown
      // panel itself — include it explicitly so the trap loop covers the
      // whole interactive surface of the open menu, not just the panel.
      const panelFocusable = mobileMenuRef.current.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
      const focusable = mobileToggleRef.current
        ? [mobileToggleRef.current, ...panelFocusable]
        : [...panelFocusable]
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', handleEsc)
    window.addEventListener('keydown', handleTab)
    return () => {
      window.removeEventListener('keydown', handleEsc)
      window.removeEventListener('keydown', handleTab)
      document.body.style.overflow = ''
      main?.removeAttribute('aria-hidden')
      ;(lastFocusedRef.current || mobileToggleRef.current)?.focus()
    }
  }, [open])

  return (
    <>
      {/* Mobile menu backdrop — rendered outside the fixed header so its
          `fixed inset-0` resolves against the viewport, not the header's
          own (fixed, thus containing-block-forming) box. */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
            className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-xl border-b border-[#13332C]/10 shadow-sm'
            : 'bg-white/70 backdrop-blur-md border-b border-transparent'
        }`}
      >
        <div className="max-w-[1360px] mx-auto flex items-center justify-between px-6 md:px-8 py-3.5">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-8 h-8 rounded-lg overflow-hidden ring-1 ring-[#13332C]/10">
              <Image src="/brand/mehta-logo-icon-dark.png" alt="Mehta Technologies" width={32} height={32} className="w-full h-full object-cover" loading="eager" fetchPriority="high" />
            </div>
            <span className="flex flex-col leading-none">
              <span className="font-bold text-[14px] tracking-tight text-[#13332C]">MEHTA</span>
              <span className="text-[9px] tracking-[0.15em] font-medium text-[#13332C]/50">TECHNOLOGIES</span>
            </span>
          </Link>

          {/* Desktop links */}
          <nav className="hidden lg:flex items-center gap-7">
            {links.map((l) => (
              <NavLink key={l.label} href={l.href} dropdown={l.dropdown}>
                {l.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Tools & CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-[#FF6B3D] text-white hover:bg-[#E2542A] transition-all active:scale-[0.98] shadow-sm shadow-[#FF6B3D]/20"
            >
              Get a Free Consultation <ArrowUpRight size={13} />
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              ref={mobileToggleRef}
              onClick={() => setOpen(!open)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="p-2 rounded-lg bg-[#FAF6EE] border border-[#13332C]/10 text-[#13332C] hover:bg-[#F1EAD9] transition-colors"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        <AnimatePresence>
          {open && (
            <motion.div
              ref={mobileMenuRef}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="md:hidden relative z-50 mx-4 mb-4 p-3 rounded-2xl bg-white border border-[#13332C]/10 shadow-2xl shadow-black/10"
            >
              {links.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2.5 text-sm font-medium text-[#13332C]/70 hover:text-[#13332C] hover:bg-[#FAF6EE] rounded-xl transition-colors"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="mt-2 block w-full py-2.5 text-center text-xs font-semibold rounded-xl bg-[#FF6B3D] hover:bg-[#E2542A] text-white transition-colors"
              >
                Get a Free Consultation
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}
