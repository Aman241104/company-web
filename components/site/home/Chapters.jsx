'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDownRight, ArrowUpRight, Smartphone, Rocket, Gauge, Receipt, MessagesSquare, LifeBuoy, Target } from 'lucide-react'
import { chapters } from '@/lib/services'
import { serviceIcon } from '@/lib/serviceMeta'
import { whyUs } from '@/lib/site'
import { Btn, Eyebrow, LineHeading } from '../ui'
import ConsultButton from '../ConsultButton'

gsap.registerPlugin(ScrollTrigger)

const icon = serviceIcon
const whyIcons = [Target, Gauge, Receipt, Smartphone, MessagesSquare, LifeBuoy]

export const chapterHref = (c, d) =>
  c.slug === 'development' ? `/services/${d.slug}` : c.slug === 'blockchain-web3' ? '/services/blockchain-web3' : `/services/${c.slug}/${d.slug}`

function Plate({ Icon }) {
  return (
    <span className="mtx-deck-plate grid place-items-center">
      <Icon aria-hidden="true" strokeWidth={1.6} className="h-[58%] w-auto text-brand-ink" />
    </span>
  )
}

/* ---- "Powerful solutions" list + the WHAT WE DO cover that slides over it ---- */
export function WhatWeDo() {
  const wrap = useRef(null)
  const cover = useRef(null)
  const dim = useRef(null)
  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: wrap.current, start: 'top top', end: '+=100%', scrub: 0.5, pin: true } })
      tl.fromTo(cover.current, { yPercent: 100 }, { yPercent: 0, ease: 'none' }).fromTo(dim.current, { opacity: 0 }, { opacity: 1, ease: 'none' }, 0)
    })
    return () => mm.revert()
  }, [])
  return (
    <section className="relative isolate bg-bg" id="what-we-do">
      <div ref={wrap} className="relative bg-bg lg:motion-safe:h-svh lg:motion-safe:overflow-hidden">
        <div className="relative lg:motion-safe:absolute lg:motion-safe:inset-0">
          <div className="relative flex items-center bg-bg py-section lg:motion-safe:h-full lg:motion-safe:pt-[calc(var(--spacing-nav,4.5rem)+1.5rem)] lg:motion-safe:pb-8">
            <div className="container-site grid w-full gap-9 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-16">
              <div>
                <div data-reveal="true">
                  <Eyebrow>Services</Eyebrow>
                </div>
                <LineHeading lines={['Everything your', 'business needs online']} className="mt-5 font-display text-balance text-h1" />
                <p className="mt-6 max-w-[54ch] text-lead text-ink-2" data-reveal="true">
                  From a first website to custom software, here is what we build. Every project is scoped to your exact requirements.
                </p>
              </div>
              <ul className="border-t border-line">
                {chapters.map((c) => (
                  <li key={c.slug} className="border-b border-line">
                    <a href={`#${c.slug}`} className="group/row flex items-center gap-5 py-3.5 transition-colors duration-300 sm:gap-7 sm:py-5">
                      <span className="w-6 shrink-0 font-mono text-eyebrow text-brand-ink">{c.num}</span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-h3 text-ink transition-colors duration-300 group-hover/row:text-brand-ink">{c.name}</span>
                        <span className="mt-0.5 block text-small text-ink-2">{c.motto.join(' ')}</span>
                      </span>
                      <ArrowDownRight aria-hidden="true" className="size-5 shrink-0 text-muted transition-[transform,color] duration-300 ease-out-expo group-hover/row:translate-x-0.5 group-hover/row:translate-y-0.5 group-hover/row:text-brand-ink" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div ref={dim} className="pointer-events-none absolute inset-0 z-[2] hidden bg-[color-mix(in_oklab,var(--color-bg)_88%,transparent)] opacity-0 lg:motion-safe:block" aria-hidden="true" />
        <div ref={cover} className="relative z-[4] flex h-[max(64svh,26rem)] items-center justify-center overflow-hidden bg-brand-soft text-ink lg:motion-safe:absolute lg:motion-safe:inset-0 lg:motion-safe:h-auto lg:motion-safe:[transform:translateY(100%)]">
          <div className="px-6 text-center">
            <div className="flex flex-col items-center gap-6">
              <Eyebrow>Chapter 01</Eyebrow>
              <p className="font-display text-giant font-bold text-ink uppercase">
                <span className="block">What</span>
                <span className="block">we do</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---- Deck: one full-screen card per chapter, each sliding over the last ---- */
const tones = {
  development: { bg: 'bg-brand-soft', tone: 'soft', rule: 'border-ink/15' },
  'digital-marketing': { bg: 'bg-bg', tone: 'plain', rule: 'border-line-strong' },
  'blockchain-web3': { bg: 'bg-surface-2', tone: 'surface2', rule: 'border-ink/15' },
  designing: { bg: 'bg-paper', tone: 'paper', rule: 'border-ink/15' },
}

function DeckSection({ accent = false, id, label, count, tone, bg, rule, lines, srTitle, lead, chips, cols, children, actions, center }) {
  return (
    <div data-flow-anchor="true" id={id}>
      <section className="relative w-full overflow-clip" aria-labelledby={`deck-${id}-title`} data-flow-section="true">
        <div className={`relative flex min-h-svh w-full origin-[0_100svh] flex-col ${bg} text-ink shadow-[0_-28px_60px_-36px_rgb(10_17_36/0.3)]`} data-flow-inner="true">
          <div className="mtx-deck-panel container-site flex flex-1 flex-col" data-tone={tone} data-center={center ? 'true' : undefined} style={{ '--mtx-deck-lines': lines.length }}>
            <div className="flex items-center justify-between gap-6 text-eyebrow">
              <Eyebrow>{label}</Eyebrow>
              {count && <p className="hidden font-mono text-ink-2 uppercase sm:block">{count}</p>}
            </div>
            <hr className={`mtx-deck-rule border-t ${rule}`} />
            <div className="mtx-deck-lede">
              <div className="mtx-deck-headcell">
                <h2 id={`deck-${id}-title`} className="mtx-deck-headline font-display font-bold text-giant uppercase">
                  {srTitle && <span className="sr-only">{srTitle}: </span>}
                  {lines.map((l, i) => (
                    <span key={l} className={`block ${accent && i === lines.length - 1 ? 'text-brand-gradient' : ''}`}>{l}</span>
                  ))}
                </h2>
              </div>
              {lead && <p className="mtx-deck-lead text-lead text-ink-2">{lead}</p>}
            </div>
            {chips}
            <ul className="mtx-deck-grid" style={{ '--deck-cols-md': cols[0], '--deck-cols-lg': cols[1] }}>
              {children}
            </ul>
            {actions}
          </div>
        </div>
      </section>
    </div>
  )
}

export function Deck() {
  const root = useRef(null)
  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      const secs = gsap.utils.toArray(root.current.querySelectorAll('[data-flow-section]'))
      secs.forEach((sec, i) => {
        const inner = sec.querySelector('[data-flow-inner]')
        if (i < secs.length - 1) ScrollTrigger.create({ trigger: sec, start: 'bottom bottom', pin: true, pinSpacing: false })
        if (i > 0)
          gsap.fromTo(inner, { rotate: -7, yPercent: 6 }, { rotate: 0, yPercent: 0, ease: 'none', scrollTrigger: { trigger: sec, start: 'top bottom', end: 'top top', scrub: 0.4 } })
      })
    })
    return () => mm.revert()
  }, [])

  return (
    <div ref={root} className="relative w-full" id="services">
      {chapters.map((c) => {
        const t = tones[c.slug]
        const many = c.disciplines.length
        return (
          <DeckSection
            key={c.slug}
            id={c.slug}
            label={`${c.num} / ${c.name}`}
            count={`${String(many).padStart(2, '0')} disciplines`}
            {...t}
            lines={c.motto}
            accent={c.slug === 'digital-marketing'}
            srTitle={c.name}
            lead={c.intro}
            cols={[many > 4 ? 3 : 2, 4]}
            chips={
              c.slug === 'blockchain-web3' ? (
                <div className="mtx-deck-chips flex flex-wrap items-center gap-x-5 gap-y-3">
                  <p className="font-mono text-eyebrow text-ink-2 uppercase" id="deck-web3-stack">Stack</p>
                  <ul className="flex flex-wrap gap-2" aria-labelledby="deck-web3-stack">
                    {['Solidity', 'Hardhat', 'Ethereum', 'Polygon', 'IPFS'].map((x) => (
                      <li key={x} className="rounded-full border border-ink/15 bg-bg px-3 py-1 text-small font-medium text-ink sm:px-3.5 sm:py-1.5">{x}</li>
                    ))}
                  </ul>
                </div>
              ) : null
            }
          >
            {c.disciplines.map((d, i) => (
              <li key={d.slug} className={`mtx-deck-card relative border-t ${t.rule}`}>
                <Plate Icon={icon[d.slug] || Rocket} />
                <div className="mtx-deck-body">
                  <h3 className="mtx-deck-title text-h3 font-semibold">
                    <Link href={chapterHref(c, d)} className="group/link inline-flex items-baseline gap-1.5 decoration-1 underline-offset-4 hover:underline max-md:after:absolute max-md:after:inset-0">
                      {d.title}
                      <ArrowUpRight aria-hidden="true" className="size-4 shrink-0 self-center transition-transform duration-300 ease-out-expo group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </Link>
                  </h3>
                  <p className="mtx-deck-meta text-small">
                    <span className="mtx-deck-index font-mono text-eyebrow text-brand-ink" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                    <span className="font-medium text-ink">{d.tagline}</span>
                  </p>
                  {c.slug === 'development' ? (
                    <ul className="mtx-deck-note mtx-deck-caps text-small text-ink-2" aria-label={`${d.title} capabilities`}>
                      {d.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mtx-deck-note text-small text-ink-2">{d.desc}</p>
                  )}
                </div>
              </li>
            ))}
          </DeckSection>
        )
      })}
      <DeckSection
        id="why-us"
        label="05 / Why choose us"
        tone="surface"
        bg="bg-surface"
        rule="border-line-strong"
        center
        lines={['Why businesses', 'choose Mehta']}
        cols={[2, 3]}
        actions={
          <div className="mtx-deck-actions flex flex-wrap items-center gap-3">
            <ConsultButton>Start a Project</ConsultButton>
            <Btn href="/work" variant="secondary">See Our Work</Btn>
          </div>
        }
      >
        {whyUs.map((r, i) => {
          const I = whyIcons[i]
          return (
            <li key={r.title} className="mtx-deck-card border-t border-line-strong">
              <Plate Icon={I} />
              <div className="mtx-deck-body">
                <h3 className="mtx-deck-title text-h3 font-semibold">{r.title}</h3>
                <p className="mtx-deck-meta text-small">
                  <span className="mtx-deck-index font-mono text-eyebrow text-brand-ink" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <span className="font-medium text-ink">{r.tag}</span>
                </p>
                <p className="mtx-deck-note text-small text-ink-2">{r.desc}</p>
              </div>
            </li>
          )
        })}
      </DeckSection>
    </div>
  )
}
