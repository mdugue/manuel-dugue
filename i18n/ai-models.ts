export const aiModels = [
  {
    id: 'anthropic/claude-sonnet-4.6',
    label: 'Claude Sonnet 4.6',
  },
  {
    id: 'openai/gpt-5.4',
    label: 'GPT-5.4',
  },
  {
    id: 'google/gemini-3.1-pro-preview',
    label: 'Gemini 3.1 Pro',
  },
] as const

export type AiModelId = (typeof aiModels)[number]['id']

export const defaultAiModel: AiModelId = 'anthropic/claude-sonnet-4.6'

export function isAiModelId(value: unknown): value is AiModelId {
  return (
    typeof value === 'string' && aiModels.some((m) => m.id === value)
  )
}
