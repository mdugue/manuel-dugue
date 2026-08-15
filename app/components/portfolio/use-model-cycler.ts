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

/**
 * The cycler starts on whichever model produced the server-rendered copy, so
 * the printed model id always matches the text on screen and no generation is
 * requested on mount.
 */
const DEFAULT_INDEX = Math.max(
  0,
  aiModels.findIndex((m) => m.id === defaultAiModel)
);

/** Deterministic stand-in used while prerendering, before any client roll. */
const SEED_INDEX = (DEFAULT_INDEX + 1) % MODEL_COUNT;

/**
 * Pick uniformly among the models that are not `exclude`. An offset of
 * 1..COUNT-1 can never land back on the current model, so every reroll is a
 * real change without needing a retry loop.
 */
function pickOtherIndex(exclude: number): number {
  if (MODEL_COUNT < 2) {
    return exclude;
  }
  const offset = 1 + Math.floor(Math.random() * (MODEL_COUNT - 1));
  return (exclude + offset) % MODEL_COUNT;
}

function subscribeNever() {
  return () => {
    // The first roll is decided once on the client and never changes.
  };
}

function getServerFirstRoll() {
  return SEED_INDEX;
}

export function useModelCycler(onModelChange: (_model: AiModelId) => void) {
  const [modelIndex, setModelIndex] = useState(DEFAULT_INDEX);
  const [rolledIndex, setRolledIndex] = useState<number | null>(null);

  // `Math.random()` may not run while prerendering (Cache Components rejects
  // it) and may not run during render (the React Compiler requires purity), so
  // the first pre-roll lives in the client snapshot of an external store: the
  // server path returns SEED_INDEX, and the client path rolls once and caches
  // the result so repeated snapshot reads stay stable.
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
