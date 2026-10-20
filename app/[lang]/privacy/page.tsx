import type { Metadata } from "next";

import { DocSheetPage } from "@/app/components/doc-sheet-page";
import { MarkdownPage } from "@/app/components/markdown-page";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/locale";
import { buildPageMetadata } from "@/i18n/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  return buildPageMetadata({
    description: dict.portfolio.legal.privacy.sheetSubtitle,
    locale,
    slug: "privacy",
    title: dict.portfolio.legal.privacy.sheetTitle,
  });
}

export default async function Page() {
  "use cache";
  const locale = await getLocale();
  const { portfolio } = getDictionary(locale);

  return (
    <DocSheetPage
      contact={portfolio.contact}
      lang={locale}
      modalLabels={portfolio.modal}
      pdfHref={`/${locale}/privacy/pdf`}
      subtitle={portfolio.legal.privacy.sheetSubtitle}
      title={portfolio.legal.privacy.sheetTitle}
    >
      <MarkdownPage lang={locale} slug="privacy" />
    </DocSheetPage>
  );
}
