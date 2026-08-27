'use client';

import { useId, type ReactNode } from 'react';

export function Lab({
  children,
  controls,
  caption,
}: {
  children: ReactNode;
  controls: ReactNode;
  caption?: ReactNode;
}) {
  return (
    <figure className="not-prose border-fd-border my-8 overflow-hidden rounded-xl border">
      <div className="bg-fd-card px-4 py-5 sm:px-5">{children}</div>
      <div className="border-fd-border bg-fd-muted border-t px-4 py-3">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          {controls}
        </div>
        {caption && (
          <figcaption className="text-fd-muted-foreground mt-3 text-[0.75rem] leading-relaxed">
            {caption}
          </figcaption>
        )}
      </div>
    </figure>
  );
}

export function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  format,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  format?: (value: number) => string;
}) {
  const id = useId();

  return (
    <div className="flex min-w-[13rem] flex-1 items-center gap-2.5">
      <label
        htmlFor={id}
        className="text-fd-muted-foreground shrink-0 text-[0.75rem]"
      >
        {label}
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="accent-fd-primary h-1 min-w-0 flex-1 cursor-pointer"
      />
      <span className="w-16 shrink-0 text-right text-[0.75rem] tabular-nums">
        {format ? format(value) : value}
      </span>
    </div>
  );
}

const chip =
  'focus-visible:ring-fd-ring rounded-md px-2.5 py-1 text-[0.75rem] transition-colors outline-none focus-visible:ring-2';

export function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="text-fd-muted-foreground text-[0.75rem]">{label}</span>
      <div className="border-fd-border bg-fd-background flex gap-0.5 rounded-lg border p-0.5">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={value === option.value}
            onClick={() => onChange(option.value)}
            className={`${chip} ${
              value === option.value
                ? 'bg-fd-primary text-fd-primary-foreground'
                : 'text-fd-muted-foreground hover:text-fd-foreground'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={checked}
      onClick={() => onChange(!checked)}
      className={`${chip} border ${
        checked
          ? 'border-fd-primary/40 bg-fd-primary/10 text-fd-foreground'
          : 'border-fd-border bg-fd-background text-fd-muted-foreground hover:text-fd-foreground'
      }`}
    >
      {label}
    </button>
  );
}

export function TextInput({
  label,
  value,
  onChange,
  maxLength = 40,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
}) {
  const id = useId();

  return (
    <div className="flex min-w-[13rem] flex-1 items-center gap-2.5">
      <label
        htmlFor={id}
        className="text-fd-muted-foreground shrink-0 text-[0.75rem]"
      >
        {label}
      </label>
      <input
        id={id}
        type="text"
        spellCheck={false}
        value={value}
        maxLength={maxLength}
        onChange={(event) => onChange(event.target.value)}
        className="border-fd-border bg-fd-background focus-visible:ring-fd-ring min-w-0 flex-1 rounded-md border px-2.5 py-1 font-mono text-[0.75rem] outline-none focus-visible:ring-2"
      />
    </div>
  );
}

export function Legend({
  items,
}: {
  items: { color: string; label: string }[];
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
      {items.map((item) => (
        <span
          key={item.label}
          className="text-fd-muted-foreground flex items-center gap-1.5 text-[0.75rem]"
        >
          <span className={`size-2.5 rounded-[3px] ${item.color}`} />
          {item.label}
        </span>
      ))}
    </div>
  );
}

export function LabSkeleton({ height }: { height: string }) {
  return (
    <div className="not-prose border-fd-border bg-fd-card my-8 rounded-xl border">
      <div className={`bg-fd-muted m-4 animate-pulse rounded-lg ${height}`} />
    </div>
  );
}
