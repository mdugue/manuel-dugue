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
  const { meta } = readMarkdownSource("skill-profile", locale);
  return buildPageMetadata({
    description: dict.portfolio.docs.profile.sheetSubtitle,
    locale,
    publishedIso: meta.publishedIso,
    slug: "skill-profile",
    title: dict.portfolio.docs.profile.sheetTitle,
    updatedIso: meta.updatedIso,
  });
}

export default async function Page() {
  "use cache";
  const { dict, locale } = await getLocaleDictionary();
  const { portfolio } = dict;
  const { meta } = readMarkdownSource("skill-profile", locale);

  const articleJsonLd: WithContext<Article> = {
    "@context": "https://schema.org",
    "@type": "Article",
    author: { "@type": "Person", name: "Manuel Dugué", url: SITE },
    description: portfolio.docs.profile.sheetSubtitle,
    headline: portfolio.docs.profile.sheetTitle,
    inLanguage: LOCALE_TAGS[locale].bcp47,
    url: pageUrl(locale, "skill-profile"),
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
      modalLabels={portfolio.modal}
      pdfHref={`/${locale}/skill-profile/pdf`}
      subtitle={portfolio.docs.profile.sheetSubtitle}
      title={portfolio.docs.profile.sheetTitle}
      updatedLine={updatedLine}
    >
      <script
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Article JSON-LD is built from static metadata, not user input.
        dangerouslySetInnerHTML={{ __html: jsonLdString(articleJsonLd) }}
        type="application/ld+json"
      />
      <MarkdownPage slug="skill-profile" />
    </DocSheetPage>
  );
}
