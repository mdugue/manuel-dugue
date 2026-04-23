"use client";

export function AiControls({
  modelId,
  position,
  cycleLabel,
  onRegenerate,
  disabled,
  className,
}: {
  modelId: string;
  position: string;
  cycleLabel: string;
  onRegenerate: () => void;
  disabled: boolean;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] text-ink-faint uppercase tracking-[0.14em] ${className}`}
    >
      <div className="flex flex-wrap gap-[18px]">
        <span>model: {modelId}</span>
        <span>{position}</span>
      </div>
      <button
        className="inline-flex cursor-pointer items-center gap-2 border border-rule bg-none px-3.5 py-2 font-inherit text-ink-soft uppercase tracking-[0.14em] transition-colors hover:border-accent hover:text-accent focus-visible:border-accent focus-visible:text-accent focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-40"
        disabled={disabled}
        onClick={onRegenerate}
        type="button"
      >
        <span aria-hidden="true" className="text-[13px]">
          ↻
        </span>
        {cycleLabel}
      </button>
    </div>
  );
}
