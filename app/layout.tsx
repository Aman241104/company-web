import type { Metadata } from "next";
import { Poppins, Inter, Syne, Outfit } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import MobileDock from "@/components/MobileDock";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mehtatechnologies.com"),
  title: {
    default: "Mehta Technologies — Web, App & SaaS Development Agency India",
    template: "%s | Mehta Technologies",
  },
  description:
    "Mehta Technologies is a full-stack digital agency in Mumbai & Bengaluru. We build high-performance websites, mobile apps, SaaS platforms, and run performance marketing campaigns that drive measurable business growth.",
  keywords: [
    "web development agency India",
    "software development company Mumbai",
    "Next.js development",
    "SaaS development India",
    "mobile app development",
    "performance marketing agency",
    "SEO services India",
    "React development",
    "digital agency Bengaluru",
    "custom software development",
  ],
  authors: [{ name: "Mehta Technologies", url: "https://mehtatechnologies.com" }],
  creator: "Mehta Technologies",
  publisher: "Mehta Technologies",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  alternates: { canonical: "https://mehtatechnologies.com" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://mehtatechnologies.com",
    siteName: "Mehta Technologies",
    title: "Mehta Technologies — Web, App & SaaS Development Agency India",
    description:
      "Full-stack digital agency in Mumbai & Bengaluru. We build websites, mobile apps, SaaS platforms & run performance marketing campaigns.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Mehta Technologies — Digital Agency India" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mehta Technologies — Web, App & SaaS Development Agency India",
    description:
      "Full-stack digital agency in Mumbai & Bengaluru. Websites, mobile apps, SaaS & performance marketing.",
    images: ["/og.png"],
    creator: "@mehtatechnologies",
    site: "@mehtatechnologies",
  },
  icons: {
    icon: [{ url: "/favicon.ico" }],
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  verification: {
    google: "",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#060614",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Mehta Technologies",
  url: "https://mehtatechnologies.com",
  logo: "https://mehtatechnologies.com/favicon.ico",
  description:
    "Full-stack digital agency in Mumbai & Bengaluru specialising in web development, mobile apps, SaaS platforms, and performance marketing.",
  email: "hello@mehtatechnologies.com",
  telephone: "+91-98765-43210",
  address: [
    { "@type": "PostalAddress", addressLocality: "Mumbai", addressRegion: "MH", addressCountry: "IN" },
    { "@type": "PostalAddress", addressLocality: "Bengaluru", addressRegion: "KA", addressCountry: "IN" },
  ],
  sameAs: [
    "https://linkedin.com/company/mehta-technologies",
    "https://x.com/mehtatechnologies",
    "https://instagram.com/mehtatechnologies",
    "https://github.com/mehta-technologies",
  ],
  foundingDate: "2019",
  numberOfEmployees: { "@type": "QuantitativeValue", value: 18 },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable} ${syne.variable} ${outfit.variable}`} suppressHydrationWarning>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Preloader />
        <CustomCursor />
        <SmoothScroll>{children}</SmoothScroll>
        <MobileDock />
      </body>
    </html>
  );
}
