export const i18n = {
        defaultLocale: 'de',
        locales: ['de', 'en'],
} as const;

export type Locale = (typeof i18n)['locales'][number];

export const isLocale = (locale: string): locale is Locale =>
        (i18n.locales as readonly string[]).includes(locale);

export const ensureLocale = (locale: string): Locale =>
        isLocale(locale) ? locale : i18n.defaultLocale;
