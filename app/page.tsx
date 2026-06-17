import Navbar from '@/components/sections/Navbar'
import Hero from '@/components/sections/Hero'
import TechStack from '@/components/sections/TechStack'
import Work from '@/components/sections/Work'
import Featured from '@/components/sections/Featured'
import Services from '@/components/sections/Services'
import About from '@/components/sections/About'
import Capabilities from '@/components/sections/Capabilities'
import Process from '@/components/sections/Process'
import Pricing from '@/components/sections/Pricing'
import Team from '@/components/sections/Team'
import FAQ from '@/components/sections/FAQ'
import Testimonials from '@/components/sections/Testimonials'
import CTA from '@/components/sections/CTA'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <main className="bg-[#060606]">
      <Navbar />
      <Hero />
      <TechStack />
      <Work />
      <Featured />
      <Services />
      <About />
      <Capabilities />
      <Process />
      <Pricing />
      <Team />
      <FAQ />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  )
}
