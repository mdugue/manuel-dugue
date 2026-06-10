import { streamText } from "ai";
import { readMarkdownSource } from "@/app/components/markdown-source";
import { isAiModelId } from "@/i18n/ai-models";
import { hasLocale, type Locale } from "@/i18n/config";
import { buildSelfPresentationPrompt } from "@/i18n/self-presentation-prompt";
import { readAiCacheText, writeAiCacheText } from "@/lib/ai-cache";
import { checkRateLimit, rateLimited } from "@/lib/rate-limit";

export const maxDuration = 60;

export async function POST(req: Request) {
  const rate = await checkRateLimit("self-presentation", req);
  if (!rate.ok) {
    return rateLimited(rate.retryAfter);
  }

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return new Response("bad json", { status: 400 });
  }

  const { lang, model } = payload as { lang?: unknown; model?: unknown };

  if (typeof lang !== "string" || !hasLocale(lang)) {
    return new Response("bad lang", { status: 400 });
  }
  if (!isAiModelId(model)) {
    return new Response("unknown model", { status: 400 });
  }

  const locale: Locale = lang;
  const namespace = "self-presentation" as const;

  const cached = await readAiCacheText({ namespace, locale, model });
  if (cached) {
    return new Response(cached.text, {
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "x-cache": "HIT",
      },
    });
  }

  const [cv, skills] = await Promise.all([
    readMarkdownSource("curriculum-vitae", locale),
    readMarkdownSource("skill-profile", locale),
  ]);

  const result = streamText({
    model,
    system: buildSelfPresentationPrompt(locale),
    prompt:
      "<documents>\n" +
      `<document index="1">\n<source>curriculum-vitae</source>\n<document_content>\n${cv.body}\n</document_content>\n</document>\n` +
      `<document index="2">\n<source>skill-profile</source>\n<document_content>\n${skills.body}\n</document_content>\n</document>\n` +
      "</documents>\n\n" +
      "Now write Manuel's two-paragraph self-introduction, grounded only in the documents above.",
    temperature: 0.85,
    onFinish: async ({ text }) => {
      await writeAiCacheText({ namespace, locale, model, text });
    },
  });

  const response = result.toTextStreamResponse();
  response.headers.set("x-cache", "MISS");
  return response;
}
