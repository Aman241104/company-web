import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { locations } from '@/lib/locations'

// Footer = the site's closing ink-dark band (research/design-system-v2.md):
// the same forest-green used for headline ink elsewhere, doing its second
// job as the dark-section background. Server component — no client state.
//
// Text contrast on ink (#0A1124): cream/white at >=60% opacity clears AA
// (~5.9:1), coral text clears it too (~4.8:1), so small text here never
// drops below /60.

const cols = [
  {
    title: 'Company',
    links: [
      { label: 'Home', href: '/' },
      { label: 'About Us', href: '/about' },
      { label: 'Our Work', href: '/work' },
      { label: 'Vibo ERP', href: '/#products' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Website Development', href: '/services#service-01' },
      { label: 'E-Commerce Development', href: '/services#service-02' },
      { label: 'Custom Software Development', href: '/services#service-05' },
      { label: 'Mobile App Development', href: '/services#service-04' },
      { label: 'Performance Marketing', href: '/services#service-06' },
      { label: 'Technical SEO', href: '/services#service-07' },
    ],
  },
  {
    title: 'More',
    links: [
      { label: 'Industries & Solutions', href: '/solutions' },
      { label: 'Leadership & Team', href: '/about#team' },
      { label: 'Careers', href: 'mailto:careers@mehtatechnologies.com' },
      { label: 'Engineering Labs', href: '/labs' },
      { label: 'Support Standards', href: '/status' },
    ],
  },
  {
    // Crawlable, sitewide links to every real location landing page — the
    // honest-SEO rule: landing pages are linked from the footer, never
    // orphaned doorway pages. Driven straight off `lib/locations.ts`.
    title: 'Locations',
    links: [
      ...locations.map((loc) => ({ label: loc.city, href: `/locations/${loc.slug}` })),
      { label: 'All Locations', href: '/locations' },
    ],
  },
]

const socials = [
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/company/mehta-technologies',
    path: 'M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z',
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/mehtatechnologies',
    path: 'M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.987.01-4.04.059-.976.045-1.505.207-1.858.344-.466.181-.8.398-1.15.748-.35.35-.566.683-.747 1.15-.137.352-.3.881-.344 1.857-.05 1.054-.06 1.37-.06 4.04 0 2.67.01 2.987.06 4.04.045.976.207 1.505.344 1.858.181.466.398.8.748 1.15.35.35.683.566 1.15.747.352.137.881.3 1.857.344 1.054.05 1.37.06 4.04.06 2.67 0 2.987-.01 4.04-.06.976-.045 1.505-.207 1.858-.344.466-.181.8-.398 1.15-.748.35-.35.566-.683.747-1.15.137-.352.3-.881.344-1.857.05-1.054.06-1.37.06-4.04 0-2.67-.01-2.987-.06-4.04-.045-.976-.207-1.505-.344-1.858a3.09 3.09 0 0 0-.748-1.15 3.09 3.09 0 0 0-1.15-.747c-.352-.137-.881-.3-1.857-.344-1.054-.05-1.37-.06-4.04-.06zm0 4.594a5.604 5.604 0 1 1 0 11.208 5.604 5.604 0 0 1 0-11.208zm0 1.802a3.802 3.802 0 1 0 0 7.604 3.802 3.802 0 0 0 0-7.604zm5.838-2.002a1.31 1.31 0 1 1-2.62 0 1.31 1.31 0 0 1 2.62 0z',
  },
]

export default function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-8">
        {/* Closing band: the address itself is the statement, set large —
            not a second "Start a project" button stacked under whatever CTA
            section the page above already ended on. The small circular
            arrow is the third button primitive. */}
        <div className="py-16 sm:py-20 lg:py-24 border-b border-cream/15">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cream/60 mb-5">
            Start a conversation
          </p>
          <a
            href="mailto:hello@mehtatechnologies.com"
            className="group inline-flex flex-wrap items-center gap-x-5 gap-y-3 rounded-lg"
          >
            <span className="font-display text-[26px] leading-[1.1] sm:text-5xl lg:text-[64px] font-semibold tracking-tight text-cream wrap-anywhere decoration-lime decoration-2 underline-offset-[10px] group-hover:underline">
              hello@mehtatechnologies.com
            </span>
            <span
              aria-hidden="true"
              className="w-11 h-11 sm:w-14 sm:h-14 shrink-0 rounded-full bg-accent text-ink inline-flex items-center justify-center transition-transform duration-300 group-hover:-rotate-45"
            >
              <ArrowRight size={20} />
            </span>
          </a>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-14 sm:py-16">
          {/* Brand column */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-flex items-center gap-2.5 rounded-lg" aria-label="Mehta Technologies — home">
              <span className="w-9 h-9 rounded-lg overflow-hidden">
                <Image src="/brand/mehta-logo-icon-light.png" alt="" width={36} height={36} className="w-full h-full object-cover" />
              </span>
              <span className="font-display text-base font-semibold tracking-tight text-cream">Mehta Technologies</span>
            </Link>

            <p className="text-sm text-cream/70 leading-relaxed max-w-sm">
              We build websites, e-commerce stores, and digital solutions that help businesses build their online presence and grow.
            </p>

            <address className="not-italic space-y-1.5 text-sm text-cream/70">
              <p>Ahmedabad, Gujarat, India · Serving clients globally</p>
              <p>
                <a href="mailto:hello@mehtatechnologies.com" className="underline-offset-4 hover:underline hover:text-cream transition-colors">
                  hello@mehtatechnologies.com
                </a>
              </p>
              <p>
                <a href="tel:+919876543210" className="underline-offset-4 hover:underline hover:text-cream transition-colors">
                  +91 98765 43210
                </a>
              </p>
            </address>

            {/* Social — small circular icon buttons (third button primitive). */}
            <ul className="flex items-center gap-2.5 pt-1">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${s.label} (opens in a new tab)`}
                    className="w-10 h-10 rounded-full border border-cream/25 flex items-center justify-center text-cream/80 hover:bg-cream hover:text-ink hover:border-cream transition-colors"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d={s.path} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation columns */}
          <nav aria-label="Footer" className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-10">
            {cols.map((col) => (
              <div key={col.title}>
                <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-cream/60 mb-4">
                  {col.title}
                </h3>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-cream/80 hover:text-cream underline-offset-4 hover:underline transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="py-7 border-t border-cream/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream/60">
          <p>© {new Date().getFullYear()} Mehta Technologies. All rights reserved.</p>
          <ul className="flex items-center gap-6">
            <li>
              <Link href="/privacy" className="hover:text-cream transition-colors">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-cream transition-colors">Terms of Service</Link>
            </li>
            <li>
              <Link href="/locations" className="hover:text-cream transition-colors">Locations</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
