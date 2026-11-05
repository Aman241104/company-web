'use client'
import Link from 'next/link'
import { motion, MotionConfig } from 'framer-motion'
import { Check, ArrowRight, ArrowUpRight } from 'lucide-react'
import { pricingTiers, enterpriseTier } from '@/lib/pricing'
import { cardGridContainer, cardSpringItem } from '@/lib/motionVariants'
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion'

// Pricing — Design System v2 (research/design-system-v2.md).
// All figures come from lib/pricing.ts (single source of truth) — nothing is
// hardcoded here. The highlighted tier is set apart by an inverted ink-green
// surface (the same forest green used for headlines and dark bands), not by
// glow, shadow bloom or a filled "MOST POPULAR" banner. Its badge is shown
// as an outlined tag pill, same primitive as every other tag on the site.
export default function Pricing() {
  const reduced = usePrefersReducedMotion()

  return (
    <MotionConfig reducedMotion={reduced ? 'always' : 'never'}>
      <section id="pricing" className="relative bg-cream-dim py-16 sm:py-24 md:py-32">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-8">
          {/* Left-aligned header with the note on the right — reads as a
              price list, not another centered announcement. */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end mb-10 sm:mb-14 md:mb-16"
          >
            <div className="lg:col-span-7">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-ink/70 mb-3 inline-block">
                Pricing
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink tracking-tight leading-[1.08]">
                Fixed pricing. No surprise invoices.
              </h2>
            </div>
            <p className="lg:col-span-5 text-sm sm:text-base text-ink/75 leading-relaxed max-w-md">
              Every deliverable is written into your milestone contract before work begins. Starting-from prices, not teaser rates.
            </p>
          </motion.div>

          <motion.ul
            role="list"
            variants={cardGridContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-120px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 items-stretch mb-5 sm:mb-6"
          >
            {pricingTiers.map((plan) => {
              const featured = plan.highlight
              return (
                <motion.li
                  key={plan.id}
                  variants={cardSpringItem}
                  whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300, damping: 24 } }}
                  className={`group rounded-3xl flex flex-col p-6 sm:p-7 transition-colors duration-300 ${
                    featured
                      ? 'bg-ink text-cream border border-ink'
                      : 'bg-white text-ink border border-border hover:border-border-hover'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-6">
                    <h3 className={`font-display text-lg font-semibold tracking-tight ${featured ? 'text-cream' : 'text-ink'}`}>
                      {plan.name}
                    </h3>
                    {plan.badge && (
                      <span
                        className={`shrink-0 text-[11px] font-semibold px-2.5 py-1 rounded-full border ${
                          featured ? 'border-ice text-ice' : 'border-ink text-ink'
                        }`}
                      >
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  <div className="flex items-baseline gap-2 mb-1">
                    <span className={`font-display text-4xl sm:text-[2.75rem] font-bold tracking-tight leading-none ${featured ? 'text-cream' : 'text-ink'}`}>
                      {plan.priceLabel}
                    </span>
                    <span className={`text-xs font-medium ${featured ? 'text-cream/70' : 'text-ink/70'}`}>
                      {plan.unit}
                    </span>
                  </div>
                  <div className="mb-5">
                    <span
                      className={`inline-block mt-3 text-[11px] font-medium px-2.5 py-1 rounded-full border ${
                        featured ? 'border-cream/25 text-cream/80' : 'border-border-hover text-ink/75'
                      }`}
                    >
                      {plan.timeline}
                    </span>
                  </div>

                  <p className={`text-sm leading-relaxed mb-6 ${featured ? 'text-cream/75' : 'text-ink/75'}`}>
                    {plan.desc}
                  </p>

                  <ul
                    role="list"
                    className={`space-y-3 pt-5 mb-8 border-t flex-1 ${featured ? 'border-cream/15' : 'border-border'}`}
                  >
                    {plan.features.map((f) => (
                      <li key={f} className={`flex items-start gap-2.5 text-[13px] leading-relaxed ${featured ? 'text-cream/85' : 'text-ink/80'}`}>
                        <Check
                          size={14}
                          aria-hidden="true"
                          className={`shrink-0 mt-[3px] ${featured ? 'text-ice' : 'text-ink'}`}
                        />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Primary (coral pill) only on the featured plan; outlined
                      pill secondary everywhere else — two of the three
                      button primitives, nothing bespoke. */}
                  <Link
                    href={`/contact?service=${encodeURIComponent(plan.name)}&budget=${plan.price}`}
                    className={`w-full min-h-11 px-5 py-3 rounded-full text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${
                      featured
                        ? 'bg-accent text-ink hover:bg-accent-dim focus-visible:outline-cream'
                        : 'border border-ink text-ink hover:bg-ink hover:text-cream focus-visible:outline-accent'
                    }`}
                  >
                    {plan.cta} <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </motion.li>
              )
            })}
          </motion.ul>

          {/* Enterprise/SaaS — no fixed price, so it's a plain row under the
              grid rather than a fifth tier card. */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="rounded-3xl border border-border bg-cream p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-5"
          >
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h3 className="font-display text-lg sm:text-xl font-semibold text-ink tracking-tight">
                  {enterpriseTier.name}
                </h3>
                <span className="text-[11px] font-medium px-2.5 py-1 rounded-full border border-border-hover text-ink/75">
                  {enterpriseTier.timeline}
                </span>
              </div>
              <p className="text-sm text-ink/75 leading-relaxed max-w-xl">{enterpriseTier.desc}</p>
            </div>
            <Link
              href="/contact"
              className="group/cta inline-flex items-center gap-3 self-start md:self-auto text-sm font-semibold text-ink shrink-0 rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              Talk to our enterprise team
              <span className="w-10 h-10 rounded-full border border-ink flex items-center justify-center transition-colors group-hover/cta:bg-ink group-hover/cta:text-cream">
                <ArrowUpRight size={16} aria-hidden="true" />
              </span>
            </Link>
          </motion.div>

          <p className="mt-6 text-xs text-ink/70">
            All projects billed in INR (international clients in USD). Includes 100% intellectual property transfer on final delivery.
          </p>
        </div>
      </section>
    </MotionConfig>
  )
}
