import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: "Support & Maintenance Standards",
  description:
    "How Mehta Technologies handles deployments, maintenance, and ongoing support for client websites and software.",
  alternates: { canonical: "https://mehtatechnologies.com/status" },
}

// Plain commitments only — deliberately no uptime percentages, response-time
// SLAs or "all systems operational" indicators, because there is no live
// monitoring feed behind this page and those numbers would be invented.
const commitments = [
  { name: 'Website & Hosting Uptime', target: 'Reliable, monitored hosting', detail: 'Built on modern, well-supported infrastructure' },
  { name: 'Bug Fixes & Support', target: 'Prompt response', detail: 'Covered under your post-launch support window' },
  { name: 'Deployments & Updates', target: 'Scheduled, low-risk rollouts', detail: 'Tested before going live, with rollback if something breaks' },
  { name: 'Security & Backups', target: 'Regular patching', detail: 'Dependency updates and backups on an ongoing basis' },
]

const practices = [
  'Every update is tested before it goes live, with a plan to roll back quickly if something doesn’t work as expected — no risky, untested changes to a live site.',
  'Bigger changes and maintenance windows are scheduled at low-traffic times to minimize any disruption to your visitors.',
  'Every project includes a post-launch support window (see your project plan) covering bug fixes and minor updates. Ongoing monthly retainers are available after that.',
]

export default function StatusPage() {
  return (
    <>
    <Navbar />
    <main id="main-content" tabIndex={-1} className="home-light bg-white min-h-screen">

      {/* Header — cream, plain */}
      <section className="bg-cream pt-32 sm:pt-40 pb-14 sm:pb-16">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 md:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-ink/70 hover:text-ink transition-colors mb-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink rounded-sm"
          >
            <ArrowLeft size={14} aria-hidden="true" /> Back to Home
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <div className="text-xs font-mono uppercase tracking-wider text-ink/55 mb-5">Support standards</div>
              <h1 className="font-display text-[40px] sm:text-6xl font-extrabold text-ink tracking-tight leading-[1.05]">
                Support &amp; maintenance standards
              </h1>
            </div>
            <p className="lg:col-span-4 text-base text-ink-soft leading-relaxed">
              How we handle deployments, maintenance, and support for the websites and software we build — plain commitments, no fine print.
            </p>
          </div>
        </div>
      </section>

      {/* Commitments table — white */}
      <section className="bg-white py-14 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 md:px-8">
          <table className="w-full text-left border-collapse">
            <caption className="text-left text-xs font-mono uppercase tracking-wider text-ink/55 pb-4">
              What you can expect
            </caption>
            <thead className="hidden md:table-header-group">
              <tr className="border-y border-ink/20">
                <th scope="col" className="py-3 pr-6 text-[11px] font-mono uppercase tracking-wider font-medium text-ink/60 w-[34%]">Area</th>
                <th scope="col" className="py-3 pr-6 text-[11px] font-mono uppercase tracking-wider font-medium text-ink/60 w-[30%]">Our standard</th>
                <th scope="col" className="py-3 text-[11px] font-mono uppercase tracking-wider font-medium text-ink/60">How it works</th>
              </tr>
            </thead>
            <tbody>
              {commitments.map((c) => (
                <tr key={c.name} className="block md:table-row border-b border-border first:border-t md:first:border-t-0 py-5 md:py-0">
                  <th scope="row" className="block md:table-cell md:py-6 md:pr-6 align-top">
                    <span className="flex items-center gap-3">
                      <span aria-hidden="true" className="w-2 h-2 rounded-full bg-accent shrink-0" />
                      <span className="text-base font-bold text-ink tracking-tight">{c.name}</span>
                    </span>
                  </th>
                  <td className="block md:table-cell pl-5 md:pl-0 mt-2 md:mt-0 md:py-6 md:pr-6 align-top">
                    <span className="md:hidden text-[11px] font-mono uppercase tracking-wider text-ink/55 mr-2">Standard:</span>
                    <span className="text-sm font-semibold text-ink">{c.target}</span>
                  </td>
                  <td className="block md:table-cell pl-5 md:pl-0 mt-1 md:mt-0 md:py-6 align-top text-sm text-ink-soft leading-relaxed">
                    {c.detail}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* How we work — cream-dim, numbered */}
      <section className="bg-cream-dim py-16 sm:py-24">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <h2 className="lg:col-span-4 font-display text-2xl sm:text-3xl font-extrabold text-ink tracking-tight leading-tight">
            How we handle maintenance &amp; deployments
          </h2>
          <ol className="lg:col-span-8 space-y-8">
            {practices.map((p, i) => (
              <li key={i} className="grid grid-cols-[auto_1fr] gap-5 sm:gap-8">
                <span className="font-display text-2xl font-extrabold text-ink/30 leading-none pt-0.5">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-base text-ink/80 leading-relaxed">{p}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Ongoing support — ink band */}
      <section className="bg-ink text-white">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 md:px-8 py-14 sm:py-20 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
              Need ongoing support for your website?
            </h2>
            <p className="text-sm sm:text-base text-white/75">
              Ask us about monthly maintenance and support retainers.
            </p>
          </div>
          <Link
            href="/contact"
            className="self-start sm:self-auto inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white font-semibold px-7 py-3.5 text-sm hover:bg-accent-dim transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            Get in touch <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
    </>
  )
}
