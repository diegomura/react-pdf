'use client';

import { ChevronDown } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useState } from 'react';

import { PdfPreviewSkeleton } from '@/components/pdf-preview/skeleton';

const PdfPreview = dynamic(
  () => import('@/components/pdf-preview').then((m) => m.PdfPreview),
  { ssr: false, loading: PdfPreviewSkeleton },
);

export interface UsagePreviewProps {
  code: string;
}

/**
 * `<details>` keeps its children mounted while closed, so a preview written
 * straight into it would boot the ~1.4MB renderer worker on every component
 * page load. `booted` holds the import back until the reader opens it, and
 * stays true afterwards so closing and reopening costs nothing.
 */
export function UsagePreview({ code }: UsagePreviewProps) {
  const [booted, setBooted] = useState(false);

  return (
    <details
      className="group border-fd-border border-t"
      onToggle={(event) => {
        if (event.currentTarget.open) setBooted(true);
      }}
    >
      <summary className="text-fd-muted-foreground hover:text-fd-foreground bg-fd-card focus-visible:ring-fd-ring flex cursor-pointer list-none items-center gap-1.5 px-3.5 py-2.5 text-[0.8125rem] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-inset [&::-webkit-details-marker]:hidden">
        <ChevronDown
          aria-hidden
          className="size-3.5 shrink-0 transition-transform group-open:rotate-180"
        />
        <span className="group-open:hidden">Show preview</span>
        <span className="hidden group-open:inline">Hide preview</span>
      </summary>

      <div className="border-fd-border border-t">
        {booted ? <PdfPreview code={code} /> : <PdfPreviewSkeleton />}
      </div>
    </details>
  );
}
