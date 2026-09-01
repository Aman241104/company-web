import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import MobileDock from "@/components/MobileDock";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import MotionProvider from "@/components/MotionProvider";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

const sora = Sora({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mehtatechnologies.com"),
  title: {
    default: "Mehta Technologies — Website & E-Commerce Development Agency, Ahmedabad",
    template: "%s | Mehta Technologies",
  },
  description:
    "Mehta Technologies is an Ahmedabad-based web development agency. We design and build modern, fast, SEO-ready websites and e-commerce stores that help businesses build credibility, generate enquiries, and grow online.",
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
    title: "Mehta Technologies — Website & E-Commerce Development Agency, Ahmedabad",
    description:
      "Ahmedabad-based web development agency. We build websites, e-commerce stores, custom software & run performance marketing campaigns.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Mehta Technologies — Web Development Agency, Ahmedabad" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mehta Technologies — Website & E-Commerce Development Agency, Ahmedabad",
    description:
      "Ahmedabad-based web development agency. Websites, e-commerce, custom software & performance marketing.",
    images: ["/og.png"],
    creator: "@mehtatechnologies",
    site: "@mehtatechnologies",
  },
  icons: {
    icon: [{ url: "/favicon.ico" }],
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#07080C",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Mehta Technologies",
  url: "https://mehtatechnologies.com",
  logo: "https://mehtatechnologies.com/brand/mehta-logo-icon-light.png",
  description:
    "Ahmedabad-based web development agency specialising in websites, e-commerce stores, custom software, and performance marketing.",
  email: "hello@mehtatechnologies.com",
  telephone: "+91-98765-43210",
  address: [
    { "@type": "PostalAddress", addressLocality: "Ahmedabad", addressRegion: "GJ", addressCountry: "IN" },
  ],
  sameAs: [
    "https://linkedin.com/company/mehta-technologies",
    "https://instagram.com/mehtatechnologies",
  ],
  foundingDate: "2019",
  numberOfEmployees: { "@type": "QuantitativeValue", value: 18 },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable}`} style={{ colorScheme: 'dark' }} suppressHydrationWarning>
      <body className="bg-[#07080C] text-white selection:bg-blue-600/30 selection:text-white">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2.5 focus:rounded-xl focus:bg-white focus:text-black focus:text-sm focus:font-semibold"
        >
          Skip to main content
        </a>
        {GTM_ID && (
          <Script id="gtm-init" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
          </Script>
        )}
        {META_PIXEL_ID && (
          <Script id="meta-pixel-init" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`}
          </Script>
        )}
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        {META_PIXEL_ID && (
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <MotionProvider>
          <CustomCursor />
          <SmoothScroll>{children}</SmoothScroll>
          <MobileDock />
          <FloatingWhatsApp />
        </MotionProvider>
      </body>
    </html>
  );
}
