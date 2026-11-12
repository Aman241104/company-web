import type { Metadata } from 'next'
import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import { InnerHero, GlanceCard, Section, CaseRows, StatCards, ClientGrid, NextCta, Shell } from '@/components/site/inner'
import { caseStudiesData } from '@/lib/caseStudies'
import { stats } from '@/lib/site'

const base = 'https://mehtatechnologies.com'
export const metadata: Metadata = {
  title: 'Our Work — Websites, E-Commerce & Software Case Studies',
  description: 'Real projects by Mehta Technologies: the brief, what we built and the results — websites, e-commerce stores, ERP and custom software.',
  alternates: { canonical: `${base}/work` },
  openGraph: { url: `${base}/work`, title: 'Our Work | Mehta Technologies', images: [{ url: '/og.png', width: 1200, height: 630 }] },
}

export default function Work() {
  const all = Object.values(caseStudiesData)
  const live = all.filter((s) => s.status !== 'in-progress' && s.heroImage)
  return (
    <>
      <Header />
      <Shell>
        <InnerHero
          trail={[['Home', '/'], ['Portfolio']]}
          eyebrow="Selected work"
          title={['Projects we have', 'delivered']}
          lead="Recent work: the problem we were given, what we built, and what changed afterwards."
          side={<GlanceCard items={stats.map((s) => [s.label, s.value])} />}
        />
        <Section id="work" eyebrow="Case studies" title={`${live.length} projects, in detail`}>
          <CaseRows studies={live} />
        </Section>
        <Section id="metrics" eyebrow="At a glance" title="The record so far" bg="bg-surface">
          <StatCards items={stats} />
        </Section>
        <Section id="clients" eyebrow="Clients" title="Trusted by growing businesses" lead="Brands and businesses that have grown with us.">
          <ClientGrid clients={live.filter((s) => s.slug !== 'vibo-erp')} />
        </Section>
        <NextCta />
      </Shell>
      <Footer />
    </>
  )
}
