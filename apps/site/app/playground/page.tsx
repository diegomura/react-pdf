import { Suspense } from 'react';

import { LoaderVisual } from './loader';
import { PlaygroundClient } from './playground-client';

export const metadata = { title: 'Playground' };

export default function PlaygroundPage() {
  return (
    <Suspense fallback={<LoaderVisual />}>
      <PlaygroundClient />
    </Suspense>
  );
}
