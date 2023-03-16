import openai from 'util/openapi'

export default async function GptClaim(props: { text: string }) {
	const response = await openai.createCompletion({
		model: 'text-davinci-003',
		prompt: `write a short tagline that has a professional style, doesn't use the word "skill profile" and format it as semantic html that emphasizes technical terms: 
		${props.text}`,
		temperature: 0.7,
		max_tokens: 256,
		top_p: 1,
		frequency_penalty: 0,
		presence_penalty: 0,
	})
	return (
		<div
			dangerouslySetInnerHTML={{ __html: response.data.choices[0].text || '' }}
		/>
	)
}
