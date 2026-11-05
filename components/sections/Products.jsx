'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion'

// Vibo ERP — Mehta's own product. Same real copy as before; restyled to the
// v2 system: plain surfaces, the 3 button primitives, and the modules set as
// an editorial index list (hairline rows) instead of glowing icon tiles.
const modules = [
  { title: 'Sales', desc: 'Track orders and manage your sales pipeline in one place.' },
  { title: 'Inventory', desc: 'Real-time stock levels across your products and locations.' },
  { title: 'Billing', desc: 'Fast, compliant invoicing without spreadsheets.' },
  { title: 'Customers', desc: 'A single record of every customer and their order history.' },
  { title: 'Purchases', desc: 'Manage suppliers and purchase orders end to end.' },
  { title: 'Business Reports', desc: 'Clear reporting on how your business is actually performing.' },
]

const benefits = [
  'Manage sales, inventory, billing and customers from one dashboard',
  'Built and refined through everyday use in our own operations',
  'Available to clients who need more than a website',
]

export default function Products() {
  const reduced = usePrefersReducedMotion()
  const rise = (delay = 0) => ({
    initial: { opacity: 0, y: reduced ? 0 : 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-120px' },
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  })

  return (
    <section id="products" className="relative bg-white py-16 sm:py-24 md:py-32">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Copy */}
          <motion.div {...rise()} className="lg:col-span-5">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-ink/70 mb-3 inline-block">
              Our own product
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight leading-[1.08] mb-5">
              Vibo ERP
            </h2>
            <p className="text-sm sm:text-base text-ink/70 leading-relaxed mb-7 max-w-lg">
              Vibo ERP is our in-house business management software, designed to help businesses manage their
              operations (sales, inventory, billing and more) from one place.
            </p>

            <ul className="space-y-3 mb-8">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-ink/80">
                  <span aria-hidden="true" className="mt-[7px] w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full text-sm font-semibold bg-accent text-white hover:bg-accent-dim transition-colors active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
              >
                Talk to us about Vibo ERP <ArrowRight size={14} />
              </Link>
              <Link
                href="/work/vibo-erp"
                className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full text-sm font-semibold text-ink border border-ink/20 hover:border-ink/40 hover:bg-ink/[0.04] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                Read the case study
              </Link>
            </div>
          </motion.div>

          {/* Product screenshot on a plain cream-dim field */}
          <motion.div {...rise(0.12)} className="lg:col-span-7">
            <div className="relative rounded-[28px] bg-cream-dim p-5 sm:p-8 md:p-10">
              <div className="relative aspect-[16/10]">
                <Image
                  src="/assets/saas_hero_mockup.png"
                  alt="Vibo ERP dashboard"
                  fill
                  sizes="(max-width: 1024px) 90vw, 700px"
                  className="object-contain object-center"
                />
              </div>
              <span className="absolute bottom-4 left-5 sm:bottom-6 sm:left-8 text-[11px] font-medium text-ink/70">
                Built and used in-house at Mehta Technologies
              </span>
            </div>
          </motion.div>
        </div>

        {/* Modules — an index list with hairline rules, not icon tiles */}
        <motion.div {...rise(0.05)} className="mt-14 sm:mt-20">
          <h3 className="text-sm font-semibold text-ink mb-4">What&apos;s inside</h3>
          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 border-t border-ink/15">
            {modules.map((m) => (
              <div key={m.title} className="py-5 border-b border-ink/10">
                <dt className="text-base font-bold text-ink tracking-tight mb-1">{m.title}</dt>
                <dd className="text-sm text-ink/70 leading-relaxed">{m.desc}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  )
}
