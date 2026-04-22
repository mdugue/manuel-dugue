export const locales = ["en", "de", "fr", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function localeParams() {
  return locales.map((lang) => ({ lang }));
}
