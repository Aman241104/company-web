import type { Metadata } from 'next'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import SolutionsPage from '@/components/pages/SolutionsPage'

export const metadata: Metadata = {
  title: "Solutions — Industry-Specific Software",
  description:
    "Mehta Technologies builds domain-tailored software for manufacturing, chemicals & pharma, construction, fintech, healthcare, retail, education, and travel businesses.",
  alternates: { canonical: "https://mehtatechnologies.com/solutions" },
  openGraph: {
    url: "https://mehtatechnologies.com/solutions",
    title: "Solutions — Industry-Specific Software | Mehta Technologies",
    description:
      "Domain-tailored software for manufacturing, chemicals & pharma, construction, fintech, healthcare, retail, education, and travel businesses.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Mehta Technologies — Digital Agency India" }],
  },
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://mehtatechnologies.com" },
    { "@type": "ListItem", position: 2, name: "Solutions", item: "https://mehtatechnologies.com/solutions" },
  ],
}

export default function Solutions() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main className="bg-transparent">
        <Navbar />
        <SolutionsPage />
        <Footer />
      </main>
    </>
  )
}
