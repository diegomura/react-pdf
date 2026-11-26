'use client';

import { Check, ChevronsUpDown, Search } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

import { groupedExamples } from '@/lib/examples';

export interface ExamplePickerProps {
  value: string;
  onSelect: (name: string) => void;
}

export function ExamplePicker({ value, onSelect }: ExamplePickerProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const groups = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return groupedExamples;
    return groupedExamples
      .map((g) => ({
        ...g,
        names: g.names.filter((name) => name.includes(needle)),
      }))
      .filter((g) => g.names.length > 0);
  }, [query]);

  const flat = useMemo(() => groups.flatMap((g) => g.names), [groups]);
  const activeName = flat[Math.min(active, flat.length - 1)];

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    if (!open) return;
    listRef.current
      ?.querySelector('[data-active="true"]')
      ?.scrollIntoView({ block: 'nearest' });
  }, [open, activeName]);

  const close = () => {
    setOpen(false);
    setQuery('');
  };

  const choose = (name: string) => {
    onSelect(name);
    close();
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') return close();
    if (event.key === 'Enter' && activeName) {
      event.preventDefault();
      return choose(activeName);
    }
    const step =
      event.key === 'ArrowDown' ? 1 : event.key === 'ArrowUp' ? -1 : 0;
    if (!step || flat.length === 0) return;
    event.preventDefault();
    setActive((i) => (i + step + flat.length) % flat.length);
  };

  return (
    <div
      ref={rootRef}
      className="relative"
      onBlur={(event) => {
        if (!rootRef.current?.contains(event.relatedTarget as Node)) close();
      }}
    >
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(event) => event.key === 'Escape' && close()}
        className="bg-fd-muted/60 text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-accent-foreground data-[open=true]:bg-fd-accent data-[open=true]:text-fd-accent-foreground inline-flex h-8 max-w-[11rem] items-center gap-1.5 rounded-md border ps-2.5 pe-2 text-[0.8125rem] font-medium transition-colors sm:max-w-[16rem]"
        data-open={open}
      >
        <span className="truncate">{value || 'Custom snippet'}</span>
        <ChevronsUpDown className="size-3 shrink-0 opacity-60" />
      </button>

      {open && (
        <div className="bg-fd-popover text-fd-popover-foreground fixed inset-x-3 top-[3.375rem] z-50 overflow-hidden rounded-lg border shadow-lg shadow-black/5 sm:absolute sm:inset-x-auto sm:top-full sm:mt-1.5 sm:w-[17rem] dark:shadow-black/40">
          <div className="flex items-center gap-2 border-b px-2.5">
            <Search className="text-fd-muted-foreground size-3.5 shrink-0" />
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Search examples…"
              aria-label="Search examples"
              className="placeholder:text-fd-muted-foreground h-9 w-full bg-transparent text-[0.8125rem] outline-none"
            />
          </div>

          <div
            ref={listRef}
            role="listbox"
            aria-label="Examples"
            className="max-h-[min(22rem,60dvh)] overflow-auto overscroll-contain p-1"
          >
            {groups.map(({ group, names }) => (
              <div key={group}>
                <p className="text-fd-muted-foreground px-2 pt-2 pb-1 text-[0.6875rem] font-medium tracking-[0.06em] uppercase">
                  {group}
                </p>
                {names.map((name) => (
                  <button
                    key={name}
                    type="button"
                    role="option"
                    aria-selected={name === value}
                    data-active={name === activeName}
                    onMouseMove={() => setActive(flat.indexOf(name))}
                    // Safari and Firefox do not focus a button on mousedown, so
                    // relatedTarget would be null and the blur below would close
                    // the popover before this click landed. Keeping focus put
                    // means no blur fires at all.
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => choose(name)}
                    className="data-[active=true]:bg-fd-accent data-[active=true]:text-fd-accent-foreground flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-start font-mono text-[0.75rem]"
                  >
                    <span className="truncate">{name}</span>
                    {name === value && (
                      <Check className="text-fd-primary ms-auto size-3.5 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            ))}

            {flat.length === 0 && (
              <p className="text-fd-muted-foreground px-2 py-6 text-center text-[0.8125rem]">
                No example matches “{query}”.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
