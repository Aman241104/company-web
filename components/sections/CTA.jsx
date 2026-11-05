'use client'
import Link from 'next/link'
import { motion, MotionConfig } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion'

// Closing CTA — Design System v2's one inverted band: the same forest-green
// ink used for headlines becomes the background here, cream becomes the
// text ("one hue used two ways", research/design-system-v2.md). Set as an
// inset panel on cream so it doesn't fuse with the (also ink) footer below.
// The three commitments are existing site copy (also stated in lib/faqs.ts
// answers on NDA/IP ownership) — not new claims.
const commitments = [
  'Fixed-price proposal in 24 hrs',
  'Mutual NDA on request',
  '100% IP ownership on delivery',
]

export default function CTA() {
  const reduced = usePrefersReducedMotion()

  return (
    <MotionConfig reducedMotion={reduced ? 'always' : 'never'}>
      <section id="contact" className="bg-cream px-3 sm:px-5 md:px-6 py-3 sm:py-5 md:py-6">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[1400px] mx-auto rounded-[28px] sm:rounded-[36px] bg-ink text-cream overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 px-6 sm:px-10 md:px-14 lg:px-16 py-14 sm:py-20 md:py-24">
            <div className="lg:col-span-7">
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.04] text-cream">
                Ready to grow your business online?
              </h2>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-end">
              <p className="text-base sm:text-lg text-cream/75 leading-relaxed mb-8 max-w-md">
                Let&apos;s discuss your business and build a website that helps you make a stronger impression and reach more customers.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 min-h-12 px-7 py-3.5 rounded-full text-sm font-semibold bg-accent text-ink hover:bg-accent-dim transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
                >
                  Get a free consultation <ArrowRight size={15} aria-hidden="true" />
                </Link>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 min-h-12 px-7 py-3.5 rounded-full text-sm font-semibold border border-cream/40 text-cream hover:bg-cream hover:text-ink transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
                >
                  WhatsApp us
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>

              <ul role="list" className="border-t border-cream/15 pt-6 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-3 text-sm text-cream/80">
                {commitments.map((c) => (
                  <li key={c} className="flex items-center gap-2.5">
                    <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </section>
    </MotionConfig>
  )
}
