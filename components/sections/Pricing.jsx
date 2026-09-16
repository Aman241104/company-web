'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import { pricingTiers, enterpriseTier } from '@/lib/pricing'
import { cardGridContainer, cardSpringItem } from '@/lib/motionVariants'

export default function Pricing() {
  return (
    <section id="pricing" className="relative bg-white bg-dot-grid-light py-16 sm:py-24 md:py-32">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-8">
        <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-150px' }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <Check size={14} className="text-blue-600" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600">
                Pricing
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-950 tracking-tight leading-tight mb-4">
              Fixed pricing. No surprise invoices.
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-neutral-500 leading-relaxed">
              Every deliverable is written into your milestone contract before work begins. Starting-from prices, not teaser rates.
            </p>
          </motion.div>
        </div>

        {/* The "most popular" tier is genuinely elevated — a taller, closer
            card, not just a colored border — so hierarchy comes from real
            elevation rather than four identical boxes with a badge. Spring
            pop-in on entrance (matching the site's other card grids); the
            popular card additionally gets its own spring-based hover lift,
            reinforcing the elevation with motion, not just a border color. */}
        <motion.div
          variants={cardGridContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-150px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 items-stretch mb-8 sm:mb-10"
        >
          {pricingTiers.map((plan) => (
            <motion.div
              key={plan.id}
              variants={cardSpringItem}
              whileHover={
                plan.highlight
                  ? { scale: 1.02, transition: { type: 'spring', stiffness: 300, damping: 18 } }
                  : undefined
              }
              className={`rounded-2xl flex flex-col justify-between relative transition-all duration-300 overflow-hidden ${
                plan.highlight
                  ? 'bg-white border-2 border-blue-300 shadow-2xl shadow-blue-900/10 lg:-translate-y-3 z-10'
                  : 'bg-white/90 border border-neutral-200 shadow-sm hover:border-blue-200 hover:shadow-md'
              }`}
            >
              {plan.badge ? (
                <div className="px-6 sm:px-7 py-2.5 bg-blue-600 text-[11px] font-bold text-white uppercase tracking-wider text-center">
                  {plan.badge}
                </div>
              ) : (
                <div className="h-2.5" aria-hidden="true" />
              )}

              <div className="p-6 sm:p-7 pt-5 flex flex-col justify-between flex-1">
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-mono uppercase tracking-wider text-neutral-500">
                    {plan.name}
                  </span>
                  <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                    {plan.timeline}
                  </span>
                </div>

                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl sm:text-5xl font-extrabold text-neutral-950 tracking-tight">
                    {plan.priceLabel}
                  </span>
                  <span className="text-xs text-neutral-500 font-medium">
                    {plan.unit}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed mb-8 font-normal">
                  {plan.desc}
                </p>

                <div className="space-y-3.5 pt-6 border-t border-dashed border-neutral-200 mb-8">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-start gap-2.5 text-xs text-neutral-700 font-normal">
                      <Check size={14} className="text-blue-600 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href={`/contact?service=${encodeURIComponent(plan.name)}&budget=${plan.price}`}
                className={`w-full py-3.5 rounded-full text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
                  plan.highlight
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-600/20'
                    : 'bg-neutral-950 text-white hover:bg-neutral-800'
                }`}
              >
                {plan.cta} <ArrowRight size={14} />
              </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enterprise/SaaS CTA banner — extends the CTA.jsx pattern rather than
            being rendered as a 5th tier card, since it has no fixed price. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-150px' }}
          transition={{ duration: 0.5 }}
          className="p-6 sm:p-10 rounded-2xl bg-neutral-50 border border-neutral-200 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left"
        >
          <div>
            <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
              <span className="text-xs font-mono uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                {enterpriseTier.timeline}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-neutral-900 tracking-tight">
                {enterpriseTier.name}
              </h3>
            </div>
            <p className="text-sm text-neutral-500 max-w-xl">
              {enterpriseTier.desc}
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-semibold bg-neutral-950 text-white hover:bg-neutral-800 active:scale-[0.98] transition-all whitespace-nowrap shrink-0"
          >
            Talk to our enterprise team <ArrowRight size={14} />
          </Link>
        </motion.div>

        <div className="mt-8 text-center text-xs text-neutral-500">
          All projects billed in INR (international clients in USD). Includes 100% intellectual property transfer on final delivery.
        </div>
      </div>
    </section>
  )
}
