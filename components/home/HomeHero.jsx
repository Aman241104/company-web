'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Phone, MessageCircle, ArrowUpRight } from 'lucide-react'
import { chapters } from '@/lib/services'
import { contact, stats, processSteps } from '@/lib/site'
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion'
import { StartProjectButton } from './ui'
import { Eyebrow, GhostLink, wrap, btnGhost } from './primitives'

function useClock(tz) {
  const [t, setT] = useState('--:--')
  useEffect(() => {
    const f = () => setT(new Intl.DateTimeFormat('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: tz }).format(new Date()))
    f()
    const id = setInterval(f, 30_000)
    return () => clearInterval(id)
  }, [tz])
  return t
}

export function LocalTime({ className = '' }) {
  const t = useClock(contact.timezone)
  return <span className={`font-mono tabular-nums ${className}`} suppressHydrationWarning>{t}</span>
}

// Kanban-style "project board": our real 4-step process laid out like the
// tool clients actually see during a build. Decorative, so aria-hidden with
// a text equivalent in the HowWeWork section further down.
function ProjectBoard() {
  const reduced = usePrefersReducedMotion()
  const [practice, setPractice] = useState(0)
  return (
    <div aria-hidden="true" className="relative rounded-2xl sm:rounded-3xl border border-ink/10 bg-bg shadow-[0_30px_80px_-30px_rgba(10,17,36,0.35)] overflow-hidden">
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-ink/10">
        <span className="w-2.5 h-2.5 rounded-full bg-ink/15" />
        <span className="w-2.5 h-2.5 rounded-full bg-ink/15" />
        <span className="w-2.5 h-2.5 rounded-full bg-ink/15" />
        <span className="ml-3 text-[11px] font-mono text-ink/50">mehta / project-board</span>
      </div>
      <div className="grid grid-cols-12">
        <aside className="hidden md:block col-span-3 border-r border-ink/10 p-4 bg-cream/60">
          <p className="font-mono text-[10px] uppercase tracking-widest text-ink/45 mb-2">Practices</p>
          {chapters.map((c, i) => (
            <button
              key={c.slug}
              type="button"
              tabIndex={-1}
              onClick={() => setPractice(i)}
              className={`w-full flex justify-between text-left text-xs px-2.5 py-2 rounded-lg mb-1 ${i === practice ? 'bg-accent-soft text-accent font-semibold' : 'text-ink/65'}`}
            >
              {c.name} <span className="font-mono">{c.disciplines.length}</span>
            </button>
          ))}
          <p className="font-mono text-[10px] uppercase tracking-widest text-ink/45 mt-5 mb-2">Engagement</p>
          <p className="text-xs text-ink/70">Fixed price or retainer</p>
          <p className="text-xs text-ink/70 mt-1">2 wks – 12 mo support</p>
        </aside>
        <div className="col-span-12 md:col-span-9 p-3 sm:p-4">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <p className="text-sm font-bold text-ink">Project board · {chapters[practice].name}</p>
            <span className="inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full bg-accent-soft text-accent font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" /> Accepting new projects
            </span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
            {processSteps.map((s, si) => (
              <div key={s.num} className="rounded-xl bg-cream/70 p-2 sm:p-2.5">
                <p className="flex justify-between text-[10px] sm:text-[11px] font-semibold text-ink mb-2">
                  <span><span className="font-mono text-accent">{s.num}</span> {s.title.split(' ')[0]}</span>
                  <span className="font-mono text-ink/40">{s.items.length}</span>
                </p>
                {s.items.map((it, ii) => (
                  <motion.div
                    key={it}
                    initial={{ opacity: 0, y: reduced ? 0 : 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: reduced ? 0 : 0.15 + si * 0.12 + ii * 0.05 }}
                    className="rounded-lg bg-bg border border-ink/10 p-2 mb-1.5 last:mb-0"
                  >
                    <p className="text-[10px] sm:text-[11px] text-ink leading-tight mb-1.5">{it}</p>
                    <div className="h-1 rounded-full bg-ink/10 overflow-hidden">
                      <div className="h-full bg-accent rounded-full" style={{ width: `${Math.max(20, 100 - si * 22 - ii * 7)}%` }} />
                    </div>
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function HomeHero() {
  const reduced = usePrefersReducedMotion()
  return (
    <>
      <section className="relative pt-28 sm:pt-36 md:pt-40 pb-14 sm:pb-20 bg-cream overflow-hidden">
        <div className="absolute inset-0 bg-grid-dots opacity-60 pointer-events-none [mask-image:radial-gradient(ellipse_70%_60%_at_50%_10%,black,transparent)]" />
        <div className={`${wrap} relative text-center`}>
          <p className="font-display text-sm sm:text-lg font-semibold text-ink/80 mb-6 sm:mb-8">
            {chapters.map((c, i) => (
              <span key={c.slug}>
                {i > 0 && <span className="text-accent mx-2 sm:mx-3">•</span>}
                {c.name}
              </span>
            ))}
          </p>
          <motion.h1
            initial={{ opacity: 0, y: reduced ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[40px] leading-[1.02] sm:text-6xl lg:text-[88px] font-extrabold tracking-tight text-ink max-w-5xl mx-auto"
          >
            Websites that turn visitors into <span className="text-accent">customers</span>
          </motion.h1>
          <p className="mt-6 text-base sm:text-lg text-ink/70 leading-relaxed max-w-2xl mx-auto">
            {contact.city}&apos;s web development studio. We design and develop modern, fast and SEO-ready websites, online
            stores, software and apps that help businesses look credible, get found on Google and generate more enquiries.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-3">
            <StartProjectButton>Get Free Consultation</StartProjectButton>
            <a href={contact.tel} className={btnGhost}>
              <Phone size={15} /> Call {contact.phone}
            </a>
            <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className={btnGhost}>
              <MessageCircle size={15} /> WhatsApp
            </a>
          </div>
          <dl className="mt-12 sm:mt-14 grid grid-cols-3 max-w-xl mx-auto divide-x divide-ink/10 border-y border-ink/10">
            {stats.slice(0, 3).map((s) => (
              <div key={s.label} className="py-4 px-2">
                <dd className="font-display text-2xl sm:text-3xl font-extrabold text-ink">{s.value}</dd>
                <dt className="text-[11px] sm:text-xs text-ink/60 mt-1">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="moves-heading" className="relative bg-bg py-16 sm:py-24">
        <div className={wrap}>
          <div className="text-center mb-10 sm:mb-14">
            <Eyebrow className="mb-4">Process</Eyebrow>
            <h2 id="moves-heading" className="font-display text-[34px] sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink leading-[1.05]">
              How a Mehta project <span className="text-accent">moves</span>
            </h2>
            <p className="mt-4 text-ink/70 max-w-xl mx-auto">Four steps, a fixed-price proposal and a live staging link you can check any time.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <StartProjectButton />
              <GhostLink href="/work">See Our Work <ArrowUpRight size={15} /></GhostLink>
            </div>
          </div>
          <ProjectBoard />
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-ink/60">
            <span>{contact.city} · <LocalTime className="text-ink" /> IST</span>
            <span>{contact.hours}</span>
            <Link href="/how-we-work" className="font-semibold text-accent hover:underline">How we work →</Link>
          </div>
        </div>
      </section>
    </>
  )
}
