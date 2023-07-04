'use client'
import { Configuration, OpenAIApi } from 'openai-edge'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import kv from '@vercel/kv'
import getGoogleSheetsData from 'util/getGoogleSheetsData'
import xss from 'xss'
import { useCompletion, useChat } from 'ai/react'

// Set the runtime to edge for best performance

export default async function LandingPageQuoteContent() {
	const { messages, input, handleInputChange, handleSubmit } = useChat({
		api: '/api/chat',
		onError: console.error,
	})

	console.log(messages)

	return (
		<div>
			TODO
			<form onSubmit={handleSubmit}>
				<input value={input} onChange={handleInputChange} />
				<button type="submit">Send</button>
			</form>
		</div>
	)
	/* return <div dangerouslySetInnerHTML={{ __html: xss(response || '') }} /> */
}
