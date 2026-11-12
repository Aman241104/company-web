import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { chapters } from '@/lib/services'
import { DisciplinePage, HubPage } from '@/components/site/ServicePages'

const base = 'https://mehtatechnologies.com'
const dev = chapters.find((c) => c.slug === 'development')!
const hubs = ['digital-marketing', 'designing']

function resolve(slug: string) {
  const c = chapters.find((x) => x.slug === slug)
  if (c) return { chapter: c, d: null }
  const d = dev.disciplines.find((x) => x.slug === slug)
  return d ? { chapter: dev, d } : null
}

export function generateStaticParams() {
  return [...chapters.filter((c) => c.slug !== 'development').map((c) => c.slug), ...dev.disciplines.map((d) => d.slug)].map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const r = resolve((await params).slug)
  if (!r) return { title: 'Service not found' }
  const title = r.d ? r.d.title : r.chapter.name
  const desc = r.d ? r.d.desc : r.chapter.intro
  const url = `${base}/services/${(await params).slug}`
  return { title: `${title} Services in Ahmedabad`, description: desc, alternates: { canonical: url }, openGraph: { url, title: `${title} | Mehta Technologies`, description: desc, images: [{ url: '/og.png', width: 1200, height: 630 }] } }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug
  const r = resolve(slug)
  if (!r || slug === 'development') notFound()
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: r.d ? r.d.title : r.chapter.name,
    description: r.d ? r.d.desc : r.chapter.intro,
    areaServed: { '@type': 'Country', name: 'India' },
    provider: { '@type': 'ProfessionalService', name: 'Mehta Technologies', url: base },
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {hubs.includes(slug) ? <HubPage chapter={r.chapter} /> : <DisciplinePage chapter={r.chapter} d={r.d} />}
    </>
  )
}
