import { Suspense } from 'react';

import { ReplClient } from './repl-client';

export const metadata = { title: 'REPL' };

export default function ReplPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-dvh items-center justify-center text-fd-muted-foreground">
          Loading REPL…
        </div>
      }
    >
      <ReplClient />
    </Suspense>
  );
}
