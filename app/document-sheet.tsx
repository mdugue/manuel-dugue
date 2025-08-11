import { XMarkIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import type { ReactNode } from 'react';
import BackOnEsc from '@/back-on-esc';

export default function DocumentSheet(props: { children: ReactNode }) {
	return (
		<div
			aria-describedby="dialog-content"
			aria-labelledby="dialog-title"
			className="fixed inset-0 z-20 p-2 font-sans lg:p-8"
			role="dialog"
			style={{ transform: 'translateZ(10px)' }}
		>
			<BackOnEsc />
			<main className="relative m-auto max-h-full overflow-y-auto overflow-x-hidden rounded-xs bg-white p-1 px-8 py-10 font-sans shadow-2xl md:aspect-2/3 lg:px-14 lg:py-20">
				{props.children}
			</main>
		</div>
	);
}

export function DocumentSheetContent(props: {
	title?: string;
	children?: ReactNode;
}) {
	const { title = 'loading …', children } = props;

	return (
		<>
			<nav className="absolute top-0 right-0 m-1 flex gap-1 text-gray-400">
				<Link
					className="flex cursor-pointer items-center rounded-md px-4 py-4 text-sm hover:bg-linear-to-tr hover:from-teal-100 hover:to-teal-50 hover:text-teal-600 focus:outline-hidden focus:ring-2 focus:ring-teal-600"
					href="."
					title="close"
				>
					<XMarkIcon className="h-5 w-5" />
				</Link>
			</nav>
			<div className="mb-4 bg-linear-to-r from-teal-700 to-teal-400 text-gradient">
				{title && (
					<h1
						className="mb-1 hyphens-auto break-words font-inline text-5xl"
						id="dialog-title"
					>
						{title}
					</h1>
				)}
				<address className="font-display text-sm not-italic">
					Manuel Dugué, Görlitzer Str. 23, 01099 Dresden
					<br />
					<a href="tel:0049 151 58791155">+49 151 58791155</a>{' '}
					<a href="mailto:mail@manuel.fyi">mail@manuel.fyi</a>
				</address>
			</div>
			<div id="dialog-content">{children}</div>
		</>
	);
}
