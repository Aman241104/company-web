import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import LocationPage from '@/components/pages/LocationPage'
import { locations, getLocationBySlug } from '@/lib/locations'

const base = 'https://mehtatechnologies.com'

// The studio is physically in Ahmedabad (see organizationSchema in
// app/layout.tsx). Only that page may say "agency in <city>"; every other
// location is served remotely, so its title says "for businesses in <city>"
// instead of implying a local office (honest-SEO rule — no fabricated local
// presence). `keywordLabel` in lib/locations.ts is left untouched.
const HQ_SLUG = 'ahmedabad'

function pageTitle(location: { slug: string; city: string; keywordLabel: string }) {
  return location.slug === HQ_SLUG
    ? location.keywordLabel
    : `Website Development for Businesses in ${location.city}`
}

export async function generateStaticParams() {
  return locations.map((loc) => ({ city: loc.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city } = await params
  const location = getLocationBySlug(city)
  if (!location) return { title: 'Location Not Found' }

  const title = pageTitle(location)
  return {
    title,
    description: `${location.tagline} ${location.intro}`.slice(0, 300),
    alternates: { canonical: `${base}/locations/${location.slug}` },
    openGraph: {
      url: `${base}/locations/${location.slug}`,
      title,
      description: location.tagline,
      images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Mehta Technologies — Digital Agency India' }],
    },
  }
}

export default async function LocationDetail({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params
  const location = getLocationBySlug(city)
  if (!location) notFound()

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: base },
      { '@type': 'ListItem', position: 2, name: 'Locations', item: `${base}/locations` },
      { '@type': 'ListItem', position: 3, name: location.city, item: `${base}/locations/${location.slug}` },
    ],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: location.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Website Development',
    provider: { '@type': 'Organization', name: 'Mehta Technologies', url: base },
    // lib/locations.ts has one state-level entry (Gujarat, region 'India').
    areaServed: { '@type': location.region === 'India' ? 'State' : 'City', name: location.city },
    description: location.intro,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="home-light bg-cream">
        <LocationPage location={location} />
        <Footer />
      </main>
    </>
  )
}
