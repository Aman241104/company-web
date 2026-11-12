import type { Metadata } from 'next'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import Team from '@/components/sections/Team'
import PageHero from '@/components/home/PageHero'
import { ContactSection } from '@/components/home/HomeSections'

export const metadata: Metadata = {
  title: 'Our Team',
  description: 'Meet the designers, engineers and marketers at Mehta Technologies, Ahmedabad — the people who build your project.',
  alternates: { canonical: 'https://mehtatechnologies.com/team' },
}

export default function TeamPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="bg-bg relative overflow-x-hidden w-full max-w-[100vw]">
        <PageHero
          eyebrow="Our team"
          title="The people who do the work"
          intro="The people who scope your project are the people who build it. You talk to them directly, from the first call through to launch."
        />
        <Team />
        <ContactSection />
        <Footer />
      </main>
    </>
  )
}
