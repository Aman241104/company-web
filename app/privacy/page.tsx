import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import { ShieldCheck, Lock, Eye, Server, ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Our commitment to data privacy, client confidentiality, security protocols, and intellectual property protection.',
  alternates: { canonical: 'https://mehtatechnologies.com/privacy' },
}

export default function PrivacyPage() {
  return (
    <>
    <Navbar theme="light" />
    <main id="main-content" tabIndex={-1} className="home-light bg-white relative overflow-x-hidden min-h-screen">

      <div className="pt-32 pb-24 max-w-[900px] mx-auto px-6 md:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-neutral-500 hover:text-neutral-950 mb-8 transition-colors"
        >
          <ArrowLeft size={13} /> Back to Home
        </Link>

        <div className="space-y-4 mb-12">
          <span className="glow-pill inline-flex items-center gap-2">
            <ShieldCheck size={13} className="text-blue-600" />
            <span>Legal & Data Security</span>
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-950 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 font-mono">
            Last Updated: September 2026 · Effective Date: January 1, 2024
          </p>
        </div>

        <div className="space-y-10 text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">

          <section className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-3">
            <h2 className="text-lg font-bold text-neutral-900 tracking-tight flex items-center gap-2">
              <Lock size={16} className="text-blue-600" />
              1. Overview & Client Confidentiality
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
              Mehta Technologies (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;the Studio&rdquo;) respects the confidentiality of client data, source code, user metrics, and proprietary business logic. We adhere strictly to non-disclosure obligations and enterprise privacy standards across all client engagements.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-neutral-900 tracking-tight">
              2. Information We Collect
            </h2>
            <p>
              When you interact with our website, request project scoping, or initiate discovery consultations, we may collect:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-neutral-500 text-xs sm:text-sm">
              <li><strong className="text-neutral-900">Contact & Organization Details:</strong> Name, work email address, telephone/WhatsApp number, company name, and project requirements.</li>
              <li><strong className="text-neutral-900">Technical Telemetry:</strong> Non-personally identifiable browser metadata, screen dimensions, referrer headers, and anonymous performance metrics to optimize page load speeds.</li>
              <li><strong className="text-neutral-900">Client Project Artifacts:</strong> Any architecture specifications, Figma mockups, or API documentation shared during contracted sprints.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-neutral-900 tracking-tight">
              3. How We Use Collected Information
            </h2>
            <p className="text-neutral-500 text-xs sm:text-sm">
              Information collected is utilized exclusively for:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                <div className="text-xs font-bold text-neutral-900 mb-1">Project Delivery</div>
                <div className="text-xs text-neutral-500">Providing milestone estimates, sprint updates, and production deployment delivery.</div>
              </div>
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                <div className="text-xs font-bold text-neutral-900 mb-1">Direct Technical Support</div>
                <div className="text-xs text-neutral-500">Responding to infrastructure inquiries, architecture reviews, and warranty tickets.</div>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-neutral-900 tracking-tight">
              4. Code & Intellectual Property Ownership
            </h2>
            <p className="text-neutral-500 text-xs sm:text-sm">
              Unless otherwise agreed in a specific statement of work, all client repositories, bespoke designs, database schemas, and custom engineering developed for a client become the 100% exclusive intellectual property of the client upon final milestone payment. We never sell, license, or repurpose proprietary client assets to third parties.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-neutral-900 tracking-tight">
              5. Data Security & Storage Protocols
            </h2>
            <p className="text-neutral-500 text-xs sm:text-sm">
              We employ industry-standard encryption (TLS 1.3 in transit, AES-256 at rest) for all digital storage, database backups, and internal communications. Our infrastructure adheres to strict role-based access control (RBAC) and multi-factor authentication.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-neutral-900 tracking-tight">
              6. Contact Privacy Office
            </h2>
            <p className="text-neutral-500 text-xs sm:text-sm">
              For questions regarding our privacy practices, data deletion requests, or NDA execution, please contact our engineering privacy desk at:
            </p>
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 font-mono text-xs text-blue-700">
              Email: <a href="mailto:privacy@mehtatechnologies.com" className="underline hover:text-blue-900">privacy@mehtatechnologies.com</a> / <a href="mailto:hello@mehtatechnologies.com" className="underline hover:text-blue-900">hello@mehtatechnologies.com</a>
            </div>
          </section>

        </div>
      </div>

      <Footer />
    </main>
    </>
  )
}
