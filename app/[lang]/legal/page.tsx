import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocSheetPage } from "@/app/components/doc-sheet-page";
import { MarkdownPage } from "@/app/components/markdown-page";
import { hasLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildPageMetadata } from "@/i18n/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) {
    return {};
  }
  const locale: Locale = lang;
  const dict = await getDictionary(locale);
  return buildPageMetadata({
    locale,
    slug: "legal",
    title: dict.portfolio.legal.imprint.sheetTitle,
    description: dict.portfolio.legal.imprint.sheetSubtitle,
  });
}

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
  const dict = await getDictionary(locale);
  const portfolio = dict.portfolio;

  return (
    <DocSheetPage
      contact={portfolio.contact}
      lang={locale}
      modalLabels={portfolio.modal}
      pdfHref={`/${locale}/legal/pdf`}
      subtitle={portfolio.legal.imprint.sheetSubtitle}
      title={portfolio.legal.imprint.sheetTitle}
    >
      <MarkdownPage lang={locale} slug="legal" />
    </DocSheetPage>
  );
}
