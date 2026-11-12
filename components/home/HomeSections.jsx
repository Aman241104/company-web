'use client'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Mail, Phone, MessageCircle, MapPin } from 'lucide-react'
import { caseStudiesData } from '@/lib/caseStudies'
import { contact, stats, processSteps, whyUs, stack, industries } from '@/lib/site'
import { team } from '@/components/sections/Team'
import EnquiryForm from './EnquiryForm'
import { LocalTime } from './HomeHero'
import { Reveal, SectionHead, StartProjectButton } from './ui'
import { Eyebrow, GhostLink, wrap } from './primitives'

/* ---------------- Why choose us ---------------- */
export function WhyChoose() {
  return (
    <section className="bg-bg py-16 sm:py-24">
      <div className={wrap}>
        <SectionHead eyebrow="Why choose us" title={<>Why businesses choose <span className="text-accent">Mehta</span></>} />
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 border-b border-ink/10">
          {whyUs.map((r, i) => (
            <Reveal as="li" key={r.title} delay={i * 0.04} className="border-t border-ink/10 py-6">
              <h3 className="font-display text-xl font-bold text-ink">{r.title}</h3>
              <p className="text-xs font-semibold text-ink mt-1">
                <span className="font-mono text-accent mr-1.5">{String(i + 1).padStart(2, '0')}</span>
                {r.tag}
              </p>
              <p className="text-sm text-ink/65 leading-relaxed mt-2">{r.desc}</p>
            </Reveal>
          ))}
        </ol>
        <div className="mt-10 flex flex-wrap gap-3">
          <StartProjectButton />
          <GhostLink href="/work">See Our Work <ArrowUpRight size={15} /></GhostLink>
        </div>
      </div>
    </section>
  )
}

/* ---------------- Case studies ---------------- */
const featured = ['silver-spoon', 'sv-space-designs', 'prihaan-spices', 'chahana-dental', 'zingbliss-events']

export function CaseStudies() {
  return (
    <section id="work" className="bg-cream py-16 sm:py-24">
      <div className={wrap}>
        <SectionHead eyebrow="Our work" title="Case studies" intro="Challenge · Solution · Results — real projects, real numbers." />
        <div className="space-y-6 sm:space-y-8">
          {featured.map((slug, i) => {
            const s = caseStudiesData[slug]
            if (!s) return null
            return (
              <Reveal key={slug} as="article" className="rounded-3xl bg-bg border border-ink/10 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
                <Link href={`/work/${slug}`} className="relative block lg:col-span-5 aspect-[4/3] lg:aspect-auto bg-cream-dim">
                  <Image src={s.heroImage || '/og.png'} alt={`${s.name} website by Mehta Technologies`} fill sizes="(max-width:1024px) 100vw, 40vw" className="object-cover object-top" />
                </Link>
                <div className="lg:col-span-7 p-5 sm:p-8">
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/55">
                    <span className="text-accent">{String(i + 1).padStart(2, '0')}</span> · {s.category} · {s.year}
                  </p>
                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-ink mt-2">
                    <Link href={`/work/${slug}`} className="hover:text-accent transition-colors">{s.name}</Link>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-widest text-accent mb-1">Challenge</p>
                      <p className="text-sm text-ink/70 leading-relaxed">{s.challenge}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-widest text-accent mb-1">Solution</p>
                      <p className="text-sm text-ink/70 leading-relaxed">{s.solution}</p>
                    </div>
                  </div>
                  {s.metrics.length > 0 && (
                    <dl className="grid grid-cols-2 gap-4 mt-6 pt-5 border-t border-ink/10">
                      {s.metrics.slice(0, 2).map((m) => (
                        <div key={m.label}>
                          <dd className="font-display text-2xl sm:text-3xl font-extrabold text-ink">{m.value}</dd>
                          <dt className="text-xs text-ink/60 mt-0.5">{m.label}</dt>
                        </div>
                      ))}
                    </dl>
                  )}
                  <ul className="flex flex-wrap gap-1.5 mt-5" aria-label="Stack">
                    {s.architecture.map((a) => (
                      <li key={a} className="text-[11px] px-2.5 py-1 rounded-full border border-ink/15 text-ink/70">{a}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )
          })}
        </div>
        <div className="mt-10 text-center">
          <GhostLink href="/work">View all projects <ArrowUpRight size={15} /></GhostLink>
        </div>
      </div>
    </section>
  )
}

/* ---------------- At a glance + stack marquee ---------------- */
function Marquee({ items, reverse = false }) {
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <ul className={`flex w-max gap-3 ${reverse ? 'animate-marquee-r' : 'animate-marquee'} motion-reduce:animate-none`}>
        {[...items, ...items].map((t, i) => (
          <li key={i} aria-hidden={i >= items.length} className="whitespace-nowrap rounded-full border border-snow/15 px-4 py-2 text-sm text-snow/80">{t}</li>
        ))}
      </ul>
    </div>
  )
}

export function AtAGlance() {
  const tools = stack.flatMap((s) => s.tools)
  return (
    <section className="bg-night text-snow py-16 sm:py-24 overflow-hidden">
      <div className={wrap}>
        <Eyebrow className="mb-4 !text-ice [&>span]:!bg-ice">At a glance</Eyebrow>
        <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight max-w-3xl">
          Websites, stores, software and marketing — from {contact.city}, for businesses everywhere.
        </h2>
        <dl className="grid grid-cols-2 lg:grid-cols-5 gap-px bg-snow/10 mt-10 sm:mt-14 rounded-2xl overflow-hidden">
          {stats.map((s) => (
            <div key={s.label} className="bg-night p-5 sm:p-6">
              <dd className="font-display text-3xl sm:text-4xl font-extrabold text-snow">{s.value}</dd>
              <dt className="text-sm font-semibold mt-2">{s.label}</dt>
              <p className="text-xs text-snow/60 mt-0.5">{s.note}</p>
            </div>
          ))}
        </dl>
        <p className="mt-12 mb-4 text-sm text-snow/70">The stack behind every project we ship</p>
      </div>
      <div className="space-y-3">
        <Marquee items={tools.slice(0, Math.ceil(tools.length / 2))} />
        <Marquee items={tools.slice(Math.ceil(tools.length / 2))} reverse />
      </div>
    </section>
  )
}

/* ---------------- Clients ---------------- */
export function Clients() {
  const list = Object.values(caseStudiesData).filter((s) => s.slug !== 'vibo-erp' && s.status !== 'in-progress')
  return (
    <section className="bg-bg py-16 sm:py-20 overflow-hidden">
      <div className={`${wrap} flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8`}>
        <div>
          <Eyebrow className="mb-3">Clients</Eyebrow>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-ink">Trusted by growing businesses</h2>
          <p className="text-ink/65 mt-3">Brands that have grown with us.</p>
        </div>
        <StartProjectButton />
      </div>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <ul className="flex w-max gap-3 animate-marquee motion-reduce:animate-none">
          {[...list, ...list].map((s, i) => (
            <li key={i} aria-hidden={i >= list.length} className="w-60 shrink-0 rounded-2xl border border-ink/10 bg-cream p-4">
              <p className="font-display font-bold text-ink">{s.name}</p>
              <p className="text-xs text-ink/60 mt-1">{s.category}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ---------------- Technology by domain ---------------- */
export function TechStack() {
  return (
    <section className="bg-cream py-16 sm:py-24">
      <div className={wrap}>
        <SectionHead eyebrow="Technology" title="Built with the tools that ship" intro="The frameworks and platforms behind every product we deliver." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stack.map((s, i) => (
            <Reveal key={s.domain} delay={i * 0.03} className="rounded-2xl bg-bg border border-ink/10 p-5">
              <h3 className="font-display text-lg font-bold text-ink">{s.domain}</h3>
              <p className="text-sm text-ink/65 mt-1 mb-4">{s.text}</p>
              <ul className="flex flex-wrap gap-1.5">
                {s.tools.map((t) => (
                  <li key={t} className="text-[11px] px-2.5 py-1 rounded-full bg-cream text-ink/75">{t}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- How we work ---------------- */
export function HowWeWork({ withHead = true }) {
  return (
    <section id="how-we-work" className="bg-bg py-16 sm:py-24">
      <div className={wrap}>
        {withHead && (
          <SectionHead
            eyebrow="How we work"
            title="How we turn ideas into live products"
            intro="Four steps, a fixed-price milestone proposal and a live staging link. You are involved at every stage."
          />
        )}
        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {processSteps.map((s, i) => (
            <Reveal as="li" key={s.num} delay={i * 0.06} className="rounded-2xl border border-ink/10 bg-cream p-6">
              <p className="font-mono text-4xl font-bold text-accent">{s.num}</p>
              <h3 className="font-display text-xl font-bold text-ink mt-4">{s.title}</h3>
              <p className="text-sm text-ink/70 leading-relaxed mt-2">{s.text}</p>
              <ul className="mt-4 space-y-1.5">
                {s.items.map((it) => (
                  <li key={it} className="flex gap-2 text-sm text-ink/80">
                    <span aria-hidden="true" className="mt-2 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                    {it}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ---------------- Industries ---------------- */
export function Industries() {
  return (
    <section className="bg-cream-dim py-16 sm:py-24">
      <div className={wrap}>
        <SectionHead eyebrow="Industries" title="Industries we work with" intro="We build around how each sector actually sells — these are the ones we have shipped for." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {industries.map((ind) => (
            <div key={ind.name} className="rounded-2xl bg-bg border border-ink/10 p-5 flex flex-col">
              <h3 className="font-display text-lg font-bold text-ink">{ind.name}</h3>
              <p className="text-sm text-ink/65 mt-1">{ind.text}</p>
              <ul className="mt-4 pt-4 border-t border-ink/10 space-y-1 text-sm">
                {ind.work.map((slug) =>
                  caseStudiesData[slug] ? (
                    <li key={slug}>
                      <Link href={`/work/${slug}`} className="text-ink/80 hover:text-accent">{caseStudiesData[slug].name} →</Link>
                    </li>
                  ) : null
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- About / HQ ---------------- */
export function AboutHQ() {
  return (
    <section className="bg-bg py-16 sm:py-24">
      <div className={`${wrap} grid grid-cols-1 lg:grid-cols-12 gap-10`}>
        <div className="lg:col-span-7">
          <Eyebrow className="mb-4">About Mehta Technologies</Eyebrow>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-ink">
            Ahmedabad headquarters. Clients across India and abroad.
          </h2>
          <p className="text-ink/70 leading-relaxed mt-5 max-w-2xl">
            Mehta Technologies was founded in Ahmedabad in 2019 as a web development studio. Since then we have shipped 150+
            websites, e-commerce stores and software projects, built our own ERP (Vibo ERP), and grown to serve businesses across
            India and overseas. The people who scope your project are the people who build it.
          </p>
          <GhostLink href="/about" className="mt-6">Our story <ArrowUpRight size={15} /></GhostLink>
        </div>
        <div className="lg:col-span-5 rounded-3xl border border-ink/10 bg-cream p-6">
          <p className="font-mono text-[11px] uppercase tracking-widest text-ink/55">01 · HQ</p>
          <p className="font-display text-2xl font-bold text-ink mt-1">{contact.city}</p>
          <p className="text-sm text-ink/65">{contact.region}</p>
          <p className="text-sm text-ink/70 mt-3"><LocalTime className="text-ink text-lg font-bold" /> local time</p>
          <dl className="grid grid-cols-2 gap-4 mt-6 pt-5 border-t border-ink/10 text-sm">
            <div><dt className="text-ink/55 text-xs">Engagements</dt><dd className="font-semibold text-ink">Fixed scope & retainer</dd></div>
            <div><dt className="text-ink/55 text-xs">Support</dt><dd className="font-semibold text-ink">2 weeks – 12 months</dd></div>
            <div><dt className="text-ink/55 text-xs">Hours</dt><dd className="font-semibold text-ink">{contact.hours}</dd></div>
            <div><dt className="text-ink/55 text-xs">Serving</dt><dd className="font-semibold text-ink"><Link href="/locations" className="hover:text-accent">India & abroad</Link></dd></div>
          </dl>
        </div>
      </div>
    </section>
  )
}

/* ---------------- Team strip ---------------- */
export function TeamStrip() {
  return (
    <section className="bg-cream py-16 sm:py-24">
      <div className={wrap}>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <SectionHead className="!mb-0" eyebrow="The team" title="The people who do the work" intro="You talk to them directly, from the first call through to launch." />
          <GhostLink href="/team">Meet the team <ArrowUpRight size={15} /></GhostLink>
        </div>
        <ul className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 lg:grid-cols-6 sm:overflow-visible">
          {team.map((m) => (
            <li key={m.name} className="snap-start shrink-0 w-[70%] sm:w-auto rounded-2xl bg-bg border border-ink/10 p-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden bg-night text-snow flex items-center justify-center font-bold">
                {m.image ? <Image src={m.image} alt={m.name} fill sizes="64px" className="object-cover" /> : m.init}
              </div>
              <h3 className="font-display font-bold text-ink mt-4">{m.name}</h3>
              <p className="text-xs text-accent font-semibold">{m.role}</p>
              <p className="text-xs text-ink/65 leading-relaxed mt-2 line-clamp-4">{m.bio}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ---------------- Contact ---------------- */
export function ContactSection() {
  return (
    <section id="contact" className="bg-bg py-16 sm:py-24 border-t border-ink/10">
      <div className={`${wrap} grid grid-cols-1 lg:grid-cols-12 gap-10`}>
        <div className="lg:col-span-5">
          <Eyebrow className="mb-4">Get in touch</Eyebrow>
          <h2 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-ink">Let&apos;s build something together</h2>
          <p className="text-ink/70 mt-5">Tell us about your project. Free consultation, no obligation, and a reply within 24 hours.</p>
          <ul className="mt-8 space-y-3 text-sm">
            <li><a href={contact.tel} className="inline-flex items-center gap-3 text-ink hover:text-accent"><Phone size={16} className="text-accent" /> {contact.phone}</a></li>
            <li><a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-ink hover:text-accent"><MessageCircle size={16} className="text-accent" /> WhatsApp us</a></li>
            <li><a href={`mailto:${contact.email}`} className="inline-flex items-center gap-3 text-ink hover:text-accent"><Mail size={16} className="text-accent" /> {contact.email}</a></li>
            <li className="inline-flex items-center gap-3 text-ink/80"><MapPin size={16} className="text-accent" /> {contact.city}, {contact.region} · <LocalTime /></li>
          </ul>
        </div>
        <div className="lg:col-span-7 rounded-3xl border border-ink/10 bg-cream p-5 sm:p-8">
          <h3 className="font-display text-xl font-bold text-ink mb-5">Project enquiry</h3>
          <EnquiryForm source="Homepage Enquiry" />
        </div>
      </div>
    </section>
  )
}
