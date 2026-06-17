import type { Metadata } from 'next'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import ServicesPage from '@/components/pages/ServicesPage'

export const metadata: Metadata = {
  title: "Services — Web, App, SaaS, SEO & Marketing",
  description:
    "Full-stack digital services from Mehta Technologies: website development, custom software, mobile apps, SaaS platforms, performance marketing, and SEO. Fixed timelines. Transparent pricing.",
  alternates: { canonical: "https://mehtatechnologies.com/services" },
  openGraph: {
    url: "https://mehtatechnologies.com/services",
    title: "Services — Web, App, SaaS, SEO & Marketing | Mehta Technologies",
    description:
      "Website development, custom software, mobile apps, SaaS, performance marketing & SEO. Fixed timelines, transparent pricing.",
  },
}

const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Mehta Technologies Services",
  itemListElement: [
    { "@type": "ListItem", position: 1, item: { "@type": "Service", name: "Website Development", provider: { "@type": "Organization", name: "Mehta Technologies" }, description: "High-performance websites built with Next.js. <2s LCP, Core Web Vitals 90+, CMS integration." } },
    { "@type": "ListItem", position: 2, item: { "@type": "Service", name: "Software Development", provider: { "@type": "Organization", name: "Mehta Technologies" }, description: "Custom backend systems, APIs, microservices, and cloud-native infrastructure." } },
    { "@type": "ListItem", position: 3, item: { "@type": "Service", name: "Mobile App Development", provider: { "@type": "Organization", name: "Mehta Technologies" }, description: "React Native & Flutter apps for iOS and Android with offline-first architecture." } },
    { "@type": "ListItem", position: 4, item: { "@type": "Service", name: "SaaS Development", provider: { "@type": "Organization", name: "Mehta Technologies" }, description: "End-to-end SaaS platform development with multi-tenancy, billing, and analytics." } },
    { "@type": "ListItem", position: 5, item: { "@type": "Service", name: "Performance Marketing", provider: { "@type": "Organization", name: "Mehta Technologies" }, description: "Meta, Google & YouTube ads with full-funnel optimisation and creative production." } },
    { "@type": "ListItem", position: 6, item: { "@type": "Service", name: "SEO", provider: { "@type": "Organization", name: "Mehta Technologies" }, description: "Technical SEO, content strategy, link building and Core Web Vitals optimisation." } },
  ],
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://mehtatechnologies.com" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://mehtatechnologies.com/services" },
  ],
}

export default function Services() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main className="bg-[#060614]">
        <Navbar />
        <ServicesPage />
        <Footer />
      </main>
    </>
  )
}
