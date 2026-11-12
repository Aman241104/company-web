'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LayoutGrid, Search, Code, Megaphone, PenTool, Boxes } from 'lucide-react'
import { chapters } from '@/lib/services'
import { contact, stats, processSteps } from '@/lib/site'
import { Btn, Eyebrow, FloatWord } from '../ui'
import ConsultButton from '../ConsultButton'

gsap.registerPlugin(ScrollTrigger)
const icons = { development: Code, 'digital-marketing': Megaphone, 'blockchain-web3': Boxes, designing: PenTool }

function Clock() {
  const [t, setT] = useState('--:--')
  useEffect(() => {
    const f = () => setT(new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: contact.timezone }).format(new Date()))
    f()
    const id = setInterval(f, 20000)
    return () => clearInterval(id)
  }, [])
  return <span className="font-mono text-[12px] text-ink tabular-nums" suppressHydrationWarning>{t}</span>
}

// Cards: every process item, laid out by column (step) and row. One card at a
// time "travels" to the next column, like work moving across a real board.
const base = processSteps.flatMap((s, c) => s.items.map((title, r) => ({ id: `${c}-${r}`, title, step: s.num, c, r })))

export default function Board() {
  const root = useRef(null)
  const frame = useRef(null)
  const fit = useRef(null)
  const [cards, setCards] = useState(base)
  const [active, setActive] = useState(null)

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let k = 0
    const id = setInterval(() => {
      setCards((prev) => {
        const movable = prev.filter((x) => x.c < 3)
        const pick = movable[k++ % movable.length]
        const nc = pick.c + 1
        const rows = prev.filter((x) => x.c === nc).length
        setActive(pick.id)
        const next = prev.map((x) => (x.id === pick.id ? { ...x, c: nc, r: rows } : x))
        // close the gap left behind in the old column
        return next.map((x) => (x.c === pick.c && x.r > pick.r ? { ...x, r: x.r - 1 } : x)).map((x) => (x.c === 3 && x.r > 4 ? { ...base.find((b) => b.id === x.id) } : x))
      })
    }, 2200)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const el = fit.current
    const on = () => {
      if (innerWidth < 1024) el.style.setProperty('--fit', String(el.parentElement.clientWidth / 800))
      else el.style.removeProperty('--fit')
    }
    on()
    window.addEventListener('resize', on)
    return () => window.removeEventListener('resize', on)
  }, [])

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: 'top top', end: '+=110%', scrub: 0.6, pin: true, anticipatePin: 1 },
      })
      tl.fromTo(frame.current, { transform: 'perspective(1600px) translateY(28px) rotateX(26deg) scale(0.82,0.61)', '--edge': 1 }, { transform: 'perspective(1600px) translateY(0px) rotateX(0deg) scale(1,1)', '--edge': 0, ease: 'none' })
      tl.to(root.current.querySelector('[data-board-head]'), { yPercent: -60, opacity: 0, ease: 'none' }, 0)
    })
    return () => mm.revert()
  }, [])

  return (
    <section className="relative isolate bg-bg" id="board">
      <div ref={root} className="relative pt-24 pb-16 sm:pt-28 sm:pb-20 lg:motion-reduce:pt-section lg:motion-reduce:pb-section lg:motion-safe:h-svh lg:motion-safe:overflow-hidden lg:motion-safe:p-0">
        <div data-board-head className="relative z-10 lg:motion-safe:absolute lg:motion-safe:inset-x-0 lg:motion-safe:top-[calc(var(--spacing-nav,4.5rem)+4.5vh)]">
          <div className="container-site flex flex-col items-center text-center">
            <Eyebrow>Process</Eyebrow>
            <h2 className="mt-5 text-balance" aria-label="How a Mehta project moves">
              <span className="block font-display text-h1 text-ink" aria-hidden="true">How a Mehta project</span>
              <span className="mt-1 block font-display text-[clamp(3.5rem,1.4rem+7.2vw,7.5rem)] leading-[0.9] font-bold tracking-[-0.045em]" aria-hidden="true">
                <FloatWord word="moves" />
              </span>
            </h2>
            <p className="mt-6 max-w-[52ch] text-lead text-ink-2">Four steps, a fixed-price proposal and a live staging link you can check any time.</p>
            <div className="mt-8 flex w-full max-w-sm flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:justify-center">
              <ConsultButton>Start a Project</ConsultButton>
              <Btn href="/work" variant="secondary">See Our Work</Btn>
            </div>
          </div>
        </div>
        <div className="relative z-0 mt-12 px-5 sm:mt-14 sm:px-8 lg:motion-reduce:mt-16 lg:motion-safe:absolute lg:motion-safe:inset-x-0 lg:motion-safe:bottom-0 lg:motion-safe:mt-0 lg:motion-safe:px-0">
          <div
            ref={frame}
            data-frame="true"
            className="relative mx-auto w-full max-w-[1120px] overflow-hidden rounded-[20px] border bg-bg lg:rounded-[28px] lg:motion-safe:h-svh lg:motion-safe:max-w-none lg:motion-safe:origin-bottom lg:motion-safe:[transform:perspective(1600px)_translateY(28px)_rotateX(26deg)_scale(0.82,0.61)]"
            style={{ '--edge': 1, borderColor: 'color-mix(in oklab, var(--color-line-strong) calc(var(--edge) * 100%), transparent)', boxShadow: '0 40px 100px -40px rgb(10 17 36 / calc(var(--edge) * .35))' }}
          >
            <div className="relative aspect-[4/3] w-full lg:motion-reduce:aspect-[1280/800] lg:motion-safe:aspect-auto lg:motion-safe:h-full" aria-hidden="true" inert>
              <div className="@container absolute top-0 left-0 flex h-[600px] w-[800px] origin-top-left flex-col overflow-hidden bg-surface text-ink select-none [scale:var(--fit,0.44)] lg:motion-reduce:h-[800px] lg:motion-reduce:w-[1280px] lg:motion-reduce:[scale:var(--fit,0.86)] lg:motion-safe:static lg:motion-safe:h-full lg:motion-safe:w-full lg:motion-safe:[scale:1]" ref={fit}>
                <div className="grid h-10 shrink-0 grid-cols-[1fr_auto_1fr] items-center border-b border-line bg-bg px-4 @4xl:h-13 @4xl:px-5">
                  <div className="flex gap-1.5">
                    <span className="size-2.5 rounded-full bg-line-strong" />
                    <span className="size-2.5 rounded-full bg-line-strong" />
                    <span className="size-2.5 rounded-full bg-line-strong" />
                  </div>
                  <div className="flex items-center gap-2 rounded-md bg-surface px-3 py-1 text-[12px] font-medium text-ink-2">
                    <LayoutGrid className="size-3.5" />
                    Mehta Technologies
                  </div>
                  <div className="flex justify-end">
                    <Search className="size-4 text-muted" />
                  </div>
                </div>
                <div className="flex min-h-0 flex-1">
                  <div className="hidden w-56 shrink-0 flex-col border-r border-line bg-bg px-3 py-5 @4xl:flex @6xl:w-60">
                    <div className="px-2 font-display text-[15px] font-bold tracking-[0.06em] text-ink">MEHTA</div>
                    <div className="mt-8 px-2 font-mono text-[10.5px] tracking-[0.14em] text-muted uppercase">Practices</div>
                    <div className="mt-2 space-y-0.5">
                      {chapters.map((c, i) => {
                        const I = icons[c.slug]
                        return (
                          <div key={c.slug} className={`flex items-center gap-3 rounded-lg px-2 py-2 ${i === 0 ? 'bg-brand-soft text-brand-ink' : 'text-ink-2'}`}>
                            <span className={`grid size-7 shrink-0 place-items-center rounded-md ${i === 0 ? 'bg-bg' : 'bg-surface'}`}>
                              <I className="size-4" />
                            </span>
                            <span className="min-w-0 flex-1 truncate text-[13px] font-medium">{c.name}</span>
                            <span className="font-mono text-[11px] text-muted tabular-nums">{c.disciplines.length}</span>
                          </div>
                        )
                      })}
                    </div>
                    <div className="mt-7 px-2 font-mono text-[10.5px] tracking-[0.14em] text-muted uppercase">Stages</div>
                    <div className="mt-2 space-y-0.5">
                      {processSteps.map((s) => (
                        <div key={s.num} className="flex items-center gap-3 rounded-lg px-2 py-1.5 text-ink-2">
                          <span className="w-7 shrink-0 text-center font-mono text-[11px] text-brand-ink">{s.num}</span>
                          <span className="min-w-0 flex-1 truncate text-[12.5px]">{s.title}</span>
                          <span className="font-mono text-[11px] text-muted tabular-nums">{s.items.length}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-auto space-y-3 rounded-xl border border-line bg-surface p-3">
                      <div>
                        <div className="font-mono text-[9.5px] tracking-[0.14em] text-muted uppercase">Engagements</div>
                        <div className="mt-1 text-[12.5px] font-medium text-ink">Fixed price &amp; retainer</div>
                      </div>
                      <div>
                        <div className="font-mono text-[9.5px] tracking-[0.14em] text-muted uppercase">Support</div>
                        <div className="mt-1 text-[12.5px] font-medium text-ink">2 weeks – 12 months</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-4 p-4 @4xl:gap-5 @4xl:px-6 @4xl:pt-7 @4xl:pb-5">
                    <div className="flex items-end justify-between gap-4">
                      <div className="hidden min-w-0 @4xl:block">
                        <div className="font-mono text-[10.5px] tracking-[0.14em] text-brand-ink uppercase">Process</div>
                        <div className="mt-1.5 truncate text-[20px] font-semibold tracking-[-0.015em] text-ink">Project board</div>
                      </div>
                      <div className="flex w-full items-center justify-between gap-3 @4xl:w-auto @4xl:justify-end">
                        <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand-soft px-3 py-1.5 text-[12px] font-medium text-brand-ink">
                          <span className="relative flex size-2">
                            <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-60" />
                            <span className="relative inline-flex size-2 rounded-full bg-brand" />
                          </span>
                          Accepting new projects
                        </span>
                        <div className="flex items-center divide-x divide-line rounded-full border border-line bg-bg">
                          <span className="flex items-baseline gap-1.5 px-3 py-1.5">
                            <span className="text-[11px] text-ink-2">{contact.city}</span>
                            <Clock />
                          </span>
                          <span className="hidden items-baseline gap-1.5 px-3 py-1.5 @4xl:flex">
                            <span className="text-[11px] text-ink-2">Mon–Fri</span>
                            <span className="font-mono text-[12px] text-ink">9–18 IST</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="relative min-h-0 flex-1 [--card-gap:6px] [--card-h:56px] [--gap:10px] [--head:38px] [--pad:8px] @4xl:[--card-gap:8px] @4xl:[--card-h:70px] @4xl:[--gap:14px] @4xl:[--head:46px] @4xl:[--pad:10px] @6xl:[--card-gap:12px] @6xl:[--card-h:84px] @6xl:[--head:50px]">
                      <div className="absolute inset-0 grid grid-cols-4 gap-[var(--gap)]">
                        {processSteps.map((s, c) => (
                          <div key={s.num} className="rounded-2xl border border-line bg-surface-2/70">
                            <div className="flex h-[var(--head)] items-center gap-2 px-[calc(var(--pad)+4px)]">
                              <span className="font-mono text-[10.5px] text-brand-ink">{s.num}</span>
                              <span className="min-w-0 truncate text-[12px] font-semibold text-ink @4xl:text-[13px]">{s.title}</span>
                              <span className="ml-auto rounded-full bg-bg px-1.5 py-px font-mono text-[10.5px] text-muted tabular-nums">{cards.filter((x) => x.c === c).length}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      {cards.map((x) => {
                        const on = x.id === active
                        return (
                          <div
                            key={x.id}
                            className={`absolute top-0 left-0 h-[var(--card-h)] w-[calc((100%-3*var(--gap))/4-2*var(--pad))] [translate:calc(var(--c)*(100%+2*var(--pad)+var(--gap))+var(--pad))_calc(var(--head)+var(--r)*(var(--card-h)+var(--card-gap)))] transition-[translate] duration-[1100ms] ease-out-expo ${on ? 'z-10' : 'z-0'}`}
                            style={{ '--c': x.c, '--r': x.r }}
                          >
                            <div className={`flex h-full flex-col justify-between rounded-xl border bg-bg px-3 py-2 @4xl:py-2.5 ${on ? 'border-transparent shadow-float ring-1 ring-brand/40' : 'border-line shadow-lift'}`}>
                              <div className="line-clamp-2 text-[11.5px] leading-snug font-medium text-ink @4xl:text-[12.5px] @6xl:text-[13.5px]">{x.title}</div>
                              <div className="flex items-center gap-2">
                                <span className={`font-mono text-[9.5px] @4xl:text-[10px] ${on ? 'text-brand-ink' : 'text-muted'}`}>{processSteps[x.c].num}</span>
                                <span className="h-1 flex-1 overflow-hidden rounded-full bg-surface-2">
                                  <span className="block h-full rounded-full bg-brand transition-[width] duration-[1100ms] ease-out-expo" style={{ width: `${(x.c + 1) * 25}%` }} />
                                </span>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                    <div className="grid shrink-0 grid-cols-5 divide-x divide-line rounded-2xl border border-line bg-bg">
                      {stats.map((s) => (
                        <div key={s.label} className="min-w-0 px-3 py-2.5 @4xl:px-5 @4xl:py-4">
                          <span className="block text-[19px] leading-tight font-semibold tracking-[-0.02em] text-ink tabular-nums @4xl:text-[26px]">{s.value}</span>
                          <span className="mt-0.5 block truncate text-[10.5px] text-ink-2 @4xl:mt-1 @4xl:text-[12.5px]">{s.label}</span>
                          <span className="hidden truncate text-[11px] text-muted @4xl:block">{s.note}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
