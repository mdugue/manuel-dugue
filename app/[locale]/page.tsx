import { i18n } from 'i18n-config'

export const runtime = 'edge'
export const revalidate = 60 // 1 minute

export function generateStaticParams() {
	return i18n.locales.map((locale) => ({ locale }))
}

export default function Page() {
	return <></>
}
