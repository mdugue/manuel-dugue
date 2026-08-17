import type { Metadata } from "next";
import { EB_Garamond, Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { localeParams } from "@/i18n/config";
import { getLocale, getLocaleDictionary } from "@/i18n/root-locale";
import {
  buildPageMetadata,
  jsonLdString,
  METADATA_BASE,
  personJsonLd,
  SITE_NAME,
} from "@/i18n/seo";
import "../globals.css";

const ebGaramond = EB_Garamond({
  display: "swap",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
});

const inter = Inter({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600"],
});

const jetBrainsMono = JetBrains_Mono({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export async function generateMetadata(): Promise<Metadata> {
  const { dict, locale } = await getLocaleDictionary();
  return {
    applicationName: SITE_NAME,
    authors: [{ name: "Manuel Dugué", url: "https://manuel.fyi" }],
    creator: "Manuel Dugué",
    metadataBase: METADATA_BASE,
    publisher: "Manuel Dugué",
    ...buildPageMetadata({
      description: dict.portfolio.hero.lede,
      locale,
      templateTitle: false,
      title: `${SITE_NAME} — Manuel Dugué`,
    }),
  };
}

export function generateStaticParams() {
  return localeParams();
}

export default async function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html
      className={`${ebGaramond.variable} ${inter.variable} ${jetBrainsMono.variable} antialiased`}
      lang={locale}
    >
      <body>
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Person JSON-LD is built from static schema on the server.
          dangerouslySetInnerHTML={{ __html: jsonLdString(personJsonLd()) }}
          type="application/ld+json"
        />
        {children}
        {modal}
        {process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID ? (
          <Script
            data-host-url="/stats"
            data-performance="true"
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
            src="/stats/script.js"
            strategy="afterInteractive"
          />
        ) : null}
      </body>
    </html>
  );
}
