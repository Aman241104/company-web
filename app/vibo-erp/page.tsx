import type { Metadata } from 'next'
import { ShoppingBag, Package, Receipt, Users, Truck, BarChart3 } from 'lucide-react'
import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import { InnerHero, IncludedCard, HeroFigure, Section, CardGrid, NextCta, Shell } from '@/components/site/inner'
import { Btn } from '@/components/site/ui'
import ConsultButton from '@/components/site/ConsultButton'

// Uses the benchmark's "Creative Studio" page layout for our own product.
export const metadata: Metadata = {
  title: 'Vibo ERP — Business Management Software',
  description: 'Vibo ERP is Mehta Technologies’ own business management software: sales, inventory, billing, customers, purchases and reports in one dashboard.',
  alternates: { canonical: 'https://mehtatechnologies.com/vibo-erp' },
}

const modules = [
  { title: 'Sales', desc: 'Track orders and manage your sales pipeline in one place.', Icon: ShoppingBag },
  { title: 'Inventory', desc: 'Real-time stock levels across your products and locations.', Icon: Package },
  { title: 'Billing', desc: 'Fast, compliant invoicing without spreadsheets.', Icon: Receipt },
  { title: 'Customers', desc: 'A single record of every customer and their order history.', Icon: Users },
  { title: 'Purchases', desc: 'Manage suppliers and purchase orders end to end.', Icon: Truck },
  { title: 'Business Reports', desc: 'Clear reporting on how your business is actually performing.', Icon: BarChart3 },
]

export default function ViboErp() {
  return (
    <>
      <Header />
      <Shell>
        <InnerHero
          trail={[['Home', '/'], ['Vibo ERP']]}
          eyebrow="Our own product"
          title="Vibo ERP"
          lead="Our in-house business management software. One dashboard for sales, inventory, billing, customers, purchases and reports — built to run our own operations, then opened up to clients who need more than a website."
          ctas={false}
          side={<IncludedCard title="What it covers" items={modules.map((m) => m.title)} />}
          figure={<HeroFigure src="/assets/saas_hero_mockup.png" alt="Vibo ERP dashboard" />}
        >
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <ConsultButton service="Vibo ERP">Talk to us about Vibo ERP</ConsultButton>
            <Btn href="https://app.viboerp.com/" variant="secondary" external>Open Vibo ERP</Btn>
          </div>
        </InnerHero>
        <Section id="core" eyebrow="Core modules" title="The six we use every day" lead="Each module works on its own and together, from the same dashboard.">
          <CardGrid items={modules.map((m, i) => ({ href: '#', title: m.title, desc: m.desc, Icon: m.Icon, num: String(i + 1).padStart(2, '0') }))} />
        </Section>
        <Section id="story" eyebrow="Why we built it" title="Built for ourselves first" bg="bg-surface" action={<Btn href="/work/vibo-erp" variant="secondary" size="md" arrow>Read the case study</Btn>}>
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-3xl border border-line bg-bg p-6 sm:p-7" data-reveal="true">
              <p className="font-mono text-eyebrow text-muted uppercase">The problem</p>
              <p className="mt-3 text-lead text-ink-2">We were running our own operations across spreadsheets and disconnected tools, with no single place to see sales, stock and billing together.</p>
            </div>
            <div className="rounded-3xl border border-line bg-bg p-6 sm:p-7" data-reveal="true">
              <p className="font-mono text-eyebrow text-muted uppercase">What we did</p>
              <p className="mt-3 text-lead text-ink-2">We built Vibo ERP ourselves and kept refining it through everyday use, before making it available to clients who need more than a website.</p>
            </div>
          </div>
        </Section>
        <Section id="custom" eyebrow="Need something different?" title="Custom software & ERP">
          <p className="max-w-[60ch] text-lead text-ink-2" data-reveal="true">If your workflows don’t fit an off-the-shelf tool, we build custom ERP and business software around how you actually work.</p>
          <Btn href="/services/custom-software-development" variant="secondary" arrow className="mt-8">Custom Software &amp; ERP</Btn>
        </Section>
        <NextCta eyebrow="Get started" title="See if Vibo ERP fits your business" />
      </Shell>
      <Footer />
    </>
  )
}
