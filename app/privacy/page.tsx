import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Our commitment to data privacy, client confidentiality, security protocols, and intellectual property protection.',
  alternates: { canonical: 'https://mehtatechnologies.com/privacy' },
}

// Legal copy is unchanged from the previous version — only the presentation
// moved to design system v2 (cream header band, white reading column, a
// plain in-page contents list, no icon decoration).
const sections = [
  { id: 'overview', title: 'Overview & client confidentiality' },
  { id: 'information-we-collect', title: 'Information we collect' },
  { id: 'how-we-use-information', title: 'How we use collected information' },
  { id: 'ip-ownership', title: 'Code & intellectual property ownership' },
  { id: 'data-security', title: 'Data security & storage protocols' },
  { id: 'contact', title: 'Contact our privacy office' },
]

const h2 = 'font-display text-2xl sm:text-[28px] font-semibold text-ink tracking-tight leading-tight scroll-mt-28'
const num = 'block font-mono text-sm font-normal text-ink/70 mb-2'
const para = 'text-[15px] sm:text-base text-ink/80 leading-relaxed'
const mailLink = 'font-semibold text-ink underline underline-offset-4 decoration-ink/30 hover:decoration-accent'

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="home-light bg-bg relative overflow-x-hidden min-h-screen">
        <header className="bg-cream pt-32 sm:pt-36 pb-12 sm:pb-16">
          <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-8">
            <nav aria-label="Breadcrumb" className="mb-10 sm:mb-14">
              <ol className="flex flex-wrap items-center gap-2 text-[13px] text-ink/75">
                <li><Link href="/" className="hover:text-ink underline-offset-4 hover:underline">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-ink font-medium">Privacy Policy</li>
              </ol>
            </nav>
            <h1 className="font-display text-[40px] leading-[1.05] sm:text-6xl lg:text-[72px] font-semibold text-ink tracking-tight">
              Privacy Policy
            </h1>
            <p className="mt-5 text-sm text-ink/75">
              Last updated: September 2026 · Effective date: January 1, 2024
            </p>
          </div>
        </header>

        <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-8 py-14 sm:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          <nav aria-label="On this page" className="hidden lg:block lg:col-span-3">
            <div className="sticky top-28">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink/70 mb-4">On this page</p>
              <ol className="space-y-2.5 text-sm">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="text-ink/80 hover:text-ink underline-offset-4 hover:underline">
                      {i + 1}. {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <article className="lg:col-span-8 lg:col-start-5 max-w-[70ch] divide-y divide-border">
            <section aria-labelledby="overview" className="pb-10">
              <h2 id="overview" className={h2}><span aria-hidden="true" className={num}>01</span>Overview &amp; client confidentiality</h2>
              <p className={`${para} mt-4`}>
                Mehta Technologies (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;the Studio&rdquo;) respects the confidentiality of client data, source code, user metrics, and proprietary business logic. We adhere strictly to non-disclosure obligations and enterprise privacy standards across all client engagements.
              </p>
            </section>

            <section aria-labelledby="information-we-collect" className="py-10">
              <h2 id="information-we-collect" className={h2}><span aria-hidden="true" className={num}>02</span>Information we collect</h2>
              <p className={`${para} mt-4`}>
                When you interact with our website, request project scoping, or initiate discovery consultations, we may collect:
              </p>
              <ul className={`${para} mt-4 list-disc pl-5 space-y-3 marker:text-ink/40`}>
                <li><strong className="font-semibold text-ink">Contact &amp; organization details:</strong> Name, work email address, telephone/WhatsApp number, company name, and project requirements.</li>
                <li><strong className="font-semibold text-ink">Technical telemetry:</strong> Non-personally identifiable browser metadata, screen dimensions, referrer headers, and anonymous performance metrics to optimize page load speeds.</li>
                <li><strong className="font-semibold text-ink">Client project artifacts:</strong> Any architecture specifications, Figma mockups, or API documentation shared during contracted sprints.</li>
              </ul>
            </section>

            <section aria-labelledby="how-we-use-information" className="py-10">
              <h2 id="how-we-use-information" className={h2}><span aria-hidden="true" className={num}>03</span>How we use collected information</h2>
              <p className={`${para} mt-4`}>Information collected is utilized exclusively for:</p>
              <dl className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl bg-cream p-5">
                  <dt className="text-[15px] font-semibold text-ink">Project delivery</dt>
                  <dd className="mt-1.5 text-sm text-ink/80 leading-relaxed">Providing milestone estimates, sprint updates, and production deployment delivery.</dd>
                </div>
                <div className="rounded-2xl bg-cream p-5">
                  <dt className="text-[15px] font-semibold text-ink">Direct technical support</dt>
                  <dd className="mt-1.5 text-sm text-ink/80 leading-relaxed">Responding to infrastructure inquiries, architecture reviews, and warranty tickets.</dd>
                </div>
              </dl>
            </section>

            <section aria-labelledby="ip-ownership" className="py-10">
              <h2 id="ip-ownership" className={h2}><span aria-hidden="true" className={num}>04</span>Code &amp; intellectual property ownership</h2>
              <p className={`${para} mt-4`}>
                Unless otherwise agreed in a specific statement of work, all client repositories, bespoke designs, database schemas, and custom engineering developed for a client become the 100% exclusive intellectual property of the client upon final milestone payment. We never sell, license, or repurpose proprietary client assets to third parties.
              </p>
            </section>

            <section aria-labelledby="data-security" className="py-10">
              <h2 id="data-security" className={h2}><span aria-hidden="true" className={num}>05</span>Data security &amp; storage protocols</h2>
              <p className={`${para} mt-4`}>
                We employ industry-standard encryption (TLS 1.3 in transit, AES-256 at rest) for all digital storage, database backups, and internal communications. Our infrastructure adheres to strict role-based access control (RBAC) and multi-factor authentication.
              </p>
            </section>

            <section aria-labelledby="contact" className="pt-10">
              <h2 id="contact" className={h2}><span aria-hidden="true" className={num}>06</span>Contact our privacy office</h2>
              <p className={`${para} mt-4`}>
                For questions regarding our privacy practices, data deletion requests, or NDA execution, please contact our engineering privacy desk at:
              </p>
              <p className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[15px]">
                <a href="mailto:privacy@mehtatechnologies.com" className={mailLink}>privacy@mehtatechnologies.com</a>
                <a href="mailto:hello@mehtatechnologies.com" className={mailLink}>hello@mehtatechnologies.com</a>
              </p>
            </section>
          </article>
        </div>

        <Footer />
      </main>
    </>
  )
}
