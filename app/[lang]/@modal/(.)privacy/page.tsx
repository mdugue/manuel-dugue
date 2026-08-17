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
      pdfHref={`/${locale}/privacy/pdf`}
      subtitle={portfolio.legal.privacy.sheetSubtitle}
      title={portfolio.legal.privacy.sheetTitle}
    >
      <MarkdownPage slug="privacy" />
    </DocSheetModal>
  );
}
