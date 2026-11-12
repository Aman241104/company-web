import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import Header from './Header'
import Footer from './Footer'
import { InnerHero, IncludedCard, HeroFigure, Section, ProcessCards, FaqSection, RelatedCards, CaseRows, StackCards, LinkListCard, Shell } from './inner'
import { Btn } from './ui'
import { chapters } from '@/lib/services'
import { faqs } from '@/lib/faqs'
import { serviceIcon, workFor, imageFor, stackFor } from '@/lib/serviceMeta'

export const subHref = (c, d) => (c.slug === 'development' ? `/services/${d.slug}` : c.slug === 'blockchain-web3' ? '/services/blockchain-web3' : `/services/${c.slug}/${d.slug}`)
const faqPick = (chapter) => (chapter === 'digital-marketing' ? [1, 3, 2, 5, 8, 9] : [1, 3, 4, 5, 6, 7, 8, 9]).map((i) => faqs[i]).filter(Boolean)
const card = (c, d) => ({ href: subHref(c, d), title: d.title, tagline: d.tagline, desc: d.desc, img: imageFor(d.slug), Icon: serviceIcon[d.slug] })

/* Type A: single discipline (Development) or the Blockchain chapter page. */
/** @param {any} props */
export function DisciplinePage({ chapter, d }) {
  const isChapter = !d
  const title = isChapter ? chapter.name : d.title
  const eyebrow = isChapter ? chapter.motto.join(' ') : d.tagline
  const lead = isChapter ? chapter.intro : d.desc
  const included = isChapter ? chapter.disciplines.map((x) => x.title) : d.features || d.bullets
  const slug = isChapter ? chapter.slug : d.slug
  const studies = workFor(slug)
  const stackItems = stackFor(slug, chapter.slug)
  const others = isChapter ? chapters.find((c) => c.slug === 'development').disciplines.slice(0, 3).map((x) => card(chapters[0], x)) : chapter.disciplines.filter((x) => x.slug !== d.slug).slice(0, 3).map((x) => card(chapter, x))
  return (
    <>
      <Header />
      <Shell>
        <InnerHero
          trail={[['Home', '/'], ['Services', '/services'], [title]]}
          eyebrow={eyebrow}
          title={title}
          lead={lead}
          service={title}
          side={
            <div className="space-y-5">
              <IncludedCard items={included} />
              {d && (d.pricing || d.timeline) && (
                <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
                  {d.pricing && (
                    <div className="bg-bg px-5 py-4">
                      <dt className="font-mono text-eyebrow text-muted uppercase">Investment</dt>
                      <dd className="mt-2 font-display text-h3 font-semibold text-ink">{d.pricing}</dd>
                    </div>
                  )}
                  {d.timeline && (
                    <div className="bg-bg px-5 py-4">
                      <dt className="font-mono text-eyebrow text-muted uppercase">Timeline</dt>
                      <dd className="mt-2 font-display text-h3 font-semibold text-ink">{d.timeline}</dd>
                    </div>
                  )}
                </dl>
              )}
            </div>
          }
          figure={<HeroFigure src={imageFor(slug)} alt={studies[0] ? `${studies[0].name}, built by Mehta Technologies` : ''} Icon={serviceIcon[slug]} label={title} />}
        />
        {isChapter && (
          <Section id="disciplines" eyebrow="Disciplines" title="What this practice covers" bg="bg-surface">
            <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {chapter.disciplines.map((x) => (
                <li key={x.slug} className="rounded-3xl border border-line bg-bg p-6 sm:p-7" data-reveal="true">
                  <h3 className="font-display text-h3 font-semibold text-ink">{x.title}</h3>
                  <p className="mt-1.5 font-mono text-eyebrow text-brand-ink uppercase">{x.tagline}</p>
                  <p className="mt-4 text-body text-ink-2">{x.desc}</p>
                </li>
              ))}
            </ul>
          </Section>
        )}
        {stackItems.length > 0 && (
          <Section id="technology" eyebrow="Technology" title="What we build it with" bg="bg-surface">
            <StackCards items={stackItems} />
          </Section>
        )}
        {d?.deliverables && (
          <Section id="deliverables" eyebrow="Deliverables" title="What you get at the end" bg="bg-bg">
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {d.deliverables.map((x, i) => (
                <li key={x} className="rounded-3xl border border-line bg-surface p-6" data-reveal="true" style={{ '--i': i }}>
                  <span className="font-mono text-eyebrow text-brand-ink">{String(i + 1).padStart(2, '0')}</span>
                  <p className="mt-4 text-h3 text-ink">{x}</p>
                </li>
              ))}
            </ul>
          </Section>
        )}
        {studies.length > 0 && (
          <Section id="work" eyebrow="Related work" title="Projects in this discipline" action={<Btn href="/work" variant="secondary" size="md" arrow>View Portfolio</Btn>}>
            <CaseRows studies={studies} />
          </Section>
        )}
        <ProcessCards bg={studies.length ? 'bg-surface' : 'bg-bg'} />
        <FaqSection title={`${title} questions`} items={faqPick(chapter.slug)} bg={studies.length ? 'bg-bg' : 'bg-surface'} />
        <RelatedCards items={others} title={isChapter ? 'Related development services' : 'Also in this practice'} />
      </Shell>
      <Footer />
    </>
  )
}

/* Type B: hub page for a chapter with its own sub-pages (Marketing, Designing). */
/** @param {any} props */
export function HubPage({ chapter }) {
  const items = chapter.disciplines.map((x) => card(chapter, x))
  const studies = workFor(chapter.slug)
  return (
    <>
      <Header />
      <Shell>
        <InnerHero
          trail={[['Home', '/'], ['Services', '/services'], [chapter.name]]}
          eyebrow={chapter.motto.join(' ')}
          title={chapter.name}
          lead={chapter.intro}
          service={chapter.name}
          side={<LinkListCard title="Disciplines" items={items} />}
          figure={<HeroFigure src={imageFor(chapter.slug)} Icon={serviceIcon[chapter.slug]} label={chapter.name} />}
        />
        <Section id="disciplines" eyebrow="Disciplines" title="Sold as separate disciplines" lead="Each has its own page, with what the work covers and how it is run." bg="bg-surface">
          <RelatedGrid items={items} />
        </Section>
        {studies.length > 0 && (
          <Section id="work" eyebrow="Related work" title="Projects in this practice" action={<Btn href="/work" variant="secondary" size="md" arrow>View Portfolio</Btn>}>
            <CaseRows studies={studies} />
          </Section>
        )}
        <ProcessCards bg="bg-surface" />
        <FaqSection title={`${chapter.name} questions`} items={faqPick(chapter.slug)} bg="bg-bg" />
        <RelatedCards items={chapters.find((c) => c.slug === 'development').disciplines.slice(0, 3).map((x) => card(chapters[0], x))} title="Other practices" bg="bg-surface" />
      </Shell>
      <Footer />
    </>
  )
}

/** @param {any} props */
function RelatedGrid({ items }) {
  return (
    <div>
      <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {items.map((it) => (
          <li key={it.href} className="min-w-0">
            <CardLink it={it} />
          </li>
        ))}
      </ul>
    </div>
  )
}

/** @param {any} props */
function CardLink({ it }) {
  return (
    <div className="h-full" data-reveal="true">
      <Link href={it.href} className="group/card relative flex h-full flex-col rounded-3xl border border-line bg-bg p-6 transition-[border-color,box-shadow,transform] duration-500 ease-out-expo hover:-translate-y-0.5 hover:border-line-strong hover:shadow-lift sm:p-7">
        <span className="relative -mx-6 -mt-6 mb-6 block overflow-hidden rounded-t-[1.4375rem] border-b border-line bg-surface sm:-mx-7 sm:-mt-7">
          {it.img ? (
            <Image src={it.img} alt="" width={640} height={360} className="block aspect-[16/9] size-full object-cover object-top transition-transform duration-700 ease-out-expo group-hover/card:scale-[1.03]" />
          ) : (
            <span className="grid aspect-[16/9] place-items-center bg-brand-veil">{it.Icon && <it.Icon aria-hidden="true" strokeWidth={1.3} className="size-14 text-brand-ink" />}</span>
          )}
        </span>
        <h3 className="font-display text-h3 font-semibold text-ink">{it.title}</h3>
        <p className="mt-1.5 font-mono text-eyebrow text-brand-ink uppercase">{it.tagline}</p>
        <p className="mt-4 text-body text-ink-2">{it.desc}</p>
        <span className="mt-auto flex items-center gap-1.5 pt-6 text-small font-medium text-ink">
          Read more <ArrowUpRight aria-hidden="true" className="size-4 text-brand-ink transition-transform duration-300 ease-out-expo group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5" />
        </span>
      </Link>
    </div>
  )
}

/* Type C: a discipline under a hub (e.g. /services/digital-marketing/technical-seo). */
/** @param {any} props */
export function SubPage({ chapter, d }) {
  const others = chapter.disciplines.filter((x) => x.slug !== d.slug).map((x) => card(chapter, x))
  const studies = workFor(d.slug)
  return (
    <>
      <Header />
      <Shell>
        <InnerHero
          trail={[['Home', '/'], ['Services', '/services'], [chapter.name, `/services/${chapter.slug}`], [d.title]]}
          eyebrow={d.tagline}
          title={d.title}
          lead={d.desc}
          service={d.title}
          side={<LinkListCard title="Other services" items={others} />}
          figure={<HeroFigure src={imageFor(d.slug)} Icon={serviceIcon[d.slug]} label={d.title} />}
        />
        <Section id="included" eyebrow="What is included" title="What the work covers" bg="bg-surface">
          <ul className="grid gap-x-10 gap-y-0 md:grid-cols-2">
            {(d.features || d.bullets).map((f, i) => (
              <li key={f} className="flex gap-4 border-t border-line py-4 text-body text-ink" data-reveal="true">
                <span className="mt-1 font-mono text-eyebrow text-brand-ink">{String(i + 1).padStart(2, '0')}</span>
                {f}
              </li>
            ))}
          </ul>
          {(d.pricing || d.timeline) && (
            <p className="mt-8 font-mono text-eyebrow text-ink-2 uppercase">
              {d.pricing && <>Investment · <span className="text-ink">{d.pricing}</span></>}
              {d.timeline && <> &nbsp;/&nbsp; Timeline · <span className="text-ink">{d.timeline}</span></>}
            </p>
          )}
        </Section>
        {studies.length > 0 && (
          <Section id="work" eyebrow="Related work" title="Projects in this discipline" action={<Btn href="/work" variant="secondary" size="md" arrow>View Portfolio</Btn>}>
            <CaseRows studies={studies} />
          </Section>
        )}
        <ProcessCards />
        <RelatedCards items={others} title={`More in ${chapter.name}`} bg="bg-surface" />
      </Shell>
      <Footer />
    </>
  )
}
