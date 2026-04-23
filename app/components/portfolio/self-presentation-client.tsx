"use client";

import { useCompletion } from "@ai-sdk/react";
import { useCallback, useRef } from "react";
import type { AiModelId } from "@/i18n/ai-models";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { AiControls } from "./ai-controls";
import { SectionHead } from "./section-head";
import { useAiCacheStatuses } from "./use-ai-cache-statuses";
import { useModelCycler } from "./use-model-cycler";

export function SelfPresentationClient({
  lang,
  self,
  initialText,
}: {
  lang: Locale;
  self: Dictionary["portfolio"]["self"];
  initialText: string;
}) {
  const { statuses, markGenerated } = useAiCacheStatuses(
    "self-presentation",
    lang
  );

  const requestedModelRef = useRef<AiModelId | null>(null);

  const { completion, complete, isLoading, error } = useCompletion({
    api: "/api/self-presentation",
    streamProtocol: "text",
    initialCompletion: initialText,
    onFinish: () => {
      const model = requestedModelRef.current;
      if (model) {
        markGenerated(model);
      }
    },
  });

  const onModelChange = useCallback(
    (model: AiModelId) => {
      requestedModelRef.current = model;
      complete("", { body: { lang, model } });
    },
    [complete, lang]
  );

  const { currentModel, nextModel, position, regenerate } =
    useModelCycler(onModelChange);

  return (
    <section className="py-[clamp(60px,9vw,130px)]" id="self">
      <SectionHead heading={self.heading} label={self.label} sub={self.sub} />

      <div className="relative max-w-195 border border-rule bg-paper p-[clamp(28px,3.5vw,44px)] before:absolute before:-inset-px before:bottom-auto before:left-auto before:h-3.5 before:w-3.5 before:bg-accent before:content-['']">
        <div className="absolute -top-2.25 left-6 inline-flex items-center gap-2 bg-bg px-2.5 font-mono text-ink-faint text-nano uppercase tracking-heading">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 animate-blink rounded-full bg-accent"
          />
          {self.tag}
        </div>

        <p
          aria-busy={isLoading}
          aria-live="polite"
          className="m-0 min-h-[7em] whitespace-pre-line font-display text-[clamp(19px,1.75vw,24px)] text-ink leading-[1.55]"
        >
          {completion ?? initialText}
          {isLoading && (
            <span
              aria-hidden="true"
              className="ml-1.5 inline-block h-[0.45em] w-[0.45em] animate-pulse-dot rounded-full bg-accent align-middle motion-reduce:hidden"
            />
          )}
        </p>

        {error && (
          <p
            className="mt-4 font-mono text-accent text-micro uppercase tracking-widest"
            role="alert"
          >
            {self.errorRetry}
          </p>
        )}

        <AiControls
          className="mt-7 border-rule border-t border-dashed pt-5"
          cycleLabel={self.cycle}
          disabled={isLoading}
          modelId={currentModel.id}
          onRegenerate={regenerate}
          position={position}
          tooltip={{
            nextModelLabel: nextModel.label,
            nextModelExpiresAt: statuses[nextModel.id]?.expiresAt ?? null,
            locale: lang,
            labels: self.tooltip,
          }}
        />
      </div>
    </section>
  );
}
