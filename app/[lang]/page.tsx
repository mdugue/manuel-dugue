import type { Metadata } from "next";
import { Portfolio } from "@/app/components/portfolio/portfolio";
import { getLocaleDictionary } from "@/i18n/root-locale";
import { buildPageMetadata, SITE_NAME } from "@/i18n/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { dict, locale } = await getLocaleDictionary();
  return buildPageMetadata({
    description: dict.portfolio.hero.lede,
    locale,
    templateTitle: false,
    title: `${SITE_NAME} — Manuel Dugué`,
  });
}

export default async function Home() {
  "use cache";
  const { dict } = await getLocaleDictionary();
  return <Portfolio dict={dict.portfolio} />;
}
