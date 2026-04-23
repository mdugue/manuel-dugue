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
    slug: "privacy",
    title: dict.portfolio.legal.privacy.sheetTitle,
    description: dict.portfolio.legal.privacy.sheetSubtitle,
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
      pdfHref={`/${locale}/privacy/pdf`}
      subtitle={portfolio.legal.privacy.sheetSubtitle}
      title={portfolio.legal.privacy.sheetTitle}
    >
      <MarkdownPage lang={locale} slug="privacy" />
    </DocSheetPage>
  );
}
