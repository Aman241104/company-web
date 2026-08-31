'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, ArrowRight, Sparkles, Calculator, ShieldCheck, Zap, HelpCircle } from 'lucide-react'

const plans = [
  {
    name: 'Landing Page',
    price: '₹9,999',
    unit: '/ project',
    badge: null,
    desc: 'A single page built to convert one campaign — perfect for a paid ads launch or a product announcement.',
    features: [
      '1 custom responsive page',
      'Next.js 15 App Router & sub-second LCP',
      'Lead form with email & WhatsApp routing',
      'Conversion tracking wired in (GTM/Pixel)',
      '2 weeks post-launch SLA support',
    ],
    cta: 'Start Your Landing Page',
    highlight: false,
    timeline: '3–5 Days',
  },
  {
    name: 'Starter & Brand Site',
    price: '₹19,999',
    unit: '/ project',
    badge: 'Fast-Track',
    desc: 'High-converting Next.js marketing websites and portfolio showcases for modern brands.',
    features: [
      'Up to 8 custom responsive pages',
      'Next.js 15 App Router & sub-second LCP',
      'Headless CMS integration (Sanity/Strapi)',
      'Technical SEO architecture & schema markup',
      'Contact form with email & WhatsApp routing',
      '1 month post-launch SLA support & warranty',
    ],
    cta: 'Start Your Website',
    highlight: false,
    timeline: '1–2 Weeks',
  },
  {
    name: 'Business Website',
    price: '₹32,999',
    unit: '/ project',
    badge: 'Popular',
    desc: 'Custom UI design, advanced analytics, and enhanced functionality for growing companies.',
    features: [
      'Up to 15 custom responsive pages',
      'Custom UI design (no templates)',
      'Advanced analytics & conversion tracking',
      'Headless CMS integration (Sanity/Strapi)',
      'Technical SEO architecture & schema markup',
      '2 months post-launch SLA support & warranty',
    ],
    cta: 'Build Your Business Site',
    highlight: true,
    timeline: '2–3 Weeks',
  },
  {
    name: 'Growth MVP & Full-Stack',
    price: '₹75,000',
    unit: '/ project',
    badge: null,
    desc: 'Custom web applications, cross-platform mobile apps, and launch-ready MVPs built for scale.',
    features: [
      'Full-stack Next.js web app or React Native mobile app',
      'PostgreSQL database & secure REST/GraphQL API',
      'Stripe & Razorpay payment gateway integration',
      'User authentication, session management & RBAC',
      'Admin analytics dashboard & lead pipeline',
      '3 months post-launch dedicated SLA support',
    ],
    cta: 'Build Your MVP',
    highlight: false,
    timeline: '4–8 Weeks',
  },
]

const enterprisePlan = {
  name: 'Enterprise & SaaS',
  desc: 'Custom ERPs, multi-tenant cloud platforms, microservices, and dedicated engineering pods — tailored quote, transparent line items.',
  features: [
    'Multi-tenant cloud architecture & microservices',
    'Dedicated senior engineering team',
    '99.9% uptime SLA with 24/7 priority support',
    '12 months comprehensive warranty & DevOps',
  ],
  timeline: '8–16 Weeks',
}

const projectTypes = [
  { label: 'Landing / Campaign Page', base: 9999, time: '3-5 days' },
  { label: 'Marketing Website', base: 19999, time: '1-2 wks' },
  { label: 'Business Website', base: 32999, time: '2-3 wks' },
  { label: 'Shopify / E-Commerce Store', base: 45000, time: '3-4 wks' },
  { label: 'Full-Stack Web App / MVP', base: 75000, time: '5-7 wks' },
  { label: 'Mobile App (iOS + Android)', base: 85000, time: '6-8 wks' },
  { label: 'Custom SaaS / ERP Platform', base: 140000, time: '8-12 wks' },
]

const addOnOptions = [
  { label: 'Headless CMS Integration', price: 10000 },
  { label: 'Payment Gateway (Stripe/Razorpay)', price: 12000 },
  { label: 'AI Search & Copilot Assistant', price: 25000 },
  { label: 'Multi-Role User Auth & RBAC', price: 15000 },
  { label: 'Performance Marketing Setup & ROAS Strategy', price: 20000 },
]

export default function Pricing() {
  const [selectedType, setSelectedType] = useState(projectTypes[0])
  const [selectedAddons, setSelectedAddons] = useState([])
  const [showEstimator, setShowEstimator] = useState(false)

  const toggleAddon = (addon) => {
    if (selectedAddons.some((a) => a.label === addon.label)) {
      setSelectedAddons(selectedAddons.filter((a) => a.label !== addon.label))
    } else {
      setSelectedAddons([...selectedAddons, addon])
    }
  }

  const calculatedTotal = selectedType.base + selectedAddons.reduce((acc, a) => acc + a.price, 0)

  return (
    <section id="pricing" className="py-16 sm:py-24 md:py-32 bg-[#07080C] relative border-t border-white/[0.06]">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/[0.06] rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-150px" }}
            transition={{ duration: 0.5 }}
          >
            <span className="glow-pill mb-4 inline-flex">
              Predictable Investment
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Transparent fixed pricing.{' '}
              <span className="text-gradient-accent">Zero surprise invoices.</span>
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-white/50 leading-relaxed">
              Every deliverable is written into your milestone contract before work begins. No hidden costs, no scope creep.
            </p>
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 items-stretch mb-12 sm:mb-16">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-150px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between relative transition-all duration-300 ${
                plan.highlight
                  ? 'bg-gradient-to-b from-blue-600/15 via-white/[0.03] to-white/[0.01] border-2 border-blue-500/40 shadow-2xl shadow-blue-900/20'
                  : 'bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.18]'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-blue-600 text-[11px] font-bold text-white uppercase tracking-wider shadow-lg shadow-blue-600/30">
                  {plan.badge}
                </div>
              )}

              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-mono uppercase tracking-wider text-white/55">
                    {plan.name}
                  </span>
                  <span className="text-xs font-medium text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/20">
                    {plan.timeline}
                  </span>
                </div>

                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-xs text-white/55 font-medium">
                    {plan.unit}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-white/55 leading-relaxed mb-8 font-normal">
                  {plan.desc}
                </p>

                {/* Features list */}
                <div className="space-y-3.5 pt-6 border-t border-white/[0.08] mb-8">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-start gap-2.5 text-xs text-white/75 font-normal">
                      <Check size={14} className="text-blue-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Link
                  href="/contact"
                  className={`w-full py-3.5 rounded-full text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
                    plan.highlight
                      ? 'bg-white text-black hover:bg-white/90 shadow-lg shadow-white/10'
                      : 'bg-white/[0.04] text-white hover:bg-white/[0.08] border border-white/10 hover:border-white/20'
                  }`}
                >
                  {plan.cta} <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interactive Scope & Cost Calculator Toggle Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-150px" }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-white/[0.02] border border-white/[0.08] p-5 sm:p-8 md:p-10 backdrop-blur-xl"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/[0.08]">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                <Calculator size={22} />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Interactive Project Scope & Budget Calculator
                </h3>
                <p className="text-xs sm:text-sm text-white/50">
                  Select your product type and custom add-ons for an instant transparent estimation.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowEstimator(!showEstimator)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-white/[0.06] hover:bg-white/[0.1] text-white border border-white/10 transition-all self-start lg:self-auto"
            >
              {showEstimator ? 'Hide Calculator' : 'Configure Custom Scope'} <ArrowRight size={13} />
            </button>
          </div>

          {/* Expanded Interactive Calculator */}
          {showEstimator && (
            <div className="pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Configuration Column */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-white/55 block mb-3">
                    1. Select Core Product Type
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {projectTypes.map((pt) => {
                      const isSelected = selectedType.label === pt.label
                      return (
                        <button
                          key={pt.label}
                          onClick={() => setSelectedType(pt)}
                          className={`p-3.5 rounded-xl border text-left transition-all ${
                            isSelected
                              ? 'bg-blue-600/15 border-blue-500/50 text-white'
                              : 'bg-white/[0.02] border-white/[0.06] text-white/60 hover:text-white hover:bg-white/[0.04]'
                          }`}
                        >
                          <div className="text-xs font-bold text-white mb-1">{pt.label}</div>
                          <div className="text-[11px] text-white/55">From ₹{pt.base.toLocaleString()} · {pt.time}</div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-white/55 block mb-3">
                    2. Select Optional Add-ons & Integrations
                  </label>
                  <div className="space-y-2">
                    {addOnOptions.map((addon) => {
                      const isChecked = selectedAddons.some((a) => a.label === addon.label)
                      return (
                        <button
                          key={addon.label}
                          onClick={() => toggleAddon(addon)}
                          className={`w-full p-3 rounded-xl border flex items-center justify-between text-left transition-all ${
                            isChecked
                              ? 'bg-blue-600/10 border-blue-500/40 text-white'
                              : 'bg-white/[0.02] border-white/[0.06] text-white/60 hover:text-white hover:bg-white/[0.04]'
                          }`}
                        >
                          <span className="text-xs font-medium">{addon.label}</span>
                          <span className="text-xs font-mono text-blue-400">+₹{addon.price.toLocaleString()}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Right Calculation Summary Card */}
              <div className="lg:col-span-5 rounded-2xl bg-[#0B0D14] border border-white/10 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-white/55 mb-2">
                    Estimated Project Investment
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
                    ₹{calculatedTotal.toLocaleString()}
                  </div>
                  <div className="text-xs text-white/50 mb-6">
                    Estimated Timeline: <span className="text-white font-semibold">{selectedType.time}</span>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-2 mb-6">
                    <div className="text-[11px] font-semibold text-white/80">Included in this quote:</div>
                    <div className="text-xs text-white/50 flex items-center gap-2">
                      <Check size={12} className="text-emerald-400" /> Complete source code & IP ownership
                    </div>
                    <div className="text-xs text-white/50 flex items-center gap-2">
                      <Check size={12} className="text-emerald-400" /> Live staging URLs & weekly sprints
                    </div>
                    <div className="text-xs text-white/50 flex items-center gap-2">
                      <Check size={12} className="text-emerald-400" /> Post-launch SLA warranty support
                    </div>
                  </div>
                </div>

                <Link
                  href={`/contact?service=${encodeURIComponent(selectedType.label)}&budget=${encodeURIComponent(`₹${calculatedTotal.toLocaleString()}`)}`}
                  className="w-full py-3.5 rounded-full text-xs font-semibold bg-white text-black hover:bg-white/90 text-center transition-all flex items-center justify-center gap-2 shadow-lg shadow-white/10"
                >
                  Lock In This Scope & Estimate <ArrowRight size={13} />
                </Link>
              </div>

            </div>
          )}
        </motion.div>

        {/* Enterprise CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-150px" }}
          transition={{ duration: 0.5 }}
          className="mt-6 p-6 sm:p-10 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left"
        >
          <div>
            <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
              <span className="text-xs font-mono uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/20">
                {enterprisePlan.timeline}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                {enterprisePlan.name}
              </h3>
            </div>
            <p className="text-sm text-white/50 max-w-xl">
              {enterprisePlan.desc}
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-semibold bg-white text-black hover:bg-white/90 active:scale-[0.98] transition-all whitespace-nowrap shadow-lg shadow-white/10 shrink-0"
          >
            Talk to Enterprise Team <ArrowRight size={14} />
          </Link>
        </motion.div>

        {/* Footnote guarantee */}
        <div className="mt-8 text-center text-xs text-white/55">
          All projects billed in INR (International in USD). Includes 100% intellectual property transfer upon final delivery.
        </div>

      </div>
    </section>
  )
}
