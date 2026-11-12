import Link from 'next/link'
import { ArrowUp, Mail, Phone, MessageCircle } from 'lucide-react'
import { chapters } from '@/lib/services'
import { contact } from '@/lib/site'
import { locations } from '@/lib/locations'
import { Logo } from './Header'
import { Btn, Eyebrow } from './ui'
import ConsultButton from './ConsultButton'

const dev = chapters.find((c) => c.slug === 'development')
const mkt = chapters.find((c) => c.slug === 'digital-marketing')

const cols = [
  {
    title: 'Services',
    links: [
      ...dev.disciplines.map((d) => ({ label: d.title, href: `/services/${d.slug}` })),
      { label: 'Blockchain & Web3', href: '/services/blockchain-web3' },
      { label: 'Digital Marketing', href: '/services/digital-marketing' },
      { label: 'Branding & Designing', href: '/services/designing' },
      { label: 'Vibo ERP', href: '/vibo-erp' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Team', href: '/team' },
      { label: 'Portfolio', href: '/work' },
      { label: 'How We Work', href: '/how-we-work' },
      { label: 'Industries & Solutions', href: '/solutions' },
      { label: 'Engineering Labs', href: '/labs' },
      { label: 'Support Standards', href: '/status' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  { title: 'Marketing', links: mkt.disciplines.map((d) => ({ label: d.title, href: `/services/digital-marketing/${d.slug}` })) },
]

const socials = [
  { label: 'LinkedIn', href: 'https://linkedin.com/company/mehta-technologies', path: 'M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.27c-.97 0-1.75-.79-1.75-1.76s.78-1.76 1.75-1.76 1.75.79 1.75 1.76-.78 1.76-1.75 1.76zm13.5 12.27h-3v-5.6c0-3.37-4-3.11-4 0v5.6h-3v-11h3v1.77c1.4-2.59 7-2.78 7 2.48v6.75z' },
  { label: 'Instagram', href: 'https://instagram.com/mehtatechnologies', path: 'M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.15-3.23 1.66-4.77 4.92-4.92 1.27-.06 1.65-.07 4.85-.07zm0-2.16c-3.26 0-3.67.01-4.95.07-4.36.2-6.78 2.62-6.98 6.98-.06 1.28-.07 1.69-.07 4.95s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98-1.28-.06-1.69-.07-4.95-.07zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z' },
]

// We have one office. The benchmark's 3-card office row keeps its layout,
// but the other two cards describe where we actually serve — no invented addresses.
const places = [
  { name: contact.city, sub: 'Gujarat, India', badge: 'HQ', lines: ['Mehta Technologies', 'Ahmedabad, Gujarat 380001', contact.hours], phones: [{ label: contact.phone, href: contact.tel }], primary: true },
  { name: 'Across Gujarat', sub: 'Service area', lines: locations.filter((l) => l.slug !== 'ahmedabad' && l.slug !== 'mumbai').map((l) => l.city), links: locations.filter((l) => l.slug !== 'ahmedabad' && l.slug !== 'mumbai').map((l) => ({ label: `${l.city} →`, href: `/locations/${l.slug}` })) },
  { name: 'India & abroad', sub: 'Remote delivery', lines: ['Mumbai and across India', 'International clients billed in USD', 'Overlapping working hours'], links: [{ label: 'All locations →', href: '/locations' }] },
]

const linkCls = 'group/link inline-flex min-h-11 items-center gap-2 text-body text-ink-2 md:min-h-0 transition-colors duration-300 hover:text-ink'

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-line bg-surface-2 text-ink">
      <div className="container-site pt-16 sm:pt-20">
        <div className="flex flex-col gap-8 rounded-3xl border border-line bg-bg px-6 py-8 shadow-lift sm:px-10 sm:py-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <Eyebrow>Get in touch</Eyebrow>
            <p className="mt-4 font-display text-h2 text-ink">Tell us about your project.</p>
            <p className="mt-3 text-body text-ink-2">Free consultation, no obligation, and a reply within 24 hours.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:shrink-0">
            <ConsultButton>Start a Project</ConsultButton>
            <Btn href={`mailto:${contact.email}`} variant="secondary" icon={<Mail aria-hidden="true" className="size-4 shrink-0 text-brand-ink" />}>
              {contact.email}
            </Btn>
          </div>
        </div>
      </div>

      <div className="container-site grid gap-12 pt-16 pb-12 sm:pt-20 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <Link href="/" aria-label="Mehta Technologies home" className="inline-flex rounded-lg">
            <Logo size={36} />
          </Link>
          <p className="mt-5 max-w-sm text-lead text-ink-2">Websites, e-commerce, custom software, apps and digital marketing from {contact.city}.</p>
          <ul className="mt-7 flex flex-wrap gap-2.5">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="group/social inline-flex h-11 items-center gap-2 rounded-full border border-line bg-bg pr-4 pl-1.5 text-small font-medium text-ink-2 transition-[color,border-color,translate] duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-line-strong hover:text-ink md:h-10">
                  <span className="grid size-7 place-items-center rounded-full bg-surface text-ink transition-colors duration-300 group-hover/social:bg-brand group-hover/social:text-on-brand">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5" aria-hidden="true">
                      <path d={s.path} />
                    </svg>
                  </span>
                  {s.label}
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
            <li>
              <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="group/social inline-flex h-11 items-center gap-2 rounded-full border border-line bg-bg pr-4 pl-1.5 text-small font-medium text-ink-2 transition-[color,border-color,translate] duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-line-strong hover:text-ink md:h-10">
                <span className="grid size-7 place-items-center rounded-full bg-surface text-ink transition-colors duration-300 group-hover/social:bg-brand group-hover/social:text-on-brand">
                  <MessageCircle className="size-3.5" aria-hidden="true" />
                </span>
                WhatsApp
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-10 lg:col-span-8 lg:grid-cols-[1.1fr_0.9fr_1.25fr_1.05fr] lg:gap-y-8">
          {cols.map((c) => (
            <div key={c.title}>
              <h2 className="font-mono text-eyebrow text-muted uppercase">{c.title}</h2>
              <ul className="mt-4 md:mt-5 md:space-y-3">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={linkCls}>
                      <span className="h-px w-0 shrink-0 bg-brand-ink transition-[width] duration-500 ease-out-expo group-hover/link:w-3" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="col-span-2 sm:col-span-1">
            <h2 className="font-mono text-eyebrow text-muted uppercase">Contact</h2>
            <ul className="mt-4 md:mt-5 md:space-y-3">
              <li><a href={`mailto:${contact.email}`} className="inline-flex min-h-11 items-center text-body break-words text-ink-2 transition-colors duration-300 hover:text-ink md:min-h-0">{contact.email}</a></li>
              <li><a href={contact.tel} className="inline-flex min-h-11 items-center text-body text-ink-2 transition-colors duration-300 hover:text-ink md:min-h-0">{contact.phone}</a></li>
              <li><a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-body text-ink-2 transition-colors duration-300 hover:text-ink md:min-h-0">WhatsApp</a></li>
            </ul>
          </div>
        </nav>
      </div>

      <div className="container-site pb-14">
        <h2 className="font-mono text-eyebrow text-muted uppercase">Where we work</h2>
        <ul className="mt-5 grid gap-4 md:grid-cols-3">
          {places.map((p) => (
            <li key={p.name} className={`relative rounded-2xl border bg-bg p-5 transition-[border-color,box-shadow] duration-500 sm:p-6 ${p.primary ? 'border-brand/45 shadow-lift' : 'border-line'}`}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-h3 font-semibold text-ink">{p.name}</h3>
                  <p className="mt-1 font-mono text-eyebrow text-muted uppercase">{p.sub}</p>
                </div>
                {p.badge && <span className="rounded-full bg-brand-soft px-2.5 py-1 font-mono text-[0.625rem] leading-none tracking-[0.16em] text-brand-ink uppercase">{p.badge}</span>}
              </div>
              <address className="mt-4 text-small text-ink-2 not-italic">
                {p.lines.map((l) => (
                  <span key={l} className="block">{l}</span>
                ))}
              </address>
              <ul className="mt-3 border-t border-line pt-2 md:mt-4 md:space-y-1.5 md:pt-4">
                {(p.phones || []).map((ph) => (
                  <li key={ph.href}>
                    <a href={ph.href} className="inline-flex min-h-11 items-center gap-2 text-small font-medium text-ink tabular-nums transition-colors duration-300 hover:text-brand-ink md:min-h-0">
                      <Phone aria-hidden="true" className="size-3.5 shrink-0 text-brand-ink" />
                      {ph.label}
                    </a>
                  </li>
                ))}
                {(p.links || []).map((l) => (
                  <li key={l.href} className="inline-block mr-4">
                    <Link href={l.href} className="inline-flex min-h-11 items-center text-small font-medium text-ink transition-colors duration-300 hover:text-brand-ink md:min-h-0">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>

      <div className="container-site">
        <div className="flex flex-col gap-4 border-t border-line py-6 pr-16 text-[0.8125rem] leading-relaxed text-muted sm:pr-20 lg:flex-row lg:items-start lg:justify-between lg:gap-8 min-[1400px]:pr-0">
          <p>
            © {new Date().getFullYear()} Mehta Technologies. All rights reserved.
            <span className="block">Ahmedabad, Gujarat, India.</span>
          </p>
          <ul className="flex flex-wrap gap-x-5 md:gap-y-2 lg:max-w-md">
            {[
              ['Privacy Policy', '/privacy'],
              ['Terms of Service', '/terms'],
              ['Refund Policy', '/refund-policy'],
              ['Cookie Policy', '/cookie-policy'],
              ['Disclaimer', '/disclaimer'],
              ['Locations', '/locations'],
            ].map(([l, h]) => (
              <li key={h}>
                <Link href={h} className="inline-flex min-h-11 items-center transition-colors duration-300 hover:text-ink md:min-h-0">{l}</Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-2 lg:items-end lg:text-right">
            <a href="#top" className="inline-flex min-h-11 items-center gap-1.5 font-medium text-ink-2 transition-colors duration-300 hover:text-ink md:min-h-0">
              <ArrowUp aria-hidden="true" className="size-3.5" />
              Back to top
            </a>
          </div>
        </div>
      </div>
      <div className="pointer-events-none overflow-hidden select-none" aria-hidden="true">
        <p className="bg-linear-to-b from-ink/[0.085] to-ink/[0.025] bg-clip-text pt-[0.02em] pb-[0.1em] text-center font-display text-[clamp(2rem,8.4vw,9.5rem)] leading-[0.86] font-bold tracking-[-0.045em] whitespace-nowrap text-transparent uppercase" style={{ transform: 'translateY(42%)' }}>
          Mehta Technologies
        </p>
      </div>
    </footer>
  )
}
