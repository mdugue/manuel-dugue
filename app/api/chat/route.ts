import { Configuration, OpenAIApi } from 'openai-edge'
import { OpenAIStream, StreamingTextResponse } from 'ai'

import request from 'graphql-request'
import { AllInOnePageQuery } from 'gql/graphql'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(config)

// Set the runtime to edge for best performance
export const runtime = 'edge'

export async function POST(req: Request) {
	const { messages } = await req.json()

	/* const response1 = await fetch(
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
	const { data } = await response1.json()
	console.log(
		documentToHtmlString(data.allInOnePageCollection?.items[0]?.content?.json),
	) */
	console.log('messages', messages)

	// Ask OpenAI for a streaming completion given the prompt
	const response = await openai.createChatCompletion({
		model: 'gpt-3.5-turbo',
		stream: true,
		temperature: 0.6,
		messages: [
			{
				role: 'system',
				content:
					'you are a creative engineer, that is passionate about product development and has a strong technical background. Your answers are short, entertaining and never contain more than 50 words. Your responses are formatted as html `<p>` paragraphs with some `<strong>` tags.',
			},
			{
				role: 'user',
				content: `Write a short summary about yourself in the first person perspective, based on some imaginary skills`,
				/* content: ``Write a short summary about yourself in the first person perspective, based on the following skill profile:`, */
			},
		],
	})
	// Convert the response into a friendly text-stream
	const stream = OpenAIStream(response)
	// Respond with the stream
	return new StreamingTextResponse(stream)
}
