"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";

import { aiModels } from "@/i18n/ai-models";
import type { AiModelId } from "@/i18n/ai-models";

const MODEL_COUNT = aiModels.length;

/**
 * Cycles through the models. The first model is requested on mount unless
 * `requestOnMount` is false, for when the server already rendered its text.
 */
export function useModelCycler(
  onModelChange: (_model: AiModelId) => void,
  { requestOnMount = true }: { requestOnMount?: boolean } = {}
) {
  const [modelIndex, setModelIndex] = useState(0);

  const currentModel = aiModels[modelIndex];
  const nextIndex = (modelIndex + 1) % MODEL_COUNT;
  const nextModel = aiModels[nextIndex];

  const requestFirstModel = useEffectEvent(onModelChange);
  const didInit = useRef(false);
  useEffect(() => {
    if (!currentModel) {
      return;
    }
    if (didInit.current) {
      return;
    }
    didInit.current = true;
    if (requestOnMount) {
      requestFirstModel(currentModel.id);
    }
  }, [currentModel, requestOnMount]);

  const regenerate = () => {
    setModelIndex(nextIndex);
    const model = aiModels[nextIndex];
    if (model) {
      onModelChange(model.id);
    }
  };

  const position = `${String(modelIndex + 1).padStart(2, "0")}/${String(MODEL_COUNT).padStart(2, "0")}`;

  if (currentModel === undefined || nextModel === undefined) {
    throw new Error("useModelCycler: invalid model index");
  }

  return { currentModel, nextModel, position, regenerate };
}
