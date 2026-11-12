import type { Metadata } from 'next'
import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import Pricing from '@/components/sections/Pricing'
import { InnerHero, LinkListCard, Section, CardGrid, ProcessCards, FaqSection, Shell } from '@/components/site/inner'
import { chapters, allDisciplines } from '@/lib/services'
import { whyUs } from '@/lib/site'
import { faqs } from '@/lib/faqs'
import { serviceIcon, imageFor } from '@/lib/serviceMeta'
import { subHref } from '@/components/site/ServicePages'
import { Target, Gauge, Receipt, Smartphone, MessagesSquare, LifeBuoy } from 'lucide-react'

const base = 'https://mehtatechnologies.com'
export const metadata: Metadata = {
  title: 'Services — Development, Digital Marketing, Design & Web3',
  description: 'Website & e-commerce development, custom software, mobile apps, SEO, performance marketing, design and Web3 from Mehta Technologies, Ahmedabad. Published starting prices.',
  alternates: { canonical: `${base}/services` },
  openGraph: { url: `${base}/services`, title: 'Services | Mehta Technologies', description: 'Every service we sell, with published starting prices.', images: [{ url: '/og.png', width: 1200, height: 630 }] },
}
const chapterHref = (slug: string) => (slug === 'development' ? '#development' : `/services/${slug}`)
const whyIcons = [Target, Gauge, Receipt, Smartphone, MessagesSquare, LifeBuoy]

export default function Services() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Mehta Technologies Services',
    itemListElement: allDisciplines.map((d, i) => ({ '@type': 'ListItem', position: i + 1, url: `${base}${subHref(d.chapter, d)}`, name: d.title })),
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Header />
      <Shell>
        <InnerHero
          trail={[['Home', '/'], ['Services']]}
          eyebrow="Services"
          title={['Powerful solutions', 'we can build for you']}
          lead="From a first website to custom software, marketing and brand design — here is everything we do. Each project is scoped to your exact requirements."
          side={<LinkListCard title="Four practices" items={chapters.map((c) => ({ href: chapterHref(c.slug), title: c.name, tagline: `${c.disciplines.length} services` }))} />}
        />
        <Section id="catalogue" eyebrow="Catalogue" title="Every service we sell" lead={`${allDisciplines.length} services: what the work is, what each one covers, and the projects behind it.`}>
          <div className="space-y-14 sm:space-y-16">
            {chapters.map((c) => (
              <div key={c.slug} id={c.slug} className="scroll-mt-nav">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-line pb-5" data-reveal="true">
                  <h3 className="font-display text-h2 text-ink">{c.name}</h3>
                  {c.slug !== 'development' && (
                    <a href={chapterHref(c.slug)} className="font-mono text-eyebrow text-brand-ink uppercase hover:underline">{c.name} overview →</a>
                  )}
                </div>
                <div className="mt-7">
                  <CardGrid items={c.disciplines.map((d, i) => ({ href: subHref(c, d), title: d.title, tagline: d.tagline, desc: d.desc, img: imageFor(d.slug), Icon: serviceIcon[d.slug], num: String(i + 1).padStart(2, '0') }))} />
                </div>
              </div>
            ))}
          </div>
        </Section>
        <Pricing />
        <Section id="why-us" eyebrow="Why choose us" title="Why businesses choose Mehta" bg="bg-surface">
          <CardGrid cols="sm:grid-cols-2 xl:grid-cols-3" items={whyUs.map((w, i) => ({ href: '#', title: w.title, tagline: w.tag, desc: w.desc, Icon: whyIcons[i], num: String(i + 1).padStart(2, '0') }))} />
        </Section>
        <ProcessCards />
        <FaqSection title="Questions about our services" items={faqs} />
      </Shell>
      <Footer />
    </>
  )
}
