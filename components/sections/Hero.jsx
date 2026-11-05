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
        className="w-full sm:w-32 px-3 py-2 rounded-lg text-xs bg-white border border-[#0A1124]/15 text-[#0A1124] placeholder:text-[#0A1124]/40 focus:border-[#1F4FFF] transition-colors"
      />
      <input
        required
        type="tel"
        name="phone"
        placeholder="Phone number"
        aria-label="Phone number"
        value={form.phone}
        onChange={handleChange}
        className="w-full sm:w-32 px-3 py-2 rounded-lg text-xs bg-white border border-[#0A1124]/15 text-[#0A1124] placeholder:text-[#0A1124]/40 focus:border-[#1F4FFF] transition-colors"
      />
      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-[#0A1124] bg-[#EEF2FA] hover:bg-[#D5DCEA] active:scale-[0.98] transition-all whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
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
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden bg-[#F4F7FC]">
      {/* Plain warm cream base — no radial glow/blur blob. A faint dot
          texture instead of a light beam/particle field, per the
          composite.global synthesis (research/design-system-v2.md):
          "screenshot the plain color, no glow/blur, no particle field." */}
      <div className="absolute inset-0 bg-grid-dots opacity-60 pointer-events-none [mask-image:radial-gradient(ellipse_70%_60%_at_30%_20%,black,transparent)]" />

      <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">

          {/* Left Column: Headline, Copy & CTAs — the H1 leads directly,
              no standalone pill/badge announcement above it (that was the
              same opener recipe every other page used before Contact/Labs
              broke from it). The "who we are" tag is folded further down
              into the lead-capture block instead, where it earns its place
              as context for the form rather than a banner above everything.
              Single flat ink headline — no two-tone accent span. This was
              the top-ranked unresolved issue from the v1 score log (7
              two-tone headlines on this page alone); Hero sets the standard
              the rest of the rebuild follows. */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left lg:pt-6">

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="text-4xl sm:text-5xl lg:text-[60px] font-extrabold text-[#0A1124] leading-[1.08] tracking-tight"
            >
              Websites that turn <br className="hidden sm:block" />
              visitors into <br className="hidden sm:block" />
              customers.
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="text-sm sm:text-base lg:text-lg text-[#0A1124]/60 leading-relaxed max-w-xl font-normal"
            >
              We design and develop modern, fast and SEO-ready websites that help businesses look credible, get discovered on Google and generate more enquiries.
            </motion.p>

            {/* Action Buttons — solid accent pill primary, outlined pill
                secondary: the same two-primitive system used sitewide. */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="flex flex-wrap items-center gap-3.5 sm:gap-4 pt-2"
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm font-semibold bg-[#1F4FFF] hover:bg-[#1A3FD6] text-white shadow-lg shadow-[#1F4FFF]/20 active:scale-[0.98] transition-all"
              >
                Get a Free Consultation <ArrowRight size={15} />
              </Link>

              <Link
                href="/work"
                className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-[#0A1124] bg-transparent hover:bg-[#0A1124]/5 border border-[#0A1124]/20 hover:border-[#0A1124]/35 transition-all"
              >
                View Our Work
              </Link>
            </motion.div>

            {/* Location Line */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.25 }}
              className="flex flex-wrap items-center gap-x-6 gap-y-3"
            >
              {locationLine.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.label} className="flex items-center gap-1.5 text-xs text-[#0A1124]/55">
                    <Icon size={13} className="text-[#1F4FFF] shrink-0" />
                    <span>{item.label}</span>
                  </div>
                )
              })}
            </motion.div>

            {/* Inline Lead Capture — de-emphasized secondary option, not a
                third CTA. The former top-of-page pill badge now lives here,
                as the eyebrow label for this specific block, instead of a
                standalone announcement above the whole hero. */}
            <motion.div
              ref={leadCaptureRef}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3 }}
              className="pt-5 border-t border-[#0A1124]/10"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#0A1124]/10 text-[10px] font-bold tracking-widest uppercase text-[#0A1124]/50 mb-3">
                Full-Service Web & Software Partner
              </span>
              <p className="text-[11px] text-[#0A1124]/55 mb-2">Or get a free quote in under a minute:</p>
              <HeroLeadForm />
            </motion.div>

          </div>

          {/* Right Column: Hero Dashboard Showcase — intentionally NOT
              vertically centered against the left column (items-start on
              the grid above) so the two blocks read as independently
              composed pieces, not one dead-centered stack. */}
          <div className="lg:col-span-5 relative">
            <HeroDashboardShowcase />
          </div>

        </div>

        {/* Floating secondary element — an independent piece breaking the
            two-column grid, per the asymmetric composition principle
            (research/design-system-v2.md). Real stat, already claimed by
            Stats.jsx below; not a new invented figure. */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="hidden lg:flex items-center gap-3 absolute left-[calc(58.33%+1rem)] bottom-4 px-4 py-2.5 rounded-full bg-white border border-[#0A1124]/10 shadow-lg shadow-black/5"
        >
          <span className="text-sm font-extrabold text-[#0A1124]">150+</span>
          <span className="text-[11px] text-[#0A1124]/55 leading-tight max-w-[7rem]">projects delivered across India &amp; globally</span>
        </motion.div>
      </div>
    </section>
  )
}
