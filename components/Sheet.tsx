import { XMarkIcon } from '@heroicons/react/20/solid'
import BackOnEsc from 'components/BackOnEsc'
import Link from 'next/link'
import { ReactNode } from 'react'
import DownloadButton from './DownloadButton'

export type SheetProps = {
	title?: string
	children: ReactNode
}
export default function Sheet(props: SheetProps) {
	const { title, children } = props

	return (
		<div className="p-2 lg:p-8 absolute inset-0">
			<BackOnEsc />
			<main
				className="shadow-2xl font-sans bg-white p-1 lg:py-20 lg:px-14 m-auto overflow-y-auto overflow-x-hidden relative rounded-sm max-h-full"
				style={{ aspectRatio: '2 / 3' }}
			>
				<nav className="absolute right-0 top-0 flex text-gray-400 m-1 gap-1">
					{(title === 'cv' || title === 'skill profile') && (
						<DownloadButton type={title} />
					)}

					<Link href="/" legacyBehavior>
						<a
							title="close"
							tabIndex={0}
							className="bg-gradient-to-tr hover:from-gray-50 hover:to-yellow-50 hover:text-gray-500 rounded-md py-4 px-4 focus:outline-none focus:ring-2 focus:ring-teal-600"
						>
							<XMarkIcon className="h-5 w-5" />
						</a>
					</Link>
				</nav>
				<div className="text-gradient bg-gradient-to-r from-teal-700 to-green-400 mb-4">
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
