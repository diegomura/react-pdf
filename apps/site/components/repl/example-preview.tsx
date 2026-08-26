'use client';

import { useEffect, useState } from 'react';

import { renderExample } from './render-pool';
import { Viewer } from './viewer';

export interface ExamplePreviewProps {
  code: string;
}

/**
 * The heavy half of a docs example block — pulls in the renderer worker and the
 * PDF viewer, so it is only ever imported through `next/dynamic`.
 */
export function ExamplePreview({ code }: ExamplePreviewProps) {
  const [url, setUrl] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let objectUrl: string | null = null;
    let alive = true;

    renderExample(code).then((response) => {
      if (!alive) return;

      if ('blob' in response) {
        objectUrl = URL.createObjectURL(response.blob);
        setUrl(objectUrl);
      } else {
        setFailed(true);
      }
    });

    return () => {
      alive = false;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [code]);

  if (failed)
    return (
      <p className="text-fd-muted-foreground flex h-full items-center justify-center px-8 text-center text-[0.8125rem] text-balance">
        This example can’t be previewed here. Open it in the playground to run
        it.
      </p>
    );

  return (
    <Viewer url={url} rendering={!url} surfaceClass="bg-transparent p-5" />
  );
}
