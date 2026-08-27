'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

import { PlaygroundLoader } from './loader';

const load = () => import('@/components/playground').then((m) => m.Playground);

// `loading` is skipped: the overlay below owns the wait, so that it can outlive
// the chunk arriving and fade out instead of cutting.
const Playground = dynamic(load, { ssr: false, loading: () => null });

export function PlaygroundClient() {
  // module promises are cached, so this is the same load `dynamic` awaits
  const [ready] = useState(load);

  return (
    <>
      <Playground />
      <PlaygroundLoader ready={ready} />
    </>
  );
}
