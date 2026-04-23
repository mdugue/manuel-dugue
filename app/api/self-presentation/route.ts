import { streamText } from "ai";
import { readMarkdown } from "@/app/components/markdown-source";
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
    readMarkdown("curriculum-vitae", locale),
    readMarkdown("skill-profile", locale),
  ]);

  const result = streamText({
    model,
    system: buildSelfPresentationPrompt(locale),
    prompt:
      `<curriculum-vitae>\n${cv}\n</curriculum-vitae>\n\n` +
      `<skill-profile>\n${skills}\n</skill-profile>`,
    temperature: 0.85,
    onFinish: async ({ text }) => {
      await writeAiCacheText({ namespace, locale, model, text });
    },
  });

  const response = result.toTextStreamResponse();
  response.headers.set("x-cache", "MISS");
  return response;
}
