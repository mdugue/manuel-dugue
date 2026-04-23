"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { type AiModelId, aiModels } from "@/i18n/ai-models";

const MODEL_COUNT = aiModels.length;

export function useModelCycler(onModelChange: (_model: AiModelId) => void) {
  const [modelIndex, setModelIndex] = useState(0);

  const onChangeRef = useRef(onModelChange);

  const currentModel = aiModels[modelIndex];
  const nextIndex = (modelIndex + 1) % MODEL_COUNT;
  const nextModel = aiModels[nextIndex];

  const didInit = useRef(false);
  useEffect(() => {
    onChangeRef.current = onModelChange;
  }, [onModelChange]);

  useEffect(() => {
    if (!currentModel) {
      return;
    }
    if (didInit.current) {
      return;
    }
    didInit.current = true;
    onChangeRef.current(currentModel.id);
  }, [currentModel]);

  const regenerate = useCallback(() => {
    setModelIndex(nextIndex);
    const model = aiModels[nextIndex];
    if (model) {
      onChangeRef.current(model.id);
    }
  }, [nextIndex]);

  const position = `${String(modelIndex + 1).padStart(2, "0")}/${String(MODEL_COUNT).padStart(2, "0")}`;

  if (currentModel === undefined || nextModel === undefined) {
    throw new Error("useModelCycler: invalid model index");
  }

  return { currentModel, nextModel, position, regenerate };
}
