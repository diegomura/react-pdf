const STEPS = [
  'Internal structures creation',
  'Resolve styles',
  'Fetching assets',
  'Layout text',
  'Wrapping pages',
  'Rendering',
];

function TimelineItem({ step, label }: { step: number; label: string }) {
  const below = step % 2 === 0;
  return (
    <li className="relative flex flex-1 items-center justify-center">
      <span
        className={`border-fd-muted-foreground absolute block h-[50px] w-0 border border-dashed sm:h-[60px] ${
          below ? 'top-5' : 'bottom-5'
        }`}
      />
      <p
        className={`bg-fd-foreground text-fd-background absolute m-0 w-[175%] rounded-md p-2 text-center text-xs sm:w-[150%] sm:text-[15px] md:w-[125%] md:text-base ${
          below ? 'top-[50px] sm:top-[60px]' : 'bottom-[50px] sm:bottom-[60px]'
        }`}
      >
        {label}
      </p>
      <div className="bg-fd-primary text-fd-primary-foreground z-10 flex h-8 w-8 items-center justify-center rounded-full sm:h-[45px] sm:w-[45px]">
        {step}
      </div>
    </li>
  );
}

export function OverviewTimeline() {
  return (
    <ol
      aria-hidden="true"
      className="bg-fd-foreground text-fd-foreground relative my-[184px] flex h-1 list-none px-5 md:px-0"
    >
      {/* ponytail: CSS-triangle arrowhead stays inline — Tailwind's border
          shorthands fight over width vs colour here, and it has no breakpoints */}
      <span
        style={{
          position: 'absolute',
          top: -8,
          right: -4,
          width: 0,
          height: 0,
          display: 'block',
          borderRadius: 3,
          border: '10px solid transparent',
          borderRight: 0,
          borderLeft: '20px solid currentColor',
        }}
      />
      {STEPS.map((label, i) => (
        <TimelineItem key={label} step={i + 1} label={label} />
      ))}
    </ol>
  );
}
