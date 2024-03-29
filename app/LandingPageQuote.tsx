import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { kv } from '@vercel/kv'
import { OpenAIStream } from 'ai'
import { pageQuery } from 'app/[locale]/pageQuery'
import { graphqlClient } from 'app/graphQlClient'
import { AllInOnePageQuery } from 'gql/graphql'
import { Locale } from '../app/i18n-config'
import Link from 'next/link'
import OpenAi from 'openai'
import { Suspense } from 'react'
import GPTTooltip from './GPTTooltip'
import { SiOpenai } from '@icons-pack/react-simple-icons'

const openai = new OpenAi({
	apiKey: process.env.OPENAI_API_KEY!,
	fetch: (input, init) =>
		fetch(input, {
			...init,
			next: { revalidate: 86400 /*1 day: 60 * 60 * 24*/ },
		}),
})

const langauges = { de: 'german', en: 'english' }

export default async function Quote(props: { locale: Locale }) {
	const { locale } = props
	const { allInOnePageCollection } =
		await graphqlClient.request<AllInOnePageQuery>(pageQuery, {
			slug: 'skill-profile',
			locale: 'en',
		})

	const message = `You are a physically existing creative engineer called Manuel, who is passionate about product development and has a academic technical background with lots of experience in the field. Your answers are short and entertaining. Your responses are formatted as plain text, using \n for new lines. Don't use html tags. Write a short summary about yourself in the first person perspective, based on the following skill profile: 
	${documentToHtmlString(allInOnePageCollection?.items[0]?.content?.json)}
					
	Use a professional style, don't use the word "skill profile". The content should emphasize soft skills and drop some technical terms. Don't use more than 100 words in total and split the text at least into 2 paragraphs.
	Use ${langauges[locale]} language.`

	const cached = await kv.get(message)
	if (cached && typeof cached === 'string')
		return <Container locale={locale}>{cached}</Container>

	const response = await openai.chat.completions.create({
		model: 'gpt-4-1106-preview',
		stream: true,
		messages: [
			{
				role: 'system',
				content: message,
			},
		],
	})

	// Convert the response into a friendly text-stream
	const stream = OpenAIStream(response, {
		async onCompletion(completion) {
			console.log('caching: ', completion)
			await kv.set(message, completion)
			await kv.expire(message, 60 * 60)
		},
	})

	const reader = stream.getReader()

	// We recursively render the stream as it comes in
	return (
		<Container locale={locale}>
			<Suspense>
				<Reader reader={reader} />
			</Suspense>
		</Container>
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

function Container({
	children,
	locale,
}: {
	children: React.ReactNode
	locale: Locale
}) {
	return (
		<figure
			className="belowMd:!transform-none mb-8"
			style={{
				transform:
					'perspective(60vmin) rotateX(3deg) rotateY(-4deg) rotateZ(3deg)',
			}}
		>
			<blockquote className="bg-gradient-to-tl border border-pink-500 from-fuchsia-500 to-pink-400 dark:from-amber-800 dark:to-yellow-500 contact shadow-xl text-amber-50 px-6 md:px-10 py-5 md:py-9 rounded-lg md:rounded-3xl max-w-xl md:mx-auto prose prose-strong:font-bold mx-2 lg:-ml-12 font-medium prose-headings:text-amber-100 whitespace-break-spaces">
				{children}
			</blockquote>
			<figcaption className="text-gray-400 ml-auto text-right text-sm mt-2 mr-1 flex items-center gap-1 justify-end">
				<span>
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
							– <SiOpenai className="inline h-4 w-4" /> GPT after reading my{' '}
							<GPTTooltip>
								<Link
									href="/en/skill-profile"
									prefetch={false}
									className="text-indigo-400 hover:text-indigo-600 hover:underline dark:hover:text-amber-900 pb-7"
								>
									Skill Profile
								</Link>
							</GPTTooltip>
						</>
					)}
				</span>
			</figcaption>
		</figure>
	)
}
