import type { Metadata } from 'next'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import FAQ from '@/components/sections/FAQ'
import PageHero from '@/components/home/PageHero'
import { HowWeWork, WhyChoose, TechStack, ContactSection } from '@/components/home/HomeSections'

export const metadata: Metadata = {
  title: 'How We Work — Our Process',
  description:
    'Discovery, fixed-price proposal, design, build on a live staging link, launch and SLA support. How Mehta Technologies runs every website and software project.',
  alternates: { canonical: 'https://mehtatechnologies.com/how-we-work' },
}

export default function HowWeWorkPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="bg-bg relative overflow-x-hidden w-full max-w-[100vw]">
        <PageHero
          eyebrow="How we work"
          title="How we turn ideas into live products"
          intro="Four steps, a fixed-price milestone proposal, a live staging link you can check any time, and support that continues after launch."
        />
        <HowWeWork withHead={false} />
        <WhyChoose />
        <TechStack />
        <FAQ />
        <ContactSection />
        <Footer />
      </main>
    </>
  )
}
