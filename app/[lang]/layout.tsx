import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Analytics } from "@/app/components/analytics";
import { fontVariables } from "@/app/fonts";
import { hasLocale, localeParams } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import {
  buildPageMetadata,
  jsonLdString,
  METADATA_BASE,
  personJsonLd,
  SITE_NAME,
} from "@/i18n/seo";

import "../globals.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) {
    return { applicationName: SITE_NAME, metadataBase: METADATA_BASE };
  }
  const locale: Locale = lang;
  const dict = getDictionary(locale);
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
    <html className={`${fontVariables} antialiased`} lang={lang}>
      <body>
        <script
          dangerouslySetInnerHTML={{ __html: jsonLdString(personJsonLd()) }}
          type="application/ld+json"
        />
        {children}
        {modal}
        <Analytics />
      </body>
    </html>
  );
}
