'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion'

// Hero visual: two real delivered sites in plain device frames on the cream
// hero. No ambient glow, no stat chips (the homepage's real figures live in
// Stats.jsx's proof band) — just honest captions naming what each screen is.
export default function HeroDashboardShowcase() {
  const reduced = usePrefersReducedMotion()

  return (
    <div className="relative w-full mx-auto pt-6 lg:pt-0 overflow-visible">
      <motion.div
        initial={{ opacity: 0, y: reduced ? 0 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="relative w-full lg:w-[108%] lg:-ml-[6%] pb-10 sm:pb-14"
      >
        {/* Laptop: a business website */}
        <div className="relative w-full">
          <div className="rounded-t-xl bg-ink p-2 shadow-[0_30px_60px_-20px_rgba(10, 17, 36,0.35)]">
            <div className="flex items-center justify-center pb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-white/25" />
            </div>
            <div className="relative aspect-[16/10] rounded-md overflow-hidden bg-cream-dim">
              <Image
                src="/assets/sv-space-designs-live.jpg"
                alt="SV Space Designs, a business website built by Mehta Technologies"
                fill
                loading="eager"
                fetchPriority="high"
                sizes="(min-width: 1280px) 620px, (min-width: 1024px) 520px, 90vw"
                className="object-cover object-top select-none"
              />
            </div>
          </div>
          <div className="h-2.5 rounded-b-[10px] bg-ink-dim" />
          <div className="mx-auto h-1 w-1/3 rounded-b-xl bg-ink/40" />
        </div>

        {/* Phone: an e-commerce website */}
        <div className="absolute -bottom-2 right-0 w-[30%] max-w-[150px]">
          <div className="rounded-[1.4rem] border-[3px] border-ink bg-ink shadow-[0_24px_40px_-16px_rgba(10, 17, 36,0.4)] overflow-hidden">
            <div className="relative aspect-[9/19]">
              <Image
                src="/assets/prihaan-spices-mobile.jpg"
                alt="Prihaan Spices, the mobile version of an e-commerce website built by Mehta Technologies"
                fill
                loading="eager"
                sizes="180px"
                className="object-cover object-top select-none"
              />
            </div>
          </div>
        </div>

        {/* Captions — outlined tag pills naming the real projects on screen */}
        <motion.span
          initial={{ opacity: 0, y: reduced ? 0 : -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="absolute -top-3 left-3 sm:left-6 px-3 py-1.5 rounded-full bg-cream border border-ink/20 text-[11px] font-semibold text-ink"
        >
          SV Space Designs · website
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: reduced ? 0 : 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="absolute bottom-6 left-0 sm:left-2 px-3 py-1.5 rounded-full bg-cream border border-ink/20 text-[11px] font-semibold text-ink"
        >
          Prihaan Spices · online store
        </motion.span>
      </motion.div>
    </div>
  )
}
