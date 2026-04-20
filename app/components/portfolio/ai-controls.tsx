'use client'

export function AiControls({
  modelId,
  position,
  cycleLabel,
  onRegenerate,
  disabled,
  className,
}: {
  modelId: string
  position: string
  cycleLabel: string
  onRegenerate: () => void
  disabled: boolean
  className?: string
}) {
  return (
    <div
      className={`flex justify-between items-center font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint gap-4 flex-wrap ${className}`}
    >
      <div className="flex gap-[18px] flex-wrap">
        <span>model: {modelId}</span>
        <span>{position}</span>
      </div>
      <button
        type="button"
        onClick={onRegenerate}
        disabled={disabled}
        className="bg-none border border-rule text-ink-soft px-3.5 py-2 font-inherit uppercase tracking-[0.14em] cursor-pointer inline-flex items-center gap-2 transition-colors hover:border-accent hover:text-accent focus-visible:border-accent focus-visible:text-accent focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <span aria-hidden="true" className="text-[13px]">
          ↻
        </span>
        {cycleLabel}
      </button>
    </div>
  )
}
