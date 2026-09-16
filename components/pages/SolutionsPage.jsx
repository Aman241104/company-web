'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Factory, FlaskConical, HardHat, Landmark, HeartPulse, ShoppingCart, GraduationCap, Plane, ArrowRight, CheckCircle2 } from 'lucide-react'
import { clipWipe } from '@/lib/motionVariants'

const industries = [
  {
    icon: Factory,
    title: 'Manufacturing & Supply Chain',
    desc: 'Multi-tier inventory, procurement, and production-line ERP systems built for factory-floor reliability.',
    points: ['Real-time inventory & stock sync', 'Vendor & procurement workflows', 'Production scheduling dashboards'],
  },
  {
    icon: FlaskConical,
    title: 'Chemicals & Pharma',
    desc: 'Batch tracking, regulatory compliance, and quality-control workflows for process manufacturers.',
    points: ['Batch & lot traceability', 'Compliance & audit reporting', 'Quality-control checkpoints'],
  },
  {
    icon: HardHat,
    title: 'Construction & Real Estate',
    desc: 'Project timelines, vendor billing, and site management dashboards for builders and developers.',
    points: ['Project & milestone tracking', 'Vendor & contractor billing', 'Site progress dashboards'],
  },
  {
    icon: Landmark,
    title: 'FinTech & Banking',
    desc: 'Secure, audited financial platforms with RBAC, reconciliation, and compliance reporting.',
    points: ['Role-based access control', 'Automated reconciliation', 'Audit-ready compliance logs'],
  },
  {
    icon: HeartPulse,
    title: 'Healthcare & Clinical',
    desc: 'Patient portals, appointment systems, and clinical workflow automation built around data privacy.',
    points: ['Patient & appointment portals', 'Clinical workflow automation', 'Secure records handling'],
  },
  {
    icon: ShoppingCart,
    title: 'Retail & E-Commerce',
    desc: 'High-conversion storefronts, inventory sync, and checkout flows built to scale with demand.',
    points: ['Conversion-optimized storefronts', 'Live inventory synchronization', 'Multi-channel checkout flows'],
  },
  {
    icon: GraduationCap,
    title: 'Education & EdTech',
    desc: 'Learning management systems, cohort tracking, and content delivery built for engagement.',
    points: ['LMS & cohort tracking', 'Content delivery pipelines', 'Progress & engagement analytics'],
  },
  {
    icon: Plane,
    title: 'Travel & Hospitality',
    desc: 'Booking engines, itinerary management, and guest experience platforms built for peak-season load.',
    points: ['Booking & itinerary engines', 'Guest experience platforms', 'Peak-season load handling'],
  },
]

export default function SolutionsPage() {
  const [active, setActive] = useState(0)
  const current = industries[active]
  const CurrentIcon = current.icon

  return (
    <div className="pt-32 pb-24 overflow-hidden">
      {/* Header — left-aligned, not centered, to set up the selector below */}
      <section className="max-w-[1360px] mx-auto px-6 md:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <span className="glow-pill mb-4 inline-flex">
            Domain Expertise
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-950 tracking-tight leading-[1.08] mb-6">
            Tailored solutions for{' '}
            <span className="text-blue-600">critical industries.</span>
          </h1>
          <p className="text-base sm:text-lg text-neutral-500 leading-relaxed">
            From regulated clinical workflows to high-volume e-commerce and multi-tier industrial ERPs — we understand the domain nuances that generic agencies miss. Pick an industry below.
          </p>
        </motion.div>
      </section>

      {/* Industry Selector — a browsable list + detail panel, replacing a
          4-up icon-card grid with something you actually interact with. */}
      <section className="max-w-[1360px] mx-auto px-6 md:px-8 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start rounded-3xl border border-neutral-200 bg-white shadow-sm overflow-hidden">

          {/* Left: industry list */}
          <nav
            aria-label="Select an industry"
            className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-neutral-200 p-2 sm:p-3 lg:max-h-[560px] lg:overflow-y-auto"
          >
            {industries.map((industry, i) => {
              const isActive = i === active
              return (
                <button
                  key={industry.title}
                  onClick={() => setActive(i)}
                  aria-current={isActive}
                  className={`w-full flex items-center gap-3.5 text-left px-4 py-3.5 rounded-xl transition-all ${
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-950'
                  }`}
                >
                  <span className={`text-xs font-mono font-bold shrink-0 w-6 ${isActive ? 'text-blue-600' : 'text-neutral-400'}`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm font-semibold flex-1">{industry.title}</span>
                  <ArrowRight
                    size={14}
                    className={`shrink-0 transition-all ${isActive ? 'opacity-100 translate-x-0 text-blue-600' : 'opacity-0 -translate-x-1'}`}
                  />
                </button>
              )
            })}
          </nav>

          {/* Right: detail panel for the selected industry */}
          <div className="lg:col-span-8 p-6 sm:p-10 lg:pl-4 min-h-[380px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.title}
                variants={clipWipe}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center mb-6 text-white shadow-lg shadow-blue-600/20">
                  <CurrentIcon size={26} />
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight mb-3">
                  {current.title}
                </h2>
                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed mb-8 max-w-xl">
                  {current.desc}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-neutral-100 mb-8">
                  {current.points.map((p) => (
                    <div key={p} className="flex items-start gap-2.5 text-sm text-neutral-700">
                      <CheckCircle2 size={16} className="text-blue-600 shrink-0 mt-0.5" />
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href={`/contact?service=${encodeURIComponent(current.title)}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-neutral-950 text-white hover:bg-neutral-800 shadow-lg shadow-neutral-950/10 transition-all"
                >
                  Talk to us about {current.title} <ArrowRight size={13} />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-[1360px] mx-auto px-6 md:px-8 text-center">
        <div className="max-w-2xl mx-auto rounded-3xl bg-neutral-50 border border-neutral-200 p-10 sm:p-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight mb-4">
            Don&apos;t see your industry listed?
          </h2>
          <p className="text-sm sm:text-base text-neutral-500 mb-8 max-w-md mx-auto">
            We&apos;ve shipped 150+ projects across a dozen more verticals. Talk to us about your specific domain.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-xs sm:text-sm font-semibold bg-neutral-950 text-white hover:bg-neutral-800 shadow-xl shadow-neutral-950/10 transition-all"
          >
            Book Free Discovery Session <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  )
}
