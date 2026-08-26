'use client';

import dynamic from 'next/dynamic';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { useEffect, useId, useRef, useState, type ReactNode } from 'react';

/** Fixed on the container, so swapping skeleton → PDF costs no layout shift. */
const PREVIEW_HEIGHT = 'h-[19rem] sm:h-[26rem]';

/** A blank page on the preview surface — same box the rendered PDF lands in. */
function Skeleton() {
  return (
    <div className="flex h-full items-center justify-center p-5">
      <div className="bg-fd-background/70 h-full animate-pulse rounded-[2px] shadow-sm [aspect-ratio:1/1.4142]" />
    </div>
  );
}

const ExamplePreview = dynamic(
  () =>
    import('@/components/repl/example-preview').then((m) => m.ExamplePreview),
  { ssr: false, loading: () => <Skeleton /> },
);

const action =
  'text-fd-muted-foreground hover:text-fd-foreground focus-visible:ring-fd-ring inline-flex items-center gap-1.5 rounded-sm text-[0.8125rem] no-underline transition-colors outline-none focus-visible:ring-2';

export interface ExampleBlockProps {
  code: string;
  href: string;
  defaultOpen?: boolean;
  children: ReactNode;
}

export function ExampleBlock({
  code,
  href,
  defaultOpen = false,
  children,
}: ExampleBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { rootMargin: '200px' },
    );
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="border-fd-border my-6 overflow-hidden rounded-xl border">
      <div ref={ref} className={`bg-fd-muted ${PREVIEW_HEIGHT}`}>
        {visible ? <ExamplePreview code={code} /> : <Skeleton />}
      </div>

      <div className="border-fd-border bg-fd-card flex items-center justify-between gap-3 border-t px-3.5 py-2">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls={panelId}
          className={action}
        >
          <ChevronDown
            className={`size-3.5 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
          />
          {open ? 'Hide code' : 'View code'}
        </button>

        <a href={href} className={action}>
          Open in Playground
          <ArrowUpRight className="size-3.5 shrink-0" />
        </a>
      </div>

      {open && (
        <div id={panelId} className="rp-example-code border-fd-border border-t">
          {children}
        </div>
      )}
    </div>
  );
}
