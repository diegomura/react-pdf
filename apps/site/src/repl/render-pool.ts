'use client';

import type { ReplResponse } from './worker';

// A docs page can hold five examples; the renderer bundle is ~1.4MB, so they
// share one worker instead of booting one each. Requests are also chained so
// only one render is ever in flight — examples mutate the worker's global Font
// store, and overlapping renders would read each other's state.
// ponytail: a single worker serialises everything. If a page ever shows enough
// examples that the queue feels slow, grow this into a small pool.

const TIMEOUT_MS = 30_000;

let worker: Worker | null = null;
let nextId = 0;
let queue: Promise<unknown> = Promise.resolve();
const pending = new Map<number, (response: ReplResponse) => void>();

function getWorker() {
  if (worker) return worker;

  const created = new Worker(new URL('./worker.ts', import.meta.url), {
    type: 'module',
  });

  created.onmessage = (event: MessageEvent<ReplResponse>) => {
    pending.get(event.data.id)?.(event.data);
  };

  created.onerror = () => {
    created.terminate();
    if (worker === created) worker = null;
    for (const [id, settle] of pending)
      settle({
        id,
        error: 'The renderer crashed while building this preview.',
      });
  };

  worker = created;
  return created;
}

function send(code: string) {
  return new Promise<ReplResponse>((resolve) => {
    const id = ++nextId;
    let timer: ReturnType<typeof setTimeout>;

    const settle = (response: ReplResponse) => {
      if (!pending.delete(id)) return;
      clearTimeout(timer);
      resolve(response);
    };

    pending.set(id, settle);
    timer = setTimeout(
      () => settle({ id, error: 'This preview took too long to render.' }),
      TIMEOUT_MS,
    );

    try {
      getWorker().postMessage({ id, code });
    } catch {
      settle({
        id,
        error: 'Live preview unavailable — this browser blocked the worker.',
      });
    }
  });
}

export function renderExample(code: string): Promise<ReplResponse> {
  const result = queue.then(() => send(code));
  queue = result.catch(() => {});
  return result;
}
