import type { Metadata } from "next";
import type { Article, WithContext } from "schema-dts";
import { getLocaleDictionary } from "@/i18n/root-locale";
import {
  buildPageMetadata,
  jsonLdString,
  LOCALE_TAGS,
  pageUrl,
  SITE,
} from "@/i18n/seo";
import { AUTHOR, DOCUMENTS, type DocSlug } from "./doc-registry";
import { DocSheetPage } from "./doc-sheet-page";
import { MarkdownPage } from "./markdown-page";
import { buildUpdatedLine, readMarkdownSource } from "./markdown-source";
import { DocSheetModal } from "./modal";

async function loadDoc(slug: DocSlug) {
  const { dict, locale } = await getLocaleDictionary();
  const { meta: source } = readMarkdownSource(slug, locale);
  return {
    locale,
    meta: DOCUMENTS[slug].meta(dict),
    pdfHref: `/${locale}/${slug}/pdf`,
    portfolio: dict.portfolio,
    source,
    updatedLine: buildUpdatedLine(
      source,
      locale,
      dict.portfolio.docs.updatedLabel
    ),
  };
}

export function createDocPage(slug: DocSlug) {
  async function generateMetadata(): Promise<Metadata> {
    "use cache";
    const { locale, meta, source } = await loadDoc(slug);
    return buildPageMetadata({
      description: meta.sheetSubtitle,
      locale,
      publishedIso: source.publishedIso,
      slug,
      title: meta.sheetTitle,
      updatedIso: source.updatedIso,
    });
  }

  async function Page() {
    "use cache";
    const { locale, meta, pdfHref, portfolio, source, updatedLine } =
      await loadDoc(slug);

    const articleJsonLd: WithContext<Article> = {
      "@context": "https://schema.org",
      "@type": "Article",
      author: { "@type": "Person", name: AUTHOR, url: SITE },
      description: meta.sheetSubtitle,
      headline: meta.sheetTitle,
      inLanguage: LOCALE_TAGS[locale].bcp47,
      url: pageUrl(locale, slug),
      ...(source.publishedIso ? { datePublished: source.publishedIso } : {}),
      ...(source.updatedIso ? { dateModified: source.updatedIso } : {}),
    };

    return (
      <DocSheetPage
        contact={portfolio.contact}
        modalLabels={portfolio.modal}
        pdfHref={pdfHref}
        subtitle={meta.sheetSubtitle}
        title={meta.sheetTitle}
        updatedLine={updatedLine}
      >
        {DOCUMENTS[slug].article ? (
          <script
            // biome-ignore lint/security/noDangerouslySetInnerHtml: Article JSON-LD is built from static metadata, not user input.
            dangerouslySetInnerHTML={{ __html: jsonLdString(articleJsonLd) }}
            type="application/ld+json"
          />
        ) : null}
        <MarkdownPage slug={slug} />
      </DocSheetPage>
    );
  }

  return { generateMetadata, Page };
}

export function createDocModal(slug: DocSlug) {
  return async function Page() {
    "use cache";
    const { meta, pdfHref, portfolio, updatedLine } = await loadDoc(slug);

    return (
      <DocSheetModal
        contact={portfolio.contact}
        labels={portfolio.modal}
        pdfHref={pdfHref}
        subtitle={meta.sheetSubtitle}
        title={meta.sheetTitle}
        updatedLine={updatedLine}
      >
        <MarkdownPage slug={slug} />
      </DocSheetModal>
    );
  };
}
