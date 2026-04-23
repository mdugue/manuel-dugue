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
      pdfHref={`/${locale}/curriculum-vitae/pdf`}
      subtitle={portfolio.docs.cv.sheetSubtitle}
      title={portfolio.docs.cv.sheetTitle}
    >
      <MarkdownPage lang={locale} slug="curriculum-vitae" />
    </DocSheetModal>
  );
}
