import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { RiOpenaiFill } from '@remixicon/react';
import { kv } from '@vercel/kv';
import { OpenAIStream } from 'ai';
import { pageQuery } from 'app/[locale]/pageQuery';
import { graphqlClient } from 'app/graphQlClient';
import type { AllInOnePageQuery } from 'gql/graphql';
import Link from 'next/link';
import OpenAi from 'openai';
import { Suspense } from 'react';
import type { Locale } from '../app/i18n-config';
import GPTTooltip from './GPTTooltip';

const openai = new OpenAi({
  apiKey: process.env.OPENAI_API_KEY,
  fetch: (input, init) =>
    fetch(input, {
      ...init,
      next: { revalidate: 86_400 /*1 day: 60 * 60 * 24*/ },
    }),
});

export default async function Quote(props: { locale: Locale }) {
  const { locale } = props;
  const { allInOnePageCollection } =
    await graphqlClient.request<AllInOnePageQuery>(pageQuery, {
      slug: 'skill-profile',
      locale: 'en',
    });

  const message =
    locale === 'en'
      ? `You are Manuel, a creative engineer with a strong academic foundation and hands-on experience in product development. Your responses are concise, sometimes witty, and always formatted as plain text using \n for new lines (never use HTML tags).

Write a short, first-person personal summary that subtly references some of my projects, based on the following content:
${documentToHtmlString(allInOnePageCollection?.items[0]?.content?.json)}

- Focus on soft skills and personal qualities; minimize technical jargon.
- Keep the summary under 100 words, split into at least two paragraphs.
- Do not use the term “skill profile.”
- Avoid generic or clichéd phrases (e.g., “I enjoy cooking,” “I love architecture”); instead, use subtle hints or paraphrases. Do not overemphasize food or cooking metaphors.
- Maintain an authentic, relatable, and humble tone—confident but never arrogant or corporate.
`
      : `Du bist Manuel, ein kreativer Ingenieur mit solidem akademischem Fundament und viel Praxiserfahrung in der Produktentwicklung. Deine Antworten sind prägnant, manchmal unterhaltsam, immer als reiner Text mit \n für Zeilenumbrüche (keine HTML-Tags).

Schreibe eine kurze persönliche Zusammenfassung in der Ich-Form, die einige meiner Projekte subtil einbezieht, basierend auf folgendem Inhalt:
${documentToHtmlString(allInOnePageCollection?.items[0]?.content?.json)}

- Betone Soft Skills und persönliche Eigenschaften, vermeide technischen Jargon.
- Halte die Zusammenfassung unter 100 Wörter, auf mindestens zwei Absätze verteilt.
- Verwende nicht den Begriff „Skill Profile“.
- Vermeide generische oder klischeehafte Formulierungen (z. B. „Ich koche gerne“, „Ich liebe Architektur“); setze stattdessen auf subtile Andeutungen oder Paraphrasen. Keine Überbetonung von Kulinarik oder Kochjargon.
- Bleibe authentisch, nachvollziehbar und bescheiden – selbstbewusst, aber nie arrogant oder werblich.
`;

  const cached = undefined; //await kv.get(message)
  if (cached && typeof cached === 'string')
    return <Container locale={locale}>{cached}</Container>;

  const response = await openai.chat.completions.create({
    model: 'gpt-4.1-mini',
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
      console.log('caching: ', completion);
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

async function Reader({
  reader,
}: {
  reader: ReadableStreamDefaultReader<any>;
}) {
  const { done, value } = await reader.read();

  if (done) {
    return null;
  }

  const text = new TextDecoder().decode(value);
  const extractedText = text.match(/"([^"]*)"/)?.[1]?.replace(
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
      <blockquote className="contact prose lg:-ml-12 mx-2 max-w-xl whitespace-break-spaces rounded-lg border border-pink-500 bg-linear-to-tl from-fuchsia-500 to-pink-400 px-6 py-5 font-medium prose-strong:font-bold prose-headings:text-amber-100 text-amber-50 shadow-xl md:mx-auto md:rounded-3xl md:px-10 md:py-9 dark:from-amber-800 dark:to-yellow-500">
        {children}
      </blockquote>
      <figcaption className="mt-2 mr-1 ml-auto flex items-center justify-end gap-1 text-right text-gray-400 text-sm">
        <span>
          {locale === 'de' ? (
            <>
              – <RiOpenaiFill className="inline size-4" /> GPT 4.1 zu meinem{' '}
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
              – <RiOpenaiFill className="inline size-4" /> GPT 4.1 after reading
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
