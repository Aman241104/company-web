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
    <motion.li
      ref={rowRef}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="border-b border-border"
    >
      <h2>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`location-panel-${slug}`}
          id={`location-trigger-${slug}`}
          className="w-full flex items-center justify-between gap-4 py-6 sm:py-7 text-left group rounded-lg"
        >
          <span className="flex items-baseline gap-3 sm:gap-4 flex-wrap min-w-0">
            <span className="font-display text-2xl sm:text-[34px] font-semibold tracking-tight text-ink leading-tight">
              {city}
            </span>
            <span className="text-xs font-medium text-ink rounded-full border border-ink/20 px-3 py-1">
              {region}
            </span>
          </span>
          <span className="flex items-center gap-5 shrink-0">
            <span className="hidden md:block text-sm text-ink/75 max-w-xs text-right leading-snug">
              {tagline}
            </span>
            <span
              aria-hidden="true"
              className={`w-11 h-11 rounded-full inline-flex items-center justify-center shrink-0 transition-colors ${
                isOpen ? 'bg-accent text-ink' : 'border border-ink/20 text-ink group-hover:bg-ink group-hover:text-cream group-hover:border-ink'
              }`}
            >
              {isOpen ? <Minus size={16} /> : <Plus size={16} />}
            </span>
          </span>
        </button>
      </h2>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`location-panel-${slug}`}
            role="region"
            aria-labelledby={`location-trigger-${slug}`}
            variants={clipWipe}
            initial="initial"
            animate="animate"
            exit="exit"
            className="overflow-hidden"
          >
            <div className="pb-8 sm:pb-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
              <p className="md:hidden text-base text-ink font-medium leading-snug">{tagline}</p>
              <p className="lg:col-span-7 text-[15px] sm:text-base text-ink/80 leading-relaxed">
                {intro}
              </p>
              <div className="lg:col-span-5">
                <ul className="space-y-3">
                  {previewPoints.map((point) => (
                    <li key={point.title} className="text-sm leading-relaxed">
                      <span className="font-semibold text-ink">{point.title}</span>
                      <span className="text-ink/75"> — {point.desc}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/locations/${slug}`}
                  className="mt-5 inline-flex items-center gap-2 rounded-full border border-ink/25 text-ink px-5 py-2.5 text-sm font-semibold transition-colors hover:border-ink hover:bg-ink/5"
                >
                  {city} page <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  )
}

export default function LocationsIndexPage() {
  const [openSlug, setOpenSlug] = useState(locations[0]?.slug ?? null)

  return (
    <div className="overflow-hidden">
      {/* Header — cream, asymmetric. Deliberately smaller than a full page
          hero, since the list below (not a hero statement) is the point of
          this page. Copy only states what's true: the studio is in
          Ahmedabad and delivery is remote-first — no implied local offices. */}
      <section className="bg-cream pt-32 sm:pt-36 pb-14 sm:pb-16">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-8">
          <nav aria-label="Breadcrumb" className="mb-10 sm:mb-14">
            <ol className="flex flex-wrap items-center gap-2 text-[13px] text-ink/75">
              <li><Link href="/" className="hover:text-ink underline-offset-4 hover:underline">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-ink font-medium">Locations</li>
            </ol>
          </nav>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end">
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7 font-display text-[40px] leading-[1.05] sm:text-6xl lg:text-[72px] font-semibold text-ink tracking-tight"
            >
              Remote-first delivery, from Ahmedabad.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 text-[15px] sm:text-base text-ink/80 leading-relaxed"
            >
              Our studio is in Ahmedabad and most of our delivery runs remotely. Open a city below for what businesses there usually ask us for, and the related work we&apos;ve shipped.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Directory — white; a bare divided list you expand in place, not a
          card grid. Clip-path reveal so switching cities reads as swapping
          content, not arriving. */}
      <section className="bg-bg py-12 sm:py-16 lg:py-20">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-8">
          <ul className="border-t border-border">
            {locations.map((location, i) => (
              <LocationRow
                key={location.slug}
                location={location}
                index={i}
                isOpen={openSlug === location.slug}
                onToggle={() => setOpenSlug(openSlug === location.slug ? null : location.slug)}
              />
            ))}
          </ul>
        </div>
      </section>

      {/* Closing CTA — cream-dim, sits right above the ink footer band. */}
      <section className="bg-cream-dim py-20 sm:py-24">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <h2 className="font-display text-3xl sm:text-5xl font-semibold text-ink tracking-tight leading-[1.08]">
              Not seeing your city?
            </h2>
            <p className="mt-4 text-[15px] sm:text-base text-ink/80 leading-relaxed max-w-xl">
              Our delivery process is remote-first — location within India has never been a constraint on the work.
            </p>
          </div>
          <div className="lg:col-span-4 lg:justify-self-end">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-ink px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-ink hover:text-cream"
            >
              Book a free discovery call <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
