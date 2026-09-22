import type { Dictionary } from "@/i18n/dictionaries";

import { LabMark } from "./lab-marks";
import type { MarkId } from "./lab-marks";
import { SectionHead } from "./section-head";

/** Each project lives on its own subdomain; the row shows the host so the
 *  destination is readable before the click. */
const PROJECT_URLS: Record<MarkId, string> = {
  alpen: "https://alpen.manuel.fyi",
  bridge: "https://bridge.manuel.fyi",
  effort: "https://effort.manuel.fyi",
};

/** Oldest question first — the order the projects actually happened in. */
const ORDER: MarkId[] = ["alpen", "bridge", "effort"];

const ROW =
  "group border-rule-soft hover:border-accent focus-visible:border-accent focus-visible:outline-accent grid grid-cols-[96px_1fr] items-start gap-x-8 gap-y-4 border-t py-7 transition-colors last:border-b focus-visible:outline-2 focus-visible:outline-offset-2 max-md:grid-cols-1 max-md:gap-y-3";

/**
 * Drawn rather than typed: U+2197 carries an emoji presentation, so on Apple
 * platforms the character renders as a colour glyph next to the title. This is
 * the same hairline the marks are drawn with.
 */
function ExternalArrow() {
  return (
    <svg
      aria-hidden="true"
      className="text-accent shrink-0 transition-transform duration-[250ms] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      fill="none"
      focusable="false"
      height="0.58em"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.4}
      viewBox="0 0 10 10"
      width="0.58em"
    >
      <path d="M2.2 7.8L7.8 2.2" />
      <path d="M3.6 2.2H7.8V6.4" />
    </svg>
  );
}

export function Lab({ lab }: { lab: Dictionary["portfolio"]["lab"] }) {
  return (
    <section className="py-[clamp(60px,9vw,130px)]" id="lab">
      <SectionHead heading={lab.heading} label={lab.label} sub={lab.sub} />
      <div className="max-w-225">
        {ORDER.map((id) => {
          const project = lab.projects[id];

          return (
            <a
              className={ROW}
              href={PROJECT_URLS[id]}
              key={id}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="mt-1.5 max-md:mt-0">
                <LabMark id={id} />
              </span>

              <span className="flex flex-col gap-2">
                <span className="text-ink-faint text-nano flex items-baseline gap-2.5 font-mono tracking-[0.18em] uppercase">
                  <span>{project.num}</span>
                  <span>{project.host}</span>
                </span>

                <span className="font-display group-hover:text-accent flex items-baseline gap-2 text-[26px] leading-[1.15] font-normal italic transition-colors">
                  {project.title}
                  <ExternalArrow />
                </span>

                <span className="text-ink-soft max-w-[58ch] text-sm leading-[1.55]">
                  {project.desc}
                </span>

                <span className="text-ink-faint text-micro tracking-label font-mono uppercase">
                  {project.stack}
                </span>
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
