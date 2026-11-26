import type { StatusComponentProps } from '@react-pdf/ui';

const LABELS = {
  idle: 'Live',
  ready: 'Live',
  rendering: 'Rendering',
  error: 'Preview off',
} as const;

export function Status({ status }: StatusComponentProps) {
  const label = LABELS[status];

  return (
    <span
      role="status"
      aria-label={label}
      title={label}
      className={`size-1.5 rounded-full ${
        status === 'error'
          ? 'bg-fd-muted-foreground/50'
          : status === 'rendering'
            ? 'bg-fd-primary animate-pulse'
            : 'bg-emerald-500'
      }`}
    />
  );
}
