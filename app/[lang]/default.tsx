import { notFound } from "next/navigation";

import { Portfolio } from "@/app/components/portfolio/portfolio";
import { hasLocale } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default async function Default({
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
  const dict = getDictionary(locale);
  return <Portfolio dict={dict.portfolio} lang={locale} />;
}
