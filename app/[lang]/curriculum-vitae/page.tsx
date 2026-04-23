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
    slug: "curriculum-vitae",
    title: dict.portfolio.docs.cv.sheetTitle,
    description: dict.portfolio.docs.cv.sheetSubtitle,
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
      pdfHref={`/${locale}/curriculum-vitae/pdf`}
      subtitle={portfolio.docs.cv.sheetSubtitle}
      title={portfolio.docs.cv.sheetTitle}
    >
      <MarkdownPage lang={locale} slug="curriculum-vitae" />
    </DocSheetPage>
  );
}
