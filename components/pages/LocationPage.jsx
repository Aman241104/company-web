'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { cardGridContainer, cardSpringItem } from '@/lib/motionVariants'

// Honest-SEO rules for location pages (see research/client-notes.md and the
// workspace's no-doorway-pages rule): these pages are linked from the
// footer and /locations, and they never claim an office or local presence
// we don't have. The studio is in Ahmedabad; every other city is served
// remotely, and the page says so plainly. Case studies are labelled as
// *related* work — not presented as clients based in that city.

// Real screenshots already in /public, same files and art-direction tints
// WorkPage.jsx uses for these projects. Only slugs referenced from
// lib/locations.ts are listed; anything missing falls back to a text card.
const caseStudyMedia = {
  'sv-space-designs': { image: '/assets/sv-space-designs-live.jpg', accent: '#B5652D' },
  'si-decor': { image: '/interior.png', accent: '#9C5A34' },
  'fgp-industries': { image: '/assets/fgp-industries-live.jpg', accent: '#3E5064' },
  'rising-rechargeable': { image: '/assets/rising-rechargeable-live.jpg', accent: '#2F6F4E' },
  'chahana-dental': { image: '/chahana.png', accent: '#2C6E6B' },
  'vibo-erp': { image: '/assets/saas_hero_mockup.png', accent: '#0A1124', fit: 'contain' },
  'nexsphere-global': { image: '/nextsphere.png', accent: '#24425C' },
}

const HQ_CITY = 'Ahmedabad'

const primaryPill =
  'inline-flex items-center justify-center gap-2 rounded-full bg-accent text-ink px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-ink hover:text-cream'
const secondaryPill =
  'inline-flex items-center justify-center gap-2 rounded-full border border-ink/25 text-ink px-6 py-3.5 text-sm font-semibold transition-colors hover:border-ink hover:bg-ink/5'

// Section-type reveal presets: the hero settles in once on load; list rows
// rise in a slower stagger; case-study cards use the shared spring pop-in.
const heroReveal = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
}
const listContainer = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
const listItem = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export default function LocationPage({ location }) {
  const { city, tagline, intro, focusPoints, caseStudies, faqs } = location
  const isHq = city === HQ_CITY

  return (
    <div className="overflow-hidden">
      {/* Hero — cream, asymmetric: headline block left, intro + facts +
          actions as an independent block right. */}
      <section className="bg-cream pt-32 sm:pt-36 pb-16 sm:pb-20 lg:pb-24">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-8">
          <nav aria-label="Breadcrumb" className="mb-10 sm:mb-14">
            <ol className="flex flex-wrap items-center gap-2 text-[13px] text-ink/75">
              <li><Link href="/" className="hover:text-ink underline-offset-4 hover:underline">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/locations" className="hover:text-ink underline-offset-4 hover:underline">Locations</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-ink font-medium">{city}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end">
            <motion.div
              {...heroReveal}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7"
            >
              {/* Single-color headline. "for businesses in X", not "agency
                  in X": only Ahmedabad is where the studio actually is. */}
              <h1 className="font-display text-[40px] leading-[1.05] sm:text-6xl lg:text-[76px] font-semibold text-ink tracking-tight">
                {isHq ? `Website development agency in ${city}.` : `Website development for businesses in ${city}.`}
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-ink/80 leading-snug max-w-xl">{tagline}</p>
            </motion.div>

            <motion.div
              {...heroReveal}
              transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5"
            >
              <p className="text-[15px] sm:text-base text-ink/80 leading-relaxed">{intro}</p>

              <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-border pt-6 text-sm">
                <div>
                  <dt className="text-ink/70">Studio</dt>
                  <dd className="font-semibold text-ink">Ahmedabad, Gujarat</dd>
                </div>
                <div>
                  <dt className="text-ink/70">Delivery</dt>
                  <dd className="font-semibold text-ink">{isHq ? 'Local & remote' : 'Remote-first'}</dd>
                </div>
              </dl>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link href="/contact" className={primaryPill}>
                  Book a free discovery call <ArrowRight size={15} aria-hidden="true" />
                </Link>
                <Link href="/work" className={secondaryPill}>
                  See our work
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Focus points — white, a numbered editorial list, not a card grid. */}
      <section className="bg-bg py-20 sm:py-24 lg:py-28">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          <div className="lg:col-span-4">
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-ink tracking-tight leading-[1.1] lg:sticky lg:top-28">
              What we focus on for {city} businesses
            </h2>
          </div>
          <motion.ol
            variants={listContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="lg:col-span-8 border-t border-border"
          >
            {focusPoints.map((point, i) => (
              <motion.li
                key={point.title}
                variants={listItem}
                className="grid grid-cols-[auto_1fr] gap-x-5 sm:gap-x-8 py-7 sm:py-8 border-b border-border"
              >
                <span className="font-mono text-sm text-ink/70 pt-1 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-ink tracking-tight">{point.title}</h3>
                  <p className="mt-2 text-[15px] sm:text-base text-ink/80 leading-relaxed max-w-2xl">{point.desc}</p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </section>

      {/* Related work — cream-dim, real screenshots art-directed per project. */}
      {caseStudies.length > 0 && (
        <section className="bg-cream-dim py-20 sm:py-24 lg:py-28">
          <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 sm:mb-12">
              <div className="max-w-xl">
                <h2 className="font-display text-3xl sm:text-4xl font-semibold text-ink tracking-tight leading-[1.1]">
                  Related work
                </h2>
                <p className="mt-3 text-[15px] text-ink/80 leading-relaxed">
                  Projects we&apos;ve shipped that are closest to what {city} businesses ask us for
                  {isHq ? '.' : ' — not necessarily clients based there.'}
                </p>
              </div>
              <Link href="/work" className={`${secondaryPill} self-start sm:self-auto`}>
                All projects
              </Link>
            </div>

            <motion.ul
              variants={cardGridContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6"
            >
              {caseStudies.map((cs) => {
                const media = caseStudyMedia[cs.slug]
                return (
                  <motion.li key={cs.slug} variants={cardSpringItem}>
                    <Link
                      href={`/work/${cs.slug}`}
                      className="group block h-full rounded-[28px] overflow-hidden bg-bg border border-border transition-transform duration-300 hover:-translate-y-1"
                    >
                      {media && (
                        <div className="relative aspect-[16/10] overflow-hidden" style={{ backgroundColor: media.accent }}>
                          <Image
                            src={media.image}
                            alt={`${cs.name} website screenshot`}
                            fill
                            sizes="(min-width: 768px) 50vw, 100vw"
                            className={`${media.fit === 'contain' ? 'object-contain p-6' : 'object-cover object-top'} transition-transform duration-500 group-hover:scale-[1.03]`}
                          />
                        </div>
                      )}
                      <div className="flex items-center justify-between gap-4 p-6 sm:p-7">
                        <div className="min-w-0">
                          <span className="inline-block rounded-full border border-ink/20 px-3 py-1 text-xs font-medium text-ink">
                            {cs.category}
                          </span>
                          <h3 className="mt-3 text-xl font-semibold text-ink tracking-tight">{cs.name}</h3>
                        </div>
                        <span
                          aria-hidden="true"
                          className="w-11 h-11 shrink-0 rounded-full border border-ink/20 inline-flex items-center justify-center text-ink transition-colors group-hover:bg-accent group-hover:border-accent"
                        >
                          <ArrowUpRight size={17} />
                        </span>
                      </div>
                    </Link>
                  </motion.li>
                )
              })}
            </motion.ul>
          </div>
        </section>
      )}

      {/* FAQs — white; content mirrors the FAQPage schema in the route file. */}
      <section className="bg-bg py-20 sm:py-24 lg:py-28">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          <h2 className="lg:col-span-4 font-display text-3xl sm:text-4xl font-semibold text-ink tracking-tight leading-[1.1]">
            Common questions
          </h2>
          <dl className="lg:col-span-8 border-t border-border">
            {faqs.map((faq) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5 }}
                className="py-7 border-b border-border"
              >
                <dt className="text-lg font-semibold text-ink tracking-tight">{faq.question}</dt>
                <dd className="mt-2 text-[15px] sm:text-base text-ink/80 leading-relaxed max-w-2xl">{faq.answer}</dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </section>

      {/* Closing CTA — cream, sits right above the ink footer band. */}
      <section className="bg-cream py-20 sm:py-24">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <h2 className="font-display text-3xl sm:text-5xl font-semibold text-ink tracking-tight leading-[1.08]">
              Ready to talk about your {city} project?
            </h2>
            <p className="mt-4 text-[15px] sm:text-base text-ink/80 leading-relaxed max-w-xl">
              Book a free discovery call and we&apos;ll scope it honestly — including telling you if you don&apos;t need everything you think you do.
            </p>
          </div>
          <div className="lg:col-span-4 lg:justify-self-end">
            <Link href="/contact" className={primaryPill}>
              Book a free discovery call <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
