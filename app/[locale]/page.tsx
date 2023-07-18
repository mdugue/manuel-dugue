import { i18n } from 'i18n-config'

export const runtime = 'edge'
export const revalidate = 60 * 60 * 24 // 1 day

export function generateStaticParams() {
	return i18n.locales.map((locale) => ({ locale }))
}

export default function Page() {
	return <></>
}
