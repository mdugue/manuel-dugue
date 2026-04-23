import { notFound } from "next/navigation";
import { MarkdownPage } from "@/app/components/markdown-page";
import { DocSheetModal } from "@/app/components/modal";
import { hasLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) {
    notFound();
  }
  const locale: Locale = lang;
  const dict = await getDictionary(locale);
  const portfolio = dict.portfolio;

  return (
    <DocSheetModal
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
