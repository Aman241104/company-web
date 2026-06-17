import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import ContactPage from '@/components/pages/ContactPage'

export const metadata = {
  title: 'Contact | Mehta Technologies',
  description: 'Get in touch — free consultation, project enquiries, and partnership opportunities.',
}

export default function Contact() {
  return (
    <main className="bg-[#03050f]">
      <Navbar />
      <ContactPage />
      <Footer />
    </main>
  )
}
