import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { RevealObserver } from "@/components/reveal";
import { org } from "@/content/site";
import { siteUrl } from "@/content/site-url";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${org.short} | ${org.name}`,
    template: `%s | ${org.short}`,
  },
  description: org.summary,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: org.name,
    title: `${org.short} | ${org.tagline}`,
    description: org.summary,
  },
  twitter: {
    card: "summary_large_image",
    title: `${org.short} | ${org.tagline}`,
    description: org.summary,
  },
};

export const viewport: Viewport = {
  themeColor: "#002552",
};

// Organization details for search engines (schema.org)
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: org.name,
  alternateName: org.short,
  url: siteUrl,
  logo: `${siteUrl}/logo-pgccdc.png`,
  description: org.summary,
  slogan: org.tagline,
  email: org.email,
  telephone: "+1-202-413-6431",
  address: {
    "@type": "PostalAddress",
    streetAddress: org.address.line1,
    addressLocality: "Upper Marlboro",
    addressRegion: "MD",
    postalCode: "20772",
    addressCountry: "US",
  },
  areaServed: { "@type": "AdministrativeArea", name: "Prince George's County, Maryland" },
  sameAs: org.social.map((s) => s.href),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fraunces.variable} ${jakarta.variable}`} suppressHydrationWarning>
      <head>
        {/* Enables scroll-reveal styles only when JS runs, so content never hides without it */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="min-h-dvh flex flex-col antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-navy-900 focus:px-4 focus:py-3 focus:font-semibold focus:text-white"
        >
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c") }}
        />
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <RevealObserver />
      </body>
    </html>
  );
}
