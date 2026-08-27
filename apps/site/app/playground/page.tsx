import { Suspense } from 'react';

import { PlaygroundClient } from './playground-client';

export const metadata = { title: 'Playground' };

export default function PlaygroundPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-dvh items-center justify-center text-fd-muted-foreground">
          Loading playground…
        </div>
      }
    >
      <PlaygroundClient />
    </Suspense>
  );
}
