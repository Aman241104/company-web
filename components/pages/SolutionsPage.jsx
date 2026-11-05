'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { cardGridContainer, cardSpringItem } from '@/lib/motionVariants'

// Solutions, rebuilt for design-system-v2 as problem → approach pairs.
// `need` is a plain description of the operational problem each industry
// typically brings to us (no stats, no client claims); `desc` + `points`
// are the existing approach copy, unchanged. `work` links only to real
// case studies under /work/[slug] whose subject genuinely sits in that
// industry — industries without a matching public case study get none,
// rather than a borrowed one.
const industries = [
  {
    title: 'Manufacturing & Supply Chain',
    need: 'Stock, purchase orders and production plans live in separate spreadsheets, so nobody sees the whole picture until something runs short.',
    desc: 'Multi-tier inventory, procurement, and production-line ERP systems built for factory-floor reliability.',
    points: ['Real-time inventory & stock sync', 'Vendor & procurement workflows', 'Production scheduling dashboards'],
    work: [
      { name: 'FGP Industries', slug: 'fgp-industries' },
      { name: 'Rising Rechargeable', slug: 'rising-rechargeable' },
    ],
  },
  {
    title: 'Chemicals & Pharma',
    need: 'Every batch has to be traceable and every check recorded, and paper logs make audits slow and error-prone.',
    desc: 'Batch tracking, regulatory compliance, and quality-control workflows for process manufacturers.',
    points: ['Batch & lot traceability', 'Compliance & audit reporting', 'Quality-control checkpoints'],
    work: [],
  },
  {
    title: 'Construction & Real Estate',
    need: 'Milestones, contractor bills and site updates arrive over calls and chat threads, and are hard to reconcile later.',
    desc: 'Project timelines, vendor billing, and site management dashboards for builders and developers.',
    points: ['Project & milestone tracking', 'Vendor & contractor billing', 'Site progress dashboards'],
    work: [
      { name: 'SV Space Designs', slug: 'sv-space-designs' },
      { name: 'Naam Transfer', slug: 'naam-transfer' },
    ],
  },
  {
    title: 'FinTech & Banking',
    need: 'Money-handling software has to prove who did what and when, and generic tools rarely leave a clean audit trail.',
    desc: 'Secure, audited financial platforms with RBAC, reconciliation, and compliance reporting.',
    points: ['Role-based access control', 'Automated reconciliation', 'Audit-ready compliance logs'],
    work: [{ name: 'NexSphere Global', slug: 'nexsphere-global' }],
  },
  {
    title: 'Healthcare & Clinical',
    need: 'Patients expect to book online, while clinics need patient data handled carefully and appointments kept in one place.',
    desc: 'Patient portals, appointment systems, and clinical workflow automation built around data privacy.',
    points: ['Patient & appointment portals', 'Clinical workflow automation', 'Secure records handling'],
    work: [{ name: 'Chahana Dental Studio', slug: 'chahana-dental' }],
  },
  {
    title: 'Retail & E-Commerce',
    need: 'A slow or confusing store loses the sale, and stock that is out of sync across channels loses the customer.',
    desc: 'High-conversion storefronts, inventory sync, and checkout flows built to scale with demand.',
    points: ['Conversion-optimized storefronts', 'Live inventory synchronization', 'Multi-channel checkout flows'],
    work: [
      { name: 'Prihaan Spices & Agro', slug: 'prihaan-spices' },
      { name: 'Silver Spoon by ACJ', slug: 'silver-spoon' },
      { name: 'Aangan Boutique', slug: 'aangan-boutique' },
    ],
  },
  {
    title: 'Education & EdTech',
    need: 'Courses, cohorts and progress end up split across video links, sheets and group chats that do not talk to each other.',
    desc: 'Learning management systems, cohort tracking, and content delivery built for engagement.',
    points: ['LMS & cohort tracking', 'Content delivery pipelines', 'Progress & engagement analytics'],
    work: [],
  },
  {
    title: 'Travel & Hospitality',
    need: 'High-value trips are sold on trust, so enquiry and itinerary flows have to feel personal and stay fast during peak season.',
    desc: 'Booking engines, itinerary management, and guest experience platforms built for peak-season load.',
    points: ['Booking & itinerary engines', 'Guest experience platforms', 'Peak-season load handling'],
    work: [{ name: 'Destination Anywhere', slug: 'destination-anywhere' }],
  },
]

const slugify = (s) => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

const btnPrimary =
  'inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white font-semibold hover:bg-accent-dim transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'

function PairCard({ industry, index }) {
  const id = slugify(industry.title)
  return (
    <motion.article
      id={id}
      aria-labelledby={`${id}-title`}
      variants={cardSpringItem}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className="scroll-mt-28 flex flex-col rounded-3xl bg-white border border-border overflow-hidden hover:shadow-lg hover:shadow-ink/5 transition-shadow duration-300"
    >
      <header className="flex items-baseline gap-4 px-6 sm:px-8 pt-7 sm:pt-8 pb-5">
        <span className="text-xs font-mono text-ink/55">{String(index + 1).padStart(2, '0')}</span>
        <h2 id={`${id}-title`} className="font-display text-xl sm:text-2xl font-extrabold text-ink tracking-tight leading-tight">
          {industry.title}
        </h2>
      </header>

      {/* Problem */}
      <div className="mx-3 sm:mx-4 rounded-2xl bg-cream-dim px-5 sm:px-6 py-5">
        <div className="text-[11px] font-mono uppercase tracking-wider text-ink/60 mb-2">The problem</div>
        <p className="text-sm sm:text-[15px] text-ink leading-relaxed">{industry.need}</p>
      </div>

      {/* Hinge */}
      <div aria-hidden="true" className="flex justify-center -my-3 relative z-10">
        <span className="w-8 h-8 rounded-full bg-white border border-border flex items-center justify-center text-ink rotate-90">
          <ArrowRight size={14} />
        </span>
      </div>

      {/* Approach */}
      <div className="px-6 sm:px-8 pt-6 pb-7 sm:pb-8 flex flex-col flex-1">
        <div className="text-[11px] font-mono uppercase tracking-wider text-ink/60 mb-2">Our approach</div>
        <p className="text-sm sm:text-[15px] text-ink-soft leading-relaxed mb-5">{industry.desc}</p>
        <ul className="space-y-2 mb-6">
          {industry.points.map((p) => (
            <li key={p} className="flex gap-3 text-sm text-ink/80">
              <span aria-hidden="true" className="mt-[0.6em] h-px w-3 shrink-0 bg-accent" />
              <span>{p}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-5 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {industry.work.length > 0 ? (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-ink/60 mr-1">Shipped</span>
              {industry.work.map((w) => (
                <Link
                  key={w.slug}
                  href={`/work/${w.slug}`}
                  className="px-3 py-1 rounded-full border border-ink/15 text-xs font-medium text-ink hover:border-ink/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
                >
                  {w.name}
                </Link>
              ))}
            </div>
          ) : (
            <span className="text-xs text-ink/60">No public case study in this industry yet.</span>
          )}
          <Link
            href={`/contact?service=${encodeURIComponent(industry.title)}`}
            aria-label={`Talk to us about ${industry.title}`}
            className="self-start sm:self-auto w-11 h-11 shrink-0 rounded-full border border-ink/20 text-ink flex items-center justify-center hover:bg-ink hover:text-white hover:border-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
          >
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </motion.article>
  )
}

export default function SolutionsPage() {
  return (
    <div className="overflow-hidden">
      {/* Hero — cream, headline left, industry index right */}
      <section className="bg-cream pt-32 sm:pt-40 pb-16 sm:pb-20">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            <div className="text-xs font-mono uppercase tracking-wider text-ink/55 mb-5">Solutions by industry</div>
            <h1 className="font-display text-[40px] sm:text-6xl lg:text-7xl font-extrabold text-ink tracking-tight leading-[1.04] mb-6">
              Software shaped around how your industry actually works.
            </h1>
            <p className="text-base sm:text-lg text-ink-soft leading-relaxed max-w-xl">
              From regulated clinical workflows to high-volume e-commerce and multi-tier industrial ERPs — we understand the domain nuances that generic agencies miss.
            </p>
          </motion.div>

          <motion.nav
            aria-label="Jump to an industry"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <ul className="flex flex-wrap gap-2">
              {industries.map((ind) => (
                <li key={ind.title}>
                  <a
                    href={`#${slugify(ind.title)}`}
                    className="inline-block px-3.5 py-1.5 rounded-full border border-ink/15 bg-white/60 text-xs sm:text-[13px] font-medium text-ink hover:border-ink/40 hover:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
                  >
                    {ind.title}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        </div>
      </section>

      {/* Problem → approach pairs — white */}
      <section className="bg-white py-16 sm:py-24">
        <motion.div
          variants={cardGridContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-120px' }}
          className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6"
        >
          {industries.map((ind, i) => (
            <PairCard key={ind.title} industry={ind} index={i} />
          ))}
        </motion.div>
      </section>

      {/* Closing — cream-dim, left-aligned split */}
      <section className="bg-cream-dim">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-8 py-20 sm:py-24 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-8"
          >
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-ink tracking-tight leading-[1.08] mb-4">
              Don&apos;t see your industry listed?
            </h2>
            <p className="text-base sm:text-lg text-ink-soft leading-relaxed max-w-xl">
              We&apos;ve shipped 150+ projects across a dozen more verticals. Talk to us about your specific domain.
            </p>
          </motion.div>
          <div className="lg:col-span-4 lg:flex lg:justify-end">
            <Link href="/contact" className={`${btnPrimary} px-7 py-3.5 text-sm focus-visible:ring-ink`}>
              Book free discovery session <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
