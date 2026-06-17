import type { Metadata } from 'next'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import ContactPage from '@/components/pages/ContactPage'

export const metadata: Metadata = {
  title: "Contact Us — Free Consultation, No Commitment",
  description:
    "Get in touch with Mehta Technologies. Free 30-min discovery call, reply within 24 hours. Project enquiries, partnerships & ViboERP demos. Mumbai & Bengaluru.",
  alternates: { canonical: "https://mehtatechnologies.com/contact" },
  openGraph: {
    url: "https://mehtatechnologies.com/contact",
    title: "Contact Mehta Technologies — Free Consultation",
    description:
      "Free 30-min discovery call, 24-hour response. Tell us about your project and we'll send a detailed proposal.",
  },
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://mehtatechnologies.com" },
    { "@type": "ListItem", position: 2, name: "Contact", item: "https://mehtatechnologies.com/contact" },
  ],
}

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Mehta Technologies",
  url: "https://mehtatechnologies.com/contact",
  description: "Reach out for project enquiries, free consultations, and partnership opportunities.",
  mainEntity: {
    "@type": "Organization",
    name: "Mehta Technologies",
    email: "hello@mehtatechnologies.com",
    telephone: "+91-98765-43210",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-98765-43210",
      contactType: "sales",
      email: "hello@mehtatechnologies.com",
      availableLanguage: ["English", "Hindi"],
      areaServed: "IN",
    },
  },
}

export default function Contact() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }} />
      <main className="bg-transparent">
        <Navbar />
        <ContactPage />
        <Footer />
      </main>
    </>
  )
}
