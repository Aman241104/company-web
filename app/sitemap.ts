import type { MetadataRoute } from 'next'

const base = 'https://mehtatechnologies.com'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base,                            lastModified: '2026-08-24', changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/services`,              lastModified: '2026-08-24', changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/work`,                  lastModified: '2026-08-24', changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/work/silver-spoon`,     lastModified: '2026-08-24', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/work/vibo-erp`,         lastModified: '2026-08-24', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/work/chahana-dental`,   lastModified: '2026-08-24', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/labs`,                  lastModified: '2026-08-24', changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/status`,                lastModified: '2026-08-24', changeFrequency: 'daily',   priority: 0.7 },
    { url: `${base}/about`,                 lastModified: '2026-08-24', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/contact`,               lastModified: '2026-08-24', changeFrequency: 'yearly',  priority: 0.8 },
  ]
}
