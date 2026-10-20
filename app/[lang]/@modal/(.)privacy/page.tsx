import { MarkdownPage } from "@/app/components/markdown-page";
import { DocSheetModal } from "@/app/components/modal";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/locale";

export default async function Page() {
  "use cache";
  const locale = await getLocale();
  const { portfolio } = getDictionary(locale);

  return (
    <DocSheetModal
      slug="privacy"
      contact={portfolio.contact}
      labels={portfolio.modal}
      pdfHref={`/${locale}/privacy/pdf`}
      subtitle={portfolio.legal.privacy.sheetSubtitle}
      title={portfolio.legal.privacy.sheetTitle}
    >
      <MarkdownPage lang={locale} slug="privacy" />
    </DocSheetModal>
  );
}
