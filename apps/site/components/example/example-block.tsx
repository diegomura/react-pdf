'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

import { PdfPreviewSkeleton } from '@/components/pdf-preview/skeleton';

// the pane, plus the bar the loaded block puts under it
function Skeleton() {
  return (
    <>
      <PdfPreviewSkeleton />
      <div className="border-fd-border bg-fd-card h-9 border-t" />
    </>
  );
}

const ExampleBody = dynamic(
  () => import('./example-body').then((m) => m.ExampleBody),
  { ssr: false, loading: Skeleton },
);

export interface ExampleBlockProps {
  code: string;
  href: string;
  defaultOpen?: boolean;
}

/** Decides when to pull the block's chunk; everything else lives in it. */
export function ExampleBlock(props: ExampleBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(props.defaultOpen ?? false);

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
    <div
      ref={ref}
      className="border-fd-border my-6 overflow-hidden rounded-xl border"
    >
      {visible ? <ExampleBody {...props} /> : <Skeleton />}
    </div>
  );
}
