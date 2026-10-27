const STEPS = [
  'Internal structures creation',
  'Resolve styles',
  'Fetching assets',
  'Layout text',
  'Wrapping pages',
  'Rendering',
];

export interface OverviewTimelineProps {
  steps?: string[];
}

export function OverviewTimeline({ steps = STEPS }: OverviewTimelineProps) {
  return (
    <ol
      style={{ '--cols': steps.length } as React.CSSProperties}
      className="not-prose relative my-10 grid list-none grid-cols-3 gap-x-2 gap-y-8 sm:grid-cols-[repeat(var(--cols),minmax(0,1fr))] sm:gap-y-0"
    >
      <span
        aria-hidden
        className="via-fd-border to-fd-border absolute inset-x-0 top-4 hidden h-px bg-gradient-to-r from-transparent sm:block"
      />
      <span
        aria-hidden
        className="border-fd-border absolute top-[9px] right-0 hidden size-[7px] rotate-45 border-t border-r sm:block"
      />
      {steps.map((label, i) => (
        <li key={label} className="flex flex-col items-center text-center">
          <span className="bg-fd-primary text-fd-primary-foreground ring-fd-background relative flex size-8 items-center justify-center rounded-full text-xs font-medium tabular-nums ring-4">
            {i + 1}
          </span>
          <span className="text-fd-muted-foreground mt-3 text-[0.75rem] leading-snug tracking-[-0.01em] text-balance">
            {label}
          </span>
        </li>
      ))}
    </ol>
  );
}
