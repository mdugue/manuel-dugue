export const selfPresentationModels = [
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

export type SelfPresentationModelId =
  (typeof selfPresentationModels)[number]['id']

export const defaultSelfPresentationModel: SelfPresentationModelId =
  'anthropic/claude-sonnet-4.6'

export function isSelfPresentationModelId(
  value: unknown,
): value is SelfPresentationModelId {
  return (
    typeof value === 'string' &&
    selfPresentationModels.some((m) => m.id === value)
  )
}
