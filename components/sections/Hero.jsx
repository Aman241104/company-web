'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Star, Zap, Clock } from 'lucide-react'
import HeroDashboardShowcase from '@/components/ui/HeroDashboardShowcase'

const trustStats = [
  { icon: CheckCircle2, label: '150+ Projects Delivered' },
  { icon: Star, label: '4.9/5 Client Rating', href: '#testimonials' },
  { icon: Clock, label: 'Fixed-Price Proposal in 24 Hrs' },
  { icon: Zap, label: 'SEO-Ready From Day One' },
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

    const subject = encodeURIComponent(`Free Quote Request — ${form.name}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nPhone: ${form.phone}\n\nRequesting a free project quote from the homepage.`
    )
    window.location.href = `mailto:hello@mehtatechnologies.com?subject=${subject}&body=${body}`
    setDelivered(false)
    setSent(true)
  }

  if (sent) {
    return (
      <div className="flex items-center gap-2.5 text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3 max-w-md">
        <CheckCircle2 size={16} className="shrink-0" />
        {delivered ? (
          <span>Got it — our team will reach out shortly. Need a faster reply? <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="underline font-semibold hover:text-emerald-300">WhatsApp us</a>.</span>
        ) : (
          <span>Opening your email app to send this to our team — or <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="underline font-semibold hover:text-emerald-300">WhatsApp us</a> for a faster reply.</span>
        )}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 max-w-md pr-20 sm:pr-0">
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
        value={form.name}
        onChange={handleChange}
        className="w-full sm:w-36 px-4 py-3 rounded-xl text-sm bg-white/[0.04] border border-white/10 text-white placeholder:text-white/45 focus:outline-none focus:border-blue-500/50 transition-colors"
      />
      <input
        required
        type="tel"
        name="phone"
        placeholder="Phone number"
        value={form.phone}
        onChange={handleChange}
        className="w-full sm:w-36 px-4 py-3 rounded-xl text-sm bg-white/[0.04] border border-white/10 text-white placeholder:text-white/45 focus:outline-none focus:border-blue-500/50 transition-colors"
      />
      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold bg-white text-black hover:bg-white/90 active:scale-[0.98] transition-all whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? 'Sending…' : <>Get Free Quote <ArrowRight size={14} /></>}
      </button>
    </form>
  )
}

export default function Hero() {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-[#07080C]">
      {/* Background Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-gradient-to-br from-blue-600/15 via-indigo-600/10 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />

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
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] text-xs font-medium text-white/80 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_#3b82f6]" />
                <span>Websites. E-Commerce. Growth.</span>
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-[58px] font-extrabold text-white leading-[1.08] tracking-tight"
            >
              We build websites <br className="hidden sm:block" />
              that help <br className="hidden sm:block" />
              businesses <span className="text-[#60A5FA] drop-shadow-[0_0_25px_rgba(96,165,250,0.35)]">grow.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="text-sm sm:text-base lg:text-lg text-white/60 leading-relaxed max-w-xl font-normal"
            >
              We design and develop modern, fast and SEO-ready websites and e-commerce stores that help businesses build credibility, generate enquiries and grow online.
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
                className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm font-semibold bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-xl shadow-blue-600/30 active:scale-[0.98] transition-all"
              >
                Get a Free Consultation <ArrowRight size={15} />
              </Link>

              <Link
                href="/work"
                className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-white/90 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 transition-all"
              >
                View Our Work
              </Link>
            </motion.div>

            {/* Inline Lead Capture */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.35 }}
              className="pt-1"
            >
              <p className="text-xs text-white/55 mb-2.5">Get a free quote — takes under a minute, a real strategist replies.</p>
              <HeroLeadForm />
            </motion.div>

            {/* Trust Bar */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.4 }}
              className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-4 border-t border-white/[0.08]"
            >
              {trustStats.map((stat) => {
                const Icon = stat.icon
                if (stat.href) {
                  return (
                    <a key={stat.label} href={stat.href} className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white/80 transition-colors">
                      <Icon size={13} className="text-blue-400 shrink-0" />
                      <span className="underline decoration-white/20 underline-offset-2">{stat.label}</span>
                    </a>
                  )
                }
                return (
                  <div key={stat.label} className="flex items-center gap-1.5 text-xs text-white/50">
                    <Icon size={13} className="text-blue-400 shrink-0" />
                    <span>{stat.label}</span>
                  </div>
                )
              })}
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
