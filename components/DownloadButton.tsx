'use client'
import { ArrowDownTrayIcon, ArrowPathIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'

/**
 * Downloads a responses blob as a file with the given name.
 * Uses a hidden anchor element to trigger the download, as required by most browsers 🤷‍♂️
 */
async function downloadResponse(response: Response, name: string) {
	const blob = await response.blob()
	const blobUrl = URL.createObjectURL(blob)

	const anchor = document.createElement('a')
	anchor.href = blobUrl
	anchor.download = name

	document.body.appendChild(anchor)
	anchor.click()
	document.body.removeChild(anchor)

	URL.revokeObjectURL(blobUrl)
}

export default function DownloadButton(props: {
	type: 'Cv' | 'Skill Profile'
}) {
	const { type } = props
	const [isWaiting, setIsWaiting] = useState(false)

	return (
		<button
			className="hover:bg-gradient-to-tr hover:from-fuchsia-100 hover:to-pink-50 hover:text-fuchsia-600 rounded-md py-4 px-4 cursor-pointer flex items-center focus:outline-none focus:ring-2 focus:ring-teal-600 text-sm"
			onClick={async () => {
				setIsWaiting(true)
				await fetch(`/api/pdf/${encodeURI(type)}`).then((res) =>
					downloadResponse(res, `${type} Dugue.pdf`),
				)
				setIsWaiting(false)
			}}
		>
			{isWaiting ? (
				<ArrowPathIcon className="h-5 w-5 mr-2 motion-safe:animate-spin" />
			) : (
				<ArrowDownTrayIcon className="h-5 w-5 mr-2" />
			)}
			Download PDF
		</button>
	)
}
