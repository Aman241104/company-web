'use client'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, Layers, Briefcase, Sparkles, Zap } from 'lucide-react'

const DOCK_BOTTOM_OFFSET = 12 // matches `bottom-3` on the nav
const DOCK_SAFETY_BUFFER = 8 // small cushion so content never sits flush against the pill

const dockNavItems = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Services', href: '/services', icon: Layers },
  { label: 'Work', href: '/work', icon: Briefcase },
  { label: 'Labs', href: '/labs', icon: Sparkles },
]

export default function MobileDock() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(true)
  const [lastY, setLastY] = useState(0)
  const navRef = useRef(null)

  // Publish the dock's real rendered footprint (height + its fixed offset
  // from the viewport bottom, plus a safety buffer) as a CSS custom property
  // so any part of the site can reserve exactly enough clearance to never be
  // covered by the dock — self-adjusting if the dock's own size ever changes,
  // instead of a hardcoded pixel guess tuned to one device.
  useEffect(() => {
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
  }, [])

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY
          // Show when scrolling up or near the top
          if (y < 60) {
            setVisible(true)
          } else if (y > lastY + 12) {
            setVisible(false)
          } else if (y < lastY - 8) {
            setVisible(true)
          }
          setLastY(y)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [lastY])

  const openFastTrack = (e) => {
    e.preventDefault()
    window.dispatchEvent(new CustomEvent('open-fast-track'))
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          ref={navRef}
          initial={{ y: 70, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 70, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          aria-label="Mobile Navigation Dock"
          className="md:hidden fixed bottom-3 inset-x-0 z-50 flex justify-center px-3 pointer-events-none"
          style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
        >
          <div className="pointer-events-auto rounded-full bg-[#080A12]/94 backdrop-blur-2xl border border-white/15 p-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.85),0_0_24px_rgba(37,99,235,0.18)] flex items-center justify-between gap-0.5 max-w-[350px] w-full mx-auto">
            {dockNavItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative flex-1 flex flex-col items-center justify-center h-11 px-1 rounded-full transition-all active:scale-90 ${
                    isActive ? 'text-white' : 'text-white/50 hover:text-white/80'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="dock-active-pill"
                      className="absolute inset-0 rounded-full bg-white/[0.08] border border-white/15 shadow-inner"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    />
                  )}
                  
                  <Icon size={17} className={`relative z-10 ${isActive ? 'text-blue-400' : ''}`} />
                  
                  <span className={`relative z-10 text-[10px] font-medium tracking-tight mt-0.5 ${isActive ? 'text-white font-semibold' : 'text-white/45'}`}>
                    {item.label}
                  </span>

                  {isActive && (
                    <span className="absolute bottom-0.5 w-1 h-1 rounded-full bg-blue-400 z-10 shadow-[0_0_6px_#60a5fa]" />
                  )}
                </Link>
              )
            })}

            {/* Fast-Track Consultation Action Button */}
            <button
              onClick={openFastTrack}
              aria-label="Open Fast-Track Consultation Drawer"
              className="relative flex items-center justify-center gap-1.5 px-3.5 h-9 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-lg shadow-blue-600/35 active:scale-95 transition-all shrink-0 ml-1 cursor-pointer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
              <span>Consult</span>
            </button>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
