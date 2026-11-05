'use client'
import Link from 'next/link'
import { motion, MotionConfig } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import LogoLoop from '@/components/ui/reactbits/LogoLoop'
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion'

// Testimonials — Design System v2: one real testimonial with name + title,
// plus a marquee of real client names.
//
// NO FABRICATION (research/client-notes.md). There are currently no
// verified client quotes anywhere in the codebase, so `testimonials` is
// intentionally empty and the quote block does not render. To add one, it
// must be a real, client-approved quote:
//   { quote: '…', name: 'Full Name', role: 'Title', business: 'Company' }
// Only the first entry is shown (single-testimonial pattern) — pick the best.
const testimonials = []

// Real client/project names we have shipped for, taken from the project
// list in components/pages/WorkPage.jsx (each has a live site/case study
// there). There are no client logo files in /public, so names are set as
// type rather than inventing logo artwork. Vibo ERP is omitted — it's
// Mehta's own product, not a client.
const clients = [
  'SV Space Designs',
  'Prihaan Spices & Agro',
  'The Silver Spoon / Argentum',
  'CMJ Events',
  'Chahana Dental Studio',
  'Destination Anywhere',
  'ZingBliss Events',
  'Ares Business League',
  'Naam Transfer',
  'NexSphere Global',
  'Jukebox Media',
  'Rising Rechargeable',
  'FGP Industries',
  'Aangan Boutique',
  'SI Decor & Interiors',
  'Jade Travels',
]

function ClientName({ name }) {
  return (
    <span className="flex items-center gap-8 font-display text-xl sm:text-2xl md:text-[1.75rem] font-semibold tracking-tight text-ink whitespace-nowrap">
      {name}
      <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-accent" />
    </span>
  )
}

export default function Testimonials() {
  const reduced = usePrefersReducedMotion()
  const featured = testimonials[0]

  return (
    <MotionConfig reducedMotion={reduced ? 'always' : 'never'}>
      <section aria-labelledby="clients-heading" className="relative bg-white py-16 sm:py-24 md:py-28 overflow-hidden">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 sm:mb-14"
          >
            <div className="max-w-xl">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-ink/70 mb-3 inline-block">
                Clients
              </span>
              <h2 id="clients-heading" className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink tracking-tight leading-[1.08]">
                Businesses we&apos;ve built for
              </h2>
            </div>
            <Link
              href="/work"
              className="group/cta inline-flex items-center gap-3 self-start md:self-auto text-sm font-semibold text-ink rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              See the work
              <span className="w-10 h-10 rounded-full border border-ink flex items-center justify-center transition-colors group-hover/cta:bg-ink group-hover/cta:text-cream">
                <ArrowUpRight size={16} aria-hidden="true" />
              </span>
            </Link>
          </motion.div>

          {featured && (
            <motion.figure
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-120px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 py-10 sm:py-14 mb-10 sm:mb-14 border-y border-border"
            >
              <span aria-hidden="true" className="lg:col-span-1 font-display text-7xl sm:text-8xl leading-[0.7] text-accent select-none">
                &ldquo;
              </span>
              <div className="lg:col-span-11">
                <blockquote className="font-display text-2xl sm:text-3xl lg:text-[2.5rem] font-medium text-ink tracking-tight leading-[1.2] mb-8 max-w-4xl">
                  {featured.quote}
                </blockquote>
                <figcaption className="text-sm text-ink/75">
                  <span className="font-semibold text-ink">{featured.name}</span>
                  {featured.role && <>, {featured.role}</>}
                  {featured.business && <> · {featured.business}</>}
                </figcaption>
              </div>
            </motion.figure>
          )}
        </div>

        {/* Marquee keeps the existing LogoLoop mechanism. LogoLoop's own
            rAF loop ignores prefers-reduced-motion, so reduced-motion users
            get a static wrapped list instead of the moving track. */}
        {reduced ? (
          <ul role="list" className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-8 flex flex-wrap gap-x-8 gap-y-4">
            {clients.map((name) => (
              <li key={name}><ClientName name={name} /></li>
            ))}
          </ul>
        ) : (
          <div className="border-y border-border py-6 sm:py-8">
            <LogoLoop
              logos={clients.map((name) => ({ node: <ClientName name={name} /> }))}
              logoHeight={40}
              speed={36}
              direction="left"
              gap={32}
              fadeOut
              ariaLabel="Clients we've built websites for"
            />
          </div>
        )}
      </section>
    </MotionConfig>
  )
}
