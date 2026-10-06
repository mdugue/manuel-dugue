import {
  createTextStreamResponse,
  generateText,
  streamText,
  toTextStream,
} from "ai";
import type { ModelMessage } from "ai";

import { readMarkdownSource } from "@/app/components/markdown-source";
import {
  aiModelReasoning,
  aiModelsThatReviseDraft,
  isAiModelId,
} from "@/i18n/ai-models";
import { hasLocale } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import {
  buildSelfPresentationInstructions,
  buildSelfPresentationPrompt,
  buildSelfPresentationReview,
} from "@/i18n/self-presentation-prompt";
import { readAiCacheText, writeAiCacheText } from "@/lib/ai-cache";
import { checkRateLimit, rateLimited } from "@/lib/rate-limit";
import {
  isSelfPresentationAngle,
  selfPresentationAngle,
  selfPresentationDay,
} from "@/lib/self-presentation-angle";

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

  const {
    lang,
    model,
    angle: requestedAngle,
    focus: requestedFocus,
  } = payload as {
    angle?: unknown;
    focus?: unknown;
    lang?: unknown;
    model?: unknown;
  };

  if (typeof lang !== "string" || !hasLocale(lang)) {
    return new Response("bad lang", { status: 400 });
  }
  if (!isAiModelId(model)) {
    return new Response("unknown model", { status: 400 });
  }

  const locale: Locale = lang;
  const namespace = "self-presentation" as const;
  // Preview deployments accept an explicit angle and focus, uncached, so
  // every combination can be tried with every model on the same day.
  const isPreview = process.env.VERCEL_ENV === "preview";
  const pinnedAngle =
    isPreview && isSelfPresentationAngle(requestedAngle)
      ? requestedAngle
      : null;
  const pinnedFocus =
    isPreview && Number.isInteger(requestedFocus)
      ? (requestedFocus as number)
      : null;
  // Fixed once per request, so a text finished after midnight is still
  // stored under the angle it was written from.
  const now = Date.now();
  const angle = pinnedAngle ?? selfPresentationAngle(model, now);
  const focus = pinnedFocus ?? selfPresentationDay(now);

  const cached = pinnedAngle
    ? null
    : await readAiCacheText({ locale, model, namespace, variant: angle });
  if (cached) {
    return new Response(cached.text, {
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "x-cache": "HIT",
      },
    });
  }

  const [cv, skills, notes] = await Promise.all([
    readMarkdownSource("curriculum-vitae", locale),
    readMarkdownSource("skill-profile", locale),
    readMarkdownSource("notes", locale),
  ]);

  const instructions = buildSelfPresentationInstructions(locale, angle, focus);
  const reasoning = aiModelReasoning[model];
  const temperature = 0.85;
  const messages: ModelMessage[] = [
    {
      content: buildSelfPresentationPrompt(locale, angle, {
        cv: cv.body,
        notes: notes.body,
        skills: skills.body,
      }),
      role: "user",
    },
  ];
  if (aiModelsThatReviseDraft.has(model)) {
    const draft = await generateText({
      instructions,
      messages,
      model,
      reasoning,
      temperature,
    });
    // An empty draft has nothing to review; the streamed call then simply
    // writes the text in one pass.
    if (draft.text.trim()) {
      messages.push(
        { content: draft.text, role: "assistant" },
        { content: buildSelfPresentationReview(locale), role: "user" }
      );
    }
  }

  const result = streamText({
    instructions,
    messages,
    model,
    onEnd: async ({ text }) => {
      if (pinnedAngle) {
        return;
      }
      await writeAiCacheText({
        locale,
        model,
        namespace,
        text,
        variant: angle,
      });
    },
    reasoning,
    temperature,
  });

  return createTextStreamResponse({
    headers: { "x-cache": "MISS" },
    stream: toTextStream({ stream: result.stream }),
  });
}
