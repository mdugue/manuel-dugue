import { MarkdownPage } from "@/app/components/markdown-page";
import { DocSheetModal } from "@/app/components/modal";
import { getLocaleDictionary } from "@/i18n/root-locale";

export default async function Page() {
  const { dict, locale } = await getLocaleDictionary();
  const { portfolio } = dict;

  return (
    <DocSheetModal
      contact={portfolio.contact}
      labels={portfolio.modal}
      pdfHref={`/${locale}/legal/pdf`}
      subtitle={portfolio.legal.imprint.sheetSubtitle}
      title={portfolio.legal.imprint.sheetTitle}
    >
      <MarkdownPage slug="legal" />
    </DocSheetModal>
  );
}
