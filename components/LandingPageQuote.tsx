import { Configuration, OpenAIApi } from 'openai-edge'
import { OpenAIStream } from 'ai'
import { Suspense } from 'react'
import Link from 'next/link'
import { pageQuery } from 'app/[locale]/pageQuery'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { Locale } from 'i18n-config'

// Optional, but recommended: run on the edge runtime.
// See https://vercel.com/docs/concepts/functions/edge-functions
export const runtime = 'edge'

const apiConfig = new Configuration({
	apiKey: process.env.OPENAI_API_KEY!,
})

const openai = new OpenAIApi(apiConfig)

const langauges = { de: 'german', en: 'english' }

export default async function Quote(props: { locale: Locale }) {
	const { locale } = props
	const cmsResponse = await fetch(
		`https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
			},
			body: JSON.stringify({
				query: pageQuery,
				variables: { slug: 'skill-profile', locale: 'en' },
			}),
		},
	)
	const { data } = await cmsResponse.json()

	// Request the OpenAI API for the response based on the prompt
	const response = await openai.createChatCompletion({
		model:
			/* process.env.NODE_ENV === 'development' ? 'gpt-3.5-turbo' :  */ 'gpt-4',
		stream: true,
		messages: [
			{
				role: 'system',
				content: `You are a physically existing creative engineer called Manuel, who is passionate about product development and has a academic technical background with lots of experience in the field. Your answers are short and entertaining. Your responses are formatted as plain text, using \n for new lines. Don't use html tags. Write a short summary about yourself in the first person perspective, based on the following skill profile: 
${documentToHtmlString(data.allInOnePageCollection?.items[0]?.content?.json)}
				
Use a professional style, don't use the word "skill profile". The content should emphasize soft skills and drop some technical terms. Don't use more than 100 words in total and split the text at least into 2 paragraphs.
Use ${langauges[locale]} language
				`,
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
			<blockquote className="bg-gradient-to-tl border border-pink-500 from-fuchsia-500 to-pink-400 dark:from-amber-800 dark:to-yellow-500 contact shadow-lg text-amber-50 px-10 py-9 rounded-3xl max-w-xl md:mx-auto prose prose-strong:font-bold mx-4 lg:-ml-12 font-medium prose-headings:text-amber-100 whitespace-break-spaces">
				<Suspense>
					<Reader reader={reader} />
				</Suspense>
			</blockquote>
			<figcaption className="text-gray-400 ml-auto text-right text-sm mt-2 mr-5">
				{locale === 'de' ? (
					<>
						– GPT zu meinem{' '}
						<Link
							href="/de/skill-profile"
							prefetch={false}
							className="text-indigo-400 hover:text-indigo-600 hover:underline dark:hover:text-amber-900 pb-7"
						>
							Skill Profile
						</Link>
					</>
				) : (
					<>
						– GPT after reading my{' '}
						<Link
							href="/en/skill-profile"
							prefetch={false}
							className="text-indigo-400 hover:text-indigo-600 hover:underline dark:hover:text-amber-900 pb-7"
						>
							Skill Profile
						</Link>
					</>
				)}
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
		<>
			{text}
			<Suspense>
				<Reader reader={reader} />
			</Suspense>
		</>
	)
}
