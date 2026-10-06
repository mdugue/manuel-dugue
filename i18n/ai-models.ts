export const aiModels = [
  {
    id: "openai/gpt-6.1-sol",
    label: "GPT-6.1 Sol",
  },
  {
    id: "anthropic/claude-sonnet-5.5",
    label: "Claude Sonnet 5.5",
  },
  {
    id: "google/gemini-3.8-flash",
    label: "Gemini 3.8 Flash",
  },
] as const;

export type AiModelId = (typeof aiModels)[number]["id"];

export const defaultAiModel: AiModelId = "anthropic/claude-sonnet-5.5";

// Gemini thinks at length by default and can run past the function's time
// limit before it writes a word. Medium still did; low answers in seconds.
export const aiModelReasoning: Partial<Record<AiModelId, "low">> = {
  "google/gemini-3.8-flash": "low",
};

// Models that write a draft and then check it against the prompt's rules in
// a second pass before the text is streamed. Gemini's short thinking skips
// that check and otherwise adds reasons, general claims and punchlines.
export const aiModelsThatReviseDraft: ReadonlySet<AiModelId> = new Set([
  "google/gemini-3.8-flash",
]);

export function isAiModelId(value: unknown): value is AiModelId {
  return typeof value === "string" && aiModels.some((m) => m.id === value);
}
