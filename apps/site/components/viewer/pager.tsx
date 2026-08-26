'use client';

import type { PaginationComponentProps } from '@react-pdf/ui';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const stepClass =
  'text-fd-muted-foreground hover:text-fd-foreground inline-flex size-6 items-center justify-center rounded-full transition-colors disabled:opacity-30 disabled:hover:text-fd-muted-foreground';

export function Pager({
  page,
  numPages,
  canPrevious,
  canNext,
  onPrevious,
  onNext,
}: PaginationComponentProps) {
  if (numPages <= 1) return null;

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center">
      <div className="bg-fd-background/85 border-fd-border text-fd-foreground pointer-events-auto flex items-center gap-1 rounded-full border px-1.5 py-1 text-[0.75rem] shadow-lg shadow-black/5 backdrop-blur dark:shadow-black/40">
        <button
          type="button"
          aria-label="Previous page"
          className={stepClass}
          onClick={onPrevious}
          disabled={!canPrevious}
        >
          <ChevronLeft className="size-3.5" />
        </button>
        <span className="px-1 tabular-nums">
          {page}
          <span className="text-fd-muted-foreground"> / {numPages}</span>
        </span>
        <button
          type="button"
          aria-label="Next page"
          className={stepClass}
          onClick={onNext}
          disabled={!canNext}
        >
          <ChevronRight className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
