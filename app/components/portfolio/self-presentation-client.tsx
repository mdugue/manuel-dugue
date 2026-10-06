"use client";

import { useCompletion } from "@ai-sdk/react";
import Image from "next/image";
import { useCallback, useRef } from "react";

import type { AiModelId } from "@/i18n/ai-models";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import portrait from "@/public/manuel.jpg";

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
    initialCompletion: initialText,
    onFinish: () => {
      const model = requestedModelRef.current;
      if (model) {
        markGenerated(model);
      }
    },
    streamProtocol: "text",
  });

  const onModelChange = useCallback(
    (model: AiModelId) => {
      requestedModelRef.current = model;
      void complete("", { body: { lang, model } });
    },
    [complete, lang]
  );

  const { currentModel, nextModel, position, regenerate } =
    useModelCycler(onModelChange);

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

        {/* Wraps on narrow cards, so the photo sits above the text on mobile. */}
        <div className="flex flex-wrap items-start gap-x-[clamp(24px,4vw,40px)] gap-y-6">
          <figure className="m-0 flex w-[clamp(128px,19vw,190px)] shrink-0 flex-col gap-2.5">
            <Image
              alt={self.photoAlt}
              className="aspect-[4/5] h-auto w-full object-cover grayscale transition-[filter] duration-400 hover:grayscale-0"
              placeholder="blur"
              sizes="190px"
              src={portrait}
            />
            <figcaption className="text-ink-faint text-nano tracking-label font-mono uppercase">
              {self.photoCaption}
            </figcaption>
          </figure>

          <div className="flex-[1_1_300px]">
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

            {error ? (
              <p
                className="text-accent text-micro mt-4 font-mono tracking-widest uppercase"
                role="alert"
              >
                {self.errorRetry}
              </p>
            ) : null}
          </div>
        </div>

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
