import type { Route } from "next";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { SectionHead } from "./section-head";

type DocCard = Dictionary["portfolio"]["docs"]["cv"];

export function Documents({
  lang,
  docs,
}: {
  lang: Locale;
  docs: Dictionary["portfolio"]["docs"];
}) {
  const entries: Array<{
    slug: "curriculum-vitae" | "skill-profile";
    card: DocCard;
  }> = [
    { slug: "curriculum-vitae", card: docs.cv },
    { slug: "skill-profile", card: docs.profile },
  ];

  return (
    <section className="py-[clamp(60px,9vw,130px)]" id="docs">
      <SectionHead heading={docs.heading} label={docs.label} sub={docs.sub} />
      <div className="grid max-w-[900px] grid-cols-2 gap-6 max-[720px]:grid-cols-1">
        {entries.map(({ slug, card }) => (
          <Link
            className="relative flex min-h-[220px] cursor-pointer flex-col gap-5 border border-rule bg-paper px-7 pt-7 pb-6 text-left text-inherit transition-[transform,border-color] duration-[250ms] hover:-translate-y-0.5 hover:border-accent focus-visible:-translate-y-0.5 focus-visible:border-accent focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            href={`/${lang}/${slug}` as Route}
            key={slug}
            prefetch
          >
            <div className="font-mono text-[10px] text-ink-faint uppercase tracking-[0.18em]">
              Document · {card.num}
            </div>
            <h3 className="m-0 font-display font-normal text-[28px] italic leading-[1.15]">
              {card.title}
            </h3>
            <div className="max-w-[34ch] flex-1 text-ink-soft text-sm leading-[1.55]">
              {card.desc}
            </div>
            <div className="flex items-baseline justify-between border-rule border-t border-dashed pt-4 font-mono text-[11px] text-accent uppercase tracking-[0.14em]">
              <span>{card.cta}</span>
              <span aria-hidden="true" className="text-sm">
                →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
