import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { RiOpenaiFill } from '@remixicon/react';
import { kv } from '@vercel/kv';
import { OpenAIStream } from 'ai';
import type { AllInOnePageQuery } from 'gql/graphql';
import Link from 'next/link';
import OpenAi from 'openai';
import { Suspense } from 'react';
import { pageQuery } from '@/[locale]/page-query';
import GPTTooltip from '@/gpt-tooltip';
import { graphqlClient } from '@/graphql-client';
import type { Locale } from '@/i18n-config';

const openai = new OpenAi({
	apiKey: process.env.OPENAI_API_KEY,
	fetch: (input, init) =>
		fetch(input, {
			...init,
			next: {
				/*1 day: 60 * 60 * 24*/
				revalidate: 86_400,
			},
		}),
});

export default async function Quote(props: { locale: Locale }) {
	const { locale } = props;
	const { allInOnePageCollection } =
		await graphqlClient.request<AllInOnePageQuery>(pageQuery, {
			slug: 'skill-profile',
			locale: 'en',
		});

	const stringifiedDocument = documentToHtmlString(
		allInOnePageCollection?.items[0]?.content?.json
	);

	const message =
		locale === 'en'
			? `You are Manuel, a creative engineer with a strong academic foundation and hands-on product experience. Write in plain text only. Use real line breaks for paragraphs; do not write "\n". No HTML or Markdown.

Task
Start with a brief greeting on its own line without your name (e.g., Hi.). Then write a short first-person summary that subtly references one or two projects from the input.

Input
${stringifiedDocument}

Hard rules
- Total ≤120 words including the greeting. After the greeting, exactly two paragraphs; 1–2 sentences per paragraph.
- Do not start any paragraph other than the greeting with “I am Manuel” or “My name is Manuel,” and do not repeat your name after the greeting.
- Emphasize soft skills, values, and collaboration; minimize technical jargon. Avoid clichés/buzzwords. No emojis, no exclamation marks, no lists.
- Mention clients/organizations only if present in the input. Prefer well-known names when available; otherwise, add a neutral type label before lesser-known names using information in the input (e.g., research institute). Refer to them casually as one of several (e.g., including work with …).
- Reference only facts from the input; if details are missing, stay generic; do not invent names.
- Characters: no special symbols (# @ /  * ~ ^ | < > [ ] { } _ = + % " ’). Use only letters (incl. diacritics), numbers, spaces, commas, and periods.`
			: `Du bist Manuel, ein kreativer Ingenieur mit solidem akademischem Fundament und praktischer Produkterfahrung. Schreibe ausschließlich als Reintext. Verwende echte Zeilenumbrüche; schreibe „\n“ nicht wörtlich. Kein HTML oder Markdown.

Aufgabe
Beginne mit einer kurzen Begrüßung in einer eigenen Zeile ohne Namensnennung (z. B. Hallo.). Danach eine kurze Ich-Zusammenfassung, die ein bis zwei Projekte aus dem Input subtil anspielt.

Input
${stringifiedDocument}

Strikte Regeln
- Insgesamt ≤120 Wörter inklusive Begrüßung. Nach der Begrüßung genau zwei Absätze; pro Absatz 1–2 Sätze.
- Betone Soft Skills, Werte und Zusammenarbeit; technischen Jargon minimal halten. Floskeln/Buzzwords vermeiden. Keine Emojis, keine Ausrufezeichen, keine Listen.
- Kunden/Organisationen nur nennen, wenn sie im Input stehen. Bevorzuge bekannte Namen; andernfalls füge vor weniger bekannten Namen eine neutrale Typbezeichnung aus dem Input hinzu (z. B. Forschungseinrichtung). Erwähne sie beiläufig als einen von mehreren (z. B. unter anderem bei …).
- Nur belegte Fakten aus dem Input; fehlen Details, allgemein bleiben; keine Namen erfinden.
- Zeichen: keine Sonderzeichen (# @ /  * ~ ^ | < > [ ] { } _ = + % " ’). Verwende nur Buchstaben (inkl. Umlaute), Zahlen, Leerzeichen, Kommas und Punkte. Vermeide ae, oe, ue etc. wenn stattdessen ä,ö,ü etc. verwendet werden können.`;

	const cached = await kv.get(`${message}gpt-5-mini${locale}`);
	if (cached && typeof cached === "string") {
		return <Container locale={locale}>{cached}</Container>;
	}

	const response = await openai.chat.completions.create({
		model: 'gpt-5-mini',
		stream: true,
		messages: [
			{
				role: 'system',
				content: message,
			},
		],
	});

	// Convert the response into a friendly text-stream
	// @ts-expect-error TODO: migrate to new OpenAIStream API
	const stream = OpenAIStream(response, {
		async onCompletion(completion) {
			await kv.set(message, completion);
			await kv.expire(message, 60 * 60);
		},
	});

	const reader = stream.getReader();

	// We recursively render the stream as it comes in
	return (
		<Container locale={locale}>
			<Suspense>
				<Reader reader={reader} />
			</Suspense>
		</Container>
	);
}

const extractTextRegex = /"([^"]*)"/;
async function Reader({
	reader,
}: {
	// biome-ignore lint/suspicious/noExplicitAny: TODO: Fix this
	reader: ReadableStreamDefaultReader<any>;
}) {
	const { done, value } = await reader.read();

	if (done) {
		return null;
	}

	const text = new TextDecoder().decode(value);
	const extractedText = text.match(extractTextRegex)?.[1]?.replace(
		/\\n/g,
		`
`
	);

	return (
		<>
			{extractedText}
			<Suspense>
				<Reader reader={reader} />
			</Suspense>
		</>
	);
}

function Container({
	children,
	locale,
}: {
	children: React.ReactNode;
	locale: Locale;
}) {
	return (
		<figure
			className="belowMd:transform-none! mb-8"
			style={{
				transform:
					'perspective(60vmin) rotateX(3deg) rotateY(-4deg) rotateZ(3deg)',
			}}
		>
			<blockquote className="contact prose lg:-ml-12 mx-2 max-w-xl whitespace-break-spaces rounded-lg border border-pink-500 dark:border-amber-700 bg-linear-to-tl from-fuchsia-500 to-pink-400 px-6 py-5 font-medium prose-strong:font-bold prose-headings:text-amber-100 text-amber-50 shadow-xl md:mx-auto md:rounded-3xl md:px-10 md:py-9 dark:from-amber-800 dark:to-yellow-500">
				{children}
			</blockquote>
			<figcaption className="mt-2 mr-1 ml-auto flex items-center justify-end gap-1 text-right text-gray-400 text-sm">
				<span>
					{locale === 'de' ? (
						<>
							– <RiOpenaiFill className="inline size-4" /> GPT 5 zu meinem{' '}
							<GPTTooltip locale={locale}>
								<Link
									className="pb-7 text-indigo-400 hover:text-indigo-600 hover:underline dark:hover:text-amber-900"
									href="/de/skill-profile"
									prefetch={false}
								>
									Skill Profile
								</Link>
							</GPTTooltip>
						</>
					) : (
						<>
							– <RiOpenaiFill className="inline size-4" /> GPT 5 after reading
							my{' '}
							<GPTTooltip locale={locale}>
								<Link
									className="pb-7 text-indigo-400 hover:text-indigo-600 hover:underline dark:hover:text-amber-900"
									href="/en/skill-profile"
									prefetch={false}
								>
									Skill Profile
								</Link>
							</GPTTooltip>
						</>
					)}
				</span>
			</figcaption>
		</figure>
	);
}
