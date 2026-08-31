'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MessageSquare,
  Phone,
  Calendar,
  ShieldCheck,
  X,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  Clock,
  Send,
} from 'lucide-react'

export default function FastTrackDrawer() {
  const [isOpen, setIsOpen] = useState(false)
  const [ndaRequested, setNdaRequested] = useState(false)
  const [ndaEmail, setNdaEmail] = useState('')

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    const handleOpen = () => setIsOpen(true)

    window.addEventListener('keydown', handleEsc)
    window.addEventListener('open-fast-track', handleOpen)

    return () => {
      window.removeEventListener('keydown', handleEsc)
      window.removeEventListener('open-fast-track', handleOpen)
    }
  }, [])

  const handleNdaSubmit = (e) => {
    e.preventDefault()
    if (!ndaEmail) return
    window.location.href = `mailto:hello@mehtatechnologies.com?subject=${encodeURIComponent('Request Mutual NDA')}&body=${encodeURIComponent(`Please send a countersigned Mutual NDA to: ${ndaEmail}`)}`
    setNdaRequested(true)
  }

  return (
    <>
      {/* Floating Trigger Button - Desktop only so it never collides with MobileDock */}
      <div className="hidden md:block fixed bottom-6 right-6 z-40">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#0B0D14]/90 hover:bg-[#0B0D14] text-white border border-blue-500/30 hover:border-blue-500/60 shadow-2xl shadow-blue-600/30 backdrop-blur-xl transition-all group cursor-pointer"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-xs font-semibold tracking-tight group-hover:text-blue-400 transition-colors">
            Quick Consult
          </span>
        </motion.button>
      </div>

      {/* Slide-in Consultation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[60] flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            />

            {/* Drawer Body */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="relative w-full max-w-md bg-[#080A10] border-l border-white/10 h-full p-6 sm:p-8 flex flex-col justify-between overflow-y-auto z-10 shadow-2xl"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-5 border-b border-white/[0.08] mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400">
                        Live Technical Desk
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      Fast-Track Discovery
                    </h3>
                  </div>

                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-xl bg-white/[0.04] text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Primary Channels */}
                <div className="space-y-3 mb-6">
                  {/* WhatsApp Direct */}
                  <a
                    href="https://wa.me/919876543210?text=Hi%20Mehta%20Technologies%2C%20I%20would%20like%20to%20discuss%20a%20project."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 hover:border-emerald-500/40 transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                        <MessageSquare size={18} />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                          WhatsApp Direct Hotline
                        </div>
                        <div className="text-[11px] text-white/50">Average reply: &lt;15 mins</div>
                      </div>
                    </div>
                    <ExternalLink size={14} className="text-emerald-400 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </a>

                  {/* 30-Min Discovery Session */}
                  <a
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                    className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 hover:border-blue-500/40 transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                        <Calendar size={18} />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">
                          Book 30-Min Technical Discovery
                        </div>
                        <div className="text-[11px] text-white/50">With Founding Architect</div>
                      </div>
                    </div>
                    <ArrowRight size={14} className="text-blue-400 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </a>

                  {/* Direct Phone Call */}
                  <a
                    href="tel:+919876543210"
                    className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/20 transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/[0.04] text-white/70 flex items-center justify-center">
                        <Phone size={18} />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">
                          Direct Engineering Line
                        </div>
                        <div className="text-[11px] text-white/50">+91 98765 43210</div>
                      </div>
                    </div>
                    <ArrowRight size={14} className="text-white/55 group-hover:text-white transition-colors" />
                  </a>
                </div>

                {/* Instant Mutual NDA Request */}
                <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-5 mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck size={16} className="text-blue-400" />
                    <span className="text-xs font-bold text-white">Need a Signed NDA First?</span>
                  </div>
                  <p className="text-[11px] text-white/50 mb-4 leading-relaxed">
                    We routinely execute standard mutual non-disclosure agreements before reviewing proprietary pitch decks or codebases.
                  </p>

                  {ndaRequested ? (
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium flex items-center gap-2">
                      <CheckCircle2 size={14} /> NDA request generated. Check your email client.
                    </div>
                  ) : (
                    <form onSubmit={handleNdaSubmit} className="space-y-2">
                      <input
                        type="email"
                        required
                        placeholder="Enter work email for NDA"
                        value={ndaEmail}
                        onChange={(e) => setNdaEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/25 text-xs focus:outline-none focus:border-blue-500 transition-colors"
                      />
                      <button
                        type="submit"
                        className="w-full py-2.5 rounded-xl bg-white/[0.06] hover:bg-white text-white hover:text-black text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                      >
                        Request Instant Mutual NDA <Send size={12} />
                      </button>
                    </form>
                  )}
                </div>
              </div>

              {/* Footer Guarantees */}
              <div className="pt-6 border-t border-white/[0.08] space-y-2 text-[11px] text-white/55 font-mono">
                <div className="flex items-center gap-2">
                  <Clock size={12} className="text-blue-400" /> Guaranteed 24h brief response
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={12} className="text-blue-400" /> 100% IP ownership transferred upon launch
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
