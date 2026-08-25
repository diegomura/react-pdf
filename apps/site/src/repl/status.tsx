export function Status({
  rendering,
  failed,
}: {
  rendering: boolean;
  failed: boolean;
}) {
  const label = failed ? 'Preview off' : rendering ? 'Rendering' : 'Live';

  return (
    <span
      role="status"
      aria-label={label}
      title={label}
      className={`size-1.5 rounded-full ${
        failed
          ? 'bg-fd-muted-foreground/50'
          : rendering
            ? 'bg-fd-primary animate-pulse'
            : 'bg-emerald-500'
      }`}
    />
  );
}
