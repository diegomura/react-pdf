'use client';

import { useEffect, useRef, useState } from 'react';

import type { ReplResponse } from './worker';

const DEBOUNCE_MS = 500;

const createWorker = () =>
  new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' });

// Examples like font-register mutate the renderer's global Font registry, so
// switching examples restarts the worker to drop that state.
export function useRepl(code: string, resetKey?: unknown) {
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState<{ message: string; line?: number } | null>(
    null,
  );
  const [rendering, setRendering] = useState(false);
  const workerRef = useRef<Worker | null>(null);
  const urlRef = useRef<string | null>(null);
  const requestId = useRef(0);

  useEffect(() => {
    const worker = createWorker();
    workerRef.current = worker;

    return () => {
      worker.terminate();
      workerRef.current = null;
    };
  }, [resetKey]);

  useEffect(
    () => () => {
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    },
    [],
  );

  useEffect(() => {
    if (!code) {
      // Bump the id so an in-flight response for older code is ignored.
      requestId.current += 1;
      setRendering(false);
      return;
    }

    const id = ++requestId.current;
    setRendering(true);

    const timeout = setTimeout(() => {
      const worker = workerRef.current;
      if (!worker) return;

      worker.onmessage = (event: MessageEvent<ReplResponse>) => {
        if (event.data.id !== requestId.current) return;
        setRendering(false);

        if ('url' in event.data) {
          if (urlRef.current) URL.revokeObjectURL(urlRef.current);
          urlRef.current = event.data.url;
          setUrl(event.data.url);
          setError(null);
        } else {
          setError({ message: event.data.error, line: event.data.line });
        }
      };

      worker.onerror = () => {
        worker.terminate();
        workerRef.current = createWorker();
        setRendering(false);
        setError({ message: 'Renderer crashed — retrying on next edit' });
      };

      worker.postMessage({ id, code });
    }, DEBOUNCE_MS);

    return () => clearTimeout(timeout);
  }, [code]);

  return { url, error, rendering };
}
