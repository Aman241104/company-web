import type { Metadata } from 'next'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import WorkPage from '@/components/pages/WorkPage'

export const metadata: Metadata = {
  title: "Our Work — Portfolio & Case Studies",
  description:
    "150+ projects shipped across e-commerce, SaaS, healthcare, hospitality & more. Explore Mehta Technologies' portfolio: ViboERP, Silver Spoon, CMJ Events, ZingBliss Events & more.",
  alternates: { canonical: "https://mehtatechnologies.com/work" },
  openGraph: {
    url: "https://mehtatechnologies.com/work",
    title: "Our Work — Portfolio & Case Studies | Mehta Technologies",
    description:
      "150+ projects: ViboERP SaaS, Silver Spoon e-commerce, CMJ Events, ZingBliss Events & more. See how we deliver measurable results.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Mehta Technologies — Digital Agency India" }],
  },
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://mehtatechnologies.com" },
    { "@type": "ListItem", position: 2, name: "Work", item: "https://mehtatechnologies.com/work" },
  ],
}

const portfolioSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Mehta Technologies Portfolio",
  description: "150+ digital products built for startups, SMBs and enterprises across India.",
  url: "https://mehtatechnologies.com/work",
  provider: { "@type": "Organization", name: "Mehta Technologies", url: "https://mehtatechnologies.com" },
}

export default function Work() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema) }} />
      <main id="main-content" tabIndex={-1} className="bg-transparent">
        <Navbar />
        <WorkPage />
        <Footer />
      </main>
    </>
  )
}
