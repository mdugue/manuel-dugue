import 'server-only'
import openai from 'util/openapi'

export default async function GptTldr(props: { text: string }) {
	const response = await openai.createCompletion({
		model: 'text-davinci-003',
		prompt: `${props.text} tl;dr`,
		temperature: 0.7,
		max_tokens: 372,
		top_p: 1,
		frequency_penalty: 0,
		presence_penalty: 1,
	})
	console.log(response)
	return <>{response.data.choices[0].text}</>
}
