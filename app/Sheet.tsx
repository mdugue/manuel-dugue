import { XMarkIcon } from '@heroicons/react/20/solid'
import BackOnEsc from '@/BackOnEsc'
import Link from 'next/link'
import { ReactNode } from 'react'

export default function Sheet(props: { children: ReactNode }) {
	return (
		<div
			className="font-sans p-2 lg:p-8 inset-0 z-20 fixed"
			role="dialog"
			aria-labelledby="dialog-title"
			aria-describedby="dialog-content"
			style={{ transform: 'translateZ(10px)' }}
		>
			<BackOnEsc />
			<main className="shadow-2xl font-sans bg-white p-1 py-10 px-8 lg:py-20 lg:px-14 m-auto overflow-y-auto overflow-x-hidden relative rounded-xs max-h-full md:aspect-2/3">
				{props.children}
			</main>
		</div>
	)
}

export function SheetContent(props: { title?: string; children?: ReactNode }) {
	const { title = 'loading …', children } = props

	return (
		<>
			<nav className="absolute right-0 top-0 flex text-gray-400 m-1 gap-1">
				<Link
					href="."
					title="close"
					className="hover:bg-linear-to-tr hover:from-teal-100 hover:to-teal-50 hover:text-teal-600 rounded-md py-4 px-4 cursor-pointer flex items-center focus:outline-hidden focus:ring-2 focus:ring-teal-600 text-sm"
				>
					<XMarkIcon className="h-5 w-5" />
				</Link>
			</nav>
			<div className="text-gradient bg-linear-to-r from-teal-700 to-teal-400 mb-4">
				{title && (
					<h1
						className="font-inline text-5xl mb-1 hyphens-auto break-words"
						id="dialog-title"
					>
						{title}
					</h1>
				)}
				<address className="font-display not-italic text-sm">
					Manuel Dugué, Görlitzer Str. 23, 01099 Dresden
					<br />
					<a href="tel:0049 151 58791155">+49 151 58791155</a>{' '}
					<a href="mailto:mail@manuel.fyi">mail@manuel.fyi</a>
				</address>
			</div>
			<div id="dialog-content">{children}</div>
		</>
	)
}
