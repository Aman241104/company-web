'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion'

// Homepage proof band. Deliberately NOT a 4-up stat-strip: the About page
// already has a count-up stat grid (AboutPage.jsx), and v1 round 5 flagged a
// verbatim stat-strip shared between Home and About as a generic tell. Here
// the same real, previously-established figures (150+ projects, 100+ clients,
// 4.9/5 rating — see research/content-coverage-audit.md; founding year 2019
// from the About timeline) are set as one editorial sentence on the ink band.
// No new numbers are introduced.
export default function Stats() {
  const reduced = usePrefersReducedMotion()

  return (
    <section aria-labelledby="proof-heading" className="relative bg-ink text-white py-16 sm:py-24 md:py-28">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-8">
        <motion.h2
          id="proof-heading"
          initial={{ opacity: 0, y: reduced ? 0 : 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl text-[28px] sm:text-4xl lg:text-[52px] font-bold tracking-tight leading-[1.15]"
        >
          Since 2019 we&apos;ve shipped <span className="text-ice">150+</span> websites, stores and software
          projects for <span className="text-ice">100+</span> clients, and they rate us{' '}
          <span className="text-ice">4.9/5</span>. We stay on after launch, too.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: reduced ? 0 : 0.3 }}
          className="mt-10 sm:mt-14 pt-6 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
        >
          <p className="text-sm text-white/80">
            Based in Ahmedabad, working with businesses across India and abroad.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-1.5 self-start sm:self-auto px-5 py-2.5 rounded-full text-xs font-semibold text-white border border-white/40 hover:border-white hover:bg-white/10 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            Our story <ArrowRight size={13} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
