/* TODO: Pass meassages via POST  */
import kv from '@vercel/kv'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { Configuration, OpenAIApi } from 'openai-edge'
import getGoogleSheetsData from 'util/getGoogleSheetsData'

export const kvKey = `GPTQuote:${process.env.NODE_ENV}`
/* TODO export const kvKey = `GPTQuote:${process.env.NODE_ENV}:${JSON.stringify(messages)}` */

// Set the runtime to edge for best performance
export const runtime = 'edge'

const config = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(config)

export async function POST() {
	console.log('handling POST')
	// Ask OpenAI for a streaming completion given the prompt
	const skillProfile = await getGoogleSheetsData('skill profile')

	/* TODO const cached = await kv.get(kvKey)
	if (cached) 
		return new Response(cached) */

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

	const response = await openai.createChatCompletion({
		model: 'gpt-4',
		temperature: 0.6,
		max_tokens: 256,
		stream: false,
		messages: [
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
		],
	})

	// Convert the response into a friendly text-stream
	const stream = OpenAIStream(response, {
		/* async onCompletion(completion) {
				kv.set(kvKey, response, { ex: 60 * 5 })
			}, */
	})
	// Respond with the stream
	return new StreamingTextResponse(stream)
}
/* 
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
}*/
