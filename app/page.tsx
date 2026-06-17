import type { Metadata } from 'next'
import Navbar from '@/components/sections/Navbar'
import Hero from '@/components/sections/Hero'
import TechStack from '@/components/sections/TechStack'
import Services from '@/components/sections/Services'
import Process from '@/components/sections/Process'
import Featured from '@/components/sections/Featured'
import About from '@/components/sections/About'
import Work from '@/components/sections/Work'
import Testimonials from '@/components/sections/Testimonials'
import FAQ from '@/components/sections/FAQ'
import Pricing from '@/components/sections/Pricing'
import CTA from '@/components/sections/CTA'
import Footer from '@/components/sections/Footer'

export const metadata: Metadata = {
  title: "Mehta Technologies — Web, App & SaaS Development Agency India",
  description:
    "Mehta Technologies builds high-performance websites, mobile apps, SaaS platforms & runs performance marketing in Mumbai & Bengaluru. 150+ projects shipped. Talk to us today.",
  alternates: { canonical: "https://mehtatechnologies.com" },
  openGraph: {
    url: "https://mehtatechnologies.com",
    title: "Mehta Technologies — Web, App & SaaS Development Agency India",
    description:
      "150+ digital products shipped. We build websites, apps, SaaS platforms, and run marketing campaigns that deliver real business growth.",
  },
}

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Mehta Technologies",
  url: "https://mehtatechnologies.com",
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: "https://mehtatechnologies.com/?s={search_term_string}" },
    "query-input": "required name=search_term_string",
  },
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Mehta Technologies",
  image: "https://mehtatechnologies.com/og.png",
  url: "https://mehtatechnologies.com",
  telephone: "+91-98765-43210",
  email: "hello@mehtatechnologies.com",
  priceRange: "₹₹₹",
  address: { "@type": "PostalAddress", addressLocality: "Mumbai", addressRegion: "MH", postalCode: "400001", addressCountry: "IN" },
  geo: { "@type": "GeoCoordinates", latitude: 19.076, longitude: 72.8777 },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "80" },
  serviceArea: { "@type": "Country", name: "India" },
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <main className="bg-transparent">
        <Navbar />
        <Hero />
        <TechStack />
        <Services />
        <Process />
        <Featured />
        <About />
        <Work />
        <Testimonials />
        <FAQ />
        <Pricing />
        <CTA />
        <Footer />
      </main>
    </>
  )
}
