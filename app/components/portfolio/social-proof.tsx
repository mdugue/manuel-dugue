'use client'

import { experimental_useObject as useObject } from '@ai-sdk/react'
import { useCallback } from 'react'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import type { AiModelId } from '@/i18n/ai-models'
import { socialProofSchema } from '@/i18n/social-proof-schema'
import { SectionHead } from './section-head'
import { AiControls } from './ai-controls'
import { useModelCycler } from './use-model-cycler'

const SLOTS = [0, 1, 2] as const

export function SocialProof({
  lang,
  proof,
}: {
  lang: Locale
  proof: Dictionary['portfolio']['proof']
}) {
  const { object, submit, isLoading, error } = useObject({
    api: '/api/social-proof',
    schema: socialProofSchema,
  })

  const onModelChange = useCallback(
    (model: AiModelId) => {
      submit({ lang, model })
    },
    [submit, lang],
  )

  const { currentModel, position, regenerate } = useModelCycler(onModelChange)

  const items = object?.testimonials

  return (
    <section id="proof" className="py-[clamp(60px,9vw,130px)]">
      <SectionHead
        label={proof.label}
        heading={proof.heading}
        sub={proof.sub}
      />

      <div className="flex flex-col gap-8 max-w-[760px] relative">
        <div
          className="flex flex-col gap-8"
          aria-live="polite"
          aria-busy={isLoading}
        >
          {SLOTS.map((i) => {
            const t = items?.[i]
            const showCaret = isLoading && !t?.q
            return (
              <blockquote
                key={i}
                className={i === 0 ? 'm-0' : 'border-t border-rule pt-6 m-0'}
              >
                <p className="font-display text-[clamp(20px,2vw,26px)] leading-normal italic text-ink m-0 min-h-[2.5em] before:content-['\201c'] after:content-['\201d']">
                  {t?.q}
                  {showCaret && (
                    <span
                      aria-hidden="true"
                      className="inline-block w-[0.45em] h-[0.45em] rounded-full bg-accent ml-1.5 align-middle animate-pulse-dot motion-reduce:hidden"
                    />
                  )}
                </p>
                <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint min-h-[1.5em]">
                  {t?.name && (
                    <>
                      <strong className="text-ink-soft font-medium">
                        {t.name}
                      </strong>
                      {t.role ? <> · {t.role}</> : null}
                    </>
                  )}
                </div>
              </blockquote>
            )
          })}
        </div>

        {error && (
          <p
            role="alert"
            className="mt-4 font-mono text-[11px] uppercase tracking-widest text-accent"
          >
            {proof.errorRetry}
          </p>
        )}

        <div className="mt-10 flex gap-2 py-4 border-t border-b border-dashed border-rule justify-between pt-5">
          <div className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-faint leading-[1.7] max-w-md">
            {proof.banner}
          </div>
          <AiControls
            className="justify-end"
            modelId={currentModel.id}
            position={position}
            cycleLabel={proof.cycle}
            onRegenerate={regenerate}
            disabled={isLoading}
          />
        </div>
      </div>
    </section>
  )
}
