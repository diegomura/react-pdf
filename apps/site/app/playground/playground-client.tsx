'use client';

import dynamic from 'next/dynamic';

const Playground = dynamic(
  () => import('@/components/playground').then((m) => m.Playground),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-dvh items-center justify-center text-fd-muted-foreground">
        Loading playground…
      </div>
    ),
  },
);

export function PlaygroundClient() {
  return <Playground />;
}
