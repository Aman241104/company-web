import type { Metadata } from 'next'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import AboutPage from '@/components/pages/AboutPage'

export const metadata: Metadata = {
  title: "About Us — Our Team, Story & Values",
  description:
    "Meet the team behind Mehta Technologies — 18 engineers, designers & strategists in Mumbai & Bengaluru. Founded 2019. 150+ projects. 99% client retention. Learn our story.",
  alternates: { canonical: "https://mehtatechnologies.com/about" },
  openGraph: {
    url: "https://mehtatechnologies.com/about",
    title: "About Mehta Technologies — Team, Story & Values",
    description:
      "18-member team of engineers, designers & strategists. Founded 2019. 150+ projects shipped, 99% client retention. Based in Mumbai & Bengaluru.",
  },
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://mehtatechnologies.com" },
    { "@type": "ListItem", position: 2, name: "About", item: "https://mehtatechnologies.com/about" },
  ],
}

export default function About() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main className="bg-transparent">
        <Navbar />
        <AboutPage />
        <Footer />
      </main>
    </>
  )
}
