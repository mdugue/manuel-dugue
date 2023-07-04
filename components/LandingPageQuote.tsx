import { Configuration, OpenAIApi } from 'openai-edge'
import { OpenAIStream } from 'ai'
import { Suspense } from 'react'
import Link from 'next/link'

// Optional, but recommended: run on the edge runtime.
// See https://vercel.com/docs/concepts/functions/edge-functions
export const runtime = 'edge'

const apiConfig = new Configuration({
	apiKey: process.env.OPENAI_API_KEY!,
})

const openai = new OpenAIApi(apiConfig)

export default async function Quote() {
	// Request the OpenAI API for the response based on the prompt
	const response = await openai.createChatCompletion({
		model: 'gpt-3.5-turbo',
		stream: true,
		messages: [
			{
				role: 'system',
				content: 'Give me code for generating a JSX button',
			},
		],
	})

	// Convert the response into a friendly text-stream
	const stream = OpenAIStream(response)

	const reader = stream.getReader()

	// We recursively render the stream as it comes in
	return (
		<figure
			className="font-sans"
			style={{
				transform:
					'perspective(60vmin) rotateX(3deg) rotateY(-4deg) rotateZ(3deg)',
			}}
		>
			<blockquote className="bg-gradient-to-tl border border-pink-500 from-fuchsia-500 to-pink-400 dark:from-amber-800 dark:to-yellow-500 contact shadow-lg text-amber-50 px-10 py-9 rounded-3xl max-w-xl md:mx-auto prose prose-strong:font-bold mx-4 lg:-ml-12 font-medium prose-headings:text-amber-100">
				<Suspense>
					<Reader reader={reader} />
				</Suspense>
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

async function Reader({
	reader,
}: {
	reader: ReadableStreamDefaultReader<any>
}) {
	const { done, value } = await reader.read()

	if (done) {
		return null
	}

	const text = new TextDecoder().decode(value)

	return (
		<span>
			{text}
			<Suspense>
				<Reader reader={reader} />
			</Suspense>
		</span>
	)
}
