'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Factory, FlaskConical, HardHat, Landmark, HeartPulse, ShoppingCart, GraduationCap, Plane, ArrowRight, CheckCircle2 } from 'lucide-react'

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

function IndustryCard({ industry, index }) {
  const Icon = industry.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-blue-500/30 hover:bg-white/[0.035] transition-all flex flex-col justify-between"
    >
      <div>
        <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-5 text-blue-400">
          <Icon size={20} />
        </div>
        <h3 className="text-lg font-bold text-white tracking-tight mb-2">{industry.title}</h3>
        <p className="text-sm text-white/55 leading-relaxed mb-5">{industry.desc}</p>
      </div>
      <ul className="space-y-2 pt-4 border-t border-white/[0.06]">
        {industry.points.map((p) => (
          <li key={p} className="flex items-start gap-2 text-xs text-white/60">
            <CheckCircle2 size={13} className="text-blue-400 shrink-0 mt-0.5" />
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

export default function SolutionsPage() {
  return (
    <div className="pt-32 pb-24 overflow-hidden">
      {/* Section Header */}
      <section className="max-w-[1360px] mx-auto px-6 md:px-8 mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <span className="glow-pill mb-4 inline-flex">
            Domain Expertise
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] mb-6">
            Tailored solutions for{' '}
            <span className="text-gradient-accent">critical industries.</span>
          </h1>
          <p className="text-base sm:text-lg text-white/50 leading-relaxed">
            From regulated clinical workflows to high-volume e-commerce and multi-tier industrial ERPs — we understand the domain nuances that generic agencies miss.
          </p>
        </motion.div>
      </section>

      {/* Industry Grid */}
      <section className="max-w-[1360px] mx-auto px-6 md:px-8 mb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {industries.map((industry, i) => (
            <IndustryCard key={industry.title} industry={industry} index={i} />
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-[1360px] mx-auto px-6 md:px-8 text-center">
        <div className="max-w-2xl mx-auto rounded-3xl bg-white/[0.02] border border-white/[0.08] p-10 sm:p-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Don&apos;t see your industry listed?
          </h2>
          <p className="text-sm sm:text-base text-white/50 mb-8 max-w-md mx-auto">
            We&apos;ve shipped 150+ projects across a dozen more verticals. Talk to us about your specific domain.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-xs sm:text-sm font-semibold bg-white text-black hover:bg-white/90 shadow-xl shadow-white/10 transition-all"
          >
            Book Free Discovery Session <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  )
}
