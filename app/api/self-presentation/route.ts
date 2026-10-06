import { createTextStreamResponse, streamText, toTextStream } from "ai";

import { readMarkdownSource } from "@/app/components/markdown-source";
import { isAiModelId } from "@/i18n/ai-models";
import { hasLocale } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import {
  buildSelfPresentationInstructions,
  buildSelfPresentationPrompt,
} from "@/i18n/self-presentation-prompt";
import { readAiCacheText, writeAiCacheText } from "@/lib/ai-cache";
import { checkRateLimit, rateLimited } from "@/lib/rate-limit";
import {
  isSelfPresentationAngle,
  selfPresentationAngle,
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
  } = payload as {
    angle?: unknown;
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
  // Preview deployments accept an explicit angle, uncached, so every angle
  // can be tried with every model on the same day.
  const pinnedAngle =
    process.env.VERCEL_ENV === "preview" &&
    isSelfPresentationAngle(requestedAngle)
      ? requestedAngle
      : null;
  // Fixed once per request, so a text finished after midnight is still
  // stored under the angle it was written from.
  const angle = pinnedAngle ?? selfPresentationAngle(model);

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

  const result = streamText({
    instructions: buildSelfPresentationInstructions(locale, angle),
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
    prompt: buildSelfPresentationPrompt(locale, angle, {
      cv: cv.body,
      notes: notes.body,
      skills: skills.body,
    }),
    temperature: 0.85,
  });

  return createTextStreamResponse({
    headers: { "x-cache": "MISS" },
    stream: toTextStream({ stream: result.stream }),
  });
}
