import { Locale } from '../i18n-config'
export type LocalePageType<Params extends {} = {}> = {
	params: { locale: Locale } & Params
}
