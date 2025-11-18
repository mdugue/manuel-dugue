import type { Locale } from "../i18n-config";

export type LocalePageType<Params = object> = {
	params: Promise<{ locale: Locale }> & Params;
};
