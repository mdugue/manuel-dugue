import type { Metadata } from "next";

import { Portfolio } from "@/app/components/portfolio/portfolio";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/locale";
import { buildPageMetadata, SITE_NAME } from "@/i18n/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  return buildPageMetadata({
    description: dict.portfolio.hero.lede,
    locale,
    templateTitle: false,
    title: `${SITE_NAME} — Manuel Dugué`,
  });
}

export default async function Home() {
  "use cache";
  const locale = await getLocale();
  const dict = getDictionary(locale);
  return <Portfolio dict={dict.portfolio} lang={locale} />;
}
