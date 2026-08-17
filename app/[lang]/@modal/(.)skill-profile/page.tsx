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
  const { meta } = readMarkdownSource("skill-profile", locale);
  const updatedLine = buildUpdatedLine(
    meta,
    locale,
    portfolio.docs.updatedLabel
  );

  return (
    <DocSheetModal
      contact={portfolio.contact}
      labels={portfolio.modal}
      pdfHref={`/${locale}/skill-profile/pdf`}
      subtitle={portfolio.docs.profile.sheetSubtitle}
      title={portfolio.docs.profile.sheetTitle}
      updatedLine={updatedLine}
    >
      <MarkdownPage slug="skill-profile" />
    </DocSheetModal>
  );
}
