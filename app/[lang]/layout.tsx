import type { Metadata } from "next";
import { EB_Garamond, Inter, JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import Script from "next/script";
import { hasLocale, type Locale, localeParams } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import {
  buildPageMetadata,
  jsonLdString,
  METADATA_BASE,
  personJsonLd,
  SITE_NAME,
} from "@/i18n/seo";
import "../globals.css";

const ebGaramond = EB_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) {
    return { metadataBase: METADATA_BASE, applicationName: SITE_NAME };
  }
  const locale: Locale = lang;
  const dict = await getDictionary(locale);
  return {
    metadataBase: METADATA_BASE,
    applicationName: SITE_NAME,
    authors: [{ name: "Manuel Dugué", url: "https://manuel.fyi" }],
    creator: "Manuel Dugué",
    publisher: "Manuel Dugué",
    ...buildPageMetadata({
      locale,
      title: `${SITE_NAME} — Manuel Dugué`,
      description: dict.portfolio.hero.lede,
      templateTitle: false,
    }),
  };
}

export function generateStaticParams() {
  return localeParams();
}

export default async function RootLayout({
  children,
  modal,
  params,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  if (!hasLocale(lang)) {
    notFound();
  }

  return (
    <html
      className={`${ebGaramond.variable} ${inter.variable} ${jetBrainsMono.variable} antialiased`}
      lang={lang}
    >
      <body>
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Person JSON-LD is built from static schema on the server.
          dangerouslySetInnerHTML={{ __html: jsonLdString(personJsonLd()) }}
          type="application/ld+json"
        />
        {children}
        {modal}
        {process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
          <Script
            data-host-url="/stats"
            data-performance="true"
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
            src="/stats/script.js"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
