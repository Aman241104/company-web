'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, HelpCircle, ArrowRight } from 'lucide-react'
import { faqs } from '@/lib/faqs'

function FAQItem({ item, isOpen, onToggle, index }) {
  const panelId = `faq-panel-${index}`
  const buttonId = `faq-button-${index}`

  return (
    <div className="border-b border-white/[0.08] last:border-b-0">
      <button
        id={buttonId}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="w-full flex items-center justify-between py-6 text-left group transition-colors"
      >
        <span className={`text-base sm:text-lg font-bold tracking-tight transition-colors ${isOpen ? 'text-blue-400' : 'text-white group-hover:text-white/90'}`}>
          {item.q}
        </span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ml-4 transition-all ${isOpen ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'bg-white/[0.04] text-white/55 group-hover:text-white group-hover:bg-white/[0.08]'}`}>
          {isOpen ? <Minus size={14} /> : <Plus size={14} />}
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
            <p className="text-sm sm:text-base text-white/60 leading-relaxed font-normal pb-6 max-w-3xl">
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

  return (
    <section id="faq" className="py-16 sm:py-24 md:py-32 max-w-[1000px] mx-auto px-5 sm:px-6 md:px-8">
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14 md:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-150px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="glow-pill mb-4 inline-flex">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3">
            Clear answers.{' '}
            <span className="text-gradient-accent">Zero ambiguity.</span>
          </h2>
          <p className="text-sm sm:text-base text-white/50 leading-relaxed">
            Everything you need to know about our workflow, deliverables, contracts, and IP ownership.
          </p>
        </motion.div>
      </div>

      {/* Accordion List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-150px" }}
        transition={{ duration: 0.45 }}
        className="rounded-3xl bg-white/[0.02] border border-white/[0.08] p-5 sm:p-8 md:p-10"
      >
        {faqs.map((faq, i) => (
          <FAQItem
            key={faq.q}
            item={faq}
            index={i}
            isOpen={open === i}
            onToggle={() => setOpen(open === i ? null : i)}
          />
        ))}
      </motion.div>

      {/* Still Have Questions CTA */}
      <div className="mt-8 text-center">
        <p className="text-xs sm:text-sm text-white/55 mb-3">
          Have a unique technical question or custom scope?
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
        >
          Ask our engineering leads directly <ArrowRight size={13} />
        </Link>
      </div>
    </section>
  )
}
