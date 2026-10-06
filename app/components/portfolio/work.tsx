import type { Route } from "next";
import Link from "next/link";

import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

import { SectionHead } from "./section-head";

/** Newest engagement first; the rest lives in the skill profile. */
const ORDER = ["hhi", "estino", "wegde"] as const;

const LABEL = "font-mono text-micro tracking-label uppercase";

export function Work({
  lang,
  work,
}: {
  lang: Locale;
  work: Dictionary["portfolio"]["work"];
}) {
  return (
    <section className="py-[clamp(60px,9vw,130px)]" id="work">
      <SectionHead heading={work.heading} label={work.label} sub={work.sub} />

      <ul className="border-rule m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-8 border-t p-0">
        {ORDER.map((id) => {
          const item = work.cases[id];
          return (
            <li
              className="border-rule flex flex-col gap-3 border-b py-7"
              key={id}
            >
              <span className={`${LABEL} text-accent`}>{item.kind}</span>
              <h3 className="font-display m-0 text-[26px] leading-[1.15] font-normal italic">
                {item.client}
              </h3>
              <p className="font-display text-ink-soft m-0 text-[19px] leading-[1.45] text-pretty">
                {item.desc}
              </p>
              <span className={`${LABEL} text-ink-faint mt-auto`}>
                {item.meta}
              </span>
            </li>
          );
        })}
      </ul>

      <div className="mt-7 flex flex-wrap items-baseline gap-x-6 gap-y-2">
        <span className={`${LABEL} text-ink-faint`}>{work.alsoLabel}</span>
        <span className="font-display text-ink-soft flex-[1_1_300px] text-lg text-pretty">
          {work.also}
        </span>
        <Link
          className={`${LABEL} text-accent hover:text-ink focus-visible:outline-accent transition-colors focus-visible:outline-2 focus-visible:outline-offset-2`}
          href={`/${lang}/skill-profile` as Route}
          prefetch
        >
          {work.allLink} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
