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
  mainEntity: [
    {
      "@type": "Question",
      name: "What types of projects do you work on?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our core focus is website development — high-converting marketing websites, business websites, and e-commerce stores. We also build custom software, mobile apps, and our own product, Vibo ERP, for businesses that need more than a website.",
      },
    },
    {
      "@type": "Question",
      name: "How long does a typical project take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A custom Next.js landing page or marketing site takes 2–3 weeks. A full business website or e-commerce store takes 4–8 weeks depending on scope and integrations. Custom software projects take 8–16 weeks. We provide a milestone-guaranteed schedule before kicking off.",
      },
    },
    {
      "@type": "Question",
      name: "Do you work with international clients?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Alongside clients across India, we work with businesses abroad too. We run overlapping hours, operate on asynchronous documentation pipelines, and bill seamlessly in USD or EUR.",
      },
    },
    {
      "@type": "Question",
      name: "How is pricing structured?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We operate strictly on fixed-price milestone contracts or dedicated monthly engineering retainers. No unexpected billable hours. Single-page campaign sites start at ₹9,999; starter brand websites from ₹19,999; full business websites from ₹32,999; full-stack web/mobile MVPs from ₹75,000; enterprise systems are custom scoped with transparent line items.",
      },
    },
    {
      "@type": "Question",
      name: "WordPress vs a custom-built website — which should I choose?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "WordPress is faster to launch and fine for a simple content site you'll edit yourself constantly. A custom-built Next.js site costs more upfront but loads faster, is harder to hack, and won't slow down as you add plugins over time. We'll tell you honestly which fits your case in a free scoping call.",
      },
    },
    {
      "@type": "Question",
      name: "What is server-side rendering and why does it matter for SEO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Server-side rendering (SSR) generates a fully-formed HTML page on the server before sending it to the browser, so search engines and users see complete content immediately instead of waiting on client-side JavaScript. This improves crawlability, Core Web Vitals, and page speed — all Google ranking factors. Every site we build on Next.js uses SSR or static generation by default.",
      },
    },
    {
      "@type": "Question",
      name: "How do you keep a website secure during and after development?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We follow OWASP-aligned practices throughout: input validation and sanitization, parameterized queries, HTTPS everywhere, dependency vulnerability scanning, and rate-limited auth endpoints. Post-launch, every plan includes security patches and dependency updates for the duration of the SLA support window.",
      },
    },
    {
      "@type": "Question",
      name: "Can you work with or upgrade our existing codebase?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We frequently audit and refactor existing React, Node.js, Next.js, Django, Laravel, and Python backends. If a strategic rewrite is more cost-effective in the long run than patching legacy technical debt, we provide an honest architectural evaluation.",
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
        text: "Every project includes 2 weeks to 12 months of post-launch SLA warranty support (depending on plan) covering bug fixes, performance monitoring, server maintenance, and security patches. We also offer ongoing monthly retainer partnerships.",
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
