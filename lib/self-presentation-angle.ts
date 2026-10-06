import { aiModels } from "@/i18n/ai-models";
import type { AiModelId } from "@/i18n/ai-models";

/** The question a self-portrait answers. Briefs live in i18n/self-presentation-prompt.ts. */
export const selfPresentationAngles = [
  "theme",
  "path",
  "collaboration",
  "stance",
  "curiosity",
] as const;

export type SelfPresentationAngle = (typeof selfPresentationAngles)[number];

export function isSelfPresentationAngle(
  value: unknown
): value is SelfPresentationAngle {
  return (
    typeof value === "string" &&
    (selfPresentationAngles as readonly string[]).includes(value)
  );
}

const DAY_MS = 24 * 60 * 60 * 1000;

/** Days since the epoch, in UTC. Picks the angle and its focus. */
export function selfPresentationDay(now: number = Date.now()): number {
  return Math.floor(now / DAY_MS);
}

/**
 * On any given day each model gets a different angle, and the assignment
 * moves on daily. So "Regenerate" shows different portraits, not one
 * portrait in three wordings.
 */
export function selfPresentationAngle(
  model: AiModelId,
  now: number = Date.now()
): SelfPresentationAngle {
  const day = selfPresentationDay(now);
  const modelIndex = aiModels.findIndex((m) => m.id === model);
  const index = (day + modelIndex) % selfPresentationAngles.length;
  return selfPresentationAngles[index] ?? "theme";
}
