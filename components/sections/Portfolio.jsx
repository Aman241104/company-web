'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion'

// Signature interaction (research/design-system-v2.md, design budget item 2):
// a horizontal, manually controlled case-study rail. Every card is art-
// directed on its own — its own accent field (loosely evoking that client's
// real brand/site, same accents as components/pages/WorkPage.jsx so the two
// pages agree), a real screenshot from public/, the real project name, and
// outlined tag pills laid over the photo. `layout` alternates where the
// screenshot sits so the rail reads as a set of individual pieces, not one
// template stamped six times.
//
// Metrics are only shown where the case study itself (app/work/[slug]) states
// one — no new numbers are introduced here. Accents are darkened where needed
// so white text on them clears WCAG AA (all >= 4.5:1).
const projects = [
  {
    name: 'The Silver Spoon',
    slug: 'silver-spoon',
    kind: 'Luxury silver gifting by ACJ',
    image: '/silverspoon-screenshot.png',
    tags: ['E-commerce', 'Headless Shopify'],
    metric: { value: '0.68s', label: 'LCP, down from 4.8s' },
    accent: '#5B6169',
    layout: 'image-top',
  },
  {
    name: 'ZingBliss Events',
    slug: 'zingbliss-events',
    kind: 'Luxury wedding & event production',
    image: '/zingbliss.png',
    tags: ['Website', 'Lead generation'],
    metric: { value: '99/100', label: 'mobile performance' },
    accent: '#7A2E3A',
    layout: 'image-bottom',
  },
  {
    name: 'SV Space Designs',
    slug: 'sv-space-designs',
    kind: 'Interior & turnkey studio, Ahmedabad',
    image: '/assets/sv-space-designs-live.jpg',
    tags: ['Website', 'Next.js'],
    metric: { value: '100/100', label: 'Lighthouse performance' },
    accent: '#9A5424',
    layout: 'image-top',
  },
  {
    name: 'Prihaan Spices & Agro',
    slug: 'prihaan-spices',
    kind: 'Spices & dry fruits storefront',
    image: '/assets/prihaan-spices-live.jpg',
    tags: ['E-commerce', 'WhatsApp checkout'],
    metric: { value: '252+', label: 'live product SKUs' },
    accent: '#9C3B2E',
    layout: 'image-bottom',
  },
  {
    name: 'Chahana Dental Studio',
    slug: 'chahana-dental',
    kind: 'Dental clinic & patient booking',
    image: '/chahana.png',
    tags: ['Website', 'Technical SEO'],
    metric: { value: '0.55s', label: 'mobile page load' },
    accent: '#2C6E6B',
    layout: 'image-top',
  },
  {
    name: 'Ares Business League',
    slug: 'ares-business-league',
    kind: 'Business networking league',
    image: '/assets/ares-business-league-live.jpg',
    tags: ['Web app', 'Member directory'],
    metric: null,
    accent: '#1E2A3A',
    layout: 'image-bottom',
  },
]

function TagPill({ label }) {
  return (
    <span className="px-2.5 py-1 rounded-full border border-white/70 bg-black/25 backdrop-blur-sm text-[11px] font-semibold text-white">
      {label}
    </span>
  )
}

function CaseCard({ project, index, total }) {
  const imageFirst = project.layout === 'image-top'

  const shot = (
    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/20">
      <Image
        src={project.image}
        alt={`${project.name} website, built by Mehta Technologies`}
        fill
        sizes="(max-width: 640px) 80vw, 460px"
        className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
      {/* light top scrim so the tag pills stay legible on bright screenshots */}
      <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/35 to-transparent pointer-events-none" />
      <div className="absolute top-3 left-3 right-3 flex flex-wrap gap-1.5">
        {project.tags.map((t) => (
          <TagPill key={t} label={t} />
        ))}
      </div>
      {project.metric && (
        // The card's accent field notches into the photo's corner, carrying
        // the real metric — legible on any screenshot, no heavy scrim needed.
        <div
          className="absolute bottom-0 left-0 max-w-[85%] rounded-tr-2xl pt-3 pr-5 pb-3 pl-4 text-white"
          style={{ backgroundColor: project.accent }}
        >
          <div className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-none">
            {project.metric.value}
          </div>
          <div className="mt-1 text-xs font-medium text-white/90">{project.metric.label}</div>
        </div>
      )}
    </div>
  )

  const copy = (
    <div className="flex items-end justify-between gap-4 px-1">
      <div className="min-w-0">
        <div className="text-[11px] font-mono uppercase tracking-wider text-white/80 mb-2">
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </div>
        <h3 className="text-2xl sm:text-[28px] font-bold text-white tracking-tight leading-tight">
          {project.name}
        </h3>
        <p className="mt-1 text-sm text-white/85">{project.kind}</p>
      </div>
      {/* The small circular arrow primitive — decorative here, the whole card is the link */}
      <span
        aria-hidden="true"
        className="shrink-0 w-11 h-11 rounded-full border border-white/50 text-white flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:text-ink"
      >
        <ArrowUpRight size={18} />
      </span>
    </div>
  )

  return (
    <Link
      href={`/work/${project.slug}`}
      data-rail-card
      aria-label={`${project.name} case study`}
      className="group snap-start shrink-0 w-[82vw] max-w-[380px] sm:w-[440px] sm:max-w-none lg:w-[480px] rounded-[28px] p-4 sm:p-5 flex flex-col gap-5 sm:gap-6 transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white"
      style={{ backgroundColor: project.accent }}
    >
      {imageFirst ? (
        <>
          {shot}
          {copy}
        </>
      ) : (
        <>
          <div className="pt-1">{copy}</div>
          {shot}
        </>
      )}
    </Link>
  )
}

export default function Portfolio() {
  const railRef = useRef(null)
  const reduced = usePrefersReducedMotion()
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const updateEdges = useCallback(() => {
    const el = railRef.current
    if (!el) return
    setAtStart(el.scrollLeft <= 4)
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4)
  }, [])

  useEffect(() => {
    const el = railRef.current
    if (!el) return
    updateEdges()
    el.addEventListener('scroll', updateEdges, { passive: true })
    window.addEventListener('resize', updateEdges)
    return () => {
      el.removeEventListener('scroll', updateEdges)
      window.removeEventListener('resize', updateEdges)
    }
  }, [updateEdges])

  const scrollRail = (dir) => {
    const el = railRef.current
    if (!el) return
    const card = el.querySelector('[data-rail-card]')
    const gap = parseFloat(getComputedStyle(el).columnGap) || 20
    const step = (card?.offsetWidth || 380) + gap
    el.scrollBy({ left: dir * step, behavior: reduced ? 'auto' : 'smooth' })
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      scrollRail(1)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      scrollRail(-1)
    }
  }

  const arrowBtn =
    'w-11 h-11 rounded-full border border-ink/20 bg-white text-ink flex items-center justify-center transition-all hover:bg-ink hover:text-white hover:border-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:opacity-30 disabled:pointer-events-none'

  // Rail-specific reveal: cards slide in from the right (the direction the
  // rail travels), distinct from the spring pop-in used by card grids.
  const cardReveal = reduced
    ? { hidden: { opacity: 0 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, x: 48 },
        show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
      }

  // Left inset of the rail lines up with the 1360px content container.
  const railInset = 'max(1.25rem, calc((100vw - 1360px) / 2 + 2rem))'

  return (
    <section id="work" className="relative bg-white py-16 sm:py-24 md:py-32 overflow-hidden">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-end mb-10 sm:mb-14"
        >
          <div className="md:col-span-7">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-ink/70 mb-3 inline-block">
              Selected work
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight leading-[1.08]">
              Real businesses, each with a site built around its own brand.
            </h2>
          </div>
          <div className="md:col-span-5 flex items-center justify-between md:justify-end gap-3">
            <Link
              href="/work"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-semibold text-ink border border-ink/20 hover:border-ink/40 hover:bg-ink/[0.04] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              All projects <ArrowRight size={13} />
            </Link>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous case study"
                aria-controls="case-study-rail"
                className={arrowBtn}
                onClick={() => scrollRail(-1)}
                disabled={atStart}
              >
                <ArrowLeft size={17} />
              </button>
              <button
                type="button"
                aria-label="Next case study"
                aria-controls="case-study-rail"
                className={arrowBtn}
                onClick={() => scrollRail(1)}
                disabled={atEnd}
              >
                <ArrowRight size={17} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        id="case-study-rail"
        ref={railRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Case studies. Use left and right arrow keys to scroll."
        tabIndex={0}
        onKeyDown={onKeyDown}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: reduced ? 0 : 0.09 } } }}
        className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory overscroll-x-contain pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-inset"
        style={{ paddingLeft: railInset, paddingRight: railInset, scrollPaddingLeft: railInset }}
      >
        {projects.map((p, i) => (
          <motion.div key={p.slug} variants={cardReveal} className="flex">
            <CaseCard project={p} index={i} total={projects.length} />
          </motion.div>
        ))}

        {/* End of rail: an honest hand-off to the full list, not a fake "+N more" count */}
        <motion.div variants={cardReveal} className="flex">
          <Link
            href="/work"
            data-rail-card
            className="group snap-start shrink-0 w-[70vw] max-w-[300px] sm:w-[300px] rounded-[28px] border border-ink/15 bg-cream p-6 sm:p-7 flex flex-col justify-between gap-10 transition-colors hover:border-ink/35 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            <p className="text-2xl font-bold text-ink tracking-tight leading-snug">
              More projects, from boutiques to B2B catalogs.
            </p>
            <span className="inline-flex items-center gap-3 text-sm font-semibold text-ink">
              <span className="w-11 h-11 rounded-full bg-accent text-white flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight size={18} />
              </span>
              See all work
            </span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
