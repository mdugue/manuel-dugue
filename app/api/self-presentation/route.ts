import { streamText } from "ai";
import { isAiModelId } from "@/i18n/ai-models";
import { hasLocale, type Locale } from "@/i18n/config";
import { readAiCacheText, writeAiCacheText } from "@/lib/ai-cache";
import { buildSelfPresentationRequest, hashAiRequest } from "@/lib/ai-prompt";
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

  const request = await buildSelfPresentationRequest(locale);
  const promptHash = hashAiRequest(request);

  const cached = await readAiCacheText({
    namespace,
    locale,
    model,
    promptHash,
  });
  if (cached) {
    return new Response(cached.text, {
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "x-cache": "HIT",
      },
    });
  }

  const result = streamText({
    model,
    system: request.system,
    prompt: request.prompt,
    temperature: 0.85,
    onFinish: async ({ text }) => {
      await writeAiCacheText({ namespace, locale, model, promptHash, text });
    },
  });

  const response = result.toTextStreamResponse();
  response.headers.set("x-cache", "MISS");
  return response;
}
