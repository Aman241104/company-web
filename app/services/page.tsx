import type { Metadata } from 'next'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import Pricing from '@/components/sections/Pricing'
import PageHero from '@/components/home/PageHero'
import ServiceChapters, { ServicesIndex } from '@/components/home/ServiceChapters'
import { HowWeWork, ContactSection } from '@/components/home/HomeSections'
import { allDisciplines } from '@/lib/services'

const base = 'https://mehtatechnologies.com'

export const metadata: Metadata = {
  title: 'Services — Development, Digital Marketing, Design & Web3',
  description:
    'Website & e-commerce development, custom software, mobile apps, SEO, performance marketing, design and Web3 from Mehta Technologies, Ahmedabad. Fixed timelines. Transparent pricing.',
  alternates: { canonical: `${base}/services` },
  openGraph: {
    url: `${base}/services`,
    title: 'Services | Mehta Technologies',
    description: 'Development, digital marketing, design and Web3 — with published starting prices.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Mehta Technologies — Digital Agency India' }],
  },
}

const servicesSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Mehta Technologies Services',
  itemListElement: allDisciplines.map((d, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    url: `${base}/services/${d.slug}`,
    item: { '@type': 'Service', name: d.title, description: d.desc, provider: { '@type': 'Organization', name: 'Mehta Technologies' } },
  })),
}

export default function Services() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }} />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="bg-bg relative overflow-x-hidden w-full max-w-[100vw]">
        <PageHero
          eyebrow="Services"
          title="Powerful solutions we can build for you"
          intro="From a first website to custom software, marketing and brand design — here is everything we do. Each project is scoped to your exact requirements."
        />
        <ServicesIndex />
        <ServiceChapters />
        <HowWeWork />
        <Pricing />
        <ContactSection />
        <Footer />
      </main>
    </>
  )
}
