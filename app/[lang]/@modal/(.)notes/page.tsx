import { notFound } from "next/navigation";

import { MarkdownPage } from "@/app/components/markdown-page";
import {
  buildUpdatedLine,
  readMarkdownSource,
} from "@/app/components/markdown-source";
import { DocSheetModal } from "@/app/components/modal";
import { hasLocale } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

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
  const updatedLine = buildUpdatedLine(
    meta,
    locale,
    portfolio.docs.updatedLabel
  );

  return (
    <DocSheetModal
      contact={portfolio.contact}
      labels={portfolio.modal}
      pdfHref={`/${locale}/notes/pdf`}
      subtitle={portfolio.docs.notes.sheetSubtitle}
      title={portfolio.docs.notes.sheetTitle}
      updatedLine={updatedLine}
    >
      <MarkdownPage lang={locale} slug="notes" />
    </DocSheetModal>
  );
}
