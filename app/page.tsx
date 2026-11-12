import type { Metadata } from 'next'
import Header from '@/components/site/Header'
import Hero from '@/components/site/home/Hero'
import Board from '@/components/site/home/Board'
import { WhatWeDo, Deck } from '@/components/site/home/Chapters'
import Expertise from '@/components/site/home/Expertise'
import { Warp, WorkWall, CaseStudies } from '@/components/site/home/Work'
import { Showreel, Metrics, Partners, Technology } from '@/components/site/home/Proof'
import { Process, Industries, About, TeamRail, Faq, Contact } from '@/components/site/home/Story'
import Pricing from '@/components/sections/Pricing'
import Products from '@/components/sections/Products'
import Footer from '@/components/site/Footer'
import { faqs } from '@/lib/faqs'

export const metadata: Metadata = {
  description:
    "Mehta Technologies builds modern, fast, SEO-ready websites and e-commerce stores for businesses in Ahmedabad and across India. 150+ projects delivered. Get a free consultation today.",
  alternates: { canonical: "https://mehtatechnologies.com" },
  openGraph: {
    url: "https://mehtatechnologies.com",
    title: "Mehta Technologies: Website & E-Commerce Development Agency, Ahmedabad",
    description:
      "150+ websites & e-commerce stores shipped. We build sites that build trust, generate enquiries, and grow your business online.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Mehta Technologies, Web Development Agency, Ahmedabad" }],
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
  areaServed: { "@type": "Country", name: "India" },
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
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />
      <main id="main" tabIndex={-1} className="relative">
        <Hero />
        <Board />
        <WhatWeDo />
        <Deck />
        <Expertise />
        <Warp />
        <WorkWall />
        <CaseStudies />
        <Showreel />
        <Metrics />
        <Partners />
        <Technology />
        <Process />
        <Industries />
        <Pricing />
        <Products />
        <About />
        <TeamRail />
        <Faq />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
