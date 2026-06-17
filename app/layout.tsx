import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Mehta Technologies — We Build Digital Products",
  description:
    "Premium technology partner for website development, software, mobile apps, SaaS, SEO & performance marketing. Building digital products that drive real business growth.",
  keywords:
    "web development, software development, mobile app, SaaS, SEO, performance marketing, India, Next.js, React",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`} suppressHydrationWarning>
      <body>
        <Preloader />
        <CustomCursor />
        <SmoothScroll>{children}</SmoothScroll>
        <MobileDock />
      </body>
    </html>
  );
}
