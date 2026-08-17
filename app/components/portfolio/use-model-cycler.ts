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

// Starts on the model that produced the server-rendered copy, so the printed
// id matches the text and nothing is requested on mount.
const DEFAULT_INDEX = Math.max(
  0,
  aiModels.findIndex((m) => m.id === defaultAiModel)
);

/** Stand-in while prerendering, before any client roll. */
const SEED_INDEX = (DEFAULT_INDEX + 1) % MODEL_COUNT;

/** Uniform pick excluding `exclude`; the offset can never land back on it. */
function pickOtherIndex(exclude: number): number {
  if (MODEL_COUNT < 2) {
    return exclude;
  }
  const offset = 1 + Math.floor(Math.random() * (MODEL_COUNT - 1));
  return (exclude + offset) % MODEL_COUNT;
}

function subscribeNever() {
  return () => {
    // never changes
  };
}

function getServerFirstRoll() {
  return SEED_INDEX;
}

export function useModelCycler(onModelChange: (_model: AiModelId) => void) {
  const [modelIndex, setModelIndex] = useState(DEFAULT_INDEX);
  const [rolledIndex, setRolledIndex] = useState<number | null>(null);

  // `Math.random()` is barred while prerendering and during render, so the
  // first roll happens in the client snapshot and is cached to stay stable.
  const firstRollRef = useRef<number | null>(null);
  const getClientFirstRoll = useCallback(() => {
    if (firstRollRef.current === null) {
      firstRollRef.current = pickOtherIndex(DEFAULT_INDEX);
    }
    return firstRollRef.current;
  }, []);
  const firstRoll = useSyncExternalStore(
    subscribeNever,
    getClientFirstRoll,
    getServerFirstRoll
  );

  const nextIndex = rolledIndex ?? firstRoll;

  const onChangeRef = useRef(onModelChange);
  useEffect(() => {
    onChangeRef.current = onModelChange;
  }, [onModelChange]);

  const currentModel = aiModels[modelIndex];
  const nextModel = aiModels[nextIndex];

  const regenerate = useCallback(() => {
    const model = aiModels[nextIndex];
    setModelIndex(nextIndex);
    setRolledIndex(pickOtherIndex(nextIndex));
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
