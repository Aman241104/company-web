import type { Metadata } from 'next'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import LabsPage from '@/components/pages/LabsPage'

export const metadata: Metadata = {
  title: "Open-Source Labs & Developer Micro-Tools",
  description:
    "Free production developer tools, Next.js 15 Server Action scaffolders, PostgreSQL multi-tenant RLS policy builders, and Stripe webhook generators built by Mehta Technologies.",
  alternates: { canonical: "https://mehtatechnologies.com/labs" },
}

export default function Page() {
  return (
    <>
      <Navbar theme="light" />
      <main id="main-content" tabIndex={-1} className="home-light bg-white min-h-screen">
        <LabsPage />
        <Footer />
      </main>
    </>
  )
}
