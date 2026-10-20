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
  const { meta } = await readMarkdownSource("curriculum-vitae", locale);
  const updatedLine = buildUpdatedLine(
    meta,
    locale,
    portfolio.docs.updatedLabel
  );

  return (
    <DocSheetModal
      lang={locale}
      slug="curriculum-vitae"
      contact={portfolio.contact}
      labels={portfolio.modal}
      pdfHref={`/${locale}/curriculum-vitae/pdf`}
      subtitle={portfolio.docs.cv.sheetSubtitle}
      title={portfolio.docs.cv.sheetTitle}
      updatedLine={updatedLine}
    >
      <MarkdownPage lang={locale} slug="curriculum-vitae" />
    </DocSheetModal>
  );
}
