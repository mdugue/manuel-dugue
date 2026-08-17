import { notFound } from "next/navigation";
import { lang } from "next/root-params";
import { hasLocale, type Locale } from "./config";
import { type Dictionary, getDictionary } from "./dictionaries";

/**
 * The `[lang]` root parameter, narrowed to a supported locale.
 *
 * `next/root-params` is readable from any Server Component, so nothing below
 * the root layout has to take a `lang` prop. Client Components and Route
 * Handlers cannot read it and still receive the locale explicitly.
 */
export async function getLocale(): Promise<Locale> {
  const value = await lang();
  if (!hasLocale(value)) {
    notFound();
  }
  return value;
}

export async function getLocaleDictionary(): Promise<{
  dict: Dictionary;
  locale: Locale;
}> {
  const locale = await getLocale();
  return { dict: await getDictionary(locale), locale };
}
