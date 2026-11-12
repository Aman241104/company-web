import type { Metadata } from 'next'
import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import { InnerHero, GlanceCard, Section, CardGrid, StackCards, ProcessCards, NextCta, Shell } from '@/components/site/inner'
import { processSteps, whyUs, stack } from '@/lib/site'

export const metadata: Metadata = {
  title: 'How We Work — Our Process',
  description: 'Discovery, a fixed-price proposal, design, build on a live staging link, launch and SLA support. How Mehta Technologies runs every project.',
  alternates: { canonical: 'https://mehtatechnologies.com/how-we-work' },
}

export default function HowWeWork() {
  return (
    <>
      <Header />
      <Shell>
        <InnerHero
          trail={[['Home', '/'], ['How We Work']]}
          eyebrow="How we work"
          title={['How we turn ideas', 'into live products']}
          lead="Four steps, a fixed-price milestone proposal, a live staging link you can check any time, and support that continues after launch."
          side={<GlanceCard title="The four steps" items={processSteps.map((s) => [s.num, s.title])} />}
        />
        <ProcessCards />
        <Section id="deliverables" eyebrow="The four steps" title="What happens, in order" bg="bg-surface">
          <ol className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {processSteps.map((s) => (
              <li key={s.num} className="rounded-3xl border border-line bg-bg p-6 sm:p-7" data-reveal="true">
                <span className="font-mono text-eyebrow text-brand-ink">{s.num}</span>
                <h3 className="mt-3 font-display text-h3 font-semibold text-ink">{s.title}</h3>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {s.items.map((it) => (
                    <li key={it} className="rounded-full bg-brand-soft px-2.5 py-1 text-[0.75rem] leading-snug text-brand-ink">{it}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Section>
        <Section id="why-us" eyebrow="Why choose us" title="Why businesses choose Mehta">
          <CardGrid cols="sm:grid-cols-2 xl:grid-cols-3" items={whyUs.map((w, i) => ({ href: '#', title: w.title, tagline: w.tag, desc: w.desc, num: String(i + 1).padStart(2, '0') }))} />
        </Section>
        <Section id="technology" eyebrow="Technology" title="Built with the tools that ship" lead="The frameworks and platforms behind every product we deliver." bg="bg-surface">
          <StackCards items={stack} />
        </Section>
        <Section id="engagement" eyebrow="At a glance" title="Who you talk to">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              ['Engagements', 'Fixed-price milestones or a monthly retainer. No surprise billable hours.'],
              ['Your contact', 'The people building your project — no account-manager relay.'],
              ['After launch', 'SLA support from 2 weeks to 12 months, then optional retainers.'],
            ].map(([k, v]) => (
              <div key={k} className="rounded-3xl border border-line bg-bg p-6 sm:p-7" data-reveal="true">
                <p className="font-mono text-eyebrow text-muted uppercase">{k}</p>
                <p className="mt-3 text-h3 text-ink">{v}</p>
              </div>
            ))}
          </div>
        </Section>
        <NextCta title="Ready when you are" />
      </Shell>
      <Footer />
    </>
  )
}
