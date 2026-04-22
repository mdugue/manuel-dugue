'use client'

import { useCompletion } from '@ai-sdk/react'
import { useCallback } from 'react'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import type { AiModelId } from '@/i18n/ai-models'
import { SectionHead } from './section-head'
import { AiControls } from './ai-controls'
import { useModelCycler } from './use-model-cycler'

export function SelfPresentationClient({
  lang,
  self,
  initialText,
}: {
  lang: Locale
  self: Dictionary['portfolio']['self']
  initialText: string
}) {
  const { completion, complete, isLoading, error } = useCompletion({
    api: '/api/self-presentation',
    streamProtocol: 'text',
    initialCompletion: initialText,
  })

  const onModelChange = useCallback(
    (model: AiModelId) => {
      complete('', { body: { lang, model } })
    },
    [complete, lang],
  )

  const { currentModel, position, regenerate } = useModelCycler(onModelChange)

  return (
    <section id="self" className="py-[clamp(60px,9vw,130px)]">
      <SectionHead label={self.label} heading={self.heading} sub={self.sub} />

      <div className="relative bg-paper border border-rule p-[clamp(28px,3.5vw,44px)] max-w-195 before:content-[''] before:absolute before:-inset-px before:left-auto before:bottom-auto before:w-3.5 before:h-3.5 before:bg-accent">
        <div className="absolute -top-2.25 left-6 bg-bg px-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint inline-flex items-center gap-2">
          <span
            aria-hidden="true"
            className="w-1.5 h-1.5 rounded-full bg-accent animate-blink"
          />
          {self.tag}
        </div>

        <p
          aria-live="polite"
          aria-busy={isLoading}
          className="font-display text-[clamp(19px,1.75vw,24px)] leading-[1.55] text-ink m-0 min-h-[7em] whitespace-pre-line"
        >
          {completion ?? initialText}
          {isLoading && (
            <span
              aria-hidden="true"
              className="inline-block w-[0.45em] h-[0.45em] rounded-full bg-accent ml-1.5 align-middle animate-pulse-dot motion-reduce:hidden"
            />
          )}
        </p>

        {error && (
          <p
            role="alert"
            className="mt-4 font-mono text-[11px] uppercase tracking-widest text-accent"
          >
            {self.errorRetry}
          </p>
        )}

        <AiControls
          className="pt-5 border-t border-dashed border-rule mt-7"
          modelId={currentModel.id}
          position={position}
          cycleLabel={self.cycle}
          onRegenerate={regenerate}
          disabled={isLoading}
        />
      </div>
    </section>
  )
}
