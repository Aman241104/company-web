import type { Metadata } from 'next'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import LocationsIndexPage from '@/components/pages/LocationsIndexPage'

export const metadata: Metadata = {
  title: 'Locations — Where We Build',
  description:
    "Mehta Technologies builds websites and platforms for businesses across Ahmedabad, Surat, Nadiad, Mumbai and the rest of Gujarat & Maharashtra.",
  alternates: { canonical: 'https://mehtatechnologies.com/locations' },
  openGraph: {
    url: 'https://mehtatechnologies.com/locations',
    title: 'Locations — Where We Build | Mehta Technologies',
    description:
      'Website & platform development for businesses across Ahmedabad, Surat, Nadiad, Mumbai and Gujarat.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Mehta Technologies — Digital Agency India' }],
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mehtatechnologies.com' },
    { '@type': 'ListItem', position: 2, name: 'Locations', item: 'https://mehtatechnologies.com/locations' },
  ],
}

export default function Locations() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main id="main-content" tabIndex={-1} className="bg-transparent">
        <Navbar />
        <LocationsIndexPage />
        <Footer />
      </main>
    </>
  )
}
