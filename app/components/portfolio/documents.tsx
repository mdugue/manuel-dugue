import type { Route } from "next";

import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

import { DocCard } from "./doc-card";
import { SectionHead } from "./section-head";

type DocCardCopy = Dictionary["portfolio"]["docs"]["cv"];

export function Documents({
  lang,
  docs,
}: {
  lang: Locale;
  docs: Dictionary["portfolio"]["docs"];
}) {
  const entries: {
    slug: "curriculum-vitae" | "skill-profile";
    card: DocCardCopy;
  }[] = [
    { card: docs.cv, slug: "curriculum-vitae" },
    { card: docs.profile, slug: "skill-profile" },
  ];

  return (
    <section className="py-[clamp(60px,9vw,130px)]" id="docs">
      <SectionHead heading={docs.heading} label={docs.label} sub={docs.sub} />
      <div className="grid max-w-225 grid-cols-2 gap-6 max-md:grid-cols-1">
        {entries.map(({ slug, card }) => (
          <DocCard
            card={card}
            href={`/${lang}/${slug}` as Route}
            key={slug}
            kicker={docs.kicker}
            slug={slug}
          />
        ))}
      </div>
    </section>
  );
}
