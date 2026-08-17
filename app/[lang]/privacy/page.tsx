import type { Metadata } from "next";
import { DocSheetPage } from "@/app/components/doc-sheet-page";
import { MarkdownPage } from "@/app/components/markdown-page";
import { getLocaleDictionary } from "@/i18n/root-locale";
import { buildPageMetadata } from "@/i18n/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { dict, locale } = await getLocaleDictionary();
  return buildPageMetadata({
    description: dict.portfolio.legal.privacy.sheetSubtitle,
    locale,
    slug: "privacy",
    title: dict.portfolio.legal.privacy.sheetTitle,
  });
}

export default async function Page() {
  "use cache";
  const { dict, locale } = await getLocaleDictionary();
  const { portfolio } = dict;

  return (
    <DocSheetPage
      contact={portfolio.contact}
      modalLabels={portfolio.modal}
      pdfHref={`/${locale}/privacy/pdf`}
      subtitle={portfolio.legal.privacy.sheetSubtitle}
      title={portfolio.legal.privacy.sheetTitle}
    >
      <MarkdownPage slug="privacy" />
    </DocSheetPage>
  );
}
