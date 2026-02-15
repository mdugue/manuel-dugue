"use cache";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { RiOpenaiFill } from "@remixicon/react";
import { kv } from "@vercel/kv";
import type { AllInOnePageQuery } from "gql/graphql";
import { cacheLife } from "next/cache";
import Link from "next/link";
import OpenAi from "openai";
import { Suspense } from "react";
import { pageQuery } from "@/[locale]/page-query";
import GPTTooltip from "@/gpt-tooltip";
import { graphqlClient } from "@/graphql-client";
import type { Locale } from "@/i18n-config";

const openai = new OpenAi({
	apiKey: process.env.OPENAI_API_KEY,
});

export default async function Quote(props: { locale: Locale }) {
	cacheLife("days");
	const { locale } = props;
	const { allInOnePageCollection } =
		await graphqlClient.request<AllInOnePageQuery>(pageQuery, {
			slug: "skill-profile",
			locale: "en",
		});

	const stringifiedDocument = documentToHtmlString(
		allInOnePageCollection?.items[0]?.content?.json
	);

	const message =
		locale === "en"
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

	const cacheKey = `${message}gpt-5-mini${locale}`;
	const cached = await kv.get(cacheKey);
	if (cached && typeof cached === "string") {
		return <Container locale={locale}>{cached}</Container>;
	}

	const response = await openai.chat.completions.create({
		model: "gpt-5-mini",
		stream: true,
		messages: [
			{
				role: "system",
				content: message,
			},
		],
	});

	// Convert OpenAI stream to ReadableStream and handle completion callback
	let fullCompletion = "";
	const stream = new ReadableStream({
		async start(controller) {
			try {
				for await (const chunk of response) {
					const content = chunk.choices[0]?.delta?.content;
					if (content) {
						fullCompletion += content;
						const encoder = new TextEncoder();
						controller.enqueue(encoder.encode(content));
					}
				}
				// Cache the full completion when stream ends
				await kv.set(cacheKey, fullCompletion);
				await kv.expire(cacheKey, 60 * 60);
				controller.close();
			} catch (error) {
				controller.error(error);
			}
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

	return (
		<>
			{text}
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
		<figure className="h-full">
			<blockquote className="whitespace-break-spaces rounded-2xl border border-pink-500 bg-linear-to-tl from-fuchsia-500 to-pink-400 px-6 py-5 font-medium text-amber-50 shadow-xl md:rounded-3xl md:px-10 md:py-8 dark:border-amber-700 dark:from-amber-800 dark:to-yellow-500">
				{children}
			</blockquote>
			<figcaption className="mt-2 mr-1 ml-auto flex items-center justify-end gap-1 text-right text-sm text-white/70">
				<span>
					– <RiOpenaiFill className="inline size-4" />{" "}
					{locale === "de" ? "GPT 5 zu meinem " : "GPT 5 after reading my "}
					<GPTTooltip locale={locale}>
						<Link
							className="underline decoration-white/40 hover:decoration-white"
							href={`/${locale}/skill-profile`}
							prefetch={false}
						>
							Skill Profile
						</Link>
					</GPTTooltip>
				</span>
			</figcaption>
		</figure>
	);
}
