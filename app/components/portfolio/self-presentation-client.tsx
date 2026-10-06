"use client";

import { useCompletion } from "@ai-sdk/react";
import { useCallback, useRef, useState } from "react";

import type { AiModelId } from "@/i18n/ai-models";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { selfPresentationAngle } from "@/lib/self-presentation-angle";
import type { SelfPresentationAngle } from "@/lib/self-presentation-angle";

import { AiControls } from "./ai-controls";
import { SectionHead } from "./section-head";
import { useAiCacheStatuses } from "./use-ai-cache-statuses";
import { useModelCycler } from "./use-model-cycler";

export function SelfPresentationClient({
  lang,
  self,
  initialText,
  initialAngle,
}: {
  lang: Locale;
  self: Dictionary["portfolio"]["self"];
  initialText: string;
  /** Set when `initialText` is a cached model text rather than the fallback. */
  initialAngle?: SelfPresentationAngle;
}) {
  const { statuses, markGenerated } = useAiCacheStatuses(
    "self-presentation",
    lang
  );

  const requestedModelRef = useRef<AiModelId | null>(null);
  // The chapter title above the text. The fallback text has none.
  const [angle, setAngle] = useState<SelfPresentationAngle | null>(
    initialAngle ?? null
  );

  const { completion, complete, isLoading, error } = useCompletion({
    api: "/api/self-presentation",
    initialCompletion: initialText,
    onFinish: () => {
      const model = requestedModelRef.current;
      if (model) {
        markGenerated(model);
      }
    },
    streamProtocol: "text",
  });

  // A provider error after the response has started ends the stream without
  // text and without an error, which would otherwise leave the box blank.
  const endedEmpty = !(isLoading || error) && completion === "";

  const onModelChange = useCallback(
    (model: AiModelId) => {
      requestedModelRef.current = model;
      setAngle(selfPresentationAngle(model));
      void complete("", { body: { lang, model } });
    },
    [complete, lang]
  );

  const { currentModel, nextModel, position, regenerate } = useModelCycler(
    onModelChange,
    { requestOnMount: initialAngle === undefined }
  );

  return (
    <section className="py-[clamp(60px,9vw,130px)]" id="self">
      <SectionHead heading={self.heading} label={self.label} sub={self.sub} />

      <div className="border-rule bg-paper before:bg-accent relative max-w-195 border p-[clamp(28px,3.5vw,44px)] before:absolute before:-inset-px before:bottom-auto before:left-auto before:h-3.5 before:w-3.5 before:content-['']">
        <div className="bg-bg text-ink-faint text-nano tracking-heading absolute -top-2.25 left-6 inline-flex items-center gap-2 px-2.5 font-mono uppercase">
          <span
            aria-hidden="true"
            className="animate-blink bg-accent h-1.5 w-1.5 rounded-full"
          />
          {self.tag}
        </div>

        {angle ? (
          <h3 className="font-display text-ink m-0 mb-5 text-[clamp(22px,2vw,26px)] leading-[1.15] font-normal italic">
            {self.angles[angle]}
          </h3>
        ) : null}

        <p
          aria-busy={isLoading}
          aria-live="polite"
          className="font-display text-ink m-0 min-h-[7em] text-[clamp(19px,1.75vw,24px)] leading-[1.55] whitespace-pre-line"
        >
          {completion ?? initialText}
          {isLoading ? (
            <span
              aria-hidden="true"
              className="animate-pulse-dot bg-accent ml-1.5 inline-block h-[0.45em] w-[0.45em] rounded-full align-middle motion-reduce:hidden"
            />
          ) : null}
        </p>

        {error || endedEmpty ? (
          <p
            className="text-accent text-micro mt-4 font-mono tracking-widest uppercase"
            role="alert"
          >
            {self.errorRetry}
          </p>
        ) : null}

        <AiControls
          className="border-rule mt-7 border-t border-dashed pt-5"
          cycleLabel={self.cycle}
          disabled={isLoading}
          modelId={currentModel.id}
          modelLabel={self.modelLabel}
          onRegenerate={regenerate}
          position={position}
          tooltip={{
            labels: self.tooltip,
            locale: lang,
            nextModelExpiresAt: statuses[nextModel.id]?.expiresAt ?? null,
            nextModelLabel: nextModel.label,
          }}
        />
      </div>
    </section>
  );
}
