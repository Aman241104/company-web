'use client'
import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Plus, Minus } from 'lucide-react'
import { locations } from '@/lib/locations'
import { clipWipe } from '@/lib/motionVariants'
import { useClearanceGuard } from '@/lib/useClearanceGuard'

// Rebuilt from the pre-round-1 centered-pill/H1/card-grid template that
// round 1 left untouched. Instead of a generic hero followed by a 3x2 card
// grid, this leads with the location list itself — a directory you scan
// and expand in place, matching the editorial, functional direction
// About/Work/Solutions already took. All five rows are the real cities in
// `lib/locations.ts`; nothing here is invented.

function LocationRow({ location, isOpen, onToggle, index }) {
  const { slug, city, region, tagline, intro, focusPoints } = location
  const previewPoints = focusPoints.slice(0, 2)
  const rowRef = useRef(null)

  // Guards this row from landing under the fixed floating WhatsApp button
  // OR the fixed mobile dock nav on mobile — whichever's danger band is
  // taller — same mechanism as Hero/WorkPage (`lib/useClearanceGuard.ts`),
  // now scroll-reactive. The first row (Ahmedabad) is open by default, so
  // this also re-checks on mount with zero interaction, and `isOpen` is
  // passed as a dep so switching cities re-checks immediately instead of
  // waiting for the next scroll/resize.
  useClearanceGuard(['--whatsapp-clearance', '--mobile-dock-clearance'], [rowRef], {}, [isOpen])

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="border-t border-neutral-200 last:border-b"
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`location-panel-${slug}`}
        className="w-full flex items-center justify-between gap-4 py-5 sm:py-6 text-left group"
      >
        <div className="flex items-baseline gap-3 flex-wrap">
          <h2 className={`text-xl sm:text-2xl font-extrabold tracking-tight transition-colors ${isOpen ? 'text-blue-600' : 'text-neutral-950 group-hover:text-blue-600'}`}>
            {city}
          </h2>
          <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 bg-neutral-50 border border-neutral-200 rounded-full px-2.5 py-0.5">
            {region}
          </span>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <p className="hidden md:block text-sm text-neutral-500 max-w-xs text-right leading-snug">
            {tagline}
          </p>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${isOpen ? 'bg-blue-50 text-blue-600 border border-blue-200' : 'bg-white text-neutral-500 border border-neutral-200 group-hover:text-neutral-950 group-hover:border-neutral-300'}`}>
            {isOpen ? <Minus size={14} /> : <Plus size={14} />}
          </div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`location-panel-${slug}`}
            role="region"
            variants={clipWipe}
            initial="initial"
            animate="animate"
            exit="exit"
            className="overflow-hidden"
          >
            <div className="pb-7 sm:pb-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
              <p className="lg:col-span-7 text-sm sm:text-base text-neutral-600 leading-relaxed">
                {intro}
              </p>
              <div className="lg:col-span-5 space-y-3">
                {previewPoints.map((point) => (
                  <div key={point.title} className="text-sm">
                    <span className="font-semibold text-neutral-900">{point.title}</span>
                    <span className="text-neutral-500"> — {point.desc}</span>
                  </div>
                ))}
                <Link
                  href={`/locations/${slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors pt-1"
                >
                  View the full {city} page <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function LocationsIndexPage() {
  const [openSlug, setOpenSlug] = useState(locations[0]?.slug ?? null)

  return (
    <div className="pt-32 pb-24 overflow-hidden">
      {/* Header — left-aligned and deliberately smaller than a full page
          hero, since the list below (not a hero statement) is the point of
          this page. */}
      <section className="max-w-[1360px] mx-auto px-6 md:px-8 mb-10 sm:mb-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <span className="glow-pill mb-4 inline-flex">Where We Work</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-950 tracking-tight leading-[1.1] mb-4">
            Remote-first delivery, <span className="text-blue-600">real local work.</span>
          </h1>
          <p className="text-sm sm:text-base text-neutral-500 leading-relaxed">
            Active client work across Gujarat and Maharashtra today. Open a city below for its specific focus areas and case studies.
          </p>
        </motion.div>
      </section>

      {/* Directory — a bare divided list you expand in place, not a card
          grid. Reuses the site's accordion affordance (see FAQ.jsx) with a
          clip-path reveal instead of a plain height fade, so switching
          between cities visually reads as swapping content, not arriving. */}
      <section className="max-w-[1360px] mx-auto px-6 md:px-8 mb-20 sm:mb-24">
        <div>
          {locations.map((location, i) => (
            <LocationRow
              key={location.slug}
              location={location}
              index={i}
              isOpen={openSlug === location.slug}
              onToggle={() => setOpenSlug(openSlug === location.slug ? null : location.slug)}
            />
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-[1360px] mx-auto px-6 md:px-8 text-center">
        <div className="max-w-2xl mx-auto rounded-3xl bg-neutral-50 border border-neutral-200 p-10 sm:p-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight mb-4">
            Not seeing your city?
          </h2>
          <p className="text-sm sm:text-base text-neutral-500 mb-8 max-w-md mx-auto">
            Our delivery process is remote-first — location within India has never been a constraint on the work.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-xs sm:text-sm font-semibold bg-neutral-950 text-white hover:bg-neutral-800 shadow-xl shadow-neutral-950/10 transition-all"
          >
            Book Free Discovery Session <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  )
}
