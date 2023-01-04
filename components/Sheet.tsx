import { XMarkIcon } from '@heroicons/react/20/solid'
import { Montserrat } from '@next/font/google'
import BackOnEsc from 'components/BackOnEsc'
import Link from 'next/link'
import { ReactNode } from 'react'
import DownloadButton from './DownloadButton'

/* TODO: Move to other pages */
const montserrat = Montserrat({
	subsets: ['latin'],
	variable: '--font-montserrat',
})

export type SheetProps = {
	title?: string
	children: ReactNode
}
export default function Sheet(props: SheetProps) {
	const { title, children } = props

	return (
		<div
			className={`${montserrat.variable} font-sans p-2 lg:p-8 absolute inset-0`}
		>
			<BackOnEsc />
			<main
				className="shadow-2xl font-sans bg-white p-1 lg:py-20 lg:px-14 m-auto overflow-y-auto overflow-x-hidden relative rounded-sm max-h-full"
				style={{ aspectRatio: '2 / 3' }}
			>
				<nav className="absolute right-0 top-0 flex text-gray-400 m-1 gap-1">
					{(title === 'cv' || title === 'skill profile') && (
						<DownloadButton type={title} />
					)}

					<Link
						href="/"
						title="close"
						className="hover:bg-gradient-to-tr hover:from-teal-100 hover:to-teal-50 hover:text-teal-600 rounded-md py-4 px-4 cursor-pointer flex items-center focus:outline-none focus:ring-2 focus:ring-teal-600 text-sm"
					>
						<XMarkIcon className="h-5 w-5" />
					</Link>
				</nav>
				<div className="text-gradient bg-gradient-to-r from-teal-700 to-teal-400 mb-4">
					{title && <h1 className="font-inline text-5xl mb-1">{title}</h1>}
					<address className="font-display not-italic text-sm">
						Manuel Dugué, Görlitzer Str. 23, 01099 Dresden
						<br />
						<a href="tel:0049 151 58791155">+49 151 58791155</a>{' '}
						<a href="mailto:mail@manuel.fyi">mail@manuel.fyi</a>
					</address>
				</div>
				{children}
			</main>
		</div>
	)
}
