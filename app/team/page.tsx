import type { Metadata } from 'next'
import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import { InnerHero, GlanceCard, Section, PersonCard, NextCta, Shell } from '@/components/site/inner'
import { team } from '@/lib/team'

export const metadata: Metadata = {
  title: 'Our Team',
  description: 'The designers, engineers and marketers at Mehta Technologies, Ahmedabad — the people who build your project.',
  alternates: { canonical: 'https://mehtatechnologies.com/team' },
}
const groups = [
  { id: 'development', title: 'Leadership & engineering', people: team.filter((m) => !/Growth|SEO/i.test(m.role)) },
  { id: 'marketing', title: 'Digital marketing', people: team.filter((m) => /Growth|SEO/i.test(m.role)) },
]

export default function TeamPage() {
  return (
    <>
      <Header />
      <Shell>
        <InnerHero
          trail={[['Home', '/'], ['Team']]}
          eyebrow="The team"
          title={['The people', 'who do the work']}
          lead="The designers, engineers and marketers who build and run your project. You talk to them directly, from the first call through to launch."
          side={<GlanceCard items={groups.map((g) => [g.title, `${g.people.length} people`])} />}
        />
        {groups.map((g, i) => (
          <Section key={g.id} id={g.id} eyebrow={`0${i + 1}`} title={g.title} bg={i ? 'bg-surface' : 'bg-bg'}>
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {g.people.map((m) => (
                <li key={m.name} data-reveal="true">
                  <PersonCard m={m} />
                </li>
              ))}
            </ul>
          </Section>
        ))}
        <NextCta title="Talk to the people who will build it" bg="bg-bg" />
      </Shell>
      <Footer />
    </>
  )
}
