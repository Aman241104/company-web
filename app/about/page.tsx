import type { Metadata } from 'next'
import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import { InnerHero, GlanceCard, Section, StatCards, CardGrid, Shell } from '@/components/site/inner'
import { OfficeCard, ServeCard } from '@/components/site/home/Story'
import { contact, stats, timeline, values, industries } from '@/lib/site'
import { caseStudiesData } from '@/lib/caseStudies'

const base = 'https://mehtatechnologies.com'
export const metadata: Metadata = {
  title: 'About Us — Our Story, Values & Team',
  description: 'Mehta Technologies is an Ahmedabad web development studio founded in 2019. 150+ projects delivered for clients across India and abroad.',
  alternates: { canonical: `${base}/about` },
  openGraph: { url: `${base}/about`, title: 'About Mehta Technologies', images: [{ url: '/og.png', width: 1200, height: 630 }] },
}

export default function About() {
  return (
    <>
      <Header />
      <Shell>
        <InnerHero
          trail={[['Home', '/'], ['About']]}
          eyebrow="About Mehta Technologies"
          title={[`${contact.city} headquarters.`, 'Clients across India.']}
          lead="A web development studio founded in Ahmedabad in 2019. We build websites, e-commerce stores, custom software and apps — including our own ERP — and run the marketing for the businesses we build for. The people who scope your project are the people who build it."
          side={<GlanceCard items={[['Headquarters', `${contact.city}, India`], ['Founded', '2019'], ['Engagements', 'Fixed price & retainer'], ['Support', '2 weeks – 12 months'], ['Projects', '150+'], ['Rating', '4.9 / 5']]} />}
        />
        <Section id="how-we-engage" eyebrow="At a glance" title="How we work with you">
          <StatCards items={stats} />
        </Section>
        <Section id="story" eyebrow="Our story" title="From a two-person studio to 150+ projects" bg="bg-surface">
          <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {timeline.map((t, i) => (
              <li key={t.year} data-reveal="true" style={{ '--i': i } as React.CSSProperties}>
                <article className="flex h-full flex-col rounded-3xl border border-line bg-bg p-6 sm:p-7">
                  <span className="font-display text-[clamp(2rem,1.4rem+2.2vw,3rem)] leading-none font-bold tracking-[-0.03em] text-brand-ink">{t.year}</span>
                  <p className="mt-4 text-body text-ink-2">{t.event}</p>
                </article>
              </li>
            ))}
          </ul>
        </Section>
        <Section id="values" eyebrow="Values" title="What we hold ourselves to">
          <CardGrid cols="sm:grid-cols-2 xl:grid-cols-4" items={values.map((v, i) => ({ href: '#', title: v.title, desc: v.desc, num: String(i + 1).padStart(2, '0') }))} />
        </Section>
        <Section id="offices" eyebrow="Where we work" title="One office, clients everywhere" bg="bg-surface">
          <ul className="grid gap-5 md:grid-cols-3">
            <li><OfficeCard /></li>
            <li><ServeCard sub="Service area" title="Across Gujarat" lines={['Surat, Nadiad and the rest of Gujarat', 'On-site meetings in Ahmedabad']} href="/locations" cta="Our locations" /></li>
            <li><ServeCard sub="Remote delivery" title="India & abroad" lines={['Mumbai and across India', 'International clients billed in USD']} href="/contact" cta="Talk to us" /></li>
          </ul>
        </Section>
        <Section id="industries" eyebrow="Industries" title="Industries we work with" lead="These are the sectors we have actually shipped for.">
          <CardGrid cols="sm:grid-cols-2 xl:grid-cols-4" items={industries.map((ind, i) => ({ href: `/work/${ind.work[0]}`, title: ind.name, desc: ind.text, img: caseStudiesData[ind.work[0]]?.heroImage, num: String(i + 1).padStart(2, '0') }))} />
        </Section>
      </Shell>
      <Footer />
    </>
  )
}
