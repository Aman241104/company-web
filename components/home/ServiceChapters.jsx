'use client'
import Link from 'next/link'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { chapters } from '@/lib/services'
import { Reveal, SectionHead, StartProjectButton } from './ui'
import { Eyebrow, wrap } from './primitives'

// Chapter surfaces rotate so each block reads as its own "page", like the
// benchmark's stacked chapters — tinted with our own palette.
const surfaces = ['bg-accent-soft', 'bg-bg', 'bg-cream-dim', 'bg-cream']

export function ServicesIndex() {
  return (
    <section id="services" className="bg-bg py-16 sm:py-24 border-t border-ink/10">
      <div className={`${wrap} grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center`}>
        <div className="lg:col-span-5">
          <SectionHead
            className="!mb-0"
            eyebrow="Services"
            title="Everything your business needs online"
            intro="From a first website to custom software, here is what we build. Every project is scoped to your exact requirements."
          />
        </div>
        <ol className="lg:col-span-7 border-t border-ink/10">
          {chapters.map((c) => (
            <li key={c.slug} className="border-b border-ink/10">
              <a href={`#chapter-${c.slug}`} className="group flex items-center gap-4 sm:gap-6 py-5 sm:py-6">
                <span className="font-mono text-xs text-accent font-semibold">{c.num}</span>
                <span className="flex-1">
                  <span className="block font-display text-xl sm:text-2xl font-bold text-ink group-hover:text-accent transition-colors">{c.name}</span>
                  <span className="block text-sm text-ink/60 mt-0.5">{c.motto.join(' ')}</span>
                </span>
                <span className="font-mono text-[11px] text-ink/45 hidden sm:inline">{c.disciplines.length} services</span>
                <ArrowDownRight size={18} className="text-ink/40 group-hover:text-accent transition-colors" />
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Chapter({ chapter, index }) {
  return (
    <section id={`chapter-${chapter.slug}`} aria-labelledby={`ch-${chapter.slug}`} className={`${surfaces[index % surfaces.length]} py-16 sm:py-24 scroll-mt-20`}>
      <div className={wrap}>
        <div className="flex items-center justify-between border-b border-ink/15 pb-3 mb-8 sm:mb-12">
          <Eyebrow>{`${chapter.num} / ${chapter.name}`}</Eyebrow>
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/55">
            {String(chapter.disciplines.length).padStart(2, '0')} disciplines
          </span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-10 sm:mb-14">
          <Reveal className="lg:col-span-8">
            <h2 id={`ch-${chapter.slug}`} className="font-display uppercase text-[clamp(30px,8.6vw,104px)] leading-[0.92] font-extrabold tracking-tight text-ink">
              <span className="sr-only">{chapter.name}: </span>
              {chapter.motto.map((w, i) => (
                <span key={w} className={`block ${i === 2 ? 'text-accent' : ''}`}>{w}</span>
              ))}
            </h2>
          </Reveal>
          <p className="lg:col-span-4 text-base text-ink/70 leading-relaxed">{chapter.intro}</p>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-2">
          {chapter.disciplines.map((d, i) => (
            <li key={d.slug} className="border-t border-ink/15">
              <Link href={`/services/${d.slug}`} className="group block py-5 h-full">
                <h3 className="flex items-start justify-between gap-3 font-display text-lg sm:text-xl font-bold text-ink group-hover:text-accent transition-colors">
                  {d.title}
                  <ArrowUpRight size={16} className="shrink-0 mt-1 text-ink/40 group-hover:text-accent transition-colors" />
                </h3>
                <p className="text-xs font-semibold text-ink mt-1">
                  <span className="font-mono text-accent mr-1.5">{String(i + 1).padStart(2, '0')}</span>
                  {d.tagline}
                </p>
                <p className="text-sm text-ink/65 leading-relaxed mt-2">{d.bullets.join(' · ')}</p>
                {d.pricing && <p className="mt-3 text-xs font-mono text-ink/70">{d.pricing}</p>}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap gap-3">
          <StartProjectButton service={chapter.disciplines[0].title}>Discuss {chapter.name}</StartProjectButton>
        </div>
      </div>
    </section>
  )
}

export default function ServiceChapters() {
  return (
    <>
      <div className="bg-accent-soft pt-20 sm:pt-28 text-center">
        <Eyebrow className="mb-4">Chapter 01</Eyebrow>
        <p aria-hidden="true" className="font-display uppercase text-[56px] sm:text-8xl lg:text-[140px] leading-[0.88] font-extrabold tracking-tight text-ink">
          What<br />we do
        </p>
      </div>
      {chapters.map((c, i) => (
        <Chapter key={c.slug} chapter={c} index={i} />
      ))}
    </>
  )
}
