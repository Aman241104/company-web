import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Check } from 'lucide-react'
import { processSteps } from '@/lib/site'
import { Btn, Eyebrow, LineHeading } from './ui'
import ConsultButton from './ConsultButton'
import FaqList from './FaqList'

// Shared building blocks for inner pages, lifted from the benchmark's
// service/about/contact templates.

/** @param {any} props */
export function Breadcrumb({ trail }) {
  return (
    <nav className="mb-6 min-w-0" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 font-mono text-eyebrow text-muted uppercase">
        {trail.map(([label, href], i) => (
          <li key={label} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden="true" className="text-line-strong">›</span>}
            {href ? (
              <Link href={href} className="-my-4 inline-block rounded py-4 transition-colors duration-300 hover:text-brand-ink md:my-0 md:py-0">{label}</Link>
            ) : (
              <span aria-current="page" className="text-ink-2">{label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

// Hero: breadcrumb, eyebrow, display heading, lead, CTAs, optional side card + wide figure.
/** @param {any} props */
export function InnerHero({ trail, eyebrow, title, lead = null, side = null, figure = null, ctas = true, service = '', bg = 'bg-brand-wash', children = null }) {
  return (
    <section className={`relative isolate ${bg} pt-nav`}>
      <div className="container-site pt-10 pb-12 sm:pt-14 sm:pb-14 lg:pt-16 lg:pb-18">
        <Breadcrumb trail={trail} />
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-x-14 lg:gap-y-12">
          <div className={`lg:row-start-1 ${side ? 'lg:col-span-7' : 'lg:col-span-10'}`}>
            <div className="[container-type:inline-size]">
              <div data-reveal="true">
                <Eyebrow>{eyebrow}</Eyebrow>
              </div>
              <LineHeading as="h1" lines={Array.isArray(title) ? title : [title]} className="mt-5 font-display text-display text-balance" />
              {lead && <p className="mt-6 max-w-[56ch] text-lead text-ink-2" data-reveal="true">{lead}</p>}
            </div>
            {ctas && (
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <ConsultButton service={service}>Get Free Consultation</ConsultButton>
                <Btn href="/work" variant="secondary">View Portfolio</Btn>
              </div>
            )}
            {children}
          </div>
          {figure && <div className="lg:col-span-12 lg:row-start-2">{figure}</div>}
          {side && <div className="lg:col-span-5 lg:col-start-8 lg:row-start-1">{side}</div>}
        </div>
      </div>
    </section>
  )
}

/** @param {any} props */
export function IncludedCard({ title = 'What is included', items }) {
  return (
    <div className="rounded-3xl border border-line bg-bg p-6 shadow-lift sm:p-7">
      <h2 className="font-mono text-eyebrow text-muted uppercase">{title}</h2>
      <ul className="mt-5 space-y-3">
        {items.map((it) => (
          <li key={it} className="flex items-start gap-3 text-body text-ink">
            <Check aria-hidden="true" className="mt-0.5 size-4.5 shrink-0 text-brand-ink" />
            {it}
          </li>
        ))}
      </ul>
    </div>
  )
}

/** @param {any} props */
export function HeroFigure({ src, alt = '', Icon, label }) {
  return (
    <figure className="relative aspect-[3/2] overflow-hidden rounded-3xl border border-line bg-surface shadow-lift sm:aspect-[16/9] lg:aspect-[12/5]">
      {src ? (
        <Image src={src} alt={alt} fill priority sizes="100vw" className="object-cover object-top" />
      ) : (
        <div className="absolute inset-0 grid place-items-center bg-brand-veil">
          <div className="absolute inset-0 opacity-60" style={{ backgroundImage: 'linear-gradient(to right, var(--color-line) 1px, transparent 1px), linear-gradient(to bottom, var(--color-line) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
          {Icon && <Icon aria-hidden="true" strokeWidth={1.2} className="relative size-[28%] max-h-48 text-brand-ink" />}
          {label && <span className="absolute bottom-5 left-6 font-mono text-eyebrow text-brand-ink uppercase">{label}</span>}
        </div>
      )}
    </figure>
  )
}

const sectionPad = 'scroll-mt-nav border-t border-line py-[clamp(3.5rem,2.6rem+3.8vw,6rem)]'

/** @param {any} props */
export function Section({ id, eyebrow, title, lead = null, action = null, bg = 'bg-bg', children = null }) {
  return (
    <section className={`${sectionPad} ${bg}`} aria-labelledby={`${id}-heading`} id={id}>
      <div className="container-site">
        <div className="mb-10 flex flex-col gap-5 sm:mb-12 md:flex-row md:items-end md:justify-between md:gap-10" data-reveal="true">
          <div className="max-w-3xl">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 id={`${id}-heading`} className="mt-4 font-display text-h1 text-balance text-ink">{title}</h2>
            {lead && <p className="mt-5 max-w-[58ch] text-lead text-ink-2">{lead}</p>}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
        {children}
      </div>
    </section>
  )
}

const stepArt = ['/assets/sv-space-designs-live.jpg', '/assets/stylux_mockup.jpg', '/assets/saas_hero_mockup.png', '/assets/prihaan-spices-live.jpg']

/** @param {any} props */
export function ProcessCards({ bg = 'bg-bg' }) {
  return (
    <Section id="process" eyebrow="How we work" title="Four steps, start to launch" bg={bg} action={<Btn href="/how-we-work" variant="secondary" size="md" arrow>How we work</Btn>}>
      <ol className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {processSteps.map((s, i) => (
          <li key={s.num} className="min-w-0">
            <div className="h-full" data-reveal="true" style={{ '--i': i }}>
              <article className="group/card flex h-full flex-col rounded-3xl border border-line bg-bg p-6 sm:p-7">
                <span className="relative -mx-6 -mt-6 mb-6 block overflow-hidden rounded-t-[1.4375rem] border-b border-line bg-surface sm:-mx-7 sm:-mt-7">
                  <Image src={stepArt[i]} alt="" width={640} height={360} className="block aspect-[16/9] size-full object-cover object-top transition-transform duration-700 ease-out-expo group-hover/card:scale-[1.03] motion-reduce:transform-none" />
                  <span className="absolute top-3 right-3 rounded-full bg-bg/90 px-2.5 py-1 font-mono text-eyebrow text-ink">{s.num}</span>
                </span>
                <h3 className="font-display text-h3 font-semibold text-ink">{s.title}</h3>
                <p className="mt-3 text-body text-ink-2">{s.text}</p>
              </article>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}

/** @param {any} props */
export function FaqSection({ title, items, bg = 'bg-surface', id = 'faq' }) {
  return (
    <Section id={id} eyebrow="FAQ" title={title} lead="Common questions about this work, answered in full." bg={bg}>
      <div className="lg:mx-auto lg:max-w-4xl">
        <FaqList items={items} id={id} />
      </div>
    </Section>
  )
}

/** @param {any} props */
export function RelatedCards({ items, title = 'Also in this practice', eyebrow = 'Other services', bg = 'bg-bg' }) {
  return (
    <Section id="other-services" eyebrow={eyebrow} title={title} bg={bg}>
      <CardGrid items={items} cols="md:grid-cols-3" />
    </Section>
  )
}

/** @param {any} props */
export function CardGrid({ items, cols = 'md:grid-cols-2 xl:grid-cols-3' }) {
  return (
      <ul className={`grid gap-5 ${cols}`}>
        {items.map((it, i) => (
          <li key={it.href} className="min-w-0">
            <div className="h-full" data-reveal="true" style={{ '--i': i % 3 }}>
              <CardWrap href={it.href} className="group/card relative flex h-full flex-col rounded-3xl border border-line bg-bg p-6 transition-[border-color,box-shadow,transform] duration-500 ease-out-expo hover:-translate-y-0.5 hover:border-line-strong hover:shadow-lift sm:p-7">
                {(it.img || it.Icon) && <span className="relative -mx-6 -mt-6 mb-6 block overflow-hidden rounded-t-[1.4375rem] border-b border-line bg-surface sm:-mx-7 sm:-mt-7">
                  {it.img ? (
                    <Image src={it.img} alt="" width={640} height={360} className="block aspect-[16/9] size-full object-cover object-top transition-transform duration-700 ease-out-expo group-hover/card:scale-[1.03]" />
                  ) : (
                    <span className="grid aspect-[16/9] place-items-center bg-brand-veil">{it.Icon && <it.Icon aria-hidden="true" strokeWidth={1.3} className="size-14 text-brand-ink" />}</span>
                  )}
                  {it.num && <span className="absolute top-3 right-3 rounded-full bg-bg/90 px-2.5 py-1 font-mono text-eyebrow text-ink">{it.num}</span>}
                </span>}
                {!(it.img || it.Icon) && it.num && <span className="mb-5 font-mono text-eyebrow text-brand-ink">{it.num}</span>}
                <h3 className="font-display text-h3 font-semibold text-ink">{it.title}</h3>
                {it.tagline && <p className="mt-1.5 font-mono text-eyebrow text-brand-ink uppercase">{it.tagline}</p>}
                <p className="mt-4 text-body text-ink-2">{it.desc}</p>
                {it.href !== '#' && <span className="mt-auto flex items-center gap-1.5 pt-6 text-small font-medium text-ink">
                  Read more
                  <ArrowUpRight aria-hidden="true" className="size-4 text-brand-ink transition-transform duration-300 ease-out-expo group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5" />
                </span>}
              </CardWrap>
            </div>
          </li>
        ))}
      </ul>
  )
}

/** @param {any} props */
function CardWrap({ href, className, children }) {
  if (!href || href === '#') return <div className={className.replace(/hover:\S+/g, '')}>{children}</div>
  return <Link href={href} className={className}>{children}</Link>
}

/** @param {any} props */
export function CaseRows({ studies }) {
  return (
    <div className="space-y-14 sm:space-y-16">
      {studies.map((s, i) => (
        <article key={s.slug} id={`case-${s.slug}`} aria-labelledby={`case-${s.slug}-title`} className="scroll-mt-nav border-t border-line pt-10 first:border-t-0 first:pt-0 sm:pt-14">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5" data-reveal="true">
              <div className="overflow-hidden rounded-3xl border border-line bg-surface">
                <div className="relative aspect-[4/3]">
                  <Image src={s.heroImage} alt="" fill sizes="(max-width:1024px) 100vw, 40vw" className="object-cover object-top" />
                </div>
              </div>
              {s.metrics.length > 0 && (
                <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
                  {s.metrics.slice(0, 4).map((m) => (
                    <div key={m.label} className="bg-bg px-4 py-4">
                      <dt className="sr-only">{m.label}</dt>
                      <dd>
                        <span className="block font-display text-[clamp(1.5rem,1.2rem+1.2vw,2rem)] leading-none font-bold tracking-[-0.03em] text-ink tabular-nums">{m.value}</span>
                        <span className="mt-2 block text-[0.8125rem] leading-snug text-muted">{m.label}</span>
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
            <div className="lg:col-span-7" data-reveal="true">
              <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-eyebrow text-muted uppercase">
                <span className="text-brand-ink">{String(i + 1).padStart(2, '0')}</span>
                <span aria-hidden="true">/</span>
                <span>{s.category}</span>
                <span aria-hidden="true">/</span>
                <span>{s.year}</span>
              </p>
              <h3 id={`case-${s.slug}-title`} className="mt-4 font-display text-h2 text-balance text-ink">
                <Link href={`/work/${s.slug}`} className="hover:text-brand-ink">{s.name}</Link>
              </h3>
              <div className="mt-7 space-y-6">
                <div>
                  <h4 className="font-mono text-eyebrow text-muted uppercase">The brief</h4>
                  <p className="mt-2.5 max-w-[62ch] text-body text-ink-2">{s.challenge}</p>
                </div>
                <div>
                  <h4 className="font-mono text-eyebrow text-muted uppercase">What we built</h4>
                  <p className="mt-2.5 max-w-[62ch] text-body text-ink-2">{s.solution}</p>
                </div>
              </div>
              <ul className="mt-7 flex flex-wrap gap-2">
                {s.architecture.map((a) => (
                  <li key={a} className="rounded-full border border-line bg-surface px-3 py-1.5 text-[0.8125rem] leading-none text-ink-2">{a}</li>
                ))}
              </ul>
              <Btn href={`/work/${s.slug}`} variant="secondary" size="md" arrow className="mt-7">Read the case study</Btn>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}

/** @param {any} props */
export function Shell({ children }) {
  return <main id="main" tabIndex={-1} className="relative">{children}</main>
}

/** @param {any} props */
export function LinkListCard({ title, items }) {
  return (
    <div className="rounded-3xl border border-line bg-bg p-6 shadow-lift sm:p-7">
      <h2 className="font-mono text-eyebrow text-muted uppercase">{title}</h2>
      <ul className="-my-1 mt-5">
        {items.map((it) => (
          <li key={it.href}>
            <Link href={it.href} className="group/row flex items-center justify-between gap-4 rounded-xl py-2.5 transition-colors duration-300 hover:text-brand-ink">
              <span className="min-w-0">
                <span className="block text-body font-medium text-ink transition-colors duration-300 group-hover/row:text-brand-ink">{it.title}</span>
                <span className="mt-0.5 block text-small text-muted">{it.tagline}</span>
              </span>
              <ArrowUpRight aria-hidden="true" className="size-4 shrink-0 text-brand-ink transition-transform duration-300 ease-out-expo group-hover/row:translate-x-0.5 group-hover/row:-translate-y-0.5" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** @param {any} props */
export function StackCards({ items }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {items.map((s, i) => (
        <div key={s.domain} className="h-full" data-reveal="true" style={{ '--i': i % 2 }}>
          <div className="h-full rounded-3xl border border-line bg-bg p-6 sm:p-7">
            <h3 className="font-display text-h3 font-semibold text-ink">{s.domain}</h3>
            <p className="mt-3 text-body text-ink-2">{s.text}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {s.tools.map((t) => (
                <li key={t} className="rounded-full border border-line bg-surface px-3 py-1.5 text-[0.8125rem] leading-none text-ink-2">{t}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}

/** @param {any} props */
export function GlanceCard({ title = 'At a glance', items }) {
  return (
    <div className="rounded-3xl border border-line bg-bg p-6 shadow-lift sm:p-7">
      <h2 className="font-mono text-eyebrow text-muted uppercase">{title}</h2>
      <dl className="mt-5 grid gap-x-6 gap-y-4 sm:grid-cols-2">
        {items.map(([k, v]) => (
          <div key={k}>
            <dt className="font-mono text-eyebrow text-muted uppercase">{k}</dt>
            <dd className="mt-1.5 text-body font-medium text-ink">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

/** @param {any} props */
export function StatCards({ items }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((s, i) => (
        <li key={s.label}>
          <div className="h-full" data-reveal="true" style={{ '--i': i % 3 }}>
            <div className="h-full rounded-3xl border border-line bg-bg px-6 py-7">
              <p className="font-display text-[clamp(2rem,1.4rem+2.2vw,3rem)] leading-none font-bold tracking-[-0.03em] text-ink tabular-nums">{s.value}</p>
              <p className="mt-4 text-body font-medium text-ink">{s.label}</p>
              <p className="mt-1 text-small text-muted">{s.note}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

/** @param {any} props */
export function ClientGrid({ clients }) {
  return (
    <ul className="grid grid-cols-2 gap-5 sm:grid-cols-4">
      {clients.map((c, i) => (
        <li key={c.slug}>
          <div data-reveal="true" style={{ '--i': i % 4 }}>
            <Link href={`/work/${c.slug}`} className="block overflow-hidden rounded-3xl border border-line bg-bg transition-shadow hover:shadow-lift">
              <div className="relative aspect-[4/3] bg-surface">
                <Image src={c.heroImage} alt="" fill sizes="25vw" className="object-cover object-top" />
              </div>
              <span className="block border-t border-line px-4 py-3 text-center">
                <span className="block text-small font-medium text-ink">{c.name}</span>
                <span className="mt-0.5 block text-[0.8125rem] text-muted">{c.category}</span>
              </span>
            </Link>
          </div>
        </li>
      ))}
    </ul>
  )
}

/** @param {any} props */
export function NextCta({ eyebrow = 'How we work', title = 'Yours could be the next one', bg = 'bg-surface' }) {
  return (
    <Section id="next" eyebrow={eyebrow} title={title} bg={bg}>
      <div className="flex flex-wrap items-center gap-3" data-reveal="true">
        <ConsultButton>Get Free Consultation</ConsultButton>
        <Btn href="/how-we-work" variant="secondary">How we work</Btn>
      </div>
    </Section>
  )
}

/** @param {any} props */
export function PersonCard({ m }) {
  return (
    <article className="group/person flex h-full flex-col rounded-3xl border border-line bg-bg p-6 transition-[border-color,box-shadow,transform] duration-500 ease-out-expo hover:-translate-y-0.5 hover:border-line-strong hover:shadow-lift sm:p-7">
      <div className="grow">
        <span className="relative grid size-20 shrink-0 place-items-center overflow-hidden rounded-2xl bg-brand-soft font-display text-h3 font-bold text-brand-ink">
          {m.image ? <Image src={m.image} alt="" fill sizes="80px" className="object-cover" /> : m.init}
        </span>
        <h3 className="mt-5 font-display text-h3 font-semibold text-ink">{m.name}</h3>
        <p className="mt-1.5 text-small font-medium text-brand-ink">{m.role}</p>
        <p className="mt-3.5 text-body text-ink-2">{m.bio}</p>
      </div>
      <div className="mt-7 border-t border-line pt-5">
        <dl className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <dt className="font-mono text-eyebrow text-muted uppercase">Focus</dt>
          <dd className="font-mono text-small font-medium text-brand-ink">{m.skills.join(' · ')}</dd>
        </dl>
      </div>
    </article>
  )
}
