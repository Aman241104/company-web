'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight, ChevronDown, Phone } from 'lucide-react'
import ThemeToggle from '@/components/ThemeToggle'
import { openConsult } from '@/components/home/ui'
import { chapters } from '@/lib/services'
import { contact } from '@/lib/site'

const links = [
  {
    label: 'Services',
    href: '/services',
    dropdown: [
      ...chapters.map((c) => ({ label: c.name, href: `/services#chapter-${c.slug}` })),
      { label: 'All services →', href: '/services' },
    ],
  },
  { label: 'Our Work', href: '/work' },
  { label: 'How We Work', href: '/how-we-work' },
  { label: 'Vibo ERP', href: '/#products' },
  { label: 'About', href: '/about' },
  { label: 'Team', href: '/team' },
]

// Design system v2 primary button: solid coral pill. Ink (not white) text
// on the coral fill — white-on-#1F4FFF is ~2.8:1 and fails AA at this size,
// ink-on-coral is ~4.8:1. Hover flips to the ink fill rather than a darker
// coral, which keeps the label legible in both states.
const primaryPill =
  'inline-flex items-center justify-center gap-1.5 rounded-full bg-accent text-white font-semibold transition-colors hover:bg-accent-dim active:scale-[0.98]'

function isActivePath(pathname, href) {
  if (href === '/') return pathname === '/'
  if (href.startsWith('/#')) return false
  return pathname === href || pathname.startsWith(`${href}/`)
}

function NavLink({ href, children, dropdown, active }) {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef(null)
  const menuId = dropdown ? `navdropdown-${String(children).toLowerCase().replace(/\s+/g, '-')}` : undefined

  // Hover opens the dropdown for pointer users; focus-within opens it for
  // keyboard users (previously it was hover-only, so the sub-links were
  // unreachable by Tab), and Escape / focus leaving the wrapper closes it.
  const handleBlur = (e) => {
    if (!wrapperRef.current?.contains(e.relatedTarget)) setOpen(false)
  }

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => dropdown && setOpen(true)}
      onBlur={handleBlur}
      onKeyDown={(e) => {
        if (e.key === 'Escape') setOpen(false)
      }}
    >
      <Link
        href={href}
        aria-current={active ? 'page' : undefined}
        aria-haspopup={dropdown ? 'true' : undefined}
        aria-expanded={dropdown ? open : undefined}
        aria-controls={dropdown ? menuId : undefined}
        className={`relative inline-flex items-center gap-1.5 py-2 text-[14px] font-medium transition-colors after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-night after:transition-transform after:duration-300 ${
          active ? 'text-ink after:scale-x-100' : 'text-ink/75 hover:text-ink after:scale-x-0 hover:after:scale-x-100'
        }`}
      >
        {children}
        {dropdown && (
          <ChevronDown
            size={12}
            aria-hidden="true"
            className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          />
        )}
      </Link>

      {dropdown && (
        <AnimatePresence>
          {open && (
            <motion.div
              id={menuId}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-full left-0 pt-2 z-50"
            >
              <ul className="min-w-[240px] p-2 rounded-2xl bg-bg border border-border shadow-lg shadow-ink/5">
                {dropdown.map((d) => (
                  <li key={d.label}>
                    <Link
                      href={d.href}
                      className="block px-3 py-2 text-[13.5px] text-ink/75 hover:text-ink hover:bg-cream rounded-xl transition-colors"
                    >
                      {d.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  )
}

export default function Navbar() {
  const pathname = usePathname() || '/'
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const mobileMenuRef = useRef(null)
  const mobileToggleRef = useRef(null)
  const lastFocusedRef = useRef(null)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    fn()
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

    // Snapshot the refs inside the effect so the cleanup restores focus to
    // the nodes that existed when the menu opened (react-hooks/exhaustive-deps).
    const toggle = mobileToggleRef.current
    const menu = mobileMenuRef.current
    const main = document.getElementById('main-content')
    lastFocusedRef.current = document.activeElement
    const lastFocused = lastFocusedRef.current
    document.body.style.overflow = 'hidden'
    main?.setAttribute('aria-hidden', 'true')
    menu?.querySelector('a, button')?.focus()

    const handleEsc = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const handleTab = (e) => {
      const panel = mobileMenuRef.current
      if (e.key !== 'Tab' || !panel) return
      // The toggle button lives in the header row, outside the dropdown
      // panel itself — include it explicitly so the trap loop covers the
      // whole interactive surface of the open menu, not just the panel.
      const panelFocusable = panel.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
      const focusable = toggle ? [toggle, ...panelFocusable] : [...panelFocusable]
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
      ;(lastFocused || toggle)?.focus()
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
            aria-hidden="true"
            className="lg:hidden fixed inset-0 bg-night/40 backdrop-blur-[2px] z-40"
          />
        )}
      </AnimatePresence>

      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color] duration-300 border-b ${
          scrolled || open ? 'bg-cream/92 backdrop-blur-md border-border' : 'bg-cream/70 backdrop-blur-sm border-transparent'
        }`}
      >
        <div className="max-w-[1360px] mx-auto flex items-center justify-between gap-6 px-5 sm:px-6 md:px-8 py-3.5">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 rounded-lg" aria-label="Mehta Technologies — home">
            <span className="w-8 h-8 rounded-lg overflow-hidden ring-1 ring-border">
              <Image
                src="/brand/mehta-logo-icon-dark.png"
                alt=""
                width={32}
                height={32}
                className="w-full h-full object-cover dark:hidden"
                loading="eager"
                fetchPriority="high"
              />
              <Image
                src="/brand/mehta-logo-icon-light.png"
                alt=""
                width={32}
                height={32}
                className="w-full h-full object-cover hidden dark:block"
              />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display font-bold text-[14px] tracking-tight text-ink">MEHTA</span>
              <span className="text-[9px] tracking-[0.18em] font-medium text-ink/70">TECHNOLOGIES</span>
            </span>
          </Link>

          {/* Desktop links */}
          <nav aria-label="Primary" className="hidden lg:flex items-center gap-6 xl:gap-8">
            {links.map((l) => (
              <NavLink key={l.label} href={l.href} dropdown={l.dropdown} active={isActivePath(pathname, l.href)}>
                {l.label}
              </NavLink>
            ))}
          </nav>

          {/* Right CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a href={contact.tel} className="hidden xl:inline-flex items-center gap-1.5 text-[13px] font-semibold text-ink hover:text-accent">
              <Phone size={14} className="text-accent" aria-hidden="true" /> {contact.phone}
            </a>
            <ThemeToggle />
            <button type="button" onClick={() => openConsult()} className={`${primaryPill} px-5 py-2.5 text-[13px]`}>
              Contact Us <ArrowUpRight size={14} aria-hidden="true" />
            </button>
          </div>

          {/* Mobile menu toggle — small circular icon button, the third
              primitive of the v2 button system. */}
          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle />
            <button
              ref={mobileToggleRef}
              onClick={() => setOpen(!open)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="w-10 h-10 inline-flex items-center justify-center rounded-full border border-ink/20 text-ink hover:bg-night hover:text-snow transition-colors"
            >
              {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              ref={mobileMenuRef}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden relative z-50 mx-4 mb-4 p-2 rounded-3xl bg-bg border border-border shadow-xl shadow-ink/10"
            >
              <ul>
                {links.map((l) => {
                  const active = isActivePath(pathname, l.href)
                  return (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        onClick={() => setOpen(false)}
                        aria-current={active ? 'page' : undefined}
                        className={`flex items-center justify-between px-4 py-3 text-[15px] font-medium rounded-2xl transition-colors ${
                          active ? 'text-ink bg-cream' : 'text-ink/80 hover:text-ink hover:bg-cream'
                        }`}
                      >
                        {l.label}
                        {active && <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />}
                      </Link>
                    </li>
                  )
                })}
              </ul>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <a href={contact.tel} className="inline-flex items-center justify-center gap-1.5 rounded-full border border-ink/20 py-3 text-sm font-semibold text-ink">
                  <Phone size={14} aria-hidden="true" /> Call
                </a>
                <button
                  type="button"
                  onClick={() => { setOpen(false); openConsult() }}
                  className={`${primaryPill} py-3 text-sm`}
                >
                  Free quote <ArrowUpRight size={14} aria-hidden="true" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}
