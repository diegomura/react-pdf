'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import logo from '@/public/logo.png';

// The chunk often lands in a couple hundred ms, which reads as a flicker
// rather than a load; hold the overlay long enough for it to look intentional.
const MIN_VISIBLE_MS = 650;
const FADE_MS = 400;

export function LoaderVisual() {
  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-5">
      <Image
        src={logo}
        alt=""
        width={40}
        height={36}
        priority
        className="animate-spin [animation-duration:1.8s] motion-reduce:animate-none"
      />
      <p
        role="status"
        className="text-fd-muted-foreground text-[0.8125rem] tracking-tight"
      >
        Loading playground…
      </p>
    </div>
  );
}

/**
 * Covers the page until `ready` resolves, then fades out. Sits over the
 * playground rather than swapping with it, so the editor and the first PDF
 * render happen behind the overlay instead of popping in after it.
 */
export function PlaygroundLoader({ ready }: { ready: Promise<unknown> }) {
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    let alive = true;
    const held = new Promise((resolve) => setTimeout(resolve, MIN_VISIBLE_MS));

    Promise.all([ready, held]).then(() => {
      if (alive) setDone(true);
    });

    return () => {
      alive = false;
    };
  }, [ready]);

  useEffect(() => {
    if (!done) return undefined;
    // not `transitionend`: it never fires when the user prefers reduced motion
    const timer = setTimeout(() => setGone(true), FADE_MS);
    return () => clearTimeout(timer);
  }, [done]);

  if (gone) return null;

  return (
    <div
      aria-hidden={done}
      style={{ transitionDuration: `${FADE_MS}ms` }}
      className={`bg-fd-background fixed inset-0 z-50 transition-opacity ease-out ${
        done ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <LoaderVisual />
    </div>
  );
}
