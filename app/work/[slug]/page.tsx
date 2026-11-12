import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'

import { caseStudiesData, caseAccents as accents } from '@/lib/caseStudies'

const panelBg = (accent: string) => `color-mix(in srgb, ${accent} 82%, #000)`

export async function generateStaticParams() {
  return Object.keys(caseStudiesData).map((slug) => ({ slug }))
}

const base = 'https://mehtatechnologies.com'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const study = caseStudiesData[slug]
  if (!study) return { title: 'Case Study Not Found' }

  return {
    title: `${study.name} — Case Study`,
    description: study.summary,
    alternates: { canonical: `${base}/work/${study.slug}` },
    openGraph: {
      url: `${base}/work/${study.slug}`,
      title: `${study.name} — Case Study`,
      description: study.summary,
      images: [{ url: study.heroImage || '/og.png' }],
    },
  }
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const study = caseStudiesData[slug]
  if (!study) notFound()

  const accent = accents[study.slug] ?? '#0A1124'
  const inProgress = study.status === 'in-progress'

  // Next case study, in the same order as the data above (wraps around).
  const slugs = Object.keys(caseStudiesData)
  const next = caseStudiesData[slugs[(slugs.indexOf(study.slug) + 1) % slugs.length]]
  const nextAccent = accents[next.slug] ?? '#0A1124'

  const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2'

  return (
    <>
    <Navbar />
    <main id="main-content" tabIndex={-1} className="home-light bg-bg min-h-screen">

      {/* Hero — cream, asymmetric: headline left, project facts right */}
      <section className="bg-cream pt-32 sm:pt-40 pb-12 sm:pb-16">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-8">
          <Link
            href="/work"
            className={`inline-flex items-center gap-2 text-xs font-semibold text-ink/70 hover:text-ink transition-colors mb-10 rounded-sm ${focusRing}`}
          >
            <ArrowLeft size={14} aria-hidden="true" /> Back to All Case Studies
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-6">
                <span aria-hidden="true" className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: accent }} />
                <span className="text-sm font-bold text-ink tracking-tight">{study.name}</span>
                <span className="px-2.5 py-0.5 rounded-full border border-ink/15 text-[11px] font-medium text-ink/75">
                  {inProgress ? 'In development' : 'Case study'}
                </span>
              </div>
              <h1 className="font-display text-[34px] sm:text-5xl lg:text-6xl font-extrabold text-ink tracking-tight leading-[1.08] mb-6">
                {study.headline}
              </h1>
              <p className="text-base sm:text-lg text-ink-soft leading-relaxed max-w-2xl">
                {study.summary}
              </p>
            </div>

            <div className="lg:col-span-4">
              <dl className="border-t border-border mb-8">
                {[
                  ['Client', study.client],
                  ['Category', study.category],
                  ['Year', study.year],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-6 py-3 border-b border-border">
                    <dt className="text-[11px] font-mono uppercase tracking-wider text-ink/55 shrink-0">{k}</dt>
                    <dd className="text-sm font-semibold text-ink text-right">{v}</dd>
                  </div>
                ))}
              </dl>
              {study.liveUrl && !inProgress && (
                <a
                  href={study.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white font-semibold px-7 py-3.5 text-sm hover:bg-accent-dim transition-colors ${focusRing}`}
                >
                  Visit live production site <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Art-directed panel — this project's own accent, real screenshot,
          real metrics set directly onto the colour field. */}
      <section className="bg-cream pb-16 sm:pb-24">
        <div className="max-w-[1360px] mx-auto px-3 sm:px-6 md:px-8">
          <div
            className="rounded-[28px] sm:rounded-[36px] p-3 sm:p-8 lg:p-12 text-white"
            style={{ background: panelBg(accent) }}
          >
            <div
              className={`relative aspect-[4/3] sm:aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden ${
                study.heroImageFit === 'contain' ? 'bg-cream-dim p-6 sm:p-14' : ''
              }`}
              style={study.heroImage ? undefined : { backgroundColor: accent }}
            >
              {study.heroImage ? (
                <Image
                  src={study.heroImage}
                  alt={`${study.name} — live site screenshot`}
                  fill
                  loading="eager"
                  fetchPriority="high"
                  sizes="(max-width: 1360px) 100vw, 1300px"
                  className={study.heroImageFit === 'contain' ? 'object-contain object-center' : 'object-cover object-top'}
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-start justify-end gap-2 p-6 sm:p-12">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-white/80">Build in progress</div>
                  <div className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight max-w-lg leading-tight">
                    This case study will be updated with a live preview and real results once the project ships.
                  </div>
                </div>
              )}
            </div>

            {study.metrics.length > 0 && (
              <dl className={`grid grid-cols-1 ${study.metrics.length > 1 ? 'sm:grid-cols-2' : ''} ${study.metrics.length > 2 ? 'lg:grid-cols-3' : ''} gap-x-10 gap-y-8 px-3 sm:px-0 pt-8 sm:pt-12 pb-4 sm:pb-0`}>
                {study.metrics.map((m) => (
                  <div key={m.label} className="flex flex-col border-t border-white/25 pt-5">
                    <dt className="order-2 text-sm font-semibold text-white">{m.label}</dt>
                    <dd className="order-1 font-display text-4xl sm:text-5xl font-extrabold tracking-tight leading-none mb-3">{m.value}</dd>
                    <dd className="order-3 text-sm text-white/80 mt-0.5">{m.detail}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </div>
      </section>

      {/* Narrative — white, editorial rows */}
      <section className="bg-bg py-16 sm:py-24">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-8">
          {[
            ['01', 'The challenge', study.challenge],
            ['02', 'The engineering solution', study.solution],
          ].map(([num, title, body]) => (
            <div key={num} className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 py-10 sm:py-12 border-t border-border first:border-t-0 first:pt-0">
              <div className="lg:col-span-4 flex items-baseline gap-4">
                <span className="text-xs font-mono text-ink/55">{num}</span>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">{title}</h2>
              </div>
              <p className="lg:col-span-8 text-lg sm:text-xl text-ink/80 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stack — cream-dim */}
      <section className="bg-cream-dim py-14 sm:py-20">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          <h2 className="lg:col-span-4 font-display text-xl sm:text-2xl font-extrabold text-ink tracking-tight">
            Production architecture &amp; stack
          </h2>
          <ul className="lg:col-span-8 flex flex-wrap gap-2">
            {study.architecture.map((item) => (
              <li key={item} className="px-3.5 py-1.5 rounded-full border border-ink/20 bg-white/50 text-sm font-medium text-ink">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Client quote — only when a real one exists */}
      {study.quote && (
        <section className="bg-bg py-16 sm:py-24">
          <figure className="max-w-3xl mx-auto px-5 sm:px-6 md:px-8">
            <blockquote className="font-display text-2xl sm:text-3xl font-bold text-ink leading-snug tracking-tight mb-6">
              &ldquo;{study.quote.text}&rdquo;
            </blockquote>
            <figcaption className="flex items-center gap-3">
              <span aria-hidden="true" className="w-6 h-px" style={{ backgroundColor: accent }} />
              <span className="text-sm font-bold text-ink">{study.quote.author}</span>
              <span className="text-sm text-ink-soft">{study.quote.role}</span>
            </figcaption>
          </figure>
        </section>
      )}

      {/* Next case study — white */}
      <section className="bg-bg border-t border-border">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-8 py-12 sm:py-16">
          <Link
            href={`/work/${next.slug}`}
            className={`group grid grid-cols-[auto_1fr_auto] items-center gap-5 sm:gap-8 rounded-2xl ${focusRing}`}
          >
            <span
              className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0"
              style={{ backgroundColor: nextAccent }}
            >
              {next.heroImage && (
                <Image
                  src={next.heroImage}
                  alt=""
                  fill
                  sizes="112px"
                  className={`${next.heroImageFit === 'contain' ? 'object-contain p-2' : 'object-cover object-top'} group-hover:scale-105 transition-transform duration-500`}
                />
              )}
            </span>
            <span className="min-w-0">
              <span className="block text-[11px] font-mono uppercase tracking-wider text-ink/55 mb-1.5">Next case study</span>
              <span className="block font-display text-2xl sm:text-4xl font-extrabold text-ink tracking-tight leading-tight truncate">
                {next.name}
              </span>
              <span className="block text-sm text-ink-soft mt-1 truncate">{next.category}</span>
            </span>
            <span
              aria-hidden="true"
              className="w-11 h-11 sm:w-14 sm:h-14 rounded-full border border-ink/20 text-ink flex items-center justify-center group-hover:bg-night group-hover:text-white group-hover:border-ink transition-colors"
            >
              <ArrowRight size={18} />
            </span>
          </Link>
        </div>
      </section>

      {/* Closing — ink band */}
      <section className="bg-night text-white">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-8 py-16 sm:py-24 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.08] mb-4">
              Ready for similar measurable outcomes?
            </h2>
            <p className="text-base sm:text-lg text-white/75">
              Let us engineer a high-performance system for your roadmap.
            </p>
          </div>
          <Link
            href="/contact"
            className="self-start lg:self-auto inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white font-semibold px-7 py-3.5 text-sm hover:bg-accent-dim transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-night"
          >
            Start your project <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
    </>
  )
}
