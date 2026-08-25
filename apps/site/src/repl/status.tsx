export function Status({
  rendering,
  failed,
}: {
  rendering: boolean;
  failed: boolean;
}) {
  const label = failed ? 'Preview off' : rendering ? 'Rendering' : 'Live';

  return (
    <span className="text-fd-muted-foreground flex items-center gap-1.5 text-[0.6875rem] tracking-wide">
      <span
        className={`size-1.5 rounded-full ${
          failed
            ? 'bg-fd-muted-foreground/50'
            : rendering
              ? 'bg-fd-primary animate-pulse'
              : 'bg-emerald-500'
        }`}
      />
      {label}
    </span>
  );
}
