import type { Metadata, Viewport } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloatingButton } from "@/components/layout/WhatsAppFloatingButton";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Youssef Joe | هركبك الأنسب، مش الأحسن",
    template: "%s | Youssef Joe",
  },
  description:
    "يوسف جو - وسيط موتوسيكلات في مصر. بساعدك تلاقي الموتوسيكل الأنسب ليك حسب ميزانيتك وخبرتك واستخدامك.",
  keywords: ["موتوسيكلات للبيع", "بيع موتوسيكلات مصر", "وسيط موتوسيكلات", "Youssef Joe", "موتوسيكل مستعمل"],
  openGraph: {
    type: "website",
    locale: "ar_EG",
    siteName: "Youssef Joe",
    title: "Youssef Joe | هركبك الأنسب، مش الأحسن",
    description: "بساعدك تلاقي الموتوسيكل الأنسب ليك حسب ميزانيتك وخبرتك واستخدامك.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0c0d0f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <body className="font-sans bg-ink-900 text-paper antialiased">
        <Header />
        <main className="min-h-[60vh]">{children}</main>
        <Footer />
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}
