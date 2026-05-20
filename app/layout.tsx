import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import {
  Cormorant_Garamond,
  EB_Garamond,
  Inter,
  JetBrains_Mono,
} from "next/font/google";
import PlausibleProvider from "next-plausible";
import { site } from "@/lib/site";
import { websiteJsonLd } from "@/lib/seo";
import { MotionPathnameWatcher } from "@/components/motion-link";
import "./globals.css";

const fontDisplay = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--ff-display",
});

const fontBody = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--ff-body",
});

const fontLabel = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
  variable: "--ff-label",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400"],
  display: "swap",
  variable: "--ff-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.author.name, url: site.url }],
  creator: site.author.name,
  publisher: site.author.name,
  category: "blog",
  openGraph: {
    title: site.name,
    description: site.description,
    type: "website",
    locale: "en_US",
    siteName: site.name,
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
  },
  alternates: {
    canonical: site.url,
    types: {
      "application/rss+xml": [{ url: "/feed.xml", title: site.name }],
    },
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#f6f4ee",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const fontVars = `${fontDisplay.variable} ${fontBody.variable} ${fontLabel.variable} ${fontMono.variable}`;
  return (
    <html lang="en" className={fontVars}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
        />
      </head>
      <body>
        <PlausibleProvider
          domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN!}
          trackOutboundLinks
          trackFileDownloads
          taggedEvents
        >
          <MotionPathnameWatcher />
          {children}
        </PlausibleProvider>
      </body>
    </html>
  );
}
