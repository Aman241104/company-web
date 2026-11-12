'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Pause, Play, Star, Globe, Server, ShoppingCart, Smartphone, Database, Cloud, FileText, BarChart3 } from 'lucide-react'
import { siAmazonwebservices, siCloudflare, siDjango, siDocker, siFirebase, siFlutter, siFramer, siGithubactions, siGoogleads, siGraphql, siGreensock, siMeta, siNextdotjs, siNodedotjs, siPostgresql, siPrisma, siPython, siRazorpay, siReact, siRedis, siSanity, siShopify, siStrapi, siStripe, siSupabase, siTailwindcss, siTypescript, siVercel, siWhatsapp } from 'simple-icons'

const si = { siAmazonwebservices, siCloudflare, siDjango, siDocker, siFirebase, siFlutter, siFramer, siGithubactions, siGoogleads, siGraphql, siGreensock, siMeta, siNextdotjs, siNodedotjs, siPostgresql, siPrisma, siPython, siRazorpay, siReact, siRedis, siSanity, siShopify, siStrapi, siStripe, siSupabase, siTailwindcss, siTypescript, siVercel, siWhatsapp }
import { caseStudiesData } from '@/lib/caseStudies'
import { stack } from '@/lib/site'
import { Eyebrow, LineHeading } from '../ui'
import ConsultButton from '../ConsultButton'

gsap.registerPlugin(ScrollTrigger)

/* ---------------- Showreel: MEHTA wordmark as a window onto our work ---------------- */
const shots = Object.values(caseStudiesData).filter((s) => s.heroImage).map((s) => s.heroImage)

export function Showreel() {
  const stage = useRef(null)
  const word = useRef(null)
  const copy = useRef(null)
  const wall = useRef(null)
  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: stage.current, start: 'top top', end: '+=140%', scrub: 0.5, pin: true } })
      tl.fromTo(word.current, { scale: 1 }, { scale: 26, ease: 'power2.in', transformOrigin: '50% 50%' }, 0)
        .fromTo(copy.current, { opacity: 1 }, { opacity: 0, ease: 'none', duration: 0.2 }, 0)
        .fromTo(wall.current, { scale: 1.25 }, { scale: 1, ease: 'none' }, 0)
    })
    return () => mm.revert()
  }, [])
  const cols = [0, 1, 2, 3].map((c) => shots.filter((_, i) => i % 4 === c))
  return (
    <section className="relative bg-bg" aria-labelledby="showreel-title" id="showreel">
      <h2 className="sr-only" id="showreel-title">Mehta Technologies showreel</h2>
      <div className="relative w-full">
        <div ref={stage} className="mtx-showreel-stage relative isolate w-full overflow-hidden bg-bg">
          <div ref={wall} className="absolute inset-0 grid grid-cols-4 gap-3 bg-ink p-3" aria-hidden="true">
            {cols.map((col, c) => (
              <div key={c} className={`flex flex-col gap-3 ${c % 2 ? '-translate-y-[18%]' : ''}`}>
                {[...col, ...col].map((src, i) => (
                  <div key={i} className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-xl">
                    <Image src={src} alt="" fill sizes="25vw" className="object-cover object-top" />
                  </div>
                ))}
              </div>
            ))}
          </div>
          <svg className="absolute inset-0 size-full" aria-hidden="true">
            <defs>
              <mask id="reel-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%">
                <rect width="100%" height="100%" fill="white" />
                <g ref={word}>
                  <text x="50%" y="52%" textAnchor="middle" dominantBaseline="middle" className="font-display" style={{ fontSize: 'min(26vw, 30rem)', fontWeight: 800, letterSpacing: '-0.04em' }} fill="black">
                    MEHTA
                  </text>
                </g>
              </mask>
            </defs>
            <rect width="100%" height="100%" fill="var(--color-bg)" mask="url(#reel-mask)" />
          </svg>
          <div ref={copy} className="mtx-showreel-copy pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-between px-6 py-[clamp(5.5rem,12vh,8rem)] text-center">
            <div className="pointer-events-auto">
              <Eyebrow>Showreel</Eyebrow>
            </div>
            <p className="font-mono text-eyebrow text-muted uppercase">{shots.length} live projects · scroll</p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------- At a glance ---------------- */
function Count({ value }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(value)
  useEffect(() => {
    const m = /^([\d.]+)(.*)$/.exec(value)
    if (!m || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const target = parseFloat(m[1]), dec = (m[1].split('.')[1] || '').length, suffix = m[2]
    const el = ref.current
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const o = { v: 0 }
      gsap.to(o, { v: target, duration: 1.6, ease: 'power3.out', onUpdate: () => setShown(o.v.toFixed(dec) + suffix) })
    })
    io.observe(el)
    return () => io.disconnect()
  }, [value])
  return (
    <span ref={ref} aria-hidden="true" data-count={value}>
      {shown}
    </span>
  )
}

function Metric({ n, value, title, note, tone, big, children, dots }) {
  return (
    <div className={`relative isolate flex flex-col overflow-hidden rounded-3xl border border-line p-7 text-ink sm:p-9 lg:p-10 ${tone} ${big ? 'min-h-[20rem] lg:min-h-[32rem] lg:flex-1' : 'min-h-[13rem] lg:min-h-[15rem]'}`}>
      {dots && <span className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true" style={{ backgroundImage: 'radial-gradient(color-mix(in oklab, var(--color-brand) 30%, transparent) 1.3px, transparent 1.6px)', backgroundSize: '18px 18px', maskImage: 'linear-gradient(to bottom, black, transparent 70%)' }} />}
      <span className="font-mono text-eyebrow text-muted">{n}</span>
      <p className={`mt-auto pt-8 font-display font-bold tracking-[-0.045em] tabular-nums ${big ? 'text-[clamp(4.5rem,2.4rem+7vw,9rem)]' : 'text-[clamp(3.25rem,2rem+4vw,5.5rem)]'}`}>
        <span className="sr-only">{value}</span>
        <Count value={value} />
      </p>
      <h3 className="mt-4 text-h3 font-semibold">{title}</h3>
      <p className="mt-1 text-body text-ink-2">{note}</p>
      {children}
    </div>
  )
}

export function Metrics() {
  const [paused, setPaused] = useState(false)
  const tools = stack.flatMap((s) => s.tools)
  return (
    <section className="relative overflow-clip bg-bg py-section" id="metrics">
      <div className="container-site">
        <div className="mx-auto flex flex-col items-center text-center">
          <div data-reveal="true">
            <Eyebrow>Mehta Technologies</Eyebrow>
          </div>
          <LineHeading lines={['At a glance']} className="mt-5 font-display text-balance text-h1" />
          <p className="mt-6 max-w-[54ch] text-lead text-ink-2" data-reveal="true">Websites, e-commerce, custom software, apps and digital marketing — since 2019.</p>
        </div>
        <div className="mt-14 grid gap-5 lg:mt-20 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <Metric n="01" value="150+" title="Projects delivered" note="Websites, stores & software" tone="bg-paper" big dots />
            <Metric n="02" value="4.9" title="Average client rating" note="Out of 5, from real clients" tone="bg-surface">
              <span className="relative mt-6 inline-flex" aria-hidden="true">
                <span className="flex gap-1.5">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="size-6 shrink-0 fill-line stroke-line-strong lg:size-7" />
                  ))}
                </span>
                <span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: '98%' }}>
                  <span className="flex gap-1.5">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <Star key={i} className="size-6 shrink-0 fill-brand stroke-brand lg:size-7" />
                    ))}
                  </span>
                </span>
              </span>
            </Metric>
          </div>
          <div className="flex flex-col gap-5">
            <Metric n="03" value="100+" title="Happy clients" note="Across India & abroad" tone="bg-brand-soft" />
            <Metric n="04" value="99%" title="On-time delivery" note="Against agreed timelines" tone="bg-surface-2">
              <span className="mt-6 block h-1.5 overflow-hidden rounded-full bg-line" aria-hidden="true">
                <span className="block h-full w-[99%] rounded-full bg-brand-gradient" />
              </span>
            </Metric>
            <Metric n="05" value="24 hrs" title="Response time" note="To every new enquiry" tone="bg-bg" />
          </div>
        </div>
      </div>
      <div className="mt-20 lg:mt-28">
        <div className="container-site flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          <p className="text-center font-mono text-eyebrow text-muted uppercase">The stack behind every project we ship</p>
          <button type="button" onClick={() => setPaused((v) => !v)} aria-pressed={paused} aria-label={paused ? 'Play the technology list' : 'Pause the technology list'} className="inline-grid size-11 shrink-0 place-items-center rounded-full border border-line-strong bg-bg text-ink-2 transition-colors duration-300 hover:border-ink hover:text-ink motion-reduce:hidden md:size-9">
            {paused ? <Play aria-hidden="true" className="size-3.5" /> : <Pause aria-hidden="true" className="size-3.5" />}
          </button>
        </div>
        <div className="mtx-metrics-marquee mt-7 overflow-hidden py-2" data-paused={paused ? '' : undefined}>
          <div className="mtx-metrics-marquee-track flex w-max">
            {[0, 1].map((k) => (
              <ul key={k} className={`mtx-metrics-marquee-list flex shrink-0 items-center ${k ? 'mtx-metrics-marquee-dup' : ''}`} aria-label={k ? undefined : 'The stack behind every project we ship'} aria-hidden={k ? true : undefined}>
                {tools.map((t) => (
                  <li key={t} className="flex items-center px-4 font-display text-[clamp(1.25rem,0.95rem+1.25vw,2.25rem)] font-semibold tracking-[-0.03em] whitespace-nowrap text-ink/85 lg:px-6">
                    <span className="mr-8 size-1.5 shrink-0 rounded-full bg-brand lg:mr-12" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------- Partners / clients loop ---------------- */
export function Partners() {
  const [paused, setPaused] = useState(false)
  const clients = Object.values(caseStudiesData).filter((s) => s.slug !== 'vibo-erp' && s.status !== 'in-progress')
  return (
    <section className="relative overflow-clip border-brand-gradient-t bg-brand-veil py-section" id="partners">
      <div className="container-site relative">
        <div className="mx-auto flex flex-col items-center text-center">
          <div data-reveal="true">
            <Eyebrow>Clients</Eyebrow>
          </div>
          <LineHeading lines={['Trusted by growing', 'businesses']} className="mt-5 font-display text-balance text-h1" />
          <p className="mt-6 max-w-[54ch] text-lead text-ink-2" data-reveal="true">Brands and businesses that have grown with us.</p>
        </div>
      </div>
      <div className="relative mt-12 lg:mt-16">
        <div className="mtx-partners-loop relative overflow-hidden py-6" data-paused={paused ? '' : undefined}>
          <div className="mtx-partners-track flex w-max" style={{ animation: 'mtx-metrics-marquee 70s linear infinite', animationPlayState: paused ? 'paused' : 'running' }}>
            {[0, 1].map((k) => (
              <ul key={k} className={`mtx-partners-group flex shrink-0 items-start ${k ? 'mtx-partners-dup' : ''}`} aria-label={k ? undefined : 'Clients'} aria-hidden={k ? true : undefined}>
                {clients.map((c) => (
                  <li key={c.slug} className="shrink-0 px-2 sm:px-3 lg:px-4">
                    <figure className="group/plate flex w-48 flex-col items-center sm:w-56 lg:w-64">
                      <div className="relative grid h-32 w-full place-items-center overflow-hidden rounded-2xl border border-line bg-bg px-5 text-center shadow-lift transition-[translate,box-shadow] duration-500 ease-out-expo group-hover/plate:-translate-y-1.5 group-hover/plate:shadow-float sm:h-36 lg:h-44">
                        <span className="font-display text-[1.35rem] leading-tight font-bold tracking-[-0.02em] text-ink lg:text-[1.6rem]">{c.name}</span>
                      </div>
                      <figcaption className="mt-3 max-w-full text-center text-[0.8125rem] leading-snug text-balance text-ink-2">{c.category}</figcaption>
                    </figure>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
        <div className="container-site mt-3 flex justify-end">
          <button type="button" onClick={() => setPaused((v) => !v)} aria-pressed={paused} aria-label={paused ? 'Play the client list' : 'Pause the client list'} className="inline-grid size-11 shrink-0 place-items-center rounded-full border border-line-strong bg-bg text-ink-2 transition-colors duration-300 hover:border-ink hover:text-ink motion-reduce:hidden md:size-9">
            {paused ? <Play aria-hidden="true" className="size-3.5" /> : <Pause aria-hidden="true" className="size-3.5" />}
          </button>
        </div>
      </div>
      <div className="container-site relative mt-10 flex justify-center lg:mt-14">
        <ConsultButton>Start a Project</ConsultButton>
      </div>
    </section>
  )
}

/* ---------------- Technology arc ---------------- */
const logos = [
  ['siNextdotjs', 'Next.js', 'Frontend'], ['siReact', 'React', 'Frontend'], ['siTypescript', 'TypeScript', 'Frontend'], ['siTailwindcss', 'Tailwind CSS', 'Frontend'], ['siFramer', 'Framer Motion', 'Frontend'], ['siGreensock', 'GSAP', 'Frontend'],
  ['siNodedotjs', 'Node.js', 'Backend'], ['siPython', 'Python', 'Backend'], ['siDjango', 'Django', 'Backend'], ['siGraphql', 'GraphQL', 'Backend'],
  ['siShopify', 'Shopify', 'Commerce'], ['siStripe', 'Stripe', 'Commerce'], ['siRazorpay', 'Razorpay', 'Commerce'], ['siWhatsapp', 'WhatsApp', 'Commerce'],
  ['siReact', 'React Native', 'Mobile'], ['siFlutter', 'Flutter', 'Mobile'], ['siFirebase', 'Firebase', 'Mobile'],
  ['siPostgresql', 'PostgreSQL', 'Data'], ['siSupabase', 'Supabase', 'Data'], ['siPrisma', 'Prisma', 'Data'], ['siRedis', 'Redis', 'Data'],
  ['siVercel', 'Vercel', 'Cloud'], ['siAmazonwebservices', 'AWS', 'Cloud'], ['siCloudflare', 'Cloudflare', 'Cloud'], ['siDocker', 'Docker', 'Cloud'], ['siGithubactions', 'GitHub Actions', 'Cloud'],
  ['siSanity', 'Sanity', 'CMS'], ['siStrapi', 'Strapi', 'CMS'], ['siGoogleads', 'Google Ads', 'Marketing'], ['siMeta', 'Meta Ads', 'Marketing'],
]
const domainIcon = { Frontend: Globe, Backend: Server, Commerce: ShoppingCart, Mobile: Smartphone, Data: Database, 'Cloud & DevOps': Cloud, CMS: FileText, Marketing: BarChart3 }

export function Technology() {
  const box = useRef(null)
  const cards = useRef([])
  useEffect(() => {
    const n = logos.length
    const place = (p) => {
      // Gentle dome near the bottom of the viewport; tiles ride along it as
      // the section scrolls and flip to their name as they pass the middle.
      const W = box.current.clientWidth, H = box.current.clientHeight
      const R = W * 0.9, cx = W / 2, cy = H * (W < 768 ? 0.86 : 0.8) + R
      const span = W + 240
      cards.current.forEach((el, i) => {
        if (!el) return
        const x = (((i / n + p * 0.9) % 1) * span) - 120
        const dx = Math.max(-R + 1, Math.min(R - 1, x - cx))
        const y = cy - Math.sqrt(R * R - dx * dx)
        const ang = Math.atan2(dx, Math.sqrt(R * R - dx * dx)) * (180 / Math.PI)
        const enter = Math.min(1, Math.max(0, p * 6 - (i / n) * 1.5))
        el.style.opacity = String(enter)
        el.style.transform = `translate(${x}px, ${y + (1 - enter) * 60}px) translate(-50%,-50%) rotate(${ang}deg)`
        el.firstChild.style.transform = Math.abs(dx) < W * 0.05 ? 'rotateY(180deg)' : ''
      })
    }
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      place(0.4)
      cards.current.forEach((el) => el && (el.style.opacity = '1'))
      return
    }
    const st = ScrollTrigger.create({ trigger: box.current.parentElement, start: 'top top', end: 'bottom bottom', onUpdate: (s) => place(s.progress) })
    place(0)
    const r = () => place(st.progress)
    window.addEventListener('resize', r)
    return () => {
      st.kill()
      window.removeEventListener('resize', r)
    }
  }, [])
  return (
    <section className="relative bg-surface" id="technology">
      <div className="relative h-[150vh] md:h-[240vh]">
        <div ref={box} className="sticky top-0 h-svh w-full overflow-hidden [mask-image:linear-gradient(to_bottom,black_86%,transparent)]">
          <div className="absolute inset-0" aria-hidden="true">
            {logos.map(([key, name, dom], i) => {
              const icon = si[key]
              return (
                <div key={name} ref={(el) => (cards.current[i] = el)} className="mtx-tech-card absolute top-0 left-0 size-10 opacity-0 will-change-transform md:size-[60px]">
                  <div className="mtx-tech-card-inner relative size-full transition-transform duration-700 ease-out-expo [transform-style:preserve-3d]">
                    <div className="mtx-tech-face absolute inset-0 grid place-items-center rounded-xl bg-bg p-2 shadow-lift ring-1 ring-line [backface-visibility:hidden] md:rounded-2xl md:p-3">
                      <svg viewBox="0 0 24 24" className="size-full" fill={`#${icon?.hex === '000000' || icon?.hex === 'FFFFFF' ? '0A1124' : icon?.hex}`}>
                        <path d={icon?.path} />
                      </svg>
                    </div>
                    <div className="mtx-tech-face mtx-tech-back absolute inset-0 flex flex-col items-center justify-center rounded-xl bg-brand-gradient px-1 text-center text-on-brand [backface-visibility:hidden] [transform:rotateY(180deg)] md:rounded-2xl">
                      <span className="text-[7px] leading-tight font-semibold md:text-[9px]">{name}</span>
                      <span className="mt-0.5 font-mono text-[5.5px] leading-none tracking-[0.12em] uppercase md:text-[7px]">{dom}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="pointer-events-none absolute top-[5.5rem] left-1/2 w-[min(34rem,calc(100%-2.5rem))] -translate-x-1/2 md:top-1/2 md:-translate-y-1/2">
            <div className="mx-auto flex flex-col items-center text-center">
              <div data-reveal="true">
                <Eyebrow>Technology</Eyebrow>
              </div>
              <LineHeading lines={['Built with the tools', 'that ship']} className="mt-5 font-display text-balance text-h2" />
              <p className="mt-4 max-w-[54ch] text-body text-ink-2" data-reveal="true">The frameworks and platforms behind every product we deliver.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container-site pt-12 pb-section md:pt-6">
        <p className="mb-6 font-mono text-eyebrow text-muted uppercase">By domain</p>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stack.map((s, i) => {
            const I = domainIcon[s.domain] || Globe
            return (
              <li key={s.domain} className="flex flex-col rounded-2xl border border-line bg-bg p-6 shadow-lift" data-reveal="true" style={{ '--i': i % 4 }}>
                <div className="flex items-center gap-3">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand-ink">
                    <I aria-hidden="true" className="size-5" />
                  </span>
                  <h3 className="text-h3 text-ink">{s.domain}</h3>
                </div>
                <p className="mt-4 text-small text-ink-2">{s.text}</p>
                <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={`${s.domain} stack`}>
                  {s.tools.map((t) => (
                    <li key={t} className="rounded-full border border-line bg-surface px-2.5 py-1 font-mono text-[0.6875rem] leading-none text-ink-2">{t}</li>
                  ))}
                </ul>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
