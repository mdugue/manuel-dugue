'use client'

import { useCompletion } from '@ai-sdk/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import { selfPresentationModels } from '@/i18n/self-presentation-models'
import { SectionHead } from './section-head'

const MODEL_COUNT = selfPresentationModels.length

export function SelfPresentation({
  lang,
  self,
}: {
  lang: Locale
  self: Dictionary['portfolio']['self']
}) {
  const [modelIndex, setModelIndex] = useState(0)
  const currentModel = selfPresentationModels[modelIndex]!

  const { completion, complete, isLoading, error } = useCompletion({
    api: '/api/self-presentation',
    streamProtocol: 'text',
  })

  const run = useCallback(
    (index: number) => {
      const model = selfPresentationModels[index]!.id
      complete('', { body: { lang, model } })
    },
    [complete, lang],
  )

  const didInit = useRef(false)
  useEffect(() => {
    if (didInit.current) return
    didInit.current = true
    run(0)
  }, [run])

  const handleRegenerate = useCallback(() => {
    const next = (modelIndex + 1) % MODEL_COUNT
    setModelIndex(next)
    run(next)
  }, [modelIndex, run])

  const position = `${String(modelIndex + 1).padStart(2, '0')}/${String(MODEL_COUNT).padStart(2, '0')}`

  return (
    <section id="self" className="py-[clamp(60px,9vw,130px)]">
      <SectionHead label={self.label} heading={self.heading} sub={self.sub} />

      <div className="relative bg-ai-bg border border-rule p-[clamp(28px,3.5vw,44px)] max-w-195 before:content-[''] before:absolute before:-inset-px before:left-auto before:bottom-auto before:w-3.5 before:h-3.5 before:bg-accent bg-paper">
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
          {completion}
          {isLoading && (
            <span
              aria-hidden="true"
              className="inline-block w-0.5 h-[0.95em] bg-accent ml-0.5 translate-y-0.75 animate-caret motion-reduce:hidden"
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

        <div className="flex justify-between items-center mt-7 pt-5 border-t border-dashed border-rule font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint gap-4 flex-wrap">
          <div className="flex gap-[18px] flex-wrap">
            <span>model: {currentModel.id}</span>
            <span>{position}</span>
          </div>
          <button
            type="button"
            onClick={handleRegenerate}
            disabled={isLoading}
            className="bg-none border border-rule text-ink-soft px-3.5 py-2 font-inherit uppercase tracking-[0.14em] cursor-pointer inline-flex items-center gap-2 transition-colors hover:border-accent hover:text-accent focus-visible:border-accent focus-visible:text-accent focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span aria-hidden="true" className="text-[13px]">
              ↻
            </span>
            {self.cycle}
          </button>
        </div>
      </div>
    </section>
  )
}
