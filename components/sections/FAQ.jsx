'use client'
import { useId, useState } from 'react'
import Link from 'next/link'
import { motion, MotionConfig } from 'framer-motion'
import { Plus, ArrowRight } from 'lucide-react'
import { faqs } from '@/lib/faqs'
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion'

// FAQ — Design System v2. Content comes straight from lib/faqs.ts, which is
// also what app/page.tsx maps into the FAQPage JSON-LD, so the visible
// answers and the schema can't drift apart.
//
// Accordion pattern (WAI-ARIA APG): each question is a <button> inside a
// heading, with aria-expanded + aria-controls; each answer is a
// role="region" labelled by its button. Panels stay mounted (so
// aria-controls always resolves) and collapse via a grid-rows transition;
// closed panels are `inert` so their text isn't reachable by tab/AT.
// List-type reveal: short, tight stagger — distinct from the card-grid
// spring (Pricing) and the slow single rise (CTA).
const itemReveal = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
}

function FAQItem({ item, isOpen, onToggle, baseId, index }) {
  const buttonId = `${baseId}-q-${index}`
  const panelId = `${baseId}-a-${index}`

  return (
    <motion.li variants={itemReveal} className="border-b border-border">
      <h3 className="m-0">
        <button
          id={buttonId}
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="group w-full flex items-start justify-between gap-6 py-5 sm:py-6 text-left rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <span className="font-display text-base sm:text-lg font-semibold text-ink tracking-tight leading-snug">
            {item.q}
          </span>
          <span
            aria-hidden="true"
            className={`mt-0.5 w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-[background-color,border-color,color,transform] duration-300 motion-reduce:transition-none ${
              isOpen
                ? 'bg-ink border-ink text-cream rotate-45'
                : 'border-border-hover text-ink group-hover:border-ink'
            }`}
          >
            <Plus size={15} />
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        inert={!isOpen}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-sm sm:text-[15px] text-ink/75 leading-relaxed pb-6 sm:pr-12 max-w-2xl">
            {item.a}
          </p>
        </div>
      </div>
    </motion.li>
  )
}

export default function FAQ() {
  const [open, setOpen] = useState(0)
  const baseId = useId()
  const reduced = usePrefersReducedMotion()

  return (
    <MotionConfig reducedMotion={reduced ? 'always' : 'never'}>
      <section id="faq" className="relative bg-cream py-16 sm:py-24 md:py-32">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Index-style layout: header pinned on the left at desktop, one
              clean list on the right — reference material, not a hero. */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="lg:col-span-4 lg:sticky lg:top-28 self-start"
          >
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-ink/70 mb-3 inline-block">
              FAQ
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink tracking-tight leading-[1.08] mb-4">
              Questions we get before every project
            </h2>
            <p className="text-sm sm:text-base text-ink/75 leading-relaxed mb-8 max-w-sm">
              Straight answers on timelines, pricing, ownership and how we work.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 min-h-11 px-5 py-2.5 rounded-full border border-ink text-sm font-semibold text-ink hover:bg-ink hover:text-cream transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Ask us directly <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </motion.div>

          <motion.ul
            role="list"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-120px' }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
            className="lg:col-span-8 border-t border-border"
          >
            {faqs.map((faq, i) => (
              <FAQItem
                key={faq.q}
                item={faq}
                index={i}
                baseId={baseId}
                isOpen={open === i}
                onToggle={() => setOpen(open === i ? null : i)}
              />
            ))}
          </motion.ul>
        </div>
      </section>
    </MotionConfig>
  )
}
