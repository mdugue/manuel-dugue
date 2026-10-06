"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ViewTransition } from "react";

import { docSheetName, docTitleName } from "@/app/components/doc-morph";
import type { Dictionary } from "@/i18n/dictionaries";

type DocCardCopy = Dictionary["portfolio"]["docs"]["cv"];

/** Wraps `children` in a named view transition, or leaves it bare when the
 *  name is taken by the open sheet. */
function Named({
  name,
  share,
  active,
  children,
}: {
  name: string;
  share: string;
  active: boolean;
  children: React.ReactNode;
}) {
  if (!active) {
    return children;
  }
  return (
    <ViewTransition default="none" name={name} share={share}>
      {children}
    </ViewTransition>
  );
}

/**
 * A document card that lifts off the page and becomes the sheet. While its
 * document is open the card hands its view-transition names to the sheet and
 * leaves a dashed outline behind, the spot the sheet flies back to on close.
 */
export function DocCard({
  href,
  slug,
  kicker,
  card,
}: {
  href: Route;
  slug: string;
  kicker: string;
  card: DocCardCopy;
}) {
  const open = usePathname() === href;

  return (
    <Named active={!open} name={docSheetName(slug)} share="doc-morph">
      <Link
        className="doc-card border-rule bg-paper hover:border-accent focus-visible:border-accent focus-visible:outline-accent relative flex min-h-55 cursor-pointer flex-col gap-5 border px-7 pt-7 pb-6 text-left text-inherit transition-[translate,border-color,box-shadow] duration-[250ms] hover:-translate-y-0.5 focus-visible:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2"
        data-lifted={open || undefined}
        href={href}
        prefetch
        transitionTypes={["doc-open"]}
      >
        <div className="text-ink-faint text-nano font-mono tracking-[0.18em] uppercase">
          {kicker} · {card.num}
        </div>
        <Named active={!open} name={docTitleName(slug)} share="doc-title">
          <h3 className="font-display m-0 w-fit text-[28px] leading-[1.15] font-normal italic">
            {card.title}
          </h3>
        </Named>
        <div className="font-display text-ink-soft max-w-[34ch] flex-1 text-[19px] leading-[1.45] text-pretty">
          {card.desc}
        </div>
        <div className="border-rule text-accent text-micro tracking-label flex items-baseline justify-between border-t border-dashed pt-4 font-mono uppercase">
          <span>{card.cta}</span>
          <span aria-hidden="true" className="doc-card-arrow text-sm">
            →
          </span>
        </div>
      </Link>
    </Named>
  );
}
