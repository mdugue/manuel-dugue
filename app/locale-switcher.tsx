'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { type Locale, i18n } from '../app/i18n-config'

export default function LocaleSwitcher(props: {
	className?: string
	currentLocale: Locale
}) {
	const { currentLocale } = props
	const pathName = usePathname()
	const redirectedPathName = (locale: string) => {
		if (!pathName) return '/'
		const segments = pathName.split('/')
		segments[1] = locale
		return segments.join('/')
	}

	return (
		<div>
			<ul className={props.className}>
				{i18n.locales.map((locale) => {
					return (
						<li key={locale}>
							<Link
								href={redirectedPathName(locale)}
								className={`${
									currentLocale === locale
										? 'text-teal-500'
										: 'hover:text-gray-400'
								}`}
							>
								{locale}
							</Link>
						</li>
					)
				})}
			</ul>
		</div>
	)
}
