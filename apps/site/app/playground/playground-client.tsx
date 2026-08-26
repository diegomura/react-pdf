'use client';

import dynamic from 'next/dynamic';

const Repl = dynamic(
  () => import('@/components/repl/repl').then((m) => m.Repl),
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
  return <Repl />;
}
