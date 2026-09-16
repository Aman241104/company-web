'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, ArrowRight } from 'lucide-react'
import { faqs } from '@/lib/faqs'

function FAQItem({ item, isOpen, onToggle, index }) {
  const panelId = `faq-panel-${index}`
  const buttonId = `faq-button-${index}`

  return (
    <div className="border-b border-neutral-200">
      <button
        id={buttonId}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group transition-colors"
      >
        <span className={`text-sm sm:text-base font-bold tracking-tight transition-colors ${isOpen ? 'text-blue-600' : 'text-neutral-900 group-hover:text-neutral-700'}`}>
          {item.q}
        </span>
        <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all ${isOpen ? 'bg-blue-50 text-blue-600 border border-blue-200' : 'bg-white text-neutral-400 border border-neutral-200 group-hover:text-neutral-700 group-hover:border-neutral-300'}`}>
          {isOpen ? <Minus size={13} /> : <Plus size={13} />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <p className="text-sm text-neutral-500 leading-relaxed pb-5 max-w-md font-normal">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [open, setOpen] = useState(0)
  const mid = Math.ceil(faqs.length / 2)
  const colA = faqs.slice(0, mid)
  const colB = faqs.slice(mid)

  return (
    <section id="faq" className="relative bg-neutral-50 py-16 sm:py-24 md:py-32">
      <div className="max-w-[1160px] mx-auto px-5 sm:px-6 md:px-8">
        {/* Left-aligned, compact — this is a reference/index section, not
            another hero-style centered announcement. */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 sm:mb-14">
          <div className="max-w-lg">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight mb-3">
              Questions we get{' '}
              <span className="text-blue-600">before every project</span>
            </h2>
            <p className="text-sm sm:text-base text-neutral-500 leading-relaxed">
              Straight answers on timelines, pricing, ownership and how we work.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors shrink-0"
          >
            Ask our engineering leads directly <ArrowRight size={13} />
          </Link>
        </div>

        {/* No shared white card shell — a bare two-column index sitting
            directly on the section's own background, divided by a rule
            rather than boxed like every other section on the site. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-150px' }}
          transition={{ duration: 0.45 }}
          className="grid grid-cols-1 lg:grid-cols-2 lg:divide-x lg:divide-neutral-200"
        >
          <div className="lg:pr-10 border-t border-neutral-200 lg:border-t-0">
            {colA.map((faq, i) => (
              <FAQItem
                key={faq.q}
                item={faq}
                index={i}
                isOpen={open === i}
                onToggle={() => setOpen(open === i ? null : i)}
              />
            ))}
          </div>
          <div className="lg:pl-10 border-t border-neutral-200 lg:border-t-0">
            {colB.map((faq, i) => {
              const globalIndex = mid + i
              return (
                <FAQItem
                  key={faq.q}
                  item={faq}
                  index={globalIndex}
                  isOpen={open === globalIndex}
                  onToggle={() => setOpen(open === globalIndex ? null : globalIndex)}
                />
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
