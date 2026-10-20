import { MarkdownPage } from "@/app/components/markdown-page";
import {
  buildUpdatedLine,
  readMarkdownSource,
} from "@/app/components/markdown-source";
import { DocSheetModal } from "@/app/components/modal";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/locale";

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
    <DocSheetModal
      slug="notes"
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
