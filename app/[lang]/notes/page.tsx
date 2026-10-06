import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Article, WithContext } from "schema-dts";

import { DocSheetPage } from "@/app/components/doc-sheet-page";
import { MarkdownPage } from "@/app/components/markdown-page";
import {
  buildUpdatedLine,
  readMarkdownSource,
} from "@/app/components/markdown-source";
import { hasLocale } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import {
  buildPageMetadata,
  jsonLdString,
  LOCALE_TAGS,
  pageUrl,
  SITE,
} from "@/i18n/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  "use cache";
  const { lang } = await params;
  if (!hasLocale(lang)) {
    return {};
  }
  const locale: Locale = lang;
  const dict = getDictionary(locale);
  const { meta } = await readMarkdownSource("notes", locale);
  return buildPageMetadata({
    description: dict.portfolio.docs.notes.sheetSubtitle,
    locale,
    publishedIso: meta.publishedIso,
    slug: "notes",
    title: dict.portfolio.docs.notes.sheetTitle,
    updatedIso: meta.updatedIso,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  "use cache";
  const { lang } = await params;
  if (!hasLocale(lang)) {
    notFound();
  }
  const locale: Locale = lang;
  const { portfolio } = getDictionary(locale);
  const { meta } = await readMarkdownSource("notes", locale);

  const articleJsonLd: WithContext<Article> = {
    "@context": "https://schema.org",
    "@type": "Article",
    author: { "@type": "Person", name: "Manuel Dugué", url: SITE },
    description: portfolio.docs.notes.sheetSubtitle,
    headline: portfolio.docs.notes.sheetTitle,
    inLanguage: LOCALE_TAGS[locale].bcp47,
    url: pageUrl(locale, "notes"),
    ...(meta.publishedIso ? { datePublished: meta.publishedIso } : {}),
    ...(meta.updatedIso ? { dateModified: meta.updatedIso } : {}),
  };

  const updatedLine = buildUpdatedLine(
    meta,
    locale,
    portfolio.docs.updatedLabel
  );

  return (
    <DocSheetPage
      contact={portfolio.contact}
      lang={locale}
      modalLabels={portfolio.modal}
      pdfHref={`/${locale}/notes/pdf`}
      subtitle={portfolio.docs.notes.sheetSubtitle}
      title={portfolio.docs.notes.sheetTitle}
      updatedLine={updatedLine}
    >
      <script
        dangerouslySetInnerHTML={{ __html: jsonLdString(articleJsonLd) }}
        type="application/ld+json"
      />
      <MarkdownPage lang={locale} slug="notes" />
    </DocSheetPage>
  );
}
