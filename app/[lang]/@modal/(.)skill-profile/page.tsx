import { notFound } from "next/navigation";
import { MarkdownPage } from "@/app/components/markdown-page";
import {
  buildUpdatedLine,
  readMarkdownSource,
} from "@/app/components/markdown-source";
import { DocSheetModal } from "@/app/components/modal";
import { hasLocale, type Locale } from "@/i18n/config";
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
  const { portfolio } = await getDictionary(locale);
  const { meta } = await readMarkdownSource("skill-profile", locale);
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
      <MarkdownPage lang={locale} slug="skill-profile" />
    </DocSheetModal>
  );
}
