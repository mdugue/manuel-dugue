export const i18n = {
	defaultLocale: "de",
	locales: ["de", "en"],
} as const;

export type Locale = (typeof i18n)["locales"][number];

/**
 * Asserts that a locale is valid.
 * @param locale - The string locale to assert.
 * @throws An error if the locale is invalid.
 */
export function assertLocale(locale: string): asserts locale is Locale {
	if (!i18n.locales.includes(locale as Locale)) {
		throw new Error(`Invalid locale: ${locale}`);
	}
}
