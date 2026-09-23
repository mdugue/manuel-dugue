export const locales = ["de", "en", "fr", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, string> = {
  de: "DE",
  en: "EN",
  es: "ES",
  fr: "FR",
};

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** The locale a path starts with (`/de/…` → `de`), if it starts with one. */
export function localeOfPath(path: string): Locale | null {
  const [, first] = path.split("/", 2);
  return first !== undefined && hasLocale(first) ? first : null;
}

export function localeParams() {
  return locales.map((lang) => ({ lang }));
}
