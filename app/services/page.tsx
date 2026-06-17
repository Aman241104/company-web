import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import ServicesPage from '@/components/pages/ServicesPage'

export const metadata = {
  title: 'Services | Mehta Technologies',
  description: 'Full-stack digital services — web development, mobile apps, SaaS, performance marketing, and SEO.',
}

export default function Services() {
  return (
    <main className="bg-[#03050f]">
      <Navbar />
      <ServicesPage />
      <Footer />
    </main>
  )
}
