'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, Plus } from 'lucide-react'
import { caseStudiesData } from '@/lib/caseStudies'
import { allDisciplines } from '@/lib/services'
import { Btn, Eyebrow } from '../ui'
import { chapterHref } from './Chapters'

gsap.registerPlugin(ScrollTrigger)

/* ---------------- Chapter 02 · Selected work (zoom tunnel) ---------------- */
const rects = [0.55, 0.87, 1.19, 1.51, 1.83, 2.15, 2.47]

export function Warp() {
  const stage = useRef(null)
  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const q = gsap.utils.selector(stage)
      const tl = gsap.timeline({ scrollTrigger: { trigger: stage.current, start: 'top top', end: '+=120%', scrub: 0.5, pin: true } })
      tl.to(q('[data-warp-rect]'), { scale: (i) => rects[i] * 3.2, opacity: 0, ease: 'power1.in', stagger: 0.02 }, 0)
        .to(q('[data-warp-rings]'), { scale: 3.4, opacity: 0, ease: 'power1.in' }, 0)
        .to(q('[data-warp-copy]'), { scale: 2.2, opacity: 0, ease: 'power2.in' }, 0.15)
        .fromTo(q('.mtx-warp-flash'), { opacity: 0 }, { opacity: 1, ease: 'none', duration: 0.25 }, 0.75)
    })
    return () => mm.revert()
  }, [])
  return (
    <section className="relative w-full bg-surface" aria-label="Chapter 02: Selected work" data-section="chapter-work">
      <div ref={stage} className="mtx-warp-stage relative isolate w-full overflow-hidden bg-surface">
        <div className="mtx-warp-beams pointer-events-none absolute inset-0" aria-hidden="true">
          {[20, 40, 60, 80].map((l) => (
            <div key={l} className="absolute top-1/2 h-[120vh] w-px -translate-y-1/2" style={{ left: `${l}%`, background: 'linear-gradient(to bottom, transparent 0%, color-mix(in oklab, var(--color-brand-ink) 18%, transparent) 50%, transparent 100%)' }} />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-0" aria-hidden="true" style={{ background: 'radial-gradient(ellipse at center, transparent 35%, var(--color-surface) 88%)' }} />
        <div className="pointer-events-none absolute inset-0 grid place-items-center" aria-hidden="true">
          <div data-warp-rings className="relative size-[56vmin] will-change-transform">
            <span className="absolute inset-0 rounded-full" style={{ border: '1px solid color-mix(in oklab, var(--color-brand-ink) 22%, transparent)' }} />
            <span className="absolute inset-[14%] rounded-full" style={{ border: '1px solid color-mix(in oklab, var(--color-brand-ink) 12%, transparent)' }} />
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
          {rects.map((s, i) => (
            <div
              key={i}
              data-warp-rect
              className="absolute h-[40vmin] w-[68vmin] rounded-xl will-change-transform portrait:h-[44vh] portrait:w-[62vw]"
              style={{ zIndex: 7 - i, transform: `scale(${s})`, opacity: 0.95 - i * 0.11, border: '1px solid color-mix(in oklab, var(--color-brand-ink) 30%, transparent)', background: 'linear-gradient(135deg, color-mix(in oklab, var(--color-brand) 4%, transparent) 0%, transparent 60%)' }}
            />
          ))}
        </div>
        <div className="relative z-10 flex h-full items-center justify-center px-5">
          <div data-warp-copy className="will-change-transform">
            <div className="flex flex-col items-center gap-6 text-center">
              <Eyebrow>Chapter 02</Eyebrow>
              <p className="font-display text-giant font-bold text-ink uppercase">
                <span className="block">Selected</span>
                <span className="block">work</span>
              </p>
            </div>
          </div>
        </div>
        <div className="mtx-warp-flash pointer-events-none absolute inset-0 z-20 bg-bg opacity-0" aria-hidden="true" />
      </div>
    </section>
  )
}

/* ---------------- Work wall ---------------- */
const featured = ['silver-spoon', 'sv-space-designs', 'prihaan-spices', 'chahana-dental', 'zingbliss-events', 'rising-rechargeable', 'naam-transfer', 'ares-business-league', 'fgp-industries']
const svc = allDisciplines.filter((d) => d.ours)
const tints = ['bg-brand-soft', 'bg-paper', 'bg-surface-2', 'bg-bg']

function CaseCard({ s, n }) {
  const m = s.metrics[0]
  return (
    <Link href={`/work/${s.slug}`} className="group/card relative flex h-full w-full flex-col overflow-hidden rounded-3xl border border-line bg-bg text-ink shadow-lift transition-[translate,box-shadow] duration-500 ease-out-expo hover:-translate-y-2.5 hover:shadow-float focus-visible:-translate-y-2.5 focus-visible:shadow-float">
      <div className="relative h-[42%] shrink-0 overflow-hidden bg-surface">
        <Image src={s.heroImage} alt="" fill sizes="26vw" className="object-cover object-top transition-transform duration-700 ease-out-expo group-hover/card:scale-[1.05]" />
        <span className="absolute top-3 left-3 rounded-full border border-line bg-bg px-2.5 py-1 font-mono text-[0.6875rem] tracking-[0.14em] text-ink uppercase">Case {String(n).padStart(2, '0')}</span>
        <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-between gap-3 border-t border-line bg-bg px-4 py-2.5 transition-transform duration-500 ease-out-expo group-hover/card:translate-y-0 group-focus-visible/card:translate-y-0">
          <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-muted uppercase">{s.year}</span>
          <span className="inline-flex items-center gap-1 text-small font-medium text-brand-ink">
            Read the case <ArrowUpRight aria-hidden="true" className="size-4" />
          </span>
        </div>
      </div>
      <div className="flex min-h-0 flex-1 flex-col justify-between gap-2 p-4 lg:p-5">
        {m ? (
          <p className="flex items-end gap-3">
            <span className="font-display text-[clamp(1.875rem,1.1rem+2.4vw,3.25rem)] leading-[0.9] font-bold tracking-[-0.04em] whitespace-nowrap text-ink">{m.value}</span>
            <span className="max-w-[15ch] pb-0.5 text-[0.8125rem] leading-tight text-ink-2 lg:text-small">{m.label}</span>
          </p>
        ) : (
          <p className="text-small text-ink-2 line-clamp-3">{s.summary}</p>
        )}
        <div className="min-w-0">
          <h3 className="line-clamp-2 text-[0.9375rem] leading-snug font-semibold lg:text-body">{s.name}</h3>
          <p className="mt-0.5 line-clamp-2 text-[0.8125rem] text-muted">{s.category}</p>
        </div>
      </div>
    </Link>
  )
}

function SvcCard({ d, i }) {
  return (
    <Link href={chapterHref(d.chapter, d)} className={`group/card relative flex h-full w-full flex-col overflow-hidden rounded-3xl border border-line text-ink shadow-lift transition-[translate,box-shadow] duration-500 ease-out-expo hover:-translate-y-2.5 hover:shadow-float ${tints[i % tints.length]}`}>
      <span className="m-3 self-start rounded-full border border-line bg-bg px-2.5 py-1 font-mono text-[0.6875rem] tracking-[0.14em] text-ink uppercase">{d.chapter.name}</span>
      <div className="mt-auto p-4 lg:p-5">
        <h3 className="font-display text-[clamp(1.25rem,0.9rem+1.2vw,1.75rem)] leading-tight font-semibold">{d.title}</h3>
        <p className="mt-1 text-small font-medium text-brand-ink">{d.tagline}</p>
        <p className="mt-2 line-clamp-2 text-[0.8125rem] text-ink-2">{d.desc}</p>
      </div>
    </Link>
  )
}

export function WorkWall() {
  const root = useRef(null)
  const plane = useRef(null)
  const studies = featured.map((s) => caseStudiesData[s]).filter(Boolean)
  const rows = [0, 1, 2].map((r) => {
    const out = []
    for (let k = 0; k < 4; k++) {
      const idx = r * 4 + k
      out.push(k % 2 === r % 2 ? { type: 'case', s: studies[(idx >> 1) % studies.length], n: ((idx >> 1) % studies.length) + 1 } : { type: 'svc', d: svc[idx % svc.length], i: idx })
    }
    return out
  })
  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: 'top 85%', end: 'bottom bottom', scrub: 0.6 } })
      tl.fromTo(plane.current, { opacity: 0.1, y: '-22vh', rotateX: 15, rotateZ: 20 }, { opacity: 1, y: 0, rotateX: 0, rotateZ: 0, ease: 'power2.out', duration: 0.5 })
      root.current.querySelectorAll('[data-wall-track]').forEach((row, i) => {
        tl.fromTo(row, { xPercent: i % 2 ? -8 : 8 }, { xPercent: i % 2 ? 8 : -8, ease: 'none', duration: 1 }, 0)
      })
    })
    return () => mm.revert()
  }, [])
  return (
    <section ref={root} className="mtx-workwall relative flex flex-col overflow-clip bg-bg [perspective:1000px] [transform-style:preserve-3d]" aria-labelledby="work-heading" id="work">
      <div className="relative z-10">
        <div className="container-site pt-[calc(var(--spacing-nav)+clamp(3rem,7vw,7rem))] pb-[clamp(3rem,9vh,6.5rem)]">
          <div className="[container-type:inline-size]">
            <div data-reveal="true">
              <Eyebrow>Selected work</Eyebrow>
            </div>
            <h2 id="work-heading" className="mt-5 font-display text-display text-balance" aria-label="Projects we have delivered" style={{ fontSize: 'min(var(--text-display), 12.2cqi)' }}>
              <span className="-mb-[0.1em] block overflow-hidden pb-[0.1em]" aria-hidden="true">
                <span className="block" data-reveal="line">Projects we have</span>
              </span>
              <span className="-mb-[0.1em] block overflow-hidden pb-[0.1em]" aria-hidden="true">
                <span className="block text-brand-gradient" data-reveal="line" style={{ '--i': 1 }}>delivered</span>
              </span>
            </h2>
          </div>
          <div data-reveal="true">
            <div className="mt-9 h-px w-20 bg-brand" aria-hidden="true" />
            <p className="mt-8 max-w-[56ch] text-lead text-ink-2">Recent work: the problem we were given, what we built, and what changed afterwards.</p>
            <p className="mt-9 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-eyebrow text-muted uppercase">
              <span className="text-ink">{Object.keys(caseStudiesData).length} case studies</span>
              <span className="size-1 rounded-full bg-brand" aria-hidden="true" />
              <span>Websites · E-Commerce · Custom Software · SEO</span>
            </p>
          </div>
        </div>
      </div>
      <div ref={plane} className="mtx-workwall-plane relative">
        {rows.map((row, r) => (
          <ul key={r} className="mtx-workwall-row will-change-transform" data-wall-track="true">
            {row.map((c, k) => (
              <li key={k} className="mtx-workwall-card">
                {c.type === 'case' ? <CaseCard s={c.s} n={c.n} /> : <SvcCard d={c.d} i={c.i} />}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  )
}

/* ---------------- Case studies (expanding panel + accordion) ---------------- */
const caseList = ['silver-spoon', 'sv-space-designs', 'prihaan-spices', 'chahana-dental', 'zingbliss-events']

export function CaseStudies() {
  const root = useRef(null)
  const preview = useRef(null)
  const [open, setOpen] = useState(-1)
  const [hover, setHover] = useState(-1)
  const list = caseList.map((s) => caseStudiesData[s])
  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(root.current, { '--expand-p': 0 }, { '--expand-p': 1, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top 85%', end: 'top 15%', scrub: 0.4 } })
    })
    return () => mm.revert()
  }, [])
  const move = (e) => {
    if (!preview.current) return
    preview.current.style.transform = `translate(${e.clientX + 24}px, ${e.clientY - 90}px)`
  }
  return (
    <section className="relative bg-surface pt-[clamp(2.5rem,5vw,5rem)]" aria-labelledby="case-studies-title" id="case-studies">
      <div ref={root} className="mtx-expand relative">
        <div className="mtx-expand-shadow" aria-hidden="true" />
        <div className="mtx-expand-panel relative bg-bg">
          <div className="mx-auto w-full max-w-[72rem] px-6 pt-[clamp(3rem,6vw,5.5rem)] pb-section sm:px-10 lg:px-16" onMouseMove={move} onMouseLeave={() => setHover(-1)}>
            <div className="mb-8 flex flex-wrap items-end justify-between gap-x-8 gap-y-3 lg:mb-12">
              <h2 id="case-studies-title" className="font-display text-h1 text-ink">Case studies</h2>
              <p className="pb-2 font-mono text-eyebrow text-muted uppercase">Challenge · Solution · Results</p>
            </div>
            <ol className="border-t border-line">
              {list.map((s, i) => {
                const isOpen = open === i
                return (
                  <li key={s.slug} id={`case-${s.slug}`} className="scroll-mt-[calc(var(--spacing-nav)+1.5rem)] border-b border-line" onMouseEnter={() => setHover(i)}>
                    <h3>
                      <button
                        type="button"
                        id={`case-btn-${i}`}
                        aria-controls={`case-panel-${i}`}
                        aria-expanded={isOpen}
                        onClick={() => setOpen(isOpen ? -1 : i)}
                        className="group/row relative isolate grid w-full grid-cols-[2.25rem_1fr_auto] items-center gap-x-3 py-6 text-left sm:grid-cols-[3rem_1fr_auto] lg:grid-cols-[4rem_1fr_auto_auto] lg:gap-x-8 lg:py-8"
                      >
                        <span className="absolute inset-x-[-1rem] inset-y-2 -z-10 rounded-2xl bg-surface opacity-0 transition-opacity duration-300 ease-out-expo group-hover/row:opacity-100 lg:inset-x-[-1.5rem]" aria-hidden="true" />
                        <span className="self-start pt-[0.45em] font-mono text-eyebrow text-muted">{String(i + 1).padStart(2, '0')}</span>
                        <span className="min-w-0">
                          <span className="block font-display text-[clamp(1.375rem,0.95rem+2vw,2.75rem)] leading-[1.06] font-semibold tracking-[-0.03em] text-balance text-ink transition-colors duration-300 group-hover/row:text-brand-ink">{s.name}</span>
                          <span className="mt-2 block text-small text-ink-2">
                            {s.category}
                            <span className="lg:hidden"> · {s.year}</span>
                          </span>
                        </span>
                        <span className="hidden font-mono text-eyebrow text-muted uppercase lg:block">{s.year}</span>
                        <span className={`grid size-10 place-items-center rounded-full border transition-[background-color,border-color,color] duration-300 lg:size-12 ${isOpen ? 'border-brand bg-brand text-on-brand' : 'border-line-strong bg-bg text-ink group-hover/row:border-ink'}`} aria-hidden="true">
                          <Plus className={`size-4 transition-transform duration-500 ease-out-expo ${isOpen ? 'rotate-45' : ''}`} />
                        </span>
                      </button>
                    </h3>
                    <div id={`case-panel-${i}`} role="region" aria-labelledby={`case-btn-${i}`} inert={!isOpen} className={`grid transition-[grid-template-rows] duration-500 ease-out-expo ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                      <div className="min-h-0 overflow-hidden">
                        <div className="grid gap-8 pb-10 sm:pl-[calc(3rem+0.75rem)] lg:grid-cols-12 lg:gap-x-14 lg:pb-14 lg:pl-[calc(4rem+2rem)]">
                          <div className="mtx-case-inline-media relative aspect-[16/9] overflow-hidden rounded-2xl border border-line bg-surface lg:col-span-12">
                            <Image src={s.heroImage} alt="" fill sizes="(max-width:1024px) 100vw, 60vw" className="object-cover object-top" />
                          </div>
                          <div className="space-y-7 lg:col-span-6">
                            <div>
                              <p className="font-mono text-eyebrow text-brand-ink uppercase">Challenge</p>
                              <p className="mt-3 text-body text-ink-2">{s.challenge}</p>
                            </div>
                            <div>
                              <p className="font-mono text-eyebrow text-brand-ink uppercase">Solution</p>
                              <p className="mt-3 text-body text-ink-2">{s.solution}</p>
                            </div>
                          </div>
                          <dl className="grid grid-cols-2 gap-x-6 gap-y-7 self-start lg:col-span-6">
                            {s.metrics.map((m) => (
                              <div key={m.label} className="flex flex-col-reverse border-t border-line pt-4">
                                <dt className="mt-2 text-small leading-snug text-ink-2">{m.label}</dt>
                                <dd className="font-display text-[clamp(2rem,1.3rem+2.4vw,3.25rem)] leading-[0.95] font-bold tracking-[-0.04em] text-brand-ink">{m.value}</dd>
                              </div>
                            ))}
                          </dl>
                          <div className="lg:col-span-12">
                            <p className="font-mono text-eyebrow text-muted uppercase">Stack</p>
                            <ul className="mt-3 flex flex-wrap gap-2">
                              {s.architecture.map((a) => (
                                <li key={a} className="rounded-full border border-line bg-surface px-3 py-1.5 text-small text-ink">{a}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="lg:col-span-12">
                            <Btn href={`/work/${s.slug}`} variant="secondary" size="md">Read the full case study</Btn>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ol>
            <div className="mt-10 lg:mt-14">
              <Btn href="/work" variant="secondary" size="lg" arrow>View Portfolio</Btn>
            </div>
          </div>
        </div>
        <div className="mtx-expand-outline" aria-hidden="true" />
      </div>
      <div
        ref={preview}
        aria-hidden="true"
        className="mtx-case-preview pointer-events-none fixed top-0 left-0 z-30 h-[180px] w-[260px] overflow-hidden rounded-xl border border-line bg-surface shadow-float transition-opacity duration-300"
        style={{ opacity: hover >= 0 && open !== hover ? 1 : 0 }}
      >
        {list.map((s, i) => (
          <Image key={s.slug} src={s.heroImage} alt="" fill sizes="260px" className={`object-cover object-top transition-opacity duration-300 ${hover === i ? 'opacity-100' : 'opacity-0'}`} />
        ))}
      </div>
    </section>
  )
}
