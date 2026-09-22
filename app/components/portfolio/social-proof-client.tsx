"use client";

import { useObject } from "@ai-sdk/react";
import { useCallback, useRef } from "react";

import type { AiModelId } from "@/i18n/ai-models";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { socialProofSchema } from "@/i18n/social-proof-schema";
import type { SocialProofObject } from "@/i18n/social-proof-schema";

import { AiControls } from "./ai-controls";
import { SectionHead } from "./section-head";
import { useAiCacheStatuses } from "./use-ai-cache-statuses";
import { useModelCycler } from "./use-model-cycler";

const SLOTS = [0, 1, 2] as const;

export function SocialProofClient({
  lang,
  proof,
  initialTestimonials,
}: {
  lang: Locale;
  proof: Dictionary["portfolio"]["proof"];
  initialTestimonials: SocialProofObject["testimonials"] | null;
}) {
  const { statuses, markGenerated } = useAiCacheStatuses("social-proof", lang);

  const requestedModelRef = useRef<AiModelId | null>(null);

  const { object, submit, isLoading, error } = useObject({
    api: "/api/social-proof",
    onFinish: ({ error: finishError }) => {
      if (finishError) {
        return;
      }
      const model = requestedModelRef.current;
      if (model) {
        markGenerated(model);
      }
    },
    schema: socialProofSchema,
  });

  const onModelChange = useCallback(
    (model: AiModelId) => {
      requestedModelRef.current = model;
      submit({ lang, model });
    },
    [submit, lang]
  );

  const { currentModel, nextModel, position, regenerate } =
    useModelCycler(onModelChange);

  const items = object?.testimonials ?? initialTestimonials;

  return (
    <section className="py-[clamp(60px,9vw,130px)]" id="proof">
      <SectionHead
        heading={proof.heading}
        label={proof.label}
        sub={proof.sub}
      />

      <div className="relative flex max-w-190 flex-col gap-8">
        <div
          aria-busy={isLoading}
          aria-live="polite"
          className="flex flex-col gap-8"
        >
          {SLOTS.map((i) => {
            const t = items?.[i];
            const showCaret = isLoading && !t?.q;
            return (
              <blockquote
                className={i === 0 ? "m-0" : "border-rule m-0 border-t pt-6"}
                key={i}
              >
                <p className="font-display text-ink m-0 min-h-[2.5em] text-[clamp(20px,2vw,26px)] leading-normal italic before:content-['\201c'] after:content-['\201d']">
                  {t?.q}
                  {showCaret ? (
                    <span
                      aria-hidden="true"
                      className="animate-pulse-dot bg-accent ml-1.5 inline-block h-[0.45em] w-[0.45em] rounded-full align-middle motion-reduce:hidden"
                    />
                  ) : null}
                </p>
                <div className="text-ink-faint text-micro tracking-label mt-4 min-h-[1.5em] font-mono uppercase">
                  {t?.name ? (
                    <>
                      <strong className="text-ink-soft font-medium">
                        {t.name}
                      </strong>
                      {t.role ? <> · {t.role}</> : null}
                    </>
                  ) : null}
                </div>
              </blockquote>
            );
          })}
        </div>

        {error ? (
          <p
            className="text-accent text-micro mt-4 font-mono tracking-widest uppercase"
            role="alert"
          >
            {proof.errorRetry}
          </p>
        ) : null}

        <div className="border-rule mt-10 flex justify-between gap-2 border-t border-b border-dashed py-4 pt-5">
          <div className="text-ink-faint text-nano tracking-heading max-w-md font-mono leading-[1.7] uppercase">
            {proof.banner}
          </div>
          <AiControls
            className="justify-end"
            cycleLabel={proof.cycle}
            disabled={isLoading}
            modelId={currentModel.id}
            modelLabel={proof.modelLabel}
            onRegenerate={regenerate}
            position={position}
            tooltip={{
              labels: proof.tooltip,
              locale: lang,
              nextModelExpiresAt: statuses[nextModel.id]?.expiresAt ?? null,
              nextModelLabel: nextModel.label,
            }}
          />
        </div>
      </div>
    </section>
  );
}
