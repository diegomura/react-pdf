'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

// same box PdfPreviewPane renders into, so the swap costs no layout shift
function Skeleton() {
  return (
    <div className="bg-fd-muted flex h-[19rem] items-center justify-center p-5 sm:h-[26rem]">
      <div className="bg-fd-background/70 h-full animate-pulse rounded-[2px] shadow-sm [aspect-ratio:1/1.4142]" />
    </div>
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
