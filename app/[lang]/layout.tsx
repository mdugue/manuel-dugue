import type { Metadata } from "next";

import { Analytics } from "@/app/components/analytics";
import { ConsoleHello } from "@/app/components/console-hello";
import { fontVariables } from "@/app/fonts";
import { localeParams } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/locale";
import {
  buildPageMetadata,
  jsonLdString,
  METADATA_BASE,
  personJsonLd,
  SITE_NAME,
} from "@/i18n/seo";

import "../globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
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
}: LayoutProps<"/[lang]">) {
  const locale = await getLocale();
  const dict = getDictionary(locale);

  return (
    <html className={`${fontVariables} antialiased`} lang={locale}>
      <body>
        <script
          dangerouslySetInnerHTML={{ __html: jsonLdString(personJsonLd()) }}
          type="application/ld+json"
        />
        {children}
        {modal}
        <Analytics />
        <ConsoleHello message={dict.portfolio.console} />
      </body>
    </html>
  );
}
