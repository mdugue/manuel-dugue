import type { Metadata } from "next";

import { ArticleJsonLd } from "@/app/components/article-json-ld";
import { DocSheetPage } from "@/app/components/doc-sheet-page";
import { MarkdownPage } from "@/app/components/markdown-page";
import {
  buildUpdatedLine,
  readMarkdownSource,
} from "@/app/components/markdown-source";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/locale";
import { buildPageMetadata } from "@/i18n/seo";

export async function generateMetadata(): Promise<Metadata> {
  "use cache";
  const locale = await getLocale();
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

export default async function Page() {
  "use cache";
  const locale = await getLocale();
  const { portfolio } = getDictionary(locale);
  const { meta } = await readMarkdownSource("notes", locale);

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
      <ArticleJsonLd
        description={portfolio.docs.notes.sheetSubtitle}
        locale={locale}
        meta={meta}
        slug="notes"
        title={portfolio.docs.notes.sheetTitle}
      />
      <MarkdownPage lang={locale} slug="notes" />
    </DocSheetPage>
  );
}
