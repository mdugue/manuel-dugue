import { MarkdownPage } from "@/app/components/markdown-page";
import {
  buildUpdatedLine,
  readMarkdownSource,
} from "@/app/components/markdown-source";
import { DocSheetModal } from "@/app/components/modal";
import { getLocaleDictionary } from "@/i18n/root-locale";

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

  return (
    <DocSheetModal
      contact={portfolio.contact}
      labels={portfolio.modal}
      pdfHref={`/${locale}/curriculum-vitae/pdf`}
      subtitle={portfolio.docs.cv.sheetSubtitle}
      title={portfolio.docs.cv.sheetTitle}
      updatedLine={updatedLine}
    >
      <MarkdownPage slug="curriculum-vitae" />
    </DocSheetModal>
  );
}
