import { i18n } from './i18n-config'
import { MetadataRoute } from 'next'

export const runtime = 'edge'
export const revalidate = 86.4 // 60 * 60 * 24 1 day

export default function sitemap(): MetadataRoute.Sitemap {
	return i18n.locales.flatMap((locale) => [
		{
			url: `https://manuel.fyi/${locale}`,
			lastModified: new Date(),
		},
		{
			url: `https://manuel.fyi/${locale}/skill-profile`,
			lastModified: new Date(),
		},
		{
			url: `https://manuel.fyi/${locale}/cv`,
			lastModified: new Date(),
		},
		{
			url: `https://manuel.fyi/${locale}/legal`,
			lastModified: new Date(),
		},
		{
			url: `https://manuel.fyi/${locale}/privacy`,
			lastModified: new Date(),
		},
	])
}
