import type { Locale } from '../i18n-config';
export type LocalePageType<Params extends {} = {}> = {
	params: Promise<{ locale: Locale }> & Params;
};
