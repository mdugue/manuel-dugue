import { Portfolio } from "@/app/components/portfolio/portfolio";
import { getLocaleDictionary } from "@/i18n/root-locale";

export default async function Default() {
  "use cache";
  const { dict } = await getLocaleDictionary();
  return <Portfolio dict={dict.portfolio} />;
}
