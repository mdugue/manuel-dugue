import type { Metadata } from "next";
import type { Article, WithContext } from "schema-dts";
import { DocSheetPage } from "@/app/components/doc-sheet-page";
import { MarkdownPage } from "@/app/components/markdown-page";
import {
  buildUpdatedLine,
  readMarkdownSource,
} from "@/app/components/markdown-source";
import { getLocaleDictionary } from "@/i18n/root-locale";
import {
  buildPageMetadata,
  jsonLdString,
  LOCALE_TAGS,
  pageUrl,
  SITE,
} from "@/i18n/seo";

export async function generateMetadata(): Promise<Metadata> {
  "use cache";
  const { dict, locale } = await getLocaleDictionary();
  const { meta } = readMarkdownSource("curriculum-vitae", locale);
  return buildPageMetadata({
    description: dict.portfolio.docs.cv.sheetSubtitle,
    locale,
    publishedIso: meta.publishedIso,
    slug: "curriculum-vitae",
    title: dict.portfolio.docs.cv.sheetTitle,
    updatedIso: meta.updatedIso,
  });
}

export default async function Page() {
  "use cache";
  const { dict, locale } = await getLocaleDictionary();
  const { portfolio } = dict;
  const { meta } = readMarkdownSource("curriculum-vitae", locale);

  const updatedLine = buildUpdatedLine(
    meta,
    locale,
    portfolio.docs.updatedLabel
  );

  const articleJsonLd: WithContext<Article> = {
    "@context": "https://schema.org",
    "@type": "Article",
    author: { "@type": "Person", name: "Manuel Dugué", url: SITE },
    description: portfolio.docs.cv.sheetSubtitle,
    headline: portfolio.docs.cv.sheetTitle,
    inLanguage: LOCALE_TAGS[locale].bcp47,
    url: pageUrl(locale, "curriculum-vitae"),
    ...(meta.publishedIso ? { datePublished: meta.publishedIso } : {}),
    ...(meta.updatedIso ? { dateModified: meta.updatedIso } : {}),
  };

  return (
    <DocSheetPage
      contact={portfolio.contact}
      modalLabels={portfolio.modal}
      pdfHref={`/${locale}/curriculum-vitae/pdf`}
      subtitle={portfolio.docs.cv.sheetSubtitle}
      title={portfolio.docs.cv.sheetTitle}
      updatedLine={updatedLine}
    >
      <script
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Article JSON-LD is built from static metadata, not user input.
        dangerouslySetInnerHTML={{ __html: jsonLdString(articleJsonLd) }}
        type="application/ld+json"
      />
      <MarkdownPage slug="curriculum-vitae" />
    </DocSheetPage>
  );
}
