import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import AboutPage from '@/components/pages/AboutPage'

export const metadata = {
  title: 'About Us | Mehta Technologies',
  description: 'Premium technology partner for businesses — our story, team, and values.',
}

export default function About() {
  return (
    <main className="bg-[#03050f]">
      <Navbar />
      <AboutPage />
      <Footer />
    </main>
  )
}
