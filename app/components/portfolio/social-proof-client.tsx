"use client";

import { experimental_useObject as useObject } from "@ai-sdk/react";
import { useCallback } from "react";
import type { AiModelId } from "@/i18n/ai-models";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import {
  type SocialProofObject,
  socialProofSchema,
} from "@/i18n/social-proof-schema";
import { AiControls } from "./ai-controls";
import { SectionHead } from "./section-head";
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
  const { object, submit, isLoading, error } = useObject({
    api: "/api/social-proof",
    schema: socialProofSchema,
  });

  const onModelChange = useCallback(
    (model: AiModelId) => {
      submit({ lang, model });
    },
    [submit, lang]
  );

  const { currentModel, position, regenerate } = useModelCycler(onModelChange);

  const items = object?.testimonials ?? initialTestimonials;

  return (
    <section className="py-[clamp(60px,9vw,130px)]" id="proof">
      <SectionHead
        heading={proof.heading}
        label={proof.label}
        sub={proof.sub}
      />

      <div className="relative flex max-w-[760px] flex-col gap-8">
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
                className={i === 0 ? "m-0" : "m-0 border-rule border-t pt-6"}
                key={i}
              >
                <p className="m-0 min-h-[2.5em] font-display text-[clamp(20px,2vw,26px)] text-ink italic leading-normal before:content-['\201c'] after:content-['\201d']">
                  {t?.q}
                  {showCaret && (
                    <span
                      aria-hidden="true"
                      className="ml-1.5 inline-block h-[0.45em] w-[0.45em] animate-pulse-dot rounded-full bg-accent align-middle motion-reduce:hidden"
                    />
                  )}
                </p>
                <div className="mt-4 min-h-[1.5em] font-mono text-[11px] text-ink-faint uppercase tracking-[0.14em]">
                  {t?.name && (
                    <>
                      <strong className="font-medium text-ink-soft">
                        {t.name}
                      </strong>
                      {t.role ? <> · {t.role}</> : null}
                    </>
                  )}
                </div>
              </blockquote>
            );
          })}
        </div>

        {error && (
          <p
            className="mt-4 font-mono text-[11px] text-accent uppercase tracking-widest"
            role="alert"
          >
            {proof.errorRetry}
          </p>
        )}

        <div className="mt-10 flex justify-between gap-2 border-rule border-t border-b border-dashed py-4 pt-5">
          <div className="max-w-md font-mono text-[10.5px] text-ink-faint uppercase leading-[1.7] tracking-[0.16em]">
            {proof.banner}
          </div>
          <AiControls
            className="justify-end"
            cycleLabel={proof.cycle}
            disabled={isLoading}
            modelId={currentModel.id}
            onRegenerate={regenerate}
            position={position}
          />
        </div>
      </div>
    </section>
  );
}
