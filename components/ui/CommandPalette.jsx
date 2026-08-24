'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  ArrowRight,
  Sparkles,
  Layers,
  Briefcase,
  Calculator,
  Phone,
  Mail,
  Copy,
  Check,
  ExternalLink,
  Code2,
  Globe,
  Smartphone,
  ShieldCheck,
  X,
} from 'lucide-react'

const commands = [
  // Navigation
  { id: 'nav-home', title: 'Go to Home', section: 'Navigation', icon: Globe, href: '/' },
  { id: 'nav-labs', title: 'Mehta Tech Labs & Code Scaffolders', section: 'Navigation', icon: Code2, href: '/labs' },
  { id: 'nav-status', title: 'Live System & Cloud SLA Status', section: 'Navigation', icon: Sparkles, href: '/status' },
  { id: 'nav-about', title: 'About Mehta Tech', section: 'Navigation', icon: Sparkles, href: '/about' },
  { id: 'nav-services', title: 'Services & Practice Areas', section: 'Navigation', icon: Layers, href: '/services' },
  { id: 'nav-work', title: 'Work & Case Studies', section: 'Navigation', icon: Briefcase, href: '/work' },
  { id: 'nav-contact', title: 'Contact & Discovery Call', section: 'Navigation', icon: Phone, href: '/contact' },

  // Services
  { id: 'svc-web', title: 'High-Converting Web Applications (Next.js 15)', section: 'Services', icon: Globe, href: '/services' },
  { id: 'svc-software', title: 'Backend Systems & Distributed API Architecture', section: 'Services', icon: Code2, href: '/services' },
  { id: 'svc-mobile', title: 'Cross-Platform Mobile Apps (iOS & Android)', section: 'Services', icon: Smartphone, href: '/services' },
  { id: 'svc-saas', title: 'Custom SaaS & Cloud ERP Platforms', section: 'Services', icon: Layers, href: '/services' },

  // Case Studies
  { id: 'case-vibo', title: 'Vibo ERP — Cloud Suite (2,400+ Users)', section: 'Case Studies', icon: Briefcase, href: '/#products' },
  { id: 'case-silverspoon', title: 'Silver Spoon by ACJ (+280% Sales)', section: 'Case Studies', icon: Briefcase, href: '/work' },
  { id: 'case-stylux', title: 'Stylux Interiors (90-Day Turnkey)', section: 'Case Studies', icon: Briefcase, href: '/work' },
  { id: 'case-chahana', title: 'Chahana Dental (#1 Google Rank)', section: 'Case Studies', icon: Briefcase, href: '/work' },

  // Quick Actions & Calculators
  { id: 'act-estimator', title: 'Open Scope & Cost Estimator', section: 'Interactive Tools', icon: Calculator, href: '/#pricing' },
  { id: 'act-roi', title: 'Calculate In-House vs Mehta Tech ROI', section: 'Interactive Tools', icon: Calculator, href: '/#roi-calculator' },
  { id: 'act-benchmark', title: 'View Next.js 15 Architecture Benchmarks', section: 'Interactive Tools', icon: Code2, href: '/#architecture-benchmark' },
  { id: 'act-whatsapp', title: 'Direct WhatsApp with Lead Architect', section: 'Fast Actions', icon: ExternalLink, action: 'whatsapp' },
  { id: 'act-copy-email', title: 'Copy Engineering Email to Clipboard', section: 'Fast Actions', icon: Copy, action: 'copy-email' },
]

export default function CommandPalette({ isOpen, onClose }) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [copied, setCopied] = useState(false)
  const router = useRouter()
  const inputRef = useRef(null)

  const filtered = commands.filter((c) =>
    c.title.toLowerCase().includes(query.toLowerCase()) ||
    c.section.toLowerCase().includes(query.toLowerCase())
  )

  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        if (isOpen) onClose()
        else {
          const event = new CustomEvent('open-command-palette')
          window.dispatchEvent(event)
        }
      }
      if (!isOpen) return

      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev - 1 + (filtered.length || 1)) % (filtered.length || 1))
      } else if (e.key === 'Enter' && filtered[selectedIndex]) {
        e.preventDefault()
        executeCommand(filtered[selectedIndex])
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, selectedIndex, filtered])

  const executeCommand = (cmd) => {
    if (cmd.action === 'copy-email') {
      navigator.clipboard?.writeText('hello@mehtatechnologies.com')
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
        onClose()
      }, 1200)
      return
    }

    if (cmd.action === 'whatsapp') {
      window.open('https://wa.me/919876543210?text=Hi%20Mehta%20Technologies%2C%20I%20would%20like%20to%20discuss%20a%20new%20project.', '_blank')
      onClose()
      return
    }

    if (cmd.href) {
      onClose()
      router.push(cmd.href)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 sm:pt-28 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
          />

          {/* Palette Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="relative w-full max-w-xl rounded-2xl bg-[#0B0D14] border border-white/15 shadow-2xl shadow-black/90 overflow-hidden z-10"
          >
            {/* Top Search Input */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/[0.08] bg-white/[0.02]">
              <Search size={18} className="text-blue-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setSelectedIndex(0)
                }}
                placeholder="Type a command, service, project, or tool..."
                className="w-full bg-transparent text-sm text-white placeholder-white/35 focus:outline-none"
              />
              <button
                onClick={onClose}
                className="p-1 rounded-md text-white/40 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Command List */}
            <div className="max-h-[360px] overflow-y-auto p-2 divide-y divide-white/[0.04]">
              {filtered.length === 0 ? (
                <div className="py-12 text-center text-xs text-white/40">
                  No matching commands found for &ldquo;{query}&rdquo;
                </div>
              ) : (
                filtered.map((cmd, i) => {
                  const Icon = cmd.icon
                  const isSelected = i === selectedIndex
                  return (
                    <button
                      key={cmd.id}
                      onClick={() => executeCommand(cmd)}
                      onMouseEnter={() => setSelectedIndex(i)}
                      className={`w-full flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl text-left transition-all ${
                        isSelected
                          ? 'bg-blue-600/20 text-white border border-blue-500/30'
                          : 'text-white/70 hover:bg-white/[0.04] border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3 truncate">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-blue-600 text-white' : 'bg-white/[0.05] text-white/60'
                          }`}
                        >
                          <Icon size={14} />
                        </div>
                        <div className="truncate">
                          <div className="text-xs font-semibold tracking-tight text-white truncate">
                            {cmd.title}
                          </div>
                          <div className="text-[10px] font-mono text-white/40 uppercase">
                            {cmd.section}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-white/40 shrink-0">
                        {cmd.action === 'copy-email' && copied ? (
                          <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                            <Check size={12} /> Copied
                          </span>
                        ) : (
                          <ArrowRight size={13} className={isSelected ? 'text-blue-400' : 'opacity-30'} />
                        )}
                      </div>
                    </button>
                  )
                })
              )}
            </div>

            {/* Bottom Keyboard Hint Bar */}
            <div className="px-4 py-2.5 bg-black/40 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-white/40 font-mono">
              <div className="flex items-center gap-3">
                <span><kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/70">↑</kbd> <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/70">↓</kbd> to navigate</span>
                <span><kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/70">↵</kbd> to select</span>
              </div>
              <div>
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/70">ESC</kbd> to close
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
