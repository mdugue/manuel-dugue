export const aiModels = [
  {
    id: "openai/gpt-5.6-terra",
    label: "GPT-5.6 Terra",
  },
  {
    id: "anthropic/claude-sonnet-5",
    label: "Claude Sonnet 5",
  },
  {
    id: "google/gemini-3.7-flash",
    label: "Gemini 3.7 Flash",
  },
] as const;

export type AiModelId = (typeof aiModels)[number]["id"];

// The model the server prerenders with. Derived from the first slot rather
// than named, so it cannot drift from where the cycler starts.
export const defaultAiModel: AiModelId = aiModels[0].id;

export function isAiModelId(value: unknown): value is AiModelId {
  return typeof value === "string" && aiModels.some((m) => m.id === value);
}
