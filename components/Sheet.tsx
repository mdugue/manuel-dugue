import { ErrorBoundary } from 'react-error-boundary'
import { ArrowDownTrayIcon, XCircleIcon } from '@heroicons/react/20/solid'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Router from 'next/router'
import { HTMLProps, ReactNode, Suspense } from 'react'
import { useKeyPressEvent } from 'react-use'
import { StructuredSheetProps } from './StructuredSheet'
import PDFDocument from './PDFDocument'

const PDFDownloadLink = dynamic(
	() => import('@react-pdf/renderer').then((e) => e.PDFDownloadLink),
	{ ssr: false },
)

export type SheetProps = {
	title: string
	children: ReactNode
	content?: StructuredSheetProps
}

function ErrorFallback({ error, resetErrorBoundary }) {
	return (
		<div role="alert">
			<p>Something went wrong:</p>
			<pre>{JSON.stringify(error)}</pre>
			<button onClick={resetErrorBoundary}>Try again</button>
		</div>
	)
}

function PrintButton(
	props: { content: StructuredSheetProps } & Omit<
		HTMLProps<HTMLButtonElement>,
		'content'
	>,
) {
	console.log('PrintButton props', props)
	const { title, ...rest } = props.content

	return (
		<>
			<PDFDownloadLink
				className={`bg-gradient-to-tr hover:from-teal-50 hover:to-yellow-50 hover:text-teal-600 rounded-md py-4 px-4 cursor-pointer flex items-center focus:outline-none focus:ring-2 focus:ring-teal-600`}
				document={<PDFDocument {...props.content} />}
				fileName={`${title} dugue.pdf`}
			>
				<ArrowDownTrayIcon className="h-5 w-5 mr-2" /> pdf
			</PDFDownloadLink>
		</>
	)
}

export default function Sheet(props: SheetProps) {
	const { title, children } = props
	console.log('props', props)
	useKeyPressEvent('Escape', () => {
		Router.push('/')
	})
	return (
		<div className="p-2 lg:p-8 print:p-0 absolute inset-0">
			<main
				className="shadow-2xl print:shadow-none print:text-xs font-body bg-white p-1 lg:py-20 lg:px-14 m-auto overflow-y-auto overflow-x-hidden print:overflow-visible relative rounded-sm max-h-full"
				style={{ aspectRatio: '2 / 3' }}
			>
				<nav className="absolute right-0 top-0 flex print:hidden text-gray-400 m-1">
					<ErrorBoundary
						FallbackComponent={ErrorFallback}
						onReset={() => {
							// reset the state of your app so the error doesn't happen again
						}}
					>
						{props.content && <PrintButton content={props.content} />}
					</ErrorBoundary>

					<Link href="/" legacyBehavior>
						<a
							title="close"
							tabIndex={0}
							className="bg-gradient-to-tr hover:from-gray-50 hover:to-yellow-50 hover:text-gray-500 rounded-md py-4 px-4 focus:outline-none focus:ring-2 focus:ring-teal-600"
						>
							<XCircleIcon className="h-4 w-4" />
						</a>
					</Link>
				</nav>
				<div
					className="text-gradient bg-gradient-to-r from-teal-700 to-green-400 mb-4"
					style={{
						WebkitPrintColorAdjust: 'exact',
						WebkitTextFillColor: 'transparent',
					}}
				>
					<h1 className="font-inline text-5xl mb-1">{title}</h1>
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
