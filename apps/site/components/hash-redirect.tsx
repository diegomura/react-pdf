'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

/**
 * The v4 mega-pages were split into per-topic pages. Fragments never reach the
 * server, so old deep links like /docs/v4/components#text can only be forwarded
 * to their new page from the client.
 */
export function HashRedirect({ hashes }: { hashes: Record<string, string> }) {
  const router = useRouter();

  useEffect(() => {
    const target = hashes[window.location.hash.slice(1)];
    if (target) router.replace(`/docs/v4/${target}`);
  }, [hashes, router]);

  return null;
}
