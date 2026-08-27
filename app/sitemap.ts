import type { MetadataRoute } from 'next'

const base = 'https://mehtatechnologies.com'

const caseStudySlugs = [
  'sv-space-designs',
  'prihaan-spices',
  'silver-spoon',
  'vibo-erp',
  'chahana-dental',
  'destination-anywhere',
  'zingbliss-events',
  'ares-business-league',
  'club-mj-events',
  'naam-transfer',
  'nexsphere-global',
  'jukebox-media',
  'rising-rechargeable',
  'fgp-industries',
  'aangan-boutique',
  'si-decor',
  'jade-travels',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const caseStudyEntries: MetadataRoute.Sitemap = caseStudySlugs.map((slug) => ({
    url: `${base}/work/${slug}`,
    lastModified: '2026-08-25',
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [
    { url: base,                            lastModified: '2026-08-25', changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/services`,              lastModified: '2026-08-25', changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/solutions`,             lastModified: '2026-08-27', changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/work`,                  lastModified: '2026-08-25', changeFrequency: 'weekly',  priority: 0.9 },
    ...caseStudyEntries,
    { url: `${base}/labs`,                  lastModified: '2026-08-25', changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/status`,                lastModified: '2026-08-25', changeFrequency: 'daily',   priority: 0.7 },
    { url: `${base}/about`,                 lastModified: '2026-08-25', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/contact`,               lastModified: '2026-08-25', changeFrequency: 'yearly',  priority: 0.8 },
    { url: `${base}/privacy`,               lastModified: '2026-08-25', changeFrequency: 'yearly',  priority: 0.5 },
    { url: `${base}/terms`,                 lastModified: '2026-08-25', changeFrequency: 'yearly',  priority: 0.5 },
  ]
}
