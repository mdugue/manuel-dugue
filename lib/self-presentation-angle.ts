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

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * On any given day each model gets a different angle, and the assignment
 * moves on daily. So "Regenerate" shows different portraits, not one
 * portrait in three wordings.
 */
export function selfPresentationAngle(
  model: AiModelId,
  now: number = Date.now()
): SelfPresentationAngle {
  const day = Math.floor(now / DAY_MS);
  const modelIndex = aiModels.findIndex((m) => m.id === model);
  const index = (day + modelIndex) % selfPresentationAngles.length;
  return selfPresentationAngles[index] ?? "theme";
}
