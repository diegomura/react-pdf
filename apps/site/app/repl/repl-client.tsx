'use client';

import dynamic from 'next/dynamic';

const Repl = dynamic(() => import('@/src/repl/repl').then((m) => m.Repl), {
  ssr: false,
  loading: () => (
    <div className="flex h-dvh items-center justify-center text-fd-muted-foreground">
      Loading REPL…
    </div>
  ),
});

export function ReplClient() {
  return <Repl />;
}
