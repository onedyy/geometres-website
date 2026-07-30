import type { Metadata, Viewport } from "next";
import { siteMeta, siteUrl } from "@/lib/site";
import { StructuredData } from "@/components/StructuredData";
import "./fonts.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteMeta.title,
    template: "%s | GEOMETRES",
  },
  description: siteMeta.description,
  applicationName: "GEOMETRES",
  authors: [{ name: "GEOMETRES" }],
  keywords: [
    "geodézia Bratislava",
    "geodet Bratislava",
    "geometrický plán",
    "kataster nehnuteľností",
    "inžinierska geodézia",
    "vytyčovanie stavieb",
    "polohopisné a výškopisné zameranie",
    "3D laserové skenovanie",
    "letecké snímkovanie",
    "mračno bodov",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: siteMeta.locale,
    url: "/",
    siteName: "GEOMETRES",
    title: siteMeta.title,
    description: siteMeta.description,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "GEOMETRES — geodézia, kataster a 3D meranie",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteMeta.title,
    description: siteMeta.description,
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#060c18",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={siteMeta.lang}>
      <head>
        {/* Only the two faces used above the fold are preloaded. */}
        <link
          rel="preload"
          href="/fonts/inter-tight-var-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/syne-700-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        {children}
        <StructuredData />
      </body>
    </html>
  );
}
