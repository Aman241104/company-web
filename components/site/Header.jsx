'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, ChevronDown, Phone, MessageCircle, Mail } from 'lucide-react'
import { chapters } from '@/lib/services'
import { contact } from '@/lib/site'
import { btnClass, Arrow } from './ui'
import ThemeSwitch from './ThemeSwitch'
import { openConsult } from './consult'

const nav = [
  { label: 'Work', href: '/work' },
  { label: 'How We Work', href: '/how-we-work' },
  { label: 'About', href: '/about' },
  { label: 'Team', href: '/team' },
]

// Mega-menu columns: Development (2-col grid) | Digital Marketing | Designing,
// Blockchain listed under Development like the benchmark.
const devCol = chapters.find((c) => c.slug === 'development')
const web3 = chapters.find((c) => c.slug === 'blockchain-web3')
const megaCols = [
  { num: '01', name: devCol.name, href: '/services#development', items: [...devCol.disciplines.map((d) => ({ title: d.title, tagline: d.tagline, href: `/services/${d.slug}` })), { title: web3.name, tagline: web3.motto.join(' '), href: '/services/blockchain-web3' }], two: true },
  ...['digital-marketing', 'designing'].map((slug, i) => {
    const c = chapters.find((x) => x.slug === slug)
    return { num: `0${i + 2}`, name: c.name, href: `/services/${c.slug}`, items: c.disciplines.map((d) => ({ title: d.title, tagline: d.tagline, href: `/services/${c.slug}/${d.slug}` })) }
  }),
]

export function Logo({ size = 30, className = '' }) {
  // Brand lockup: the M mark (transparent PNG cut from the brand kit) +
  // Montserrat wordmark set in HTML so it re-colours with the theme.
  return (
    <span className={`inline-flex items-center gap-2 ${className}`} style={{ height: size, fontSize: size }}>
      <Image src="/brand/mark-ink.png" alt="" width={345} height={256} priority className="h-full w-auto select-none dark:hidden" />
      <Image src="/brand/mark-white.png" alt="" width={345} height={256} priority className="hidden h-full w-auto select-none dark:block" />
      <span className="flex flex-col justify-center leading-none">
        <span className="font-logo font-bold tracking-[0.06em] text-ink" style={{ fontSize: '0.6em' }}>MEHTA</span>
        <span className="mt-[0.18em] font-logo font-medium tracking-[0.2em] text-ink-2" style={{ fontSize: '0.27em' }}>TECHNOLOGIES</span>
      </span>
      <span className="sr-only">Mehta Technologies</span>
    </span>
  )
}

const tab =
  'group/tab relative inline-flex h-10 items-center gap-1 rounded-full px-3.5 text-small font-medium tracking-[-0.01em] transition-colors duration-300'
const underline =
  'pointer-events-none absolute inset-x-3.5 bottom-1 h-[1.5px] rounded-full bg-brand-ink transition-[scale] duration-500 ease-out-expo group-hover/tab:origin-left group-hover/tab:scale-x-100 group-focus-visible/tab:origin-left group-focus-visible/tab:scale-x-100'

function isActive(path, href) {
  return path === href || path.startsWith(href + '/')
}

export default function Header() {
  const path = usePathname() || '/'
  const [scrolled, setScrolled] = useState(false)
  const [mega, setMega] = useState(false)
  const [menu, setMenu] = useState(false)
  const [svcOpen, setSvcOpen] = useState(false)
  const closeT = useRef(null)

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  // Close menus on navigation (state adjusted during render, not in an effect).
  const [lastPath, setLastPath] = useState(path)
  if (lastPath !== path) {
    setLastPath(path)
    setMega(false)
    setMenu(false)
  }
  useEffect(() => {
    document.documentElement.style.overflow = menu ? 'hidden' : ''
    const esc = (e) => e.key === 'Escape' && (setMenu(false), setMega(false))
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [menu])

  const openMega = () => {
    clearTimeout(closeT.current)
    setMega(true)
  }
  const closeMega = () => {
    closeT.current = setTimeout(() => setMega(false), 120)
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 h-nav" onMouseLeave={closeMega}>
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 -z-10 border-b border-line bg-bg shadow-nav transition-opacity duration-500 ease-smooth ${scrolled || mega ? 'opacity-100' : 'opacity-0'}`}
        />
        <div className="h-full">
          <div className="container-site flex h-full items-center justify-between gap-3 xl:grid xl:grid-cols-[1fr_auto_1fr] xl:gap-6">
            <Link href="/" aria-label="Mehta Technologies home" className="-ml-1 inline-flex shrink-0 items-center rounded-lg p-1 transition-opacity duration-300 hover:opacity-75">
              <Logo />
            </Link>
            <nav className="hidden xl:block" aria-label="Primary">
              <ul className="flex items-center gap-0.5">
                <li onMouseEnter={openMega}>
                  <button
                    type="button"
                    aria-expanded={mega}
                    aria-controls="mega-menu"
                    onClick={() => setMega((v) => !v)}
                    className={`${tab} ${mega || path.startsWith('/services') ? 'text-ink' : 'text-ink-2 hover:text-ink'}`}
                  >
                    Services
                    <ChevronDown aria-hidden="true" className={`size-3.5 shrink-0 transition-transform duration-500 ease-out-expo ${mega ? 'rotate-180' : ''}`} />
                    <span className={`${underline} ${mega || path.startsWith('/services') ? 'origin-left scale-x-100' : 'origin-right scale-x-0'}`} />
                  </button>
                </li>
                {nav.map((n) => (
                  <li key={n.href} onMouseEnter={closeMega}>
                    <Link href={n.href} aria-current={isActive(path, n.href) ? 'page' : undefined} className={`${tab} ${isActive(path, n.href) ? 'text-ink' : 'text-ink-2 hover:text-ink'}`}>
                      {n.label}
                      <span className={`${underline} ${isActive(path, n.href) ? 'origin-left scale-x-100' : 'origin-right scale-x-0'}`} />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex items-center justify-end gap-2 sm:gap-3">
              <ThemeSwitch className="hidden h-10 w-[7.75rem] sm:grid" />
              <a href={contact.tel} className="hidden h-10 items-center gap-2 rounded-full px-2 text-small font-medium whitespace-nowrap text-ink-2 transition-colors duration-300 hover:text-brand-ink lg:inline-flex">
                <Phone aria-hidden="true" className="size-4 shrink-0 text-brand-ink" />
                <span className="sr-only">Call {contact.city}:</span>
                <span className="tabular-nums">{contact.phone}</span>
              </a>
              <button type="button" onClick={() => openConsult()} className={btnClass('primary', 'md', 'max-sm:hidden')}>
                <span>Contact Us</span>
                <Arrow />
              </button>
              <a href={contact.tel} aria-label={`Call ${contact.city}: ${contact.phone}`} className="grid size-11 shrink-0 place-items-center rounded-full border border-line bg-bg text-ink transition-colors duration-300 hover:border-line-strong hover:text-brand-ink lg:hidden">
                <Phone aria-hidden="true" className="size-[1.125rem]" />
              </a>
              <button
                type="button"
                aria-label="Open menu"
                aria-expanded={menu}
                aria-controls="site-menu"
                onClick={() => setMenu(true)}
                className="relative grid size-11 shrink-0 place-items-center rounded-full border border-line bg-bg text-ink transition-colors duration-300 hover:border-line-strong hover:bg-surface xl:hidden"
              >
                <span className="relative block h-[11px] w-[18px]" aria-hidden="true">
                  <span className="absolute top-0 left-0 block h-[1.5px] w-full rounded-full bg-current" />
                  <span className="absolute top-[10px] left-0 block h-[1.5px] w-full rounded-full bg-current" />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Mega menu */}
        <div
          id="mega-menu"
          onMouseEnter={openMega}
          className={`absolute inset-x-0 top-full hidden border-b border-line bg-bg shadow-nav transition-[opacity,transform] duration-300 ease-out-expo xl:block ${mega ? 'opacity-100' : 'pointer-events-none -translate-y-2 opacity-0'}`}
          inert={!mega}
        >
          <div className="container-site">
            <div className="grid grid-cols-[1.35fr_1fr_1fr] gap-x-10 border-t border-line pt-8 pb-6">
              {megaCols.map((col) => (
                <div key={col.num} className="min-w-0">
                  <Link href={col.href} className="group/head mb-3 flex items-baseline gap-3 rounded-lg px-3 py-1.5 transition-colors duration-300 hover:bg-surface">
                    <span className="font-mono text-eyebrow text-brand-ink">{col.num}</span>
                    <span className="font-display text-h3 font-semibold text-ink">{col.name}</span>
                    <ArrowUpRight aria-hidden="true" className="size-4 shrink-0 self-center text-brand-ink opacity-0 transition-[opacity,transform] duration-300 ease-out-expo group-hover/head:translate-x-0.5 group-hover/head:-translate-y-0.5 group-hover/head:opacity-100" />
                  </Link>
                  <ul className={`grid gap-x-4 gap-y-0.5 ${col.two ? 'grid-cols-2' : ''}`}>
                    {col.items.map((it) => (
                      <li key={it.href} className="min-w-0">
                        <Link href={it.href} className="group/leaf block rounded-xl px-3 py-2.5 transition-colors duration-300 hover:bg-surface focus-visible:bg-surface">
                          <span className="flex items-center gap-1.5 text-small font-medium text-ink">
                            <span className="truncate">{it.title}</span>
                            <ArrowUpRight aria-hidden="true" className="size-3.5 shrink-0 text-brand-ink opacity-0 transition-[opacity,transform] duration-300 ease-out-expo group-hover/leaf:translate-x-0.5 group-hover/leaf:-translate-y-0.5 group-hover/leaf:opacity-100" />
                          </span>
                          <span className="mt-0.5 block truncate text-[0.8125rem] leading-snug text-muted">{it.tagline}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between gap-6 border-t border-line py-4">
              <div className="flex items-center gap-2">
                <a href={contact.tel} className="inline-flex items-center gap-2.5 rounded-full px-3 py-2 text-small text-ink-2 transition-colors duration-300 hover:text-brand-ink">
                  <Phone aria-hidden="true" className="size-4 shrink-0 text-brand-ink" />
                  <span>{contact.city} HQ</span>
                  <span className="text-line-strong" aria-hidden="true">/</span>
                  <span className="font-medium text-ink tabular-nums">{contact.phone}</span>
                </a>
                <span className="h-4 w-px bg-line" aria-hidden="true" />
                <Link href="/services" className="group/all inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-small font-medium text-ink transition-colors duration-300 hover:text-brand-ink">
                  All services
                  <ArrowUpRight aria-hidden="true" className="size-3.5 transition-transform duration-300 ease-out-expo group-hover/all:translate-x-0.5 group-hover/all:-translate-y-0.5" />
                </Link>
                <span className="h-4 w-px bg-line" aria-hidden="true" />
                <Link href="/vibo-erp" className="group/studio inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-small font-medium text-ink transition-colors duration-300 hover:text-brand-ink">
                  Vibo ERP
                  <ArrowUpRight aria-hidden="true" className="size-3.5 transition-transform duration-300 ease-out-expo group-hover/studio:translate-x-0.5 group-hover/studio:-translate-y-0.5" />
                </Link>
              </div>
              <button type="button" onClick={() => openConsult()} className={btnClass('primary', 'md')}>
                <span>Start a Project</span>
                <Arrow />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        id="site-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        inert={!menu}
        data-lenis-prevent=""
        className="fixed inset-0 z-60 flex h-dvh flex-col overflow-y-auto overscroll-contain bg-bg outline-none transition-[clip-path,opacity] duration-500 ease-out-expo xl:hidden"
        style={{ clipPath: menu ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)', opacity: menu ? 1 : 0 }}
      >
        <div className="container-site flex h-nav shrink-0 items-center justify-between">
          <Link href="/" aria-label="Home" className="rounded-lg" onClick={() => setMenu(false)}>
            <Logo size={32} />
          </Link>
          <button type="button" aria-label="Close menu" onClick={() => setMenu(false)} className="relative grid size-11 shrink-0 place-items-center rounded-full border border-line bg-bg text-ink transition-colors duration-300 hover:border-line-strong hover:bg-surface">
            <span className="relative block h-[11px] w-[18px]" aria-hidden="true">
              <span className="absolute left-0 block h-[1.5px] w-full rounded-full bg-current" style={{ top: 5, transform: 'rotate(45deg)' }} />
              <span className="absolute left-0 block h-[1.5px] w-full rounded-full bg-current" style={{ top: 5, transform: 'rotate(-45deg)' }} />
            </span>
          </button>
        </div>
        <div className="container-site flex flex-1 flex-col pt-4 pb-[max(2rem,env(safe-area-inset-bottom))]">
          <nav aria-label="Menu">
            <ul className="border-t border-line">
              {[{ label: 'Services', href: '/services' }, ...nav].map((n, i) => (
                <li key={n.href} className="border-b border-line">
                  <div className="flex items-center gap-2">
                    <Link href={n.href} onClick={() => setMenu(false)} className="group flex min-h-16 flex-1 items-baseline gap-4 py-4 text-ink">
                      <span className="w-6 shrink-0 font-mono text-eyebrow text-muted">{String(i + 1).padStart(2, '0')}</span>
                      <span className="font-display text-[clamp(1.75rem,1.3rem+2vw,2.5rem)] leading-none font-bold tracking-[-0.035em] uppercase transition-colors duration-300 group-active:text-brand-ink">{n.label}</span>
                    </Link>
                    {i === 0 && (
                      <button type="button" aria-expanded={svcOpen} aria-controls="menu-services" aria-label="Show services" onClick={() => setSvcOpen((v) => !v)} className="grid size-11 shrink-0 place-items-center rounded-full border border-line text-ink-2 transition-colors duration-300 hover:bg-surface">
                        <ChevronDown aria-hidden="true" className={`size-5 transition-transform duration-500 ease-out-expo ${svcOpen ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </div>
                  {i === 0 && svcOpen && (
                    <div id="menu-services" className="grid gap-6 pb-6 pl-10">
                      {megaCols.map((col) => (
                        <div key={col.num}>
                          <Link href={col.href} onClick={() => setMenu(false)} className="font-mono text-eyebrow text-brand-ink uppercase">{col.num} · {col.name}</Link>
                          <ul className="mt-2 space-y-1">
                            {col.items.map((it) => (
                              <li key={it.href}>
                                <Link href={it.href} onClick={() => setMenu(false)} className="block py-1.5 text-body text-ink-2 hover:text-ink">{it.title}</Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <p className="font-mono text-eyebrow text-muted uppercase">Theme</p>
            <ThemeSwitch className="grid h-12 w-[10.5rem]" large />
          </div>
          <div className="mt-6">
            <button type="button" onClick={() => { setMenu(false); openConsult() }} className={btnClass('primary', 'lg', 'w-full')}>
              <span>Start a Project</span>
              <Arrow />
            </button>
          </div>
          <ul className="mt-8 grid gap-2 sm:grid-cols-3">
            {[
              { label: contact.city, badge: 'HQ', value: contact.phone, href: contact.tel, Icon: Phone },
              { label: 'WhatsApp', value: 'Chat with us', href: contact.whatsapp, Icon: MessageCircle },
              { label: 'Email', value: contact.email, href: `mailto:${contact.email}`, Icon: Mail },
            ].map((c) => (
              <li key={c.label}>
                <a href={c.href} className="flex items-center gap-3 rounded-2xl border border-line bg-surface px-4 py-3 transition-colors duration-300 hover:border-line-strong">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-soft text-brand-ink">
                    <c.Icon aria-hidden="true" className="size-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-2 text-small font-medium text-ink">
                      {c.label}
                      {c.badge && <span className="rounded-full bg-brand-soft px-1.5 py-0.5 font-mono text-[0.625rem] leading-none tracking-[0.12em] text-brand-ink">{c.badge}</span>}
                    </span>
                    <span className="block truncate text-small text-ink-2 tabular-nums">{c.value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
