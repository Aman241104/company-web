import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { chapters } from '@/lib/services'
import { SubPage } from '@/components/site/ServicePages'

const base = 'https://mehtatechnologies.com'
const hubs = ['digital-marketing', 'designing']

function resolve(slug: string, sub: string) {
  if (!hubs.includes(slug)) return null
  const chapter = chapters.find((c) => c.slug === slug)!
  const d = chapter.disciplines.find((x) => x.slug === sub)
  return d ? { chapter, d } : null
}

export function generateStaticParams() {
  return hubs.flatMap((slug) => chapters.find((c) => c.slug === slug)!.disciplines.map((d) => ({ slug, sub: d.slug })))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; sub: string }> }): Promise<Metadata> {
  const p = await params
  const r = resolve(p.slug, p.sub)
  if (!r) return { title: 'Service not found' }
  const url = `${base}/services/${p.slug}/${p.sub}`
  return { title: `${r.d.title} — ${r.chapter.name}`, description: r.d.desc, alternates: { canonical: url }, openGraph: { url, title: `${r.d.title} | Mehta Technologies`, description: r.d.desc, images: [{ url: '/og.png', width: 1200, height: 630 }] } }
}

export default async function Page({ params }: { params: Promise<{ slug: string; sub: string }> }) {
  const p = await params
  const r = resolve(p.slug, p.sub)
  if (!r) notFound()
  return <SubPage chapter={r.chapter} d={r.d} />
}
