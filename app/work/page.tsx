import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import WorkPage from '@/components/pages/WorkPage'

export const metadata = {
  title: 'Our Work | Mehta Technologies',
  description: 'Case studies and portfolio — 150+ projects shipped across web, mobile, SaaS, and growth.',
}

export default function Work() {
  return (
    <main className="bg-[#03050f]">
      <Navbar />
      <WorkPage />
      <Footer />
    </main>
  )
}
