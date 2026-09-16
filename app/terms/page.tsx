import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import { FileText, CheckCircle2, ShieldAlert, Zap, ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of engagement, milestone delivery guarantees, SLA warranties, and payment guidelines.',
  alternates: { canonical: 'https://mehtatechnologies.com/terms' },
}

export default function TermsPage() {
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
            <FileText size={13} className="text-blue-600" />
            <span>Engineering Contracts & SLA</span>
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-950 tracking-tight">
            Terms of Service
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 font-mono">
            Last Updated: September 2026 · Effective Date: January 1, 2024
          </p>
        </div>

        <div className="space-y-10 text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">

          <section className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-3">
            <h2 className="text-lg font-bold text-neutral-900 tracking-tight flex items-center gap-2">
              <CheckCircle2 size={16} className="text-blue-600" />
              1. Engagement & Milestone Structure
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
              All client engagements are governed by formal Statement of Work (SOW) documents outlining explicit deliverables, sprint timelines, acceptance criteria, and fixed milestone pricing. Work commences upon mutual contract execution and initial deposit settlement.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-neutral-900 tracking-tight">
              2. Intellectual Property & Code Transfer
            </h2>
            <p className="text-neutral-500 text-xs sm:text-sm">
              Upon receipt of full and final payment for all agreed milestones, Mehta Technologies assigns to the client all right, title, and interest in and to custom source code, design files, database schemas, and proprietary assets created specifically for the project.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-neutral-900 tracking-tight">
              3. Sprint Acceptance & Staging Review
            </h2>
            <p className="text-neutral-500 text-xs sm:text-sm">
              Clients are provided live staging URLs and GitHub repository access during active sprints. Milestone acceptance occurs when delivered features satisfy the technical requirements defined in the approved SOW.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-neutral-900 tracking-tight">
              4. Post-Launch Warranty & Support SLA
            </h2>
            <p className="text-neutral-500 text-xs sm:text-sm">
              Projects include a standard 2-week to 12-month SLA warranty (dependent on contracted tier) covering defect resolution, regression patches, and server stability monitoring. Ongoing feature development and scaling maintenance are supported via monthly engineering retainers.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-neutral-900 tracking-tight">
              5. Payment Terms & Currencies
            </h2>
            <p className="text-neutral-500 text-xs sm:text-sm">
              Invoices are issued in INR for domestic entities and in USD/EUR for international clients. Payment options include NEFT/RTGS, UPI, Stripe International, Razorpay, and Bank Wire.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-neutral-900 tracking-tight">
              6. Inquiries & Legal Counsel
            </h2>
            <p className="text-neutral-500 text-xs sm:text-sm">
              For contract clarifications or custom enterprise Master Services Agreements (MSA), please reach our legal desk at:
            </p>
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 font-mono text-xs text-blue-700">
              Email: <a href="mailto:legal@mehtatechnologies.com" className="underline hover:text-blue-900">legal@mehtatechnologies.com</a> / <a href="mailto:hello@mehtatechnologies.com" className="underline hover:text-blue-900">hello@mehtatechnologies.com</a>
            </div>
          </section>

        </div>
      </div>

      <Footer />
    </main>
    </>
  )
}
