import type { Metadata, Viewport } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { restaurant } from "@/lib/restaurant";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT"]
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap"
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap"
});

const seoTitle = "12er Restaurant | Gutbürgerlich an der Maaraue in Wiesbaden";
const seoDescription = "12er Restaurant in Wiesbaden, direkt am Sportplatz Maaraue. Gutbürgerliche Küche, handmade Cordon bleu, 12er Salat und Terrasse gegenüber dem Freibad. Öffnungszeiten und Reservierung online.";

export const metadata: Metadata = {
  title: seoTitle,
  description: seoDescription,
  keywords: [
    ...restaurant.seo.keywords,
    "gutbürgerlich Wiesbaden",
    "Restaurant Maaraue",
    "Cordon bleu Wiesbaden",
    "Terrasse Freibad Maaraue",
  ],
  openGraph: {
    title: seoTitle,
    description: seoDescription,
    locale: restaurant.seo.locale,
  },
};

export const viewport: Viewport = {
  themeColor: "#FAF8F5",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${fraunces.variable} ${geist.variable} ${geistMono.variable}`}>
      <body className="grain overflow-x-hidden bg-bone text-ink">
        {children}
      </body>
    </html>
  );
}
