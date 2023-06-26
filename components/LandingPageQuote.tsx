/* eslint-disable react/no-unescaped-entities */
import kv from '@vercel/kv'
import Link from 'next/link'
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai'
import getGoogleSheetsData from 'util/getGoogleSheetsData'
import xss from 'xss'

// Set the runtime to edge for best performance
export const runtime = 'edge'

const config = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(config)

export default async function LandingPageQuote() {
	// Ask OpenAI for a streaming completion given the prompt
	const skillProfile = await getGoogleSheetsData('skill profile')

	const formattedSkillProfile = `
Title: Skill Profile from Manuel Dugué
Subtitle: handcrafting web experiences for everybody

${skillProfile?.document.sections
	.map(
		(section, index) => `Section ${index + 1}: ${section.sectionTitle}

${section.entries
	.map(
		(entry, entryIndex) => `Subsection ${entryIndex + 1}: ${entry.title} ${
			entry.subtitle ? ` (${entry.subtitle})` : ''
		}
${entry.description}
`,
	)
	.join(`\n`)}`,
	)
	.join(`\n\n`)}`

	const response = await cachedChatCompletion([
		{
			role: 'system',
			content:
				'you are a creative engineer, that is passionate about product development and has a strong technical background. Your answers are short, entertaining and never contain more than 50 words. Your responses are formatted as html `<p>` paragraphs with some `<strong>` tags.',
		},
		{
			role: 'user',
			content: `Write a short summary about yourself in the first person perspective, based on the following skill profile: 


${formattedSkillProfile}
				

Please use a professional style, don't use the word "skill profile". The content should emphasize soft skills as well as technical terms.
				`,
		},
	])

	return (
		<figure
			className="font-sans"
			style={{
				transform:
					'perspective(60vmin) rotateX(3deg) rotateY(-4deg) rotateZ(3deg)',
			}}
		>
			<blockquote
				className="bg-gradient-to-tl border border-pink-500 from-fuchsia-500 to-pink-400 dark:from-amber-800 dark:to-yellow-500 contact shadow-lg text-amber-50 px-10 py-9 rounded-3xl max-w-xl md:mx-auto prose prose-strong:font-bold mx-4 lg:-ml-12 font-medium prose-headings:text-amber-100"
				dangerouslySetInnerHTML={{ __html: xss(response || '') }}
			></blockquote>
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

async function cachedChatCompletion(messages: ChatCompletionRequestMessage[]) {
	const kvKey = `GPTQuote:${process.env.NODE_ENV}:${JSON.stringify(messages)}`
	const cachedCompletion = await kv.get<string>(kvKey)

	if (cachedCompletion) {
		console.log('GPT cache hit')
		return cachedCompletion
	}
	console.log('GPT cache miss')

	const response = await openai
		.createChatCompletion({
			model: 'gpt-4',
			temperature: 0.6,
			max_tokens: 256,
			stream: false,
			messages,
		})
		.then((response) => {
			return response.data.choices[response.data.choices.length - 1].message
				?.content
		})

	kv.set(kvKey, response, { ex: 60 * 5 })
	return response
}
