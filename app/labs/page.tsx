import type { Metadata } from 'next'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import LabsPage from '@/components/pages/LabsPage'

export const metadata: Metadata = {
  title: "Open-Source Labs & Developer Micro-Tools — Mehta Technologies",
  description:
    "Free production developer tools, Next.js 15 Server Action scaffolders, PostgreSQL multi-tenant RLS policy builders, and Stripe webhook generators built by Mehta Technologies.",
  alternates: { canonical: "https://mehtatechnologies.com/labs" },
}

export default function Page() {
  return (
    <main className="bg-[#07080C] min-h-screen text-white">
      <Navbar />
      <LabsPage />
      <Footer />
    </main>
  )
}
