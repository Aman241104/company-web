import type { MetadataRoute } from 'next'
import { locations } from '@/lib/locations'
import { caseStudiesData } from '@/lib/caseStudies'
import { allDisciplines, chapters } from '@/lib/services'

const base = 'https://mehtatechnologies.com'

const caseStudySlugs = Object.keys(caseStudiesData)

export default function sitemap(): MetadataRoute.Sitemap {
  const caseStudyEntries: MetadataRoute.Sitemap = caseStudySlugs.map((slug) => ({
    url: `${base}/work/${slug}`,
    lastModified: '2026-08-25',
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const svcPath = (c: string, d: string) => (c === 'development' ? `/services/${d}` : c === 'blockchain-web3' ? '/services/blockchain-web3' : `/services/${c}/${d}`)
  const servicePaths = new Set<string>([
    '/how-we-work', '/team', '/vibo-erp', '/cookie-policy', '/disclaimer', '/refund-policy',
    ...chapters.filter((c) => c.slug !== 'development').map((c) => `/services/${c.slug}`),
    ...allDisciplines.map((d) => svcPath(d.chapter.slug, d.slug)),
  ])
  const serviceEntries: MetadataRoute.Sitemap = [...servicePaths].map((p) => ({ url: `${base}${p}`, lastModified: '2026-11-12', changeFrequency: 'monthly' as const, priority: 0.8 }))

  const locationEntries: MetadataRoute.Sitemap = locations.map((loc) => ({
    url: `${base}/locations/${loc.slug}`,
    lastModified: '2026-08-31',
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [
    { url: base,                            lastModified: '2026-08-25', changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/services`,              lastModified: '2026-08-25', changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/solutions`,             lastModified: '2026-08-27', changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/work`,                  lastModified: '2026-08-25', changeFrequency: 'weekly',  priority: 0.9 },
    ...serviceEntries,
    ...caseStudyEntries,
    { url: `${base}/locations`,             lastModified: '2026-08-31', changeFrequency: 'monthly', priority: 0.8 },
    ...locationEntries,
    { url: `${base}/labs`,                  lastModified: '2026-08-25', changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/status`,                lastModified: '2026-08-25', changeFrequency: 'daily',   priority: 0.7 },
    { url: `${base}/about`,                 lastModified: '2026-08-25', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/contact`,               lastModified: '2026-08-25', changeFrequency: 'yearly',  priority: 0.8 },
    { url: `${base}/privacy`,               lastModified: '2026-08-25', changeFrequency: 'yearly',  priority: 0.5 },
    { url: `${base}/terms`,                 lastModified: '2026-08-25', changeFrequency: 'yearly',  priority: 0.5 },
  ]
}
