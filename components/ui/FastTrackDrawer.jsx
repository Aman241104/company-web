'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Phone, Calendar, ShieldCheck, X, ArrowRight, CheckCircle2, ArrowUpRight } from 'lucide-react'
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion'

// Marker on <html> that tells MobileDock's "Consult" button this drawer is
// mounted on the current route and listening for `open-fast-track`. On
// routes where it isn't mounted, the dock falls back to a plain /contact
// link instead of dispatching an event nobody hears.
const READY_ATTR = 'data-fast-track'

const channels = [
  {
    key: 'whatsapp',
    icon: MessageSquare,
    title: 'Chat on WhatsApp',
    detail: 'The quickest way to reach the team',
    href: 'https://wa.me/919876543210?text=Hi%20Mehta%20Technologies%2C%20I%20would%20like%20to%20discuss%20a%20project.',
    external: true,
  },
  {
    key: 'discovery',
    icon: Calendar,
    title: 'Book a free discovery call',
    detail: 'Tell us about your project — we reply within 24 hours',
    href: '/contact',
  },
  {
    key: 'phone',
    icon: Phone,
    title: 'Call us',
    detail: '+91 98765 43210',
    href: 'tel:+919876543210',
  },
]

export default function FastTrackDrawer() {
  const [isOpen, setIsOpen] = useState(false)
  const [ndaRequested, setNdaRequested] = useState(false)
  const [ndaEmail, setNdaEmail] = useState('')
  const drawerRef = useRef(null)
  const closeButtonRef = useRef(null)
  const triggerButtonRef = useRef(null)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    const handleOpen = () => setIsOpen(true)

    window.addEventListener('keydown', handleEsc)
    window.addEventListener('open-fast-track', handleOpen)
    document.documentElement.setAttribute(READY_ATTR, 'ready')

    return () => {
      window.removeEventListener('keydown', handleEsc)
      window.removeEventListener('open-fast-track', handleOpen)
      document.documentElement.removeAttribute(READY_ATTR)
    }
  }, [])

  useEffect(() => {
    if (!isOpen) return

    // Snapshot refs inside the effect so cleanup restores focus to the nodes
    // that existed when the drawer opened (react-hooks/exhaustive-deps).
    const trigger = triggerButtonRef.current
    const lastFocused = document.activeElement
    const main = document.getElementById('main-content')
    document.body.style.overflow = 'hidden'
    main?.setAttribute('aria-hidden', 'true')
    closeButtonRef.current?.focus()

    const handleTab = (e) => {
      const drawer = drawerRef.current
      if (e.key !== 'Tab' || !drawer) return
      const focusable = drawer.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
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
    window.addEventListener('keydown', handleTab)
    return () => {
      window.removeEventListener('keydown', handleTab)
      document.body.style.overflow = ''
      main?.removeAttribute('aria-hidden')
      ;(lastFocused || trigger)?.focus()
    }
  }, [isOpen])

  const handleNdaSubmit = (e) => {
    e.preventDefault()
    if (!ndaEmail) return
    window.location.href = `mailto:hello@mehtatechnologies.com?subject=${encodeURIComponent('Request Mutual NDA')}&body=${encodeURIComponent(`Please send a countersigned Mutual NDA to: ${ndaEmail}`)}`
    setNdaRequested(true)
  }

  return (
    <>
      {/* Floating trigger — desktop only so it never collides with MobileDock.
          Plain ink pill with a static coral mark; no ping/glow. */}
      <div className="hidden md:block fixed bottom-6 right-6 z-40">
        <button
          ref={triggerButtonRef}
          type="button"
          onClick={() => setIsOpen(true)}
          aria-haspopup="dialog"
          className="inline-flex items-center gap-2.5 pl-4 pr-5 py-3 rounded-full bg-ink text-cream text-[13px] font-semibold shadow-lg shadow-ink/20 transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-ink-dim cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-accent" aria-hidden="true" />
          Quick consult
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[60] flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
              className="fixed inset-0 bg-ink/45 backdrop-blur-[2px]"
            />

            {/* Drawer body */}
            <motion.div
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="fast-track-drawer-title"
              initial={reducedMotion ? { opacity: 0 } : { x: '100%' }}
              animate={reducedMotion ? { opacity: 1 } : { x: 0 }}
              exit={reducedMotion ? { opacity: 0 } : { x: '100%' }}
              transition={reducedMotion ? { duration: 0.01 } : { type: 'spring', damping: 32, stiffness: 300 }}
              className="relative w-full max-w-md h-full bg-cream border-l border-border flex flex-col overflow-y-auto z-10 shadow-2xl shadow-ink/20"
            >
              <div className="p-6 sm:p-8 flex-1">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 pb-6 mb-2 border-b border-border">
                  <div>
                    <h2 id="fast-track-drawer-title" className="font-display text-2xl font-semibold text-ink tracking-tight leading-tight">
                      Talk to the team
                    </h2>
                    <p className="mt-2 text-sm text-ink/75 leading-relaxed">
                      Pick whichever channel suits you — all of them reach the same people.
                    </p>
                  </div>
                  <button
                    ref={closeButtonRef}
                    type="button"
                    onClick={() => setIsOpen(false)}
                    aria-label="Close dialog"
                    className="w-10 h-10 shrink-0 inline-flex items-center justify-center rounded-full border border-ink/20 text-ink hover:bg-ink hover:text-cream transition-colors"
                  >
                    <X size={18} aria-hidden="true" />
                  </button>
                </div>

                {/* Channels — a plain divided list, not icon-square cards. */}
                <ul className="mb-8">
                  {channels.map(({ key, icon: Icon, title, detail, href, external }) => (
                    <li key={key} className="border-b border-border">
                      <a
                        href={href}
                        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        onClick={key === 'discovery' ? () => setIsOpen(false) : undefined}
                        className="group flex items-center gap-4 py-4 rounded-lg"
                      >
                        <Icon size={18} className="text-ink shrink-0" aria-hidden="true" />
                        <span className="flex-1 min-w-0">
                          <span className="block text-[15px] font-semibold text-ink">{title}</span>
                          <span className="block text-[13px] text-ink/75">{detail}</span>
                        </span>
                        <span
                          aria-hidden="true"
                          className="w-9 h-9 shrink-0 rounded-full border border-ink/20 inline-flex items-center justify-center text-ink transition-colors group-hover:bg-accent group-hover:border-accent"
                        >
                          {external ? <ArrowUpRight size={15} /> : <ArrowRight size={15} />}
                        </span>
                        {external && <span className="sr-only">(opens in a new tab)</span>}
                      </a>
                    </li>
                  ))}
                </ul>

                {/* Mutual NDA request */}
                <div className="rounded-2xl bg-bg border border-border p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck size={16} className="text-ink" aria-hidden="true" />
                    <h3 className="text-sm font-semibold text-ink">Need an NDA first?</h3>
                  </div>
                  <p className="text-[13px] text-ink/75 mb-4 leading-relaxed">
                    We sign mutual non-disclosure agreements on request before reviewing pitch decks or codebases.
                  </p>

                  {ndaRequested ? (
                    <p role="status" className="p-3 rounded-xl bg-accent-soft text-ink text-[13px] font-medium flex items-center gap-2">
                      <CheckCircle2 size={14} aria-hidden="true" /> NDA request drafted — check your email app to send it.
                    </p>
                  ) : (
                    <form onSubmit={handleNdaSubmit} className="flex flex-col sm:flex-row gap-2">
                      <label htmlFor="nda-email" className="sr-only">Work email for NDA</label>
                      <input
                        id="nda-email"
                        type="email"
                        required
                        placeholder="Work email"
                        value={ndaEmail}
                        onChange={(e) => setNdaEmail(e.target.value)}
                        className="flex-1 min-w-0 px-4 py-2.5 rounded-full bg-cream border border-ink/20 text-ink placeholder:text-ink/55 text-sm focus:border-ink transition-colors"
                      />
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-accent text-ink text-sm font-semibold transition-colors hover:bg-ink hover:text-cream"
                      >
                        Request NDA
                      </button>
                    </form>
                  )}
                </div>
              </div>

              {/* Real commitments only — both are stated elsewhere on the
                  site (contact page "reply within 24 hours"; IP transfer in
                  Pricing, FAQ and Terms). */}
              <ul className="px-6 sm:px-8 py-5 border-t border-border space-y-1.5 text-[13px] text-ink/75">
                <li>Reply within 24 hours on project enquiries</li>
                <li>Full IP ownership transferred on final delivery</li>
              </ul>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
