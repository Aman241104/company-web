'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Code, Megaphone, Boxes, PenTool } from 'lucide-react'
import { chapters } from '@/lib/services'
import { Btn, Eyebrow, LineHeading } from '../ui'

gsap.registerPlugin(ScrollTrigger)

const meta = {
  development: { Icon: Code, plate: 'border-brand/25 bg-brand-soft', lead: 'Websites, online stores, custom software and mobile apps, built to scale with your business.' },
  'digital-marketing': { Icon: Megaphone, plate: 'border-ink/10 bg-paper', lead: 'Search, paid, social and creator marketing, measured on enquiries and revenue.' },
  'blockchain-web3': { Icon: Boxes, plate: 'border-brand/20 bg-surface-2', lead: 'Smart contracts, dApps and digital-asset platforms, reviewed before they go live.' },
  designing: { Icon: PenTool, plate: 'border-line bg-bg shadow-lift', lead: 'Brand identity, interface design and the everyday creatives a growing business needs.' },
}
const href = (c) => (c.slug === 'development' ? '/services#development' : `/services/${c.slug}`)

export default function Expertise() {
  const stage = useRef(null)
  const track = useRef(null)
  const ruler = useRef(null)
  const marker = useRef(null)
  const [idx, setIdx] = useState(0)
  const n = chapters.length

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference) and (min-height: 540px)', () => {
      const words = [...ruler.current.querySelectorAll('[data-ruler-word]')]
      const labels = words.map((w) => w.querySelector('[data-ruler-label]'))
      const apply = (p) => {
        const x = p * (n - 1)
        track.current.style.transform = `translateX(${-x * 100}vw)`
        // centre the (interpolated) active word on the needle
        const i0 = Math.floor(x), i1 = Math.min(n - 1, i0 + 1), f = x - i0
        const centre = (i) => words[i].offsetLeft + words[i].offsetWidth / 2
        const c = centre(i0) * (1 - f) + centre(i1) * f
        ruler.current.style.transform = `translateX(${-c}px)`
        labels.forEach((l, i) => {
          const d = Math.min(1, Math.abs(x - i))
          l.style.transform = `scale(${1 - 0.58 * d})`
          l.style.transformOrigin = i < x ? '100% 50%' : '0% 50%'
        })
        marker.current.style.transform = `translateX(${x * 100}%)`
        setIdx(Math.round(x))
      }
      // labels are scaled, so measure unscaled widths once
      labels.forEach((l) => (l.style.transform = 'none'))
      const st = ScrollTrigger.create({ trigger: stage.current, start: 'top top', end: `+=${(n - 1) * 85}%`, pin: true, scrub: 0.5, onUpdate: (s) => apply(s.progress) })
      apply(0)
      return () => st.kill()
    })
    return () => mm.revert()
  }, [n])

  const go = (i) => {
    const st = ScrollTrigger.getAll().find((s) => s.trigger === stage.current)
    if (st) window.scrollTo({ top: st.start + (st.end - st.start) * (i / (n - 1)), behavior: 'smooth' })
  }

  return (
    <section className="mtx-dial relative bg-bg" aria-labelledby="dial-title" id="expertise">
      <div className="container-site flex flex-col items-center pt-section text-center">
        <div className="text-eyebrow" data-reveal="true">
          <Eyebrow>What we do</Eyebrow>
        </div>
        <LineHeading id="dial-title" lines={['Four areas of', 'expertise']} className="mt-5 font-display text-h2 text-balance" />
        <p className="mt-5 max-w-[54ch] text-body text-ink-2" data-reveal="true">Have a different idea? Tell us — custom builds are most of what we do.</p>
      </div>
      <div ref={stage} className="mtx-dial-stage relative flex w-full flex-col pt-12 pb-section">
        <div className="mtx-dial-chrome container-site flex items-center justify-between gap-6 pb-2.5 lg:pb-[clamp(0.5rem,1.4vh,0.875rem)]" aria-hidden="true">
          <p className="inline-flex items-center gap-2 font-mono text-eyebrow text-muted uppercase">
            Scroll <ArrowRight className="size-3.5 rotate-90" />
          </p>
          <p className="font-mono text-eyebrow text-ink-2 tabular-nums">
            {String(idx + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
          </p>
        </div>
        <div className="mtx-dial-chrome relative w-full">
          <Ticks pos="top" />
          <div
            className="relative h-[max(1.5em,2.75rem)]"
            role="group"
            aria-label="Areas of expertise"
            style={{ fontSize: 'var(--mtx-dial-word)', overflow: 'hidden', maskImage: 'linear-gradient(90deg, transparent, black 7%, black 93%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, black 7%, black 93%, transparent)' }}
          >
            <div ref={ruler} className="absolute inset-y-0 left-1/2 flex w-max items-stretch gap-[0.5em]" data-ruler-track="">
              {chapters.map((c, i) => (
                <button
                  key={c.slug}
                  type="button"
                  data-ruler-word=""
                  aria-current={i === idx ? 'true' : undefined}
                  onClick={() => go(i)}
                  className={`flex min-h-11 shrink-0 cursor-pointer items-center font-display leading-[1] font-bold tracking-[-0.035em] whitespace-nowrap uppercase transition-colors duration-300 ${i === idx ? 'text-ink' : 'text-muted hover:text-ink-2'}`}
                >
                  <span className="block" data-ruler-label="" style={i ? { transform: 'scale(0.42)', transformOrigin: '0% 50%' } : undefined}>
                    {c.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <Ticks pos="bottom" />
        </div>
        <div className="mtx-dial-chrome container-site pt-2.5 lg:pt-[clamp(0.5rem,1.4vh,0.875rem)]" aria-hidden="true">
          <div className="relative grid grid-cols-4">
            <span ref={marker} className="absolute -top-px left-0 h-0.5 w-1/4 bg-brand" data-dial-marker="" />
            {chapters.map((c, i) => (
              <button
                key={c.slug}
                type="button"
                tabIndex={-1}
                data-active={i === idx}
                onClick={() => go(i)}
                className="min-h-11 cursor-pointer truncate border-t border-line pt-2 pr-3 text-left font-mono text-eyebrow text-muted uppercase transition-colors duration-300 hover:text-ink-2 data-[active=true]:text-ink lg:pt-2.5"
              >
                <span className="tabular-nums">{c.num}</span>
                <span className="hidden lg:inline"> · {c.name}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="mtx-dial-body w-full pt-6 sm:pt-8">
          <div ref={track} className="mtx-dial-track">
            {chapters.map((c) => {
              const m = meta[c.slug]
              return (
                <article key={c.slug} className="mtx-dial-slide" aria-labelledby={`dial-${c.slug}`} data-dial-slide="">
                  <div className="mtx-dial-grid container-site grid gap-y-4 sm:gap-y-6 md:grid-cols-2 md:items-center md:gap-x-10 lg:grid-cols-12 lg:gap-x-12">
                    <div className="flex min-w-0 flex-col text-left lg:col-span-6">
                      <div className="flex items-center gap-3">
                        <m.Icon aria-hidden="true" className="size-4.5 shrink-0 text-brand-ink lg:size-5" />
                        <span className="font-mono text-eyebrow text-brand-ink tabular-nums">{c.num}</span>
                        <span className="h-px flex-1 bg-line" aria-hidden="true" />
                      </div>
                      <h3 id={`dial-${c.slug}`} className="mtx-dial-name mt-5 font-display text-h1 text-ink">{c.name}</h3>
                      <p className="mt-3 font-display text-[clamp(1.5rem,1.1rem+1.9vw,2.25rem)] leading-[1.1] text-ink lg:mt-[clamp(1rem,2.6vh,1.75rem)] lg:text-[min(clamp(2rem,0.9rem+1.9vw,3rem),6vh)] lg:leading-[1.06]">
                        {c.motto.map((w) => (
                          <span key={w} className="sm:block">{w} </span>
                        ))}
                      </p>
                      <p className="mtx-dial-lead mt-2 max-w-[40ch] text-small text-ink-2 sm:mt-3 sm:text-body lg:mt-[clamp(0.75rem,2vh,1.25rem)] lg:text-lead">{m.lead}</p>
                      <Btn href={href(c)} variant="secondary" size="md" arrow className="mt-4 self-start sm:mt-5 lg:mt-[clamp(1.25rem,3.2vh,2.25rem)]">
                        Explore {c.name}
                      </Btn>
                    </div>
                    <div className="mtx-dial-plate min-w-0 lg:col-span-5 lg:col-start-8" data-dial-plate="">
                      <div className={`flex flex-col rounded-2xl border px-4 py-3 text-left sm:px-7 sm:py-6 lg:rounded-3xl lg:px-8 lg:py-[clamp(1.25rem,3vh,2rem)] ${m.plate}`}>
                        <div className="flex items-end justify-between gap-4 pb-2 sm:pb-3 lg:pb-4">
                          <p className="font-mono text-eyebrow text-ink-2 uppercase">{String(c.disciplines.length).padStart(2, '0')} disciplines</p>
                          <p className="font-display text-[clamp(1.5rem,1rem+1.8vw,2.75rem)] leading-[0.8] text-brand-ink tabular-nums" aria-hidden="true">{c.num}</p>
                        </div>
                        <ul className="flex flex-col" aria-label={`${c.name} disciplines`}>
                          {c.disciplines.map((d, i) => (
                            <li key={d.slug} className="flex items-center gap-3 border-t border-ink/12 py-2 sm:gap-4 sm:py-2.5 lg:py-[clamp(0.5rem,1.3vh,0.8rem)]">
                              <span className="w-5 shrink-0 font-mono text-eyebrow text-ink-2 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                              <span className="text-[0.9375rem] font-medium text-ink sm:text-body lg:text-[1.0625rem]">{d.title}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function Ticks({ pos }) {
  return (
    <div
      aria-hidden="true"
      data-ruler-ticks=""
      className={`relative h-5 w-full border-line-strong sm:h-6 lg:h-4 ${pos === 'top' ? 'border-t' : 'border-b'}`}
      style={{
        backgroundImage:
          'linear-gradient(90deg, transparent calc(50% - 0.5px), var(--color-line-strong) calc(50% - 0.5px), var(--color-line-strong) calc(50% + 0.5px), transparent calc(50% + 0.5px)), linear-gradient(90deg, transparent calc(50% - 0.5px), var(--color-muted) calc(50% - 0.5px), var(--color-muted) calc(50% + 0.5px), transparent calc(50% + 0.5px))',
        backgroundSize: '0.75rem 0.625rem, 3.75rem 1.25rem',
        backgroundRepeat: 'repeat-x',
        backgroundPosition: pos === 'top' ? '50% 0, 50% 0' : '50% 100%, 50% 100%',
      }}
    >
      <span className={`absolute left-1/2 h-full w-0.5 -translate-x-1/2 bg-brand ${pos === 'top' ? 'top-0' : 'bottom-0'}`} />
    </div>
  )
}
