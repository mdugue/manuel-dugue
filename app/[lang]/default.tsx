import { Portfolio } from "@/app/components/portfolio/portfolio";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/locale";

export default async function Default() {
  "use cache";
  const locale = await getLocale();
  const dict = getDictionary(locale);
  return <Portfolio dict={dict.portfolio} lang={locale} />;
}
