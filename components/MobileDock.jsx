'use client'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, Layers, Briefcase, FlaskConical } from 'lucide-react'

const DOCK_BOTTOM_OFFSET = 12 // matches `bottom-3` on the nav
const DOCK_SAFETY_BUFFER = 8 // small cushion so content never sits flush against the pill

const dockNavItems = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Services', href: '/services', icon: Layers },
  { label: 'Work', href: '/work', icon: Briefcase },
  { label: 'Labs', href: '/labs', icon: FlaskConical },
]

function isActivePath(pathname, href) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export default function MobileDock() {
  const pathname = usePathname() || '/'
  const [visible, setVisible] = useState(true)
  const [navMenuOpen, setNavMenuOpen] = useState(false)
  const navRef = useRef(null)
  const lastYRef = useRef(0)
  const shown = visible && !navMenuOpen

  useEffect(() => {
    const handleNavToggle = (e) => setNavMenuOpen(!!e.detail?.open)
    window.addEventListener('mobile-nav-toggle', handleNavToggle)
    return () => window.removeEventListener('mobile-nav-toggle', handleNavToggle)
  }, [])

  // Publish the dock's real rendered footprint (height + its fixed offset
  // from the viewport bottom, plus a safety buffer) as a CSS custom property
  // so any part of the site can reserve exactly enough clearance to never be
  // covered by the dock — self-adjusting if the dock's own size ever changes,
  // instead of a hardcoded pixel guess tuned to one device.
  // Re-runs whenever the dock remounts (it unmounts while hidden), so the
  // ResizeObserver always watches the live node rather than a detached one.
  // The last published value is deliberately kept while hidden: the dock
  // slides back in on scroll-up, so consumers must keep reserving for it.
  useEffect(() => {
    if (!shown) return
    const el = navRef.current
    if (!el || typeof ResizeObserver === 'undefined') return
    const publish = () => {
      const clearance = el.offsetHeight + DOCK_BOTTOM_OFFSET + DOCK_SAFETY_BUFFER
      document.documentElement.style.setProperty('--mobile-dock-clearance', `${clearance}px`)
    }
    publish()
    const ro = new ResizeObserver(publish)
    ro.observe(el)
    return () => ro.disconnect()
  }, [shown])

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(() => {
        const y = window.scrollY
        const lastY = lastYRef.current
        // Show when scrolling up or near the top
        if (y < 60) {
          setVisible(true)
        } else if (y > lastY + 12) {
          setVisible(false)
        } else if (y < lastY - 8) {
          setVisible(true)
        }
        lastYRef.current = y
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // The fast-track drawer is only mounted on some routes. When it is, it
  // flags <html data-fast-track="ready"> and the button opens it in place;
  // everywhere else this stays an ordinary link to /contact (which is also
  // what a no-JS visitor gets).
  const openFastTrack = (e) => {
    if (document.documentElement.getAttribute('data-fast-track') !== 'ready') return
    e.preventDefault()
    window.dispatchEvent(new CustomEvent('open-fast-track'))
  }

  return (
    <AnimatePresence>
      {shown && (
        <motion.nav
          ref={navRef}
          initial={{ y: 70, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 70, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
          aria-label="Mobile navigation"
          className="md:hidden fixed bottom-3 inset-x-0 z-50 flex justify-center px-3 pointer-events-none"
          style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
        >
          <div className="pointer-events-auto rounded-full bg-ink border border-cream/10 p-1.5 shadow-lg shadow-ink/25 flex items-center justify-between gap-0.5 max-w-[360px] w-full mx-auto">
            {dockNavItems.map((item) => {
              const isActive = isActivePath(pathname, item.href)
              const Icon = item.icon

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative flex-1 flex flex-col items-center justify-center h-11 px-1 rounded-full transition-colors active:scale-95 ${
                    isActive ? 'text-cream' : 'text-cream/70 hover:text-cream'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="dock-active-pill"
                      className="absolute inset-0 rounded-full bg-cream/10"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  )}
                  <Icon size={17} aria-hidden="true" className={`relative z-10 ${isActive ? 'text-ice' : ''}`} />
                  <span className={`relative z-10 text-[10px] tracking-tight mt-0.5 ${isActive ? 'font-semibold' : 'font-medium'}`}>
                    {item.label}
                  </span>
                </Link>
              )
            })}

            {/* Primary action — the coral pill, ink label for AA contrast. */}
            <Link
              href="/contact"
              onClick={openFastTrack}
              className="relative flex items-center justify-center px-4 h-10 rounded-full bg-accent text-ink font-semibold text-xs active:scale-95 transition-transform shrink-0 ml-1"
            >
              Consult
            </Link>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
