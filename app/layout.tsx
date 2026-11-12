import type { Metadata, Viewport } from "next";
import { Montserrat, Inter, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import "./site.css";
import SmoothScroll from "@/components/SmoothScroll";
import MotionProvider from "@/components/MotionProvider";
import ConsultModal from "@/components/site/ConsultModal";
import FloatingContact from "@/components/site/FloatingContact";
import Preloader from "@/components/site/Preloader";
import ScrollProgress from "@/components/site/ScrollProgress";
import Reveal from "@/components/site/Reveal";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

const montserrat = Montserrat({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
    default: "Mehta Technologies: Website & E-Commerce Development Agency, Ahmedabad",
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
    title: "Mehta Technologies: Website & E-Commerce Development Agency, Ahmedabad",
    description:
      "Ahmedabad-based web development agency. We build websites, e-commerce stores, custom software & run performance marketing campaigns.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Mehta Technologies, Web Development Agency, Ahmedabad" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mehta Technologies: Website & E-Commerce Development Agency, Ahmedabad",
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

// themeColor = --color-cream (app/globals.css). Next's viewport export needs
// a literal color string, not a CSS variable, so keep this in sync by hand.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F4F7FC" },
    { media: "(prefers-color-scheme: dark)", color: "#070C1A" },
  ],
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
    <html lang="en" className={`${montserrat.variable} ${inter.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `var d=document.documentElement;d.setAttribute("data-js","");try{if(sessionStorage.getItem("pl-seen")||location.pathname!=="/"||matchMedia("(prefers-reduced-motion: reduce)").matches)d.setAttribute("data-preloaded","")}catch(e){d.setAttribute("data-preloaded","")}` }} />
        {/* Apply the saved theme before first paint. Light is the default. */}
        <script dangerouslySetInnerHTML={{ __html: `try{if(localStorage.getItem('theme')==='dark')document.documentElement.dataset.theme='dark'}catch(e){}` }} />
      </head>
      <body id="top" className="bg-bg text-ink antialiased">
        <div className="noise-overlay" aria-hidden="true" />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-5 focus:py-2.5 focus:rounded-full focus:bg-night focus:text-snow focus:text-sm focus:font-semibold"
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
          <SmoothScroll>{children}</SmoothScroll>
          <FloatingContact />
          <ConsultModal />
          <Preloader />
          <ScrollProgress />
          <Reveal />
        </MotionProvider>
      </body>
    </html>
  );
}
