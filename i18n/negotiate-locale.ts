import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

import { defaultLocale, hasLocale, locales } from "./config";
import type { Locale } from "./config";

function isLanguageTag(tag: string): boolean {
  try {
    Intl.getCanonicalLocales(tag);
    return true;
  } catch {
    return false;
  }
}

/**
 * The supported locale that best fits an `Accept-Language` header. Tags that
 * `Intl` rejects — `*`, malformed ones — are dropped first, because a single one
 * makes the matcher throw for the whole list.
 */
export function negotiateLocale(acceptLanguage: string | null): Locale {
  const requested = new Negotiator({
    headers: { "accept-language": acceptLanguage ?? "" },
  })
    .languages()
    .filter(isLanguageTag);
  const matched = match(requested, locales, defaultLocale);
  return hasLocale(matched) ? matched : defaultLocale;
}
