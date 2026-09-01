import type { Metadata } from 'next'
import Navbar from '@/components/sections/Navbar'
import Hero from '@/components/sections/Hero'
import ClientMarquee from '@/components/sections/ClientMarquee'
import Services from '@/components/sections/Services'
import Products from '@/components/sections/Products'
import Stats from '@/components/sections/Stats'
import Process from '@/components/sections/Process'
import Work from '@/components/sections/Work'
import Pricing from '@/components/sections/Pricing'
import FAQ from '@/components/sections/FAQ'
import { faqs } from '@/lib/faqs'
import CTA from '@/components/sections/CTA'
import Footer from '@/components/sections/Footer'
import FastTrackDrawer from '@/components/ui/FastTrackDrawer'

export const metadata: Metadata = {
  description:
    "Mehta Technologies builds modern, fast, SEO-ready websites and e-commerce stores for businesses in Ahmedabad and across India. 150+ projects delivered. Get a free consultation today.",
  alternates: { canonical: "https://mehtatechnologies.com" },
  openGraph: {
    url: "https://mehtatechnologies.com",
    title: "Mehta Technologies — Website & E-Commerce Development Agency, Ahmedabad",
    description:
      "150+ websites & e-commerce stores shipped. We build sites that build trust, generate enquiries, and grow your business online.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Mehta Technologies — Web Development Agency, Ahmedabad" }],
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
  address: { "@type": "PostalAddress", addressLocality: "Ahmedabad", addressRegion: "GJ", postalCode: "380001", addressCountry: "IN" },
  geo: { "@type": "GeoCoordinates", latitude: 23.0225, longitude: 72.5714 },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  serviceArea: { "@type": "Country", name: "India" },
  sameAs: [
    "https://linkedin.com/company/mehta-technologies",
    "https://instagram.com/mehtatechnologies",
  ],
  knowsAbout: [
    "Web Development", "E-Commerce Development", "Custom Software Development",
    "Technical SEO", "Performance Marketing", "Custom ERP Systems",
  ],
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main id="main-content" className="bg-transparent relative overflow-x-hidden w-full max-w-[100vw]">
        <Navbar />
        <Hero />
        <ClientMarquee />
        <Stats />
        <Services />
        <Work />
        <Process />
        <Products />
        <Pricing />
        <FAQ />
        <CTA />
        <Footer />
        <FastTrackDrawer />
      </main>
    </>
  )
}
