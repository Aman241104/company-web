import type { Metadata } from 'next'
import Navbar from '@/components/sections/Navbar'
import Hero from '@/components/sections/Hero'
import ClientMarquee from '@/components/sections/ClientMarquee'
import Services from '@/components/sections/Services'
import Products from '@/components/sections/Products'
import Stats from '@/components/sections/Stats'
import BlueprintGenerator from '@/components/sections/BlueprintGenerator'
import ClientPortalSimulator from '@/components/sections/ClientPortalSimulator'
import ArchitectureBenchmark from '@/components/sections/ArchitectureBenchmark'
import PerformanceComparison from '@/components/sections/PerformanceComparison'
import CodeExplorer from '@/components/sections/CodeExplorer'
import Industries from '@/components/sections/Industries'
import Process from '@/components/sections/Process'
import GlobalNetwork from '@/components/sections/GlobalNetwork'
import Featured from '@/components/sections/Featured'
import Work from '@/components/sections/Work'
import Testimonials from '@/components/sections/Testimonials'
import RoiCalculator from '@/components/sections/RoiCalculator'
import Pricing from '@/components/sections/Pricing'
import FAQ from '@/components/sections/FAQ'
import CTA from '@/components/sections/CTA'
import Footer from '@/components/sections/Footer'
import FastTrackDrawer from '@/components/ui/FastTrackDrawer'
import ThemeCustomizer from '@/components/ui/ThemeCustomizer'

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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What types of projects do you work on?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Everything from high-converting marketing websites and custom Shopify stores to multi-tenant SaaS platforms, cross-platform mobile apps (React Native/Flutter), and custom ERP systems. Our core focus is full-stack digital products where engineering precision, security, and UI design matter equally.",
      },
    },
    {
      "@type": "Question",
      name: "How long does a typical project take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A custom Next.js landing page or marketing site takes 2–3 weeks. A full-stack web or mobile app takes 4–8 weeks depending on scope and integrations. Enterprise ERP and SaaS platforms take 8–16 weeks. We provide a milestone-guaranteed schedule before kicking off.",
      },
    },
    {
      "@type": "Question",
      name: "Do you work with international clients?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Over 35% of our client base is located across the US, UK, UAE, and Europe. We run overlapping hours, operate on asynchronous documentation pipelines, and bill seamlessly in USD or EUR.",
      },
    },
    {
      "@type": "Question",
      name: "How is pricing structured?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We operate strictly on fixed-price milestone contracts or dedicated monthly engineering retainers. No unexpected billable hours. Starter websites begin at ₹20,000; full-stack web/mobile MVPs from ₹75,000; enterprise systems are custom scoped with transparent line items.",
      },
    },
    {
      "@type": "Question",
      name: "Who owns the intellectual property and code when delivered?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You own 100% of all source code, assets, database schemas, and intellectual property upon completion of the final milestone. We sign mutual NDAs prior to discovery upon request.",
      },
    },
    {
      "@type": "Question",
      name: "What does post-launch support look like?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Every project includes 1 to 12 months of dedicated post-launch SLA warranty support covering bug fixes, performance monitoring, server maintenance, and security patches. We also offer ongoing monthly retainer partnerships.",
      },
    },
  ],
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="bg-transparent relative overflow-x-hidden w-full max-w-[100vw]">
        <Navbar />
        <Hero />
        <ClientMarquee />
        <Services />
        <Products />
        <Stats />
        <BlueprintGenerator />
        <ClientPortalSimulator />
        <ArchitectureBenchmark />
        <PerformanceComparison />
        <CodeExplorer />
        <Industries />
        <Process />
        <GlobalNetwork />
        <Featured />
        <Work />
        <Testimonials />
        <RoiCalculator />
        <Pricing />
        <FAQ />
        <CTA />
        <Footer />
        <FastTrackDrawer />
        <ThemeCustomizer />
      </main>
    </>
  )
}
