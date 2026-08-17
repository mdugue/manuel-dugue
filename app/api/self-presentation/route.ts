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

  const cached = await readAiCacheText({ locale, model, namespace });
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
    instructions: buildSelfPresentationPrompt(locale),
    model,
    onEnd: async ({ text }) => {
      await writeAiCacheText({ locale, model, namespace, text });
    },
    prompt:
      `<curriculum-vitae>\n${cv.body}\n</curriculum-vitae>\n\n` +
      `<skill-profile>\n${skills.body}\n</skill-profile>`,
    // Left unset, every model spends its own default reasoning budget before
    // emitting a token — silently, since reasoning parts never reach the
    // client. That was the whole of the cold-reroll wait.
    //
    // "low" rather than something more aggressive: a preview sweep of every
    // level against every model found that lower levels fail *silently* and
    // unpredictably — "none" returns an empty 200 on Gemini and both Groks,
    // and "minimal" does the same on GPT-5.6 Terra, the one model where
    // "none" is fine. "low" is the only level all six honour. Re-run that
    // sweep before adding a model or lowering this.
    reasoning: "low",
    temperature: 0.85,
  });

  const response = result.toTextStreamResponse();
  response.headers.set("x-cache", "MISS");
  return response;
}
