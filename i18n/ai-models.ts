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
  {
    id: "xai/grok-4.5",
    label: "Grok 4.5",
  },
  // Open-weight slot (MIT).
  {
    id: "deepseek/deepseek-v4-pro-0813",
    label: "DeepSeek V4 Pro",
  },
] as const;

export type AiModelId = (typeof aiModels)[number]["id"];

export const defaultAiModel: AiModelId = "anthropic/claude-sonnet-5";

export function isAiModelId(value: unknown): value is AiModelId {
  return typeof value === "string" && aiModels.some((m) => m.id === value);
}
