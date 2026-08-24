'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, Layers, Briefcase, Search, Sparkles, PhoneCall, Zap, MessageSquare } from 'lucide-react'

const dockItems = [
  { label: 'Home', href: '/', icon: Home, type: 'link' },
  { label: 'Services', href: '/services', icon: Layers, type: 'link' },
  { label: 'Work', href: '/work', icon: Briefcase, type: 'link' },
  { label: 'Search', action: 'search', icon: Search, type: 'button' },
  { label: 'Consult', href: '/contact', icon: Zap, type: 'link', highlight: true },
]

export default function MobileDock() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(true)
  const [lastY, setLastY] = useState(0)

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY
          // Show when scrolling up or near the top
          if (y < 40) {
            setVisible(true)
          } else if (y > lastY + 10) {
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

  const triggerSearch = () => {
    window.dispatchEvent(new CustomEvent('open-command-palette'))
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          aria-label="Mobile Navigation Dock"
          className="md:hidden fixed bottom-3 inset-x-0 z-50 flex justify-center px-4 pointer-events-none"
          style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
        >
          <div className="pointer-events-auto rounded-full bg-[#080A12]/90 backdrop-blur-2xl border border-white/15 p-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.8),0_0_24px_rgba(37,99,235,0.2)] flex items-center gap-1">
            {dockItems.map((item) => {
              if (item.type === 'button') {
                return (
                  <button
                    key={item.label}
                    onClick={triggerSearch}
                    aria-label="Open Command Search"
                    className="relative flex flex-col items-center justify-center w-13 h-13 rounded-full text-white/60 hover:text-white transition-all active:scale-90"
                  >
                    <div className="w-8 h-8 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center">
                      <Search size={16} className="text-blue-400" />
                    </div>
                    <span className="text-[9px] font-mono text-white/40 mt-0.5">⌘K</span>
                  </button>
                )
              }

              const isActive = pathname === item.href

              if (item.highlight) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="relative flex items-center justify-center px-3.5 h-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-xs shadow-lg shadow-blue-600/40 active:scale-95 transition-transform"
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                      <span>{item.label}</span>
                    </div>
                  </Link>
                )
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative flex flex-col items-center justify-center w-12 h-11 rounded-full transition-all active:scale-90 ${
                    isActive ? 'text-white' : 'text-white/45 hover:text-white/80'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="dock-active-pill"
                      className="absolute inset-0 rounded-full bg-white/[0.08] border border-white/15 shadow-inner"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  
                  <item.icon size={17} className={`relative z-10 ${isActive ? 'text-blue-400' : ''}`} />
                  
                  <span className={`relative z-10 text-[9px] font-medium tracking-tight mt-0.5 ${isActive ? 'text-white font-semibold' : 'text-white/40'}`}>
                    {item.label}
                  </span>

                  {isActive && (
                    <span className="absolute bottom-1 w-1 h-1 rounded-full bg-blue-400 z-10 shadow-[0_0_6px_#60a5fa]" />
                  )}
                </Link>
              )
            })}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
