import type { Article, WithContext } from "schema-dts";

import type { Locale } from "@/i18n/config";
import { jsonLdString, LOCALE_TAGS, pageUrl, SITE } from "@/i18n/seo";

import type { MarkdownMeta } from "./markdown-source";

export function ArticleJsonLd({
  locale,
  slug,
  title,
  description,
  meta,
}: {
  locale: Locale;
  slug: string;
  title: string;
  description: string;
  meta: MarkdownMeta;
}) {
  const article: WithContext<Article> = {
    "@context": "https://schema.org",
    "@type": "Article",
    author: { "@type": "Person", name: "Manuel Dugué", url: SITE },
    description,
    headline: title,
    inLanguage: LOCALE_TAGS[locale].bcp47,
    url: pageUrl(locale, slug),
    ...(meta.publishedIso ? { datePublished: meta.publishedIso } : {}),
    ...(meta.updatedIso ? { dateModified: meta.updatedIso } : {}),
  };

  return (
    <script
      dangerouslySetInnerHTML={{ __html: jsonLdString(article) }}
      type="application/ld+json"
    />
  );
}
