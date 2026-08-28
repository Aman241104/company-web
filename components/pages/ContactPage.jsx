'use client'
import { useState, useEffect, useRef, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, ArrowRight, Send, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react'

/**
 * Guards a set of stacked elements (mobile-dock "rows" of interest — form field
 * rows here) from ever visually landing under the fixed MobileDock on initial
 * page load, for ANY viewport height.
 *
 * Why this can't be a fixed pixel margin: MobileDock is `position: fixed` to
 * the viewport bottom, so the pixel band it occupies is constant *measured
 * from the bottom of the viewport* but slides up/down in document-space as
 * viewport height changes. A static margin tuned for one device height (e.g.
 * 375x812) can land a field squarely under the dock on a different height
 * (e.g. 390x844) — which is exactly what happened in round 2/3. The only
 * robust fix is to measure the dock's real rendered size (via the
 * `--mobile-dock-clearance` custom property MobileDock publishes through a
 * ResizeObserver) and the actual viewport height at runtime, then nudge any
 * row that would land in the dock's band just past the bottom of the
 * viewport — where it's simply below the fold, not hidden behind the dock.
 */
function useMobileDockClearance(row0Ref, row1Ref, row2Ref, row3Ref) {
  useEffect(() => {
    const MOBILE_BREAKPOINT = 768 // matches Tailwind `md` / MobileDock's `md:hidden`
    const rows = [row0Ref, row1Ref, row2Ref, row3Ref]

    const applyClearance = () => {
      // Reset first so shrinking/growing the window (or rotating) never
      // leaves a stale correction behind.
      rows.forEach((ref) => {
        if (ref.current) ref.current.style.marginTop = ''
      })

      if (typeof window === 'undefined' || window.innerWidth >= MOBILE_BREAKPOINT) return

      const clearanceRaw = getComputedStyle(document.documentElement)
        .getPropertyValue('--mobile-dock-clearance')
        .trim()
      const clearance = parseFloat(clearanceRaw) || 90 // sane fallback before MobileDock's observer runs
      const dangerZoneTop = window.innerHeight - clearance

      rows.forEach((ref) => {
        const el = ref.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        const wouldBeCoveredOnLoad = rect.top < window.innerHeight && rect.bottom > dangerZoneTop
        if (wouldBeCoveredOnLoad) {
          // Push this row (and everything after it, via normal flow) just
          // past the bottom of the viewport — clear of the dock, reachable
          // with a small scroll instead of hidden behind it.
          const push = Math.ceil(window.innerHeight - rect.top) + 14
          el.style.marginTop = `${push}px`
        }
      })
    }

    applyClearance()
    // Re-check once more shortly after mount in case fonts/images still
    // reflowed content after the first pass, and whenever the viewport
    // itself changes (resize, orientation change).
    const settleTimer = setTimeout(applyClearance, 350)
    window.addEventListener('resize', applyClearance)
    window.addEventListener('orientationchange', applyClearance)
    return () => {
      clearTimeout(settleTimer)
      window.removeEventListener('resize', applyClearance)
      window.removeEventListener('orientationchange', applyClearance)
    }
  }, [row0Ref, row1Ref, row2Ref, row3Ref])
}

const services = [
  'Website Development',
  'Software Development & API',
  'Mobile App (iOS & Android)',
  'Custom SaaS / ERP Platform',
  'Performance Marketing & CRO',
  'Technical SEO & Growth',
  'Vibo ERP Demo & Access',
  'Other Custom Architecture',
]

const budgets = [
  '₹20,000 – ₹50,000',
  '₹50,000 – ₹1,50,000',
  '₹1,50,000 – ₹5,00,000',
  '₹5,00,000+',
  'Custom Enterprise Scope',
]

const contactInfo = [
  {
    icon: Mail,
    label: 'Direct Engineering Inbox',
    value: 'hello@mehtatechnologies.com',
    href: 'mailto:hello@mehtatechnologies.com',
  },
  {
    icon: Phone,
    label: 'Direct Phone & WhatsApp',
    value: '+91 98765 43210',
    href: 'tel:+919876543210',
  },
  {
    icon: MapPin,
    label: 'Engineering Hubs',
    value: 'Mumbai & Bengaluru, India',
    href: null,
  },
  {
    icon: Clock,
    label: 'Guaranteed Response',
    value: 'Within 24 business hours',
    href: null,
  },
]

const nextSteps = [
  { n: '1', title: 'Architectural Review', text: 'Our technical leads analyze your requirements and existing tech stack.' },
  { n: '2', title: '30-Min Discovery Session', text: 'We align on features, scalability goals, and product roadmap.' },
  { n: '3', title: 'Milestone Proposal', text: 'You receive a detailed fixed-price contract with transparent line items.' },
  { n: '4', title: 'Sprint Kickoff', text: 'We begin development with live GitHub staging access within 5 days.' },
]

function ContactForm() {
  const searchParams = useSearchParams()
  const initialService = searchParams.get('service') || ''
  const initialBudget = searchParams.get('budget') || ''

  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: initialService,
    budget: initialBudget,
    project: '',
  })
  const [sent, setSent] = useState(false)
  const nameRowRef = useRef(null)
  const emailRowRef = useRef(null)
  const serviceRowRef = useRef(null)
  const requirementsRowRef = useRef(null)
  useMobileDockClearance(nameRowRef, emailRowRef, serviceRowRef, requirementsRowRef)

  useEffect(() => {
    if (initialService) setForm((prev) => ({ ...prev, service: initialService }))
    if (initialBudget) setForm((prev) => ({ ...prev, budget: initialBudget }))
  }, [initialService, initialBudget])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.email) return
    const subject = encodeURIComponent(`Project Brief — ${form.service || 'General'} from ${form.name || 'Website'}`)
    const body = encodeURIComponent(
      `Client Name: ${form.name}\nCompany: ${form.company}\nEmail: ${form.email}\nPhone: ${form.phone}\nService Category: ${form.service}\nBudget Range: ${form.budget}\n\nProject Scope & Details:\n${form.project}`
    )
    window.location.href = `mailto:hello@mehtatechnologies.com?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <div className="rounded-3xl bg-white/[0.02] border border-white/[0.08] p-8 sm:p-10 shadow-2xl shadow-black/40 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      {sent ? (
        <div className="py-16 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 size={32} />
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight">
            Brief Sent Successfully!
          </h3>
          <p className="text-sm text-white/50 max-w-sm mx-auto">
            Our engineering team has received your details and will review them before our discovery call.
          </p>
          <button
            onClick={() => setSent(false)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 pt-4"
          >
            Submit Another Inquiry →
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-1">
              Submit Your Project Brief
            </h3>
            <p className="text-xs sm:text-sm text-white/50">
              Fill in your specifications for an accurate milestone timeline and cost breakdown.
            </p>
          </div>

          <div ref={nameRowRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="contact-name" className="block text-xs font-mono uppercase tracking-wider text-white/40 mb-1.5">
                Your Name <span className="text-blue-400">*</span>
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                placeholder="Gaurav Mehta"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>
            <div>
              <label htmlFor="contact-company" className="block text-xs font-mono uppercase tracking-wider text-white/40 mb-1.5">
                Company / Organization
              </label>
              <input
                id="contact-company"
                name="company"
                type="text"
                placeholder="Acme Corp"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>

          <div ref={emailRowRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="contact-email" className="block text-xs font-mono uppercase tracking-wider text-white/40 mb-1.5">
                Work Email <span className="text-blue-400">*</span>
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                placeholder="name@company.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>
            <div>
              <label htmlFor="contact-phone" className="block text-xs font-mono uppercase tracking-wider text-white/40 mb-1.5">
                Phone / WhatsApp
              </label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                placeholder="+91 98765 43210"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>

          <div ref={serviceRowRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="contact-service" className="block text-xs font-mono uppercase tracking-wider text-white/40 mb-1.5">
                Service Focus
              </label>
              <select
                id="contact-service"
                name="serviceFocus"
                value={form.service}
                onChange={(e) => setForm({ ...form, service: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#0B0D14] border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500 transition-all cursor-pointer"
              >
                <option value="">Select a service category</option>
                {services.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="contact-budget" className="block text-xs font-mono uppercase tracking-wider text-white/40 mb-1.5">
                Estimated Budget
              </label>
              <select
                id="contact-budget"
                name="budget"
                value={form.budget}
                onChange={(e) => setForm({ ...form, budget: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#0B0D14] border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500 transition-all cursor-pointer"
              >
                <option value="">Select budget range</option>
                {budgets.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div ref={requirementsRowRef}>
            <label htmlFor="contact-requirements" className="block text-xs font-mono uppercase tracking-wider text-white/40 mb-1.5">
              Project Architecture & Requirements
            </label>
            <textarea
              id="contact-requirements"
              name="requirements"
              rows={4}
              placeholder="Describe your current system, objectives, target launch date, and key features..."
              value={form.project}
              onChange={(e) => setForm({ ...form, project: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-full text-xs sm:text-sm font-semibold bg-white text-black hover:bg-white/90 shadow-xl shadow-white/10 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            Submit Project Brief <ArrowRight size={15} />
          </button>

          <p className="text-center text-xs text-white/40 font-mono">
            Direct NDA Protected · 24h Turnaround · Zero Spam Guaranteed
          </p>
        </form>
      )}
    </div>
  )
}

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24 overflow-hidden">
      {/* Header */}
      <section className="max-w-[1360px] mx-auto px-6 md:px-8 mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <span className="glow-pill mb-4 inline-flex">
            Get In Touch
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] mb-6">
            Let&apos;s build something{' '}
            <span className="text-gradient-accent">exceptional together.</span>
          </h1>
          <p className="text-base sm:text-lg text-white/50 leading-relaxed">
            Have a project in mind? Book a 30-minute discovery consultation with our founding team.
          </p>
        </motion.div>
      </section>

      {/* Main Grid: Form + Info / Steps */}
      <section className="max-w-[1360px] mx-auto px-6 md:px-8 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7">
            <Suspense fallback={<div className="h-96 rounded-3xl bg-white/[0.02] animate-pulse" />}>
              <ContactForm />
            </Suspense>
          </div>

          {/* Right Column: Contact Channels & What Happens Next */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Contact Channels */}
            <div className="space-y-3">
              {contactInfo.map((info) => {
                const Icon = info.icon
                const content = (
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-blue-500/30 transition-all flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0 group-hover:scale-105 transition-transform">
                      <Icon size={18} />
                    </div>
                    <div>
                      <div className="text-[11px] font-mono uppercase tracking-wider text-white/40">
                        {info.label}
                      </div>
                      <div className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                        {info.value}
                      </div>
                    </div>
                  </div>
                )
                return info.href ? (
                  <a key={info.label} href={info.href} className="block">
                    {content}
                  </a>
                ) : (
                  <div key={info.label}>{content}</div>
                )
              })}
            </div>

            {/* What Happens Next Card */}
            <div className="rounded-3xl bg-white/[0.02] border border-white/[0.08] p-6 sm:p-7 space-y-4">
              <div className="text-xs font-mono uppercase tracking-wider text-white/40">
                What Happens Next
              </div>
              <div className="space-y-4">
                {nextSteps.map((step) => (
                  <div key={step.n} className="flex items-start gap-3.5">
                    <div className="w-6 h-6 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {step.n}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white mb-0.5">{step.title}</div>
                      <div className="text-xs text-white/50 leading-relaxed">{step.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Availability Badge */}
            <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/15 flex items-center gap-3 text-xs text-emerald-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span>Available for new Q1/Q2 sprint kickoffs immediately</span>
            </div>

          </div>

        </div>
      </section>
    </div>
  )
}
