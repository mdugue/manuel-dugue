'use client'

import { useEffect, useRef, useState } from 'react'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import { selfVariants } from '@/i18n/ai-variants'
import { SectionHead } from './section-head'

function useTypedText(text: string, speed = 10) {
  const [shown, setShown] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    setShown('')
    setDone(false)
    let i = 0
    let cancelled = false
    let timer: ReturnType<typeof setTimeout> | null = null
    const tick = () => {
      if (cancelled) return
      i += 1
      setShown(text.slice(0, i))
      if (i >= text.length) {
        setDone(true)
        return
      }
      const ch = text[i - 1]
      const delay =
        ch === '.' || ch === ',' || ch === '—' ? speed * 6 : speed + Math.random() * speed
      timer = setTimeout(tick, delay)
    }
    timer = setTimeout(tick, 300)
    return () => {
      cancelled = true
      if (timer) clearTimeout(timer)
    }
  }, [text, speed])

  return { shown, done }
}

export function SelfPresentation({
  lang,
  self,
}: {
  lang: Locale
  self: Dictionary['portfolio']['self']
}) {
  const variants = selfVariants[lang]
  const [variantIdx, setVariantIdx] = useState(0)
  const lastLang = useRef(lang)
  if (lastLang.current !== lang) {
    lastLang.current = lang
    if (variantIdx !== 0) setVariantIdx(0)
  }
  const text = variants[variantIdx % variants.length]!
  const { shown, done } = useTypedText(text, 10)

  const total = variants.length
  const seedLabel = `${self.seed}: ${String(variantIdx + 1).padStart(3, '0')}/${String(total).padStart(3, '0')}`

  return (
    <section className="block" id="self">
      <SectionHead label={self.label} heading={self.heading} sub={self.sub} />
      <div className="ai-card">
        <div className="ai-tag">
          <span className="dot" aria-hidden="true" />
          {self.tag}
        </div>
        <p className="ai-prose" aria-live="polite">
          {shown}
          {!done && <span className="caret" aria-hidden="true" />}
        </p>
        <div className="ai-controls">
          <div className="meta">
            <span>{self.model}</span>
            <span>{seedLabel}</span>
          </div>
          <button
            type="button"
            className="regen"
            onClick={() => setVariantIdx((i) => (i + 1) % total)}
            disabled={!done}
          >
            <span className="icon" aria-hidden="true">
              ↻
            </span>
            {self.cycle}
          </button>
        </div>
      </div>
    </section>
  )
}
