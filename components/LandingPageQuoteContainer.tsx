import Link from 'next/link'
import LandingPageQuoteContent from './LandingPageQuoteStreamingContent'

// Set the runtime to edge for best performance
export const runtime = 'edge'

export default async function LandingPageQuoteContainer() {
	return (
		<figure
			className="font-sans"
			style={{
				transform:
					'perspective(60vmin) rotateX(3deg) rotateY(-4deg) rotateZ(3deg)',
			}}
		>
			<blockquote className="bg-gradient-to-tl border border-pink-500 from-fuchsia-500 to-pink-400 dark:from-amber-800 dark:to-yellow-500 contact shadow-lg text-amber-50 px-10 py-9 rounded-3xl max-w-xl md:mx-auto prose prose-strong:font-bold mx-4 lg:-ml-12 font-medium prose-headings:text-amber-100">
				<LandingPageQuoteContent />
			</blockquote>
			<figcaption className="text-gray-400 ml-auto text-right text-sm mt-2 mr-5">
				– GPT after reading my{' '}
				<Link
					href="/skill-profile"
					prefetch={false}
					className="text-indigo-400 hover:text-indigo-600 hover:underline dark:hover:text-amber-900 pb-7"
				>
					Skill Profile
				</Link>
			</figcaption>
		</figure>
	)
}
