'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Phone, MessageCircle } from 'lucide-react'
import { contact, stats } from '@/lib/site'
import { btnClass, Arrow } from '../ui'
import { openConsult } from '../consult'

const cells = [
  [0, 864, 96, 4.13], [192, 384, 96, 6.71], [384, 384, 192, 6.66], [672, 192, 96, 6.01], [864, 192, 96, 2.67], [1056, 288, 96, 2.78],
  [1152, 480, 192, 5.8], [1440, 288, 96, 11.38], [1632, 192, 96, 7.05], [1824, 1152, 96, 8.93], [1920, 96, 192, 10.52], [2112, 0, 96, 10.4],
  [2304, 480, 96, 10.7], [2496, 0, 96, 10.43],
]
const ticks = [
  [0, 576, 9, 6.51], [192, 576, 9, 6.71], [192, 384, 13, 4.56], [288, 96, 9, 0.66], [384, 960, 9, 2.88], [480, 480, 9, 2.61], [672, 864, 9, 4.95],
  [672, 480, 9, 2.02], [768, 288, 13, 1.79], [960, 672, 9, 0.16], [1056, 0, 13, 3.83], [1152, 864, 9, 1.63], [1248, 1056, 9, 3.34], [1344, 768, 9, 4.98],
  [1440, 480, 13, 2.28], [1536, 864, 9, 3.55], [1728, 672, 9, 1.59], [1728, 864, 13, 5.49], [1920, 960, 9, 0.46], [2016, 288, 13, 1.46],
  [2112, 96, 9, 4.57], [2112, 864, 13, 6.6], [2304, 96, 9, 1.67], [2400, 576, 9, 5.6], [2496, 288, 9, 3.04], [2592, 1056, 9, 4.32],
]

// Typed rotating last line (benchmark: "Digital Future" → "Web Experiences" …).
const phrases = ['Customers', 'Enquiries', 'Bookings', 'Sales']
function Typed() {
  const [i, setI] = useState(0)
  const [n, setN] = useState(phrases[0].length)
  const [phase, setPhase] = useState('rest')
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let t
    if (phase === 'rest') t = setTimeout(() => setPhase('delete'), 2600)
    else if (phase === 'delete') t = n > 0 ? setTimeout(() => setN(n - 1), 45) : setTimeout(() => { setI((i + 1) % phrases.length); setPhase('type') }, 200)
    else if (phase === 'type') t = n < phrases[i].length ? setTimeout(() => setN(n + 1), 85) : setTimeout(() => setPhase('rest'), 0)
    return () => clearTimeout(t)
  }, [phase, n, i])
  return (
    <span className="mtx-hero-typed block whitespace-nowrap" aria-hidden="true" data-phase={phase}>
      <span className="text-brand-gradient">{phrases[i].slice(0, n) || '​'}</span>
      <span className="mtx-hero-caret" />
    </span>
  )
}

const stars = (color, size, seed) => ({
  backgroundColor: `color-mix(in oklab, ${color} ${seed}%, transparent)`,
  maskImage: `radial-gradient(circle at 12% 18%, #000 ${size}px, transparent ${size + 0.5}px), radial-gradient(circle at 38% 72%, #000 ${size}px, transparent ${size + 0.5}px), radial-gradient(circle at 64% 32%, #000 ${size}px, transparent ${size + 0.5}px), radial-gradient(circle at 86% 58%, #000 ${size}px, transparent ${size + 0.5}px)`,
  maskSize: `${180 + seed * 3}px ${160 + seed * 2}px`,
  WebkitMaskImage: `radial-gradient(circle at 12% 18%, #000 ${size}px, transparent ${size + 0.5}px), radial-gradient(circle at 38% 72%, #000 ${size}px, transparent ${size + 0.5}px), radial-gradient(circle at 64% 32%, #000 ${size}px, transparent ${size + 0.5}px), radial-gradient(circle at 86% 58%, #000 ${size}px, transparent ${size + 0.5}px)`,
  WebkitMaskSize: `${180 + seed * 3}px ${160 + seed * 2}px`,
})

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-svh flex-col overflow-hidden bg-bg" id="hero" aria-labelledby="hero-title">
      <div className="mtx-hero-in mtx-hero-sky pointer-events-none absolute inset-0 -z-10" aria-hidden="true" data-in="fade">
        <div className="mtx-hero-stars absolute -inset-8" style={stars('var(--color-ink)', 0.8, 30)} />
        <div className="mtx-hero-stars absolute -inset-8" style={stars('var(--color-brand)', 1, 55)} />
        <div className="mtx-hero-stars absolute -inset-8" style={stars('var(--color-brand-ink)', 1.2, 40)} />
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="mtx-hero-in size-full" data-in="fade" style={{ '--mtx-d': 1 }}>
          <div className="mtx-hero-grid relative size-full overflow-hidden">
            <div className="mtx-hero-grid-glow" />
            <div className="mtx-hero-grid-lines absolute inset-0" />
            <div className="absolute inset-0">
              {cells.map(([l, t, s, d], k) => (
                <span key={`c${k}`} className="mtx-hero-grid-cell" style={{ left: l, top: t, width: s, height: s, '--mtx-cell-delay': `${d}s` }} />
              ))}
              {ticks.map(([l, t, s, d], k) => (
                <span key={`t${k}`} className="mtx-hero-grid-tick" style={{ left: l, top: t, '--mtx-tick-size': `${s}px`, '--mtx-tick-delay': `${d}s` }} />
              ))}
            </div>
            <div className="mtx-hero-grid-sweep absolute inset-y-0 -left-1/2 w-[200%]" />
          </div>
        </div>
      </div>

      <div className="container-site relative z-20 grid flex-1 content-center items-center gap-y-10 pt-nav pb-12 lg:grid-cols-12 lg:gap-x-8 lg:pb-16">
        <div className="min-w-0 pt-[5.75rem] text-center sm:pt-[7rem] lg:col-span-7 lg:pt-6 lg:text-left">
          <p className="mtx-hero-in inline-flex max-w-full items-center gap-2 rounded-full border border-line bg-bg/80 px-3.5 py-1.5 text-[0.8125rem] leading-snug font-medium text-ink-2 shadow-lift sm:px-4 sm:text-small" style={{ '--mtx-d': 0 }}>
            <span className="size-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
            <span className="hidden sm:inline">Websites, E-Commerce, Software &amp; Digital Marketing</span>
            <span className="sm:hidden">Web, Software &amp; Marketing</span>
          </p>
          <h1 id="hero-title" className="mt-6 font-hero text-[clamp(2.25rem,0.6rem+4.3vw,4rem)] leading-[1] font-extrabold tracking-[-0.042em] text-ink sm:mt-7">
            <span className="block">
              <span className="mtx-hero-word" style={{ '--mtx-w': 0 }}>Websites</span> <span className="mtx-hero-word" style={{ '--mtx-w': 1 }}>That</span>
            </span>
            <span className="block">
              <span className="mtx-hero-word" style={{ '--mtx-w': 2 }}>Turn</span> <span className="mtx-hero-word" style={{ '--mtx-w': 3 }}>Visitors</span> <span className="mtx-hero-word" style={{ '--mtx-w': 4 }}>Into</span>
            </span>
            <span className="sr-only">Customers, Enquiries, Bookings and Sales</span>
            <span className="mtx-hero-word block" style={{ '--mtx-w': 5 }}>
              <Typed />
            </span>
          </h1>
          <p className="mtx-hero-in mx-auto mt-6 max-w-[36rem] text-[1.0625rem] leading-relaxed text-pretty text-ink-2 sm:mt-7 sm:text-[1.1875rem] lg:mx-0" style={{ '--mtx-d': 1 }}>
            {contact.city}&apos;s trusted partner for <span className="font-semibold text-brand-ink">Websites &amp; E-Commerce</span>, custom software and apps, and Google-ready digital marketing.
          </p>
          <div className="mtx-hero-in mt-7 flex justify-center sm:mt-8 lg:justify-start" style={{ '--mtx-d': 2 }}>
            <a href={contact.tel} className="group inline-flex h-11 items-center gap-2.5 rounded-full border border-line pr-4 pl-1.5 text-[0.9375rem] font-semibold text-ink tabular-nums transition-colors duration-300 ease-out-expo hover:border-line-strong sm:h-12 sm:pr-5 sm:text-base">
              <span className="grid size-8 place-items-center rounded-full bg-brand-soft text-brand-ink sm:size-9">
                <Phone aria-hidden="true" strokeWidth={2.25} className="size-3.5 sm:size-4" />
              </span>
              <span className="sr-only">Call</span>
              {contact.phone}
            </a>
          </div>
          <div className="mtx-hero-in mt-7 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 lg:justify-start" style={{ '--mtx-d': 3 }}>
            <button type="button" onClick={() => openConsult()} className={btnClass('primary', 'lg')}>
              <span>
                <span className="hidden sm:inline">Get Free Consultation</span>
                <span className="sm:hidden">Free Quote</span>
              </span>
              <Arrow />
            </button>
            <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className={btnClass('secondary', 'lg')}>
              <MessageCircle aria-hidden="true" className="size-[1.125rem] shrink-0 text-whatsapp" />
              <span>
                <span className="hidden sm:inline">WhatsApp Now</span>
                <span className="sm:hidden">WhatsApp</span>
                <span className="sr-only">(opens in a new tab)</span>
              </span>
            </a>
          </div>
          <dl className="mtx-hero-in mx-auto mt-9 grid max-w-[27rem] grid-cols-3 border-t border-line pt-5 sm:mt-10 lg:mx-0 lg:max-w-full" style={{ '--mtx-d': 4 }}>
            {stats.slice(0, 3).map((s, i) => (
              <div key={s.label} className={`flex flex-col-reverse items-center justify-end gap-1 px-2 lg:items-start ${i ? 'border-l border-line lg:pl-5' : 'lg:pl-0'}`}>
                <dt className="text-center text-[0.75rem] leading-snug text-muted lg:text-left">{s.label}</dt>
                <dd className="font-hero text-[1.625rem] leading-none font-bold tracking-[-0.03em] text-ink tabular-nums sm:text-[1.875rem]">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative hidden lg:col-span-5 lg:block">
          <div className="mtx-hero-in relative mx-auto aspect-square w-full max-w-[34rem]" data-in="fade" style={{ '--mtx-d': 3 }}>
            <div className="mtx-hero-float absolute inset-[8%] grid place-items-center">
              <Image src="/brand/mark-cobalt.png" alt="" width={345} height={256} priority className="mtx-hero-mark-flat pointer-events-none h-auto w-[86%] select-none dark:hidden" />
              <Image src="/brand/mark-white.png" alt="" width={345} height={256} priority className="mtx-hero-mark-flat pointer-events-none hidden h-auto w-[86%] select-none dark:block" />
            </div>
          </div>
        </div>
      </div>
      <div className="container-site pointer-events-none absolute inset-x-0 bottom-5 z-20 hidden sm:flex sm:justify-center" aria-hidden="true">
        <div className="mtx-hero-in flex flex-col items-center gap-2 font-mono text-[0.6875rem] tracking-[0.2em] text-muted uppercase" style={{ '--mtx-d': 6 }}>
          <span>Scroll</span>
          <span className="mtx-hero-cue-line" />
        </div>
      </div>
    </section>
  )
}
