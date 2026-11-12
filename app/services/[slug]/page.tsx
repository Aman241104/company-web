import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import PageHero from '@/components/home/PageHero'
import { HowWeWork, ContactSection } from '@/components/home/HomeSections'
import { StartProjectButton } from '@/components/home/ui'
import { GhostLink, Eyebrow, wrap } from '@/components/home/primitives'
import { allDisciplines, findDiscipline } from '@/lib/services'
import { caseStudiesData } from '@/lib/caseStudies'

const base = 'https://mehtatechnologies.com'

export function generateStaticParams() {
  return allDisciplines.map((d) => ({ slug: d.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const d = findDiscipline((await params).slug)
  if (!d) return { title: 'Service Not Found' }
  return {
    title: `${d.title} — ${d.chapter.name}`,
    description: d.desc,
    alternates: { canonical: `${base}/services/${d.slug}` },
    openGraph: { url: `${base}/services/${d.slug}`, title: `${d.title} | Mehta Technologies`, description: d.desc, images: [{ url: '/og.png', width: 1200, height: 630 }] },
  }
}

export default async function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const d = findDiscipline((await params).slug)
  if (!d) notFound()
  const study = d.caseStudy ? caseStudiesData[d.caseStudy] : null
  const siblings = d.chapter.disciplines.filter((x) => x.slug !== d.slug)

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: d.title,
      description: d.desc,
      serviceType: d.chapter.name,
      areaServed: { '@type': 'Country', name: 'India' },
      provider: { '@type': 'ProfessionalService', name: 'Mehta Technologies', url: base },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: base },
        { '@type': 'ListItem', position: 2, name: 'Services', item: `${base}/services` },
        { '@type': 'ListItem', position: 3, name: d.title, item: `${base}/services/${d.slug}` },
      ],
    },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="bg-bg relative overflow-x-hidden w-full max-w-[100vw]">
        <PageHero eyebrow={`${d.chapter.num} / ${d.chapter.name}`} title={d.title} intro={d.desc}>
          <p className="mt-3 font-display text-lg font-semibold text-accent">{d.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <StartProjectButton service={d.title}>Get a free quote</StartProjectButton>
            <GhostLink href="/services">All services</GhostLink>
          </div>
          {(d.pricing || d.timeline) && (
            <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-ink/10 pt-6">
              {d.pricing && (
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-widest text-ink/55">Investment</dt>
                  <dd className="font-display text-2xl font-extrabold text-ink">{d.pricing}</dd>
                </div>
              )}
              {d.timeline && (
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-widest text-ink/55">Timeline</dt>
                  <dd className="font-display text-2xl font-extrabold text-ink">{d.timeline}</dd>
                </div>
              )}
            </dl>
          )}
        </PageHero>

        <section className="py-16 sm:py-24">
          <div className={`${wrap} grid grid-cols-1 lg:grid-cols-12 gap-10`}>
            <div className="lg:col-span-7">
              <Eyebrow className="mb-4">What&apos;s included</Eyebrow>
              <ul className="border-t border-ink/10">
                {(d.features ?? d.bullets).map((f, i) => (
                  <li key={f} className="flex gap-4 py-4 border-b border-ink/10 text-ink">
                    <span className="font-mono text-xs text-accent mt-1">{String(i + 1).padStart(2, '0')}</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <aside className="lg:col-span-5 space-y-6">
              {d.deliverables && (
                <div className="rounded-2xl border border-ink/10 bg-cream p-6">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-ink/55 mb-3">Deliverables</p>
                  <ul className="space-y-2">
                    {d.deliverables.map((x) => (
                      <li key={x} className="flex gap-2 text-sm text-ink">
                        <span aria-hidden="true" className="mt-2 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                        {x}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {d.tags && (
                <ul className="flex flex-wrap gap-2" aria-label="Technologies">
                  {d.tags.map((t) => (
                    <li key={t} className="text-xs px-3 py-1.5 rounded-full border border-ink/15 text-ink/75">{t}</li>
                  ))}
                </ul>
              )}
              {study && (
                <Link href={`/work/${study.slug}`} className="group block rounded-2xl border border-ink/10 overflow-hidden bg-bg">
                  {study.heroImage && (
                    <div className="relative aspect-[16/9] bg-cream-dim">
                      <Image src={study.heroImage} alt={`${study.name} — case study`} fill sizes="(max-width:1024px) 100vw, 40vw" className="object-cover object-top" />
                    </div>
                  )}
                  <div className="p-5">
                    <p className="font-mono text-[11px] uppercase tracking-widest text-accent">Related case study</p>
                    <p className="font-display text-lg font-bold text-ink mt-1 group-hover:text-accent">{study.name} →</p>
                    {study.metrics[0] && (
                      <p className="text-sm text-ink/70 mt-1">
                        <strong className="text-ink">{study.metrics[0].value}</strong> {study.metrics[0].label}
                      </p>
                    )}
                  </div>
                </Link>
              )}
            </aside>
          </div>
        </section>

        <HowWeWork />

        <section className="py-16 sm:py-20 bg-cream">
          <div className={wrap}>
            <Eyebrow className="mb-4">More in {d.chapter.name}</Eyebrow>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {siblings.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="block h-full rounded-2xl bg-bg border border-ink/10 p-5 hover:border-accent transition-colors">
                    <p className="font-display font-bold text-ink">{s.title}</p>
                    <p className="text-sm text-ink/65 mt-1">{s.tagline}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <ContactSection />
        <Footer />
      </main>
    </>
  )
}
