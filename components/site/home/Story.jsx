'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronLeft, ChevronRight, Plus, Phone, Mail, ArrowUpRight, MessageCircle } from 'lucide-react'
import { caseStudiesData } from '@/lib/caseStudies'
import { contact, processSteps, industries } from '@/lib/site'
import { faqs } from '@/lib/faqs'
import { team } from '@/lib/team'
import { Btn, Eyebrow, LineHeading, btnClass } from '../ui'
import ConsultButton from '../ConsultButton'
import EnquiryForm from '../EnquiryForm'

gsap.registerPlugin(ScrollTrigger)

function useClock() {
  const [t, setT] = useState('--:--')
  useEffect(() => {
    const f = () => setT(new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: contact.timezone }).format(new Date()))
    f()
    const id = setInterval(f, 20000)
    return () => clearInterval(id)
  }, [])
  return t
}

/* ---------------- How we work: CSS laptop + four stage cards ---------------- */
const screens = [
  { title: 'Discovery call', rows: ['Goals & audience', 'Existing site review', 'Feature list', 'Budget & timeline'] },
  { title: 'Design & prototype', rows: ['Wireframes', 'Visual design', 'Clickable prototype', 'Your feedback'] },
  { title: 'Build on staging', rows: ['Live staging link', 'Sprint 1 · done', 'Sprint 2 · in progress', 'QA checklist'] },
  { title: 'Launch & support', rows: ['Deployed to production', 'Speed 100 / 100', 'Code & IP handed over', 'SLA support active'] },
]

export function Process() {
  const stage = useRef(null)
  const [step, setStep] = useState(-1)
  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const st = ScrollTrigger.create({
        trigger: stage.current,
        start: 'top top',
        end: '+=260%',
        pin: true,
        onUpdate: (s) => setStep(Math.min(3, Math.floor(s.progress * 4.6) - 1)),
      })
      return () => st.kill()
    })
    return () => mm.revert()
  }, [])
  const s = screens[Math.max(0, step)]
  const pos = ['lg:top-[6%] lg:left-0', 'lg:top-[18%] lg:right-0', 'lg:bottom-[6%] lg:left-0', 'lg:bottom-[18%] lg:right-0']
  return (
    <section className="relative bg-surface pb-section" aria-labelledby="process-heading" id="process">
      <div ref={stage} className="relative lg:motion-safe:h-svh lg:motion-safe:overflow-hidden">
        <div className={`container-site pt-section pb-10 lg:pb-6 lg:motion-safe:absolute lg:motion-safe:inset-x-0 lg:motion-safe:top-[calc(var(--spacing-nav)+6vh)] lg:motion-safe:z-10 lg:motion-safe:pt-0 lg:motion-safe:transition-opacity lg:motion-safe:duration-500 ${step >= 0 ? 'lg:motion-safe:pointer-events-none lg:motion-safe:opacity-0' : ''}`}>
          <div data-reveal="true">
            <Eyebrow>Chapter 03</Eyebrow>
          </div>
          <LineHeading id="process-heading" lines={['How we work']} className="mt-5 font-display text-balance text-h1" />
          <p className="mt-5 max-w-[40ch] text-h3 text-balance text-ink">How we turn ideas into live products</p>
          <p className="mt-3 max-w-[54ch] text-lead text-ink-2">Four steps, a fixed-price milestone proposal and a live staging link. You are involved at every stage.</p>
        </div>
        <div className="relative hidden lg:motion-safe:absolute lg:motion-safe:inset-0 lg:motion-safe:block" aria-hidden="true">
          <div className="mtx-proc-css transition-opacity duration-700" style={{ opacity: step >= 0 ? 1 : 0.0 }}>
            <div className="mtx-proc-css__rig" style={{ '--proc-yaw': `${-24 + Math.max(0, step) * 12}deg` }}>
              <div className="mtx-proc-css__lid">
                <div className="mtx-proc-css__front">
                  <div className="flex h-full w-full overflow-hidden rounded-[1.5%/2.3%] bg-bg text-ink">
                    <div className="w-[26%] border-r border-line bg-surface p-[3%]">
                      <div className="font-display text-[11px] font-bold tracking-[0.06em]">MEHTA</div>
                      {processSteps.map((p, i) => (
                        <div key={p.num} className={`mt-[8%] rounded px-1 py-0.5 text-[8px] ${i === Math.max(0, step) ? 'bg-brand-soft text-brand-ink' : 'text-muted'}`}>{p.num} {p.title.split(' ')[0]}</div>
                      ))}
                    </div>
                    <div className="flex-1 p-[4%]">
                      <div className="font-mono text-[7px] tracking-[0.14em] text-brand-ink uppercase">Stage {processSteps[Math.max(0, step)].num}</div>
                      <div className="mt-1 text-[13px] font-semibold">{s.title}</div>
                      <div className="mt-[5%] space-y-[4%]">
                        {s.rows.map((r, i) => (
                          <div key={r} className="flex items-center gap-2 rounded-md border border-line px-2 py-1.5 text-[9px]">
                            <span className={`size-1.5 rounded-full ${i <= Math.max(0, step) ? 'bg-brand' : 'bg-line-strong'}`} />
                            {r}
                          </div>
                        ))}
                      </div>
                      <div className="mt-[6%] h-1 overflow-hidden rounded-full bg-surface-2">
                        <div className="h-full rounded-full bg-brand transition-[width] duration-700" style={{ width: `${(Math.max(0, step) + 1) * 25}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mtx-proc-css__back" />
              </div>
              <div className="mtx-proc-css__base">
                <div className="mtx-proc-css__keys" />
                <div className="mtx-proc-css__pad" />
              </div>
            </div>
            <div className="mtx-proc-css__floor" />
          </div>
        </div>
        <ol className="container-site grid gap-5 lg:grid-cols-2 lg:gap-6 lg:motion-safe:pointer-events-none lg:motion-safe:absolute lg:motion-safe:inset-x-0 lg:motion-safe:top-[calc(var(--spacing-nav)+2vh)] lg:motion-safe:bottom-[6vh] lg:motion-safe:block" aria-label="Our process, in four stages">
          {processSteps.map((p, i) => {
            const on = step === i
            const seen = step >= i
            return (
              <li
                key={p.num}
                className={`relative pl-12 lg:pl-0 lg:motion-safe:absolute lg:motion-safe:w-[min(22rem,28vw)] lg:motion-safe:transition-[opacity,transform] lg:motion-safe:duration-700 lg:motion-safe:ease-out-expo ${pos[i]} ${seen ? '' : 'lg:motion-safe:translate-y-6 lg:motion-safe:opacity-0'}`}
                data-reveal="true"
              >
                <span className="absolute top-0 -bottom-5 left-4 w-px bg-line-strong lg:hidden" aria-hidden="true" />
                <span className="absolute top-6 left-0 grid size-8 place-items-center rounded-full border border-line-strong bg-bg font-mono text-[0.6875rem] text-brand-ink lg:hidden" aria-hidden="true">{p.num}</span>
                <article className={`min-w-0 rounded-3xl border bg-bg p-6 transition-[box-shadow,border-color,opacity] duration-500 ease-out-expo ${on ? 'border-brand/40 shadow-float' : 'border-line shadow-lift'} ${seen && !on ? 'lg:motion-safe:opacity-60' : ''}`}>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-eyebrow text-brand-ink">{p.num}</span>
                    <span className="h-px flex-1 bg-line" aria-hidden="true" />
                  </div>
                  <h3 className="mt-3 text-h3 text-ink">{p.title}</h3>
                  <p className="mt-2 text-small text-ink-2">{p.text}</p>
                  <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={`${p.title}: deliverables`}>
                    {p.items.map((it) => (
                      <li key={it} className="rounded-full bg-brand-soft px-2.5 py-1 text-[0.75rem] leading-snug text-brand-ink">{it}</li>
                    ))}
                  </ul>
                </article>
              </li>
            )
          })}
        </ol>
        <div className="pointer-events-none absolute inset-x-0 bottom-[2.5vh] hidden justify-center lg:motion-safe:flex" aria-hidden="true">
          <p className="flex items-center gap-2 font-mono text-eyebrow text-muted">
            {processSteps.map((p, i) => (
              <span key={p.num} className={`h-1 rounded-full transition-all duration-500 ${i === step ? 'w-8 bg-brand' : 'w-1 bg-line-strong'}`} />
            ))}
          </p>
        </div>
      </div>
    </section>
  )
}

/* ---------------- Industries coverflow ---------------- */
const indStars = Array.from({ length: 34 }, (_, k) => ({ t: (k * 37) % 97, l: (k * 53) % 99, s: 1.5 + ((k * 7) % 3), d: (k * 0.37) % 4 }))
export function Industries() {
  const [i, setI] = useState(0)
  const drag = useRef(null)
  const list = industries.map((ind) => ({ ...ind, study: caseStudiesData[ind.work[0]] }))
  const n = list.length
  const go = (k) => setI(((k % n) + n) % n)
  const tones = ['bg-brand-soft', 'bg-bg', 'bg-surface-2', 'bg-paper']
  return (
    <section className="relative overflow-x-clip bg-bg pb-[clamp(5rem,4rem+5vw,9rem)]" id="industries">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {indStars.map((s, k) => (
          <span key={k} className="mtx-ind-star absolute rounded-full" style={{ top: `${s.t}%`, left: `${s.l}%`, width: s.s, height: s.s, background: 'color-mix(in oklab, var(--color-brand) 55%, transparent)', animationDelay: `${s.d}s` }} />
        ))}
      </div>
      <div className="relative flex flex-col items-center justify-center overflow-hidden px-5 pt-section pb-[clamp(2.5rem,1.5rem+3vw,4.5rem)] text-center">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(color-mix(in oklab, var(--color-ink) 10%, transparent) 1px, transparent 1px)', backgroundSize: '32px 32px', maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)' }} />
        </div>
        <div className="relative mx-auto flex flex-col items-center text-center">
          <div data-reveal="true">
            <Eyebrow>Industries</Eyebrow>
          </div>
          <LineHeading lines={['Industries', 'we work with']} className="mt-5 font-display text-balance text-h1" />
          <p className="mt-6 max-w-[54ch] text-lead text-ink-2" data-reveal="true">From clinics to manufacturers, we build around how each sector actually sells — these are the ones we have shipped for.</p>
        </div>
      </div>
      <div className="relative z-[1] px-5">
        <div className="mtx-ind-stage relative" role="region" aria-roledescription="carousel" aria-label="Industries we work with">
          <span className="mtx-ind-ground" aria-hidden="true" />
          <ul
            className="mtx-ind-track"
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'ArrowRight' ? go(i + 1) : e.key === 'ArrowLeft' ? go(i - 1) : null)}
            onPointerDown={(e) => (drag.current = e.clientX)}
            onPointerUp={(e) => {
              if (drag.current == null) return
              const dx = e.clientX - drag.current
              drag.current = null
              if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1))
            }}
          >
            {list.map((ind, k) => {
              let off = k - i
              if (off > n / 2) off -= n
              if (off < -n / 2) off += n
              const a = Math.abs(off)
              return (
                <li
                  key={ind.name}
                  className="mtx-ind-slide transition-[transform,opacity] duration-700 ease-out-expo md:[transform:var(--t)]"
                  style={{ '--t': `translateX(${off * 58}%) translateZ(${-a * 140}px) rotateY(${-off * 28}deg)`, zIndex: 20 - a, opacity: a > 3 ? 0 : 1 }}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${k + 1} of ${n}: ${ind.name}`}
                  onClick={() => off !== 0 && go(k)}
                >
                  <div className="mtx-ind-card">
                    <article className={`relative flex h-full flex-col justify-between overflow-hidden p-6 text-ink ${tones[k % tones.length]}`}>
                      <span className="relative -mx-6 -mt-6 block overflow-hidden">
                        {ind.study?.heroImage && <Image src={ind.study.heroImage} alt="" width={640} height={427} className="block aspect-[3/2] size-full object-cover object-top" />}
                        <span className="absolute top-3 right-3 rounded-full bg-bg/90 px-2.5 py-1 font-mono text-eyebrow text-ink">{String(k + 1).padStart(2, '0')}</span>
                      </span>
                      <div className="relative">
                        <h3 className="font-display text-[clamp(1.375rem,1.2rem+0.5vw,1.625rem)] leading-[1.12] font-semibold text-balance">{ind.name}</h3>
                        <p className="mt-2.5 text-small text-ink-2">{ind.text}</p>
                        <p className="mt-3 text-small">
                          {ind.work.map((w) =>
                            caseStudiesData[w] ? (
                              <Link key={w} href={`/work/${w}`} className="mr-3 font-medium text-brand-ink hover:underline">{caseStudiesData[w].name} →</Link>
                            ) : null
                          )}
                        </p>
                      </div>
                    </article>
                    <span className="mtx-ind-scrim transition-opacity duration-500" aria-hidden="true" style={{ opacity: Math.min(0.55, a * 0.18) }} />
                  </div>
                </li>
              )
            })}
          </ul>
          <div className="mtx-ind-controls mt-10 flex items-center justify-center gap-5 sm:gap-7">
            <button type="button" className="mtx-ind-arrow" aria-label="Previous card" onClick={() => go(i - 1)}>
              <ChevronLeft aria-hidden="true" className="size-5" />
            </button>
            <ul className="flex items-center gap-1.5 sm:gap-2" aria-label="Choose a card">
              {list.map((ind, k) => (
                <li key={ind.name}>
                  <button type="button" className="mtx-ind-dot" aria-current={k === i} aria-label={ind.name} onClick={() => go(k)} />
                </li>
              ))}
            </ul>
            <button type="button" className="mtx-ind-arrow" aria-label="Next card" onClick={() => go(i + 1)}>
              <ChevronRight aria-hidden="true" className="size-5" />
            </button>
            <p className="hidden font-mono text-eyebrow text-muted uppercase tabular-nums sm:block">
              <span className="text-brand-ink">{String(i + 1).padStart(2, '0')}</span>
              <span className="px-1.5 text-line-strong">/</span>
              {String(n).padStart(2, '0')}
            </p>
          </div>
          <p className="sr-only" aria-live="polite">{`${i + 1} of ${n}: ${list[i].name}`}</p>
        </div>
      </div>
    </section>
  )
}

/* ---------------- About: zoom collage into the HQ card ---------------- */
const frames = [
  ['b', '0vw', '-31svh', '56vw', '20svh', '5vw', '-29svh', '35vw', '28svh', 'silver-spoon'],
  ['a', '-36vw', '-8svh', '24vw', '30svh', '-25vw', '-10svh', '20vw', '45svh', 'sv-space-designs'],
  ['b', '36vw', '6svh', '24vw', '26svh', '27.5vw', '0svh', '25vw', '25svh', 'prihaan-spices'],
  ['a', '8vw', '33svh', '40vw', '20svh', '5vw', '27.5svh', '20vw', '25svh', 'fgp-industries'],
  ['a', '-32vw', '31svh', '30vw', '16svh', '-22.5vw', '27.5svh', '30vw', '25svh', 'rising-rechargeable'],
  ['b', '38vw', '-24svh', '20vw', '12svh', '25vw', '22.5svh', '15vw', '15svh', 'chahana-dental'],
]
const aboutLead = 'The people who scope your project are the people who build it. You talk to them directly, and you get a live staging link and regular updates rather than a status report.'
const aboutBody = 'Mehta Technologies is a web development studio founded in Ahmedabad in 2019. We build websites, e-commerce stores, custom software and apps — including our own ERP, Vibo — and run the digital marketing for the businesses we build for.'

function Words({ text, accent = [] }) {
  return text.split(' ').map((w, k) => (
    <span key={k} className="mtx-about-word" data-accent={accent.includes(k) ? '' : undefined}>
      {w}{' '}
    </span>
  ))
}

export function About() {
  const zoom = useRef(null)
  const layer = useRef(null)
  const words = useRef(null)
  const t = useClock()
  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const big = innerWidth >= 1024 ? 4 : 2.5
      gsap.fromTo(layer.current, { scale: 1 }, { scale: big, ease: 'power1.in', scrollTrigger: { trigger: zoom.current, start: 'top top', end: 'bottom bottom', scrub: 0.5 } })
      const ws = words.current.querySelectorAll('.mtx-about-word')
      ws.forEach((w) => w.style.setProperty('--mtx-ink', '0'))
      ScrollTrigger.create({
        trigger: words.current,
        start: 'top 80%',
        end: 'bottom 45%',
        onUpdate: (s) => ws.forEach((w, k) => w.style.setProperty('--mtx-ink', String(Math.min(1, Math.max(0, s.progress * ws.length * 1.15 - k))))),
      })
    })
    return () => mm.revert()
  }, [])
  const cells = [
    { num: '01', badge: 'HQ', title: contact.city, sub: 'Gujarat, India', big: t, foot: 'Local time' },
    { num: '02', title: 'Working hours', sub: 'Monday to Friday', big: '9–18', foot: 'IST' },
    { num: '03', title: 'Replies', sub: 'Every new enquiry', big: '24h', foot: 'Response time' },
  ]
  return (
    <section className="relative scroll-mt-nav border-t border-line bg-bg" id="about">
      <div className="container-site pt-section pb-[clamp(2.5rem,5vw,5rem)]">
        <div data-reveal="true">
          <Eyebrow>About Mehta Technologies</Eyebrow>
        </div>
        <LineHeading lines={[`${contact.city} headquarters.`, 'Clients across India', 'and abroad.']} className="mt-5 font-display text-balance text-h1" />
      </div>
      <div ref={zoom} className="mtx-zoom">
        <div className="mtx-zoom-stage">
          <div ref={layer} className="mtx-zoom-layer" aria-hidden="true">
            {frames.map(([side, sx, sy, sw, sh, lx, ly, lw, lh, slug]) => (
              <div key={slug} className="mtx-zoom-frame" data-side={side} style={{ '--sx': sx, '--sy': sy, '--sw': sw, '--sh': sh, '--lx': lx, '--ly': ly, '--lw': lw, '--lh': lh }}>
                <Image src={caseStudiesData[slug].heroImage} alt="" fill sizes="40vw" className="object-cover object-top" draggable={false} />
              </div>
            ))}
            <div className="mtx-zoom-frame mtx-zoom-portal" style={{ '--sx': '0vw', '--sy': '0svh', '--sw': '40vw', '--sh': '40svh', '--lx': '0vw', '--ly': '0svh', '--lw': '25vw', '--lh': '25svh', '--pis': 0.4, '--pil': 0.25 }}>
              <div className="mtx-zoom-portal-inner">
                <div className="@container h-full">
                  <div className="flex h-full flex-col justify-between gap-[4svh] bg-brand-wash px-[5.5cqw] pt-[var(--mtx-portal-top,2.25rem)] pb-[5svh]">
                    <div>
                      <Eyebrow>Headquarters</Eyebrow>
                      <p className="mt-[2.4svh] font-display text-[clamp(2rem,4.2cqw,4.75rem)] leading-[1.04] font-semibold tracking-[-0.01em] text-balance text-ink">{contact.city} · Gujarat · India</p>
                    </div>
                    <ul className="grid border-t border-line @3xl:grid-cols-3">
                      {cells.map((c) => (
                        <li key={c.num} className="flex items-center justify-between gap-4 border-b border-line py-[2.4svh] last:border-b-0 @3xl:flex-col @3xl:items-start @3xl:justify-start @3xl:border-b-0 @3xl:border-l @3xl:px-[2.6cqw] @3xl:py-[3.2svh] @3xl:first:border-l-0 @3xl:first:pl-0">
                          <div className="min-w-0">
                            <p className="flex items-center gap-2.5">
                              <span className="font-mono text-eyebrow text-muted">{c.num}</span>
                              {c.badge && <span className="rounded-full bg-brand px-2.5 py-1 font-mono text-[0.625rem] font-medium tracking-[0.14em] text-on-brand uppercase">{c.badge}</span>}
                            </p>
                            <p className="mt-2 font-display text-h2 text-ink">{c.title}</p>
                            <p className="text-small text-ink-2">{c.sub}</p>
                          </div>
                          <p className="shrink-0 text-right @3xl:mt-[4.5svh] @3xl:text-left">
                            <time className="block font-mono text-[clamp(1.75rem,4.6cqw,4.5rem)] leading-none font-medium tracking-[-0.04em] text-ink tabular-nums" suppressHydrationWarning>{c.big}</time>
                            <span className="mt-2 block font-mono text-[0.6875rem] tracking-[0.14em] text-muted uppercase">{c.foot}</span>
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="mtx-zoom-ring" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
      <div className="container-site pt-[clamp(4rem,9vw,9rem)] pb-section">
        <div ref={words}>
          <p className="sr-only">{aboutLead} {aboutBody}</p>
          <div aria-hidden="true">
            <p className="max-w-[30ch] font-display text-[clamp(1.75rem,0.95rem+3.1vw,4rem)] leading-[1.08] font-semibold tracking-[-0.035em] text-balance">
              <Words text={aboutLead} accent={[20, 21, 22, 23, 24, 25, 26]} />
            </p>
            <p className="mt-[clamp(2rem,4vw,3.5rem)] max-w-[44ch] font-display text-[clamp(1.25rem,0.95rem+1.2vw,2.125rem)] leading-[1.28] font-medium tracking-[-0.02em] lg:ml-[33.333%]">
              <Words text={aboutBody} />
            </p>
          </div>
        </div>
        <dl className="mt-[clamp(4rem,8vw,7rem)] grid grid-cols-2 border-y border-line lg:grid-cols-4">
          {[
            ['Headquarters', `${contact.city}, India`],
            ['Founded', '2019'],
            ['Engagements', 'Fixed price & retainer'],
            ['Support', '2 weeks – 12 months'],
          ].map(([k, v], n) => (
            <div key={k} className={`border-line py-7 pr-4 lg:py-9 lg:pr-6 ${n % 2 ? 'border-l pl-5' : ''} ${n >= 2 ? 'border-t lg:border-t-0' : ''} ${n ? 'lg:border-l lg:pl-6' : ''}`} data-reveal="true" style={{ '--i': n }}>
              <dt className="font-mono text-eyebrow text-muted uppercase">{k}</dt>
              <dd className="mt-3 text-h3 text-ink">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

/* ---------------- Team rail ---------------- */
const groups = [
  { label: 'Leadership & engineering', people: team.filter((m) => !/Growth|SEO/i.test(m.role)) },
  { label: 'Digital marketing', people: team.filter((m) => /Growth|SEO/i.test(m.role)) },
]
const order = groups.flatMap((g) => g.people.map((m) => m.name))

export function TeamRail({ heading = true }) {
  const rail = useRef(null)
  const [p, setP] = useState(0)
  const total = team.length
  const nudge = (d) => rail.current?.scrollBy({ left: d * rail.current.clientWidth * 0.6, behavior: 'smooth' })
  return (
    <section className="relative scroll-mt-nav overflow-x-clip border-t border-line bg-surface py-section" aria-labelledby="team-heading" id="team">
      {heading && (
        <div className="container-site">
          <div data-reveal="true">
            <Eyebrow>The team</Eyebrow>
          </div>
          <LineHeading id="team-heading" lines={['The people', 'who do the work']} className="mt-5 font-display text-balance text-h1" />
          <p className="mt-6 max-w-[54ch] text-lead text-ink-2" data-reveal="true">The designers, engineers and marketers who build and run your project. You talk to them directly, from the first call through to launch.</p>
        </div>
      )}
      <div className="mt-12 lg:mt-16">
        <div role="region" aria-roledescription="carousel" aria-label="The team">
          <ul ref={rail} className="mtx-team-rail" tabIndex={0} data-lenis-prevent="" onScroll={(e) => setP(e.currentTarget.scrollLeft / Math.max(1, e.currentTarget.scrollWidth - e.currentTarget.clientWidth))}>
            {groups.map((g) => [
              <li key={g.label} className="mtx-team-marker">
                <span className="mtx-team-dot" aria-hidden="true" />
                <h3 className="mtx-team-marker-label font-mono text-eyebrow text-ink uppercase">{g.label}</h3>
                <span className="mtx-team-rule" aria-hidden="true" />
              </li>,
              ...g.people.map((m) => {
                const k = order.indexOf(m.name) + 1
                return (
                  <li key={m.name} className="mtx-team-slide" role="group" aria-roledescription="slide" aria-label={`${k} of ${total}: ${m.name}, ${m.role}`}>
                    <div className="h-full" data-reveal="true">
                      <article className="group/person flex h-full flex-col rounded-3xl border border-line bg-bg p-6 transition-[border-color,box-shadow,transform] duration-500 ease-out-expo hover:-translate-y-0.5 hover:border-line-strong hover:shadow-lift sm:p-7">
                        <div className="grow">
                          <span className="relative grid size-20 shrink-0 place-items-center overflow-hidden rounded-2xl bg-brand-soft font-display text-h3 font-bold text-brand-ink">
                            {m.image ? <Image src={m.image} alt="" fill sizes="80px" className="object-cover" /> : m.init}
                          </span>
                          <h4 className="mt-5 font-display text-h3 font-semibold text-ink">{m.name}</h4>
                          <p className="mt-1.5 text-small font-medium text-brand-ink">{m.role}</p>
                          <p className="mt-3.5 text-body text-ink-2">{m.bio}</p>
                        </div>
                        <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-line pt-5">
                          <dl className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                            <dt className="font-mono text-eyebrow text-muted uppercase">Focus</dt>
                            <dd className="font-mono text-small font-medium text-brand-ink">{m.skills.join(' · ')}</dd>
                          </dl>
                        </div>
                      </article>
                    </div>
                  </li>
                )
              }),
            ])}
          </ul>
          <div className="mtx-team-controls container-site mt-1 flex items-center gap-6">
            <span className="h-[3px] grow overflow-hidden rounded-full bg-line" aria-hidden="true">
              <span className="block h-full rounded-full bg-brand transition-[width] duration-300" style={{ width: `${Math.max(18, p * 100)}%` }} />
            </span>
            <div className="flex gap-2">
              <button type="button" className="mtx-ind-arrow" aria-label="Previous" onClick={() => nudge(-1)}>
                <ChevronLeft aria-hidden="true" className="size-5" />
              </button>
              <button type="button" className="mtx-ind-arrow" aria-label="Next" onClick={() => nudge(1)}>
                <ChevronRight aria-hidden="true" className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {heading && (
        <div className="container-site mt-10">
          <Btn href="/team" variant="secondary" size="md">Meet the team</Btn>
        </div>
      )}
    </section>
  )
}

/* ---------------- FAQ ---------------- */
export function Faq({ items = faqs, title = ['Frequently asked', 'questions'], id = 'faq', bg = 'bg-bg' }) {
  const [open, setOpen] = useState(0)
  return (
    <section className={`relative scroll-mt-nav border-t border-line ${bg} py-section`} id={id}>
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--spacing-nav)+3rem)]">
            <div data-reveal="true">
              <Eyebrow>FAQ</Eyebrow>
            </div>
            <LineHeading lines={title} className="mt-5 font-display text-balance text-h1" />
            <div className="mt-8 flex flex-col items-start gap-3">
              <ConsultButton variant="secondary" size="md">Contact Us</ConsultButton>
              <a href={`mailto:${contact.email}`} className="inline-flex min-h-11 items-center text-small text-ink-2 underline decoration-line-strong underline-offset-4 transition-colors hover:text-brand-ink hover:decoration-current md:min-h-0">{contact.email}</a>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7">
          <ul className="border-t border-line">
            {items.map((f, i) => {
              const on = open === i
              return (
                <li key={f.q} className="border-b border-line" data-reveal="true">
                  <h3>
                    <button type="button" id={`${id}-q-${i}`} aria-controls={`${id}-a-${i}`} aria-expanded={on} onClick={() => setOpen(on ? -1 : i)} className="group flex w-full items-start gap-4 py-6 text-left sm:gap-6 sm:py-7">
                      <span className={`mt-1.5 w-7 shrink-0 font-mono text-eyebrow uppercase transition-colors duration-300 ${on ? 'text-brand-ink' : 'text-muted'}`}>{String(i + 1).padStart(2, '0')}</span>
                      <span className="flex-1 text-h3 text-ink transition-colors duration-300 group-hover:text-brand-ink">{f.q}</span>
                      <span className={`grid size-10 shrink-0 place-items-center rounded-full border transition-[background-color,border-color,color,transform] duration-500 ease-out-expo ${on ? 'rotate-45 border-transparent bg-brand text-on-brand' : 'border-line-strong text-ink'}`} aria-hidden="true">
                        <Plus className="size-4" />
                      </span>
                    </button>
                  </h3>
                  <div id={`${id}-a-${i}`} role="region" aria-labelledby={`${id}-q-${i}`} inert={!on} className="grid transition-[grid-template-rows] duration-500 ease-out-expo" style={{ gridTemplateRows: on ? '1fr' : '0fr' }}>
                    <div className="overflow-hidden">
                      <p className={`max-w-[64ch] pb-7 pl-11 text-body text-ink-2 transition-[opacity,translate] duration-500 ease-out-expo sm:pr-16 sm:pl-13 ${on ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'}`}>{f.a}</p>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* ---------------- Contact ---------------- */
export function OfficeCard({ i = 0 }) {
  const t = useClock()
  return (
    <div className="mtx-office is-active">
      <article className="mtx-office-card overflow-hidden rounded-3xl border border-line" aria-labelledby="office-hq">
        <div className="mtx-office-sheen" aria-hidden="true" />
        <div className="mtx-office-glare" aria-hidden="true" />
        <div className="mtx-office-content p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="flex items-center gap-2.5 font-mono text-eyebrow text-muted uppercase">
                <span>{String(i + 1).padStart(2, '0')}</span>
                <span className="h-px w-5 bg-line-strong" aria-hidden="true" />
                <span className="truncate">India</span>
              </p>
              <h3 id="office-hq" className="mt-3 font-display text-h2 text-ink">{contact.city}</h3>
            </div>
            <span className="shrink-0 rounded-full bg-brand px-3 py-1.5 font-mono text-[0.6875rem] font-medium tracking-[0.14em] text-on-brand uppercase">HQ</span>
          </div>
          <address className="mt-4 text-small text-ink-2 not-italic">
            <span className="block">Mehta Technologies</span>
            <span className="block">Ahmedabad, Gujarat 380001</span>
            <span className="block">{contact.hours}</span>
          </address>
          <div className="mt-5 flex flex-wrap items-end justify-between gap-x-6 gap-y-4 border-t border-line pt-4">
            <ul className="flex flex-col md:gap-1">
              <li><a href={contact.tel} className="inline-flex min-h-11 items-center text-body font-medium text-ink underline decoration-transparent underline-offset-4 transition-colors hover:text-brand-ink hover:decoration-current md:min-h-0">{contact.phone}</a></li>
              <li><a href={`mailto:${contact.email}`} className="inline-flex min-h-11 items-center text-small text-ink-2 underline decoration-transparent underline-offset-4 transition-colors hover:text-brand-ink hover:decoration-current md:min-h-0">{contact.email}</a></li>
            </ul>
            <p className="ml-auto text-right">
              <span className="block font-mono text-[0.6875rem] tracking-[0.14em] text-muted uppercase">Local time</span>
              <span className="mt-1 flex items-baseline justify-end gap-2">
                <time className="font-mono text-h3 text-ink tabular-nums" suppressHydrationWarning>{t}</time>
                <span className="font-mono text-[0.6875rem] text-muted">IST</span>
              </span>
            </p>
          </div>
        </div>
      </article>
    </div>
  )
}

export function ServeCard({ title, sub, lines, href, cta }) {
  return (
    <article className="rounded-3xl border border-line bg-bg p-6 shadow-lift sm:p-7">
      <p className="font-mono text-eyebrow text-muted uppercase">{sub}</p>
      <h3 className="mt-3 font-display text-h2 text-ink">{title}</h3>
      <ul className="mt-4 space-y-1 text-small text-ink-2">
        {lines.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
      <Link href={href} className="mt-5 inline-flex items-center gap-1.5 border-t border-line pt-4 text-small font-medium text-ink hover:text-brand-ink">
        {cta} <ArrowUpRight aria-hidden="true" className="size-3.5" />
      </Link>
    </article>
  )
}

export function Contact() {
  return (
    <section className="relative isolate scroll-mt-nav overflow-clip border-t border-line bg-surface py-section" id="contact">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[min(118vh,70rem)] overflow-hidden" aria-hidden="true">
        <div className="mtx-contact-veil absolute inset-0" />
      </div>
      <div className="container-site relative">
        <div className="mx-auto flex flex-col items-center text-center [container-type:inline-size]">
          <div data-reveal="true">
            <Eyebrow>Get in touch</Eyebrow>
          </div>
          <LineHeading lines={["Let's build", 'something together']} className="mt-5 font-display text-display text-balance" />
          <p className="mt-6 max-w-[54ch] text-lead text-ink-2" data-reveal="true">Tell us about your project. Free consultation, no obligation, and a reply within 24 hours.</p>
        </div>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
          <a href={contact.tel} className={btnClass('secondary', 'md')}>
            <Phone aria-hidden="true" className="size-4 shrink-0" />
            <span>Call {contact.phone}</span>
          </a>
          <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className={btnClass('secondary', 'md')}>
            <MessageCircle aria-hidden="true" className="size-4 shrink-0 text-whatsapp" />
            <span>WhatsApp</span>
          </a>
          <a href={`mailto:${contact.email}`} className={btnClass('ghost', 'md')}>
            <Mail aria-hidden="true" className="size-4 shrink-0" />
            <span>{contact.email}</span>
            <ArrowUpRight aria-hidden="true" className="size-4 shrink-0" />
          </a>
        </div>
        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <div className="lg:sticky lg:top-[calc(var(--spacing-nav)+1.5rem)]">
              <EnquiryForm source="Homepage Enquiry" />
            </div>
          </div>
          <div className="lg:col-span-5">
            <Eyebrow>Where we work</Eyebrow>
            <ul className="mt-5 grid gap-5">
              <li><OfficeCard /></li>
              <li><ServeCard sub="Service area" title="Across Gujarat" lines={['Surat, Nadiad and the rest of Gujarat', 'On-site meetings in Ahmedabad']} href="/locations" cta="Our locations" /></li>
              <li><ServeCard sub="Remote delivery" title="India & abroad" lines={['Mumbai and across India', 'International clients billed in USD']} href="/contact" cta="Talk to us" /></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
