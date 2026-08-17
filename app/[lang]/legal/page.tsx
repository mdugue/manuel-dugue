import type { Metadata } from "next";
import { DocSheetPage } from "@/app/components/doc-sheet-page";
import { MarkdownPage } from "@/app/components/markdown-page";
import { getLocaleDictionary } from "@/i18n/root-locale";
import { buildPageMetadata } from "@/i18n/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { dict, locale } = await getLocaleDictionary();
  return buildPageMetadata({
    description: dict.portfolio.legal.imprint.sheetSubtitle,
    locale,
    slug: "legal",
    title: dict.portfolio.legal.imprint.sheetTitle,
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
      pdfHref={`/${locale}/legal/pdf`}
      subtitle={portfolio.legal.imprint.sheetSubtitle}
      title={portfolio.legal.imprint.sheetTitle}
    >
      <MarkdownPage slug="legal" />
    </DocSheetPage>
  );
}
