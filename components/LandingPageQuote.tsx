import Link from 'next/link'

export default function LandingPageQuote() {
	return (
		<figure
			className="font-sans"
			style={{
				transform:
					'perspective(60vmin) rotateX(3deg) rotateY(-4deg) rotateZ(3deg)',
			}}
		>
			<blockquote className="bg-gradient-to-tl border border-pink-500 from-fuchsia-500 to-pink-400 dark:from-amber-800 dark:to-yellow-500 contact shadow-lg text-amber-50 px-10 py-9 rounded-3xl max-w-xl mx-auto prose -ml-12">
				<p>
					Hey there! I'm Manuel, a media computer scientist born in Berlin with
					German and French roots. I'm passionate about sports, music,
					photography, typography, architecture, and cooking. I'm a language
					enthusiast too, fluent in German, French, English, and Spanish, with
					basic knowledge of Portuguese and Dutch.
				</p>

				<p>
					I've got mad programming skills in TypeScript, JavaScript, HTML, and
					more, and I love working with frameworks like React, D3.js, and
					Next.js. I've had an exciting career working on projects like digital
					exhibitions, family trees, and even an online shop for garden culture!
					I've also done some cool stuff with Android tablets for seniors and
					interactive presentation films.
				</p>

				<p>
					I've got a diploma in Media Informatics from TU Dresden and even had a
					research thesis on "materiality and interaction." Oh, and I've won
					some awards too, like the arctic code vault contributor and a couple
					of photo competitions.
				</p>

				<p>
					So, if you need a tech-savvy, creative, and multilingual guy, I'm your
					man!
				</p>
			</blockquote>
			<figcaption className="text-gray-400 ml-auto text-right text-sm mt-2 mr-5">
				– says GPT after reading my{' '}
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
