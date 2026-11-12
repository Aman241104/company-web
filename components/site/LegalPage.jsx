import Header from './Header'
import Footer from './Footer'
import { InnerHero, Shell } from './inner'

/** @param {any} props */
export default function LegalPage({ title, lead, updated, sections }) {
  return (
    <>
      <Header />
      <Shell>
        <InnerHero trail={[['Home', '/'], [title]]} eyebrow={`Last updated ${updated}`} title={title} lead={lead} ctas={false} />
        <section className="border-t border-line bg-bg py-[clamp(3.5rem,2.6rem+3.8vw,6rem)]">
          <div className="container-site grid gap-12 lg:grid-cols-12">
            <nav aria-label="Contents" className="lg:col-span-4">
              <div className="lg:sticky lg:top-[calc(var(--spacing-nav)+2rem)]">
                <p className="font-mono text-eyebrow text-muted uppercase">Contents</p>
                <ol className="mt-4 space-y-2 border-l border-line pl-4">
                  {sections.map((s, i) => (
                    <li key={s.id}>
                      <a href={`#${s.id}`} className="text-small text-ink-2 hover:text-brand-ink">
                        <span className="mr-2 font-mono text-brand-ink">{String(i + 1).padStart(2, '0')}</span>
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </nav>
            <div className="max-w-[68ch] space-y-12 lg:col-span-8">
              {sections.map((s, i) => (
                <section key={s.id} id={s.id} className="scroll-mt-[calc(var(--spacing-nav)+2rem)]">
                  <h2 className="font-display text-h2 text-ink">
                    <span className="mb-2 block font-mono text-eyebrow text-brand-ink">{String(i + 1).padStart(2, '0')}</span>
                    {s.title}
                  </h2>
                  <div className="mt-4 space-y-4 text-body text-ink-2">
                    {s.body.map((p, k) => (
                      <p key={k}>{p}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>
      </Shell>
      <Footer />
    </>
  )
}
