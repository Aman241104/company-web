import type { MetadataRoute } from 'next'

// lastModified is a genuine per-page date, updated only when that page's content
// actually changes — not `new Date()` on every build. A sitemap where every page
// always claims to be "just updated" gives crawlers no real recrawl signal.
const base = 'https://mehtatechnologies.com'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base,                  lastModified: '2026-08-06', changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/services`,    lastModified: '2026-08-06', changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/work`,        lastModified: '2026-08-06', changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/about`,       lastModified: '2026-08-06', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/contact`,     lastModified: '2026-08-06', changeFrequency: 'yearly',  priority: 0.8 },
  ]
}
