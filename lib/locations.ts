export type LocationCaseStudy = {
  slug: string
  name: string
  category: string
}

export type Location = {
  slug: string
  city: string
  region: string
  keywordLabel: string
  tagline: string
  intro: string
  focusPoints: { title: string; desc: string }[]
  caseStudies: LocationCaseStudy[]
  faqs: { question: string; answer: string }[]
}

export const locations: Location[] = [
  {
    slug: 'ahmedabad',
    city: 'Ahmedabad',
    region: 'Gujarat',
    keywordLabel: 'Website Development Agency in Ahmedabad',
    tagline: 'Interior, real estate & retail brands, engineered for speed.',
    intro:
      "We've shipped production websites for Ahmedabad-based interior architecture and design studios — from vendor-direct pricing pages to 100/100 Lighthouse performance on image-heavy galleries. If you run a design, real estate, or retail business in Ahmedabad and your current site loads slow or looks dated next to competitors, that's the gap we close.",
    focusPoints: [
      { title: 'Image-heavy portfolios that still load instantly', desc: 'Adaptive WebP/AVIF pipelines built for interior design, real estate & retail galleries — no compromise on visual quality.' },
      { title: 'WhatsApp-first lead capture', desc: 'Direct WhatsApp routing from every inquiry point, matching how Ahmedabad businesses actually close leads.' },
      { title: 'Local SEO structured data', desc: 'Schema.org markup so your business shows up correctly in local search and Maps results.' },
    ],
    caseStudies: [
      { slug: 'sv-space-designs', name: 'SV Space Designs', category: 'Architecture & Turnkey Studio' },
      { slug: 'si-decor', name: 'SI Decor', category: 'Interior Design' },
    ],
    faqs: [
      { question: 'Do you work with clients in Ahmedabad remotely?', answer: 'Yes — our delivery process is fully remote-first with structured calls and async updates, which is how we already work with our existing Ahmedabad clients.' },
      { question: 'How long does a business website take?', answer: 'A standard business or portfolio site typically ships in 3-5 weeks depending on content readiness and revision rounds.' },
    ],
  },
  {
    slug: 'surat',
    city: 'Surat',
    region: 'Gujarat',
    keywordLabel: 'Website Development Agency in Surat',
    tagline: "Built for Surat's textile, diamond & MSME trade economy.",
    intro:
      "Surat runs on high-volume B2B trade — textiles, diamonds, and manufacturing. Most agency-built sites aren't built to handle large product catalogs or the kind of trust signals B2B buyers look for before they call. We build catalog-heavy storefronts and B2B lead sites that are fast, mobile-first, and structured for search.",
    focusPoints: [
      { title: 'Large catalog architecture', desc: 'Built for hundreds of SKUs or product variants without sacrificing page speed — proven on 250+ SKU catalogs.' },
      { title: 'B2B trust & inquiry flows', desc: 'Structured company profiles, certifications, and inquiry forms that match how B2B buyers vet suppliers.' },
      { title: 'Mobile-first by default', desc: 'Most B2B search traffic in Surat now starts on mobile — every layout is designed mobile-first, not adapted after the fact.' },
    ],
    caseStudies: [
      { slug: 'fgp-industries', name: 'FGP Industries', category: 'Industrial Manufacturing Catalog' },
      { slug: 'rising-rechargeable', name: 'Rising Rechargeable', category: 'Industrial B2B Storefront' },
    ],
    faqs: [
      { question: 'Can you build a catalog with hundreds of products?', answer: 'Yes — we\'ve built and shipped catalogs with 250+ SKUs across multiple categories without compromising load speed.' },
      { question: 'Do you support Gujarati or Hindi content alongside English?', answer: 'Yes, we can structure multi-language content where it helps conversion for your customer base.' },
    ],
  },
  {
    slug: 'nadiad',
    city: 'Nadiad',
    region: 'Gujarat',
    keywordLabel: 'Website Development Agency in Nadiad',
    tagline: 'Straightforward, affordable websites for local businesses & institutions.',
    intro:
      "Businesses in smaller cities like Nadiad often get quoted the same price as a metro agency for a template site with no real strategy behind it. We build the same quality of site we ship for our Ahmedabad and Mumbai clients — clean, fast, mobile-ready — scoped sensibly for a local business or institution's budget and needs.",
    focusPoints: [
      { title: 'Right-sized scope', desc: 'No bloated feature lists — a focused site that covers what actually drives inquiries for a local business.' },
      { title: 'WhatsApp & call-first design', desc: 'Direct-to-WhatsApp and click-to-call built into every page, matching how local customers actually reach out.' },
      { title: 'Simple content updates', desc: 'You can update text, images and offers yourself without calling us for every small change.' },
    ],
    caseStudies: [
      { slug: 'chahana-dental', name: 'Chahana Dental Studio', category: 'Clinical & Patient Booking' },
    ],
    faqs: [
      { question: 'Is a full custom website worth it for a smaller local business?', answer: 'It depends on your goals — if you rely on local search and referrals, a fast, well-structured site with clear contact paths pays for itself quickly. We\'ll tell you honestly if a lighter option makes more sense for you.' },
      { question: 'What does a basic business website cost?', answer: 'It depends on scope — talk to us with your requirements and we\'ll give you a straight quote, no inflated retainer packages.' },
    ],
  },
  {
    slug: 'mumbai',
    city: 'Mumbai',
    region: 'Maharashtra',
    keywordLabel: 'Website Development Agency in Mumbai',
    tagline: 'Enterprise SaaS, fintech & high-traffic platforms — where we\'re based.',
    intro:
      "Mumbai is home base for Mehta Technologies. We work with founders and enterprises who need more than a marketing site — multi-tenant SaaS platforms, financial compliance tooling, and systems that have to hold up under real production load and security scrutiny.",
    focusPoints: [
      { title: 'Enterprise-grade architecture', desc: 'Multi-tenant systems, RBAC, and audit-ready logging built for regulated and high-stakes environments.' },
      { title: 'In-person + remote delivery', desc: 'Based in Mumbai, so on-site discovery sessions and stakeholder workshops are on the table when they help.' },
      { title: 'Performance marketing tie-in', desc: 'We build the platform and can also run the acquisition campaigns driving traffic to it.' },
    ],
    caseStudies: [
      { slug: 'vibo-erp', name: 'Vibo ERP Suite', category: 'Multi-Tenant Enterprise SaaS' },
      { slug: 'nexsphere-global', name: 'NexSphere Global', category: 'Financial Compliance Platform' },
    ],
    faqs: [
      { question: 'Can we meet in person in Mumbai?', answer: 'Yes — we\'re based in Mumbai and happy to do in-person discovery sessions for larger engagements.' },
      { question: 'Do you handle both the platform and the marketing?', answer: 'Yes, we build the product and can also run performance marketing campaigns to drive qualified traffic to it.' },
    ],
  },
  {
    slug: 'gujarat',
    city: 'Gujarat',
    region: 'India',
    keywordLabel: 'Website Development Agency in Gujarat',
    tagline: 'Serving businesses across Ahmedabad, Surat, Vadodara & Nadiad.',
    intro:
      "Gujarat's economy runs on manufacturing, textiles, diamonds, and a dense MSME base — and most of those businesses are still underserved by web agencies that only know how to ship generic templates. We build fast, structured, conversion-focused websites and platforms for businesses across the state, with dedicated experience in Ahmedabad and Surat specifically.",
    focusPoints: [
      { title: 'Industrial & B2B catalogs', desc: 'Proven on manufacturing and industrial equipment catalogs, from FRP tanks to rechargeable power systems.' },
      { title: 'City-specific delivery experience', desc: 'Active client work in Ahmedabad and Surat — see our dedicated pages for each city\'s specific focus.' },
      { title: 'Remote-first, statewide', desc: 'Structured remote delivery means location within Gujarat is never a constraint on quality or responsiveness.' },
    ],
    caseStudies: [
      { slug: 'sv-space-designs', name: 'SV Space Designs', category: 'Architecture & Turnkey Studio' },
      { slug: 'fgp-industries', name: 'FGP Industries', category: 'Industrial Manufacturing Catalog' },
    ],
    faqs: [
      { question: 'Which Gujarat cities have you worked in?', answer: 'We have direct client experience in Ahmedabad and Surat, and work remotely with businesses across the rest of the state.' },
      { question: 'Do you have city-specific pages?', answer: 'Yes — see our dedicated Ahmedabad, Surat, and Nadiad pages for city-specific focus areas and case studies.' },
    ],
  },
]

export function getLocationBySlug(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug)
}
