import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Article, WithContext } from "schema-dts";
import { DocSheetPage } from "@/app/components/doc-sheet-page";
import { MarkdownPage } from "@/app/components/markdown-page";
import { hasLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildPageMetadata, jsonLdString, pageUrl, SITE } from "@/i18n/seo";

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
    slug: "skill-profile",
    title: dict.portfolio.docs.profile.sheetTitle,
    description: dict.portfolio.docs.profile.sheetSubtitle,
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

  const articleJsonLd: WithContext<Article> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: portfolio.docs.profile.sheetTitle,
    description: portfolio.docs.profile.sheetSubtitle,
    inLanguage: locale,
    author: { "@type": "Person", name: "Manuel Dugué", url: SITE },
    url: pageUrl(locale, "skill-profile"),
  };

  return (
    <DocSheetPage
      contact={portfolio.contact}
      lang={locale}
      modalLabels={portfolio.modal}
      pdfHref={`/${locale}/skill-profile/pdf`}
      subtitle={portfolio.docs.profile.sheetSubtitle}
      title={portfolio.docs.profile.sheetTitle}
    >
      <script
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Article JSON-LD is built from static metadata, not user input.
        dangerouslySetInnerHTML={{ __html: jsonLdString(articleJsonLd) }}
        type="application/ld+json"
      />
      <MarkdownPage lang={locale} slug="skill-profile" />
    </DocSheetPage>
  );
}
