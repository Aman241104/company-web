'use client'
import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, MapPin, Globe2 } from 'lucide-react'
import HeroDashboardShowcase from '@/components/ui/HeroDashboardShowcase'
import { useClearanceGuard } from '@/lib/useClearanceGuard'

const locationLine = [
  { icon: MapPin, label: 'Ahmedabad, India' },
  { icon: Globe2, label: 'Serving Clients Across India & Globally' },
]

function HeroLeadForm() {
  const [form, setForm] = useState({ name: '', phone: '', company_website: '' })
  const [sent, setSent] = useState(false)
  const [delivered, setDelivered] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.company_website) return // honeypot — bots fill hidden fields
    if (!form.name || !form.phone) return

    setSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, phone: form.phone, subjectPrefix: 'Free Quote Request' }),
      })
      if (res.ok) {
        setDelivered(true)
        setSent(true)
        return
      }
    } catch {
      // fall through to mailto fallback
    } finally {
      setSubmitting(false)
    }

    const subject = encodeURIComponent(`Free Quote Request from ${form.name}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nPhone: ${form.phone}\n\nRequesting a free project quote from the homepage.`
    )
    window.location.href = `mailto:hello@mehtatechnologies.com?subject=${subject}&body=${body}`
    setDelivered(false)
    setSent(true)
  }

  if (sent) {
    return (
      <div className="flex items-center gap-2.5 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 max-w-md">
        <CheckCircle2 size={16} className="shrink-0" />
        {delivered ? (
          <span>Got it. Our team will reach out shortly. Need a faster reply? <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="underline font-semibold hover:text-emerald-900">WhatsApp us</a>.</span>
        ) : (
          <span>Opening your email app to send this to our team, or <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="underline font-semibold hover:text-emerald-900">WhatsApp us</a> for a faster reply.</span>
        )}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-sm">
      <input
        type="text"
        name="company_website"
        value={form.company_website}
        onChange={handleChange}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] w-px h-px opacity-0"
      />
      <input
        required
        type="text"
        name="name"
        placeholder="Your name"
        aria-label="Your name"
        value={form.name}
        onChange={handleChange}
        className="w-full sm:w-32 px-3 py-2 rounded-lg text-xs bg-white border border-neutral-300 text-neutral-900 placeholder:text-neutral-500 focus:border-blue-400 transition-colors"
      />
      <input
        required
        type="tel"
        name="phone"
        placeholder="Phone number"
        aria-label="Phone number"
        value={form.phone}
        onChange={handleChange}
        className="w-full sm:w-32 px-3 py-2 rounded-lg text-xs bg-white border border-neutral-300 text-neutral-900 placeholder:text-neutral-500 focus:border-blue-400 transition-colors"
      />
      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 active:scale-[0.98] transition-all whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? 'Sending…' : <>Get Free Quote <ArrowRight size={12} /></>}
      </button>
    </form>
  )
}

export default function Hero() {
  // Guards the quick-quote capture block from landing underneath the fixed
  // floating WhatsApp button on initial mobile load — see
  // `lib/useClearanceGuard.ts` and `FloatingWhatsApp.jsx`'s
  // `--whatsapp-clearance` publisher. Measured overlap: at 375x812 the
  // phone-number input and the WhatsApp bubble genuinely intersected before
  // this guard existed.
  const leadCaptureRef = useRef(null)
  useClearanceGuard('--whatsapp-clearance', [leadCaptureRef])

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-white">
      {/* Background Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-gradient-to-br from-blue-100/60 via-indigo-100/40 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column: Headline, Copy & CTAs */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-left">

            {/* Tag Badge */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-50 border border-neutral-200 text-xs font-bold tracking-widest uppercase text-neutral-500">
                Full-Service Web & Software Partner
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-[58px] font-extrabold text-neutral-950 leading-[1.08] tracking-tight"
            >
              Websites That Turn <br className="hidden sm:block" />
              Visitors Into <br className="hidden sm:block" />
              <span className="text-blue-600">Customers.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="text-sm sm:text-base lg:text-lg text-neutral-500 leading-relaxed max-w-xl font-normal"
            >
              We design and develop modern, fast and SEO-ready websites that help businesses look credible, get discovered on Google and generate more enquiries.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3.5 sm:gap-4 pt-2"
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm font-semibold bg-neutral-950 hover:bg-neutral-800 text-white shadow-xl shadow-neutral-950/10 active:scale-[0.98] transition-all"
              >
                Get a Free Consultation <ArrowRight size={15} />
              </Link>

              <Link
                href="/work"
                className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-neutral-800 bg-white hover:bg-neutral-50 border border-neutral-200 hover:border-neutral-300 transition-all"
              >
                View Our Work
              </Link>
            </motion.div>

            {/* Location Line */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.35 }}
              className="flex flex-wrap items-center gap-x-6 gap-y-3"
            >
              {locationLine.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.label} className="flex items-center gap-1.5 text-xs text-neutral-500">
                    <Icon size={13} className="text-blue-600 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                )
              })}
            </motion.div>

            {/* Inline Lead Capture — de-emphasized secondary option, not a third CTA */}
            <motion.div
              ref={leadCaptureRef}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.4 }}
              className="pt-3 border-t border-neutral-100"
            >
              <p className="text-[11px] text-neutral-500 mb-2">Or get a free quote in under a minute:</p>
              <HeroLeadForm />
            </motion.div>

          </div>

          {/* Right Column: Hero Dashboard Showcase */}
          <div className="lg:col-span-6">
            <HeroDashboardShowcase />
          </div>

        </div>
      </div>
    </section>
  )
}
