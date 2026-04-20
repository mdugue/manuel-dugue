'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { aiModels, type AiModelId } from '@/i18n/ai-models'

const MODEL_COUNT = aiModels.length

export function useModelCycler(onModelChange: (model: AiModelId) => void) {
  const [modelIndex, setModelIndex] = useState(0)

  const onChangeRef = useRef(onModelChange)
  onChangeRef.current = onModelChange

  const currentModel = aiModels[modelIndex]!

  const didInit = useRef(false)
  useEffect(() => {
    if (didInit.current) return
    didInit.current = true
    onChangeRef.current(currentModel.id)
  }, [currentModel.id])

  const regenerate = useCallback(() => {
    const next = (modelIndex + 1) % MODEL_COUNT
    setModelIndex(next)
    onChangeRef.current(aiModels[next]!.id)
  }, [modelIndex])

  const position = `${String(modelIndex + 1).padStart(2, '0')}/${String(MODEL_COUNT).padStart(2, '0')}`

  return { currentModel, position, regenerate }
}
