"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { type AiModelId, aiModels, defaultAiModel } from "@/i18n/ai-models";

const MODEL_COUNT = aiModels.length;

const MODELS_BY_ID = new Map(aiModels.map((model) => [model.id, model]));

const OTHER_IDS = aiModels
  .map((model) => model.id)
  .filter((id) => id !== defaultAiModel);

/**
 * Default model first: it produced the server-rendered copy, so slot 01 has to
 * agree across hydration. The tail order does not — it is read only through the
 * tooltip, which renders in a portal and never reaches the SSR HTML.
 */
const BASE_ORDER: AiModelId[] = [defaultAiModel, ...OTHER_IDS];

function shuffledOrder(): AiModelId[] {
  const pool = [...OTHER_IDS];
  const tail: AiModelId[] = [];
  while (pool.length > 0) {
    const [picked] = pool.splice(Math.floor(Math.random() * pool.length), 1);
    if (picked) {
      tail.push(picked);
    }
  }
  return [defaultAiModel, ...tail];
}

// Decided once per page load. Module scope rather than a ref, so the snapshot
// keeps a stable identity without being read during render.
let clientOrder: AiModelId[] | null = null;

function getClientOrder(): AiModelId[] {
  clientOrder ??= shuffledOrder();
  return clientOrder;
}

function getServerOrder(): AiModelId[] {
  return BASE_ORDER;
}

function subscribeNever() {
  return () => {
    // never changes
  };
}

export function useModelCycler(onModelChange: (_model: AiModelId) => void) {
  const order = useSyncExternalStore(
    subscribeNever,
    getClientOrder,
    getServerOrder
  );
  const [step, setStep] = useState(0);

  const onChangeRef = useRef(onModelChange);
  useEffect(() => {
    onChangeRef.current = onModelChange;
  }, [onModelChange]);

  const slot = step % MODEL_COUNT;
  const nextSlot = (step + 1) % MODEL_COUNT;
  const currentId = order[slot];
  const nextId = order[nextSlot];

  const regenerate = useCallback(() => {
    const id = order[(step + 1) % MODEL_COUNT];
    setStep(step + 1);
    if (id) {
      onChangeRef.current(id);
    }
  }, [order, step]);

  const currentModel = currentId && MODELS_BY_ID.get(currentId);
  const nextModel = nextId && MODELS_BY_ID.get(nextId);

  const position = `${String(slot + 1).padStart(2, "0")}/${String(MODEL_COUNT).padStart(2, "0")}`;

  if (!(currentModel && nextModel)) {
    throw new Error("useModelCycler: invalid model index");
  }

  return { currentModel, nextModel, position, regenerate };
}
