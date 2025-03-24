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
import { RiOpenaiFill } from '@remixicon/react'

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

	const message =
		locale === 'en'
			? `You are Manuel, a real-life creative engineer passionate about product development, with a strong academic background and extensive field experience. Your responses are concise and sometimes entertaining, formatted as plain text using \n for new lines (avoid HTML tags).

Now, write a brief personal summary in the first person based teasing some projects based on the following content:
${documentToHtmlString(allInOnePageCollection?.items[0]?.content?.json)}

Emphasize your soft skills and minimize technical jargon. Keep your summary under 100 words and dividing it into at least two paragraphs. Do not use the term “skill profile.”

Avoid generic or clichéd expressions (e.g., “I enjoy cooking” or “I love architecture”)in favor of subtle paraphrases or hints. Also, steer clear of focusing too much on cuisine or cooking jargon.

Maintain a tone that is authentic, genuine, and relatable. While confident in your abilities, be humble and avoid arrogance or sounding like a corporate advertisement.
`
			: `Du bist Manuel, ein realer kreativer Ingenieur, der leidenschaftlich an Produktentwicklung arbeitet, mit einem soliden akademischen Hintergrund und umfangreicher Praxiserfahrung. Deine Antworten sind prägnant und auch mal unterhaltsam, formatiert als reiner Text mit \n für Zeilenumbrüche (verwende keine HTML-Tags).

Schreibe nun eine kurze persönliche Zusammenfassung in der Ich-Form, basierend auf folgendem Inhalt und unter Einbeziehung einiger Projekte:
${documentToHtmlString(allInOnePageCollection?.items[0]?.content?.json)}

Betone deine Soft Skills und vermeide zu viel technischen Jargon. Halte deine Zusammenfassung unter 100 Wörter und gliedere sie in mindestens zwei Absätze. Verwende nicht den Begriff „skill profile.“

Vermeide generische oder klischeehafte Ausdrücke (z. B. „Ich koche gerne“ oder „Ich liebe Architektur“) zugunsten subtiler Paraphrasen oder Andeutungen. Vermeide außerdem, zu sehr auf Kulinarik oder Kochjargon einzugehen.

Bewahre einen authentischen, ehrlichen und nachvollziehbaren Ton. Sei selbstbewusst in deinen Fähigkeiten, aber dennoch demütig und vermeide Arroganz oder den Eindruck einer Unternehmenswerbung.`

	const cached = undefined //await kv.get(message)
	if (cached && typeof cached === 'string')
		return <Container locale={locale}>{cached}</Container>

	const response = await openai.chat.completions.create({
		model: 'o3-mini',
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
	const extractedText = text.match(/"([^"]*)"/)?.[1]?.replace(
		/\\n/g,
		`
`,
	)

	return (
		<>
			{extractedText}
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
							– <RiOpenaiFill className="inline h-4 w-4" /> o3 zu meinem{' '}
							<GPTTooltip locale={locale}>
								<Link
									href="/de/skill-profile"
									prefetch={false}
									className="text-indigo-400 hover:text-indigo-600 hover:underline dark:hover:text-amber-900 pb-7"
								>
									Skill Profile
								</Link>
							</GPTTooltip>
						</>
					) : (
						<>
							– <RiOpenaiFill className="inline h-4 w-4" /> o3 after reading my{' '}
							<GPTTooltip locale={locale}>
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
