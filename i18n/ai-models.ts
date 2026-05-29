export const aiModels = [
  {
    id: "openai/gpt-5.5",
    label: "GPT-5.5",
  },
  {
    id: "anthropic/claude-sonnet-4.6",
    label: "Claude Sonnet 4.6",
  },
  {
    id: "google/gemini-3.5-flash",
    label: "Gemini 3.5 Flash",
  },
] as const;

export type AiModelId = (typeof aiModels)[number]["id"];

export const defaultAiModel: AiModelId = "anthropic/claude-sonnet-4.6";

export function isAiModelId(value: unknown): value is AiModelId {
  return typeof value === "string" && aiModels.some((m) => m.id === value);
}
